export declare type ServerResponse<T> = Promise<{
  response: Response;
  data: T;
  endpoint: string;
}>;
export declare type ServerRequestHeader =
  | Headers
  | string[][]
  | {
      [key: string]: string;
    };
