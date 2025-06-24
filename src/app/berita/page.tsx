"use client";

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { berita, kategori } from "../types";
import SideBar from "../components/sideBar";
import Link from "next/link";
import Carousel from "../components/carousel";
import { convert } from "html-to-text"; // Import the convert function

export default function Page() {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const [kategori, setKategori] = useState<kategori[]>([]);
  const [featureData, setFeatureData] = useState<berita[]>([]);
  const [beritaTerbaru, setBeritaTerbaru] = useState<berita[]>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBerita = async () => {
      try {
        const res = await axios.get(`${baseurl}/berita`);
        const processedBerita = res.data.data.map((item: berita) => ({
          ...item,
          deskripsi: convert(item.deskripsi, {
            selectors: [{ selector: "img", format: "skip" }],
          }),
        }));
        setBeritaTerbaru(processedBerita);
        setError(null);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to load category");
        setBeritaTerbaru([]);
      } finally {
        setLoading(false);
      }
    };
    getBerita();
  }, [baseurl]);

  useEffect(() => {
    const getFeature = async () => {
      try {
        const res = await axios.get(`${baseurl}/berita?id_kategori=19`);
        // Process deskripsi to remove HTML tags for all featureData items
        const processedFeature = res.data.data.map((item: berita) => ({
          ...item,
          deskripsi: convert(item.deskripsi, {
            selectors: [{ selector: "img", format: "skip" }],
          }),
        }));
        setFeatureData(processedFeature);
        setError(null);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to load category");
      }
    };
    getFeature();
  }, [baseurl]);

  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await axios.get(`${baseurl}/kategori`);
        setKategori(res.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to load category");
      }
    };
    getKategori();
  }, [baseurl]);

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error)
    return <div className="text-center p-5 text-red-500">{error}</div>;
  if (!beritaTerbaru)
    return <div className="text-center p-5">Tidak ada berita</div>;

  const data = beritaTerbaru[0];

  return (
    <>
      <div className="row col-mb-50 mb-0">
        <div className="col-lg-8">
          <div className="posts-md">
            {beritaTerbaru.length > 0 && (
              <div className="entry">
                <div className="entry-image">
                  <a href={`/berita/show/${beritaTerbaru[0].id}`}>
                    <Image
                      src={beritaTerbaru[0].cover}
                      alt={beritaTerbaru[0].judul}
                      width={600}
                      height={300}
                    />
                  </a>
                </div>
                <div className="entry-title title-sm">
                  <h3>
                    <a href={`/berita/show/${beritaTerbaru[0].id}`}>{beritaTerbaru[0].judul}</a>
                  </h3>
                </div>
                <div className="entry-content">
                  <p className="line-clamp-2 mb-0">{beritaTerbaru[0].deskripsi}</p>
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
                        <a href={`/berita/show/${item.id}`}>{item.judul}</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="row clearfix">
        <div className="col-lg-8">
          <nav
            className="navbar navbar-expand-lg navbar-light p-0"
            style={{ justifyContent: "flex-start" }}
          >
            <h4 className="mb-0 pe-2 ls1 text-uppercase fw-bold">
              Berita Terbaru
            </h4>
            | <Link href="/berita/beritaterbaru">more..</Link>
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
                        <a href={`/berita/show/${data.id}`}>
                          <Image
                            src={data.cover}
                            alt={data.judul}
                            width={400}
                            height={200}
                            style={{ width: "416px", height: "233px" }}
                          />
                        </a>
                        <div className="entry-categories">
                          <a href={`/berita/show/${data.id}`} className="bg-travel">
                            {data.kategori.nama}
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
                                <a href={`berita/show/${item.id}`}>{item.judul}</a>
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
                              <a href={`/berita/show/${item.id}`} className="bg-lifestyle">
                                {item.kategori.nama}
                              </a>
                            </div>
                          </div>
                          <div className="entry-title title-sm nott">
                            <h3 className="mb-2">
                              <a href={`/berita/show/${item.id}`}>{item.judul}</a>
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
                            <p className="line-clamp-2 mb-0">{item.deskripsi}</p>
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
                              <a href={`/berita/show/${item.id}`}>{item.judul}</a>
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
        <SideBar />
      </div>

      <Carousel />

      <div className="container clearfix">
        <div className="row clearfix">
          {/* */}
          <div className="col-lg-8">
            <div className="mt-0">
              <h4 className="mb-2 ls1 text-uppercase fw-bold">Feature</h4>
              <div className="line line-xs line-sports"></div>

              <div className="row col-mb-50 mb-0">
                {featureData.map((item) => (
                  <div key={item.id} className="posts-md">
                    <div className="entry row mb-5">
                      <div className="col-md-6">
                        <div className="entry-image">
                          <Link href={`/berita/show/${item.id}`}>
                            <Image
                              src={item.cover}
                              alt={item.judul}
                              width={600}
                              height={300}
                              className="rounded"
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="col-md-6 mt-3 mt-md-0">
                        <div className="entry-title title-sm nott">
                          <h3>
                            <Link href={`/berita/show/${item.id}`}>
                              {item.judul}
                            </Link>
                          </h3>
                        </div>
                        <div className="entry-meta">
                          <ul>
                            <li>
                              <i className="icon-calendar3" />{" "}
                              {new Date(item.waktu_publish).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </li>
                          </ul>
                        </div>
                        <div className="entry-content">
                          {/* Use dangerouslySetInnerHTML if you still want to render some parsed HTML, or just text */}
                          <p className="mb-0 line-clamp-3">{item.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 2 sidebar */}
          <div className="col-lg-4 sticky-sidebar-wrap kategoriberita">
            <div className="sticky-sidebar">
              <div className="widget widget_links clearfix">
                <h4 className="mb-2 ls1 text-uppercase fw-bold">
                  Kategori Berita
                </h4>
                <div className="line line-xs line-sports"></div>
                <ul>
                  {kategori.map((item) => (
                    <li
                      key={item.id_kategori}
                      className="d-flex align-items-center"
                    >
                      <a
                        href={`/berita/show/${item.id_kategori}`}
                        className="flex-fill"
                      >
                        {item.nama}
                      </a>
                      <span className="badge text-light bg-sports">10</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="widget clearfix">
                <h4 className="mb-2 ls1 text-uppercase fw-bold">
                  Recent Posts
                </h4>
                <div className="line line-xs line-home"></div>
                <div className="posts-sm row col-mb-30">
                  {beritaTerbaru.slice(0, 4).map((item) => (
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
                            <h4 className="fw-semibold">
                              <a href={`/berita/show/${item.id}`}>{item.judul}</a>
                            </h4>
                          </div>
                          <div className="entry-meta">
                            <ul>
                              <li>
                                <i className="icon-time"></i>
                                <a href={`/berita/show/${item.id}`}>{item.waktu_publish}</a>
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
      </div>
    </>
  );
}