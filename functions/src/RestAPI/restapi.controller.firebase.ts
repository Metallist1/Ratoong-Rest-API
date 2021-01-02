import {RestapiService} from "./restapi.service";
import {RestapiController} from './restapi.controller';

export class RestapiControllerFirebase implements RestapiController {
  constructor(private resortService: RestapiService) {}


  getAllResorts(): Promise<void> {
    return this.resortService.getAllResorts();
  }

  getSingleResort(id: number): Promise<void> {
    return this.resortService.getSingleResort(id);
  }

  getFilteredResort(id: number, fromDate: string, toDate: string, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<void> {
    return this.resortService.getFilteredResort(id, fromDate, toDate, gender, country, age, skier, snowboarder, purpose, weeks, level);
  }

}
