import { configApi } from '~UTILS'

export class GeneralUtil {
  public static msToDate(ms: number): string {
    const _ms = ms / 1e10 < 1 ? ms * 1000 : ms
    const date = new Date(_ms).toISOString() // Generating univesal ISO format
    return date
  }

  public static getPostUrl(code: string): string {
    return `${configApi.urlBase}/p/${code}`
  }
}
