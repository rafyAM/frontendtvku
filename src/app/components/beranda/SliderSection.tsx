import React from "react";

type Carousel = {
    judul: string;
    sub_judul: string;
    gambar: string;
};

type SliderSectionProps = {
    carousels: Carousel[];
};

const SliderSection: React.FC<SliderSectionProps> = ({ carousels }) => (
    <section
        id="slider"
        className="slider-element slider-parallax swiper_wrapper min-vh-60 min-vh-md-100 include-header"
        data-autoplay="3000"
        data-speed="650"
        data-loop="true"
    >
        <div className="slider-inner">
            <div className="swiper-container swiper-parent">
                <div className="swiper-wrapper">
                    {carousels.map((data, idx) => (
                        <div className="swiper-slide dark" key={idx}>
                            <div className="container">
                                <div className="slider-caption slider-caption-center">
                                    <h2 data-animate="fadeInUp">{data.judul ? data.judul : ""}</h2>
                                    <p className="d-none d-sm-block" data-animate="fadeInUp" data-delay="200">
                                        {data.sub_judul ? data.sub_judul : ""}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="swiper-slide-bg"
                                style={{
                                    backgroundImage: `url('${data.gambar}')`,
                                }}
                            ></div>
                        </div>
                    ))}
                </div>
                <div className="slider-arrow-left">
                    <i className="icon-angle-left"></i>
                </div>
                <div className="slider-arrow-right">
                    <i className="icon-angle-right"></i>
                </div>
            </div>
            <a
                href="#"
                data-scrollto="#content"
                data-offset="100"
                className="one-page-arrow dark"
            >
                <i className="icon-angle-down infinite animated fadeInDown"></i>
            </a>
        </div>
    </section>
);

export default SliderSection;