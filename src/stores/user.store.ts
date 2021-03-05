import { observable, action } from 'mobx';
import { AuthService } from "../servises/auth.service";

export interface IUserStore {
  authService: AuthService
}

export class UserStore implements IUserStore{
  @observable username = null;
  authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  @action
  async signin(username: string, password: string) {
    this.username = await this.authService.signin(username, password);
  }

  @action
  async signup(username: string, password: string) {
    return this.authService.signup(username, password);
  }

  @action
  signout() {
    this.username = null;
    this.authService.removeToken();
  }
}
