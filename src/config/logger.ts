import debug from "debug";

class DebugLogger {
  private enabled: boolean;
  public readonly namespace: string;
  private readonly log: debug.Debugger;

  constructor(namespace?: string, enable?: true) {
    this.namespace = namespace ?? process.env.DEBUG_NAMESPACE ?? "app";
    this.enabled = enable ?? process.env.DEBUG_ENABLED === "true";
    process.env.DEBUG_NAMESPACE = this.namespace;
    process.env.DEBUG_ENABLED = String(this.enabled);
    this.log = debug(`${this.namespace}`);
  }
  public toggle = (state?: boolean) => {
    this.enabled = state ?? !this.enabled;
    process.env.DEBUG_ENABLED = String(state);
    if (this.enabled) debug.enable(`${this.namespace}*`);
    else debug.disable();
    this.log(`Debug Logger: ${this.enabled ? `Enabled` : `Disabled`}`);
  };

  public create = (namespace: string) => debug(`${this.namespace}:${namespace}`);
}
const logger = new DebugLogger();

const createLogger = logger.create;
const toggleLogger = logger.toggle;

export { createLogger, toggleLogger };
