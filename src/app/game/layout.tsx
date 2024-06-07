import { Nav } from "@/components/Nav";
import { BlobProvider } from "@/contexts/BlobContext";

type Props = Readonly<{ children: React.ReactNode }>;

export default function GameLayout({ children }: Props) {
  return (
    <BlobProvider>
      <Nav />
      {children}
    </BlobProvider>
  );
}
