export type WithChildren<T = Record<string, unknown>> = T & {
  children?: React.ReactNode;
};

export type ApiHealthResponse = {
  status: "ok";
  timestamp: string;
  version: string;
};
