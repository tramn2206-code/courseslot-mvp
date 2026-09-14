export type CourseData = {
  id: string;
  courseCode: string;
  courseName: string;
  classCode: string;
  credits: number;
  capacity: number;
  enrolled: number;
  availableSeats: number;
  status: 'Full' | 'Available' | 'Paused';
  registrationUrl: string;
};

export const initialMockCourses: CourseData[] = [
  {
    id: "c1",
    courseCode: "LOG101",
    courseName: "Introduction to Logistics",
    classCode: "LOG01",
    credits: 3,
    capacity: 60,
    enrolled: 60,
    availableSeats: 0,
    status: "Full",
    registrationUrl: "https://portal.ut.edu.vn"
  },
  {
    id: "c2",
    courseCode: "SCM202",
    courseName: "Supply Chain Management",
    classCode: "SCM02",
    credits: 3,
    capacity: 50,
    enrolled: 50,
    availableSeats: 0,
    status: "Full",
    registrationUrl: "https://portal.ut.edu.vn"
  }
];