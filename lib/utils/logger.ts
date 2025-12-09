type LogLevel = "info" | "warn" | "error";

const log = (level: LogLevel, message: string, meta?: Record<string, unknown>) => {
  const payload = {
    level,
    message,
    ...(meta ?? {}),
    timestamp: new Date().toISOString(),
  };

  // eslint-disable-next-line no-console
  console[level](JSON.stringify(payload));
};

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => log("info", message, meta),
  warn: (message: string, meta?: Record<string, unknown>) => log("warn", message, meta),
  error: (message: string, meta?: Record<string, unknown>) => log("error", message, meta),
};
