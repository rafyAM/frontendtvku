import React from "react";
import SocialMedia from "./socialMedia";

const SideBar = () => {
  return (
    <div className="col-lg-4 sticky-sidebar-wrap mt-5 mt-lg-0">
      <div className="sticky-sidebar">
        <SocialMedia />
        <div className="widget clearfix">
          <div className="card">
            <div className="card-body">
              <form className="form-signin">
                <div className="text-center">
                  <i
                    className="icon-line-mail text-muted mb-3"
                    style={{ fontSize: "48px", lineHeight: 1 }}
                  ></i>
                  <h3 className="h3 mb-3 fw-normal font-primary">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="font-secondary mb-2">
                    Lorem ipsum dolor sit adipisicing elit.
                  </p>
                </div>

                <div className="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    required
                  />
                  <label htmlFor="inputEmail">Email address</label>
                </div>
                <button
                  className="btn btn-lg bg-color text-white w-100 text-uppercase ls1"
                  type="submit"
                >
                  Sign in
                </button>
                <div className="text-center">
                  <small className="mt-5 text-muted fst-italic">
                    We also Hate Spam
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
