export interface IMetadata {
  httpStatusCode: number;
  requestId: undefined | string;
  extendedRequestId: string;
  cfId: undefined | string;
  attempts: number;
  totalRetryDelay: number;
}
