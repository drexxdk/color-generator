export type Color = {
  name: string;
  percentage: number;
  background?: string;
  ideal?: TextItem;
  light?: TextItem;
  dark?: TextItem;
};

type TextItem = {
  value: string;
  ratio: number;
};
