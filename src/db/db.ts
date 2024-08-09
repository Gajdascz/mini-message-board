import pg from "pg";
import { pgDatabaseUrl } from "../config/envVars.js";
import {
  INSERT_MESSAGE,
  SELECT_BY_USERNAME,
  SELECT_ALL_MESSAGES,
  SELECT_BY_ID,
} from "./utils/queryGenerators.js";
import { createLogger } from "../config/logger.js";

const { Pool } = pg;

const pool = new Pool({ connectionString: pgDatabaseUrl });

const logger = createLogger("db");

const log = (fn: string, query: string, result: any) => {
  logger(
    `%s
  -> query: %s
  -> result: %O
  `,
    fn,
    query,
    result
  );
};

const insertMessage = async (username: string, body: string, sent: Date) => {
  const query = INSERT_MESSAGE(username, body, sent);
  const result = await pool.query(query);
  log("insertMessage", query, result);
  return result;
};
const selectByUsername = async (username: string) => {
  const query = SELECT_BY_USERNAME(username);
  const result = await pool.query(query);
  log("selectByUsername", query, result);
  return result;
};
const selectAllMessages = async () => {
  const query = SELECT_ALL_MESSAGES();
  const result = await pool.query(query);
  log("selectAllMessages", query, result);
  return result;
};
const selectById = async (id: number | string) => {
  const query = SELECT_BY_ID(id);
  const result = await pool.query(query);
  log("selectById", query, result);
  return result;
};

export default { insertMessage, selectByUsername, selectAllMessages, selectById };
