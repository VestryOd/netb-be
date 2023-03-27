import { DisciplineModel } from "./models";
import { generateDisciplineLinkName } from "@/common/helpers";
import { IDiscipline, IRemoved } from "@/common/interfaces";

export const getAllDisciplines = () => {
  return DisciplineModel.find();
};

export const getDisciplineById = (disciplineId: string) => {
  return DisciplineModel.findById(disciplineId);
};

export const getDisciplineByName = (discipline: string) => {
  return DisciplineModel.findOne({ link_name: discipline });
};

export const createDiscipline = (name: string): Promise<IDiscipline> => {
  return DisciplineModel.create({
    name,
    link_name: generateDisciplineLinkName(name),
  });
};

export const removeDiscipline = async (
  disciplineId: string
): Promise<IRemoved> => {
  const existingDiscipline = await DisciplineModel.findById(disciplineId);

  if (!existingDiscipline) return null;

  existingDiscipline.remove();
  return { id: disciplineId };
};

export const updateDiscipline = async ({
  _id,
  name,
}: Omit<IDiscipline, "link_name">): Promise<IDiscipline> => {
  const existingDiscipline = await DisciplineModel.findById(_id);

  if (!existingDiscipline) return null;

  existingDiscipline.name = name;
  existingDiscipline.link_name = generateDisciplineLinkName(name);
  existingDiscipline.save();
  return existingDiscipline;
};
