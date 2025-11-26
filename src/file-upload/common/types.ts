export type UploadFileResponseData = {
  success: boolean;
  message: string;
  filepath: string;
  namespace: string;
};

export type IngestResponse = {
  success: boolean;
  message: string;
  documentsSize: number;
};
