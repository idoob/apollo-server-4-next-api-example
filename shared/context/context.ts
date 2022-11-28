import { ContextFunction } from '@apollo/server';
import { NextApiHandler } from 'next';

// Example Context type
export type Context = {
  user?: string;
  datasources: Datasources;
};

export type Datasources = {
  helloDataSource: () => string;
};

// Simple Function that builds datasources
export const buildDatasources = async (): Promise<Datasources> => {
  // Do something asynchronous or synchronous to build datasources

  return {
    helloDataSource: () => 'Hello World',
  };
};

// Context builder function
export const buildContext: ContextFunction<
  Parameters<NextApiHandler>,
  Context
> = async (req, res): Promise<Context> => {
  // Use the `req` or `res` params to build your context.
  // For example, if you use next-auth, you could fetch the session with unstable_getServerSession()
  //...

  const datasources = await buildDatasources();
  return {
    user: 'user123',
    datasources,
  };
};
