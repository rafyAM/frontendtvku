import Image from "next/image";
import Link from "next/link";
import React from "react";
import TvkuBlue from "../../../../public/beranda_assets/images/tvkublue2x.png";
import TvkuWhite from "../../../../public/beranda_assets/images/tvkuwhite2x.png";

export default function Navbar() {
  return (
    <header
      id="header"
      className="full-header transparent-header"
      data-sticky-class="not-dark"
    >
      <div id="header-wrap">
        <div className="container">
          <div className="header-row">
            <div id="logo">
              <Link
                href="/"
                className="standard-logo"
                data-dark-logo={TvkuWhite}
              >
                <Image
                  src={TvkuBlue}
                  alt="TVKU Logo"
                  width={125}
                  height={100}
                />
              </Link>
              <Link href="/" className="retina-logo" data-dark-logo={TvkuWhite}>
                <Image
                  src={TvkuBlue}
                  alt="TVKU Logo"
                  width={125}
                  height={100}
                />
              </Link>
            </div>

            <div id="primary-menu-trigger">
              <svg className="svg-trigger" viewBox="0 0 100 100">
                <path d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20"></path>
                <path d="m 30,50 h 40"></path>
                <path d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20"></path>
              </svg>
            </div>

            <nav className="primary-menu">
              <ul className="menu-container">
                <li className="menu-item">
                  <a className="menu-link" href="<?= base_url(); ?>">
                    <div>Home</div>
                  </a>
                </li>
                <li className="menu-item">
                  <Link className="menu-link" href="/berita">
                    <div>News</div>
                  </Link>
                </li>
                <li className="menu-item">
                  <a className="menu-link" href="<?= base_url('program'); ?>">
                    <div>Program</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a
                    className="menu-link"
                    href="<?= base_url('seputarudinus'); ?>"
                  >
                    <div>Seputar Udinus</div>
                  </a>
                </li>
                <li className="menu-item">
                  <a className="menu-link" href="<?= base_url('live'); ?>">
                    <div>Live Streaming</div>
                  </a>
                </li>

                <li className="menu-item">
                  <a className="menu-link" href="#">
                    {/* <div>Lainnya <div id="menu-lainnya"><i className="icon-angle-down"></i></div></div> */}
                    <div>
                      Lainnya
                      <i id="menu-lainnya" className="icon-angle-down"></i>
                    </div>
                  </a>
                  <ul className="sub-menu-container">
                    <li className="menu-item">
                      <a
                        className="menu-link"
                        href="<?= base_url('contact'); ?>"
                      >
                        <div>Contact</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a className="menu-link" href="<?= DMA; ?>">
                        <div>Digital Marketing</div>
                      </a>
                    </li>
                    <li className="menu-item">
                      <a className="menu-link" href="<?= MARKETING; ?>">
                        <div>Sales</div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div className="header-wrap-clone"></div>
    </header>
  );
}
