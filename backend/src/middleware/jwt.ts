import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import * as moment from "moment";
import User from "../entity/User";

const moduleJwt = {
  create: (user: User) => {
    const payload = {
      userId: user.id,
      username: user.username,
      userRole: user.role,
      iat: moment().unix(),
      expires: moment().add(config.expiresCreate, "second").unix(),
    };

    return jwt.sign(payload, config.jwtSecret);
  },

  refresh: (user: User) => {
    const payload = {
      userId: user.id,
      username: user.username,
      userRole: user.role,
      iat: moment().unix(),
      expires: moment().add(config.expiresRefresh, "second").unix(),
    };

    return jwt.sign(payload, config.jwtSecret);
  },

  verifyRefresh: (token: string) => {
    const verifyResult = jwt.verify(token, config.jwtSecretRefresh);

    return verifyResult;
  },

  verifyReset: (token: string) => {
    const verifyResult = jwt.verify(token, config.jwtSecretReset);

    return verifyResult;
  },

  checkJwt: (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["auth"];
    let jwtPayload;

    try {
      jwtPayload = <any>jwt.verify(token, config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      return res.status(401).json({ messageError: error.message });
    }

    const { userId, username } = jwtPayload;

    const newToken = jwt.sign({ userId, username }, config.jwtSecret, {
      expiresIn: "1h",
    });
    res.setHeader("token", newToken);

    //Call next
    next();
  },

  reset: (user: User) => {
    const payload = {
      userId: user.id,
      username: user.username,
      iat: moment().unix(),
      expires: moment().add(config.expiresReset, "second").unix(),
    };

    return jwt.sign(payload, config.jwtSecret);
  },
};

export default moduleJwt;
