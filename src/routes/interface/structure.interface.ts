export interface IStructure {
  id: string;
  hash: string;
  panels: IStructurePanel[];
}

interface IStructurePanel {
  id: string;
  hash: string;
}
