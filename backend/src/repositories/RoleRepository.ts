import { BaseRepository } from "./BaseRepository";
import { RoleSchema } from '../models'
import { IRole } from "../interfaces";

class RoleRepository extends BaseRepository<IRole> {
  constructor() {
    super("Role", RoleSchema);
  }
}
export = new RoleRepository();
