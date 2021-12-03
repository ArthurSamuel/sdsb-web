import { IRegister, ISignUp, IVerification } from "../model/VerificationModel";
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
      data,
    });
    return results;
  }

  public async SentVerificationCode(
    identifier: string,
    type: "phone" | "email"
  ): Promise<IVerification> {
    const url =
      type === "phone" ? "/resend-phone-verification" : "/resend-verification";
    const results = await Request({
      url,
      method: "POST",
      data: {
        email: identifier,
        phone_number: identifier,
      },
    });
    return results;
  }

  public async SubmitVerification(
    email: string,
    phone: string,
    emailCode: string,
    phoneCode: string
  ): Promise<IVerification> {
    const results = await Request({
      url: "/email-verification",
      method: "POST",
      data: {
        email,
        email_verification_code: emailCode,
        phone_verification_code: phoneCode,
      },
    });
    return results;
  }
}
