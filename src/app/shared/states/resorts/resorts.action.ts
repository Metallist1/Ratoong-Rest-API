
export class GetResorts {
  static readonly type = 'GetResorts';
}

export class SortResorts {
  constructor(public str: string) {}
  static readonly type = 'SortResorts';
}

export class SetFilter {
  constructor(public str: string) {}
  static readonly type = 'SetFilter';
}

export class GetAllLocations {
  static readonly type = 'GetAllLocations';
}

export class GetAllCountries {
  static readonly type = 'GetAllCountries';
}
