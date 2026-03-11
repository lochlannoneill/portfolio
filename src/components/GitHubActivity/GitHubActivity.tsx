import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeInSection from "../../FadeInSection";
import "./GitHubActivity.css";

interface ContributionDay {
  date: string;
  contributionCount: number;
  contributionLevel:
    | "NONE"
    | "FIRST_QUARTILE"
    | "SECOND_QUARTILE"
    | "THIRD_QUARTILE"
    | "FOURTH_QUARTILE";
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

const LEVEL_COLORS_LIGHT: Record<string, string> = {
  NONE: "#ebedf0",
  FIRST_QUARTILE: "#9be9a8",
  SECOND_QUARTILE: "#40c463",
  THIRD_QUARTILE: "#30a14e",
  FOURTH_QUARTILE: "#216e39",
};

const LEVEL_COLORS_DARK: Record<string, string> = {
  NONE: "#161b22",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

interface GitHubActivityProps {
  username: string;
  joinYear?: number;
}

function GitHubActivity({ username, joinYear = 2021 }: GitHubActivityProps) {
  const currentYear = new Date().getFullYear();
  // Generate year options: from GitHub join year to current year + "Last 12 months"
  const yearOptions: (number | "last")[] = [];
  for (let y = joinYear; y <= currentYear; y++) {
    yearOptions.push(y);
  }
  yearOptions.push("last");

  const [selectedYear, setSelectedYear] = useState<number | "last">("last");
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const yearScrollRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cellsVisible, setCellsVisible] = useState(false);
  const [repoCount, setRepoCount] = useState<number | null>(null);

  // Fetch public repo count
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((json) => {
        if (typeof json.public_repos === "number") setRepoCount(json.public_repos);
      })
      .catch(() => {});
  }, [username]);

  // Watch for dark mode changes
  useEffect(() => {
    // Sync initial state (dark class may be added after first render by Navbar)
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Trigger cell animation when SVG scrolls into view
  useEffect(() => {
    if (!svgRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCellsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(svgRef.current);
    return () => observer.disconnect();
  }, [data]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll year selector to the right on mount
  useEffect(() => {
    if (yearScrollRef.current) {
      yearScrollRef.current.scrollLeft = yearScrollRef.current.scrollWidth;
    }
  }, [data]);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      setError(false);
      setData(null);
      try {
        // Use the GitHub contributions API via a public proxy
        const yearParam = selectedYear === "last" ? "last" : selectedYear;
        const response = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${yearParam}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();

        // The API returns { total, contributions } where contributions is an array of { date, count, level }
        const contributions: { date: string; count: number; level: number }[] =
          json.contributions;

        // Sort by date
        contributions.sort((a, b) => a.date.localeCompare(b.date));
        if (contributions.length === 0) throw new Error("No data");

        // Group by weeks (Sunday start)
        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];

        // Pad the first week so it starts on Sunday
        const firstDate = new Date(contributions[0].date + "T00:00:00");
        const firstDay = firstDate.getDay();
        for (let i = 0; i < firstDay; i++) {
          currentWeek.push({
            date: "",
            contributionCount: 0,
            contributionLevel: "NONE",
          });
        }

        const levelMap = [
          "NONE",
          "FIRST_QUARTILE",
          "SECOND_QUARTILE",
          "THIRD_QUARTILE",
          "FOURTH_QUARTILE",
        ] as const;

        let total = 0;
        for (const entry of contributions) {
          total += entry.count;
          currentWeek.push({
            date: entry.date,
            contributionCount: entry.count,
            contributionLevel: levelMap[entry.level] || "NONE",
          });
          if (currentWeek.length === 7) {
            weeks.push({ contributionDays: currentWeek });
            currentWeek = [];
          }
        }
        if (currentWeek.length > 0) {
          weeks.push({ contributionDays: currentWeek });
        }

        setData({ totalContributions: total, weeks });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [selectedYear]);

  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT;

  if (loading) {
    const skeletonWeeks = 52;
    const skeletonRows = 7;
    const skCellSize = 13;
    const skGap = 3;
    const skStep = skCellSize + skGap;
    const skLabelOffset = 30;
    const skTopOffset = 20;
    const skWidth = skLabelOffset + skeletonWeeks * skStep;
    const skHeight = skTopOffset + skeletonRows * skStep;

    return (
      <section id="github" className="w-full max-w-6xl mx-auto p-4 xl:p-0 scroll-mt-16">
        <FadeInSection>
          <div className="bg-white dark:bg-[#0a0f1f] rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6 transition-colors duration-300">
            {/* Skeleton header */}
            <div className="flex items-center gap-3 mb-4 animate-pulse">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-28 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>

            {/* Skeleton heatmap grid */}
            <div className="overflow-x-auto custom-scrollbar-gray">
              <svg
                width={skWidth}
                height={skHeight}
                className="block mx-auto animate-pulse"
                role="img"
                aria-label="Loading contribution graph"
              >
                {Array.from({ length: skeletonWeeks }).map((_, wi) =>
                  Array.from({ length: skeletonRows }).map((_, di) => (
                    <rect
                      key={`${wi}-${di}`}
                      x={skLabelOffset + wi * skStep}
                      y={skTopOffset + di * skStep}
                      width={skCellSize}
                      height={skCellSize}
                      rx={2}
                      ry={2}
                      fill={isDark ? "#1e2530" : "#ebedf0"}
                    />
                  ))
                )}
              </svg>
            </div>

            {/* Skeleton legend */}
            <div className="flex items-center justify-end gap-2 mt-3 animate-pulse">
              <div className="h-3 w-8 rounded bg-gray-200 dark:bg-gray-700" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-3 h-3 rounded-sm bg-gray-200 dark:bg-gray-700" />
              ))}
              <div className="h-3 w-8 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </FadeInSection>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section id="github" className="w-full max-w-6xl mx-auto p-4 xl:p-0 scroll-mt-16">
        <FadeInSection>
          <div className="flex justify-center items-center h-32">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
            >
              View my GitHub profile &rarr;
            </a>
          </div>
        </FadeInSection>
      </section>
    );
  }

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const cellSize = 13;
  const cellGap = 3;
  const step = cellSize + cellGap;
  const labelOffset = 30;
  const topOffset = 20;
  const svgWidth = labelOffset + data.weeks.length * step;
  const svgHeight = topOffset + 7 * step;

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  // Compute month label positions from the first valid date in each week
  const monthLabels: { label: string; x: number }[] = [];
  let lastMonth = -1;
  for (let wi = 0; wi < data.weeks.length; wi++) {
    const firstDay = data.weeks[wi].contributionDays.find((d) => d.date !== "");
    if (!firstDay) continue;
    const date = new Date(firstDay.date + "T00:00:00");
    const month = date.getMonth();
    if (month !== lastMonth) {
      monthLabels.push({
        label: MONTH_NAMES[month],
        x: labelOffset + wi * step,
      });
      lastMonth = month;
    }
  }

  // Compute streak stats
  const allDays = data.weeks
    .flatMap((w) => w.contributionDays)
    .filter((d) => d.date !== "")
    .sort((a, b) => a.date.localeCompare(b.date));

  let currentStreak = 0;
  let longestStreak = 0;
  let streak = 0;
  let busiestDay = allDays[0];

  // Walk forward to compute longest streak and busiest day
  for (const day of allDays) {
    if (day.contributionCount > 0) {
      streak++;
      if (streak > longestStreak) longestStreak = streak;
    } else {
      streak = 0;
    }
    if (day.contributionCount > busiestDay.contributionCount) {
      busiestDay = day;
    }
  }

  // Walk backward from today/end to compute current streak
  for (let i = allDays.length - 1; i >= 0; i--) {
    // Skip today if it has 0 contributions (day isn't over yet)
    if (i === allDays.length - 1 && allDays[i].contributionCount === 0) continue;
    if (allDays[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  const ordinalSuffix = (d: number) => {
    if (d > 3 && d < 21) return "th";
    switch (d % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  const busiestFormatted = busiestDay
    ? (() => {
        const d = new Date(busiestDay.date + "T00:00:00");
        const month = d.toLocaleDateString("en-US", { month: "short" });
        const day = d.getDate();
        return `${month} ${day}${ordinalSuffix(day)}`;
      })()
    : "";

  const activeDays = allDays.filter((d) => d.contributionCount > 0).length;
  const avgPerActiveDay = activeDays > 0 ? (data.totalContributions / activeDays).toFixed(1) : "0";

  const DAY_NAMES = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];
  const dayTotals = [0, 0, 0, 0, 0, 0, 0];
  for (const day of allDays) {
    const dow = new Date(day.date + "T00:00:00").getDay();
    dayTotals[dow] += day.contributionCount;
  }
  const mostActiveDow = DAY_NAMES[dayTotals.indexOf(Math.max(...dayTotals))];

  return (
    <section id="github" className="w-full max-w-6xl mx-auto scroll-mt-16">
      <FadeInSection>
        <div className="bg-white dark:bg-[#0a0f1f] rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6 transition-colors duration-300">
          {/* Header + Year selector */}
          <div className="relative mb-4">
            {/* Header */}
            <div className="flex items-center gap-3 shrink-0">
              {/* <a
                href={`https://github.com/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faGithub} className="text-[2.5rem]" />
              </a> */}
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base transition-colors duration-300">
                  <a
                    href={`https://github.com/search?q=author%3A${username}+sort%3Acommitter-date-desc&type=commits`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                  >
                    {data.totalContributions.toLocaleString()}
                  </a>{" "}
                  <span className="hidden sm:inline">contributions in {selectedYear === "last" ? "the last year" : selectedYear}</span>
                  <span className="sm:hidden">contributions</span>
                </span>
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  <img
                    src={`https://github.com/${username}.png?size=40`}
                    alt={username}
                    className="w-5 h-5 rounded-full"
                  />
                  @{username}{repoCount !== null && <span className="opacity-60"> · {repoCount} repositories</span>}
                </a>
              </div>
            </div>

            {/* Year selector */}
            {/* Dropdown (small/medium screens) */}
            <div ref={dropdownRef} className="absolute right-0 top-1/2 -translate-y-1/2 lg:hidden z-10">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {selectedYear === "last" ? "Last 12 months" : selectedYear}
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""} fill-gray-400 dark:fill-gray-500`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <div
                className={`absolute right-0 mt-1 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden min-w-[140px] transition-all duration-200 origin-top ${
                  dropdownOpen
                    ? "opacity-100 scale-y-100 pointer-events-auto"
                    : "opacity-0 scale-y-0 pointer-events-none"
                }`}
              >
                  {[...yearOptions].reverse().map((year) => (
                    <button
                      key={year}
                      onClick={() => { setSelectedYear(year); setDropdownOpen(false); }}
                      className={`block w-full text-left px-3 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer ${
                        selectedYear === year
                          ? "bg-green-600 dark:bg-green-600 text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {year === "last" ? "Last 12 months" : year}
                    </button>
                  ))}
              </div>
            </div>

            {/* Pill buttons (lg+ screens) */}
            <div
              ref={yearScrollRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block overflow-x-auto scrollbar-none md:custom-scrollbar-gray z-10"
            >
              <div className="flex flex-nowrap gap-2 justify-end w-max ml-auto">
              {yearOptions.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer shrink-0 ${
                    selectedYear === year
                      ? "bg-green-600 dark:bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {year === "last" ? "Last 12 months" : year}
                </button>
              ))}
              </div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto custom-scrollbar-gray">
            <svg
              ref={svgRef}
              width={svgWidth}
              height={svgHeight}
              className="block mx-auto"
              role="img"
              aria-label={`GitHub contribution graph showing ${data.totalContributions} contributions in the last year`}
            >

              {/* Month labels */}
              {monthLabels.map((m, i) => (
                <text
                  key={i}
                  x={m.x}
                  y={12}
                  fill={isDark ? "#9ca3af" : "#6b7280"}
                  fontSize={10}
                  fontFamily="system-ui, sans-serif"
                >
                  {m.label}
                </text>
              ))}

              {/* Day labels */}
              {dayLabels.map((label, i) => (
                <text
                  key={i}
                  x={0}
                  y={topOffset + i * step + cellSize - 2}
                  fill={isDark ? "#9ca3af" : "#9ca3af"}
                  fontSize={10}
                  fontFamily="system-ui, sans-serif"
                >
                  {label}
                </text>
              ))}

              {/* Contribution cells */}
              {data.weeks.map((week, wi) =>
                week.contributionDays.map((day, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={labelOffset + wi * step}
                    y={topOffset + di * step}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    ry={2}
                    className={`${cellsVisible ? "cell-fade-in" : "opacity-0"}`}
                    style={{ fill: colors[day.contributionLevel], cursor: day.date ? "pointer" : "default", transition: "fill 0.3s ease", animationDelay: cellsVisible ? `${wi * 15}ms` : undefined }}
                    onClick={() => {
                      if (!day.date) return;
                      window.open(
                        `https://github.com/search?q=author%3A${username}+committer-date%3A${day.date}&type=commits`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    onMouseEnter={(e) => {
                      if (!day.date) return;
                      const rect = (e.target as SVGRectElement).getBoundingClientRect();
                      const formatted = new Date(day.date + "T00:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                      const count = day.contributionCount;
                      const text = count === 0
                        ? `No contributions on ${formatted}`
                        : `${count} contribution${count !== 1 ? "s" : ""} on ${formatted}`;
                      setTooltip({
                        text,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  />
                ))
              )}

            </svg>
          </div>

          {/* Tooltip (portaled to body to avoid clipping) */}
          {tooltip && createPortal(
            <div
              style={{
                position: "fixed",
                left: tooltip.x,
                top: tooltip.y - 8,
                transform: "translate(-50%, -100%)",
                zIndex: 9999,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  background: isDark ? "rgba(31, 41, 55, 0.55)" : "rgba(255, 255, 255, 0.55)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  color: isDark ? "#fff" : "#1f2937",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "system-ui, sans-serif",
                  whiteSpace: "nowrap",
                  boxShadow: isDark ? "0 2px 8px rgba(0,0,0,0.3)" : "0 2px 8px rgba(0,0,0,0.1)",
                  lineHeight: "1.4",
                }}
              >
                {tooltip.text}
              </div>
            </div>,
            document.body
          )}

          {/* Legend + Stats */}
          <div className="mt-3 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                <span>
                  Longest streak: <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">{longestStreak}</span> days
                </span>
                <span>
                  Active days: <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">{activeDays}</span>
                </span>
                <span className="hidden lg:inline">
                  Avgerage: <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">{avgPerActiveDay}</span> per active day
                </span>
                {busiestDay && busiestDay.contributionCount > 0 && (
                  <span className="hidden sm:inline">
                    Busiest day: <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">{busiestFormatted}</span> ({busiestDay.contributionCount} commits)
                  </span>
                )}
                <span className="hidden md:inline">
                  Most active: <span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">{mostActiveDow}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">
                  Less
                </span>
                {["NONE", "FIRST_QUARTILE", "SECOND_QUARTILE", "THIRD_QUARTILE", "FOURTH_QUARTILE"].map(
                    (level) => (
                        <div
                        key={level}
                        className="w-3 h-3 rounded-sm transition-colors duration-300"
                        style={{ backgroundColor: colors[level] }}
                        />
                    )
                )}
                <span className="text-xs text-gray-400 dark:text-gray-500 transition-colors duration-300">
                  More
                </span>
              </div>
            </div>
            {currentStreak > 0 && (
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">
                <FontAwesomeIcon icon={faFire} className="text-green-500" />
                <span><span className="font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-300">{currentStreak}</span> day streak</span>
                </div>
            )}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}

export default GitHubActivity;
