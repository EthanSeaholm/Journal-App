import aboutPageStyles from "../styles/AboutPage.module.css";
import progessStyles from "../styles/Progress.module.css";

/**
 * This component renders the AboutPage, which contains a link to my personal LinkedIn page.
 *
 * @returns {JSX.Element} A React element that renders the AboutPage.
 */

const AboutPage = () => {
  return (
    <div className={aboutPageStyles.aboutText}>
      <p>
        When I first began learning to program, I was overwhelmed by the sheer
        amount of information being thrown at me. Trying to retain everything, I
        took notes. I began on pen and paper, then I started using Notepad, and
        then I eventually began using Docs and Word. It was not ideal, but it
        got the job done.
      </p>
      <p>
        However, a problem eventually presented itself. Having taken notes on
        multiple platforms, I realized I was having to constantly bounce back
        and forth looking for the right note. It was exhausting! After all, I
        only needed {<i>one</i>} place to be able to consistently write and save
        notes and easily access them whenever I needed to...
      </p>
      <p>
        Hence,{" "}
        <span className={progessStyles.progressAbout}>[{<i>Prog</i>}]</span>
        ress. A full stack note-taking web application built using React,
        TypeScript, MongoDB, Express.js, and Node.js. Write, save, update, and
        delete notes while staying organized all in one.
      </p>
      <p>Did you get all that? Best make a note to make sure.</p>
      <p className={aboutPageStyles.thanks}>Thank you for stopping by!</p>
      <a
        className={aboutPageStyles.linkedInLink}
        href="https://www.linkedin.com/in/ethan-seaholm-a136a91b8/"
        target="_blank"
        rel="noopener noreferrer"
      >
        By Ethan Seaholm
      </a>
    </div>
  );
};

export default AboutPage;
