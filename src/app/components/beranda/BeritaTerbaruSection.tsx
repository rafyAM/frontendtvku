import React from "react";
import { berita, jadwalAcara } from "../../types";
import Image from "next/image";

type BeritaTerbaruSectionProps = {
  Berita: berita[];
  jadwalAcara: jadwalAcara[];
  hari: string;
  tanggal: string;
  jam: number;
  onair: { acara: string } | null;
};

export const BeritaTerbaruSection: React.FC<BeritaTerbaruSectionProps> = ({
  Berita,
  jadwalAcara,
  hari,
  tanggal,
  jam,
  onair,
}) => {
  return (
    <div className="container">
      <div className="row rowjadwalsiar">
        <div className="col-12 col-lg-6">
          <div
            className="fslider flex-thumb-grid grid-6"
            data-speed="400"
            data-arrows="true"
            data-thumbs="true"
            data-easing="easeOutQuad"
          >
            <div className="flexslider">
              <div className="slider-wrap">
                {Berita.map((item, idx) => (
                  <div className="slide" data-thumb={item.cover} key={idx}>
                    <a href="#">
                      <Image
                        src={item.cover}
                        alt={item.judul}
                        width={100}
                        height={100}
                      />
                      <div className="bg-overlay">
                        <div className="bg-overlay-content text-overlay-mask desc-sm dark desc-sm align-items-end justify-content-start p-4">
                          <div className="portfolio-desc py-0">
                            <h3>{item.judul}</h3>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="container-fluid">
            <div className="row rowjadwalsiar">
              <div className="col-12 col-md-7">
                <div className="posts-sm row col-mb-30">
                  {Berita &&
                    Berita.map((item, idx) => (
                      <div className="entry col-12 entry-siar" key={idx}>
                        <div className="entry-title">
                          <h4>
                            <a href="#">{item.judul}</a>
                          </h4>
                        </div>
                        <hr style={{ borderTop: "dashed 1px black" }} />
                      </div>
                    ))}
                  <div className="entry col-12 entry-siar">
                    <div className="entry-title">
                      <a href="#" style={{ color: "black" }}>
                        <div
                          style={{
                            fontSize: 17,
                            textAlign: "center",
                            backgroundColor: "#f1f1f1",
                            paddingLeft: 0,
                            paddingRight: 0,
                          }}
                        >
                          Selengkapnya
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-5">
                <div className="widget widget-siaran">
                  <div className="list-type4">
                    <h4>
                      Siaran Hari ini : <br />
                      {hari}, {tanggal}
                    </h4>
                  </div>
                  <div
                    style={{ backgroundColor: "#DB0031" }}
                    className="list-type4"
                  >
                    <h5 style={{ color: "white", paddingLeft: 10 }}>
                      ON AIR :<br /> {onair?.acara ?? "--"}
                    </h5>
                  </div>
                  <div
                    className="list-type4"
                    style={{
                      overflow: "scroll",
                      overflowX: "hidden",
                      height: 250,
                    }}
                  >
                    <ol>
                      {jadwalAcara.map((j, idx) => {
                        const isNow =
                          jam >= parseFloat(j.jam_awal) &&
                          jam <= parseFloat(j.jam_akhir);
                        return (
                          <li key={idx}>
                            {j.acara}
                            {isNow ? (
                              <span className="badge">Now</span>
                            ) : (
                              <>
                                <br />
                                <div style={{ fontSize: "0.8em" }}>
                                  {j.jam_awal} - {j.jam_akhir} WIB
                                </div>
                              </>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
