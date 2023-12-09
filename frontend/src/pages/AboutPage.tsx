import styles from "../styles/AboutPage.module.css";

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
        target="blank"
      >
        My LinkedIn Profile
      </a>
    </div>
  );
};

export default AboutPage;
