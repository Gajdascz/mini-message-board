import { config } from "dotenv";
import path from "path";
import { createLogger } from "./logger.js";

config({ path: path.resolve(import.meta.dirname, "../../", ".env") });

type ServerPort = number;
type PgPort = number;
type PgHost = string;
type PgUser = string;
type PgPassword = string;
type PgDatabase = string;
type PgDatabaseUrl = string;

const envLogger = createLogger("config:envVars");

const getErr = (variable: string) =>
  new Error(`Cannot load configuration without a defined ${variable} environment variable`);

const getEnvVar = (
  varName: string,
  defaultValue?: string,
  toNum: boolean = false
): string | number => {
  const value = process.env[varName];
  if (value) return toNum ? +value : value;
  else if (!value && defaultValue) return toNum ? +defaultValue : defaultValue;
  else throw getErr(varName);
};

const serverPort: ServerPort = getEnvVar("PORT", "3000", true) as ServerPort;
envLogger(`loaded server port: ${serverPort}`);
envLogger(`env server port: ${process.env.PORT}`);

const pgPort: PgPort = getEnvVar("PGPORT", "5432", true) as PgPort;
envLogger(`loaded pg port: ${pgPort}`);
envLogger(`env pg port: ${process.env.PGPORT}`);

const pgHost: PgHost = getEnvVar("PGHOST") as PgHost;
envLogger(`pgHost: ${pgHost}`);

const pgUser: PgUser = getEnvVar("PGUSER") as PgUser;
envLogger(`pgUser: ${pgUser}`);

const pgPassword: PgPassword = getEnvVar("PGPASSWORD") as PgPassword;
envLogger(`pgPassword: ${pgPassword}`);

const pgDatabase: PgDatabase = getEnvVar("PGDATABASE") as PgDatabase;
envLogger(`pgDatabase: ${pgDatabase}`);

const pgDatabaseUrl: PgDatabaseUrl = getEnvVar("DATABASE_URL") as PgDatabaseUrl;
envLogger(`pgDatabaseUrl: ${pgDatabaseUrl}`);

export { serverPort, pgPort, pgHost, pgUser, pgPassword, pgDatabase, pgDatabaseUrl };
