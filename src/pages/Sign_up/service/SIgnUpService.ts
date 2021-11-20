import { IRegister, ISignUp } from "../model/SignUpModel";
import { Request } from "../../../utils/Http";
import { IMember } from "../../../components/sdsb-component/models/Member";

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
    const results = await Request({
      url: "/register",
      method: "POST",
      data: {
        name: name,
        username: username,
        email: email,
        password: password,
        password_confirmation: passwordConfirm,
        phone: phone,
        pin: pin,
        reference_id: idRef,
      },
    });
    return results;
  }
}
