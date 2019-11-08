import React from "react";

const Footer = () => {
  return (
    <footer className="mini-footer mt-5 p-2 bg-dark mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="copyright-text">
              <p>
                ©{new Date().getFullYear()}
                <a href="https://www.facebook.com/henimnechi"> Dev Social</a>. All rights reserved. Created by
                <a href="https://github.com/HeniNechi"> Heni Nechi</a>
              </p>
            </div>

            <div className="go_top">
              <span className="icon-arrow-up"></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
