import styles from "../styles/Welcome.module.css";

/**
 * The component that renders the Entries page when no user is logged in.
 *
 * @returns {JSX.Element} A React element that renders the Entries page when no user is logged in.
 */

const EntriesPageLoggedOutView = () => {
  return (
    <p className={styles.welcomeTextLoggedOut}>
      Welcome! Please sign up or log in to access entries...
    </p>
  );
};

export default EntriesPageLoggedOutView;
