
export interface ResortController {

  getAllResorts(): Promise<void>;

  getSingleResort(id: number): Promise<void>;

  getFilteredResort(id: number, fromDate: string, toDate: string, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<string> | Promise<void>;
}
