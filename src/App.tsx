import { useState, useEffect } from "react";
import journalismData from "./data/journalism.json";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  const handleNavClick = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const toggleTheme = () => {
    if (theme === null) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "light" : "dark");
    } else {
      setTheme(theme === "light" ? "dark" : "light");
    }
  };

  const renderHomePage = () => (
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
          As always you can find me on{" "}
          <a href="https://instagram.com">Instagram</a>,{" "}
          <a href="https://linkedin.com">LinkedIn</a>,{" "}
          <a href="https://github.com">Github</a>,{" "}
          <a href="https://strava.com">Strava</a> ... (I'm sure I'm missing
          others. You get the point. Troll away.)
        </p>

        <p>
          For those interested in watching me wear a tie and answer questions:{" "}
          <a href="/resume">résumé</a>.
        </p>

        <p>Now with dark theme.</p>
      </div>
    </>
  );

  const renderJournalismPage = () => (
    <>
      <h1>journalism</h1>

      <div>
        {journalismData.map((section, sectionIndex) => (
          <div
            key={`${section.section}-${sectionIndex}`}
            style={{ marginBottom: "40px" }}
          >
            <h2>{section.section}</h2>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {section.articles.map((article, articleIndex) => (
                <li key={`${article.title.replace(" ", "-")}-${articleIndex}`}>
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
              style={{
                fontSize: "16px",
                textDecoration: "underline",
              }}
            >
              journalism
            </a>
          </li>
        </ul>
      </nav>

      <main>
        {currentPage === "home" && renderHomePage()}
        {currentPage === "journalism" && renderJournalismPage()}
      </main>

      <button onClick={toggleTheme} aria-label="Toggle theme">
        {theme === "dark" ||
        (theme === null &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches)
          ? "☀️"
          : "🌙"}
      </button>
    </div>
  );
}

export default App;
