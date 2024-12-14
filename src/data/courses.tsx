// src/data/courses.ts

export interface Topic {
    id: number;
    title: string;
    content: string;
  }
  
  export interface Courses {
    [key: string]: Topic[];
  }
  
  export const courses: Courses = {
    ReactJsCourse: [
      { id: 1, title: "Introduction to React", content: "Content for React Introduction" },
      { id: 2, title: "Components", content: "Content for React Components" },
      { id: 3, title: "State and Props", content: "Content for State and Props" },
    ],
    NextJsCourse: [
      { id: 1, title: "Introduction to Next.js", content: "Content for Next.js Introduction" },
      { id: 2, title: "Routing", content: "Content for Next.js Routing" },
      { id: 3, title: "API Routes", content: "Content for API Routes" },
    ],
  };
  