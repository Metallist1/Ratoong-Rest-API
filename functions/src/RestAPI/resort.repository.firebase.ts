
import {ResortRepository} from './resort.repository';


export class ResortRepositoryFirebase implements ResortRepository {

  getAllResorts(): Promise<any> {
    return Promise.resolve("Test");
  }

  getSingleResort(id: number): Promise<any> {
    return Promise.resolve("TestSingle");
  }
}
