import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import { IUser } from "@/common/interfaces/IUser";
import { UserService } from "./User.service";
import {
  PERMISSION_DENIED,
  UNAUTHORIZED,
  USER_NOT_EXIST,
} from "@/common/constants";
import { jwtSecret } from "@/config";
import { RolesEnum } from "@/common/enums";

export class AuthService {
  private userService: UserService;
  private readonly routeRole: RolesEnum;
  constructor(routeRole: RolesEnum) {
    this.userService = new UserService();
    this.routeRole = routeRole;
  }

  static async authenticate(userInfo: Partial<IUser>) {
    const { user_email, user_password } = userInfo;

    const candidate = await UserService.prototype.getByEmail(user_email);

    if (!candidate) throw USER_NOT_EXIST(user_email);

    const match = await bcrypt.compare(user_password, candidate.user_password);

    if (!match) throw UNAUTHORIZED(user_email);

    const { user_name, id } = candidate;

    return { token: jwt.sign({ user_name, user_email, id }, jwtSecret) };
  }

  private async validateUserRole(token: string, routeRole: RolesEnum) {
    const { id } = jwt_decode<Partial<IUser>>(token);

    const user = await this.userService.getUserById(id);

    return routeRole === user.user_role;
  }

  private validateToken(authHeaderData: string[]) {
    return (
      authHeaderData[0] === "Bearer" && jwt.verify(authHeaderData[1], jwtSecret)
    );
  }

  public async validateUser(headerAuthorization: string) {
    const authHeaderData = headerAuthorization.split(" ");

    if (!this.validateToken(authHeaderData)) throw PERMISSION_DENIED;

    const isRoleValid = await this.validateUserRole(
      authHeaderData[1],
      this.routeRole
    );
    if (!isRoleValid) throw UNAUTHORIZED();
    return { success: true };
  }
}
