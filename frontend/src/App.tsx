// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { APITester } from "./APITester";
// import { Calendar, CalendarDayButton } from "./components/ui/calendar";

// import logo from "./logo.svg";
// import reactLogo from "./react.svg";

// export function App() {
//   return (
//     <div className="container mx-auto p-8 text-center relative z-10">
//       <div className="flex justify-center items-center gap-8 mb-8">
//         <img
//           src={logo}
//           alt="Bun Logo"
//           className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#646cffaa] scale-120"
//         />
//         <img
//           src={reactLogo}
//           alt="React Logo"
//           className="h-36 p-6 transition-all duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] [animation:spin_20s_linear_infinite]"
//         />
//       </div>
//       <Card>
//         <CardHeader className="gap-4">
//           <CardTitle className="text-3xl font-bold">Bun + React</CardTitle>
//           <CardDescription>
//             Edit{" "}
//             <code className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono">src/App.tsx</code>{" "}
//             and save to test HMR
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <APITester />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KatalogPage from './pages/public/KatalogPage';
import BukuDetailPage from './pages/public/BukuDetailPage';
import PeminjamanPage from './pages/anggota/PeminjamanPage';
import PeminjamanDetailPage from './pages/anggota/PeminjamanDetailPage';
import DashboardPage from './pages/anggota/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* URL utama (localhost:5173) akan buka Home */}
        <Route path="/" element={<DashboardPage />} />

        <Route path="/katalog" element={<KatalogPage />} />
        
        {/* URL dengan ID (localhost:5173/katalog/buku-1) akan buka Detail Buku */}
        <Route path="/katalog/:id" element={<BukuDetailPage />} />
        
        {/* URL untuk halaman peminjaman (localhost:5173/peminjaman) */}
        <Route path="/peminjaman" element={<PeminjamanPage />} />
        
        {/* URL untuk halaman detail peminjaman (localhost:5173/peminjaman/:id) */}
        <Route path="/peminjaman/:id" element={<PeminjamanDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
