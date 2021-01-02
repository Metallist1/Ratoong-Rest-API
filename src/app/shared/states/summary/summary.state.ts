import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Resort} from '../resorts/entities/resort';
import {Country} from './entities/country';
import {Question} from './entities/question';

import {Injectable} from '@angular/core';
import {GetAllCountries, GetAllLocations, GetFilteredResortData, GetQuestions} from './summary.action';
import {StatisticsFilter} from './helpers/statistics';
import {SummaryService} from './summary.service';

export class SummaryStateModel {
  countryList: Country[];
  summaryLocationList: Resort[];
  listOfQuestions: Question[];
  statisticsObject: object;

}

@State<SummaryStateModel>({
  name: 'Summary',
  defaults: {
    countryList: [],
    summaryLocationList: [],
    listOfQuestions: [],
    statisticsObject: undefined
  }
})

@Injectable()
export class SummaryState {

  constructor(private summaryService: SummaryService,
              private statisticsFilter: StatisticsFilter) {
  }

  @Selector()
  static questionList(state: SummaryStateModel): any {
    return state.listOfQuestions;
  }

  @Selector()
  static getStatistics(state: SummaryStateModel): any {
    return state.statisticsObject;
  }

  @Selector()
  static countryList(state: SummaryStateModel): any {
    return state.countryList;
  }

  @Selector()
  static summaryLocationList(state: SummaryStateModel): any {
    return state.summaryLocationList;
  }

  @Action(GetAllCountries)
  getAllCountries(ctx: StateContext<SummaryStateModel>): any {
    return this.summaryService.getAllCountries().then((result) => {
        ctx.patchState({
          countryList: result
        });
      }
    );
  }

  @Action(GetFilteredResortData)
  getFilteredResortData(ctx: StateContext<SummaryStateModel>, {
    id,
    country,
    age,
    gender,
    fromDate,
    toDate
  }: GetFilteredResortData): any {
    return this.summaryService.getFilteredResortData(id, country, age, gender, fromDate, toDate).then((result) => {
        ctx.patchState({
          statisticsObject: this.statisticsFilter.calculateData(result)
        });
      }
    );
  }

  @Action(GetAllLocations)
  getAllLocations(ctx: StateContext<SummaryStateModel>, {id}: GetAllLocations): any {
    return this.summaryService.getAllLocations(id).then((result) => {
        ctx.patchState({
          summaryLocationList: result
        });
      }
    );
  }

  @Action(GetQuestions)
  getSubCategories({getState, setState}: StateContext<SummaryStateModel>): any {
    this.summaryService.getQuestions().then((result) => {
      const state = getState();
      setState({
        ...state,
        listOfQuestions: result,
      });
    });
  }
}
