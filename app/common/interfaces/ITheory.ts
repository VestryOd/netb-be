import { TheoryItemEnum } from "@/common/enums";

export type TheoryContentNavType = {
  id: string;
  t__nav_name: string;
  t__nav_url: string;
  t__nav_description?: string;
};

export type TheoryContentType = {
  id: string;
  t__content_type: TheoryItemEnum;
  t__content_text: string | null;
  t__content_nav?: TheoryContentNavType;
  t__content_table?: [string[]];
  t__content_list?: string[];
};

export interface ITheory {
  id: string;
  t__title: string;
  t__content: TheoryContentType[];
  tags?: string[];
}
