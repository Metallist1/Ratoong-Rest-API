
export interface RatingRepository {

  syncRatings(locationID: string,questionID: string,valueChanged: number, countChanged:number, isAnon: boolean): Promise<any>;

}
