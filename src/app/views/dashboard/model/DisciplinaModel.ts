export interface DisciplinaModel {
    Nome: string;
    Niveis: { [key: string]: boolean };
    exibirNiveis?: boolean;
  }
  