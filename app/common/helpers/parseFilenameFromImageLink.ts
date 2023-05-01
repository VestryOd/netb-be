import { fileNameRegex } from "@/common/constants";

export const parseFilenameFromImageLink = (url: string): string => {
  const parsed = url.match(fileNameRegex);
  return parsed ? parsed[0] : null;
};
