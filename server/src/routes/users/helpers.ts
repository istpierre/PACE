import * as crypto from "crypto";

export const generateSalt = (length: number) =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);

export const sha512 = (password: string, salt: string) => {
  const hash = crypto.createHmac("sha512", salt).update(password).digest("hex");

  return {
    hash,
    salt,
  };
};

export const generateUserInsert = (email: string, password: string) => {
  const { hash, salt } = sha512(password, generateSalt(12));
  return { email, salt, hash };
};
