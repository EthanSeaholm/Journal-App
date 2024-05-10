import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import SignUpModal from "./components/SignUpModal";
import { User } from "./models/user";
import * as EntriesApi from "./network/entries_api";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import EntriesPage from "./pages/EntriesPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import styles from "./styles/App.module.css";

/**
 * This component renders the core features of the application, including:
 * - The entire NavBar, which provides navigational links for users to navigate the application.
 * - Routes, like the "About" page or the "Not Found" page.
 * - The login modal, which allows a returning user to log in to access their entries.
 * - The sign-up modal, which allows new users to create a new account.
 *
 * @returns {JSX.Element} A React element that renders the core features of the application.
 */

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  /**
   * This function fetches the currently logged in user and their information in order to render the appropriate content.
   */

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await EntriesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <BrowserRouter>
      <div>
        <NavBar
          loggedInUser={loggedInUser}
          onLoginClicked={() => setShowLoginModal(true)}
          onSignUpClicked={() => setShowSignUpModal(true)}
          onLogoutSuccessful={() => setLoggedInUser(null)}
        />
        <Container className={styles.pageContainer}>
          <Routes>
            <Route
              path="/"
              element={<EntriesPage loggedInUser={loggedInUser} />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Container>
        {showSignUpModal && (
          <SignUpModal
            onDismiss={() => {
              setShowSignUpModal(false);
            }}
            onSignUpSuccessful={(user) => {
              setLoggedInUser(user);
              setShowSignUpModal(false);
            }}
          />
        )}
        {showLoginModal && (
          <LoginModal
            onDismiss={() => {
              setShowLoginModal(false);
            }}
            onLoginSuccessful={(user) => {
              setLoggedInUser(user);
              setShowLoginModal(false);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
