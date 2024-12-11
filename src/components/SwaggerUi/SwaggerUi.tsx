import React from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const APIDocumentation = () => {
  return <SwaggerUI url="http://localhost:5003/swagger.json" />;
};

export default APIDocumentation;
