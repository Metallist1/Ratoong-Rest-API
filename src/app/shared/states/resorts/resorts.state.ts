import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetAllLocations, GetResorts, SetFilter, SortResorts} from './resorts.action';
import {Resort} from './entities/resort';
import {ResortsService} from './resorts.service';
import {SummaryLocation} from './entities/summaryLocation';

export class ResortStateModel {
  resortList: Resort[];
  summaryLocationList: SummaryLocation[];
  sortDirection: SortDirection;
  filterStr: string;
}

export type SortDirection = 'asc' | 'desc';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: 'asc' };

function matches(resort: Resort, term: string): boolean {
  return resort.name.toLowerCase().includes(term.toLowerCase());
}

@State<ResortStateModel>({
  name: 'resorts',
  defaults: {
    resortList: [],
    summaryLocationList: [],
    sortDirection: 'asc',
    filterStr: ''
  }
})

@Injectable()
export class ResortsState {

  constructor(private resortList: ResortsService) {
  }

  @Selector()
  static resortList(state: ResortStateModel): any {
    return state.resortList.filter(resort => matches(resort, state.filterStr));
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
      filterStr: payload.str
    });
  }

  @Action(SortResorts)
  sortResorts(ctx: StateContext<ResortStateModel>, payload: SortResorts): any {
    const state = ctx.getState();
    const sortedList = state.resortList.slice();
    if (payload.str === 'id'){
          sortedList.sort((a, b) => a.id - b.id);
    }
    else{
          sortedList.sort((a, b) => (a[payload.str] > b[payload.str]) ? 1 : -1);
    }
    if (state.sortDirection === 'desc'){
          sortedList.reverse();
    }

    ctx.patchState({
      resortList: sortedList,
      sortDirection: rotate[state.sortDirection]
    });
  }
}
