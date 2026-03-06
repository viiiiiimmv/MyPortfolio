import "../assets/css/HomeLoader.css";

const HomeLoader = () => {
  return (
    <div className="home-loader-root">
      <div className="home-loader-shell" role="status" aria-live="polite">
        <div className="home-loader-visual" aria-hidden="true">
          <span className="home-shape home-square home-large" />
          <span className="home-shape home-square home-medium" />
          <span className="home-shape home-diamond" />
          <span className="home-shape home-dot home-dot-1" />
          <span className="home-shape home-dot home-dot-2" />
          <span className="home-shape home-dot home-dot-3" />
          <span className="home-shape home-dot home-dot-4" />
        </div>

        <div className="home-loader-copy">
          <p className="home-loader-title">LOADING</p>
          <div className="home-loader-track" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoader;
