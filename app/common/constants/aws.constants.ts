import { IAwsError } from "../interfaces";
import { region } from "../../config";

export const apiVersion = "2006-03-01";
export const bucketPrefix = "quiz";
export const defaultAWSRegion = "eu-west-1";

export const getS3PoliciesObject = (bucketName: string) => ({
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "AddPerm",
      Effect: "Allow",
      Principal: "*",
      Action: ["s3:GetObject"],
      Resource: [`arn:aws:s3:::${bucketName}/*`],
    },
  ],
});

export const getBucketNameByDiscipline = (discipline: string) =>
  `${bucketPrefix}-${discipline}`;

export const getErrorInfo = (error: IAwsError) => {
  const {
    message,
    $metadata: { httpStatusCode },
    Code,
  } = error;
  return {
    message,
    httpStatusCode,
    code: Code,
  };
};

export const generateImageUrl = (
  bucketName: string,
  imageName: string
): string => {
  return `https://${bucketName}.s3.${region}.amazonaws.com/${imageName}`;
};
