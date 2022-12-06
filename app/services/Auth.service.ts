import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { IUser } from "../common/interfaces/IUser";
import { UserService } from "./User.service";
import {
  PERMISSION_DENIED,
  UNAUTHORIZED,
  USER_NOT_EXIST,
} from "../common/constants";
import { jwtSecret } from "../config";
import { RolesEnum } from "../common/enums";

export class AuthService {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  static async authenticate(userInfo: Partial<IUser>) {
    const { user_email, user_password } = userInfo;

    const candidate = await AuthService.prototype.userService.getByEmail(
      user_email
    );

    if (!candidate) throw USER_NOT_EXIST(user_email);

    const match = await bcrypt.compare(user_password, candidate.user_password);

    if (!match) throw UNAUTHORIZED(user_email);

    const { user_name, id } = candidate;

    return { token: jwt.sign({ user_name, user_email, id }, jwtSecret) };
  }

  static async validateUserRole(token: string, routeRole: RolesEnum) {
    const { id } = jwt_decode<Partial<IUser>>(token);

    const user = await AuthService.prototype.userService.getUserById(id);

    if (routeRole !== user.user_role) throw PERMISSION_DENIED;

    return true;
  }
}
