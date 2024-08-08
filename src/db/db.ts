import pg from "pg";
import { pgDatabaseUrl } from "../config/envVars.js";
import {
  INSERT_MESSAGE,
  SELECT_BY_USERNAME,
  SELECT_ALL_MESSAGES,
  SELECT_BY_ID,
} from "./utils/queryGenerators.js";

const { Pool } = pg;

const pool = new Pool({ connectionString: pgDatabaseUrl });

const insertMessage = async (username: string, body: string, sent: Date) => {
  const query = INSERT_MESSAGE(username, body, sent);
  const result = await pool.query(query);
  return result;
};
const selectByUsername = async (username: string) => {
  const query = SELECT_BY_USERNAME(username);
  const result = await pool.query(query);
  return result;
};
const selectAllMessages = async () => {
  const query = SELECT_ALL_MESSAGES();
  const result = await pool.query(query);
  return result;
};
const selectById = async (id: number | string) => {
  const query = SELECT_BY_ID(id);
  console.log(query);
  console.log(id);
  const result = await pool.query(query);
  return result;
};
export default { insertMessage, selectByUsername, selectAllMessages, selectById };
