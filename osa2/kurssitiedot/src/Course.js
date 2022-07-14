import { Header, Content, Total } from "./Components"

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content course={course} />
            <Total sum={course.parts.reduce((previousValue, currentValue) => { return previousValue + currentValue.exercises }, 0)} />
        </div >
    )
}

export default Course