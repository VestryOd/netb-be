import StatusCodes from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { RoleService } from "@/services";
import { catchErrorHandler } from "@/common/helpers";
import { roleCreateMessage, roleRemoveMessage } from "@/common/constants";

const roleService = new RoleService();

export const addNewRoleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, access_level } = req.body;
    const newRole = await roleService.createRole({ name, access_level });
    res.statusCode = StatusCodes.CREATED;
    res.statusMessage = roleCreateMessage(name);
    res.send(newRole);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const getAllRolesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roles = await roleService.getAllRoles();
    res.statusCode = StatusCodes.OK;
    res.send(roles);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};

export const removeRoleHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { roleId } = req.params;
    const deleted = await roleService.removeRole(roleId);
    res.statusCode = deleted ? StatusCodes.ACCEPTED : StatusCodes.NOT_FOUND;
    res.statusMessage = roleRemoveMessage(roleId);
    res.send(deleted);
  } catch (err) {
    catchErrorHandler(err, next);
  }
};
