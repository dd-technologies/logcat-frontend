import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Style from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";


export default function NotFound() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("ddAdminToken")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <section className={Style.page_404}>
        <div className={Style.container}>
          <div className={Style.four_zero_four_bg}>
            <h1 className="text-center">404</h1>
          </div>

          <div className={Style.contant_box_404}>
            <h3 className={Style.h2}>Look like you're lost</h3>

            <p>the page you are looking for not avaible!</p>

            <Link to="/">
              <Button className="mt-2">Go to Home</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
