export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Todo {
  id: number | null;
  title: string;
  description: string;
  status: TodoStatus;
  user: User;
  createdAt?: Date;
  updatedAt?: Date;
}
export enum TodoStatus {
  CREATED,
  ONPROGRESS,
  COMPLETED,
}
