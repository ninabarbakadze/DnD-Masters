export type iAction<T> = {
  type: string;
  payload: T;
};

export type PayloadAction<T> = (payload: T) => iAction<typeof payload>;
