import { IMember } from "../sdsb-component/models/Member";
import { Request } from "../../utils/Http";

interface IGetMemberByCode {
  data: IMember;
  statusCode: number;
  message: string;
  error_message: string;
}

interface IDoTransfer {
  data: string;
  statusCode: number;
  message: string;
  error_message: string;
}

export default class TransferService {
  public async GetUserInformation(id: string): Promise<IGetMemberByCode> {
    const results = await Request({
      url: `/member/${id}`,
      method: "GET",
    });
    return results;
  }
  public async DoTransfer(kode: string, nominal: string, pin: string, deskripsi?: string): Promise<IDoTransfer> {
    const results = await Request({
      url: `/wallet/transfer`,
      method: "POST",
      data: {
        kode,
        nominal,
        pin,
        deskripsi
      }
    });
    return results;
  }
}
