import {RatingController} from './ratings/rating.controller';
import {RatingControllerFirebase} from './ratings/rating.controller.firebase';
import {RatingRepositoryFirebase} from './ratings/rating.repository.firebase';
import {RatingRepository} from './ratings/rating.repository';
import {RatingService} from './ratings/rating.service';

export class DependencyFactory {
  getReviewController(): RatingController {
    const repo: RatingRepository = new RatingRepositoryFirebase();
    const service: RatingService = new RatingService(repo);
    return new RatingControllerFirebase(service)
  }

}
