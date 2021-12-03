import { IRegister, ISignUp } from "../model/SignUpModel";
import { Request } from "../../../utils/Http";

export default class SignUpService {
  public async Register({
    name,
    username,
    email,
    password,
    passwordConfirm,
    phone,
    pin,
    idRef,
  }: IRegister): Promise<ISignUp> {
    let data: any = {
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirm,
      phone: phone,
      pin: pin,
    };
    if (idRef) {
      data = {
        ...data,
        reference_id: idRef,
      };
    }
    const results = await Request({
      url: "/register",
      method: "POST",
      data
    });
    return results;
  }
}
