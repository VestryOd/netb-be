import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetBucketAclCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { StatusCodes } from "http-status-codes";
import {
  generateImageUrl,
  getBucketNameByDiscipline,
  getErrorInfo,
  getS3PoliciesObject,
} from "@/common/constants";
import { allSettledHandler, loggerHelper } from "@/common/helpers";
import { region } from "@/config";
import { WinstonLevelEnum } from "@/common/enums";
import { IAwsError } from "@/common/interfaces";
import { UploadedFile } from "express-fileupload";

export class StorageSdkService {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({ region });
  }

  protected async checkIfBucketExist(bucketName: string) {
    try {
      return await this.s3Client.send(
        new GetBucketAclCommand({ Bucket: bucketName })
      );
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  protected preparePolicies(bucketName: string) {
    const policies = getS3PoliciesObject(bucketName);
    return {
      Bucket: bucketName,
      Policy: JSON.stringify(policies),
    };
  }

  protected errorLogger(err: IAwsError, level = WinstonLevelEnum.Error) {
    const { httpStatusCode, code, message } = getErrorInfo(err);
    loggerHelper.log({
      level,
      message: `${httpStatusCode}, ${code} - ${message}`,
    });
  }

  protected async updatePolicies(bucketName: string) {
    const bucketPolicyParams = this.preparePolicies(bucketName);
    try {
      return await this.s3Client.send(
        new PutBucketPolicyCommand(bucketPolicyParams)
      );
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  protected async createNewBucket(bucketName: string) {
    try {
      const bucket = await this.s3Client.send(
        new CreateBucketCommand({
          Bucket: bucketName,
          ACL: "public-read",
          CreateBucketConfiguration: { LocationConstraint: region },
        })
      );

      const updated = await this.updatePolicies(bucketName);
      return updated.$metadata.httpStatusCode === StatusCodes.NO_CONTENT
        ? bucket
        : null;
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  protected async uploadData(
    bucketName: string,
    file: { name: string; data: Buffer }
  ) {
    const bucketParams = {
      Bucket: bucketName,
      Key: file.name,
      Body: file.data,
    };
    try {
      return await this.s3Client.send(new PutObjectCommand(bucketParams));
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  protected generateNewImageResponse({
    bucketName,
    fileName,
    code,
    ETag,
  }: {
    bucketName: string;
    fileName: string;
    code: number;
    ETag: string;
  }) {
    const imageUrl = generateImageUrl(bucketName, fileName);
    return {
      httpStatusCode: code,
      imageUrl,
      fileName,
      key: fileName,
      ETag: ETag.slice(1, ETag.length - 1),
    };
  }

  protected async prepareBucket(bucketName: string) {
    const existingBucket = await this.checkIfBucketExist(bucketName);
    if (existingBucket.$metadata.httpStatusCode !== StatusCodes.OK) {
      return await this.createNewBucket(bucketName);
    }
    return existingBucket;
  }

  protected async sendData(bucketName: string, file: UploadedFile) {
    const uploaded = await this.uploadData(bucketName, file);
    const {
      $metadata: { httpStatusCode },
      ETag,
    } = uploaded;
    if (httpStatusCode === StatusCodes.OK) {
      return this.generateNewImageResponse({
        bucketName,
        fileName: file.name,
        code: httpStatusCode,
        ETag,
      });
    } else {
      return uploaded;
    }
  }

  async saveImagesToStorage(
    discipline: string,
    file: UploadedFile | UploadedFile[]
  ) {
    const bucketName = getBucketNameByDiscipline(discipline);
    const bucket = await this.prepareBucket(bucketName);
    if (bucket.$metadata.httpStatusCode !== StatusCodes.OK) {
      return bucket;
    }

    if (Array.isArray(file)) {
      if (!file.length) return [];
      const promises = file.map(
        async (fileItem) => await this.sendData(bucketName, fileItem)
      );
      return await Promise.allSettled(promises).then((res) =>
        allSettledHandler(res)
      );
    } else {
      return await this.sendData(bucketName, file);
    }
  }

  async deleteImage(discipline: string, fileName: string) {
    const bucketName = getBucketNameByDiscipline(discipline);
    try {
      return await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: fileName,
        })
      );
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  async deleteImages(discipline: string, fileNames: string[]) {
    if (!fileNames.length) return [];
    const promises = fileNames.map(
      async (fileName) => await this.deleteImage(discipline, fileName)
    );
    return await Promise.allSettled(promises).then((res) =>
      allSettledHandler(res)
    );
  }
}
