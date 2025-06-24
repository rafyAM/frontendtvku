import React from "react";
import { OurProgram } from "../../types";
import Image from "next/image";

type OurProgramSectionProps = {
  list_program: OurProgram[];
};

export const OurProgramSection: React.FC<OurProgramSectionProps> = ({
  list_program,
}) => {
  return (
    <div
      className="container-fluid clearfix"
      style={{
        marginTop: 80,
        backgroundColor: "#f1f2f3",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <div className="heading-block center">
        <h2>Our Programs</h2>
      </div>
      <div className="container">
        <div className="row">
          <div className="our-program-beranda-slick">
            {list_program.map((item) => (
              <a href="" key={item.id}>
                <div
                  style={{
                    backgroundImage: `url('${item.thumbnail}')`,
                  }}
                >
                  <Image
                    style={{ visibility: "hidden" }}
                    src={item.thumbnail}
                    alt={item.judul}
                    width={100}
                    height={100}
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="myslick-divider"></div>
      </div>
      <div className="container my-3 mt-0">
        <div className="col-md-12 text-center">
          <a
            href=""
            className="button button-border button-dark button-rounded button-large ms-0 topmargin-sm"
          >
            More Programs
          </a>
        </div>
      </div>
    </div>
  );
};
