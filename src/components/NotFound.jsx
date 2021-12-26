import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Style from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <>
      <section className={Style.page_404}>
        <div className={Style.container}>
          <div className={Style.row}>
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className={Style.four_zero_four_bg}>
                  <h1 className="text-center">404</h1>
                </div>

                <div className={Style.contant_box_404}>
                  <h3 className={Style.h2}>Look like you're lost</h3>

                  <p>the page you are looking for not avaible!</p>

                  <Link to="/">
                    <Button>Go to Home</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
