
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GetResorts, SetFilter} from './resort.action';
import {Resort} from './entities/resorts';
import {ResortService} from './resort.service';

export class ResortStateModel {
  resortList: Resort[];
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
    filterBy: ''
  }
})

@Injectable()
export class ResortState {

  constructor(private resortList: ResortService) {}

  @Selector()
  static resortList(state: ResortStateModel): any {
    return state.resortList.filter(resort => matches(resort, state.filterBy));
  }

  @Action(GetResorts)
  getResorts(ctx: StateContext<ResortStateModel>): any {
    return this.resortList.getResorts().then((result) => {
        ctx.patchState({
          resortList: result
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
