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
} from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

const FormTwo = ({ setOpen, handleBack }) => {
  const [form, setForm] = useState({
    nbPannes: "",
    qtDechets: "",
    typeContrl: "",
    SousTypeContrl: "",
    description: "",
  });

  const [check, setCheck] = useState({ efficacitÃ©: false, correction: false });

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
    setCheck({ efficacitÃ©: false, correction: false });
  };

  const handleForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (form.typeContrl === "exigence client") {
      setForm({ ...form, SousTypeContrl: null });
    }
  }, [form.typeContrl]);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    const formData = window.localStorage.getItem("savedTech");
    setForm(JSON.parse(formData));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("savedTech", JSON.stringify(form));
  });
  return (
    <>
      <form onSubmit={handleForm}>
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
            className="steppr_input"
          />

          <TextField
            label="QuantitÃ© de dÃ©chets"
            variant="outlined"
            type="number"
            name="qtDechets"
            value={form.qtDechets}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
            }}
            className="steppr_input"
          />
        </div>

        <div className="form_main">
          <div className="main_top">
            <FormControl className="radio_control" component="fieldset">
              <div className="radio_legend">Type de contrÃ´le</div>
              <RadioGroup
                row
                aria-label="Type de contrÃ´le"
                name="typeContrl"
                onChange={handleChange}
                value={form.typeContrl}
              >
                <FormControlLabel
                  value="contrÃ´le rÃ©gulier"
                  control={<Radio size="small" />}
                  label="ContrÃ´le rÃ©gulier"
                />
                <FormControlLabel
                  value="contrÃ´le urgent"
                  control={<Radio size="small" />}
                  label="ContrÃ´le urgent"
                />
                <FormControlLabel
                  value="exigence client"
                  control={<Radio size="small" />}
                  label="Exigence client"
                />
              </RadioGroup>
            </FormControl>
            {form.typeContrl === "contrÃ´le rÃ©gulier" && (
              <>
                <FormControl className="select">
                  <InputLabel>Sous-type de contrÃ´le </InputLabel>
                  <Select
                    native
                    onChange={handleChange}
                    inputProps={{
                      name: "SousTypeContrl",
                    }}
                    value={form.SousTypeContrl}
                  >
                    <option aria-label="None" value="" />
                    <option value={"contrÃ´le longueur CR-LO"}>
                      ContrÃ´le longueur CR-LO
                    </option>
                    <option value={"contrÃ´le largeur CR-LA"}>
                      ContrÃ´le largeur CR-LA
                    </option>
                  </Select>
                </FormControl>
              </>
            )}

            {form.typeContrl === "contrÃ´le urgent" && (
              <>
                <FormControl className="stepper_select">
                  <InputLabel>Sous-type de contrÃ´le </InputLabel>
                  <Select
                    native
                    onChange={handleChange}
                    inputProps={{
                      name: "SousTypeContrl",
                    }}
                    value={form.SousTypeContrl}
                  >
                    <option aria-label="None" value="" />
                    <option value={"contrÃ´le espacement CU-CE"}>
                      ContrÃ´le espacement CU-CE
                    </option>
                    <option value={"contrÃ´le largeur CU-CL"}>
                      ContrÃ´le largeur CU-CL
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
                  label="EfficacitÃ©"
                  labelPlacement="start"
                  control={
                    <Checkbox
                      name="efficacitÃ©"
                      checked={check.efficacitÃ©}
                      onChange={handleCheck}
                    />
                  }
                />
              </FormControl>
              {form.typeContrl === "contrÃ´le rÃ©gulier" && (
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
                className="stepper_advanced_bttn"
                color="primary"
                href="https://www.idelecplus.com/efficacite-energetique"
                target="_blank"
              >
                AvancÃ©
              </Button>
            </div>
          </div>
        </div>
        <div className="stepper_form_footer">
          <div className="description_container">
            <TextField
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="stepper_description"
              multiline
              rows={4}
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
              className="stepper_validate"
              onClick={handleClick}
              startIcon={<CheckCircleIcon />}
            >
              Valider
            </Button>
            <Button
              variant="contained"
              className="stepper_cancel"
              onClick={handleBack}
              startIcon={<CancelIcon />}
            >
              Annuler
            </Button>
            <Button
              variant="contained"
              className="stepper_delete"
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
    </>
  );
};

export default FormTwo;
