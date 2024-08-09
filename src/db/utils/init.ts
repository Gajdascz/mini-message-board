import pg from "pg";
import { argv } from "process";
import { createLogger } from "../../config/logger.js";

const { Client } = pg;

const CREATE_MESSAGE_TABLE = `--sql 
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ),
    body TEXT,
    sent TIMESTAMP(0)
  );
`;

const client = new Client({
  connectionString: argv[2],
});

const verifyTable = async () => {
  try {
    await client.query("SELECT * FROM messages");
  } catch (error) {
    throw new Error(`Messages table does not exist`);
  }
};

const logger = createLogger("db:utils:init");

try {
  logger("initializing database...");
  await client.connect();
  logger("connected to database");
  await client.query(CREATE_MESSAGE_TABLE);
  await verifyTable();
  logger("messages table created successfully");
  await client.end();
  logger("client disconnected from database");
  console.log("init successful");
} catch (error) {
  logger("error during init %O", error);
}
