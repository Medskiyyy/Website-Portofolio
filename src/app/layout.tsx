import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Since we use the localized [locale] layout, this root layout passes the children through.
export default function RootLayout({ children }: Props) {
  return children;
}
