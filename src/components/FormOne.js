import React, { useState, useEffect } from "react";
import "../styles/FormOne.css";
import {
  FormControl,
  TextField,
  InputAdornment,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  InputLabel,
  Checkbox,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

const FormOne = ({ setFormOne }) => {
  const [form, setForm] = useState({
    nbPannes: "",
    qtDechets: "",
    typeContrl: "",
    SousTypeContrl: "",
    description: "",
  });

  const [check, setCheck] = useState({ efficacité: false, correction: false });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheck = (e) => {
    setCheck({ ...check, [e.target.name]: e.target.checked });
  };

  const handleDelete = (e) => {
    setForm({
      nbPannes: "",
      qtDechets: "",
      typeContrl: "",
      SousTypeContrl: "",
      description: "",
    });
    setCheck({ efficacité: false, correction: false });
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (form.typeContrl === "exigence client") {
      setForm({ ...form, SousTypeContrl: null });
    }
  }, [form.typeContrl]);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="form_one_wrapper">
      <div
        className="form_one_backdrop"
        onClick={(e) => {
          setFormOne(false);
        }}
      />

      <div className="form_one_box">
        <div className="form_one_card">
          <form onSubmit={handleForm}>
            <h1>Test de qualité 01</h1>
            <div className="form_header">
              <TextField
                label="Nombre de pannes"
                variant="outlined"
                type="number"
                name="nbPannes"
                value={form.nbPannes}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                className="input"
              />

              <TextField
                label="Quantité de déchets"
                variant="outlined"
                type="number"
                name="qtDechets"
                value={form.qtDechets}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">Kg</InputAdornment>
                  ),
                }}
                className="input"
              />
            </div>

            <div className="form_main">
              <div className="main_top">
                <FormControl className="radio_control" component="fieldset">
                  <div className="radio_legend">Type de contrôle</div>
                  <RadioGroup
                    row
                    aria-label="Type de contrôle"
                    name="typeContrl"
                    onChange={handleChange}
                    value={form.typeContrl}
                  >
                    <FormControlLabel
                      value="contrôle régulier"
                      control={<Radio size="small" />}
                      label="Contrôle régulier"
                    />
                    <FormControlLabel
                      value="contrôle urgent"
                      control={<Radio size="small" />}
                      label="Contrôle urgent"
                    />
                    <FormControlLabel
                      value="exigence client"
                      control={<Radio size="small" />}
                      label="Exigence client"
                    />
                  </RadioGroup>
                </FormControl>
                {form.typeContrl === "contrôle régulier" && (
                  <>
                    <FormControl className="select">
                      <InputLabel>Sous-type de contrôle </InputLabel>
                      <Select
                        native
                        onChange={handleChange}
                        inputProps={{
                          name: "SousTypeContrl",
                        }}
                        value={form.SousTypeContrl}
                      >
                        <option aria-label="None" value="" />
                        <option value={"contrôle longueur CR-LO"}>
                          Contrôle longueur CR-LO
                        </option>
                        <option value={"contrôle largeur CR-LA"}>
                          Contrôle largeur CR-LA
                        </option>
                      </Select>
                    </FormControl>
                  </>
                )}

                {form.typeContrl === "contrôle urgent" && (
                  <>
                    <FormControl className="select">
                      <InputLabel>Sous-type de contrôle </InputLabel>
                      <Select
                        native
                        onChange={handleChange}
                        inputProps={{
                          name: "SousTypeContrl",
                        }}
                        value={form.SousTypeContrl}
                      >
                        <option aria-label="None" value="" />
                        <option value={"contrôle espacement CU-CE"}>
                          Contrôle espacement CU-CE
                        </option>
                        <option value={"contrôle largeur CU-CL"}>
                          Contrôle largeur CU-CL
                        </option>
                      </Select>
                    </FormControl>
                  </>
                )}
              </div>

              <div className="main_bottom">
                <div className="checkedBox">
                  <FormControl>
                    <FormControlLabel
                      label="Efficacité"
                      labelPlacement="start"
                      control={
                        <Checkbox
                          name="efficacité"
                          checked={check.efficacité}
                          onChange={handleCheck}
                        />
                      }
                    />
                  </FormControl>
                  {form.typeContrl === "contrôle régulier" && (
                    <FormControl>
                      <FormControlLabel
                        label="Correction"
                        labelPlacement="start"
                        control={
                          <Checkbox
                            name="correction"
                            checked={check.correction}
                            onChange={handleCheck}
                          />
                        }
                      />
                    </FormControl>
                  )}
                </div>
                <div className="advanced_bttn">
                  <Button
                    variant="contained"
                    className="advanced_bttn"
                    color="primary"
                    href="https://www.idelecplus.com/efficacite-energetique"
                    target="_blank"
                  >
                    Avancé
                  </Button>
                </div>
              </div>
            </div>
            <div className="form_footer">
              <div className="description_container">
                <TextField
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="description"
                  multiline
                  rows={5}
                  label="Description"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </div>
              <div className="buttons">
                <Button
                  type="submit"
                  variant="contained"
                  className="validate"
                  onClick={handleClick}
                  startIcon={<CheckCircleIcon />}
                >
                  Valider
                </Button>
                <Button
                  variant="contained"
                  className="cancel"
                  onClick={() => setFormOne(false)}
                  startIcon={<CancelIcon />}
                >
                  Annuler
                </Button>
                <Button
                  variant="contained"
                  className="delete"
                  onClick={() => {
                    handleDelete();
                  }}
                  color="secondary"
                  startIcon={<DeleteIcon />}
                >
                  Effacer
                </Button>
              </div>
            </div>
          </form>
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
          Votre formulaire est
          <br /> bien enregistré!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormOne;
