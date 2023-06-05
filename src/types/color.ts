export type Color = {
  name: string;
  percentage: number;
  background?: string;
  texts: Texts;
};

type Texts = {
  ideal?: TextItem;
  light?: TextItem;
  dark?: TextItem;
};

type TextItem = {
  value: string;
  ratio: number;
};
