import { RatingRepository } from "./rating.repository";

export class RatingService {

  constructor(private ratingRepository: RatingRepository) {
  }

  syncRatings(locationID: string, questionID: string, beforeP: any, afterP: any) {

    //Figure out what changes were made to question
    if(beforeP.anonTotalCount !== afterP.anonTotalCount){
      // Anon was changed
      const countChanged = Number(afterP.anonTotalCount) - Number(beforeP.anonTotalCount); //Can be 0 or 1
      const valueChanged = Number(afterP.anonTotalScore) - Number(beforeP.anonTotalScore); // 5 - 3 = 2 or 3 - 5 = -2 . Total value shift.
      return this.ratingRepository.syncRatings(locationID,questionID,valueChanged, countChanged, true);
    }else{
      // User was changed
      const countChanged = Number(afterP.totalCount) - Number(beforeP.totalCount); //Can be 0 or 1
      const valueChanged = Number(afterP.totalScore) - Number(beforeP.totalScore); // 5 - 3 = 2 or 3 - 5 = -2 . Total value shift.
      return this.ratingRepository.syncRatings(locationID,questionID,valueChanged, countChanged, false);
    }
  }
}
