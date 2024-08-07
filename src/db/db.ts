import { PostgresqlDatabase } from "./src/PostgresqlDatabase.js";
import { queryGenerators } from "./src/queryGenerators.js";
import { pgDatabaseUrl } from "../config/envVars.js";

const db = new PostgresqlDatabase(pgDatabaseUrl);
