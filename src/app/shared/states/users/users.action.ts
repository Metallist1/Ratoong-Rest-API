
export class GetUsers {
  static readonly type = 'GetUsers';
}

export class SortUsers {
  constructor(public str: string) {}
  static readonly type = 'SortUsers';
}

export class SetFilter {
  constructor(public str: string) {}
  static readonly type = 'SetFilter';
}
