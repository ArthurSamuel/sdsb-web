import { IProfile } from "../../../components/sdsb-component/models/Member"
import { Request } from "../../../utils/Http"
import { IGetCredit } from "../model/HomeModel"

export default class HomeService {
  public async GetCredit():Promise<IGetCredit> {
    const results = await Request({
      url: '/wallet',
      method: 'GET'
    })
    return results
  }

  public async GetProfile():Promise<IProfile>  {
    const results = await Request({
      url: '/profile',
      method: 'GET'
    })
    return results
  }
}