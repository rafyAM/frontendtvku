import React from 'react'
import Image from 'next/image'

const SocialMedia = () => {
  return (
<div className="widget clearfix">
  <h4 className="mb-2 ls1 text-uppercase fw-bold">
    Ikuti Sosial Media Kami
    </h4>
  <div className="line line-xs line-market"></div>
  <div className="row center mt-4 clearfix">
    <div className="col-3">
      <a href="https://facebook.com/" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-facebook">
        <i className="icon-facebook"></i>
        <i className="icon-facebook"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="1000" data-to="58742" data-refresh-interval="100" data-speed="3000"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Likes</small>
    </div>
    <div className="col-3">
      <a href="https://twitter.com/" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-twitter">
        <i className="icon-twitter"></i>
        <i className="icon-twitter"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="500" data-to="9654" data-refresh-interval="50" data-speed="2500"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Followers</small>
    </div>
    <div className="col-3">
      <a href="https://instagram.com/" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-instagram">
        <i className="icon-instagram"></i>
        <i className="icon-instagram"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="200" data-to="15475" data-refresh-interval="150" data-speed="3500"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Followers</small>
    </div>
    <div className="col-3">
      <a href="https://themeforest.net/item/canvas-the-multipurpose-html5-template/9228123" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-rss">
        <i className="icon-rss"></i>
        <i className="icon-rss"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="400" data-to="3244" data-refresh-interval="150" data-speed="3100"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Subscriber</small>
    </div>
    <div className="col-3 mt-3">
      <a href="https://themeforest.net/item/canvas-the-multipurpose-html5-template/9228123" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-pinterest">
        <i className="icon-pinterest"></i>
        <i className="icon-pinterest"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="400" data-to="2322" data-refresh-interval="150" data-speed="3100"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Followers</small>
    </div>
    <div className="col-3 mt-3">
      <a href="https://www.youtube.com/semicolonweb" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-youtube">
        <i className="icon-youtube"></i>
        <i className="icon-youtube"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="400" data-to="4211" data-refresh-interval="150" data-speed="3100"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Subscriber</small>
    </div>
    <div className="col-3 mt-3">
      <a href="https://themeforest.net/user/semiColonWeb/follow" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-spotify">
        <i>
            <Image src="canvas_theme/demos/news/images/envato.svg" width="20" height="20" alt="Image"/>

            </i>
        <i>
            <Image src="canvas_theme/demos/news/images/envato.svg" width="20" height="20" alt="Image"/>

            </i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="400" data-to="6742" data-refresh-interval="150" data-speed="3100"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Followers</small>
    </div>
    <div className="col-3 mt-3">
      <a href="https://www.youtube.com/semicolonweb" target="_blank"
        className="social-icon si-dark float-none m-auto si-colored si-vimeo">
        <i className="icon-vimeo"></i>
        <i className="icon-vimeo"></i>
      </a>
      <div className="counter mt-2 counter-inherit">
        <span className="fw-semibold" data-from="400" data-to="8532" data-refresh-interval="150" data-speed="3100"
          data-comma="true"></span>
      </div>
      <small className="text-muted font-secondary">Followers</small>
    </div>
  </div>
</div>  )
}

export default SocialMedia