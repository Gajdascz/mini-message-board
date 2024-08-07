import { Pool } from "pg";

class PostgresqlDatabase {
  private pool?: Pool | undefined = undefined;
  constructor(connectionString: string) {
    if (connectionString) this.connect(connectionString);
  }

  private abort = (cmd: string, msg: string) => {
    console.warn(`[POSTGRESQLDB] Aborting ${cmd}: ${msg}`);
    return false;
  };

  public connect = async (connectionString: string) => {
    if (this.pool) return this.abort("connect", `Database already has an active connection.`);
    this.pool = new Pool({ connectionString });
    return true;
  };
  public end = async () => {
    if (!this.pool) return this.abort("end", `Database does not have an active connection`);
    await this.pool.end();
    this.pool = undefined;
    return true;
  };

  public query = async (query: string, values?: any[]) => {
    if (!this.pool) return this.abort("query", `Database is not ready.`);
    const result = await this.pool.query(query, values);
    return result;
  };
}

export { PostgresqlDatabase };
