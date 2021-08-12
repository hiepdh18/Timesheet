import { Document } from "mongoose";
import { IBase } from "./BaseInterface";

export interface IRole extends IBase, Document {
  id: number
  name: string,
  displayName: string,
  normalizedName: string,
  description: string,
}