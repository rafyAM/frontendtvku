"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

import { berita } from "@/app/types";
import Sidebar from "@/app/components/sideBar";
import DisqusComment from "@/app/components/disqus";
import PopupIklan from "@/app/components/popupIklan";
import YtPreview from "@/app/components/yt-preview";

export default function BeritaDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const lang = (params.lang as "id" | "en") || "id";

  const [berita, setBerita] = useState<berita | null>(null);
  const [dictionary, setDictionary] = useState<any>(null); //eslint-disable-line
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showIklan, setShowIklan] = useState(false);

  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://tvku.tv";

  useEffect(() => {
    // Menampilkan iklan popup setelah komponen dimuat
    setShowIklan(true);
  }, []);

  const handleCloseIklan = () => {
    setShowIklan(false);
  };

  useEffect(() => {
    if (!id || !lang) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const beritaDetailUrl =
          lang === "en"
            ? `https://apidev.tvku.tv/api/berita-translations?language_code=en&id_berita_master=${id}`
            : `${baseurl}/berita/${id}`;
        
        const dictionaryUrl = `/dictionaries/${lang}.json`;

        const [beritaResponse, dictionaryResponse] = await Promise.all([
          axios.get(beritaDetailUrl),
          axios.get(dictionaryUrl),
        ]);

        let beritaData;
        if (lang === 'en') {
          // Endpoint terjemahan mengembalikan array, ambil item pertama
          beritaData = beritaResponse.data.data[0];
        } else {
          // Endpoint utama mengembalikan objek langsung
          beritaData = beritaResponse.data;
        }

        setBerita(beritaData);
        setDictionary(dictionaryResponse.data);

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Gagal memuat data atau berita tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, lang, baseurl]);

  if (loading || !dictionary) {
    return <p className="text-center py-10">{dictionary?.messages?.loading || "Memuat..."}</p>;
  }

  if (error || !berita) {
    return <p className="text-center py-10">{dictionary?.messages?.news_not_found || "Berita tidak ditemukan"}</p>;
  }

  // URL kanonis untuk Disqus dan social share
  const pageUrl = `${frontendUrl}/${lang}/berita/show/${id}`;

  return (
    <>
      {showIklan && <PopupIklan onClose={handleCloseIklan} />}
      <YtPreview link={berita.link} />

      <div className="row clearfix" style={{ marginTop: "8px" }}>
        <div className="col-lg-8">
          <h2 className="fw-bold lh-sm mb-3" style={{ fontSize: "2.5rem" }}>
            {berita.judul}
          </h2>

          <div className="d-flex align-items-center text-muted mb-3 ms-2 small">
            <div className="me-2 d-flex flex-column justify-content-center align-items-center">
              {/* Decorative dots */}
              <div className="rounded-circle bg-secondary" style={{ width: "2px", height: "2px", margin: "1px 0" }}></div>
              <div className="rounded-circle bg-secondary" style={{ width: "2px", height: "2px", margin: "1px 0" }}></div>
              <div className="rounded-circle bg-secondary" style={{ width: "2px", height: "2px", margin: "1px 0" }}></div>
            </div>
            <div className="d-flex align-items-center">
              <i className="icon-time me-2"></i>
              {/* Format tanggal sesuai bahasa */}
              {new Date(berita.waktu_publish).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="entry">
            <div className="entry-image">
              <Image
                src={berita.cover}
                alt={berita.judul}
                width={800}
                height={400}
                style={{ width: "100%", height: "auto" }}
                priority
              />
              {berita.kategori && (
                <div className="entry-categories">
                   <Link href={`/${lang}/berita/${berita.kategori.id_kategori}`} className="bg-travel">
                      {berita.kategori.nama}
                    </Link>
                </div>
              )}
            </div>

            <div className="entry-content clearfix mt-4">
              <div
                dangerouslySetInnerHTML={{ __html: berita.deskripsi }}
                className="text-dark"
              />
            </div>
          </div>
          
          <DisqusComment
            url={pageUrl}
            identifier={id} 
            shortname="tvku" 
          />
        </div>

        <Sidebar />
      </div>
    </>
  );
}