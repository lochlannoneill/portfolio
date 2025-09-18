function Skills() {
  const skills = [
    "Java",
    "Python",
    "C#",
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "Tailwind",
    "SQL",
    "NoSQL",
    "Quarkus",
    "Spring Boot",
    "Kubernetes",
    "Docker",
    "React.js",
    "Express.js",
    "Node.js",
    "MongoDB",
    "Git",
    "Azure",
    "AWS"
  ];

  return (
  <section className="rounded-lg">
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <li
            key={idx}
            className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-blue-300 dark:hover:bg-blue-800 transition-colors duration-300"
          >
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Skills;