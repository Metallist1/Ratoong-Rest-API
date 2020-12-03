
export class GetResorts {
  static readonly type = 'GetResorts';
}

export class SetFilter {
  constructor(public str: string) {}
  static readonly type = 'SetFilter';
}

export class GetAllLocations {
  static readonly type = 'getAllLocations';
}
