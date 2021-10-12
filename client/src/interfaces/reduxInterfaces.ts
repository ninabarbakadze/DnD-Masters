export type PayloadAction<T> = (payload: T) => {
  type: string;
  payload: typeof payload;
};
