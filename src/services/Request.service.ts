import axios from 'axios'
import { configApi } from '~UTILS'

export class RequestService {
  constructor(private id: string) {}

  public async api(query: string): Promise<TInstagramApi | TPostApi> {
    const isUrl = query.search(/^(https)/) > -1
    const url: string = isUrl ? query : `${configApi.urlBase}/${query}`

    const { status, data } = await axios.get(url + '/?__a=1', {
      headers: {
        cookie: `sessionid=${this.id}`
      }
    })

    if (status === 200) return data
    else {
      console.warn('WARN-REQUEST ->', status, data)
      throw new Error('status request api')
    }
  }
}
