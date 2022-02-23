import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../entity/User";
import { validate } from "class-validator";
import transporter from "../config/mailer";
import moduleJwt from "../middleware/jwt";

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ messageError: "Username or password are required!" });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      return res
        .status(400)
        .json({ messageError: "Username or password incorrect!" });
    }

    // Check password
    if (!user.checkPassword(password)) {
      return res
        .status(400)
        .json({ messageError: "Username or password are incorrect!" });
    }

    const token = moduleJwt.create(user);
    const refreshToken = moduleJwt.refresh(user);

    user.refreshToken = refreshToken;

    try {
      userRepository.save(user);
    } catch (error) {
      return res.status(400).json({ messageError: "Someting goes wrong!" });
    }
    res.json({ message: "Successfull login ", token, refreshToken });
  };

  static refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.headers.refresh as string;

    console.log("verifyResult");
    if (!refreshToken) {
      return res.status(400).json({ messageError: "Someting goes wrogn!" });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      const verifyResult = moduleJwt.verifyRefresh(refreshToken);
      const { username } = verifyResult as User;
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      return res.status(400).json({ messageError: "Someting goes wrogn!" });
    }

    const token = moduleJwt.refresh(user);

    res.json({ message: "Refresh token Ok", token });
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    // if not parameters
    if (!(oldPassword && newPassword)) {
      return res
        .status(400)
        .json({ messageError: "Old password & new password are required!" });
    }

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (error) {
      return res.status(400).json({ messageError: "Somenthing goes wrong!" });
    }

    //Check password
    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ messageError: "Check your old password" });
    }

    user.password = newPassword;

    const validationsOptions = {
      validationError: { target: false, value: false },
    };
    const errors = await validate(user, validationsOptions);
    if (errors.length > 0) {
      return res.status(400).json({ messageError: errors[0] });
    }

    //Hash password
    user.hasPassword();
    userRepository.save(user);
    res.json({ message: "Successfully changed password!" });
  };

  static forgotPassword = async (req: Request, res: Response) => {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ messageError: "Username is required" });
    }

    const message = "Check your email for a link tu reset your password";
    let verififactionLink;
    let emailStatus = "OK";

    const userRepository = getRepository(User);
    let user: User;

    try {
      user = await userRepository.findOneOrFail({ where: { username } });
      const token = moduleJwt.reset(user);
      verififactionLink = `http://localhost:3000/new-password/${token}`;
      user.resetToken = token;
    } catch (error) {
      return res.json({ messageError: "Username does not exist" });
    }

    try {
      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Forgot password 👻" <cgiog82@gmail.com>',
        to: `${user.username}, < ${username} >`,
        subject: "Forgot password ✔",
        html: `
        <b>Please click on the following link, or paste this into browser to complete the process:</b>
        <a href="${verififactionLink}">GO TO CREATE NEW PASSWORD</a>
        `,
      });
    } catch (error) {
      emailStatus = error;
      return res.status(400).json({ messageError: "Someting goes wrong!" });
    }

    try {
      await userRepository.save(user);
    } catch (error) {
      emailStatus = error;
      console.log(error);
      return res.status(400).json({ messageError: "Someting goes wrong!" });
    }

    res.json({ message, inf: emailStatus });
  };

  static createNewPassword = async (req: Request, res: Response) => {
    const { newPassword } = req.body;
    const resetToken = req.headers.reset as string;

    if (!(newPassword && resetToken)) {
      return res.status(400).json({ messageError: "All the are required!" });
    }

    const userRepository = getRepository(User);
    let jwtPayload;
    let user: User;

    try {
      jwtPayload = moduleJwt.verifyReset(resetToken);
      user = await userRepository.findOneOrFail({ where: { resetToken } });
    } catch (error) {
      return res.status(401).json({ messageError: "Someting goes wrong!" });
    }

    user.password = newPassword;

    //Validate errors
    const validationsOptions = {
      validationError: { target: false, value: false },
    };

    const errors = await validate(user, validationsOptions);
    if (errors.length > 0) {
      return res.status(400).json({ messageError: errors[0] });
    }

    try {
      user.hasPassword();
      await userRepository.save(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ messageError: "Someting goes wrong!" });
    }

    res.json({ message: "Successfully change password!" });
  };
}

export default AuthController;
