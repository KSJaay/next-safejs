import {createRequest} from "../requests";
import {getMultipleCookies, Utils} from "../../src";

jest.mock("../../src/cookie/utils.ts");

describe("getMultipleCookies", () => {
  describe("Server Side", () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(false);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return an empty object", () => {
      const request = createRequest();

      const result = getMultipleCookies({request, keys: ["test", "panda"]});

      expect(result).toEqual({});
    });

    it("should return cookies set in the request", () => {
      const request = createRequest();
      request.headers.cookie = "test=panda; panda=test";

      const result = getMultipleCookies({request, keys: ["test", "panda"]});

      expect(result).toEqual({test: "panda", panda: "test"});
    });
  });

  describe("Client Side", () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return an empty object", () => {
      const result = getMultipleCookies({keys: ["test", "panda"]});

      expect(result).toEqual({});
    });

    it("should return cookies set in the request", () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "test=panda; panda=test",
      });

      const result = getMultipleCookies({keys: ["test", "panda"]});

      expect(result).toEqual({test: "panda", panda: "test"});
    });
  });
});
