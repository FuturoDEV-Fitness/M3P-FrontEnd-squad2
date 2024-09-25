import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import styles from "./index.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <p>Copyright © 2024 - FitHub. Todos os direitos reservados.</p>
      <div className={styles.icons}>
        <a href="" target="_blank">
          <LinkedInIcon sx={{ color: "#124559" }} />
        </a>
        <a href="" target="_blank">
          <GitHubIcon sx={{ color: "#124559" }} />
        </a>
        <a href="" target="_blank">
          <InstagramIcon sx={{ color: "#124559" }} />
        </a>
      </div>
    </div>
  );
}

export default Footer;
