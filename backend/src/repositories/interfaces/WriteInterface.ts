import { IBase } from "../../interfaces";

export interface IWrite<T extends IBase> {
  create(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: number): Promise<boolean>;
}