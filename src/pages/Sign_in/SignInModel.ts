interface IUserData {
  id: number;
  username: string;
  type: string;
  member_id: number;
  customer_id: number;
  name: string;
  email: string;
  image: string;
  description: string;
  status: string;
  pin: string;
}

interface IUser {
  user: IUserData;
  token: string;
  expires: number;
}

export interface ISignIn {
  data: IUser;
  statusCode: number;
  message: string;
  error_message: string;
}