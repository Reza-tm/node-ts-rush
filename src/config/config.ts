import { config } from "dotenv";
import path from "path";
import { z } from "zod";

// define the path to our .env file
const envPath = path.resolve();
const { error } = config();
console.log(error, "error");

// define the shape of our environment variables
const validNodeEnv: [string, string, ...string[]] = [
  "development",
  "production",
];

const zLiteralEnv = validNodeEnv.map((env: (typeof validNodeEnv)[number]) =>
  z.literal(env)
) as [z.ZodLiteral<string>, z.ZodLiteral<string>, ...z.ZodLiteral<string>[]];
const envValidation = z.object({
  PORT: z.string().default("4200"),
  NODE_ENV: z.union(zLiteralEnv),
});
console.log(process.env);
try {
  envValidation.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    throw new Error(
      "ENV Error : " + err.issues[0].message + " " + err.issues[0].path
    );
  }
}

export const configApp = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
};
