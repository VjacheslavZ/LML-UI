/**
 * Import all your stores
 */

import { UserStore } from './user.store';
import { AuthService } from "../servises/auth.service";

/**
 * Root Store Class with
 */

export class RootStoreModel {
  authService: AuthService;
  userStore: UserStore;

  constructor() {
    this.authService = new AuthService()
    this.userStore = new UserStore()
  }
}
