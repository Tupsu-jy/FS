import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
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

  const getGenderSymbol = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return '♂';
      case 'female':
        return '♀';
      default:
        return '';
    }
  };

  return (
    <Paper style={{ padding: '1em' }}>
      <Typography variant="h4">{patient.name} {getGenderSymbol(patient.gender)}</Typography>
      <Typography>Ssn: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of Birth: {patient.dateOfBirth}</Typography>
      <AddEntryForm patientId={patient.id} />
      <Typography variant="h5">Entries</Typography>
      <Entries entries={patient.entries} />
    </Paper>
  );
};

export default SinglePatientPage;
