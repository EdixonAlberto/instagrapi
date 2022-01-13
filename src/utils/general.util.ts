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

  public static logger(title: string, event: unknown): void {
    if (configApi.devMode) {
      if (typeof event === 'string' || 'object') console.log(title + ':', event)
      else console.error(title + ':', (event as Error).message)
    }
  }
}
