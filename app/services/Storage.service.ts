import * as AWS from "aws-sdk";
import { AWSError } from "aws-sdk";

import {
  apiVersion,
  getBucketNameByDiscipline,
  getS3PoliciesObject,
} from "@/common/constants";
import { loggerHelper } from "../common/helpers";

export class StorageService {
  private S3: AWS.S3;
  readonly bucketName: string;
  constructor(discipline: string) {
    this.S3 = new AWS.S3({ apiVersion });
    this.bucketName = getBucketNameByDiscipline(discipline);
  }

  protected unifiedCbHandler(err: AWSError, data: any) {
    return err ? null : data;
  }

  protected errorLogger(err: AWSError) {
    if (err) {
      loggerHelper.log({
        level: "error",
        message: `Aws error: code-${err.code}, statusCode-${err.statusCode}, msg-${err?.message}}`,
      });
    }
  }

  protected async checkIfBucketExist() {
    let bucket;
    try {
      bucket = await this.S3.getBucketAcl(
        { Bucket: this.bucketName },
        (err, data) => {
          return err || data;
        }
      ).promise();
    } catch (err) {
      this.errorLogger(err);
    }
    return !!bucket.Grants;
  }

  protected preparePolicy() {
    const policies = getS3PoliciesObject(this.bucketName);
    return {
      Bucket: this.bucketName,
      Policy: JSON.stringify(policies),
    };
  }

  protected async updatePolicies() {
    const bucketParams = this.preparePolicy();
    try {
      return await this.S3.putBucketPolicy(
        bucketParams,
        this.unifiedCbHandler
      ).promise();
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  protected async createNewBucket() {
    let bucket;
    try {
      bucket = await this.S3.createBucket(
        {
          Bucket: this.bucketName,
          ACL: "public-read",
          CreateBucketConfiguration: { LocationConstraint: "eu-west-1" },
        },
        this.unifiedCbHandler
      ).promise();
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
    const updated = await this.updatePolicies();
    return updated ? bucket : null;
  }

  protected async uploadData(file: { name: string; data: Buffer }) {
    const bucketParams = {
      Bucket: this.bucketName,
      Key: file.name,
      Body: file.data,
    };
    try {
      return await this.S3.upload(
        bucketParams,
        this.unifiedCbHandler
      ).promise();
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }

  async saveImageToStorage(
    discipline: string,
    file: { name: string; data: Buffer }
  ) {
    const isBucketExisting = await this.checkIfBucketExist();

    !isBucketExisting && (await this.createNewBucket());

    return await this.uploadData(file);
  }

  async deleteImage(fileName: string) {
    try {
      return await this.S3.deleteObject(
        { Bucket: this.bucketName, Key: fileName },
        this.unifiedCbHandler
      ).promise();
    } catch (err) {
      this.errorLogger(err);
      return err;
    }
  }
}
