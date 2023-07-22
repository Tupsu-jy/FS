import React from 'react';
import { CoursePart } from '../courses';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({ courseParts }) => (
  <div>
    {courseParts.map((part, i) => (
      <Part key={i} part={part} />
    ))}
  </div>
);

export default Content;
