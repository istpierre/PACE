import { Query } from "../../db";
import { sha512 } from "./helpers";
import * as jwt from "jsonwebtoken";
import * as Users from "./queries";

const secret = process.env.JWT_SECRET as string;

export const authenticate = async (
  { email, password }: { email: string; password: string },
  query: <A>(q: Query<A>) => Promise<A[]>
): Promise<{ token: string }> => {
  const [user] = await query(Users.getUserByEamil({ email }));

  if (user) {
    const hash = sha512(password, user.salt);

    if (hash.hash === user.hash) {
      const token = jwt.sign(
        { email, first_name: user.first_name, last_name: user.last_name },
        secret
      );
      return Promise.resolve({ token });
    } else {
      return Promise.reject("Invalid username and password combination");
    }
  } else {
    return Promise.reject("Could not authenticate");
  }
};
