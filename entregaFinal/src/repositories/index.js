import { Users } from "../dao/factory.js"

import UserRepository from "./users.repository.js";

export const userService = new UserRepository(new Users())