import pino from "pino";

// Configure logger to use pino-pretty only in development environment
const isDev = process.env.NODE_ENV === "development" || !process.env.VERCEL;

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
      },
    },
  }),
});
