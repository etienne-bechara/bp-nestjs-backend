export interface AppRetryParams {
  method: () => any;
  breakIf?: (e: any) => boolean;
  name?: string;
  retries?: number;
  timeout?: number;
  delay?: number;
}
