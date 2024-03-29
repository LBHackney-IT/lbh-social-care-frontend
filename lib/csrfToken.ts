import Tokens from 'csrf';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../types';

export class CSRFValidationError extends Error {
  message = 'invalid csrf token provided';
}

class CSRF {
  private readonly tokenMaker: Tokens;
  private readonly ignoredMethods = ['GET', 'HEAD'];

  constructor() {
    this.tokenMaker = new Tokens({ saltLength: 64 });
  }

  token(): string {
    return this.tokenMaker.create(process.env.CSRF_SECRET as string);
  }

  validate(token: any): void {
    if (!this.tokenMaker.verify(process.env.CSRF_SECRET as string, token))
      throw new CSRFValidationError();
  }

  middleware(
    handler: (
      req: NextApiRequest & { user: User },
      res: NextApiResponse
    ) => void
  ): (
    req: NextApiRequest & { user: User },
    res: NextApiResponse
  ) => Promise<void> {
    return async (
      req: NextApiRequest & { user: User },
      res: NextApiResponse
    ) => {
      if (!this.ignoredMethods.includes(req.method as string))
        try {
          this.validate(req.headers['xsrf-token']);
        } catch (e) {
          res.status(403).json({ error: 'invalid csrf token' });
          let errorMessage;
          if (e instanceof Error) {
            errorMessage = e.message;
          }
          console.error(
            `[xsrf][error] invalid token on request to ${req.url}: ${errorMessage}`
          );
          return;
        }

      return handler(req, res);
    };
  }
}

export const { csrfFetch, init, middleware, token, tokenFromMeta, validate } = {
  init: (): CSRF => new CSRF(),
  token: (): string => new CSRF().token(),
  validate: (token: string): void => new CSRF().validate(token),
  middleware: (
    handler: (
      req: NextApiRequest & { user: User },
      res: NextApiResponse
    ) => void
  ): ((
    req: NextApiRequest & { user: User },
    res: NextApiResponse
  ) => Promise<void>) => new CSRF().middleware(handler),
  tokenFromMeta: (): string =>
    (document.querySelector('meta[http-equiv=XSRF-TOKEN]') as HTMLMetaElement)
      ?.content,
  csrfFetch: (url: string, init: any): Promise<Response> =>
    fetch(url, {
      ...init,
      headers: {
        ...(init.headers || {}),
        'XSRF-TOKEN': tokenFromMeta(),
      },
    }),
};
