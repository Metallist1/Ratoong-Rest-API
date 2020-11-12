
export interface ResortRepository {

  getAllResorts(): Promise<any>;

  getSingleResort(id: number): Promise<any>;
}
