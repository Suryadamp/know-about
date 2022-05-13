------------------------------WizardStep.js------------------------------------------
import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { Form, Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Step from "@material-ui/core/Step";
import Stepper from "@material-ui/core/Stepper";
import StepLabel from "@material-ui/core/StepLabel";
import * as Yup from 'yup'
// const useStyles = makeStyles((theme) => ({
//   wizardDialogStepper: {
//     width: "90%"
//   },
//   wizardDialogContent: {
//     display: "flex",
//     flexFlow: "column nowrap",
//     alignItems: "center",
//     maxHeight: "70vh",
//     minHeight: "70vh"
//   },
//   // wizardDialogActions: {
//   //   "& .MuiButton-root": {
//   //     margin: theme.spacing(1)
//   //   }
//   // },
//   // wizardStepContent: {
//   //   display: "flex",
//   //   flexFlow: "row wrap",
//   //   alignItems: "center",
//   //   margin: "0.5em 0 0 0.5em",
//   //   width: "80%",
//   //   "& .MuiInputBase-root": {
//   //     borderRadius: 0
//   //   },
//   //   "& .MuiFormControl-root": {
//   //     margin: theme.spacing(1.5)
//   //   },
//   //   "& .MuiFormGroup-root": {
//   //     margin: theme.spacing(1.5)
//   //   },
//   //   "& .MuiTextField-root": {
//   //     margin: theme.spacing(1.5)
//   //   }
//   }
// }));

export const Wizard = ({ children, initialValues, onSubmit, ...props }) => {
  // const classes = useStyles();
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const stepCount = steps.length;
  const isFinalStep = stepNumber === stepCount - 1;

  const handleNext = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, stepCount - 1));
  };

  const handleBack = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleCancel = () => {
    props.onCancel();
  };

  const phoneRegExp =
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const validationSchema = Yup.object({
    forename: Yup.string().required('Required'),
    surname: Yup.string().required('Required'),
    // mobile: Yup.string()
    //         .matches(phoneRegExp, 'Invalid Phone number')
    //         .nullable(),
    mobile:Yup.number().required("required")
  })

  const handleSubmit = async (values, bag) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isFinalStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      handleNext(values);
    }
  };

  return (
    <Dialog open={props.open} disableBackdropClick fullWidth maxWidth="md">
      {props.title ? (
        <DialogTitle data-cy="wizardDialogTitle">{props.title}</DialogTitle>
      ) : null}
      <Formik
        initialValues={snapshot}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validate={step.props.validate}
      >
        {(formik) => (
          <Form>
            <DialogContent >
              <Stepper
              
                activeStep={stepNumber}
                alternativeLabel
              >
                {steps.map((step) => (
                  <Step key={step.props.name}>
                    <StepLabel>{step.props.name}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box
              
                
              >
                {step}
              </Box>
            </DialogContent>
            <DialogActions
            
              
            >
              <Button onClick={handleCancel} color="primary">
                Cancel
              </Button>
              <Button
                disabled={stepNumber <= 0}
                onClick={() => handleBack(formik.values)}
                color="primary"
              >
                Back
              </Button>
              <Button
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
              >
                {isFinalStep ? "Submit" : "Next"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

Wizard.propTypes = {
  children: PropTypes.array.isRequired,
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string
};

export const WizardStep = ({ children }) => children;





------------------------FormikTextFeild.js--------------------

import { useField } from "formik";
import TextField from "@material-ui/core/TextField";

function FormikTextField(props) {
  const [field, meta] = useField(props);

  return (
    <TextField
      id={field.name}
      name={field.name}
      label={field.label}
      helperText={meta.touched ? meta.error : ""}
      error={meta.touched && Boolean(meta.error)}
      value={field.value}
      onChange={field.onChange} // eslint-disable-line
      {...props}
    />
  );
}

export default FormikTextField;


---------------------app.js-------------------------
import React, { useState } from "react";
import "./styles.css";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormikTextField from "./FormikTextField";
import { Wizard, WizardStep } from "./FormikWizard";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "center",
    width: "100%"
  }
}));

const initialValues = {
  forename: "",
  surname: "",
  mobile:"",
  comments: "placeholder"
};

// const panRegExp = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/
// const gstRegExp =
//     /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
// const phoneRegExp =
//     /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/




function App(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (values, actions) => {
    console.log(JSON.stringify(values));
    actions.resetForm();
    setOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Button onClick={setOpen} color="primary" variant="contained">
        Open
      </Button>
      <Wizard
        title="My Wizard"
        open={open}
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onCancel={handleCancel}
        onSubmit={async (values, actions) => handleSubmit(values, actions)}
      >
        <WizardStep name="Your details">
          <Box className={classes.content}>
            <FormikTextField
              fullWidth
              size="small"
              variant="outlined"
              name="forename"
              label="Forename"
              type="text"
            />
            <FormikTextField
              fullWidth
              size="small"
              variant="outlined"
              name="surname"
              label="Surname"
              type="text"
            />
             <FormikTextField
              fullWidth
              size="small"
              variant="outlined"
              name="mobile"
              label="Mobile"
              type="number"
            />
          </Box>
        </WizardStep>
        <WizardStep name="Confirmation">
          <Box className={classes.content}>
            <FormikTextField
              fullWidth
              size="small"
              variant="outlined"
              name="comments"
              label="Comments"
              type="text"
            />
          </Box>
        </WizardStep>
        <WizardStep name="information">
          <Box className={classes.content}>
            <FormikTextField
              fullWidth
              size="small"
              variant="outlined"
              name="number"
              label="Number"
              type="number"
            />
          </Box>
        </WizardStep>
      </Wizard>
    </>
  );
}

export default App;
