import {RatingController} from './ratings/rating.controller';
import {RatingControllerFirebase} from './ratings/rating.controller.firebase';
import {RatingRepositoryFirebase} from './ratings/rating.repository.firebase';
import {RatingRepository} from './ratings/rating.repository';
import {RatingService} from './ratings/rating.service';

import {RestapiController} from './RestAPI/restapi.controller';
import {RestapiControllerFirebase} from './RestAPI/restapi.controller.firebase';
import {RestapiService} from './RestAPI/restapi.service';
import {RestapiRepositoryFirebase} from './RestAPI/restapi.repository.firebase';
import {RestapiRepository} from './RestAPI/restapi.repository';

export class DependencyFactory {

  getReviewController(): RatingController {
    const repo: RatingRepository = new RatingRepositoryFirebase();
    const service: RatingService = new RatingService(repo);
    return new RatingControllerFirebase(service)
  }

  getResortController(): RestapiController {
    const repo: RestapiRepository = new RestapiRepositoryFirebase();
    const service: RestapiService = new RestapiService(repo);
    return new RestapiControllerFirebase(service)
  }
}
