
export class GetResorts {
  static readonly type = 'GetResorts';
}

export class GetResortDetails {
  constructor(public id: string) {}
  static readonly type = 'GetResortDetails';
}

export class SortResorts {
  constructor(public str: string) {}
  static readonly type = 'SortResorts';
}

export class SetResortFilter {
  constructor(public str: string) {}
  static readonly type = 'SetResortFilter';
}

