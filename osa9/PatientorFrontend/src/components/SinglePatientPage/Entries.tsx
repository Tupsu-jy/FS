import { Paper } from '@mui/material';
import React from 'react';
import { Entry, EntryWithFullDiagnoses, HealthCheckRating, Diagnosis } from '../../types';
import { 
  HealthCheckEntry as HealthCheckEntryType, 
  OccupationalHealthcareEntry as OccupationalHealthcareEntryType, 
  HospitalEntry as HospitalEntryType 
} from '../../types';

interface CommonEntryProps {
  entry: EntryWithFullDiagnoses;
}

interface DiagnosisProps {
  diagnoses?: Diagnosis[];
}

const CommonEntryDetails: React.FC<CommonEntryProps> = ({ entry }) => (
  <div>
    <h3>{entry.date} <span style={{color: 'black'}}>{entry.type}</span></h3>
    <p>{entry.description}</p>
    <p>Specialist: {entry.specialist}</p>
    <DiagnosisDetails diagnoses={entry.diagnoses} />
  </div>
);

const DiagnosisDetails: React.FC<DiagnosisProps> = ({ diagnoses }) => (
  <div>
    {diagnoses?.map((diagnosis, i) => 
      <p key={i}>
        Diagnosis: {diagnosis.code} - {diagnosis.name} 
        {diagnosis.latin && ` (${diagnosis.latin})`}
      </p>
    )}
  </div>
);

const HealthCheckEntry: React.FC<{entry: HealthCheckEntryType}> = ({ entry }) => (
  <div>
    <CommonEntryDetails entry={entry} />
    <p>Health Check Rating: {HealthCheckRating[entry.healthCheckRating]}</p>
  </div>
);

const OccupationalHealthcareEntry: React.FC<{entry: OccupationalHealthcareEntryType}> = ({ entry }) => (
  <div>
    <CommonEntryDetails entry={entry} />
    <p>Employer Name: {entry.employerName}</p>
    {entry.sickLeave && <p>Sick Leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p>}
  </div>
);

const HospitalEntry: React.FC<{entry: HospitalEntryType}> = ({ entry }) => (
  <div>
    <CommonEntryDetails entry={entry} />
    <p>Discharge: {entry.discharge.date}, {entry.discharge.criteria}</p>
  </div>
);

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  switch(entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntry entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;
    case 'Hospital':
      return <HospitalEntry entry={entry} />;
    default:
      return null;
  }
};

const Entries: React.FC<{entries: Entry[]}> = ({ entries }) => (
  <div>
    {entries.map((entry, index) => 
      <Paper style={{ marginBottom: '1em', padding: '1em' }} key={index}>
        <EntryDetails entry={entry} />
      </Paper>
    )}
  </div>
);

export default Entries;
