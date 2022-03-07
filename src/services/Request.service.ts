import axios from 'axios'
import { configApi, GeneralUtil } from '~UTILS'

export class RequestService {
  constructor(private id: string) {}

  public async api<R = TProfileApi | TPostApi>(query: string): Promise<R> {
    const isUrl = query.search(/^(https?)/) > -1
    const endpoint = (isUrl ? query : `${configApi.urlBase}/${query}`) + '/?__a=1'

    try {
      const { data } = await axios.get<R>(endpoint, {
        headers: {
          cookie: `sessionid=${this.id}`
        }
      })

      return data
    } catch (error) {
      GeneralUtil.logger('ERROR-REQUEST', error)
      throw error
    }
  }
}
