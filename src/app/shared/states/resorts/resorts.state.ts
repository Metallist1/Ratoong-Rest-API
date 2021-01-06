import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {
  GetResortDetails,
  GetResorts,
  SetResortFilter, SetResortSortKey
} from './resorts.action';
import {Resort} from './entities/resort';
import {ResortsService} from './resorts.service';

export class ResortStateModel {
  resortList: Resort[];
  selectedResort: any;
  sortKey: string;
  sortDirection: SortDirection;
  filterBy: string;
}

export type SortDirection = 'asc' | 'desc';
const rotate: { [key: string]: SortDirection } = {asc: 'desc', desc: 'asc'};

function matches(resort: Resort, term: string): boolean {
  return resort.name.toLowerCase().includes(term.toLowerCase());
}

function sort(resortList: Resort[], sortKey: string, sortDir: string): any {
  if (sortKey === '') {
    return resortList;
  }
  resortList = resortList.slice();
  if (sortKey === 'id') {
    resortList.sort((a, b) => a.id - b.id);
  } else {
    resortList.sort((a, b) => (a[sortKey].toLowerCase() > b[sortKey].toLowerCase()) ? 1 : -1);
  }
  if (sortDir === 'desc') {
    resortList.reverse();
  }
  return resortList;
}

@State<ResortStateModel>({
  name: 'resorts',
  defaults: {
    resortList: [],
    selectedResort: null,
    sortKey: '',
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
    return sort(state.resortList, state.sortKey, state.sortDirection).filter(resort => matches(resort, state.filterBy));
  }

  @Selector()
  static selectedResort(state: ResortStateModel): any {
    return state.selectedResort;
  }

  // Gets all resorts from DB
  @Action(GetResorts)
  getResorts(ctx: StateContext<ResortStateModel>): any {
    return this.resortsService.getResorts().then((result) => {
      if (ctx.getState().resortList.length !== result.length){
        ctx.patchState({
          resortList: result
        }); }
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
    ctx.patchState({
      filterBy: str
    });
  }

  @Action(SetResortSortKey)
  setResortSortKey(ctx: StateContext<ResortStateModel>, {str}: SetResortSortKey): any {
    ctx.patchState({
      sortKey: str,
      sortDirection: rotate[ctx.getState().sortDirection]
    });
  }
}
