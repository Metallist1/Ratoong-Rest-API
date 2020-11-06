import {Change, EventContext} from 'firebase-functions';
import {DataSnapshot} from "firebase-functions/lib/providers/database";

export interface RatingController {

  syncRatings(snap: Change<DataSnapshot>, context: EventContext): Promise<void>;

}
