import {cookieOptions} from "../../src";
const {clientSideCookieOptions, serverSideCookieOptions} = cookieOptions;

describe("cookieOptions", () => {
  const fakeHostname = "https://panda.com";
  it("should return an object with the correct properties", () => {
    const result = clientSideCookieOptions({
      options: {maxAge: 1000},
      hostname: fakeHostname,
    });

    expect(result).toEqual({
      path: "/",
      domain: fakeHostname,
      httpOnly: false,
      sameSite: "lax",
      maxAge: 1000,
    });
  });

  it("should return an object with the correct properties", () => {
    const result = serverSideCookieOptions({
      options: {maxAge: 1000},
      hostname: fakeHostname,
    });

    expect(result).toEqual({
      path: "/",
      domain: fakeHostname,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000,
    });
  });
});
