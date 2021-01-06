
export class GetUsers {
  static readonly type = 'GetUsers';
}

export class GetUserDetails {
  constructor(public id: string) {}
  static readonly type = 'GetUserDetails';
}

export class SortUsers {
  constructor(public str: string) {}
  static readonly type = 'SortUsers';
}

export class SetFilter {
  constructor(public str: string) {}
  static readonly type = 'SetFilter';
}

export class SetUserSortKey {
  constructor(public str: string) {}
  static readonly type = 'SetUserSortKey';
}
