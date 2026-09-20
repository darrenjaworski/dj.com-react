import { useState } from "react";
import journalismData from "./data/journalism.json";
import { SOCIAL_LINKS, RESUME_URL } from "./data/site";
import ThemeIcon from "./components/ThemeIcon";
import { slugify } from "./utils/slugify";
import { useTheme } from "./hooks/useTheme";

type Page = "home" | "journalism";

const SocialLinks = () => (
  <span data-testid="social-links">
    {SOCIAL_LINKS.map((link, index) => (
      <span key={link.name}>
        <a href={link.url} data-testid={`social-link-${slugify(link.name)}`}>
          {link.name}
        </a>
        {index < SOCIAL_LINKS.length - 1 ? ", " : ""}
      </span>
    ))}
  </span>
);

type NavigationProps = {
  onNavigate: (page: Page, e: React.MouseEvent) => void;
};

type PageConfig = { id: Page; label: string; href: string };

const PAGES: PageConfig[] = [
  { id: "home", label: "home", href: "/" },
  { id: "journalism", label: "journalism", href: "/journalism" },
];

type NavLinkProps = {
  page: PageConfig;
  onNavigate: (page: Page, e: React.MouseEvent) => void;
  testId?: string;
  label?: string;
};

const NavLink = ({ page, onNavigate, testId, label }: NavLinkProps) => (
  <a
    href={page.href}
    onClick={(e) => onNavigate(page.id, e)}
    data-testid={testId ?? `nav-${page.id}`}
  >
    {label ?? page.label}
  </a>
);

const Navigation = ({ onNavigate }: NavigationProps) => (
  <nav data-testid="navigation">
    <ul>
      {PAGES.map((page) => (
        <li key={page.id}>
          <NavLink page={page} onNavigate={onNavigate} />
        </li>
      ))}
    </ul>
  </nav>
);

type ThemeToggleProps = {
  isDarkMode: boolean;
  onToggle: () => void;
};

const ThemeToggle = ({ isDarkMode, onToggle }: ThemeToggleProps) => (
  <button onClick={onToggle} aria-label="Toggle theme" data-testid="theme-toggle">
    {isDarkMode ? <ThemeIcon variant="light" /> : <ThemeIcon variant="dark" />}
  </button>
);

type HomePageProps = {
  onNavigate: (page: Page, e: React.MouseEvent) => void;
};

const HomePage = ({ onNavigate }: HomePageProps) => (
  <div data-testid="home-page">
    <h1>home</h1>
    <div>
      <p>
        Welcome. This is my home on the web. I dramatically simplified the
        site and I hope that you like it. I'm always available for public
        comment. Please send an email to{" "}
        <a href="mailto:darrenjaworski@gmail.com" data-testid="email-link">
          darrenjaworski@gmail.com
        </a>
        . (Please allow 10-15 months for response.)
      </p>

      <p>
        Check out my past work in{" "}
        <NavLink
          page={PAGES.find((p) => p.id === "journalism")!}
          onNavigate={onNavigate}
          testId="journalism-link"
          label="journalism."
        />
      </p>

      <p>
        As always you can find me on <SocialLinks />
        ... (I'm sure I'm missing others. You get the point. Troll away.)
      </p>

      <p>
        For those interested in watching me wear a tie and answer questions:{" "}
        <a href={RESUME_URL} data-testid="resume-link">
          résumé
        </a>
        .
      </p>

      <p>Now with dark theme.</p>
    </div>
  </div>
);

const JournalismPage = () => (
  <div data-testid="journalism-page">
    <h1>journalism</h1>
    <div>
      {journalismData.map((section) => (
        <div
          key={section.section}
          data-testid={`journalism-section-${slugify(section.section)}`}
        >
          <h2>{section.section}</h2>
          <ul>
            {section.articles.map((article) => (
              <li key={article.title}>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`article-link-${slugify(article.title, 50)}`}
                >
                  {article.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const { isDarkMode, toggleTheme } = useTheme();

  const handleNavClick = (page: Page, e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  return (
    <div className="main-container" data-testid="main-container">
      <Navigation onNavigate={handleNavClick} />
      <main data-testid="main-content">
        {currentPage === "home" ? (
          <HomePage onNavigate={handleNavClick} />
        ) : (
          <JournalismPage />
        )}
      </main>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
    </div>
  );
}

export default App;
