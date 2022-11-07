import { IMetadata } from "./IMetadata";

export interface IAwsError {
  name: string;
  $fault: string;
  $metadata: IMetadata;
  Code: string;
  Endpoint: string;
  Bucket: string;
  RequestId: string;
  HostId: string;
  message?: string;
}
