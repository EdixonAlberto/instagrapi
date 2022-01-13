import axios from 'axios'
import { configApi, GeneralUtil } from '~UTILS'

export class RequestService {
  constructor(private id: string) {}

  public async api(query: string): Promise<TResponseApi['graphql']> {
    const isUrl = query.search(/^(https?)/) > -1
    const url: string = isUrl ? query : `${configApi.urlBase}/${query}`

    try {
      const { status, data } = await axios.get<TResponseApi>(url + '/?__a=1', {
        headers: {
          cookie: `sessionid=${this.id}`
        }
      })

      if (status === 200) return data.graphql
      else {
        GeneralUtil.logger('WARN-REQUEST', data)
        throw new Error('Status incorrect in request api')
      }
    } catch (error) {
      GeneralUtil.logger('ERROR-REQUEST', error)
      throw error
    }
  }
}
