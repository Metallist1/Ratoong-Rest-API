import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {
  GetAllCountries,
  GetAllLocations,
  GetFilteredResortData,
  GetQuestions,
  GetResortDetails,
  GetResorts,
  SetResortFilter,
  SortResorts
} from './resorts.action';
import {Resort} from './entities/resort';
import {ResortsService} from './resorts.service';
import {Country} from './entities/country';
import {StatisticsFilter} from './helpers/statistics';
import {Question} from './entities/question';

export class ResortStateModel {
  resortList: Resort[];
  selectedResort: any;
  countryList: Country[];
  summaryLocationList: Resort[];
  listOfQuestions: Question[];
  statisticsObject: object;

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
    countryList: [],
    listOfQuestions: [],
    summaryLocationList: [],
    statisticsObject: undefined,
    sortDirection: 'asc',
    filterBy: ''
  }
})

@Injectable()
export class ResortsState {

  constructor(private resortsService: ResortsService,
              private statisticsFilter: StatisticsFilter) {
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

  @Selector()
  static questionList(state: ResortStateModel): any {
    return state.listOfQuestions;
  }

  @Selector()
  static summaryLocationList(state: ResortStateModel): any {
    return state.summaryLocationList;
  }

  @Selector()
  static getStatistics(state: ResortStateModel): any {
    return state.statisticsObject;
  }

  @Selector()
  static countryList(state: ResortStateModel): any {
    return state.countryList;
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

  @Action(GetAllLocations)
  getAllLocations(ctx: StateContext<ResortStateModel>, {id}: GetAllLocations): any {
    return this.resortsService.getAllLocations(id).then((result) => {
        ctx.patchState({
          summaryLocationList: result
        });
      }
    );
  }

  @Action(GetFilteredResortData)
  getFilteredResortData(ctx: StateContext<ResortStateModel>, {
    id,
    country,
    age,
    gender,
    fromDate,
    toDate
  }: GetFilteredResortData): any {
    return this.resortsService.getFilteredResortData(id, country, age, gender, fromDate, toDate).then((result) => {
        ctx.patchState({
          statisticsObject: this.statisticsFilter.calculateData(result)
        });
      }
    );
  }

  @Action(GetAllCountries)
  getAllCountries(ctx: StateContext<ResortStateModel>): any {
    return this.resortsService.getAllCountries().then((result) => {
        ctx.patchState({
          countryList: result
        });
      }
    );
  }

  @Action(GetQuestions)
  getSubCategories({getState, setState}: StateContext<ResortStateModel>): any {
    this.resortsService.getQuestions().then((result) => {
      const state = getState();
      setState({
        ...state,
        listOfQuestions: result,
      });
    });
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
