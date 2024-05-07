export default interface DataModel<T> {
  id: number;
  [key: string]: T | number | undefined | any[] | string | boolean | any;
}