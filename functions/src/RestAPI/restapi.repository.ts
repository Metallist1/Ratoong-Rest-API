
export interface RestapiRepository {

  getAllResorts(): Promise<any>;

  getSingleResort(id: number): Promise<any>;

  getFilteredResort(id: number, fromDate: number, toDate: number, gender: string, country: string, age: string, skier: boolean, snowboarder: boolean, purpose: string, weeks: string, level: string): Promise<void>;
}
