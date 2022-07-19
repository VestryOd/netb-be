import { IMetadata } from "./IMetadata";

export interface IAwsError {
  $fault: string;
  $metadata: IMetadata;
  Code: string;
  BucketName: string;
  RequestId: string;
  HostId: string;
  message?: string;
}
