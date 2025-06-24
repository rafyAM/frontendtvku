"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { berita } from "@/app/types";
import SideBar from "@/app/components/sideBar";
import Image from "next/image";
import DisqusComment from "@/app/components/disqus";
import PopupIklan from "@/app/components/popupIklan";
import YtPreview from "@/app/components/yt-preview";
import Link from "next/link";

const DetailBeritaPage = () => {
  const { id } = useParams<{ id: string }>();
  const [berita, setBerita] = useState<berita | null>(null);
  const [loading, setLoading] = useState(true);
  const [showIklan, setShowIklan] = useState(false);

  useEffect(() => {
    setShowIklan(true);
  }, []);

  const handleClose = () => {
    setShowIklan(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://apidev.tvku.tv/api/berita/${id}`);
        if (!res.ok) {
          const text = await res.text();
          console.error("Fetch error:", res.status, text);
          return;
        }
        const data = await res.json();
        setBerita(data); // Langsung objek, tidak pakai [0]
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) return <p className="text-center py-10">Memuat...</p>;
  if (!berita)
    return <p className="text-center py-10">Berita tidak ditemukan</p>;

  return (
    <>
      {showIklan && <PopupIklan onClose={handleClose} />}
      <YtPreview link={berita.link} />


      <div className="row clearfix" style={{ marginTop: "8px" }}>
        <div className="col-lg-8">
      <h2 className="fw-bold lh-sm mb-3" style={{ fontSize: "2.5rem" }}>
        <Link
          href={`/berita/${berita.id}`}
          className="text-dark text-decoration-none"
        >
          {berita.judul}
        </Link>
      </h2>

      <div className="d-flex align-items-center text-muted mb-3 ms-2 small">
        <div className="me-2 d-flex flex-column justify-content-center align-items-center">
          <div
            className="rounded-circle bg-secondary"
            style={{ width: "2px", height: "2px", margin: "1px 0" }}
          ></div>
          <div
            className="rounded-circle bg-secondary"
            style={{ width: "2px", height: "2px", margin: "1px 0" }}
          ></div>
          <div
            className="rounded-circle bg-secondary"
            style={{ width: "2px", height: "2px", margin: "1px 0" }}
          ></div>
        </div>
        <div className="d-flex align-items-center">
          <i className="icon-time me-2"></i>
          {berita.waktu_publish}
        </div>
      </div>
          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-detail"
              role="tabpanel"
              aria-labelledby="nav-detail-tab"
            >
              <div className="row col-mb-30 mb-0">
                {/* Konten utama berita */}
                <div className="col-12">
                  <div className="posts-md">
                    <div className="entry">
                      <div className="entry-image">
                        <Image
                          src={berita.cover}
                          alt={berita.judul}
                          width={800}
                          height={400}
                          style={{ width: "100%", height: "auto" }}
                        />
                        <div className="entry-categories">
                          <a href="#" className="bg-travel">
                            {berita.kategori.nama}
                          </a>
                        </div>
                      </div>
                      {/* Tambahkan link berita di sini */}

                      <div className="entry-content clearfix">
                        <div
                          dangerouslySetInnerHTML={{ __html: berita.deskripsi }}
                          className="text-dark"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <DisqusComment
                  url={`https://apidev.tvku.tv/api${berita.id}`}
                  identifier={berita.id.toString()}
                  shortname="disqus_thread"
                />
                {/* Berita lain yang relevan */}
                {/* ... */}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <SideBar />
      </div>
      <div id="disqus_thread"></div>
    </>
  );
};

export default DetailBeritaPage;
