"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { convert } from "html-to-text";
import { berita, kategori } from "@/app/types";
import Sidebar from "@/app/components/sideBar";
import Carousel from "@/app/components/carousel";

export default function BeritaPage() {
  const params = useParams();
  const lang = params.lang as "id" | "en";

  const [beritaTerbaru, setBeritaTerbaru] = useState<berita[]>([]);
  const [featureData, setFeatureData] = useState<berita[]>([]);
  const [dictionary, setDictionary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!lang) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const beritaUrl =
          lang === "en"
            ? `https://apidev.tvku.tv/api/berita-translations?language_code=en`
            : `${baseurl}/berita`;

        const featureUrl =
          lang === "en"
            ? `https://apidev.tvku.tv/api/berita-translations?language_code=en&id_kategori=19`
            : `${baseurl}/berita?id_kategori=19`;

        const dictionaryUrl = `/dictionaries/${lang}.json`;

        const [beritaResponse, featureResponse, dictionaryResponse] =
          await Promise.all([
            axios.get(beritaUrl),
            axios.get(featureUrl),
            axios.get(dictionaryUrl),
          ]);

        const processedBerita = beritaResponse.data.data.map((item: any) => ({
          ...item,
          deskripsi: convert(item.isi_berita || item.deskripsi, {
            selectors: [{ selector: "img", format: "skip" }],
          }),
        }));
        setBeritaTerbaru(processedBerita);

        const processedFeature = featureResponse.data.data.map((item: any) => ({
          ...item,
          deskripsi: convert(item.isi_berita || item.deskripsi, {
            selectors: [{ selector: "img", format: "skip" }],
          }),
        }));
        setFeatureData(processedFeature);

        setDictionary(dictionaryResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang, baseurl]); // Jalankan ulang effect jika 'lang' berubah

  if (loading || !dictionary) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-red-500">{error}</div>;
  }

  if (!beritaTerbaru || beritaTerbaru.length === 0) {
    return (
      <div className="text-center p-5">
        {dictionary?.berita_page?.no_news || "Tidak ada berita"}
      </div>
    );
  }

  const data = beritaTerbaru[0];

  return (
    <>
      <div className="row col-mb-50 mb-0">
        <div className="col-lg-8">
          <div className="posts-md">
            {beritaTerbaru.length > 0 && (
              <div className="entry">
                <div className="entry-image">
                  <Link
                    href={`/${lang}/berita/show/${
                      beritaTerbaru[0].id || beritaTerbaru[0].id
                    }`}
                  >
                    <Image
                      src={
                        beritaTerbaru[0].cover ||
                        `https://apidev.tvku.tv/storage/${beritaTerbaru[0].cover}`
                      }
                      alt={beritaTerbaru[0].judul}
                      width={600}
                      height={300}
                      priority
                    />
                  </Link>
                </div>
                <div className="entry-title title-sm">
                  <h3>
                    <Link
                      href={`/${lang}/berita/show/${
                        beritaTerbaru[0].id || beritaTerbaru[0].id
                      }`}
                    >
                      {beritaTerbaru[0].judul}
                    </Link>
                  </h3>
                </div>
                <div className="entry-content">
                  <p className="line-clamp-2 mb-0">
                    {beritaTerbaru[0].deskripsi}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="posts-sm row col-mb-30">
            {beritaTerbaru.slice(1, 6).map((item) => (
              <div key={item.id} className="entry col-12">
                <div className="grid-inner row g-0">
                  <div className="col-auto">
                    <div className="entry-image">
                      <Link href={`/${lang}/berita/show/${item.id || item.id}`}>
                        <Image
                          src={
                            item.cover ||
                            `https://apidev.tvku.tv/storage/${item.cover}`
                          }
                          alt={item.judul}
                          width={100}
                          height={100}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col ps-3">
                    <div className="entry-title">
                      <h4>
                        <Link
                          href={`/${lang}/berita/show/${item.id || item.id}`}
                        >
                          {item.judul}
                        </Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* latest news */}
      <div className="row clearfix">
        <div className="col-lg-8">
          <nav
            className="navbar navbar-expand-lg navbar-light p-0"
            style={{ justifyContent: "flex-start" }}
          >
            <h4 className="mb-0 pe-2 ls1 text-uppercase fw-bold">
              {dictionary.berita_page.latest_news}
            </h4>
            | <Link href={`/${lang}/berita/beritaterbaru`}>more..</Link>
            <button
              className="navbar-toggler"
              style={{ visibility: "hidden" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler1"
              aria-controls="navbarToggler1"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="icon-line-menu"></i>
            </button>
          </nav>
          <div className="line line-xs line-dark"></div>

          <div className="tab-content" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-outdoor"
              role="tabpanel"
              aria-labelledby="nav-outdoor-tab"
            >
              <div className="row col-mb-30 mb-0">
                <div className="col-lg-6 beritaterbaru">
                  <div className="posts-md">
                    <div className="entry">
                      <div className="entry-image">
                        <a href={`${lang}/berita/show/${data.id}`}>
                          <Image
                            src={data.cover}
                            alt={data.judul}
                            width={400}
                            height={200}
                            style={{ width: "416px", height: "233px" }}
                          />
                        </a>
                        <div className="entry-categories">
                          <a
                            href={`${lang}/berita/show/${data.id}`}
                            className="bg-travel"
                          >
                            {data.kategori?.nama || 'Uncategorized'}
                          </a>
                        </div>
                      </div>
                      <div className="entry-title nott">
                        <h3 className="mb-2">
                          <a href={`berita/show/${data.id}`}>{data.judul}</a>
                        </h3>
                      </div>
                      <div className="entry-meta">
                        <ul>
                          <li>
                            <i className="icon-time"></i>
                            {data.waktu_publish}
                          </li>
                        </ul>
                      </div>
                      <div className="entry-content clearfix line-clamp-1">
                        <p className="line-clamp-2">{data.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="posts-sm row col-mb-30">
                    {beritaTerbaru.slice(1, 5).map((item) => (
                      <div key={item.id} className="entry col-12">
                        <div className="grid-inner row align-items-center g-0">
                          <div className="col-auto">
                            <div className="entry-image">
                              <a href={`/berita/show/${item.id}`}>
                                <Image
                                  src={item.cover}
                                  alt={item.judul}
                                  width={400}
                                  height={200}
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col ps-3">
                            <div className="entry-title">
                              <h4>
                                <a href={`berita/show/${item.id}`}>
                                  {item.judul}
                                </a>
                              </h4>
                            </div>
                            <div className="entry-meta">
                              <ul>
                                <li>
                                  <i className="icon-time"></i>
                                  {item.waktu_publish}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="row col-mb-50 mb-0">
                  {beritaTerbaru.slice(5, 7).map((item) => (
                    <div key={item.id} className="col-md-6 mt-4 beritaterbaru2">
                      <div className="posts-md">
                        <div className="entry">
                          <div className="entry-image">
                            <a href={`/berita/show/${item.id}`}>
                              <Image
                                src={item.cover}
                                alt={item.judul}
                                width={400}
                                height={200}
                                style={{ width: "416px", height: "233px" }}
                              />
                            </a>
                            <div className="entry-categories">
                              <a
                                href={`/berita/show/${item.id}`}
                                className="bg-lifestyle"
                              >
                                {item.kategori?.nama || 'Uncategorized'}
                              </a>
                            </div>
                          </div>
                          <div className="entry-title title-sm nott">
                            <h3 className="mb-2">
                              <a href={`/berita/show/${item.id}`}>
                                {item.judul}
                              </a>
                            </h3>
                          </div>
                          <div className="entry-meta">
                            <ul>
                              <li>
                                <i className="icon-time"></i>
                                {item.waktu_publish}
                              </li>
                            </ul>
                          </div>
                          <div className="entry-content clearfix">
                            <p className="line-clamp-2 mb-0">
                              {item.deskripsi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="posts-sm row col-mb-30">
                  {beritaTerbaru.slice(7, 11).map((item) => (
                    <div key={item.id} className="entry col-md-6">
                      <div className="grid-inner row align-items-center no-gutter">
                        <div className="col-auto">
                          <div className="entry-image">
                            <a href={`/berita/show/${item.id}`}>
                              <Image
                                src={item.cover}
                                alt={item.judul}
                                width={400}
                                height={200}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="col ps-3">
                          <div className="entry-title">
                            <h4 className="fw-medium">
                              <a href={`/berita/show/${item.id}`}>
                                {item.judul}
                              </a>
                            </h4>
                          </div>
                          <div className="entry-meta">
                            <ul>
                              <li>
                                <i className="icon-time"></i>
                                {item.waktu_publish}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sidebar />
      </div>

      <Carousel />

      <div className="container clearfix">
        <div className="row clearfix">
          <div className="col-lg-12">
            <div className="mt-4">
              <h4 className="mb-2 ls1 text-uppercase fw-bold">Feature</h4>
              <div className="line line-xs line-sports"></div>
              <div className="row">
                {featureData.map((item) => (
                  <div key={item.id} className="col-md-6 mb-4">
                    <div className="entry h-100">
                      <div className="grid-inner row g-0 h-100">
                        <div className="col-md-5">
                          <div className="entry-image h-100">
                            <Link
                              href={`/${lang}/berita/show/${
                                item.id || item.id
                              }`}
                            >
                              <Image
                                src={
                                  item.cover ||
                                  `https://apidev.tvku.tv/storage/${item.cover}`
                                }
                                alt={item.judul}
                                width={300}
                                height={200}
                                className="rounded h-100"
                                style={{ objectFit: "cover" }}
                              />
                            </Link>
                          </div>
                        </div>
                        <div className="col-md-7 ps-md-4">
                          <div className="entry-title title-sm nott mt-3 mt-md-0">
                            <h3>
                              <Link
                                href={`/${lang}/berita/show/${
                                  item.id || item.id
                                }`}
                              >
                                {item.judul}
                              </Link>
                            </h3>
                          </div>
                          <div className="entry-content">
                            <p className="mb-0 line-clamp-3">
                              {item.deskripsi}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
