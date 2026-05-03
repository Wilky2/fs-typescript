import type { CoursePart } from "../type";

const Total = ({ courses }: { courses: CoursePart[] }) => {
    console.log(courses);
    const totalExercises = courses.reduce((sum, part) => sum + part.exerciseCount, 0);
    return (
        <p>Number of exercises {totalExercises}</p>
    );
};

export default Total;