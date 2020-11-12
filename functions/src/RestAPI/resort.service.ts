import { ResortRepository } from "./resort.repository";

export class ResortService {

  constructor(private resortRepository: ResortRepository) {
  }

  getAllResorts() {
      return this.resortRepository.getAllResorts();
  }
  getSingleResort(id: number) {
    return this.resortRepository.getSingleResort(id);
  }
}
