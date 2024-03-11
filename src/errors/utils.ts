import type * as codes from './codes';

export * as codes from './codes';

export type ReturnErrorShape = {
  statusCode: number;
  errorCode: (typeof codes)[keyof typeof codes];
  message: string;
  path: string;
};
