
export interface ResortRepository {

  getAllResorts(): Promise<any>;

  getSingleResort(id: number): Promise<any>;

  getFilteredResort(id: number, filter: string, fromDate: number, toDate: number): Promise<void>;
}
