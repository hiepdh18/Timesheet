import { Document } from "mongoose";
import { IBase } from "./BaseInterface";

export interface IProjectTask extends IBase, Document {
  id: number,
  taskId: number,
  projectId: number,
  billable: boolean,
}
