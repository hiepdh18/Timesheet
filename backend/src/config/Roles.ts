const allRoles = {
    user: [],
    admin: ['manager', 'admin']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
