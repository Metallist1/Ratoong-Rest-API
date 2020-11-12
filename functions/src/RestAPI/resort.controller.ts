
export interface ResortController {

  getAllResorts(): Promise<void>;
  getSingleResort(id: number): Promise<void>;
}
