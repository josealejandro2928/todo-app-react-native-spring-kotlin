import { User, Todo, TodoStatus } from '../classes';

const API_URL = 'http://172.17.0.1:8081';
export async function getUsers(): Promise<User[]> {
  let data = await fetch(API_URL + '/v1/users');
  return data.json();
}

export async function getTodos(token: String): Promise<Todo[]> {
  let data = await fetch(API_URL + '/v1/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data.json();
}

export async function toggleTodo(token: String, todo: Todo): Promise<Todo> {
  let body = { status: 'ONPROGRESS' };
  if (todo.status.toString() != 'COMPLETED') {
    body.status = 'COMPLETED';
  }
  let data = await fetch(API_URL + '/v1/todos/' + todo.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return data.json();
}

export async function deleteTodo(token: String, todo: Todo): Promise<any> {
  let body = { status: 'ONPROGRESS' };
  if (todo.status != TodoStatus.COMPLETED) {
    body.status = 'COMPLETE';
  }
  let data = await fetch(API_URL + '/v1/todos/' + todo.id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function createNewUser(user: Omit<User, 'id'>): Promise<User> {
  const response = await fetch(API_URL + '/v1/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}

export async function createTodo(
  todo: { title: string; description: string },
  token: String
): Promise<Todo> {
  const response = await fetch(API_URL + '/v1/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(todo),
  });
  if (!response.ok) {
    throw await response.json();
  }
  return response.json();
}
