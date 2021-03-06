import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { HttpsReturnType } from '../https.enum';

/**
 * Adds extra request options to Axios package.
 */
export interface HttpsRequestParams extends AxiosRequestConfig {

  form?: Record<string, unknown>;
  replacements?: Record<string, unknown>;

  returnType?: HttpsReturnType;

  exceptionHandler?: (
    requestParams: HttpsRequestParams,
    upstreamResponse: AxiosResponse | any,
    errorMessage: string
  ) => Promise<void>;

}
