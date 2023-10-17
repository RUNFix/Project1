export interface MyError {
  response: {
    data: {
      message: string | string[];
    };
    status?: number;
    headers?: Record<string, string>;
  };
}
