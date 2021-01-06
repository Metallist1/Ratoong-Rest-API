
export class GetResorts {
  static readonly type = 'GetResorts';
}

export class GetResortDetails {
  constructor(public id: string) {}
  static readonly type = 'GetResortDetails';
}

export class SetResortFilter {
  constructor(public str: string) {}
  static readonly type = 'SetResortFilter';
}

export class SetResortSortKey {
  constructor(public str: string) {}
  static readonly type = 'SetResortSortKey';
}

