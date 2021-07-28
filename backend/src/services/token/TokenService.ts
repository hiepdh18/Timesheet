import jwt from "jsonwebtoken";

export const generateToken = (userId: number, exp: number) => {
  const payload = {
    sub: userId,
    iss: "TimeSheet",
    aud: "TimeSheet",
    nbf: Math.floor(Date.now() / 1000),
    exp
  };
  return jwt.sign(payload, process.env.JWT_KEY);
};
