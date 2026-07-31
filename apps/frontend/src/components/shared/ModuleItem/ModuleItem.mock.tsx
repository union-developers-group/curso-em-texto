import { ModuleItemProps } from '.';

type ModuleItemMock = Omit<ModuleItemProps, 'className' | 'children'>;

export const moduleItemMock: ModuleItemMock = {
  module: 'Módulo 2',
  title: 'Grids e Layout',
};
