import { notification } from "antd";
import { Request } from "../../utils/Http";
import { KeyToken } from '../../utils/Constant'
import { ISignIn } from './SignInModel'

export default class SignInService {
  public async GetUser(username: string, password: string): Promise<ISignIn> {
    const results = await Request({
      url: '/login',
      method: 'POST',
      data: {
        username,
        password
      }
    })
    return results
  }

  login = async (username: string | undefined, password: string | undefined) => {
    Request({
      url: "/login",
      method: "POST",
      data: {
        username,
        password
      },
    })
      .then((res) => {
        localStorage.setItem(KeyToken, JSON.stringify(res.data))
      })
      .catch((err) => {
        console.log(err);
        notification.info({
          message: "error",
          description: "error",
          placement: "bottomRight",
        });
      });
  };
}
