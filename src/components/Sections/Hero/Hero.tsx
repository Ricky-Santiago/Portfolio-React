import { personalInfo } from "../../../data/personal";
import styles from "./Hero.module.css";
import avatarImage from "../../../assets/images/avatar.png";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContainer}>
        {/* Contenido izquierdo - Texto */}
        <div className={styles.leftContent}>
          <h1 className={styles.greeting}>{personalInfo.greeting}</h1>
          <h1 className={styles.name}>
            I'm{" "}
            <span className={styles.nameHighlight}>{personalInfo.name}</span>
          </h1>
          <p className={styles.profession}>
            I Am Into{" "}
            <span
              className={styles.professionHighlight}
              style={{ color: "#DAA520" }}
            >
              <ReactTyped
                strings={["Backend Development!", "Frontend Development!"]}
                typeSpeed={40}
                backSpeed={20}
                backDelay={1700}
                loop
                showCursor={true}
                cursorChar="|"
                style={{ color: "#DAA520" }} // ← Agregar aquí también
              />
            </span>
          </p>

          <div className={styles.ctaContainer}>
            <Link to="/about" className={styles.aboutButton}>
              About Me ↓
            </Link>

            <div className={styles.socialLinks}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className={styles.socialIcon}
                aria-label="Email"
              >
                <MdEmail size={20} />
              </a>

              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Contenido derecho - Imagen */}
        <div className={styles.rightContent}>
          <div className={styles.imageWrapper}>
            <img
              src={avatarImage}
              alt="Ricky Santiago Avatar"
              className={styles.avatarImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
