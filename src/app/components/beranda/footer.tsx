import React from "react";

const Footer = () => (
    <footer id="footer" className="dark">
        <div id="copyrights">
            <div className="container">
                <div className="row justify-content-between col-mb-30">
                    <div className="col-12 col-lg-auto text-center text-lg-start order-last order-lg-first">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img src="/beranda_assets/images/udinus.PNG" alt="UDINUS" className="mb-4" /><br />
                                </div>
                                <div className="col-lg-6">
                                    <img src="/beranda_assets/images/jatengnews.png" alt="Jateng News" className="mb-4" /><br />
                                </div>
                            </div>
                        </div>
                        Copyrights &copy; 2022 All Rights Reserved by TVKU
                    </div>
                    <div className="col-12 col-lg-auto text-center text-lg-end">
                        <a href="#" className="social-icon inline-block si-small si-borderless mb-0 si-facebook">
                            <i className="icon-facebook"></i>
                            <i className="icon-facebook"></i>
                        </a>
                        <a href="#" className="social-icon inline-block si-small si-borderless mb-0 si-instagram">
                            <i className="icon-instagram"></i>
                            <i className="icon-instagram"></i>
                        </a>
                        <a href="#" className="social-icon inline-block si-small si-borderless mb-0 si-youtube">
                            <i className="icon-youtube"></i>
                            <i className="icon-youtube"></i>
                        </a>
                        {/* Add more social icons as needed */}
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;