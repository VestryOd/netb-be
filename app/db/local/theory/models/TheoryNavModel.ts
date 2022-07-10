import { v4 as uuidv4 } from "uuid";
import { ITheoryNav } from "@/common/interfaces/ITheory";

export class TheoryNavModel implements ITheoryNav {
  id: string;
  t__nav_name: string;
  t__nav_url: string;
  t__nav_description?: string;
  constructor({
    t__nav_name = "Nav item",
    t__nav_url = "nav url",
    t__nav_description = "",
  }: Omit<ITheoryNav, "id">) {
    this.id = uuidv4();
    this.t__nav_name = t__nav_name;
    this.t__nav_url = t__nav_url;
    this.t__nav_description = t__nav_description;
  }
}
