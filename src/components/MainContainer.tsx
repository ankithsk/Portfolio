import { lazy, PropsWithChildren, Suspense, useEffect, useState } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";
import { initEngagementSense } from "../hooks/useEngagementSense";
import gsap from "gsap";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );

  useEffect(() => {
    const resizeHandler = () => {
      setSplitText();
      setIsDesktopView(window.innerWidth > 1024);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isDesktopView]);

  // 4D: Engagement-based easter eggs
  useEffect(() => {
    const engagement = initEngagementSense([
      {
        // Linger on landing → hidden message fades in
        selector: ".landing-section",
        threshold: 15,
        onTrigger: () => {
          const msg = document.querySelector(".easter-egg-msg");
          if (msg) {
            gsap.fromTo(
              msg,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
            );
          }
        },
      },
      {
        // Linger on career → dots do a chain pulse
        selector: ".career-section",
        threshold: 12,
        onTrigger: () => {
          const dots = document.querySelectorAll(".career-dot");
          dots.forEach((dot, i) => {
            gsap.to(dot, {
              scale: 2.5,
              duration: 0.3,
              delay: i * 0.15,
              yoyo: true,
              repeat: 3,
              ease: "power2.inOut",
            });
          });
          // Pulse the info boxes too
          const boxes = document.querySelectorAll(".career-info-box");
          boxes.forEach((box, i) => {
            gsap.to(box, {
              borderColor: "#a855f7",
              boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
              duration: 0.5,
              delay: i * 0.2,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
            });
          });
        },
      },
      {
        // Linger on tech stack → spheres go wild (dispatched via custom event)
        selector: ".techstack",
        threshold: 10,
        onTrigger: () => {
          window.dispatchEvent(new CustomEvent("techstack-easter-egg"));
        },
      },
    ]);

    return () => engagement.destroy();
  }, []);

  return (
    <div className="container-main">
      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div>Loading....</div>}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
