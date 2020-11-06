import * as admin from 'firebase-admin';
import {RatingRepository} from "./rating.repository";


export class RatingRepositoryFirebase implements RatingRepository {

  async syncRatings(locationID: string,questionID: string,valueChanged: number, countChanged:number, isAnon: boolean): Promise<any>  {
   const commonId = await this.getCommonID(locationID);
   const masterValue = await this.generateMasterReview(commonId,questionID,valueChanged,countChanged,isAnon);
   return await this.syncroniseAllReviews(locationID,questionID,commonId,masterValue);
  }

  private async getCommonID(locationID: string): Promise<string> {
    const snapshot = await admin.database().ref('/NewLocations/'+locationID).once('value');
    return snapshot.val().CommonId;
  }

  // masterOverallScore: (Math.round((CtotalScore / CtotalCount) * 100) / 100).toFixed(2),
  private async generateMasterReview(commonId: string,questionID: string,valueChanged: number,countChanged: number,isAnon: boolean): Promise<any> {
    console.log(commonId,questionID,valueChanged,countChanged,isAnon);
    let CanonTotalScore = 0;
    let CanonTotalCount = 0;
    let Ctotal1 = 0;
    let Ccount1 = 0;
    const snapshot = await admin.database().ref('/ResortCommon/' + commonId + '/LocationScores/' + questionID).once('value');
    if (snapshot.val() !== null) { // If there is a result
      Ctotal1 = (!snapshot.val().hasOwnProperty('totalScore')) ? 0 : snapshot.val().totalScore;
      Ccount1 = (!snapshot.val().hasOwnProperty('totalCount')) ? 0 : snapshot.val().totalCount;
      CanonTotalScore = (!snapshot.val().hasOwnProperty('anonTotalScore')) ? 0 : snapshot.val().anonTotalScore;
      CanonTotalCount = (!snapshot.val().hasOwnProperty('anonTotalCount')) ? 0 : snapshot.val().anonTotalCount;
    }
    if(!isAnon){
      Ctotal1 = Ctotal1 + valueChanged;
      Ccount1 = Ccount1 + countChanged;
    }else{
      CanonTotalScore = CanonTotalScore + valueChanged;
      CanonTotalCount = CanonTotalCount + countChanged;
    }
    const CtotalScore = Ctotal1 + CanonTotalScore;
    const CtotalCount = Ccount1 + CanonTotalCount;
    const commonlocationRating = {
      overallScore: (Math.round((CtotalScore / CtotalCount) * 100) / 100).toFixed(2),
      totalScore: Ctotal1,
      totalCount: Ccount1,
      anonTotalScore: CanonTotalScore,
      anonTotalCount: CanonTotalCount
    };
    await admin.database().ref('ResortCommon/' + commonId + '/LocationScores/' + questionID).set(commonlocationRating);
    console.log(commonlocationRating);
    return {overall: (Math.round((CtotalScore / CtotalCount) * 100) / 100).toFixed(2), count: CtotalCount};
  }
  // for each location. Update its master values.
  private async syncroniseAllReviews(locationID: string,questionID: string ,commonId: string, masterValue: object): Promise<any>{
    console.log(locationID,questionID ,commonId, masterValue);
    await admin.database().ref('/NewLocations/').orderByChild('CommonId').equalTo(commonId).once('value').then((snapshot) => {
     snapshot.forEach((obj) => {
       console.log(obj.val().LocationId);
       // @ts-ignore
       admin.database().ref('NewLocations/' + obj.val().LocationId + '/LocationScores/'+ questionID).update({masterOverallScore: masterValue.overall, masterOverallCount:masterValue.count}).catch(er=>{
         console.log(er);
       });
     });
     return Promise.resolve(undefined);
   })

  }
}
