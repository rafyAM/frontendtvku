"use client";

import { berita } from "../types";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

declare global {
  interface Window {
    jQuery: any; // eslint-disable-line
  }
}

const Carousel = () => {
  const baseurl = process.env.NEXT_PUBLIC_BASE_URL;
  const [berita, setBerita] = useState<berita[]>([]);
  const [mounted, setMounted] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInitialized = useRef(false);

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch data
  useEffect(() => {
    if (!mounted) return;

    const fetchBerita = async () => {
      try {
        const res = await axios.get(`${baseurl}/berita?sort=populer`);
        setBerita(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching berita:", error);
      }
    };

    fetchBerita();
  }, [mounted, baseurl]);

  // Initialize carousel only after everything is ready
  useEffect(() => {
    if (!mounted || !carouselRef.current || carouselInitialized.current) return;

    // Capture the current ref value
    const currentCarousel = carouselRef.current;

    const initCarousel = () => {
      if (typeof window === "undefined" || !window.jQuery) {
        console.log("jQuery not loaded yet");
        return;
      }

      const $ = window.jQuery;
      const $carousel = $(currentCarousel);

      if (!$carousel.length) {
        console.log("Carousel element not found");
        return;
      }

      try {
        // Destroy any existing carousel
        if ($carousel.hasClass("owl-loaded")) {
          $carousel.trigger("destroy.owl.carousel");
          $carousel.removeClass("owl-loaded owl-carousel");
        }

        // Clean up any owl-related classes and elements
        $carousel.find(".owl-stage-outer").contents().unwrap();
        $carousel.find(".owl-nav, .owl-dots").remove();
        $carousel.removeClass("owl-loaded owl-drag owl-grab");

        // Re-add necessary classes
        $carousel.addClass("owl-carousel");

        // Initialize carousel
        $carousel.owlCarousel({
          items: 1,
          margin: 20,
          dots: false,
          nav: true,
          navText: [
            '<i class="icon-angle-left"></i>',
            '<i class="icon-angle-right"></i>',
          ],
          responsive: {
            0: { items: 1, dots: true },
            576: { items: 1, dots: true },
            768: { items: 2, dots: true },
            992: { items: 2 },
            1200: { items: 3 },
          },
          onInitialized: function () {
            console.log("Owl Carousel initialized successfully");
            carouselInitialized.current = true;
          },
        });
      } catch (error) {
        console.error("Error initializing carousel:", error);
      }
    };

    // Delay initialization to ensure DOM is fully ready
    const timer = setTimeout(initCarousel, 500);

    return () => {
      clearTimeout(timer);
      // Cleanup on unmount using the captured ref value
      if (typeof window !== "undefined" && window.jQuery && currentCarousel) {
        const $ = window.jQuery;
        const $carousel = $(currentCarousel);
        if ($carousel.hasClass("owl-loaded")) {
          $carousel.trigger("destroy.owl.carousel");
        }
      }
    };
  }, [mounted, berita.length]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="section bg-transparent m-0">
      <div className="container clearfix">
        <h4 className="mb-3 ls1 text-uppercase fw-bold">Berita Populer</h4>

        {berita.length === 0 ? (
          <div className="text-center py-5">
            <p>Loading news...</p>
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="owl-carousel fixed-nav top-nav carousel-widget posts-md"
            id="oc-news"
          >
            {berita.map((item, index) => (
              <div
                key={`berita-${item.judul}-${index}`}
                className="entry mb-0"
                style={{
                  background: `url("${item.cover}") center center`,
                  backgroundSize: "cover",
                  height: 400,
                }}
              >
                <div className="bg-overlay">
                  <div className="bg-overlay-content text-overlay-mask dark desc-sm align-items-end justify-content-start p-4">
                    <div className="position-relative w-100">
                      <div className="entry-categories">
                        <a href={`/berita/show/${item.id}`} className="bg-fashion">
                          {item.kategori.nama}
                        </a>
                      </div>
                      <div className="entry-title nott">
                        <h3 className="fw-semibold mb-2">
                          <a href={`/berita/show/${item.id}`} className="text-light">
                            {item.judul}
                          </a>
                        </h3>
                      </div>
                      <div className="entry-meta no-separator">
                        <ul>
                          <li>
                            <i className="icon-time" />
                            <a href={`/berita/show/${item.id}`}>{new Date().toLocaleDateString()}</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
