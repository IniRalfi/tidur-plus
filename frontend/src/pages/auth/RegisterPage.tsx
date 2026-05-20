import { useState } from "react";
import { Eye, EyeOff, UserPlus, BookOpen, Upload } from "lucide-react";
import { Link } from "react-router-dom"; 

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    nik: "",
    phone: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    disability: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Pendaftaran Anggota:", formData);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-10"
      style={{ backgroundColor: "#ece8f4" }}
    >
      <div className="w-full max-w-6xl overflow-hidden rounded-[28px] bg-[#f8f8f8] border border-[#e7e1da] grid grid-cols-1 lg:grid-cols-2">
        
        <div className="p-4">
          <div className="relative h-full min-h-[850px] rounded-[24px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1000" 
              alt="Library Books" 
              className="absolute inset-0 w-full h-full object-cover" 
            />
            <div 
              className="absolute inset-0" 
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.55))" }} 
            />
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-sm">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-primary)" }}>
                  TIDUR+
                </h1>
              </div>
              <div className="max-w-sm">
                <p className="text-sm mb-3 text-white/80 font-inter-medium">Perpustakaan Digital</p>
                <h2 className="text-4xl leading-tight font-bold text-white" style={{ fontFamily: "var(--font-primary)" }}>
                  Daftar dan nikmati layanan perpustakaan digital modern.
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center px-8 py-12 lg:px-16">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h2 className="text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-primary)", color: "var(--color-clay-coffee)" }}>
                Daftar Anggota
              </h2>
              <p className="mt-3 text-sm leading-relaxed font-inter-medium" style={{ color: "var(--color-moss-drab)" }}>
                Lengkapi data untuk membuat akun anggota TIDUR+
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="nik" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>NIK</Label>
                <Input id="nik" name="nik" type="text" placeholder="Masukkan NIK" value={formData.nik} onChange={handleChange} className="h-12 rounded-xl border-[#ddd6ce] bg-white focus-visible:ring-0 focus-visible:border-[#eb6935]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>No Telepon</Label>
                <Input id="phone" name="phone" type="text" placeholder="08xxxxxxxxxx" value={formData.phone} onChange={handleChange} className="h-12 rounded-xl border-[#ddd6ce] bg-white focus-visible:ring-0 focus-visible:border-[#eb6935]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Nama Lengkap</Label>
                <Input id="name" name="name" type="text" placeholder="Masukkan nama lengkap" value={formData.name} onChange={handleChange} className="h-12 rounded-xl border-[#ddd6ce] bg-white focus-visible:ring-0 focus-visible:border-[#eb6935]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Email</Label>
                <Input id="email" name="email" type="email" placeholder="nama@email.com" value={formData.email} onChange={handleChange} className="h-12 rounded-xl border-[#ddd6ce] bg-white focus-visible:ring-0 focus-visible:border-[#eb6935]" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Password</Label>
                <div className="relative">
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} placeholder="Masukkan password" value={formData.password} onChange={handleChange} className="h-12 pr-11 rounded-xl border-[#ddd6ce] bg-white focus-visible:ring-0 focus-visible:border-[#eb6935]" />
                  <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showPassword ? <EyeOff className="w-4 h-4 text-[#6b645d]" /> : <Eye className="w-4 h-4 text-[#6b645d]" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Konfirmasi Password</Label>
                <div className="relative">
                  <Input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Konfirmasi password" value={formData.confirmPassword} onChange={handleChange} className="h-12 pr-11 rounded-xl border-[#ddd6ce] bg-white focus-visible:ring-0 focus-visible:border-[#eb6935]" />
                  <button type="button" onClick={() => setShowConfirmPassword((prev) => !prev)} className="absolute right-3 top-1/2 -translate-y-1/2">
                    {showConfirmPassword ? <EyeOff className="w-4 h-4 text-[#6b645d]" /> : <Eye className="w-4 h-4 text-[#6b645d]" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Jenis Kelamin</Label>
                <Select value={formData.gender} onValueChange={(value: string) => setFormData((prev) => ({ ...prev, gender: value }))}>
                  <SelectTrigger className="h-12 rounded-xl border-[#ddd6ce] bg-white focus:ring-0 focus:border-[#eb6935]">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L">Laki-laki</SelectItem>
                    <SelectItem value="P">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Penyandang Disabilitas?</Label>
                <RadioGroup value={formData.disability} onValueChange={(value: string) => setFormData((prev) => ({ ...prev, disability: value }))} className="flex items-center gap-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="font-normal">Ya</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="font-normal">Tidak</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Upload Pas Foto</Label>
                <label htmlFor="photo" className="h-28 rounded-xl border border-dashed border-[#ddd6ce] bg-white flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-5 h-5 text-[#8d847b]" />
                  <p className="mt-2 text-sm font-medium text-[#5d583e]">Upload Pas Foto</p>
                  <span className="text-xs text-[#8d847b]">PNG / JPG (Max 500Kb)</span>
                  <input id="photo" type="file" accept=".png,.jpg,.jpeg" className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ktp" className="text-sm" style={{ color: "var(--color-clay-coffee)" }}>Upload Scan KTP</Label>
                <label htmlFor="ktp" className="h-28 rounded-xl border border-dashed border-[#ddd6ce] bg-white flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-5 h-5 text-[#8d847b]" />
                  <p className="mt-2 text-sm font-medium text-[#5d583e]">Upload Scan KTP</p>
                  <span className="text-xs text-[#8d847b]">PNG / JPG (Max 500Kb)</span>
                  <input id="ktp" type="file" accept=".png,.jpg,.jpeg" className="hidden" />
                </label>
              </div>

              <Button type="submit" className="w-full h-12 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ backgroundColor: "var(--color-sun-glow)" }}>
                <UserPlus className="w-4 h-4 mr-2" />
                Daftar Sekarang
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-300" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#f8f8f8] px-2 text-gray-400">Atau</span></div>
              </div>

              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 rounded-xl border-[#ddd6ce] bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all"
                onClick={() => {
                  window.location.href = "http://localhost:3000/auth/google"; 
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.04c1.64 0 3.12.56 4.28 1.67l3.2-3.2C17.52 1.58 15 1 12 1 7.35 1 3.4 3.65 1.45 7.5l3.85 3C6.25 7.42 8.9 5.04 12 5.04z"/>
                  <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.2-2.35H12v4.5h6.46c-.28 1.47-1.12 2.7-2.38 3.55l3.7 2.88c2.16-2 3.72-4.94 3.72-8.58z"/>
                  <path fill="#FBBC05" d="M5.3 14.5c-.25-.75-.4-1.55-.4-2.5s.15-1.75.4-2.5L1.45 6.5C.53 8.35 0 10.1 0 12s.53 3.65 1.45 5.5l3.85-3z"/>
                  <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.92l-3.7-2.88c-1.03.7-2.33 1.12-4.26 1.12-3.1 0-5.75-2.38-6.7-5.46l-3.85 3C3.4 20.35 7.35 23 12 23z"/>
                </svg>
                Daftar dengan Google
              </Button>
            </form>

            <div className="mt-7 text-center text-sm">
              <span style={{ color: "var(--color-moss-drab)" }}>Sudah punya akun?</span>{" "}
              <Link to="/login" className="font-semibold hover:underline" style={{ color: "var(--color-sun-burn)" }}>
                Masuk sekarang
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
// frontend/src/pages/auth/RegisterPage.tsx
export default function RegisterPage() {
  return (
    <main>
      <h1>RegisterPage Placeholder</h1>
    </main>
  );
}