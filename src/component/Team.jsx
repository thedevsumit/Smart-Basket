import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    name: "Sukhanpreet Singh",
    role: "Frontend Developer",
    github: "https://github.com/sukhan",
    linkedin: "https://linkedin.com/in/sukhan",
    instagram: "https://instagram.com/sukhan032",
  },
  {
    name: "Sumit Kumar",
    role: "Backend Developer",
    github: "https://github.com/thedevsumit",
    linkedin: "https://linkedin.com/in/sumit-kumar-023773326",
    instagram: "https://instagram.com/_sumit__2007",
  },
  {
    name: "Pratham",
    role: "UI/UX Designer",
    github: "https://github.com/pratham",
    linkedin: "https://linkedin.com/in/pratham_rajput3168",
    instagram: "https://instagram.com/pratham_rajput3168",
  },
  {
    name: "Surya",
    role: "Researcher & UI",
    github: "https://github.com/surya",
    linkedin: "https://linkedin.com/in/surya",
    instagram: "https://instagram.com/surya",
  },
];

const Team = ({ sidebar, setSidebar }) => {
  return (
    <div
      style={styles.container}
      onClick={() => {
        if (sidebar === 1) {
          setSidebar(0);
        }
      }}
    >
      <h2 style={styles.heading}>Meet the Team</h2>
      <div style={styles.grid}>
        {teamMembers.map((member, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.avatarPlaceholder}>{member.name.charAt(0)}</div>
            <h3 style={styles.name}>{member.name}</h3>
            <p style={styles.role}>{member.role}</p>
            <div style={styles.icons}>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub size={20} />
              </a>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={20} />
              </a>
              <a
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    fontFamily: "sans-serif",
    backgroundColor: "#f7f7f7",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
  },
  avatarPlaceholder: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#28a745",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    margin: "0 auto 1rem",
  },
  name: {
    fontSize: "1.2rem",
    marginBottom: "0.3rem",
  },
  role: {
    fontSize: "0.95rem",
    color: "#555",
    marginBottom: "1rem",
  },
  icons: {
    display: "flex",
    justifyContent: "center",
    gap: "0.8rem",
  },
};

export default Team;
