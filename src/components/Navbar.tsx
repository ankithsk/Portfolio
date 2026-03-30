import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  useEffect(() => {
    try {
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.7,
        speed: 1.7,
        effects: true,
        autoResize: true,
        ignoreMobileResize: true,
      });

      smoother.scrollTop(0);
      smoother.paused(true); // stay paused until loading screen finishes (initialFX unpauses it)
    } catch (error) {
      console.warn("ScrollSmoother unavailable, falling back to native scroll.", error);
    }

    const links = document.querySelectorAll(".header ul a");
    const clickHandlers = Array.from(links).map((elem) => {
      const element = elem as HTMLAnchorElement;
      const handler = (e: Event) => {
        if (window.innerWidth <= 1024) {
          return;
        }

        const section = element.getAttribute("data-href");
        if (!section) {
          return;
        }

        e.preventDefault();
        const target = document.querySelector(section);
        if (!target) {
          return;
        }

        if (smoother) {
          smoother.scrollTo(section, true, "top top");
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };

      element.addEventListener("click", handler);
      return { element, handler };
    });

    const onResize = () => {
      if (smoother) {
        ScrollSmoother.refresh(true);
      } else {
        ScrollTrigger.refresh();
      }
    };

    window.addEventListener("resize", onResize);

    return () => {
      clickHandlers.forEach(({ element, handler }) => {
        element.removeEventListener("click", handler);
      });
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          AK
        </a>
        <a
          href="https://www.linkedin.com/in/ankith-katageri-2a5698177"
          className="navbar-connect"
          data-cursor="disable"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/ankith-katageri
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
