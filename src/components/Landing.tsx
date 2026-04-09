import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              ANKITH
              <br />
              <span>KATAGERI</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>Frontend &</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">Full Stack</div>
              <div className="landing-h2-2">Engineer</div>
            </h2>
            <h2>
              <div className="landing-h2-info">Engineer</div>
              <div className="landing-h2-info-1">Full Stack</div>
            </h2>
          </div>
        </div>
        {children}
        <div
          className="easter-egg-msg"
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0,
            color: "rgba(168, 85, 247, 0.6)",
            fontSize: "0.85rem",
            letterSpacing: "0.2em",
            fontFamily: "inherit",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          you're still here? scroll down — there's more to discover.
        </div>
      </div>
    </>
  );
};

export default Landing;
