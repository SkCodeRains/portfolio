import { Injectable } from '@angular/core';
import { IProjects } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private _scrollAmount: number = 0;
  projects: Array<IProjects> = getProjects();
  public get scrollAmount(): number {
    return this._scrollAmount;
  }
  public set scrollAmount(value: number) {
    this._scrollAmount = value;
  }

  constructor() { }
  private _details: { title: string; info: string; }[] = [
    {
      title: "About Me",
      info: `A resilient and ambitious individual. Graduating in 2020, I bring a wealth
    of knowledge and experiences. My journey showcases perseverance and a commitment to growth. I'm
    passionate about making a difference and believe in the limitless potential of the human spirit.
    Let's connect and explore opportunities together.
    Having 2 years of experience in web devolvement, not only that have worked as electrician about 4 years handling 5 technician teams.
    `
    },
    {
      title: "History",
      info: `After graduating in 2020, I embarked on a journey of continuous learning, immersing myself in
      various technologies such as Angular, Java, Spring Boot, MySQL, and Oracle DB. In
      November 2021 ,
      I secured a position as a full-stack developer at OSI Systems in
      Hyderabad, where I worked
      extensively with Angular, Java, Spring Boot, PostgreSQL, Docker, Jenkins, and more. However, in
      October 2023, I made the decision to resign from my position, ready to explore new opportunities
      and challenges.`
    },
    {
      title: "Passion",
      info: `
      I'm a passionate and results-oriented full-stack web developer with a strong
                        desire to create user-friendly and visually appealing web applications. I enjoy working on both
                        the front-end (user interface) and back-end (server-side) aspects of web development, which
                        allows me to bring a holistic perspective to every project I undertake.
                        `
    },

  ];
  public get details(): { title: string; info: string; }[] {
    return this._details;
  }
  private _skills: { name: string; source: string; }[] = [
    {
      name: "angular",
      source: "angular.ico"
    },
    {
      name: "spring boot",
      source: "icons8-spring-boot.svg"
    },
    {
      name: "Java",
      source: "java.svg"
    },
    {
      name: "HTML/CSS",
      source: "html.svg"
    }, {
      name: "Git",
      source: "icons8-git.svg"
    },
    {
      name: "SQL",
      source: "icons8-sql-48.png"
    },
    {
      name: "MYSQL",
      source: "icons8-mysql-48.png"
    },
    {
      name: "PostgreSQL",
      source: "icons8-postgres.svg"
    },
    {
      name: "MongoDB",
      source: "icons8-mongodb.svg"
    },
    {
      name: "JavaScript",
      source: "icons8-javascript.svg"
    },
    {
      name: "Docker",
      source: "icons8-docker.svg"
    },
    {
      name: "Micro-Services",
      source: "img.icons8.svg"
    },

    {
      name: "AWS",
      source: "icons8-aws.svg"
    },
    {
      name: "Spring Cloud",
      source: "spring-cloud.svg"
    },
    {
      name: "Node Js ",
      source: "icons8-nodejs.svg"
    },
    {
      name: "Jenkins",
      source: "icons8-jenkins.svg"
    },

    {
      name: "Rest API",
      source: "icons8-rest-api-48.png"
    },
    {
      name: "React",
      source: "icons8-react-native.svg"
    },
    {
      name: "Angular Material",
      source: "angular-material-logo.svg"
    },
    {
      name: "Bootstrap 5",
      source: "icons8-bootstrap-40.png"
    },
  ];
  public get skills(): { name: string; source: string; }[] {
    return this._skills;
  }
}
function getProjects(): IProjects[] {
  return [
    {
      links: [
        {
          icon: 'bi-github',
          link: 'https://github.com/SkCodeRains/task-management',
          title: 'GitHub'
        },
        {
          icon: 'bi-box-arrow-up-right',
          link: 'https://skcoderains.github.io/task-management/',
          title: 'Host Link'
        }
      ],
      skills: [{
        name: "angular",
        source: "angular.ico",
        subTech: ["HTML", "CSS", "SCSS", "JAVASCRIPT", "TYPESCRIPT", "CLI"]
      },
      {
        name: "spring boot",
        source: "icons8-spring-boot.svg",
        subTech: ["JAVA", "SPRING", "SECURITY", "OAUTH", "MVC", "SPRING FRAMEWORK"]
      },
      {
        name: "PostgreSQL",
        source: "icons8-postgres.svg",
        subTech: ["SQL", "PLSQL"]
      },
      {
        name: "JavaScript",
        source: "icons8-javascript.svg"
      },
      {
        name: "Node Js",
        source: "icons8-nodejs.svg",
        subTech: ["EXPRESS", "NPM"]
      },
      {
        name: "Rest API",
        source: "icons8-rest-api-48.png"
      },
      {
        name: "Micro-Services",
        source: "img.icons8.svg"
      },
      {
        name: "MongoDB",
        source: "icons8-mongodb.svg",
        "subTech": ["NOSQL"]
      },
      {
        name: "Git",
        source: "icons8-git.svg"
      }
      ],
      title: 'Task Management',
      description: 'The Task Management application is a robust solution designed to help users efficiently manage their tasks. Built with Angular for the frontend, the application boasts two backend servers: one powered by Spring Boot with MySQL, and the other by Node.js with Express.js using MongoDB. The system ensures secure user authentication and provides a seamless user experience across devices.',
      imagesDirectory: "task-management",
      numberOfImages: 8
    },
    {
      links: [
        {
          icon: 'bi-github',
          link: 'https://github.com/SkCodeRains/pics-anime',
          title: 'GitHub'
        },
        {
          icon: 'bi-box-arrow-up-right',
          link: 'https://skcoderains.github.io/pics-anime/',
          title: 'Host Link'
        }
      ],
      skills: [{
        name: "angular",
        source: "angular.ico"
      },
      {
        name: "HTML/CSS",
        source: "html.svg"
      },
      {
        name: "JavaScript",
        source: "icons8-javascript.svg"
      },
      {
        name: "Rest API",
        source: "icons8-rest-api-48.png"
      },
      {
        name: "Bootstrap 5",
        source: "icons8-bootstrap-40.png"
      },
      ],
      title: 'Anime Pics',
      description: 'The application is based on consuming third party api for getting the urls of anime pictures and support filtering the types of the animes,  ',
      imagesDirectory: "resume-builder",
      numberOfImages: 1
    },
    {
      links: [
        {
          icon: 'bi-github',
          link: 'https://github.com/SkCodeRains/resume_builder',
          title: 'GitHub'
        },
        {
          icon: 'bi-box-arrow-up-right',
          link: 'https://skcoderains.github.io/resume_builder/',
          title: 'Host Link'
        }
      ],
      skills: [{
        name: "angular",
        source: "angular.ico"
      },
      {
        name: "HTML/CSS",
        source: "html.svg"
      },
      {
        name: "JavaScript",
        source: "icons8-javascript.svg"
      },
      {
        name: "Bootstrap 5",
        source: "icons8-bootstrap-40.png"
      },
      ],
      title: 'My Resume',
      description: 'The Resume Application is a dynamic, interactive platform designed for creating and customizing professional resumes. The application is built using Angular, HTML, CSS, JavaScript, and Bootstrap, with a focus on generating A4-sized resumes for print and digital use. The interface is fully responsive, ensuring optimal viewing across various devices.',
      imagesDirectory: "resume-builder",
      numberOfImages: 1
    },

  ]
}

