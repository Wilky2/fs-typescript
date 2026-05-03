import { assertNever, type CoursePart } from "../type";

const Part = ({ course }: { course: CoursePart }) => {
    console.log(course);
    switch (course.kind) {
        case "basic":
            return (
                <section>
                    <h2>{course.name} {course.exerciseCount}</h2>
                    <p>{course.description}</p>
                </section>
            );
        case "group":
            return (
                <section>
                    <h2>{course.name} {course.exerciseCount}</h2>
                    <p>project {course.groupProjectCount > 1 ? 'exercises' : 'exercise'} {course.groupProjectCount}</p>
                </section>
            );
        case "background":
            return (
                <section>
                    <h2>{course.name} {course.exerciseCount}</h2>
                    <p>{course.description}</p>
                    <p>submit to {course.backgroundMaterial}</p>
                </section>
            );
        case "special":
            return (
                <section>
                    <h2>{course.name} {course.exerciseCount}</h2>
                    <p>{course.description}</p>
                    <p>required skills {course.requirements.join(',')}</p>
                </section>
            );
        default:
            return assertNever(course);
    }
};

const Content = ({ courses }: { courses: CoursePart[] }) => {
    console.log(courses);
    return (
        <>
            {courses.map(course => <Part course={course} />)}
        </>
    );
};

export default Content;