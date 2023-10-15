export interface loginData {
  userName: string;
  password: string;
}

export interface GetUserResponse {
  id: number;
  email: string;
  userName: string;
  password: string;
}

export  type PostUserResponse = GetUserResponse

export type PostUser = Omit<GetUserResponse, 'id'>

export class User {
  constructor(public email: string, public userName: string) {
  }
}
