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

}
