import { IMember } from "../../components/sdsb-component/models/Member";
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
  member: IMember;
}

interface IUser {
  user: IUserData;
  token: string;
  expires: number;
  email: string;
  phone: string;
}

export interface ISignIn {
  data: IUser;
  statusCode: number;
  message: string;
  error_message: string;
}
