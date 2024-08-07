import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(import.meta.dirname, "../../", ".env") });

type ServerPort = number;
type PgPort = number;
type PgHost = string;
type PgUser = string;
type PgPassword = string;
type PgDatabase = string;
type PgDatabaseUrl = string;

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

const serverPort: ServerPort = getEnvVar("SERVER_PORT", "3000", true) as ServerPort;
const pgPort: PgPort = getEnvVar("PGPORT", "5432", true) as PgPort;
const pgHost: PgHost = getEnvVar("PGHOST") as PgHost;
const pgUser: PgUser = getEnvVar("PGUSER") as PgUser;
const pgPassword: PgPassword = getEnvVar("PGPASSWORD") as PgPassword;
const pgDatabase: PgDatabase = getEnvVar("PGDATABASE") as PgDatabase;
const pgDatabaseUrl: PgDatabaseUrl = getEnvVar("DATABASE_URL") as PgDatabaseUrl;

export { serverPort, pgPort, pgHost, pgUser, pgPassword, pgDatabase, pgDatabaseUrl };
