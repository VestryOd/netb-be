export const generateDisciplineLinkName = (disciplineName: string): string => {
  return disciplineName
    .toLocaleLowerCase()
    .replaceAll(" ", "_")
    .replaceAll(".", "")
    .replaceAll("+", "p");
};
