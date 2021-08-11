import { Document } from "mongoose";
import { IBase } from "./BaseInterface";

export interface ICustomer extends IBase, Document {
  name: string,
  address: string,
  id: number
}