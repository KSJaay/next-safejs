import {Serialize} from "../typings/cookie";

function serialize({name, val, options}: Serialize) {
  const opt = options || {};

  const enc = opt.encode || encodeURIComponent;

  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }

  if (!val) {
    opt.maxAge = -1;
  }

  let value = enc(val);

  if (val && typeof val === "object") {
    value = JSON.stringify(val);
  }

  let str = name + "=" + value;

  if (opt.maxAge) {
    const maxAge = opt.maxAge - 0;

    if (isNaN(maxAge)) {
      throw new Error("maxAge should be a Number");
    }

    str += "; Max-Age=" + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!opt.domain) {
      throw new Error("option domain is required");
    }

    str += "; Domain=" + opt.domain;
  }

  if (opt.path) {
    str += "; Path=" + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== "function") {
      throw new Error("option expires is invalid");
    }

    str += "; Expires=" + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += "; HttpOnly";
  }

  if (opt.secure) {
    str += "; Secure";
  }

  if (opt.sameSite) {
    const sameSite =
      typeof opt.sameSite === "string"
        ? opt.sameSite.toLowerCase()
        : opt.sameSite;

    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";

        break;

      case "lax":
        str += "; SameSite=Lax";

        break;

      case "strict":
        str += "; SameSite=Strict";

        break;

      case "none":
        str += "; SameSite=None";

        break;

      default:
        throw new TypeError("option sameSite is invalid");
    }
  }

  return str;
}

export default serialize;
