import { ReactNode } from 'react';
import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


type Props = {
  children: ReactNode;
};

// Since we use the localized [locale] layout, this root layout passes the children through.
export default function RootLayout({ children }: Props) {
  return children;
}
