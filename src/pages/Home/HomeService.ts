import { notification } from "antd";
import { Request } from "../../utils/Http";
import { KeyToken } from '../../utils/Constant'

export default class HomeService {
  login = () => {
    Request({
      url: "/login",
      method: "POST",
      data: {
        username: "admin",
        password: "admin",
      },
    })
      .then((res) => {
        console.log(res);
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
