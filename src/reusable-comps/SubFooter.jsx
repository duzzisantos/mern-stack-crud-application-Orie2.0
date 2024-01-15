import React from "react";

const Subfooter = () => {
  return (
    <div className="bg-dark text-light text-decoration-none py-4">
      <div className="row">
        <div className="col-md-4">
          <small className="fw-bold">Business Address</small>
          <br />
          <small>123 Azikiwe Road</small>
          <br />
          <small>Aba, Abia State.</small>
          <br />
          <small>Nigeria</small>
        </div>

        <div className="col-md-4">
          <ul className="list-unstyled">
            <li>
              <a
                href="https://www.msn.com"
                className="text-white text-decoration-none"
              >
                Legal Information
              </a>
            </li>
            <li>
              <a
                href="https://www.msn.com"
                className="text-white text-decoration-none"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.msn.com"
                className="text-white text-decoration-none"
              >
                Usage Policies
              </a>
            </li>
            <li>
              <a
                href="https://www.msn.com"
                className="text-white text-decoration-none"
              >
                Verified Users
              </a>
            </li>
          </ul>
        </div>

        <div className="col-md-4">
          <ul className="list-unstyled">
            <li>
              <a
                href="https://www.msn.com"
                className="text-white text-decoration-none"
              >
                News
              </a>
            </li>
            <li>
              <a
                href="https://www.msn.com"
                className="text-white text-decoration-none"
              >
                Cookies
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subfooter;
