import React from 'react';

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  parts: CoursePart[];
}

const Total: React.FC<TotalProps> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;
