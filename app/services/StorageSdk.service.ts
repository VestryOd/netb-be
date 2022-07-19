import {
  CreateBucketCommand,
  DeleteObjectCommand,
  GetBucketAclCommand,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  generateImageUrl,
  getBucketNameByDiscipline,
  getErrorInfo,
  getS3PoliciesObject,
} from "@/common/constants";
import { loggerHelper } from "@/common/helpers";
import { region } from "@/config";
import { WinstonLevelEnum } from "@/common/enums";
import { IAwsError, IMetadata } from "@/common/interfaces";

export class StorageSdkService {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({ region });
  }

  protected async checkIfBucketExist(bucketName: string) {
    try {
      await this.s3Client.send(new GetBucketAclCommand({ Bucket: bucketName }));
      return true;
    } catch (err) {
      this.errorLogger(err);
      return false;
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
      return updated.$metadata.httpStatusCode === 204 ? bucket : null;
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
    bucket,
  }: {
    bucketName: string;
    fileName: string;
    code: number;
    ETag: string;
    bucket: { Location: string; $metadata: IMetadata } | null;
  }) {
    const imageUrl = bucket?.Location
      ? `${bucket?.Location}${fileName}`
      : generateImageUrl(bucketName, fileName);
    return {
      httpStatusCode: code,
      imageUrl,
      fileName,
      key: fileName,
      ETag: ETag.slice(1, ETag.length - 1),
    };
  }

  async saveImageToStorage(
    discipline: string,
    file: { name: string; data: Buffer }
  ) {
    let bucket = null;
    const bucketName = getBucketNameByDiscipline(discipline);
    const isBucketExisting = await this.checkIfBucketExist(bucketName);

    !isBucketExisting && (bucket = await this.createNewBucket(bucketName));
    const uploaded = await this.uploadData(bucketName, file);
    const {
      $metadata: { httpStatusCode },
      ETag,
    } = uploaded;
    if (httpStatusCode === 200) {
      return this.generateNewImageResponse({
        bucketName,
        fileName: file.name,
        code: httpStatusCode,
        ETag,
        bucket,
      });
    } else {
      return null;
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
}
