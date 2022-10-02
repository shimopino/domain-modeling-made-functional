export type Branded<T, U extends string> = T & { [Key in U]: never };
