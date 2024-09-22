import { Query } from "../db";
import express from "express";
import jwt from "jsonwebtoken";
import * as Users from "../routes/users/queries";

const secret = process.env.JWT_SECRET as string;

export const validate = (
  token: string,
  secret: string
): Promise<string | jwt.JwtPayload | undefined> =>
  new Promise((res, rej) =>
    jwt.verify(token, secret, (err, data) => (err ? rej(err) : res(data)))
  );

export const auth =
  (query: <A>(q: Query<A>) => Promise<A[]>) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    validate(req.headers.authorization as string, secret)
      .then(async (claims: Omit<Users.User, "id" | "hash" | "salt">) => {
        const [user] = await query(
          Users.getUserByEamil({ email: claims.email })
        );
        if (user) {
          res.locals = { ...res.locals, claims, user };

          next();
        } else {
          res.status(403).end();
        }
      })
      .catch(() => res.status(403).end());
