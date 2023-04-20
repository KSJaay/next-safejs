import {serialize} from "../../src/cookie";

describe("serialize", () => {
  it("should serialize a cookie", () => {
    const cookie = serialize({
      name: "test",
      val: "panda",
      options: {
        maxAge: 1000,
        path: "/",
        domain: "localhost",
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      },
    });

    expect(cookie).toBe(
      "test=panda; Max-Age=1000; Domain=localhost; Path=/; HttpOnly; Secure; SameSite=Strict"
    );
  });
});
