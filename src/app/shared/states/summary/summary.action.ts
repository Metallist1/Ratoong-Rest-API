export class GetFilteredResortData {
  constructor(public id: string, public country: string, public age: string, public gender: string,
              public fromDate: string, public toDate: string) {}
  static readonly type = 'GetFilteredResortData';
}

export class GetAllCountries {
  static readonly type = 'GetAllCountries';
}

export class GetAllLocations {
  constructor(public id: number) {}
  static readonly type = 'GetAllLocations';
}


export class GetQuestions {
  static readonly type = 'GetQuestions';
}
