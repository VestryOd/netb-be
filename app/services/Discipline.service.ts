import { ALREADY_EXIST, NOT_FOUND } from "@/common/constants";
import {
  getAllDisciplines,
  getDisciplineByName,
  createDiscipline,
  removeDiscipline,
  updateDiscipline,
} from "@/db/discipline.db";

export class DisciplineService {
  public getAllDisciplines() {
    return getAllDisciplines();
  }

  public async getDisciplineByName(discipline: string) {
    const existingDiscipline = await getDisciplineByName(discipline);

    if (!existingDiscipline) throw NOT_FOUND("Discipline");

    return existingDiscipline;
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
    discipline_id,
    name,
  }: {
    discipline_id: string;
    name: string;
  }) {
    const updatedDiscipline = await updateDiscipline({
      _id: discipline_id,
      name,
    });

    if (!updatedDiscipline) throw NOT_FOUND(discipline_id);
    return updatedDiscipline;
  }
}
