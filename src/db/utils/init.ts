import pg from "pg";
import { argv } from "process";

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

try {
  console.time("init executed in");
  console.log(client);
  await client.connect();
  await client.query(CREATE_MESSAGE_TABLE);
  await client.end();
  console.log("init successful");
} catch (error) {
  console.error(error);
} finally {
  console.timeEnd("init executed in");
}
