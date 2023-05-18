export interface ICardData {
  id: string;
  profession: string;
  firm_name?: string;
  town?: { title: string };
  type_of_work?: { title: string };
  payment_to?: string;
  payment_from?: string;
  currency?: string;
}
export interface IObjectResponse {
  objects: ICardData[];
  total: number;
}
