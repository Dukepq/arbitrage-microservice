import "dotenv/config";

export default function (variable: string) {
  const envVar = process.env[variable];
  if (!envVar) {
    throw new Error(`Environment variable "${variable}" does not exist.`);
  }
  return envVar;
}
