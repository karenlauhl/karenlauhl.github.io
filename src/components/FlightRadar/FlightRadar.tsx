import './FlightRadar.css';

const FlightRadar = () => {
  return (
    <section id="flights" className="flights">
      <div className="container">
        <h2>Flight Tracking</h2>
        <p>Follow my flights and travel adventures</p>
        <div className="flight-radar-container">
          <iframe
            title="Flightradar24 Flight Tracker - Karen6099"
            src="https://my.flightradar24.com/Karen6099"
            width="100%"
            height="600"
            frameBorder="0"
            allow="autoplay; fullscreen"
            style={{
              borderRadius: '20px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
            }}>
          </iframe>
          <p className="radar-link">
            <a
              href="https://my.flightradar24.com/Karen6099"
              target="_blank"
              rel="noopener noreferrer">
              View on Flightradar24 →
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlightRadar;
