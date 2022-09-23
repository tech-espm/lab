import { Request, Response } from "express";
import { ResponseBuilder } from "../utils";

interface getHealthCheckResponse {
  message: string;
  timestamp: number;
}

export const getHealthCheck = (_: Request, res: Response) => {
  const healthCheck: getHealthCheckResponse = {
    message: "OK",
    timestamp: Date.now(),
  };

  try {
    return ResponseBuilder.ok(res, healthCheck);
  } catch (error) {
    healthCheck.message = String(error);
    return ResponseBuilder.serviceUnavailable(res, healthCheck);
  }
};
