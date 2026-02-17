function Skills() {
  const skills = [
    "C#",
    "Java",
    "Python",
    "React",
    "Azure",
  ];

  return (
  <section className="rounded-lg">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2> */}
      <ul className="flex flex-wrap gap-2 justify-center">
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