import React from "react";
import axios from "axios";
import SliderSection from "../components/beranda/SliderSection";
import { BeritaTerbaruSection } from "../components/beranda/BeritaTerbaruSection";
import { jadwalAcara } from "../types";
import { OurProgramSection } from "../components/beranda/OurProgramSection";
import { KerjasamaSection } from "../components/beranda/KerjasamaSection";
import { WhoWeAre } from "../components/beranda/WhoWeAre";
import { ExpertiseSection } from "../components/beranda/ExpertiseSection";


export default async function Home() {
  const { data: slider } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/home/slider`
  );
  const { data: beritaTerbaru } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/berita?per_page=6`
  );
  const { data: jadwalTayang } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/jadwal-acara`
  );
  const { data: ourProgram } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/our-programs`
  );
  const { data: whoweare } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/home/who-we-are`
  );
  const { data: ourExpertise1 } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/home/our-expertise1`
  );
  const { data: ourExpertise2 } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/home/our-expertise2`
  );

  console.log("Slider Data:", slider);
  console.log("Berita Terbaru Data:", beritaTerbaru);
  console.log("jadwal terbaru", jadwalTayang);
  console.log("our program", ourProgram);
  console.log("Who We Are Data:", whoweare);
  console.log("Our Expertise 1 Data:", ourExpertise1);
  console.log("Our Expertise 2 Data:", ourExpertise2);

  const expertiseData = {
    expertise1: ourExpertise1?.data || [],
    expertise2_1:
      ourExpertise2?.data?.slice(0, Math.ceil(ourExpertise2.data.length / 2)) ||
      [],
    expertise2_2:
      ourExpertise2?.data?.slice(Math.ceil(ourExpertise2.data.length / 2)) ||
      [],
  };

  const now = new Date();
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const hari = days[now.getDay()];
  const tanggal = `${now.getDate()} ${
    months[now.getMonth()]
  } ${now.getFullYear()}`;

  const jam = now.getHours() + now.getMinutes() / 60;

  let onair = null;
  if (jadwalTayang?.data) {
    const currentProgram = jadwalTayang.data.find((program: jadwalAcara) => {
      const jamAwal = parseFloat(program.jam_awal);
      const jamAkhir = parseFloat(program.jam_akhir);
      console.log(
        `Program ${
          program.acara
        }: ${jamAwal} - ${jamAkhir}, current time: ${jam}, match: ${
          jam >= jamAwal && jam <= jamAkhir
        }`
      );

      return jam >= jamAwal && jam <= jamAkhir;
    });

    if (currentProgram) {
      onair = { acara: currentProgram.acara };
    }
  }

  return (
    <div>
      <SliderSection carousels={slider.data} />

      {/* Content Section */}
      <section id="content">
        <div className="content-wrap">
          <BeritaTerbaruSection
            Berita={beritaTerbaru?.data}
            jadwalAcara={jadwalTayang?.data}
            hari={hari}
            tanggal={tanggal}
            jam={jam}
            onair={onair}
          />

          {/* Our Program */}
          <OurProgramSection list_program={ourProgram?.data} />

          {/* Kerjasama */}
          <KerjasamaSection />

          {/* Who We Are */}
          {whoweare?.data && whoweare.data.length > 0 && (
            <WhoWeAre data={whoweare.data[0]} />
          )}

          {/* Expertise */}
          <ExpertiseSection data={expertiseData} />
          {/* <div className="container clearfix mb-5">
            <div className="heading-block topmargin-lg center">
              <h2>Here Are Some of Our Expertise</h2>
            </div>
            <div className="row">
              <div className="col-lg-6 col-12">
                {ourexpertise1.map((data, idx) => (
                  <div className="grid-inner row g-0" key={idx}>
                    <div className="col-md-4">
                      <div className="entry-image">
                        <a
                          href={
                            base_url() + "assets/canvas/images/blog/full/17.jpg"
                          }
                          data-lightbox="image"
                        >
                          <img
                            src={PATH_DIR + "ourexpertise/" + data.thumbnail}
                            alt="Standard Post with Image"
                          />
                        </a>
                      </div>
                    </div>
                    <div className="col-md-8 ps-md-4">
                      <div className="entry-title title-sm">
                        <h3>{data.judul}</h3>
                      </div>
                      <div className="entry-content entry-content-home">
                        <p>{data.deskripsi}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-lg-3 col-12">
                {ourexpertise2_1.map((data, idx) => (
                  <div
                    id="portfolio"
                    className="portfolio row g-0 portfolio-reveal grid-container portfolio-home"
                    key={idx}
                  >
                    <article className="portfolio-item pf-media pf-icons">
                      <div className="grid-inner">
                        <div className="portfolio-image">
                          <a href="portfolio-single.html">
                            <img
                              src={PATH_DIR + "ourexpertise/" + data.thumbnail}
                              alt="Open Imagination"
                            />
                          </a>
                        </div>
                        <div className="portfolio-desc">
                          <h3>
                            <a href="portfolio-single.html">{data.judul}</a>
                          </h3>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
              <div className="col-lg-3 col-12 move-to-bottom">
                {ourexpertise2_2.map((data, idx) => (
                  <div
                    id="portfolio"
                    className="portfolio row g-0 portfolio-reveal grid-container portfolio-home"
                    key={idx}
                  >
                    <article className="portfolio-item pf-media pf-icons">
                      <div className="grid-inner">
                        <div className="portfolio-image">
                          <a href="portfolio-single.html">
                            <img
                              src={PATH_DIR + "ourexpertise/" + data.thumbnail}
                              alt="Open Imagination"
                            />
                          </a>
                        </div>
                        <div className="portfolio-desc">
                          <h3>
                            <a href="portfolio-single.html">{data.judul}</a>
                          </h3>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
