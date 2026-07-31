import { TagProps } from '.';

type TagMock = Omit<TagProps, 'className'>;

export const tagMock: TagMock = {
  label: 'Tag',
  variant: 'primary',
};

export const tagMocks: TagMock[] = [
  {
    label: 'Primary',
    variant: 'primary',
  },
  {
    label: 'Secondary',
    variant: 'secondary',
  },
];
