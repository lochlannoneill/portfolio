import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpRightFromSquare,
  faFilePdf,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons";

//Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Greaves
import greavesHome from "../../assets/projects/greaves/home.png";
import greavesProduct from "../../assets/projects/greaves/product.png";
import greavesCart from "../../assets/projects/greaves/cart.png";

// Cloud Automation (AWS)
import awsAmiList from "../../assets/projects/aws/ami_list.png";
import awsAwsBackground from "../../assets/projects/aws/aws_background.png";
import awsBucketList from "../../assets/projects/aws/bucket_list.png";
import awsInstanceList from "../../assets/projects/aws/instance_list.png";
import awsMetricsGet from "../../assets/projects/aws/metrics_get.png";
import awsSnapshotList from "../../assets/projects/aws/snapshot_list.png";
import awsTableList from "../../assets/projects/aws/table_list.png";
import awsVolumeList from "../../assets/projects/aws/volume_list.png";

// Unity Game
import unityBlendTree from "../../assets/projects/unity/blend_tree.png";
import unityCamera from "../../assets/projects/unity/camera.png";
import unityFalling from "../../assets/projects/unity/falling.png";
import unityInteraction from "../../assets/projects/unity/interaction.png";
import unityKanbanBoard from "../../assets/projects/unity/kanban_board.png";
import unityLighting from "../../assets/projects/unity/lighting.png";
import unityMovement from "../../assets/projects/unity/movement.png";
import unityTesting from "../../assets/projects/unity/testing.png";

// Enrollment System (Spring)
import springAop from "../../assets/projects/spring/aop.png";
import springHttpGetDepartments from "../../assets/projects/spring/http_get_departments.png";
import springTests from "../../assets/projects/spring/tests.png";

// Containerization (Docker)
import dockerDockerHub from "../../assets/projects/docker/dockerHub.png";
import dockerOutput from "../../assets/projects/docker/output.png";
import dockerPrometheus from "../../assets/projects/docker/prometheus.png";

// Group Project (Defold)
import defoldAnimationKey from "../../assets/projects/defold/animation_key.png";
import defoldArtPlayer2 from "../../assets/projects/defold/art_player2.png";
import defoldAssets from "../../assets/projects/defold/assets.png";
import defoldCamera from "../../assets/projects/defold/camera.png";
import defoldDiscord from "../../assets/projects/defold/discord.png";
import defoldKanban from "../../assets/projects/defold/kanban.png";
import defoldLevel3 from "../../assets/projects/defold/level3.png";
import defoldPlanner from "../../assets/projects/defold/Planner.png";
import FadeInSection from "../../FadeInSection";

function Projects() {
  const LOADED_MORE_PROJECT_COUNT = 3;
  const [visibleCount, setVisibleCount] = useState(LOADED_MORE_PROJECT_COUNT);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const projects = [
    {
      id: 1,
      name: "E-commerce Store",
      tags: [
        "Azure",
        "React.js",
        "MongoDB",
        "Express.js",
        "HTML",
        "CSS",
        "JavaScript",
        "Cloudflare",
      ],
      links: {
        github: "https://github.com/lochlannoneill/Greaves",
        website: "https://greaves.pages.dev/",
      },
      description:
        "An intuitive full-stack e-commerce platform, developed using the MERN and Azure blob storage. Featuring a responsive frontend built with React, following modern UX design principles, and a backend API powered by Express for seamless communication between the frontend and database. Hosted on Cloudflare.",
      images: [greavesHome, greavesProduct, greavesCart],
    },
    {
      id: 2,
      name: "Cloud Automation",
      tags: [
        "AWS",
        "Python(boto3)",
        "EC2",
        "EBS",
        "S3",
        "CloudWatch",
        "DynamoDB",
      ],
      links: { github: "https://github.com/lochlannoneill/COMP9076-AWS" },
      description:
        "A Python 3 CLI application designed to automate the management of various AWS services using the Boto3 SDK. Providing a simple menu-driven interface to handle common tasks across EC2, EBS, S3, CloudWatch, and DynamoDB without needing to access the AWS Management Console manually.",
      images: [
        awsAmiList,
        awsAwsBackground,
        awsBucketList,
        awsInstanceList,
        awsMetricsGet,
        awsSnapshotList,
        awsTableList,
        awsVolumeList,
      ],
    },
    {
      id: 3,
      name: "Unity Game",
      tags: ["C#", "Unity", "Blender", "LaTeX", "Photoshop"],
      links: {
        github: "https://github.com/lochlannoneill/INTR8016-Unity",
        youtube:
          "https://www.youtube.com/watch?v=FLddmNlQsmI&ab_channel=LochlannONeill",
        pdf: "https://drive.google.com/file/d/1BhyH0ZYfyij9_DidtuW9Glae_oQekhwR/view",
      },
      description:
        "Final Year Project involving the culmination of a full game development pipeline, from concept art and 3D modeling to game logic, and final presentation. It demonstrates skills in Unity game development, C# programming, 3D asset integration, project management, and multimedia presentation.",
      images: [
        unityBlendTree,
        unityCamera,
        unityFalling,
        unityInteraction,
        unityKanbanBoard,
        unityLighting,
        unityMovement,
        unityTesting,
      ],
    },
    {
      id: 4,
      name: "Enrollment System",
      tags: ["Java", "SpringBoot", "Maven", "REST", "H2", "SQL", "Lombok"],
      links: {
        github: "https://github.com/lochlannoneill/SOFT8020-SpringBoot",
      },
      description:
        "Developed a school enrollment system using Spring Boot, Java, and Spring Data JPA with secure RESTful APIs and authentication. Integrated H2 in-memory database, and unit testing with MockMVC. Supports department and office management, including CRUD operations. Endpoint testing via Postman.",
      images: [springAop, springHttpGetDepartments, springTests],
    },
    {
      id: 5,
      name: "Containerization",
      tags: [
        "Python",
        "Docker",
        "Kubernetes",
        "gRPC",
        "Redis",
        "RabbitMQ",
        "Prometheus",
      ],
      links: {
        github: "https://github.com/lochlannoneill/SOFT8026-Docker",
        youtube:
          "https://www.youtube.com/watch?v=4SQjoHe9W34&ab_channel=LochlannONeill",
      },
      description:
        "Containerized microservices using Docker, gRPC, Redis, RabbitMQ, and Prometheus. Inter-service communication via gRPC, caching through Redis, and messaging with RabbitMQ. Prometheus is used for monitoring, all orchestrated with Docker Compose for easy deployment and scaling.",
      images: [dockerDockerHub, dockerOutput, dockerPrometheus],
    },
    {
      id: 6,
      name: "Group Project",
      tags: ["Lua", "Defold", "Agile"],
      links: {
        github:
          "https://github.com/lochlannoneill/SOFT8009-GameDevelopment-Group",
        pdf: "https://docs.google.com/document/d/1LDDofAmBIzmuovxZfRPw5pQWtj--uftGkp9igMtl8As/edit?tab=t.0",
      },
      description:
        'A two-player puzzle-platformer "Left Unsupervised" where players, as Redwin and Belvin, must cooperate to escape a trap-filled lair. Built by a team of four using agile methods, the game emphasizes coordination, timing, and problem-solving. It features top-down gameplay, hand-drawn Piskel art, and hazards like turrets and ghosts, with levels designed using MDA principles and iterative prototyping.',
      images: [
        defoldAnimationKey,
        defoldArtPlayer2,
        defoldAssets,
        defoldCamera,
        defoldDiscord,
        defoldKanban,
        defoldLevel3,
        defoldPlanner,
      ],
    },
  ];

  // Intersection Observer to load more projects when scrolled to the bottom
  useEffect(() => {
    if (visibleCount >= projects.length) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + LOADED_MORE_PROJECT_COUNT, projects.length));
            setLoading(false);
          }, 700); // Simulate loading delay
        }
      },
      { threshold: 0.1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleCount, projects.length, loading]);

  return (
    <section
      id="projects"
      className="w-full max-w-6xl mx-auto p-4 xl:p-0 scroll-mt-16"
    >
      <FadeInSection>
        <h2 className="block lg:hidden text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
          Projects
        </h2>
      </FadeInSection>

      <ul className="flex flex-col md:gap-12">
        {projects.slice(0, visibleCount).map((project, idx) => (
          <FadeInSection key={project.id}>
            {/* Each project */}
            <li className="rounded-lg">
              <div
                className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                  idx % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Text Section */}
                <div className="w-full md:w-[45%] min-w-0">
                  <h2 className="font-semibold text-gray-900 dark:text-gray-200 text-xl md:text-2xl transition-colors duration-300">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-2 my-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-full text-xs md:text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 transition-colors duration-300">{project.description}</p>

                  {/* Project Links — desktop/tablet */}
                  {project.links && (
                    <div className="hidden md:flex gap-3 mt-2 justify-center md:justify-start">
                      {Object.entries(project.links).map(([type, url]) => {
                        const icon =
                          type === "github"
                            ? faGithub
                            : type === "website"
                            ? faArrowUpRightFromSquare
                            : type === "youtube"
                            ? faYoutube
                            : type === "pdf"
                            ? faFilePdf
                            : faArrowUpRightFromSquare;

                        const hoverClass =
                          type === "website"
                            ? "hover:text-blue-600"
                            : type === "youtube"
                            ? "hover:text-red-600"
                            : type === "pdf"
                            ? "hover:text-orange-500"
                            : "hover:text-purple-700";

                        return (
                          <a
                            key={type}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-2xl text-gray-700 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-md px-3 py-2 hover:scale-105 ${hoverClass} transition-all duration-300`}
                            style={!document.documentElement.classList.contains('dark') ? { boxShadow: 'inset 0 2px 8px 0 rgba(0,0,0,0.10), inset 0 2px 12px 0 rgba(0,0,0,0.18)' } : {}}
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                          >
                            <FontAwesomeIcon icon={icon} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Images Section (Swiper Carousel) */}
                <div className="flex-shrink-0 w-full md:w-[55%] min-w-0">
                  <div className="h-48 md:h-72 lg:h-96 bg-gray-100 rounded-lg overflow-hidden relative
                                  [&_.swiper-pagination-bullets]:!bottom-2 [&_.swiper-pagination-bullets]:!top-auto">
                    {Array.isArray(project.images) && project.images.length > 0 ? (
                      <Swiper
                        modules={[Pagination, A11y, Autoplay, Keyboard]}
                        slidesPerView={1}
                        loop
                        spaceBetween={12}
                        pagination={{ clickable: true }}
                        keyboard={{ enabled: true }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        className="h-full w-full"
                      >
                        {project.images.map((src, i) => (
                          <SwiperSlide key={i} className="flex items-center justify-center">
                            <img
                              src={src}
                              alt={`${project.name} screenshot ${i + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Project Links — mobile under images */}
                  {project.links && (
                    <div className="flex md:hidden gap-3 mt-6 justify-center">
                      {Object.entries(project.links).map(([type, url]) => {
                        const icon =
                          type === "github"
                            ? faGithub
                            : type === "website"
                            ? faArrowUpRightFromSquare
                            : type === "youtube"
                            ? faYoutube
                            : type === "pdf"
                            ? faFilePdf
                            : faArrowUpRightFromSquare;

                        const hoverClass =
                          type === "website"
                            ? "hover:text-blue-600"
                            : type === "youtube"
                            ? "hover:text-red-600"
                            : type === "pdf"
                            ? "hover:text-orange-500"
                            : "hover:text-purple-700";

                        return (
                          <a
                            key={type}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-2xl text-gray-600 bg-gray-100 dark:bg-gray-800 rounded-md px-3 py-2 hover:scale-105 ${hoverClass} transition-colors duration-300`}
                            title={type.charAt(0).toUpperCase() + type.slice(1)}
                          >
                            <FontAwesomeIcon icon={icon} />
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </li>
            {/* Horizontal divider on mobile */}
            {idx < visibleCount - 1 && (
              <hr className="block md:hidden border-t border-gray-100 dark:border-gray-800 my-8 w-11/12 mx-auto transition-colors duration-300" />
            )}
          </FadeInSection>
        ))}
      </ul>
      {/* Sentinel for infinite scroll */}
      {visibleCount < projects.length && (
        <div ref={loadMoreRef} className="h-12 flex items-center justify-center m-8">
          {loading && (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              className="text-gray-400 dark:text-gray-500 text-5xl transition-colors duration-300"
              title="Loading more projects..."
            />
          )}
        </div>
      )}
    </section>
  );
}

export default Projects;
