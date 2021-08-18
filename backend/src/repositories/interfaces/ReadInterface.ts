import { IBase } from "../../interfaces";

export interface IRead<T extends IBase> {
  lastId():Promise<number>;
  findAll(item: T): Promise<T[]>;
  findByName(name: string): Promise<T>;
  findById(id: number): Promise<T>;
}