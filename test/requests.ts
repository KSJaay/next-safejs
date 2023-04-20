import {
  createRequest as mockCreateRequest,
  createResponse as mockCreateResponse,
} from "node-mocks-http";
import type {NextApiRequest, NextApiResponse} from "next";

export const createRequest = () => {
  const request: NextApiRequest = mockCreateRequest();
  return request;
};

export const createResponse = () => {
  const response: NextApiResponse = mockCreateResponse();
  return response;
};
