export interface Question {
  id: number;
  group: number;
  name: string;
  categorySlug: string;
  imagePath: string;
  questionText: string;
  min: string;
  max: string;
}
