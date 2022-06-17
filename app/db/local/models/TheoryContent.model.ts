import { v4 as uuidv4 } from "uuid";
import { ITheoryContent } from "@/common/interfaces/ITheory";
import { TheoryItemEnum } from "@/common/enums";

export class TheoryContentModel implements ITheoryContent {
  id: string;
  t__content_type: TheoryItemEnum;
  t__content_text: string | null;
  t__content_table?: string[][];
  t__content_list?: string[];
  constructor({
    t__content_type = TheoryItemEnum.Text,
    t__content_text = "",
    t__content_table = [],
    t__content_list = [],
  }: Omit<ITheoryContent, "id">) {
    this.id = uuidv4();
    this.t__content_type = t__content_type;
    this.t__content_text = t__content_text;
    this.t__content_table = t__content_table;
    this.t__content_list = t__content_list;
  }
}
