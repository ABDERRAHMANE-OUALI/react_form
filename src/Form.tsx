import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import alertTriangle from "react-useanimations/lib/alertCircle";
import Joi from "joi";
import "./Form.css";

interface InputValidation {
  [key: string]: string;
}

function App() {
  const [userError, setUserError] = useState<string | undefined>("");
  const [emailError, setEmailError] = useState<string | undefined>("");
  const [messageError, setMsgError] = useState<string | undefined>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const usernameShema = Joi.object({
    username: Joi.string()
      .required()
      .label("Username is not allowed to be empty"),
  });
  const emailShema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email is not allowed to be empty"),
  });
  const messageShema = Joi.object({
    message: Joi.string()
      .required()
      .label("Message is not allowed to be empty"),
  });
  function resetValidation() {
    setEmailError(undefined);
    setMsgError(undefined);
    setUserError(undefined);
  }
  function validationInput(
    inputLabel: string,
    inputData: string,
    updateMethod: React.Dispatch<React.SetStateAction<string | undefined>>,
    shema: Joi.ObjectSchema<any>
  ) {
    const object: InputValidation = {};
    object[inputLabel] = inputData;
    const result = shema.validate(object, { abortEarly: false });
    result.error && updateMethod(result?.error?.details[0]?.context?.label);
  }
  function validation() {
    validationInput("username", username, setUserError, usernameShema);
    validationInput("email", email, setEmailError, emailShema);
    validationInput("message", message, setMsgError, messageShema);
  }
  return (
    <form className="form mb-3 mt-3 ml-3 mr-3">
      <div className="mb-3 mt-5">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Username
        </label>
        <input
          type="text"
          className={`form-control ${userError && "inputError"}`}
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onClick={() => resetValidation()}
          onChange={(e) => setUsername(e.currentTarget.value)}
        />
        {userError && (
          <div className="error">
            <UseAnimations
              size={32}
              animation={alertTriangle}
              strokeColor="red"
            />{" "}
            {userError}{" "}
          </div>
        )}
      </div>
      <div className="mb-3 mt-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Email address
        </label>
        <input
          type="text"
          className={`form-control ${emailError && "inputError"}`}
          id="exampleInputPassword1"
          onChange={(e) => setEmail(e.currentTarget.value)}
          onClick={() => resetValidation()}
        />
        {emailError && (
          <div className="error">
            <UseAnimations
              size={32}
              strokeColor="red"
              animation={alertTriangle}
            />{" "}
            {emailError}{" "}
          </div>
        )}
      </div>
      <div className="mb-3 mt-4">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Message
        </label>
        <textarea
          className={`form-control ${messageError && "inputError"}`}
          id="exampleFormControlTextarea1"
          rows={3}
          onClick={() => resetValidation()}
          onChange={(e) => setMessage(e.currentTarget.value)}
        ></textarea>
        {messageError && (
          <div className="error">
            <UseAnimations
              size={32}
              strokeColor="red"
              animation={alertTriangle}
            />{" "}
            {messageError}{" "}
          </div>
        )}
      </div>
      <button
        className="Form__Button mt-4"
        onClick={(e) => {
          e.preventDefault();
          validation();
        }}
      >
          "Submit"
      </button>
    </form>
  );
}

export default App;
