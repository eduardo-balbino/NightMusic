declare module "pg" {
  export class Pool {
    constructor(config?: { connectionString?: string });
    query<T = unknown>(text: string, params?: unknown[]): Promise<{ rows: T[] }>;
    connect(): Promise<{
      query(text: string, params?: unknown[]): Promise<unknown>;
      release(): void;
    }>;
  }
}
