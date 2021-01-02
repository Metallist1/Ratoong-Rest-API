import {RestapiRepository} from './restapi.repository';

export class RestapiService {

  CurrentDate = new Date();

  constructor(private resortRepository: RestapiRepository) {
  }

  getAllResorts() {
      return this.resortRepository.getAllResorts();
  }
  getSingleResort(id: number) {
    return this.resortRepository.getSingleResort(id);
  }

  getFilteredResort(id: number, fromDate: string, toDate: string, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<any>  {
    if(!this.checkDate(fromDate) || !this.checkDate(toDate)){
      return Promise.resolve('Invalid Date Format');
    }

    const followingDay = new Date(this.convertDate(toDate).getTime() + 86400000); // + 1 day in ms
    return this.resortRepository.getFilteredResort(id, this.convertDate(fromDate).getTime(), followingDay.getTime(), gender, country, age, skier, snowboarder, purpose, weeks, level);
  }

  checkDate(dateToCheck:string): any {
    const prepData=dateToCheck.split('-');
    const dateFrom = new  Date ('1970-01-01');
    const dateTo = new  Date ('2050-01-01');
    const date = new  Date (prepData[0] + '-' + prepData[1] + '-' + prepData[2]);
    return (dateFrom <= date && date <= dateTo);
  }

  private convertDate(date:string): Date{
    const prepData=date.split('-');
    return new Date(Number(prepData[0]), Number(prepData[1]), Number(prepData[2]));
  }
}
