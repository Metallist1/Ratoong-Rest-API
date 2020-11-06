import {Change, EventContext} from 'firebase-functions';
import { RatingController } from "./rating.controller";
import {RatingService} from "./rating.service";
import {DataSnapshot} from "firebase-functions/lib/providers/database";

export class RatingControllerFirebase implements RatingController {
  constructor(private ratingService: RatingService) {}


  syncRatings(snap: Change<DataSnapshot>, context: EventContext): Promise<void> {

    const beforeP = snap.before.val();
    const afterP = snap.after.val();
    console.log(beforeP, afterP, context)
    return this.ratingService.syncRatings(context.params.locationId, context.params.id, beforeP, afterP);
  }

}
