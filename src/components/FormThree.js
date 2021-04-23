import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

const FormThree = ({ setOpen, handleBack }) => {
  const [form, setForm] = useState({
    nbPannes: "",
    qtDechets: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleDelete = (e) => {
    setForm({
      nbPannes: "",
      qtDechets: "",
    });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleForm = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const formData = window.localStorage.getItem("savedAdmin");
    setForm(JSON.parse(formData));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("savedAdmin", JSON.stringify(form));
  });

  return (
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
            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
          }}
          className="input"
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
    </form>
  );
};

export default FormThree;
