import React, { useState } from "react";
import "../styles/Forms.css";
import FormOne from "./FormOne";
import FormStepper from "./FormStepper";
const Forms = () => {
  const [formOne, setFormOne] = useState(false);
  const [stepper, setStepper] = useState(false);

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="card">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className="content">
              <h2>01</h2>
              <h3>Test de qualité 01</h3>
              <button
                className="fill_out"
                type="submit"
                onClick={(e) => setFormOne(true)}
              >
                Remplir
              </button>
            </div>
          </div>
          <div className="card">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <div className="content">
              <h2>02</h2>
              <h3>Test de qualité 02</h3>
              <button
                className="fill_out"
                type="submit"
                onClick={(e) => setStepper(true)}
              >
                Remplir
              </button>
            </div>
          </div>
        </div>
        {formOne && <FormOne setFormOne={setFormOne} />}
        {stepper && <FormStepper setStepper={setStepper} />}
      </div>
    </>
  );
};

export default Forms;
