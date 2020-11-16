import {ResortRepository} from './resort.repository';

export class ResortService {

  CurrentDate = new Date();

  constructor(private resortRepository: ResortRepository) {
  }

  getAllResorts() {
      return this.resortRepository.getAllResorts();
  }
  getSingleResort(id: number) {
    return this.resortRepository.getSingleResort(id);
  }

  getFilteredResort(id: number, filter: string, fromDate: string, toDate: string): Promise<any>  {
    if(!this.checkDate(fromDate) || !this.checkDate(toDate)){
      return Promise.resolve('Invalid Date Format');
    }

    const followingDay = new Date(this.convertDate(toDate).getTime() + 86400000); // + 1 day in ms
    return this.resortRepository.getFilteredResort(id, filter, this.convertDate(fromDate).getTime(), followingDay.getTime());
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
