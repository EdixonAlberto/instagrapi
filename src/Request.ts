import axios from 'axios';

class Request {
  public static async api(query: string): Promise<TInstagramApi | TPostApi> {
    const isUrl = query.search(/^(https)/) > -1;
    const url: string = isUrl ? query : `${global.config.urlBase}/${query}`;

    const { status, data } = await axios.get(url + '/?__a=1');

    if (status === 200) return data;
    else {
      console.warn('WARN-REQUEST ->', status, data);
      throw new Error('status request api');
    }
  }
}

export { Request };
