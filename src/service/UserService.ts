import envConfig from '@/config/envConfig';
import Http from '@/util/http';
import { Request } from '@/util/request';

export namespace UserService {
  export async function HttpGetExample() {
    const res = await Http.GET(
      envConfig.baseUrl + 'query',
      {},
      { ignoreToken: true }
    );
    console.log('res', res);
    return res;
  }

  export function uniPostExample(): any {
    const url = envConfig.baseUrl + 'upload';
    console.log('url', url);
    uni.request({
      url: url,
      method: 'POST',
      data: {},
      success(result) {
        console.log('request success', result.data);
      },
    });
  }

  export async function axiosGetExample() {
    return Request.get('query');
  }
}
