import format from "pg-format";

type QueryGeneratorConfig = [string, QueryGenerator][];

type QueryGenerator = (...args: any[]) => string;
type QueryMap = Map<string, QueryGenerator>;

const QUERY_GENERATOR_KEYS = {
  CREATE_MESSAGE_TABLE: "CREATE_MESSAGE_TABLE",
  INSERT_MESSAGE: "INSERT_MESSAGE",
  SELECT_BY_USERNAME: "SELECT_BY_USERNAME",
};

const queryGenerators: QueryGeneratorConfig = [
  [
    QUERY_GENERATOR_KEYS.CREATE_MESSAGE_TABLE,
    () => `--sql 
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username VARCHAR ( 255 ),
      body TEXT,
      sent TIMESTAMP(0) WITHOUT TIME ZONE
    );
  `,
  ],
  [
    QUERY_GENERATOR_KEYS.INSERT_MESSAGE,
    (username: string, body: string, sent: string) =>
      format("INSERT INTO messages (username,body,sent) VALUES (%L,%L,%L)", username, body, sent),
  ],
  [
    QUERY_GENERATOR_KEYS.SELECT_BY_USERNAME,
    (username: string) => format("SELECT * FROM messages WHERE messages.username = %L", username),
  ],
];

export { queryGenerators, QUERY_GENERATOR_KEYS };
