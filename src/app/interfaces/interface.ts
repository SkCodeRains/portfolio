export interface IProjects {

    links: Array<IProjectsLinks>;
    skills: Array<ISkills>
    title: string,
    description: string,
    numberOfImages: number,
    imagesDirectory: string,
}

export interface IProjectsLinks {
    icon: string;
    link: string;
    title: string
}

export interface ISkills {
    name: string,
    source: string,
    checked?: boolean
}