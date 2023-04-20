import {createRequest, createResponse} from "../requests";
import {removeCookie, Utils} from "../../src";

jest.mock("../../src/cookie/utils.ts");

describe("removeCookie", () => {
  describe("Server Side", () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(false);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return an empty string", () => {
      const request = createRequest();
      const response = createResponse();
      request.headers.cookie = "test=panda; panda=test";

      removeCookie({key: "test", request, response});

      expect(request.headers.cookie).toEqual("panda=test;");
    });
  });

  describe("Client Side", () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return an empty string", () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "test=panda; panda=test",
      });

      removeCookie({key: "test"});

      expect(document.cookie).toEqual("test=; Max-Age=-1");
    });
  });
});
