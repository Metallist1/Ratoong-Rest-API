import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {
  GetResortDetails,
  GetResorts,
  SetResortFilter,
  SortResorts
} from './resorts.action';
import {Resort} from './entities/resort';
import {ResortsService} from './resorts.service';

export class ResortStateModel {
  resortList: Resort[];
  selectedResort: any;

  sortDirection: SortDirection;
  filterBy: string;
}

export type SortDirection = 'asc' | 'desc';
const rotate: { [key: string]: SortDirection } = {asc: 'desc', desc: 'asc'};

function matches(resort: Resort, term: string): boolean {
  return resort.name.toLowerCase().includes(term.toLowerCase());
}

@State<ResortStateModel>({
  name: 'resorts',
  defaults: {
    resortList: [],
    selectedResort: null,
    sortDirection: 'asc',
    filterBy: ''
  }
})

@Injectable()
export class ResortsState {

  constructor(private resortsService: ResortsService) {
  }

  @Selector()
  static resortFilterBy(state: ResortStateModel): any {
    return state.filterBy;
  }

  @Selector()
  static resortList(state: ResortStateModel): any {
    return state.resortList.filter(resort => matches(resort, state.filterBy));
  }

  @Selector()
  static selectedResort(state: ResortStateModel): any {
    return state.selectedResort;
  }

  // Gets all resorts from DB
  @Action(GetResorts)
  getResorts(ctx: StateContext<ResortStateModel>): any {
    return this.resortsService.getResorts().then((result) => {
        ctx.patchState({
          resortList: result
        });
      }
    );
  }

  @Action(GetResortDetails)
  getResortDetails(ctx: StateContext<ResortStateModel>, {id}: GetResortDetails): any {
    return this.resortsService.getResortDetails(id).then((result) => {
        ctx.patchState({
          selectedResort: result
        });
      }
    );
  }

  @Action(SetResortFilter)
  setResortFilter(ctx: StateContext<ResortStateModel>, {str}: SetResortFilter): any {
    console.log(str);
    ctx.patchState({
      filterBy: str
    });
  }

  @Action(SortResorts)
  sortResorts(ctx: StateContext<ResortStateModel>, {str}: SortResorts): any {
    const state = ctx.getState();
    const sortedList = state.resortList.slice();
    if (str === 'id') {
      sortedList.sort((a, b) => a.id - b.id);
    } else {
      sortedList.sort((a, b) => (a[str].toLowerCase() > b[str].toLowerCase()) ? 1 : -1);
    }
    if (state.sortDirection === 'desc') {
      sortedList.reverse();
    }

    ctx.patchState({
      resortList: sortedList,
      sortDirection: rotate[state.sortDirection]
    });
  }
}
