import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { FadeIn } from "./components/animations/FadeIn";
import { StaggerList } from "./components/animations/StaggerList";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-10 font-sans">
      <FadeIn direction="down">
        <h1 className="mb-2 text-3xl font-bold text-primary">UI Component Showcase</h1>
        <p className="mb-8 text-gray-500">Design System by Bila ✨</p>
      </FadeIn>

      <div className="w-full max-w-2xl">
        <StaggerList delay={0.2}>
          {/* Card 1: Form Login UI */}
          <Card className="mb-4 p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Test Input & Button</h2>
            <div className="flex flex-col gap-4">
              <Input placeholder="Ketik nama kamu di sini..." />
              <div className="flex gap-2">
                <Button variant="default">Simpan</Button>
                <Button variant="outline">Batal</Button>
                <Button variant="destructive">Hapus</Button>
              </div>
            </div>
          </Card>

          {/* Card 2: Dummy Katalog Buku */}
          <Card className="p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Test Katalog Buku</h2>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Buku Panduan React 19</p>
                <p className="text-sm text-gray-500">Tersedia</p>
              </div>
              <Button size="sm">Pinjam</Button>
            </div>
          </Card>
        </StaggerList>
      </div>
    </div>
  );
}

export default App;