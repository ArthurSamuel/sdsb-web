import { IProfile } from "../../../components/sdsb-component/models/Member";
import { Request } from "../../../utils/Http";

export default class ProfileService {
  public async GetProfile(): Promise<IProfile> {
    const results = await Request({
      url: '/profile',
      method: 'GET'
    })
    return results
  }

  public async Logout(): Promise<IProfile> {
    const results = await Request({
      url: '/logout',
      method: 'GET'
    })
    return results
  }
}