import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { PatientWithFullDiagnoses } from '../../types';
import Entries from './Entries';
import AddEntryForm from './AddEntryForm';

const SinglePatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<PatientWithFullDiagnoses | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        try {
          const fetchedPatient = await patientService.get(id);
          setPatient(fetchedPatient);
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <p>Gender: {patient.gender}</p>
      <p>Ssn: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <p>Date of Birth: {patient.dateOfBirth}</p>
      <AddEntryForm patientId={patient.id} />
      <h3>Entries</h3>
      <Entries entries={patient.entries} />
    </div>
  );
};

export default SinglePatientPage;
