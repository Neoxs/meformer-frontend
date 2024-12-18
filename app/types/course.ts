// app/types/course.ts
export interface Course {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    instructor: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    topics: string[];
    content: CourseContent[];
  }
  
  export interface CourseContent {
    id: string;
    title: string;
    type: 'video' | 'document' | 'quiz';
    duration?: string;
    completed?: boolean;
  }