import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import alertTriangle from "react-useanimations/lib/alertTriangle";
import Joi from "joi";
import "./Form.css";

function App() {
  const [Submit, setSubmit] = useState<boolean>(false);
  const [error, setError] = useState<Joi.ValidationErrorItem[] | null>(null);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const shema = Joi.object({
    username: Joi.string().required().label("Username"),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    message: Joi.string().required().label("Message"),
  });
  function resetValidation() {
    setError(null);
  }
  function validationInputs() {
    const result = shema.validate(
      {
        username: username,
        email: email,
        message: message,
      },
      { abortEarly: false }
    );
    result.error && setError(result.error.details);
  }
  return (
    <form className="form mb-3 mt-3 ml-3 mr-3">
      <div className="mb-3 mt-5">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onClick={() => resetValidation()}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        {(error && error[0]?.message) && (
          <p className="error">
            <UseAnimations animation={alertTriangle} color="red" />{" "}
            {error[0]?.message}{" "}
          </p>
        )}
      </div>
      <div className="mb-3 mt-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputPassword1"
          onChange={(e) => setEmail(e.currentTarget.value)}
          onClick={() => resetValidation()}
        />
        {error && error[1]?.message && (
          <p className="error">
            <UseAnimations animation={alertTriangle} /> {error[1].message}{" "}
          </p>
        )}
      </div>
      <div className="mb-3 mt-4">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Message
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
          onClick={() => resetValidation()}
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></textarea>
        {error && error[2]?.message && (
          <p className="error">
            <UseAnimations animation={alertTriangle} /> {error[2].message}{" "}
          </p>
        )}
      </div>
      <button
        className="Form__Button mt-4"
        onClick={(e) => {
          e.preventDefault();
          setSubmit(true);
          validationInputs();
          setSubmit(false);
        }}
      >
        {Submit ? (
          <UseAnimations
            animation={loading}
            wrapperStyle={{ color: "white" }}
          />
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}

export default App;
