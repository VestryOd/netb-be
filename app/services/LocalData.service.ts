import { readFromJsonFile, writeToJsonFile } from "@/common/helpers";

export class LocalDataService {
  readonly path: string;

  constructor(path: string) {
    this.path = path;
  }
  async getData(field = "") {
    const { data, error } = await readFromJsonFile(this.path);
    return {
      data: field && field in data ? data[field] : data,
      error,
    };
  }

  writeData(data: string, filePath = this.path) {
    writeToJsonFile(filePath, data);
  }
}
