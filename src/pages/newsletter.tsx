import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { ServerResponse } from "../pages/api/newsletter";

const Newsletter: NextPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setConfirmMessage("");
    e.preventDefault();

    try {
      const raw = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailInput,
        }),
      });

      const response: ServerResponse = await raw.json();

      if (response.success) {
        setConfirmMessage(response.message);
        setEmailInput("");
        return;
      }

      setErrorMessage(response.message);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error as string);
      }
    }
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form data-test="newsletter" onSubmit={handleSubmit}>
          {confirmMessage && (
            <div data-test="successMessage">{confirmMessage}</div>
          )}
          {errorMessage && (
            <div data-test="errorMessage">Error: {errorMessage}</div>
          )}
          <h3>FAIL</h3>
          <input
            type={"email"}
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            data-test="emailInput"
            id="emailInput"
            formNoValidate
          />
          <input type={"submit"} data-test="formSubmit" />
        </form>
      </main>
    </div>
  );
};

export default Newsletter;
