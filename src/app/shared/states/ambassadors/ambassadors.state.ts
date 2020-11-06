import {Ambassador} from './entities/ambassador';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetAmbassadors, GetSponsors} from './ambassadors.action';
import {AmbassadorsService} from './ambassadors.service';
import {Sponsor} from './entities/sponsor';

export class AmbassadorsStateModel {
  ambassadorList: Ambassador[];
  sponsorList: Sponsor[];
}

@State<AmbassadorsStateModel>({
  name: 'ambassadors',
  defaults: {
    ambassadorList: [],
    sponsorList: []
  }
})
@Injectable()
export class AmbassadorsState {

  constructor(private ambassadorService: AmbassadorsService) {}

  @Selector()
  static ambassadorList(state: AmbassadorsStateModel): any {
    return state.ambassadorList;
  }

  @Selector()
  static sponsorList(state: AmbassadorsStateModel): any {
    return state.sponsorList;
  }

  @Action(GetAmbassadors)
  getAmbassadors({getState, setState}: StateContext<AmbassadorsStateModel>): any {
    return this.ambassadorService.getAmbassadors().then((result) => {
        const state = getState();
        setState({
          ...state,
          ambassadorList: result,
        });
      }
    );
  }

  @Action(GetSponsors)
  getSponsors({getState, setState}: StateContext<AmbassadorsStateModel>): any {
    return this.ambassadorService.getSponors().then((result) => {
        const state = getState();
        setState({
          ...state,
          sponsorList: result,
        });
      }
    );
  }
}
