import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { Request } from "express";
import { IUser } from "@/common/interfaces/IUser";
import { UserService } from "./User.service";
import {
  PERMISSION_DENIED,
  UNAUTHORIZED,
  USER_NOT_EXIST,
} from "@/common/constants";
import {
  accessSecret,
  accessLifetime,
  refreshSecret,
  refreshLifetime,
} from "@/config";
import { RolesEnum } from "@/common/enums";
import { RoleService } from "./Role.service";

export type AuthPayload = Pick<IUser, "user_name" | "user_email" | "id">;
export type AuthResult = {
  accessToken: AuthToken;
  refreshToken: AuthToken;
};
export type AuthToken = {
  token: string;
  exp: number;
};

export class AuthService {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  static getUserIdFromToken(req: Request) {
    const { authorization } = req.headers;
    const authHeaderData = authorization.split(" ");
    try {
      const { id } = jwt_decode<Partial<IUser>>(authHeaderData[1]);
      return id;
    } catch (e) {
      throw UNAUTHORIZED();
    }
  }

  private static getExpiredTimestamp(tokenString: string): number {
    const { exp } = jwt_decode<JwtPayload>(tokenString);
    return exp * 1000;
  }

  private static generateToken(
    user: AuthPayload,
    secret: string,
    lifeTime: string | number
  ) {
    return jwt.sign({ ...user }, secret, {
      expiresIn: lifeTime,
    });
  }

  private static generateAccessToken({
    user_name,
    user_email,
    id,
  }: AuthPayload): AuthToken {
    const token = this.generateToken(
      { user_name, user_email, id },
      accessSecret,
      accessLifetime
    );
    const exp = this.getExpiredTimestamp(token);
    return {
      token,
      exp,
    };
  }

  private static generateRefreshToken({
    user_name,
    user_email,
    id,
  }: AuthPayload): AuthToken {
    const token = this.generateToken(
      { user_name, user_email, id },
      refreshSecret,
      refreshLifetime
    );
    const exp = this.getExpiredTimestamp(token);
    return {
      token,
      exp,
    };
  }

  static async authenticate(userInfo: Partial<IUser>): Promise<AuthResult> {
    const { user_email, user_password } = userInfo;

    const candidate = await UserService.prototype.getByEmail(user_email);

    if (!candidate) throw USER_NOT_EXIST(user_email);

    const match = await bcrypt.compare(user_password, candidate.user_password);

    if (!match) throw UNAUTHORIZED(user_email);

    const { user_name, id } = candidate;
    const accessToken = this.generateAccessToken({ user_name, user_email, id });
    const refreshToken = this.generateRefreshToken({
      user_name,
      user_email,
      id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public async validateUserRole(
    req: Request,
    routeAccessLevel: number
  ): Promise<void> {
    const { userId } = req.params;

    const id = AuthService.getUserIdFromToken(req);

    const user = await this.userService.getUserById(id);
    const userRolesAccessLevels =
      await RoleService.prototype.getRolesAccessLevelsMap();

    const isUserRoleValid =
      (routeAccessLevel === userRolesAccessLevels[RolesEnum.USER] &&
        userId &&
        userId === id) ||
      routeAccessLevel === userRolesAccessLevels[user.user_role] ||
      userRolesAccessLevels[user.user_role] ===
        userRolesAccessLevels[RolesEnum.ADMIN];

    if (!isUserRoleValid) throw PERMISSION_DENIED;
  }

  public validateToken(headerAuthorization: string): void {
    if (!headerAuthorization) throw UNAUTHORIZED();
    const authHeaderData = headerAuthorization.split(" ");
    const isAuthorized =
      authHeaderData[0] === "Bearer" &&
      jwt.verify(authHeaderData[1], accessSecret);

    if (!isAuthorized) throw UNAUTHORIZED();
  }

  public static async validateRefreshToken(
    user_email: string,
    refreshToken: string | undefined
  ): Promise<AuthToken> {
    if (!refreshToken) throw PERMISSION_DENIED;

    const { id, user_name } = await UserService.prototype.getByEmail(
      user_email
    );

    if (!id) throw USER_NOT_EXIST(user_email);

    const isValidated = jwt.verify(refreshToken, refreshSecret);
    if (!isValidated) throw PERMISSION_DENIED;

    return this.generateAccessToken({
      user_name,
      id,
      user_email,
    });
  }
}
