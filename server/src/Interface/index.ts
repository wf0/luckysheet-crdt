export type IKeyMap<T extends string | number | symbol, V> = {
  [key in T]: V;
};
