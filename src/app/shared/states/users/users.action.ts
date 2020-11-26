
export class GetUsers {
  static readonly type = 'GetUsers';
}

export class SetFilter {
  constructor(public str: string) {}
  static readonly type = 'SetFilter';
}
