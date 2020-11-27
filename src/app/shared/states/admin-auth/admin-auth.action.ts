export class LoginAdmin {
  static readonly type = '[Auth] Login Admin';
  constructor(public username: string, public password: string) {}
}

export class CreateAccount {
  static readonly type = '[Auth] Create Admin';
  constructor(public username: string, public password: string) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
