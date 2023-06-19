export const hasRole = (roles, userRoles) => {
    return userRoles?.some(r => roles.includes(r));
  };
  
  export const hasPermission = (permissions, user) => {
    return  user.permission?.some(r => permissions.includes(r));
  };