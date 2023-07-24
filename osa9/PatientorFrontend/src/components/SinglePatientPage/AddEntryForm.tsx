import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core';
import { EntryType, HealthCheckRating, Diagnosis } from '../../types';
import apiService from '../../services/patients';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddEntryForm: React.FC<{ patientId: string }> = ({ patientId }) => {

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
    } catch (e) {
      console.error(e);
      alert('Failed to add entry');
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
        <Form>
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
          <Field
            as={TextField}
            name="description"
            label="Description"
            onChange={handleChange}
          />
          <Field
            as={TextField}
            type="date"
            name="date"
            label="Date"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Field
            as={TextField}
            name="specialist"
            label="Specialist"
          />
          <FormControl className={classes.formControl}>
            <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
            <Field
              as={Select}
              labelId="diagnosis-codes-label"
              id="diagnosis-codes-select"
              name="diagnosisCodes"
              multiple
            >
              {diagnosisCodes.map((code) => (
                <MenuItem key={code} value={code}>
                  {code}
                </MenuItem>
              ))}
            </Field>
          </FormControl>
          {values.type === "HealthCheck" && (
            <Field
              as={TextField}
              type="number"
              name="healthCheckRating"
              label="Health Check Rating"
              inputProps={{
                step: 1,
                min: 0,
                max: 3,
              }}
            />
          )}
          {values.type === "OccupationalHealthcare" && (
            <>
              <Field
                as={TextField}
                name="employerName"
                label="Employer Name"
              />
              <Field
                as={TextField}
                type="date"
                name="sickLeave.startDate"
                label="Sick Leave Start Date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                as={TextField}
                type="date"
                name="sickLeave.endDate"
                label="Sick Leave End Date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}
          {values.type === "Hospital" && (
            <>
              <Field
                as={TextField}
                type="date"
                name="discharge.date"
                label="Discharge Date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Field
                as={TextField}
                name="discharge.criteria"
                label="Discharge Criteria"
              />
            </>
          )}
          <Button type='submit' variant="contained" color="primary">
            Add
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
