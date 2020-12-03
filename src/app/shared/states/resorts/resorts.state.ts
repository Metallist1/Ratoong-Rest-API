
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetAllLocations, GetResorts, SetFilter} from './resorts.action';
import {Resort} from './entities/resort';
import {ResortsService} from './resorts.service';
import {SummaryLocation} from './entities/summaryLocation';

export class ResortStateModel {
  resortList: Resort[];
  summaryLocationList: SummaryLocation[];
  filterBy: string;
}

function matches(resort: Resort, term: string): boolean {
  if (resort.name === undefined) {
     return false;
  }
  return resort.name.toLowerCase().includes(term.toLowerCase());
}

@State<ResortStateModel>({
  name: 'resorts',
  defaults: {
    resortList: [],
    summaryLocationList: [],
    filterBy: ''
  }
})

@Injectable()
export class ResortsState {

  constructor(private resortList: ResortsService) {}

  @Selector()
  static resortList(state: ResortStateModel): any {
    return state.resortList.filter(resort => matches(resort, state.filterBy));
  }

  @Selector()
  static summaryLocationList(state: ResortStateModel): any {
    return state.summaryLocationList;
  }
  // Gets all resorts from DB
  @Action(GetResorts)
  getResorts(ctx: StateContext<ResortStateModel>): any {
    return this.resortList.getResorts().then((result) => {
        ctx.patchState({
          resortList: result
        });
      }
    );
  }

  @Action(GetAllLocations)
  getAllLocations(ctx: StateContext<ResortStateModel>): any {
    return this.resortList.getAllLocations().then((result) => {
        ctx.patchState({
          summaryLocationList: result
        });
      }
    );
  }


  @Action(SetFilter)
  setFilter(ctx: StateContext<ResortStateModel>, payload: SetFilter): any {
    ctx.patchState({
      filterBy: payload.str
    });
  }
}
