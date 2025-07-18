"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { convert } from "html-to-text";

import { berita, apiResponse } from "@/app/types";
import Sidebar from "@/app/components/sideBar";

export default function BeritaTerbaruPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const lang = (params.lang as "id" | "en") || "id";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [beritaApiResponse, setBeritaApiResponse] = useState<apiResponse | null>(null);
  const [dictionary, setDictionary] = useState<any>(null); // eslint-disable-line
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
            ? `https://apidev.tvku.tv/api/berita-translations?language_code=en&current_page=${currentPage}`
            : `${baseurl}/berita?current_page=${currentPage}`;
        
        const dictionaryUrl = `/dictionaries/${lang}.json`;

        const [beritaResponse, dictionaryResponse] = await Promise.all([
          axios.get(beritaUrl),
          axios.get(dictionaryUrl),
        ]);

        const processedBerita: apiResponse = {
          ...beritaResponse.data,
          data: beritaResponse.data.data.map((item: berita) => ({
            ...item,
            deskripsi: convert(item.deskripsi, {
              selectors: [{ selector: "img", format: "skip" }],
            }),
          })),
        };

        setBeritaApiResponse(processedBerita);
        setDictionary(dictionaryResponse.data);

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang, currentPage, baseurl]);

  const getPageRange = () => {
    const pages: (number | string)[] = [];
    const total_no_of_pages = beritaApiResponse?.last_page || 1;
    const adjacents = 2;

    if (total_no_of_pages <= 10) {
      for (let counter = 1; counter <= total_no_of_pages; counter++) {
        pages.push(counter);
      }
    } else {
      if (currentPage <= 5) {
        for (let counter = 1; counter < 9; counter++) {
          pages.push(counter);
        }
        pages.push("...");
      } else if (currentPage > 5 && currentPage < total_no_of_pages - 4) {
        pages.push("...");
        for (
          let counter = currentPage - adjacents;
          counter <= currentPage + adjacents;
          counter++
        ) {
          pages.push(counter);
        }
        pages.push("...");
      } else {
        pages.push("...");
        for (
          let counter = total_no_of_pages - 6;
          counter <= total_no_of_pages;
          counter++
        ) {
          pages.push(counter);
        }
      }
    }
    return pages;
  };

  if (loading || !dictionary) {
    return <div className="text-center p-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-5 text-red-500">{error}</div>;
  }
  
  if (!beritaApiResponse || beritaApiResponse.data.length === 0) {
    return (
      <div className="text-center p-5">
        {dictionary?.berita_page?.no_news || "Tidak ada berita."}
      </div>
    );
  }

  const total_no_of_pages = beritaApiResponse.last_page;
  const baseUrlLink = `/${lang}/berita/beritaterbaru`;
  const displayedPages = getPageRange();

  const firstpage_class = currentPage > 1 ? "" : "disabled";
  const previouspage_class = currentPage <= 1 ? "disabled" : "";
  const nextpage_class = currentPage >= total_no_of_pages ? "disabled" : "";
  const lastpage_class = currentPage < total_no_of_pages ? "" : "disabled";

  const previous_page = Math.max(1, currentPage - 1);
  const next_page = Math.min(total_no_of_pages, currentPage + 1);

  return (
    <>
      <div className="row clearfix">
        <div className="col-lg-8">
          <div className="mt-0">
            <div className="row col-mb-50">
              <div className="col-12">
                <div className="mb-2 ls1 text-uppercase fw-bold">
                  {/* Menggunakan dictionary untuk judul */}
                  <h3>{dictionary.berita_page.latest_news}</h3>
                  <div className="line line-xs line-sports"></div>
                </div>
                {beritaApiResponse.data.map((item) => (
                  <div key={item.id} className="posts-md">
                    <div className="entry row mb-5">
                      <div className="col-md-6">
                        <div className="entry-image">
                          <Link href={`/${lang}/berita/show/${item.id}`}>
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
                            <Link href={`/${lang}/berita/show/${item.id}`}>
                              {item.judul}
                            </Link>
                          </h3>
                        </div>
                        <div className="entry-meta">
                          <ul>
                            <li>
                              <i className="icon-calendar3" />{" "}
                              {new Date(item.waktu_publish).toLocaleDateString(
                                lang === "id" ? "id-ID" : "en-US",
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
                          <p className="mb-0 line-clamp-3">{item.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {total_no_of_pages > 1 && (
              <div className="row col-md-12 mt-5">
                <div className="text-center">
                  <ul className="pagination pagination-rounded flex-wrap justify-center">
                    {/* Menggunakan Link untuk pagination */}
                    <li className={`page-item ${firstpage_class}`}>
                      <Link className="page-link" href={`${baseUrlLink}?page=1`} aria-label="First">
                        <span aria-hidden="true">&laquo;</span>
                      </Link>
                    </li>

                    <li className={`page-item ${previouspage_class}`}>
                      <Link className="page-link" href={`${baseUrlLink}?page=${previous_page}`} aria-label="Previous">
                        <span aria-hidden="true">&lsaquo;</span>
                      </Link>
                    </li>

                    {displayedPages.map((pageNumber, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          pageNumber === currentPage ? "active" : ""
                        } ${typeof pageNumber === "string" ? "disabled" : ""}`}
                      >
                        {typeof pageNumber === "number" ? (
                           <Link href={`${baseUrlLink}?page=${pageNumber}`} className="page-link">
                            {pageNumber}
                          </Link>
                        ) : (
                          <span className="page-link">{pageNumber}</span>
                        )}
                      </li>
                    ))}

                    <li className={`page-item ${nextpage_class}`}>
                      <Link className="page-link" href={`${baseUrlLink}?page=${next_page}`} aria-label="Next">
                        <span aria-hidden="true">&rsaquo;</span>
                      </Link>
                    </li>

                    <li className={`page-item ${lastpage_class}`}>
                      <Link className="page-link" href={`${baseUrlLink}?page=${total_no_of_pages}`} aria-label="Last">
                        <span aria-hidden="true">&raquo;</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <Sidebar />
      </div>
    </>
  );
}