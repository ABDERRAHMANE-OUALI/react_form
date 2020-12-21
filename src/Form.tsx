import React, { useState } from "react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";
import "./Form.css";

function App() {
  const [Submit, setSubmit] = useState<boolean>(false);
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
        />
      </div>
      <div className="mb-3 mt-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div className="mb-3 mt-4">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Message
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows={3}
        ></textarea>
      </div>
      <button
        className="Form__Button mt-4"
        onClick={(e) => {
          e.preventDefault();
          setSubmit(true);
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
