import { Request, Response } from "express";

type Fn<A, B> = (a: A, locals: Record<string, any>) => B;

export type HandleType = <_, B>(
  fn: Fn<Request, Promise<B>>
) => (req: Request, res: Response) => Promise<void>;

export type Handle = <_, B>(
  fn: Fn<Request, Promise<B>>
) => (req: Request, res: Response) => Promise<void>;

export const handle =
  <A, B>(fn: Fn<Request, Promise<B>>) =>
  async (req: Request, res: Response) => {
    try {
      const result = await fn(req, res.locals);

      res.json(result);
    } catch (e) {
      console.error(new Date(), e);
      e?.failure
        ? res.status(e.status).json({ message: e.message })
        : res.sendStatus(500);
    }
  };
