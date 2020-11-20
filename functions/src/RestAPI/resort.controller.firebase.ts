import {ResortService} from "./resort.service";
import {ResortController} from './resort.controller';

export class ResortControllerFirebase implements ResortController {
  constructor(private resortService: ResortService) {}


  getAllResorts(): Promise<void> {
    return this.resortService.getAllResorts();
  }

  getSingleResort(id: number): Promise<void> {
    return this.resortService.getSingleResort(id);
  }

  getFilteredResort(id: number, filter: string, fromDate: string, toDate: string, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<void> {
    return this.resortService.getFilteredResort(id,filter, fromDate, toDate, gender, country, age, skier, snowboarder, purpose, weeks, level);
  }

}
