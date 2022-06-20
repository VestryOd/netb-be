import { TheoryComplexityEnum } from "@/common/enums";
import { ITheory, ITheoryContent, ITheoryNav } from "@/common/interfaces";
import { TheoryNavModel } from "./TheoryNavModel";
import { TheoryContentModel } from "./TheoryContent.model";
import { v4 as uuidv4 } from "uuid";

export class TheoryModel implements ITheory {
  id: string;
  t__title: string;
  t__complexity: TheoryComplexityEnum;
  t__content: ITheoryContent[];
  t__nav?: ITheoryNav[];
  t__tags?: string[];
  constructor({
    t__title = "Some theory title",
    t__complexity = TheoryComplexityEnum.Lower,
    t__content = [],
    t__nav = [],
    t__tags = [],
  }: Omit<ITheory, "id">) {
    this.id = uuidv4();
    this.t__title = t__title;
    this.t__complexity = t__complexity;
    this.t__content = this.generateContent(t__content);
    this.t__nav = this.generateNav(t__nav);
    this.t__tags = t__tags;
  }

  private generateNav(navItems: Omit<ITheoryNav, "id">[]) {
    return navItems.map((nav) => new TheoryNavModel(nav));
  }

  private generateContent(contentItems: Omit<ITheoryContent, "id">[]) {
    return contentItems.map((content) => new TheoryContentModel(content));
  }
}
