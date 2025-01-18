export type Config = Record<string, any>;

export interface IJSTag {
  init(config: Config): () => void;
  pageView(payload?: any): void;
  identify(payload?: any): void;
  send(payload?: any): void;
}