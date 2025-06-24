export interface kategori {
  id_kategori: number;
  nama: string;
  slug: string;
  berita: berita;
}

export interface recentPostFooter {
  id: number;
  judul: string;
  cover: string;
  deskripsi: string;
  waktu_publish: string;
}

export interface berita {
  id: number;
  judul: string;
  cover: string;
  deskripsi: string;
  waktu_publish: string; 
  kategori: kategori;
  kategori_slug: string;
  path_media: string;
  filename?: string;
  link?: string; 
  author?: string;
  views?: number;
  status?: string;
}

export interface BeritaDetailResponse {
  success: boolean;
  data: berita;
  message?: string;
}

export interface PrerollConfig {
  video: string;
  url: string;
}

export interface paginationProps {
  currentPage: number; 
  lastPage: number;
  baseUrl: string; 
} 
export interface apiResponse {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
  data: berita[];
}

// beranda
export interface homeSlider {
  id: number;
  judul: string;
  sub_judul: string;
  gambar: string;
}

export interface jadwalAcara{
  iid: number;
  id_hari: number;
  jam_awal: string;
  jam_akhir: string;
  acara: string;
  link: string;
  uploader: number;
  waktu: string;
  hari: {
    id: number;
    hari: string;
  };
}

export interface OurProgram {
  id: number;
  thumbnail: string;
  judul: string;
  deskripsi: string;
}

export interface HomeWhoWeAre {
  id: number;
  judul: string;
  deskripsi: string;
  gambar: string;
  motto1: string;
  motto2: string;
  motto3: string;
  motto1sub: string;
  motto2sub: string;
  motto3sub: string;
}

export interface expertise1 {
  id: number;
  thumbnail: string;
  judul: string;
  deskripsi: string;
}

export interface expertise2 {
  id: number;
  thumbnail: string;
  judul: string;
}