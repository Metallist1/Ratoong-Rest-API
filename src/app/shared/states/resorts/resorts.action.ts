
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
  constructor(public id: number) {}
  static readonly type = 'GetAllLocations';
}

export class GetAllCountries {
  static readonly type = 'GetAllCountries';
}

export class GetFilteredResortData {
  constructor(public id: string, public country: string, public age: string, public gender: string,
              public fromDate: string, public toDate: string) {}
  static readonly type = 'GetFilteredResortData';
}
