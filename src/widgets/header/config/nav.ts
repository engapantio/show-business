export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Explore', to: '/explore' },
  { label: 'Inspiration', to: '/inspiration' },
  { label: 'Contact us', to: '/contact' },
] as const;

export type NavItem = (typeof NAV)[number];
