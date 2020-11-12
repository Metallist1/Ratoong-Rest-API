import {RatingController} from './ratings/rating.controller';
import {RatingControllerFirebase} from './ratings/rating.controller.firebase';
import {RatingRepositoryFirebase} from './ratings/rating.repository.firebase';
import {RatingRepository} from './ratings/rating.repository';
import {RatingService} from './ratings/rating.service';

import {ResortController} from './RestAPI/resort.controller';
import {ResortControllerFirebase} from './RestAPI/resort.controller.firebase';
import {ResortService} from './RestAPI/resort.service';
import {ResortRepositoryFirebase} from './RestAPI/resort.repository.firebase';
import {ResortRepository} from './RestAPI/resort.repository';

export class DependencyFactory {

  getReviewController(): RatingController {
    const repo: RatingRepository = new RatingRepositoryFirebase();
    const service: RatingService = new RatingService(repo);
    return new RatingControllerFirebase(service)
  }

  getResortController(): ResortController {
    const repo: ResortRepository = new ResortRepositoryFirebase();
    const service: ResortService = new ResortService(repo);
    return new ResortControllerFirebase(service)
  }
}
