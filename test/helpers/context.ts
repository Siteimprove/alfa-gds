export interface Context {
  counts: {
    total: number;
    found: number;
    invalid: number;
    legacy: {
      error: number;
      warning: number;
    };
  };
}
