import axios from "axios";
import { KeyToken, Server } from "./Constant";

interface IRequest {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  data?: {};
  headers?: {};
}

function toFormData(param: any, type: "FormData" | "URLSearchParams") {
  const formData = type === "FormData" ? new FormData() : new URLSearchParams();
  Object.keys(param).forEach((item) => {
    formData.append(item, param[item]);
  });
  return formData;
}

export async function Request({ url, method, data, headers }: IRequest) {
  let token = null;
  let storage = localStorage.getItem(KeyToken);
  let urlServer =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? Server.dev
      : Server.prod;
  let requestParam: IRequest = {
    url: `${urlServer}${url}`,
    method: method,
    data:
      data &&
      toFormData(data, method === "POST" ? "FormData" : "URLSearchParams"),
  };
  if (storage) {
    token = JSON.parse(storage).token;
    requestParam = {
      ...requestParam,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };
  }
  const results = await axios(requestParam);
  return results.data;
}
