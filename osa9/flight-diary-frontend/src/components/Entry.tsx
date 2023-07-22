import React from 'react';
import { NonSensitiveDiaryEntry } from '../types';

interface EntryProps {
  entry: NonSensitiveDiaryEntry;
}

const Entry: React.FC<EntryProps> = ({ entry }) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <p>Visibility: {entry.visibility}</p>
      <p>Weather: {entry.weather}</p>
    </div>
  );
};

export default Entry;
