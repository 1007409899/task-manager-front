export interface Task {
   _id: number;
   title: string;
   completed: boolean;
   people: Person;
}

export interface Person {
  fullName: string;
  age: number;
  skills: Skill[];
}

interface Skill {
  skillName: string;
}
