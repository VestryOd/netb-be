import { ALREADY_EXIST, NOT_FOUND } from "@/common/constants";
import {
  getAllDisciplines,
  getDisciplineByName,
  createDiscipline,
  removeDiscipline,
  updateDiscipline,
} from "../db/discipline.db";

export class DisciplineService {
  public getAllDisciplines() {
    return getAllDisciplines();
  }

  public async createOneDiscipline(name: string) {
    const existingDiscipline = await getDisciplineByName(name);

    if (existingDiscipline) throw ALREADY_EXIST(`Discipline with name ${name}`);

    return createDiscipline(name);
  }

  public async deleteDiscipline(disciplineId: string) {
    const removed = await removeDiscipline(disciplineId);

    if (!removed) throw NOT_FOUND(disciplineId);
    return removed;
  }

  public async updateDiscipline({
    disciplineId,
    name,
  }: {
    disciplineId: string;
    name: string;
  }) {
    const updatedDiscipline = await updateDiscipline({
      _id: disciplineId,
      name,
    });

    if (!updatedDiscipline) throw NOT_FOUND(disciplineId);
    return updatedDiscipline;
  }
}
