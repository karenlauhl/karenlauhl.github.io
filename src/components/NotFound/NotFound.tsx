import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img 
        src="https://external-preview.redd.it/4MddL-315mp40uH18BgGL2-5b6NIPHcDMBSWuN11ynM.jpg?width=960&crop=smart&auto=webp&s=b98d54a43b3dac555df398588a2c791e0f3076d9" 
        alt="404 Background" 
        className="not-found-bg"
      />
      <div className="not-found-overlay"></div>
      <div className="not-found-content">
        <div className="not-found-text">
          <h1 className="not-found-title">You are all alone here</h1>
          <p className="not-found-code">404</p>
          <a href="/" className="not-found-button">Go Home</a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
