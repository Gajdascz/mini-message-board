import format from "pg-format";

/**
 * Inserts a new message into the messages table and escapes inputs to prevent sql injection.
 *
 *  @returns INSERT INTO messages (username,body,sent) VALUES (%username,%body,%sent)
 */
const INSERT_MESSAGE = (username: string, body: string, sent: Date) =>
  format("INSERT INTO messages (username,body,sent) VALUES (%L,%L,%L)", username, body, sent);

/**
 * Selects all messages from the messages table that match the escaped provided username.
 *
 * @returns SELECT * FROM messages WHERE messages.username = %username
 */
const SELECT_BY_USERNAME = (username: string) =>
  format("SELECT * FROM messages WHERE messages.username = %L", username);

/**
 * Selects the message from the messages table that has the provided id.
 *
 * @returns SELECT * FROM messages WHERE messages.username = %username
 */
const SELECT_BY_ID = (id: number | string) =>
  format("SELECT * FROM messages WHERE messages.id = %s", id);

/**
 * Selects all messages from the messages table.
 *
 * @returns SELECT * FROM messages
 */
const SELECT_ALL_MESSAGES = () => "SELECT * FROM messages";

export { INSERT_MESSAGE, SELECT_BY_USERNAME, SELECT_ALL_MESSAGES, SELECT_BY_ID };
