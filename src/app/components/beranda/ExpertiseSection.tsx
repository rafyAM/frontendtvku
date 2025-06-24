import React from "react";
import { expertise1, expertise2 } from "@/app/types";
import Image from "next/image";

type Expertiseprops = {
  data?: {
    expertise1?: expertise1[];
    expertise2_1?: expertise2[];
    expertise2_2?: expertise2[];
  };
}

export const ExpertiseSection: React.FC<Expertiseprops> = ({ data }) => {
  const expertise1Data = data?.expertise1 || [];
  const expertise2_1 = data?.expertise2_1 || [];
  const expertise2_2 = data?.expertise2_2 || [];

  return (
    <div className="container clearfix mb-5">
      <div className="heading-block topmargin-lg center">
        <h2>Here Are Some of Our Expertise</h2>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12">
          {expertise1Data.map((item, idx) => (
            <div className="grid-inner row g-0" key={idx}>
              <div className="col-md-4">
                <div className="entry-image">
                  <a href="#" data-lightbox="image">
                    <Image
                      src={item.thumbnail}
                      alt="Standard Post with Image"
                      width={200}
                      height={150}
                    />
                  </a>
                </div>
              </div>
              <div className="col-md-8 ps-md-4">
                <div className="entry-title title-sm">
                  <h3>{item.judul}</h3>
                </div>
                <div className="entry-content entry-content-home">
                  <p>{item.deskripsi}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-3 col-12">
          {expertise2_1.map((item, idx) => (
            <div
              id="portfolio"
              className="portfolio row g-0 portfolio-reveal grid-container portfolio-home"
              key={idx}
            >
              <article className="portfolio-item pf-media pf-icons">
                <div className="grid-inner">
                  <div className="portfolio-image">
                    <a href="#">
                      <Image
                        src={item.thumbnail}
                        alt="Open Imagination"
                        width={150}
                        height={100}
                      />
                    </a>
                  </div>
                  <div className="portfolio-desc">
                    <h3>
                      <a href="#">{item.judul}</a>
                    </h3>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
        <div className="col-lg-3 col-12 move-to-bottom">
          {expertise2_2.map((item, idx) => (
            <div
              id="portfolio"
              className="portfolio row g-0 portfolio-reveal grid-container portfolio-home"
              key={idx}
            >
              <article className="portfolio-item pf-media pf-icons">
                <div className="grid-inner">
                  <div className="portfolio-image">
                    <a href="#">
                      <Image
                        src={item.thumbnail}
                        alt="Open Imagination"
                        width={150}
                        height={100}
                      />
                    </a>
                  </div>
                  <div className="portfolio-desc">
                    <h3>
                      <a href="#">{item.judul}</a>
                    </h3>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
