import React, { useState, useEffect } from "react";
import {
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import "../styles/FormStepper.css";

const FomrStepper = ({ setStepper }) => {
  const [user, setUser] = useState({ user: "" });

  const handleChange = (e) => {
    setUser({ [e.target.name]: e.target.value });
  };

  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Identification", "Test de qualité 02"];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const formData = window.localStorage.getItem("user");
    setUser(JSON.parse(formData));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  });

  return (
    <div className="form_wrapper">
      <div
        className="form_backdrop"
        onClick={(e) => {
          setStepper(false);
        }}
      />
      <div className="form_box">
        <div className="form_card">
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className="stepper_card"
          >
            <Step>
              <StepLabel>Identification</StepLabel>
              <StepContent>
                <div className="steppers">
                  <FormControl className="radio_control" component="fieldset">
                    <div className="radio_legend">Identifiez vous S.V.P</div>
                    <RadioGroup
                      className="radio"
                      row
                      aria-label="Rôle d'utilisateur"
                      name="user"
                      value={user.user}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="admin"
                        control={<Radio size="small" />}
                        label="Administrateur"
                      />
                      <FormControlLabel
                        value="technician"
                        control={<Radio size="small" />}
                        label="Technicien"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Test de qualité 02</StepLabel>
              <StepContent>
                {user.user === "admin" && (
                  <FormThree setOpen={setOpen} handleBack={handleBack} />
                )}
                {user.user === "technician" && (
                  <FormTwo setOpen={setOpen} handleBack={handleBack} />
                )}
                <div>
                  <div>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        message="Note archived"
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" className="alert">
          Votre formulaire est <br /> bien enregistré!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FomrStepper;
