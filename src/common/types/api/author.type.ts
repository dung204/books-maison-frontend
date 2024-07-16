export interface Author {
  id: string;
  name: string;
  yearOfBirth: number | null;
  yearOfDeath: number | null;
  nationality: string;
  imageUrl: string | null;
  biography: string | null;
  createdTimestamp: string;
}
