import {
  Application,
  isHttpError,
  Status,
} from "https://deno.land/x/oak/mod.ts";

import { redisCheck, redisSet, redisCheckUser, redisSetUser } from "../utils/redis.ts";
import pteroRouter from "../routers/routers.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Users, UserInterface } from "../models/users.ts";
import { delay } from "https://deno.land/std/async/mod.ts";

// import { delay } from "https://deno.land/std/async/mod.ts";


// const app = new Application();

// app.use(async (ctx, next) => {
//   try {
//     await next();
//   } catch (err) {
//     if (isHttpError(err)) { 
//       switch (err.status) {
//         case Status.NotFound:
//           // handle NotFound
//           break;
//         default:
//           // handle other statuses
//       }
//     } else {
//       // rethrow if you can't handle the error
//       throw err;
//     }
//   }
// });

export const caching = async (ctx: any, func: any) => {
  const method: string = ctx.request.method;
  const reqURL: string = ctx.request.url.pathname;
  let fromCache;
  console.log("request Method", method);
  console.log("request URL", reqURL);
  if (await redisCheck(ctx, func) === true) {2
    console.log("Main await redisCheck === true");
    ctx.request.fromCache = true;
  }
  else {
    const delayedPromise = delay(100);
    const result = await delayedPromise;
    console.log("Main await redisCheck !== true");
    // await next();
    // app.use(pteroRouter.prefix("/api").routes());
    ctx.request.fromCache = false;
    await redisSet(ctx);
  }
};

export const cachingUser = async (ctx: any, func: any) => {
  // const method: string = ctx.request.method;
  const reqKey: string = await ctx.request.headers.get('api_key');
  // console.log("request Method", method);
  console.log("request Key", reqKey);
  if (await redisCheckUser(ctx) === true) {
    console.log("Main await redisCheck === true");
  }
  else {
    const delayedPromise = delay(100);
    const result = await delayedPromise;
    console.log("Main await redisCheck !== true");
    // await next();
    // app.use(pteroRouter.prefix("/api").routes());
    await func(ctx);
    if (ctx.response.status === 202) await redisSetUser(ctx);
    else {
      console.log("incorect API key")
    }
  }
};


