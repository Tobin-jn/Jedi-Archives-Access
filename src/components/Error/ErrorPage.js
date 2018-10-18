import React from 'react';

import './ErrorPage.css';

const ErrorPage = ({ errorState }) => {
  return(
    <div className={`error-page ${errorState}`}>
      <h1 className="error">Connection lost...</h1>
    </div>
  )
}

export default ErrorPage