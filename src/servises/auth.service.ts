// @ts-ignore
import { post } from 'axios';

import BaseHttpService from './base-http.service';

export class AuthService extends BaseHttpService {
  async signin(username: string, password: string) {
    try {
      const result = await post(`${this.BASE_URL}/auth/signin`, { username, password });
      const { accessToken } = result.data;
      // @ts-ignore
      this.saveToken(accessToken, this.routerStore);
      return result.data.username;
    } catch (error) {
      console.log('xxx', error)
    }
  }

  async signup(username: string, password: string) {
    await post(`${this.BASE_URL}/auth/signup`, { username, password });
  }

  async signout() {
    this.removeToken();
  }
}
