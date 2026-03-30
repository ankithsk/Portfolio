import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Rising Pharma Holdings Inc</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Design, develop, and deploy software applications, APIs, and
              system integrations. Build AI/ML models, LLM-powered tools,
              automation scripts, and data pipelines for pharmaceutical
              business intelligence and operational decision-making.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Intern Software Engineer</h4>
                <h5>IQUBE Technologies Inc</h5>
              </div>
              <h3>2025–26</h3>
            </div>
            <p>
              Built reusable React + TypeScript UI components. Integrated
              UI with backend services using REST and GraphQL. Worked in
              Agile sprints with code reviews and documented API behaviors.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Teaching Assistant</h4>
                <h5>Saint Louis University</h5>
              </div>
              <h3>2024–25</h3>
            </div>
            <p>
              Assisted students with debugging and core software concepts.
              Graded assignments and provided feedback to improve
              correctness and code readability.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Wireless Systems Engineer</h4>
                <h5>Velmenni · ERNET India</h5>
              </div>
              <h3>2021–22</h3>
            </div>
            <p>
              Supported reliability testing and integration for Li-Fi/Wi-Fi
              systems at Velmenni. Executed network testing using iPerf and
              Linux-based workflows at ERNET India (Ministry of Electronics & IT).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
