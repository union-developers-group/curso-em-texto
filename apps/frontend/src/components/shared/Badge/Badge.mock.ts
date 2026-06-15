import { BadgeProps } from '@/components/shared/Badge';

type BadgeMock = Omit<BadgeProps, 'className'>;

export const badgeMock: BadgeMock = {
  label: 'Em destaque',
  variant: 'default',
};

export const badgeMocks: BadgeMock[] = [
  badgeMock,
  {
    label: 'Em destaque',
    variant: 'outline',
  },
  {
    label: 'Em destaque',
    variant: 'filled',
  },
];
