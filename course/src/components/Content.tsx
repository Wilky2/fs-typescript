import type { Course } from "../type";

const Part = ({ course }: { course: Course }) => {
    console.log(course);
    return (
        <p>
            {course.name} {course.exerciseCount}
        </p>
    );
};

const Content = ({ courses }: { courses: Course[] }) => {
    console.log(courses);
    return (
        <>
            {courses.map(course => <Part course={course} />)}
        </>
    );
};

export default Content;