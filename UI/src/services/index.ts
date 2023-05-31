import { User } from '../classes';

const API_URL = 'http://172.17.0.1:8081';
export async function getUsers(): Promise<User[]> {
  let data = await fetch(API_URL + '/v1/users');
  return data.json();
}
