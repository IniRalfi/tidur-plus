// frontend/src/hooks/useDenda.ts
import { useState, useEffect } from "react";

// Struktur data denda sesuai PRD data model
interface Denda {
  id: number;
  peminjaman_id: number;
  user_id: number;
  jumlah_hari_telat: number;
  tarif_per_hari: number;
  total_denda: number;
  status: "belum_lunas" | "lunas";
}

export function useDenda() {
  const [dataDenda, setDataDenda] = useState<Denda[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Simulasi fetch data API dari backend Marcel nantinya
  useEffect(() => {
    const fetchDenda = async () => {
      try {
        setLoading(true);
        // Tentu nanti ditukar dengan axios/fetch ke VITE_API_URL/admin/denda
        // const res = await api.get('/admin/denda');
      } catch (err) {
        console.error("Gagal memuat data denda", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDenda();
  }, []);

  // Fungsi mutasi untuk menandai denda lunas
  const mutasiLunas = async (dendaId: number) => {
    console.log(`Mengirim request lunas untuk denda ID: ${dendaId}`);
    // Integrasi endpoint backend di sini
  };

  return {
    dataDenda,
    loading,
    mutasiLunas
  };
}