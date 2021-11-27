export interface ISignUp {
  data: string;
  statusCode: number;
  message: string;
  error_message: string;
}

export interface IRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: number;
  pin: string;
  idRef?: string;
}

export interface IVerification {
  data: string;
  statusCode: number;
  message: string;
  error_message: string;
}
