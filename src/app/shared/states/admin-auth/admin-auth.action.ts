export class LoginAdmin {
  static readonly type = '[Auth] Login Admin';
  constructor(public username: string, public password: string) {}
}

export class CreateAccount {
  static readonly type = '[Auth] Create Admin';
  constructor(public username: string, public password: string) {}
}

export class ChangePassword {
  static readonly type = '[Auth] ResetPassword';
  constructor(public currentPassword: string, public newPassword: string) {}
}

export class GenerateAPIKey {
  static readonly type = '[Auth] GenerateAPIKey';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
