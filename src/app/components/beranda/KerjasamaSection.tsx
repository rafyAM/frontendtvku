import React from "react";
import Image from "next/image";

const images = [
  {
    src: "/images/kerjasamaygterjalin/bapenda.png",
    alt: "Logo of BAPENDA",
    caption: "Collaboration with BAPENDA (Regional Revenue Agency).",
  },
  {
    src: "/images/kerjasamaygterjalin/bjateng.png",
    alt: "Logo of Bank Jateng",
    caption: "Partnership with Bank Jateng.",
  },
  {
    src: "/images/kerjasamaygterjalin/bnn.png",
    alt: "Logo of BNN",
    caption: "Cooperation with BNN (National Narcotics Agency).",
  },
  {
    src: "/images/kerjasamaygterjalin/esport.png",
    alt: "Logo of Esports organization",
    caption: "Support for the local Esports community.",
  },
  {
    src: "/images/kerjasamaygterjalin/halal.png",
    alt: "Halal certification logo",
    caption: "Promoting Halal industry standards.",
  },
  {
    src: "/images/kerjasamaygterjalin/kemenkumham.png",
    alt: "Logo of Kemenkumham",
    caption:
      "Collaboration with Kemenkumham ",
  },
  {
    src: "/images/kerjasamaygterjalin/kominfo.png",
    alt: "Logo of Kominfo",
    caption:
      "Partnership with Kominfo ",
  },
  {
    src: "/images/kerjasamaygterjalin/komnasanak.png",
    alt: "Logo of Komnas Anak",
    caption:
      "Supporting Komnas Anak ",
  },
  {
    src: "/images/kerjasamaygterjalin/komnasham.png",
    alt: "Logo of Komnas HAM",
    caption:
      "Partnership with Komnas HAM",
  },
  {
    src: "/images/kerjasamaygterjalin/majt.png",
    alt: "Logo of MAJT",
    caption: "Cooperation with MAJT",
  },
  {
    src: "/images/kerjasamaygterjalin/perhimpunandokter.png",
    alt: "Logo of Perhimpunan Dokter (Medical Association)",
    caption: "Collaboration with Medical Professionals Association.",
  },
  {
    src: "/images/kerjasamaygterjalin/uin.png",
    alt: "Logo of UIN (State Islamic University)",
    caption: "Partnership with UIN (State Islamic University).",
  },
  {
    src: "/images/kerjasamaygterjalin/ypkpi_mrb.png",
    alt: "Logo of YPKPI-MRB",
    caption: "Collaboration with YPKPI-MRB.",
  },
];

export const KerjasamaSection = () => {
  return (
    <div className="section nobottommargin" style={{ paddingTop: 0 }}>
      <div className="container clear-bottommargin clearfix">
        <div className="row topmargin-sm clearfix">
          <div className="heading-block center">
            <h2>Kerjasama yang Terjalin dengan TVKU</h2>
          </div>
        </div>
        <div className="row">
          <div className="kerjasamaterjalin">
            {images.map((img, i) => (
              <a href="" key={i}>
                <div>
                  <Image
                    width={400}
                    height={200}
                    className="kerjasamaterjalin-item-img"
                    src={img.src}
                    alt={img.alt}
                  />
                  <div className="kerjasamaterjalin-item-caption">
                    {img.caption}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
