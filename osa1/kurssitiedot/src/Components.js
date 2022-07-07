
const Part = (props) => {
    return <p>{props.part} {props.exercises}</p>
}

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Content = (props) => {

    return (
        <>
            {props.course.parts.map((part) => <Part key={part.name} part={part.name} exercises={part.exercises} />)}
        </>
    )
}

const Total = (props) => {
    return <p>Number of exercises {props.sum}</p>
}


export { Header, Content, Total }