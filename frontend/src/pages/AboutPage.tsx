import styles from "../styles/AboutPage.module.css";

/**
 * This component renders the AboutPage, which contains a link to my personal LinkedIn page.
 *
 * @returns {JSX.Element} A React element that renders the AboutPage.
 */

const AboutPage = () => {
  return (
    <div className={styles.aboutText}>
      <p>
        This full stack application was built by Ethan Seaholm using MongoDB,
        Express, React, and Node.js.
      </p>
      <p>Thank you for stopping by!</p>
      <a
        className={styles.linkedInLink}
        href="https://www.linkedin.com/in/ethan-seaholm-a136a91b8/"
        target="_blank"
        rel="noopener noreferrer"
      >
        My LinkedIn Profile
      </a>
    </div>
  );
};

export default AboutPage;
