import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../entity/User";
import { validate } from "class-validator";

class UserController {
  static getAll = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    let users: User[];

    try {
      users = await userRepository.find();
      res.json(users);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ messageError: "Not Result" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(User);

    try {
      const user = await userRepository.findOneOrFail(id, {
        relations: ["links"]
      });
      res.json(user);
    } catch (error) {
      res.status(404).json({ messageError: "Not result" });
    }
  };

  static newUser = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;
    const user = new User();

    user.username = username;
    user.password = password;
    user.role = role;

    //Validate
    const validationsOptions = {
      validationError: { target: false, value: false },
    };
    const errors = await validate(user, validationsOptions);
    if (errors.length > 0) {
      return res.status(400).json({ messageError: errors[0] });
    }

    const userRepository = getRepository(User);
    try {
      user.hasPassword();
      await userRepository.save(user);
    } catch (error) {
      console.log(error);
      return res.status(409).json({ messageError: error});
    }
    res.json({ message: "User created" });
  };

  static editUser = async (req: Request, res: Response) => {
    let user;
    const { id } = req.params;
    const { username, role } = req.body;
    const userRepository = getRepository(User);

    // Try get user
    try {
      user = await userRepository.findOneOrFail(id);
      user.username = username;
      user.role = role;
    } catch (error) {
      console.log(error);
      return res.status(404).json({ messageError: "User not found" });
    }

    const validationsOptions = {
      validationError: { target: false, value: false },
    };
    const errors = await validate(user, validationsOptions);
    if (errors.length > 0) {
      return res.status(400).json({ messageError: errors[0] });
    }

    //Try to save user
    try {
      await userRepository.save(user);
    } catch (error) {
      console.log(error);
      return res.status(409).json({ messageError: "Username already in use" });
    }

    res.status(201).json({ message: "User update" });
  };

  static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(404).json({ messageError: "User not found" });
    }

    // Rmove user
    userRepository.delete(id);
    res.status(201).json({ message: "User deleted" });
  };
}

export default UserController;
