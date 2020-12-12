import axios from 'axios';

class Request {
  public static async api(
    query: 'instagram' | 'post',
    param: string
  ): Promise<TInstagramApi | TPostApi> {
    const _param = query === 'post' ? `p/${param}` : param;
    const { status, data } = await axios.get(`${global.config.urlBase}/${_param}/?__a=1`);

    if (status === 200) return data;
    else {
      console.warn('WARN-REQUEST ->', status, data);
      throw new Error('status request api');
    }
  }
}

export { Request };
