import axios from "axios";
import { KeyToken, Server } from "./Constant";

interface IRequest {
  url: string;
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH";
  data?: {};
  headers?: {};
  params?: {};
}

function toFormData(param: any, type: "FormData" | "URLSearchParams") {
  const formData = type === "FormData" ? new FormData() : new URLSearchParams();
  Object.keys(param).forEach((item) => {
    formData.append(item, param[item]);
  });
  return formData;
}

export async function Request({ url, method, data, headers, params }: IRequest) {
  let storage = localStorage.getItem(KeyToken);
  let urlServer =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
      ? Server.dev
      : Server.prod;
  let requestParam: IRequest = {
    url: `${urlServer}${url}`,
    method: method
  };
  if (storage) {
    let token = JSON.parse(storage).token;
    requestParam = {
      ...requestParam,
      headers: {
        'Authorization': `Bearer ${token}`,
        ...headers
      },
    };
  }
  if (data) {
    requestParam = {
      ...requestParam,
      data: toFormData(
        data,
        method === "POST" ? "FormData" : "URLSearchParams"
      ),
    };
  }
  if (params) {
    requestParam = {
      ...requestParam,
      params
    }
  }
  const results = await axios(requestParam);
  return results.data;
}
