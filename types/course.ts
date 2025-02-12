import { Course } from "@prisma/client";

export interface SerializedCourse {
    name: string;
    id: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
    description: string | null;

}

export interface CourseWithNotesCount extends Course {
    _count: {
        notes: number;
    };
}
