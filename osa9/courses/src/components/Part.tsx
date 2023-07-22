import React from 'react';
import { CoursePart } from '../courses';

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h4>{part.name} ({part.exerciseCount})</h4>
          <p>{part.description}</p>
        </div>
      );

    case "group":
      return (
        <div>
          <h4>{part.name} ({part.exerciseCount})</h4>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );

    case "background":
      return (
        <div>
          <h4>{part.name} ({part.exerciseCount})</h4>
          <p>{part.description}</p>
          <p>Background material: <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a></p>
        </div>
      );

    case "special":
      return (
        <div>
          <h4>{part.name} ({part.exerciseCount})</h4>
          <p>{part.description}</p>
          <p>Requirements: {part.requirements.join(', ')}</p>
        </div>
      );

    default:
      return assertNever(part);
  }
};

function assertNever(value: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

export default Part;
