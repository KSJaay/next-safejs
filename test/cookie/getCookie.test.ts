// Should return cookies set in the request
import {createRequest} from "../requests";
import {getCookie, Utils} from "../../src/cookie";

jest.mock("../../src/cookie/utils.ts");

describe("getCookie", () => {
  describe("Server Side", () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(false);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return undefined if no key is provided", () => {
      const request = createRequest();
      request.headers.cookie = "panda=test";

      const result = getCookie({request, key: "test"});
      expect(result).toBeUndefined();
    });

    it("should return cookies set in the request", () => {
      const request = createRequest();
      request.headers.cookie = "test=panda; panda=test";

      const result = getCookie({request, key: "test"});

      expect(result).toEqual("panda");
    });
  });

  describe("Client Side", () => {
    beforeEach(() => {
      (Utils.isClientSide as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should return undefined if no key is provided", () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "panda=test",
      });

      const result = getCookie({key: "test"});
      expect(result).toBeUndefined();
    });

    it("should return cookies set in the request", () => {
      Object.defineProperty(document, "cookie", {
        writable: true,
        value: "test=panda; panda=test",
      });

      const result = getCookie({key: "test"});

      expect(result).toEqual("panda");
    });
  });
});
