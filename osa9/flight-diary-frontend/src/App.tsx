import React, { useState, useEffect } from 'react';
import { getNonSensitiveEntries } from './services/apiService';
import { NonSensitiveDiaryEntry } from './types';
import Entry from './components/Entry';
import AddEntry from './components/AddEntry';

const App: React.FC = () => {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await getNonSensitiveEntries();
        setDiaryEntries(entries.data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    fetchEntries();
  }, []);

  return (
    <div>
      <h1>New diary</h1>
      <AddEntry />
      <h1>Diary entries</h1>
      {diaryEntries.map((entry, i) => (
        <Entry key={i} entry={entry} />
      ))}
    </div>
  );
};

export default App;
