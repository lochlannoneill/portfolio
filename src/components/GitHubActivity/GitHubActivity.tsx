import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FadeInSection from "../../FadeInSection";

const GITHUB_USERNAME = "lochlannoneill";

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
  NONE: "#1e2530",
  FIRST_QUARTILE: "#0e4429",
  SECOND_QUARTILE: "#006d32",
  THIRD_QUARTILE: "#26a641",
  FOURTH_QUARTILE: "#39d353",
};

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function GitHubActivity() {
  const currentYear = new Date().getFullYear();
  // Generate year options: from GitHub join year to current year + "Last 12 months"
  const GITHUB_JOIN_YEAR = 2021;
  const yearOptions: (number | "last")[] = [];
  for (let y = GITHUB_JOIN_YEAR; y <= currentYear; y++) {
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

  // Watch for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
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
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${yearParam}`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();

        // The API returns { total, contributions } where contributions is a date-keyed object
        const contributions: Record<
          string,
          { count: number; level: number }
        > = json.contributions;

        // Build weeks array from the contributions data
        const dates = Object.keys(contributions).sort();
        if (dates.length === 0) throw new Error("No data");

        // Group by weeks (Sunday start)
        const weeks: ContributionWeek[] = [];
        let currentWeek: ContributionDay[] = [];

        // Pad the first week so it starts on Sunday
        const firstDate = new Date(dates[0] + "T00:00:00");
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
        for (const date of dates) {
          const entry = contributions[date];
          total += entry.count;
          currentWeek.push({
            date,
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

  // Compute month labels with their column positions
  const getMonthLabels = () => {
    if (!data) return [];
    const labels: { label: string; col: number }[] = [];
    let lastMonth = -1;

    for (let w = 0; w < data.weeks.length; w++) {
      const days = data.weeks[w].contributionDays;
      for (const day of days) {
        if (!day.date) continue;
        // Parse date parts directly to avoid timezone issues
        const parts = day.date.split("-");
        const month = parseInt(parts[1], 10) - 1; // 0-indexed
        if (month !== lastMonth) {
          labels.push({ label: MONTH_LABELS[month], col: w });
          lastMonth = month;
        }
        break; // only check first valid day per week
      }
    }
    return labels;
  };

  const colors = isDark ? LEVEL_COLORS_DARK : LEVEL_COLORS_LIGHT;

  if (loading) {
    return (
      <section id="github" className="w-full max-w-6xl mx-auto p-4 xl:p-0 scroll-mt-16">
        <FadeInSection>
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-gray-400 dark:text-gray-600 text-lg">
              Loading contributions...
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
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
            >
              View my GitHub profile &rarr;
            </a>
          </div>
        </FadeInSection>
      </section>
    );
  }

  const monthLabels = getMonthLabels();
  const cellSize = 13;
  const cellGap = 3;
  const step = cellSize + cellGap;
  const labelOffset = 30; // space for day labels on the left
  const topOffset = 20; // space for month labels on top
  const svgWidth = labelOffset + data.weeks.length * step;
  const svgHeight = topOffset + 7 * step;

  const dayLabels = ["", "Mon", "", "Wed", "", "Fri", ""];

  return (
    <section id="github" className="w-full max-w-6xl mx-auto scroll-mt-16">
      <FadeInSection>
        <div className="bg-white dark:bg-[#0a0f1f] rounded-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6 transition-colors duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faGithub} className="text-2xl" />
              </a>
              <span className="text-gray-600 dark:text-gray-400 text-sm md:text-base transition-colors duration-300">
                <span className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                  {data.totalContributions.toLocaleString()}
                </span>{" "}
                contributions in {selectedYear === "last" ? "the last year" : selectedYear}
              </span>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 hidden sm:inline"
            >
              @{GITHUB_USERNAME}
            </a>
          </div>

          {/* Year selector */}
          <div
            ref={yearScrollRef}
            className="overflow-x-auto scrollbar-none md:custom-scrollbar-green mb-4"
          >
            <div className="flex flex-nowrap gap-2 justify-end w-max ml-auto">
            {yearOptions.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer shrink-0 ${
                  selectedYear === year
                    ? "bg-green-500 dark:bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700"
                }`}
              >
                {year === "last" ? "Last 12 months" : year}
              </button>
            ))}
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="overflow-x-auto custom-scrollbar-green">
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
                  x={labelOffset + m.col * step}
                  y={12}
                  style={{ fill: isDark ? "#9ca3af" : "#6b7280", fontSize: 11, fontFamily: "system-ui, sans-serif" }}
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
                  style={{ fill: isDark ? "#9ca3af" : "#9ca3af", fontSize: 10, fontFamily: "system-ui, sans-serif" }}
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
                    fill={colors[day.contributionLevel]}
                    className="transition-colors duration-300"
                    style={{ cursor: day.date ? "pointer" : "default" }}
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
                  background: isDark ? "#1f2937" : "#24292f",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontFamily: "system-ui, sans-serif",
                  whiteSpace: "nowrap",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  lineHeight: "1.4",
                }}
              >
                {tooltip.text}
              </div>
            </div>,
            document.body
          )}

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-3">
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
      </FadeInSection>
    </section>
  );
}

export default GitHubActivity;
