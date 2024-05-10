import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginCredentials } from "../network/entries_api";
import * as EntriesApi from "../network/entries_api";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import styleUtils from "../styles/utils.module.css";
import { useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";

/**
 * This component renders the login modal when a returning user wants to access their entries.
 * Users MUST be logged in to create, read, update, or delete their entries.
 *
 * @returns {JSX.Element} A React element that renders the login modal when an existing user wants to access their entries.
 */

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  /**
   * This function authenticates the user's information when attempting to log in.
   * If the user's inputted credentials match the user's information in the database, the user is successfully logged in.
   * If not, a 401 Unauthorized error is thrown.
   *
   * @param credentials - The parameters necessary for authenticating an existing user's information.
   */

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await EntriesApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username:"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password:"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${styleUtils.width100} ${styleUtils.logInButton}`}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
