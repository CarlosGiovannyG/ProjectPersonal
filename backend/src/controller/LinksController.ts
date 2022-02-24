import { getRepository } from "typeorm";
import { Request, Response } from "express";
import User from "../entity/User";
import Link from "../entity/links";
import { validate } from "class-validator";

class LinksController {
  static newLink = async (req: Request, res: Response) => {
    // i recive the data
    const { title, url, description, id } = req.body;
    let user: User;
    const newlink = new Link();
    const userRepository = getRepository(User);

    // I confirm that the user exists
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      return res.status(401).json({ messageError: "User not found" });
    }

    // if everything goes well
    newlink.title = title;
    newlink.description = description;
    newlink.url = url;
    newlink.user = user;

    //Validate errors
    const validationsOptions = {
      validationError: { target: false, value: false },
    };
    const errors = await validate(newlink, validationsOptions);
    if (errors.length > 0) {
      return res.status(400).json({ messageError: errors[0] });
    }

    // if there are no errors
    const linkRespository = getRepository(Link);
    try {
      await linkRespository.save(newlink);
    } catch (error) {
      return res.status(409).json({ messageError: error.driverError.detail });
    }

    // send confirmation message
    res.json({ message: "Link created" });
  };

  static getAll = async (req: Request, res: Response) => {
    const linkRespository = getRepository(Link);
    let links: Link[];

    try {
      links = await linkRespository.find();
      res.json(links);
    } catch (error) {
      return res.status(401).json({ messageError: "Not Results" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    // I recive id from params
    const { id } = req.params;
    const linkRespository = getRepository(Link);

    // bug checking
    try {
      const link = await linkRespository.findOneOrFail(id);
      res.json(link);
    } catch (error) {
      res.status(404).json({ messageError: "Not result" });
    }
  };

  static getByIdUser = async (req: Request, res: Response) => {
    // I recive id from params
    const { id } = req.params;
    const userRepository = getRepository(User);

    try {
      // I look the user and his relation
      const user = await userRepository.findOneOrFail(id, {
        relations: ["links"],
      });

      // I send only the links of the user
      res.json(user.links);
    } catch (error) {
      res.status(404).json({ messageError: " Not results" });
    }
  };

  static editLink = async (req: Request, res: Response) => {
    // I recive id from params
    const { id } = req.params;
    let linkToUpdate: Link;

    // I recive the data
    const { title, url, description } = req.body;

    const linkRespository = getRepository(Link);

    try {
      // I search the Db
      linkToUpdate = await linkRespository.findOneOrFail(id);

      // I assign the values
      linkToUpdate.title = title;
      linkToUpdate.url = url;
      linkToUpdate.description = description;
    } catch (error) {
      return res.status(404).json({ messageError: "Link not found" });
    }

    // I accept the mistakes
    const validationsOptions = {
      validationError: { target: false, value: false },
    };
    const errors = await validate(linkToUpdate, validationsOptions);
    if (errors.length > 0) {
      return res.status(400).json({ messageError: errors[0] });
    }

    //try to save linkToUpdate

    try {
      await linkRespository.save(linkToUpdate);
    } catch (error) {
      return res.status(409).json({ messageError: "Title already in use" });
    }

    res.status(201).json({ message: "Link update" });
  };

  static deleteLink = async (req: Request, res: Response) => {
    const { id } = req.params;
    const linkRespository = getRepository(Link);

    try {
      let linkToRemove = await linkRespository.findOneOrFail(id);
      linkRespository.remove(linkToRemove);
    } catch (error) {
      return res.status(404).json({ messageError: "Link not found" });
    };

    res.status(201).json({ message: 'Linke deleted' });
   };
}

export default LinksController;
