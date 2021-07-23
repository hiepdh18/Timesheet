"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allRoles = {
    user: [],
    admin: ['manager', 'admin']
};
const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
exports.default = { roles, roleRights };
//# sourceMappingURL=roles.js.map