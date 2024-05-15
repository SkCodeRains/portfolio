import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-me-full',
  standalone: true,
  imports: [NgbProgressbarModule],
  templateUrl: './about-me-full.component.html',
  styleUrl: './about-me-full.component.scss'
})
export class AboutMeFullComponent {
  details: { title: string, info: string }[] = [
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
      title: "Passion",
      info: `
      I'm a passionate and results-oriented full-stack web developer with a strong
                        desire to create user-friendly and visually appealing web applications. I enjoy working on both
                        the front-end (user interface) and back-end (server-side) aspects of web development, which
                        allows me to bring a holistic perspective to every project I undertake.
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
    }
  ]
    ;

  constructor(private router: Router) { }  // Inject Router in constructor

  goto() {
    this.router.navigate(['home'], { skipLocationChange: true });
  }

  skills: { name: string, source: string }[] = [
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
      name: "Docker",
      source: "icons8-docker.svg"
    }, {
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
    }, {
      name: "Git",
      source: "icons8-git.svg"
    }, {
      name: "SQL",
      source: "icons8-sql-48.png"
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
  ]

}
