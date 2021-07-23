const allRoles = {
    user: [],
    admin: ['manager', 'admin']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export default { roles, roleRights }
