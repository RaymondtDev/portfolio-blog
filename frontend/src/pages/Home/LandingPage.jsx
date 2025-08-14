import { useEffect, useState } from "react";
import Button from "../../components/ux/Button";
import SkillCard from "../../components/SkillCard";
import Card from "../../components/Card";
import CarouselSection from "../../components/CarouselSection";
import MessageForm from "./MessageForm";
import { getBlogPosts } from "../../api/blogapi";
import BlogPostCard from "../../components/BlogPostCard";
import { projects } from "../../data/projects";

function LandingPage() {

  const [latestPosts, setLatestPosts] = useState();
  const mySkills = [
    { name: "HTML", iconUrl: "/icons/html.svg" },
    { name: "CSS", iconUrl: "/icons/css.svg" },
    { name: "Javascript", iconUrl: "/icons/javascript.svg" },
    { name: "TailwindCSS", iconUrl: "/icons/tailwind.svg" },
    { name: "WordPress", iconUrl: "/icons/wordpress.svg"},
    { name: "React", iconUrl: "/icons/react.svg" },
    { name: "ExpressJs", iconUrl: "/icons/expressjs.svg"},
    { name: "MongoDB", iconUrl: "/icons/mongodb.svg"},
    { name: "Python", iconUrl: "/icons/python.svg"},
    { name: "PHP", iconUrl: "/icons/php.svg"},
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogPosts();
        setLatestPosts(response.data);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    }

    fetchPosts();
  }, [])

  return (
    <>
      <section className="hero overlay prose max-w-none h-svh full-width text-center flex flex-col justify-center items-center">
        <h1 className="text-[var(--text-color)] text-[clamp(2.25rem,3.75rem,6rem)] text">Hey There, I'm Raymond</h1>
        <p className="text-gray-300 py-5 w-[clamp(20rem, 20vw, 40rem)]">
          I'm a software engineer with a passion for building web applications.
          I love creating intuitive and user-friendly interfaces that make the
          web a better place.
        </p>
        <a href="#projects" className="bg-[var(--btn-color)] text-[var(--secondary-text-color)] rounded-md w-fit py-2 px-4">Projects</a>
      </section>
      <section className="full-width bg-gray-200 grid-layout grid-rows-[repeat(2, auto)] pt-10 pb-16">
        <div className="left gap-5">
          <h2 className="text-[var(--text-color)]">About me</h2>
          <p>
            I am a software engineer with a focus on web development. I enjoy
            working with modern technologies and frameworks to create efficient
            and scalable applications. My goal is to continuously learn and
            improve my skills while contributing to meaningful projects.
          </p>
        </div>
        <div className="right gap-5">
          <h2 className="text-[var(--text-color)]">My skills</h2>
          <div className="flex flex-wrap gap-3 h-fit skills">
            { mySkills.map((skill,index) => {
              return <SkillCard icon={skill.iconUrl} name={skill.name} key={index}/>
            })}
          </div>
        </div>
      </section>
      <CarouselSection sectionName="Projects" id="projects" additionalClasses="bg-gray-100 py-12">
        { projects.map((project) => (
          <Card background={project.heroImage.src} key={project.id}>
            <div className="w-full h-fit flex absolute bottom-0 justify-center gap-10 pb-2.5 pt-4 bg-linear-to-t from-black/40 to-black/0 rounded-b-md">
              <Button className="bg-[var(--btn-color)] text-white px-4" link={`/project/${project.slug}`}>More</Button>
              <Button className="bg-gray-200" link={project.githubLink} target="_blank">Github</Button>
            </div>
          </Card>
        )) }
      </CarouselSection>
      <section className="full-width grid-layout h-fit bg-[var(--primary-color)] grid-rows-[repeat(2, auto)] place-content-center py-10" id="contact">
        <div className="left
        ">
          <div>
            <h2 className="text-[var(--text-color)]">Interested? <br /> Feel free to reach out!</h2>
            <p className="text-[var(--secondary-text-color)]">I'm looking forward to hearing from you. Let's build something amazing together!</p>
          </div>
        </div>
        <div className="right col-span-[-8/-2]">
          <MessageForm />
        </div>
      </section>
      <CarouselSection sectionName="Blog Posts" id="latest-blog-posts" additionalClasses="bg-gray-100 py-10">
        { latestPosts?.slice(0,5).map((post) => (
          <BlogPostCard post={post} key={post._id} />
        )) }
      </CarouselSection>
    </>
  );
}

export default LandingPage;