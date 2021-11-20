import {Rating} from "./rating";
import {Instructor} from "./instructor";

export interface Course {
  courseId: number
  title: string
  shortDescription: string
  longDescription: string | null
  language: string
  courseUri: string
  imageUri: string
  duration: string
  enrolledStudentsCount: string | null
  lastUpdated: string | null
  targetAudiences: string[]
  tags: string[] | null
  rating: Rating | null
  instructors: Instructor[] | null
}
