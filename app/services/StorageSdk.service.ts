import {
  CreateBucketCommand,
  CreateBucketCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  PutBucketPolicyCommand,
  PutBucketPolicyCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import {
  generateImageUrl,
  getBucketNameByDiscipline,
  getErrorInfo,
  getS3PoliciesObject,
  UNKNOWN_ERROR,
} from "@/common/constants";
import {
  allSettledHandler,
  imagesResponseValidator,
  loggerHelper,
} from "@/common/helpers";
import { region } from "@/config";
import { WinstonLevelEnum } from "@/common/enums";
import { IAwsError, IImageResponse } from "@/common/interfaces";
import { FileArray } from "express-fileupload";

export type SaveImageToStorageType =
  | IImageResponse
  | PutObjectCommandOutput
  | IAwsError;

export class StorageSdkService {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({ region });
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

  protected async updatePolicies(
    bucketName: string
  ): Promise<PutBucketPolicyCommandOutput> {
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

  protected async createNewBucket(
    bucketName: string
  ): Promise<CreateBucketCommandOutput> {
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
        ? updated
        : bucket;
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  protected generateFileName = (inputName: string) => {
    const ext = inputName.split(".").pop();
    const random = uuidv4();
    const name = random.replaceAll("-", "");
    return `${name}.${ext}`;
  };

  protected async uploadData(
    bucketName: string,
    file: { name: string; data: Buffer },
    fileName: string
  ): Promise<PutObjectCommandOutput> {
    const bucketParams = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.data,
    };
    try {
      return await this.s3Client.send(new PutObjectCommand(bucketParams));
    } catch (err) {
      this.errorLogger(err);
      if (err?.$metadata.httpStatusCode === StatusCodes.NOT_FOUND) {
        const bucket = await this.createNewBucket(bucketName);
        return bucket.$metadata.httpStatusCode !== StatusCodes.OK
          ? bucket
          : await this.s3Client.send(new PutObjectCommand(bucketParams));
      } else throw err;
    }
  }

  protected generateNewImageResponse({
    bucketName,
    fileName,
    code,
    inputName,
  }: {
    bucketName: string;
    fileName: string;
    code: number;
    inputName: string;
  }): IImageResponse {
    const imageUrl = generateImageUrl(bucketName, fileName);
    return {
      httpStatusCode: code,
      imageUrl,
      fileName,
      inputName,
    };
  }

  protected async sendData(
    bucketName: string,
    file: any
  ): Promise<SaveImageToStorageType> {
    const fileName = this.generateFileName(file.name);
    const uploaded = await this.uploadData(bucketName, file, fileName);
    const {
      $metadata: { httpStatusCode },
    } = uploaded;
    if (httpStatusCode === StatusCodes.OK) {
      return this.generateNewImageResponse({
        bucketName,
        fileName,
        code: httpStatusCode,
        inputName: file.name,
      });
    } else {
      return uploaded;
    }
  }

  async saveImagesToStorage(
    discipline: string,
    files: Partial<FileArray>
  ): Promise<SaveImageToStorageType[]> {
    const bucketName = getBucketNameByDiscipline(discipline);

    const images = Object.values(files);

    if (!images.length) return [];
    const promises = images.map(
      async (fileItem) => await this.sendData(bucketName, fileItem)
    );
    const uploadedImages = await Promise.allSettled(promises).then((res) =>
      allSettledHandler(res)
    );
    const isImagesValidate = imagesResponseValidator(uploadedImages);
    if (isImagesValidate) {
      return uploadedImages;
    } else {
      const imageNames = uploadedImages
        .filter((el) => el.fileName)
        .map((elem) => elem.fileName);
      await this.deleteImages(discipline, imageNames);
      throw UNKNOWN_ERROR(uploadedImages.find((el) => el.$metadata));
    }
  }

  async deleteImage(
    discipline: string,
    fileName: string
  ): Promise<DeleteObjectCommandOutput> {
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

  async deleteImages(
    discipline: string,
    fileNames: string[]
  ): Promise<DeleteObjectCommandOutput[]> {
    if (!fileNames.length) return [];
    const promises = fileNames.map(
      async (fileName) =>
        fileName && (await this.deleteImage(discipline, fileName))
    );
    return await Promise.allSettled(promises).then((res) =>
      allSettledHandler(res)
    );
  }
}
