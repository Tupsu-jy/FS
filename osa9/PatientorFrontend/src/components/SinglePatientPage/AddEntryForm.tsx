import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, makeStyles, Paper } from '@material-ui/core';
import { EntryType, HealthCheckRating } from '../../types';
import apiService from '../../services/patients';
import { Alert, Grid } from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: '1em',
    marginBottom: '1em',
    border: '1px solid black'
  }
}));

const AddEntryForm: React.FC<{ patientId: string }> = ({ patientId }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [diagnosisCodes, setDiagnosisCodes] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesFromApi = await apiService.getAllDiagnoses();
      const diagnosisCodesFromApi = diagnosesFromApi.map(diagnosis => diagnosis.code);
      setDiagnosisCodes(diagnosisCodesFromApi);
    };

    fetchDiagnoses();
  }, []);

  const onSubmit = async (values: any) => {
    try {
      await apiService.addEntry(patientId, values);
      alert('Entry added successfully');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
          setTimeout(() => setError(undefined), 5000); // this line clears the error message after 5 seconds
        } else {
          setError("Unrecognized axios error");
          setTimeout(() => setError(undefined), 5000); // this line clears the error message after 5 seconds
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        setTimeout(() => setError(undefined), 5000); // this line clears the error message after 5 seconds
      }
    }
  };

  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        type: EntryType.HealthCheck,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: ''
        },
        discharge: {
          date: '',
          criteria: ''
        }
      }}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Paper style={{ padding: '1em', marginBottom: '1em' }}>
          <Form>
            {error && <Alert severity="error">{error}</Alert>}
<Grid container spacing={2}>
  <Grid item xs={12} sm={6}>
    <FormControl className={classes.formControl}>
      <InputLabel id="entry-type-label">Entry Type</InputLabel>
      <Field
        as={Select}
        labelId="entry-type-label"
        id="entry-type-select"
        name="type"
      >
        <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
        <MenuItem value={"OccupationalHealthcare"}>Occupational Healthcare</MenuItem>
        <MenuItem value={"Hospital"}>Hospital</MenuItem>
      </Field>
    </FormControl>
  </Grid>
  <Grid item xs={12} sm={6}>
    <Field
      as={TextField}
      name="description"
      label="Description"
      fullWidth
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <Field
      as={TextField}
      name="date"
      label="Date"
      fullWidth
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <Field
      as={TextField}
      name="specialist"
      label="Specialist"
      fullWidth
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <Field
      as={TextField}
      name="diagnosisCodes"
      label="Diagnosis Codes"
      fullWidth
      onChange={handleChange}
    />
  </Grid>
  <Grid item xs={12} sm={6}>
    <Field
      as={TextField}
      name="healthCheckRating"
      label="Health Check Rating"
      fullWidth
      onChange={handleChange}
    />
  </Grid>
</Grid>
            <Button type='submit' variant="contained" color="primary" style={{ marginTop: '1em' }}>
              Add
            </Button>
          </Form>
        </Paper>
      )}
    </Formik>
  );
};

export default AddEntryForm;
