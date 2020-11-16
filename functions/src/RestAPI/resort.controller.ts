
export interface ResortController {

  getAllResorts(): Promise<void>;

  getSingleResort(id: number): Promise<void>;

  getFilteredResort(id: number, filter: string, fromDate: string, toDate: string): Promise<string> | Promise<void>;
}
