// app/utils/mockData.ts

import { Course, CourseContent } from "../types/course";


export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Mathematics',
    description: 'Master the fundamentals of mathematics including algebra, geometry, and trigonometry. Perfect for students looking to build a strong foundation in mathematical concepts.',
    thumbnail: '/math-course.jpg',
    instructor: 'Dr. Sarah Smith',
    duration: '10 hours',
    level: 'Beginner',
    topics: [
      'Basic Algebra',
      'Linear Equations',
      'Geometry Basics',
      'Introduction to Trigonometry',
      'Problem Solving Techniques'
    ],
    content: [
      {
        id: 'c1',
        title: 'Introduction to Algebra',
        type: 'video',
        duration: '45 min',
        completed: false
      },
      {
        id: 'c2',
        title: 'Solving Linear Equations',
        type: 'video',
        duration: '50 min',
        completed: false
      },
      {
        id: 'c3',
        title: 'Quiz 1: Algebra Basics',
        type: 'quiz',
        completed: false
      }
    ]
  },
  {
    id: '2',
    title: 'Physics Fundamentals',
    description: 'Explore the basic principles of physics, from mechanics to energy conservation. This course provides hands-on examples and practical applications.',
    thumbnail: '/physics-course.jpg',
    instructor: 'Prof. Michael Johnson',
    duration: '12 hours',
    level: 'Intermediate',
    topics: [
      'Mechanics',
      'Newton\'s Laws',
      'Energy and Work',
      'Momentum',
      'Simple Machines'
    ],
    content: [
      {
        id: 'c4',
        title: 'Understanding Force',
        type: 'video',
        duration: '55 min',
        completed: false
      },
      {
        id: 'c5',
        title: 'Newton\'s Laws in Action',
        type: 'document',
        completed: false
      }
    ]
  },
  {
    id: '3',
    title: 'Chemistry Basics',
    description: 'Learn the essential concepts of chemistry, including atomic structure, chemical bonding, and reactions.',
    thumbnail: '/chemistry-course.jpg',
    instructor: 'Dr. Emily Chen',
    duration: '8 hours',
    level: 'Beginner',
    topics: [
      'Atomic Structure',
      'Periodic Table',
      'Chemical Bonding',
      'Basic Reactions',
      'Lab Safety'
    ],
    content: [
      {
        id: 'c6',
        title: 'Introduction to Atoms',
        type: 'video',
        duration: '40 min',
        completed: false
      },
      {
        id: 'c7',
        title: 'Practice Problems',
        type: 'quiz',
        completed: false
      }
    ]
  },
  {
    id: '4',
    title: 'Advanced Biology',
    description: 'Dive deep into biological systems and processes, from cellular biology to ecosystems.',
    thumbnail: '/biology-course.jpg',
    instructor: 'Prof. David Wilson',
    duration: '15 hours',
    level: 'Advanced',
    topics: [
      'Cell Biology',
      'Genetics',
      'Evolution',
      'Ecology',
      'Human Anatomy'
    ],
    content: [
      {
        id: 'c8',
        title: 'Cell Structure',
        type: 'video',
        duration: '60 min',
        completed: false
      },
      {
        id: 'c9',
        title: 'Genetics Basics',
        type: 'document',
        completed: false
      }
    ]
  },
  {
    id: '5',
    title: 'English Literature',
    description: 'Explore classic and contemporary literature while developing critical analysis skills.',
    thumbnail: '/literature-course.jpg',
    instructor: 'Dr. Amanda Brown',
    duration: '10 hours',
    level: 'Intermediate',
    topics: [
      'Literary Analysis',
      'Classical Literature',
      'Poetry',
      'Modern Fiction',
      'Writing Techniques'
    ],
    content: [
      {
        id: 'c10',
        title: 'Introduction to Literary Analysis',
        type: 'video',
        duration: '45 min',
        completed: false
      },
      {
        id: 'c11',
        title: 'Writing Exercise',
        type: 'quiz',
        completed: false
      }
    ]
  }
];

export const getRandomCourses = (count: number): Course[] => {
  const shuffled = [...mockCourses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getRecommendedCourses = (currentCourseId: string): Course[] => {
  return mockCourses
    .filter(course => course.id !== currentCourseId)
    .slice(0, 3);
};

export const getPopularCourses = (): Course[] => {
  return getRandomCourses(3);
};