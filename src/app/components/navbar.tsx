"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { kategori as KategoriType, berita as BeritaType } from "../types";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface NavbarProps {
  lang?: "id" | "en";
  // eslint-disable-next-line 
  dictionary?: any;
}

const Navbar = ({
  lang: propLang,
  dictionary: propDictionary,
}: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const activeLang = propLang || (pathname.startsWith("/en") ? "en" : "id");

  const [categories, setCategories] = useState<KategoriType[]>([]);
  const [megaMenuNews, setMegaMenuNews] = useState<BeritaType[]>([]);
  const [activeMegaMenuCategory, setActiveMegaMenuCategory] = useState<
    number | null
  >(null);
  const [loadingMegaMenuNews, setLoadingMegaMenuNews] = useState(false);
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const getKategori = async () => {
      try {
        const resKategori = await axios.get(`${baseurl}/kategori`);
        setCategories(resKategori.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getKategori();
  }, [baseurl]);

  const fetchNewsForMegaMenu = useCallback(
    async (categoryId: number) => {
      setLoadingMegaMenuNews(true);
      try {
        const res = await axios.get(
          `${baseurl}/berita?id_kategori=${categoryId}`
        );
        setMegaMenuNews(res.data.data);
      } catch (error) {
        console.error(`Error fetching news for category ${categoryId}:`, error);
        setMegaMenuNews([]);
      } finally {
        setLoadingMegaMenuNews(false);
      }
    },
    [baseurl]
  );

  const handleMegaMenuCategoryHover = (categoryId: number) => {
    setActiveMegaMenuCategory(categoryId);
    fetchNewsForMegaMenu(categoryId);
  };

  const handleMegaMenuCategoryLeave = () => {
    setActiveMegaMenuCategory(null);
    setMegaMenuNews([]);
  };

  const handleLanguageChange = (newLang: "id" | "en") => {
    // Jika kita sudah di dalam path berita (e.g., /id/berita atau /en/berita/show/...)
    if (pathname.startsWith(`/${activeLang}/berita`)) {
      const newPathname = pathname.replace(`/${activeLang}/`, `/${newLang}/`);
      router.push(newPathname);
    } else {
      // Jika kita di halaman lain (e.g., /), arahkan ke halaman berita dengan bahasa baru
      router.push(`/${newLang}/berita`);
    }
  };

  // Gunakan dictionary yang di-pass, atau fallback ke versi default jika tidak ada
  const dictionary = propDictionary || {
    Navbar: {
      home: "Beranda",
      news: "Berita",
      language: "Bahasa",
      indonesia: "Indonesia",
      english: "Inggris",
    },
  };

  return (
    <>
      <div id="header-wrap" className="border-top border-f5 ">
        <div className="container">
          <div className="header-row justify-content-between flex-row-reverse flex-lg-row">
            <div className="header-misc">
              {/* Top Search */}
              <div id="top-search" className="header-misc-icon">
                <a href="#" id="top-search-trigger">
                  <i className="icon-line-search" />
                  <i className="icon-line-cross" />
                </a>
              </div>
            </div>
            <div id="primary-menu-trigger">
              <svg className="svg-trigger" viewBox="0 0 100 100">
                <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
                <path d="m 30,50 h 40" />
                <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
              </svg>
            </div>
            {/* Primary Navigation */}
            <nav className="primary-menu style-6">
              <ul className="menu-container">
                <li className="menu-item menu-color-home">
                  <Link className="menu-link" href="/">
                    <div>Beranda</div>
                  </Link>
                </li>
                {categories.slice(0, 5).map((item) => (
                  <li
                    key={item.id_kategori}
                    className="menu-item menu-color-home"
                  >
                    <Link
                      className="menu-link"
                      href={`/berita/${item.id_kategori}`}
                    >
                      <div>{item.nama}</div>
                    </Link>
                  </li>
                ))}
                <li className="menu-item menu-color-home mega-menu">
                  <a className="menu-link" href="#">
                    <div className="dropdown-toggle">Lainnya</div>
                  </a>
                  <div className="mega-menu-content mega-menu-style-2 border-top-0">
                    <div className="container">
                      <div className="row">
                        {/* Mega Menu - Category Links */}
                        <ul className="sub-menu-container mega-menu-column col-lg-3">
                          <li className="menu-item">
                            <div
                              className="nav nav-sm tab-hover flex-column nav-pills"
                              id="v-pills-tab"
                              role="tablist"
                              aria-orientation="vertical"
                            >
                              {categories.slice(5, 16).map((item) => (
                                <Link
                                  key={item.id_kategori}
                                  className={`nav-link bg-color-home ${
                                    activeMegaMenuCategory === item.id_kategori
                                      ? "active"
                                      : ""
                                  }`}
                                  onMouseEnter={() =>
                                    handleMegaMenuCategoryHover(
                                      item.id_kategori
                                    )
                                  }
                                  onMouseLeave={handleMegaMenuCategoryLeave}
                                  href={`/berita/${item.id_kategori}`}
                                >
                                  {item.nama}
                                </Link>
                              ))}
                            </div>
                          </li>
                        </ul>
                        {/* Mega Menu - News Display */}
                        <ul className="sub-menu-container mega-menu-column col-lg-9">
                          <li className="menu-item">
                            <div
                              className="tab-content"
                              id="v-pills-tabContent"
                            >
                              {loadingMegaMenuNews ? (
                                <div className="text-center p-4">
                                  Loading news...
                                </div>
                              ) : megaMenuNews.length > 0 ? (
                                <div className="row justify-content-around posts-md">
                                  {megaMenuNews.slice(0, 3).map((item) => (
                                    <div className="col-4" key={item.id}>
                                      <div className="entry">
                                        <div className="entry-image mb-3">
                                          <Link
                                            href={`/berita/show/${item.id}`}
                                          >
                                            <Image
                                              src={item.cover}
                                              alt={item.judul}
                                              width={300}
                                              height={200}
                                              objectFit="fill"
                                            />
                                          </Link>
                                          <div className="entry-categories">
                                            <Link
                                              href={`/berita/${item.kategori?.id_kategori}`}
                                              className="bg-lifestyle"
                                            >
                                              {item.kategori?.nama}
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="entry-title title-xs nott">
                                          <h3 className="mb-1">
                                            <Link
                                              href={`/berita/show/${item.id}`}
                                            >
                                              {item.judul}
                                            </Link>
                                          </h3>
                                        </div>
                                        <div className="entry-meta">
                                          <ul>
                                            <li>
                                              <i className="icon-time"></i>
                                              {new Date(
                                                item.waktu_publish
                                              ).toLocaleDateString("id-ID")}
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center p-4">
                                  {activeMegaMenuCategory
                                    ? "No news found for this category."
                                    : "Hover over a category to see news."}
                                </div>
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="menu-item">
                  <div className="menu-link" style={{ cursor: "pointer" }}>
                    <div>
                      {dictionary.navbar.language}
                      <i className="icon-angle-down"></i>
                    </div>
                  </div>
                  <ul className="sub-menu-container">
                    <li className="menu-item">
                      <a
                        className="menu-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLanguageChange("id");
                        }}
                      >
                        <div>{dictionary.navbar.indonesia}</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a
                        className="menu-link"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLanguageChange("en");
                        }}
                      >
                        <div>{dictionary.navbar.english}</div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
            {/* #primary-menu end */}
            <form className="top-search-form" action="search.html" method="get">
              <input
                type="text"
                name="q"
                className="form-control"
                defaultValue=""
                placeholder="Type & Hit Enter.."
                autoComplete="off"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="header-wrap-clone"></div>
    </>
  );
};

export default Navbar;
