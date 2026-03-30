import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="mailto:ankith.s06@gmail.com"
                data-cursor="disable"
              >
                ankith.s06@gmail.com
              </a>
            </p>
            <p>
              <a
                href="https://www.linkedin.com/in/ankith-katageri-2a5698177"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — ankith-katageri
              </a>
            </p>
            <h4>Education</h4>
            <p>
              M.S. Computer Science — Saint Louis University, 2023–2024
            </p>
            <p>
              B.Tech ECE — Vellore Institute of Technology, 2018–2022
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/ankithsk"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/ankith-katageri-2a5698177"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Ankith Katageri</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
