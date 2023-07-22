import React, { useState } from 'react';
import { NewDiaryEntry, Weather, Visibility } from '../types';
import { addEntry } from '../services/apiService';

const AddEntry: React.FC = () => {
  const [newEntry, setNewEntry] = useState<Partial<NewDiaryEntry>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // New state variable for error message

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEntry.date && newEntry.weather && newEntry.visibility && newEntry.comment) {
      try {
        const addedEntry = await addEntry(newEntry as NewDiaryEntry);
        console.log('Entry added successfully:', addedEntry);
        setErrorMessage(null);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          setErrorMessage(error.message);
        }
      }
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a new diary entry</h2>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <label>Date:</label>
      <input type="date" name="date" onChange={handleInputChange} />

      <label>Weather:</label>
      {Object.values(Weather).map((weather) => (
        <label key={weather}>
          <input
            type="radio"
            name="weather"
            value={weather}
            onChange={handleInputChange}
          />
          {weather}
        </label>
      ))}

      <label>Visibility:</label>
      {Object.values(Visibility).map((visibility) => (
        <label key={visibility}>
          <input
            type="radio"
            name="visibility"
            value={visibility}
            onChange={handleInputChange}
          />
          {visibility}
        </label>
      ))}

      <label>Comment:</label>
      <input type="text" name="comment" onChange={handleInputChange} />

      <button type="submit">Add Entry</button>
    </form>
  );
};

export default AddEntry;
