import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { Request } from "express";
import { IUser } from "@/common/interfaces/IUser";
import { UserService } from "./User.service";
import {
  accessLevelByRole,
  PERMISSION_DENIED,
  UNAUTHORIZED,
  USER_NOT_EXIST,
} from "@/common/constants";
import { jwtSecret } from "@/config";
import { RolesEnum } from "../common/enums";

export class AuthService {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  static async authenticate(userInfo: Partial<IUser>) {
    const { user_email, user_password } = userInfo;

    const candidate = await UserService.prototype.getByEmail(user_email);

    if (!candidate) throw USER_NOT_EXIST(user_email);

    const match = await bcrypt.compare(user_password, candidate.user_password);

    if (!match) throw UNAUTHORIZED(user_email);

    const { user_name, id } = candidate;

    return {
      type: "token",
      data: jwt.sign({ user_name, user_email, id }, jwtSecret),
    };
  }

  public async validateUserRole(
    req: Request,
    routeAccessLevel: number
  ): Promise<void> {
    const { authorization } = req.headers;
    const { userId } = req.params;
    const authHeaderData = authorization.split(" ");
    const { id } = jwt_decode<Partial<IUser>>(authHeaderData[1]);

    const user = await this.userService.getUserById(id);

    const isUserRoleValid =
      (routeAccessLevel === accessLevelByRole[RolesEnum.USER] &&
        userId &&
        userId === id) ||
      accessLevelByRole[user.user_role] === accessLevelByRole[RolesEnum.ADMIN];

    if (!isUserRoleValid) throw PERMISSION_DENIED;
  }

  public validateToken(headerAuthorization: string): void {
    if (!headerAuthorization) throw UNAUTHORIZED();
    const authHeaderData = headerAuthorization.split(" ");
    const isAuthorized =
      authHeaderData[0] === "Bearer" &&
      jwt.verify(authHeaderData[1], jwtSecret);

    if (!isAuthorized) throw UNAUTHORIZED();
  }
}
