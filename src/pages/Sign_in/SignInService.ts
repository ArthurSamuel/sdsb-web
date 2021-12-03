import { Request } from "../../utils/Http";
import { ISignIn } from "./SignInModel";
export default class SignInService {
  public async GetUser(username: string, password: string): Promise<ISignIn> {
    const results = await Request({
      url: "/login",
      method: "POST",
      data: {
        username,
        password,
      },
    });
    return results;
  }
}
