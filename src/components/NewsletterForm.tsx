import { useState } from "react";
import { ServerResponse } from "../pages/api/newsletter";

export function NewsletterForm() {
  const [emailInput, setEmailInput] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setConfirmMessage("");
    setErrorMessage("");
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
    <form data-test="newsletter" onSubmit={handleSubmit}>
      {confirmMessage && <div data-test="successMessage">{confirmMessage}</div>}
      {errorMessage && (
        <div data-test="errorMessage">Error: {errorMessage}</div>
      )}
      <h3>Sign up for our newsletter!</h3>
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
  );
}
