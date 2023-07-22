import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import parts from './courses';

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = parts;

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
