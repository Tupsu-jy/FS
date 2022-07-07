
const Button = (props) => {
    return <button onClick={props.handler}>{props.name}</button>
}

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Anecdote = (props) => {
    return (
        <>
            <p>{props.anecdote}</p>
            <p>has {props.votes} votes</p>
        </>
    )
}

export { Header, Button, Anecdote }