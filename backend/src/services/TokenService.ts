import jwt from "jsonwebtoken";

export const generateToken = (userId: number, exp: number, roleNames:string[]) => {
  const payload = {
    sub: userId,
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role':roleNames,
    iss: "TimeSheet",
    aud: "TimeSheet",
    nbf: Math.floor(Date.now() / 1000),
    exp
  };
  return jwt.sign(payload, process.env.JWT_KEY);
};
