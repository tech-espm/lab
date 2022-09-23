import { Response } from "express";
import { StatusCodes } from "http-status-codes";

const ok = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.OK, data);
};
const accepted = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.ACCEPTED, data);
};

const multiStatus = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.MULTI_STATUS, data);
};

const badRequest = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.BAD_REQUEST, data);
};

const notFound = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.NOT_FOUND, data);
};

const internalServerError = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, data);
};

const forbidden = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.FORBIDDEN, data);
};

const unauthorized = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.UNAUTHORIZED, data);
};

const created = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.CREATED, data);
};

const noContent = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.NO_CONTENT, data);
};

const paymentRequired = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.PAYMENT_REQUIRED, data);
};

const notImplemented = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.NOT_IMPLEMENTED, data);
};

const serviceUnavailable = (res: Response, data?: any) => {
  return createResponse(res, StatusCodes.SERVICE_UNAVAILABLE, data);
};

const buildJson = (data?: any) => {
  if (!data) return;
  if (typeof data === "string") return { message: data };
  return data;
};

const createResponse = (res: Response, code: number, data: string) => {
  const json = buildJson(data);
  if (!json) return res.status(code).end();
  return res.status(code).json(json).end();
};

const ResponseBuilder = {
  accepted,
  badRequest,
  created,
  forbidden,
  internalServerError,
  multiStatus,
  noContent,
  notFound,
  notImplemented,
  ok,
  paymentRequired,
  serviceUnavailable,
  unauthorized,
};

export { ResponseBuilder };
