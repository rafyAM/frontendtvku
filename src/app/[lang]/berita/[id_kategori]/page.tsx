"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { htmlToText } from "html-to-text";

import { berita, kategori, apiResponse } from "@/app/types";
import SideBar from "@/app/components/sideBar";

export default function Page({
  params,
}: {
  params: Promise<{ id_kategori: string }>;
}) {
  const { id_kategori } = use(params);
  const searchParams = useSearchParams();

  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  const [kategoriData, setKategoriData] = useState<kategori | null>(null);
  const [beritaApiResponse, setBeritaApiResponse] =
    useState<apiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const getKategori = async () => {
      try {
        const res = await axios.get(`${baseurl}/kategori/${id_kategori}`);
        setKategoriData(res.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to load category");
        setKategoriData(null);
      }
    };
    getKategori();
  }, [baseurl, id_kategori]);

  useEffect(() => {
    const getBerita = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${baseurl}/berita?id_kategori=${id_kategori}&current_page=${currentPage}`
        );
        const data: apiResponse = res.data;

        const cleanedData = data.data.map((item: berita) => ({
          ...item,
          deskripsi: htmlToText(item.deskripsi, { wordwrap: false }),
        }));

        setBeritaApiResponse({ ...data, data: cleanedData });
        setError(null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news");
        setBeritaApiResponse(null);
      } finally {
        setLoading(false);
      }
    };
    getBerita();
  }, [baseurl, id_kategori, currentPage]);

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

  if (loading) return <div className="text-center p-5">Loading...</div>;
  if (error) return <div className="text-center p-5 text-red-500">{error}</div>;
  if (!kategoriData)
    return <div className="text-center p-5">Category not found.</div>;
  if (!beritaApiResponse || beritaApiResponse.data.length === 0)
    return (
      <div className="text-center p-5">
        Tidak ada berita untuk kategori ini.
      </div>
    );

  const total_no_of_pages = beritaApiResponse.last_page;
  const baseUrlLink = `/berita/${id_kategori}`;
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
                  <h3>{kategoriData.nama}</h3>
                  <div className="line line-xs line-sports"></div>
                </div>
                {beritaApiResponse.data.map((item) => (
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
                          <p className="mb-0 line-clamp-3">{item.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {total_no_of_pages > 0 && (
              <div className="row col-md-12 mt-5">
                <div className="text-center">
                  <ul className="pagination pagination-rounded flex-wrap justify-center">
                    {/* First Page */}
                    <li className={`page-item ${firstpage_class}`}>
                      <Link
                        className="page-link"
                        href={`${baseUrlLink}?page=1`}
                        aria-label="First"
                        tabIndex={currentPage === 1 ? -1 : undefined}
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </Link>
                    </li>

                    {/* Previous Page */}
                    <li className={`page-item ${previouspage_class}`}>
                      <Link
                        className="page-link"
                        href={`${baseUrlLink}?page=${previous_page}`}
                        aria-label="Previous"
                        tabIndex={currentPage <= 1 ? -1 : undefined}
                      >
                        <span aria-hidden="true">&lsaquo;</span>
                      </Link>
                    </li>

                    {/* Nomor Halaman Dinamis */}
                    {displayedPages.map((pageNumber, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          pageNumber === currentPage ? "active" : ""
                        } ${typeof pageNumber === "string" ? "disabled" : ""}`}
                      >
                        {typeof pageNumber === "number" ? (
                          <Link
                            href={`${baseUrlLink}?page=${pageNumber}`}
                            className={`page-link px-3 py-2 border rounded-md ${
                              pageNumber === currentPage
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {pageNumber}
                          </Link>
                        ) : (
                          <span className="page-link px-3 py-2 border rounded-md text-gray-700">
                            {pageNumber}
                          </span>
                        )}
                      </li>
                    ))}

                    {/* Next Page */}
                    <li className={`page-item ${nextpage_class}`}>
                      <Link
                        className="page-link"
                        href={`${baseUrlLink}?page=${next_page}`}
                        aria-label="Next"
                        tabIndex={
                          currentPage >= total_no_of_pages ? -1 : undefined
                        }
                      >
                        <span aria-hidden="true">&rsaquo;</span>
                      </Link>
                    </li>

                    {/* Last Page */}
                    <li className={`page-item ${lastpage_class}`}>
                      <Link
                        className="page-link"
                        href={`${baseUrlLink}?page=${total_no_of_pages}`}
                        aria-label="Last"
                        tabIndex={
                          currentPage >= total_no_of_pages ? -1 : undefined
                        }
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <SideBar />
      </div>
    </>
  );
}
