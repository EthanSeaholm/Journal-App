import styles from "../styles/NotFoundPage.module.css";

/**
 * This component renders a 404 Not Found error message when trying to access a route that does not exist.
 *
 * @returns {JSX.Element} A React element that renders a 404 Not Found error message.
 */

const NotFoundPage = () => {
  return (
    <div className={styles.notFoundText}>
      <p>Page not found!</p>
    </div>
  );
};

export default NotFoundPage;
