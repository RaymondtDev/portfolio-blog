import { useParams } from "react-router-dom";
import MessageForm from "./MessageForm";
import { projects } from "../../data/projects";
import ParallaxHero from "../../components/ParallaxHero";
import Button from "../../components/ux/Button";

function ProjectPage() {
  const { slug } = useParams();

  const project = projects.find((projects) => projects.slug === slug);

  return (
    <div className="full-width grid-layout">
      <ParallaxHero image={project.heroImage.src} />
      <section
        className="bg-gray-200 full-width-content py-10 sm:text-center"
        id="overview"
      >
        <h2
          className="text-[var(--text-color)]"
          style={{ marginBottom: "20px" }}
        >
          {project.title}
        </h2>
        <div
          dangerouslySetInnerHTML={{ __html: project.overview }}
          className="md:w-[50vw] md:mx-auto"
        ></div>
        <div className="flex justify-center gap-4">
          {project.link && (
            <Button
              className="bg-[var(--btn-color)] text-white"
              link={project.link}
              target="_blank"
            >
              Live Demo
            </Button>
          )}
          <Button
            className="bg-gray-200 text-[var(--text-color)]"
            link={project.githubLink}
            target="_blank"
          >
            Github
          </Button>
        </div>
      </section>
      <section className="full-width grid-layout h-fit bg-[var(--primary-color)] grid-rows-[repeat(2, auto)] place-content-center py-10">
        <div
          className="left
        "
        >
          <div>
            <h2 className="text-[var(--text-color)]">
              Interested? <br /> Feel free to reach out!
            </h2>
            <p className="text-[var(--secondary-text-color)]">
              I'm looking forward to hearing from you. Let's build something
              amazing together!
            </p>
          </div>
        </div>
        <div className="right col-span-[-8/-2]">
          <MessageForm />
        </div>
      </section>
    </div>
  );
}

export default ProjectPage;
