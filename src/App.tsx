import { useState, useEffect } from "react";
import journalismData from "./data/journalism.json";

type Theme = "light" | "dark" | null;
type Page = "home" | "journalism";

const SOCIAL_LINKS = [
  { name: "Instagram", url: "https://www.instagram.com/darrenjaws/" },
  { name: "Bluesky", url: "https://bsky.app/profile/darrenjaws.bsky.social" },
  { name: "Flickr", url: "https://flickr.com/photos/156906593@N08/" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/darrenjaworski" },
  { name: "Github", url: "https://github.com/darrenjaworski" },
  { name: "Strava", url: "https://www.strava.com/athletes/3266824" },
];

const RESUME_URL =
  "https://docs.google.com/document/d/19L1W3PXUyboaUWB0shDedjKwzRPsqiBw0VxsAir45EU/edit?usp=sharing";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [theme, setTheme] = useState<Theme>(null);

  const isSystemDark = () =>
    window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const isDarkMode = theme === "dark" || (theme === null && isSystemDark());

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const handleNavClick = (page: Page, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    if (theme === null) {
      setTheme(isSystemDark() ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  const SocialLinks = () => (
    <>
      {SOCIAL_LINKS.map((link, index) => (
        <span key={link.name}>
          <a href={link.url}>{link.name}</a>
          {index < SOCIAL_LINKS.length - 1 ? ", " : ""}
        </span>
      ))}
    </>
  );

  const Navigation = () => (
    <nav>
      <ul>
        <li>
          <a href="/" onClick={(e) => handleNavClick("home", e)}>
            home
          </a>
        </li>
        <li>
          <a
            href="/journalism"
            onClick={(e) => handleNavClick("journalism", e)}
          >
            journalism
          </a>
        </li>
      </ul>
    </nav>
  );

  const ThemeToggle = () => (
    <button onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? "☀️" : "🌙"}
    </button>
  );

  const HomePage = () => (
    <>
      <h1>home</h1>
      <div>
        <p>
          Welcome. This is my home on the web. I dramatically simplified the
          site and I hope that you like it. I'm always available for public
          comment. Please send an email to{" "}
          <a href="mailto:darrenjaworski@gmail.com">darrenjaworski@gmail.com</a>
          . (Please allow 10-15 months for response.)
        </p>

        <p>
          Check out my past work in{" "}
          <a
            href="/journalism"
            onClick={(e) => handleNavClick("journalism", e)}
          >
            journalism.
          </a>
        </p>

        <p>
          As always you can find me on <SocialLinks />
          ... (I'm sure I'm missing others. You get the point. Troll away.)
        </p>

        <p>
          For those interested in watching me wear a tie and answer questions:{" "}
          <a href={RESUME_URL}>résumé</a>.
        </p>

        <p>Now with dark theme.</p>
      </div>
    </>
  );

  const JournalismPage = () => (
    <>
      <h1>journalism</h1>
      <div>
        {journalismData.map((section) => (
          <div key={section.section}>
            <h2>{section.section}</h2>
            <ul>
              {section.articles.map((article) => (
                <li key={article.title}>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="main-container">
      <Navigation />
      <main>{currentPage === "home" ? <HomePage /> : <JournalismPage />}</main>
      <ThemeToggle />
    </div>
  );
}

export default App;
