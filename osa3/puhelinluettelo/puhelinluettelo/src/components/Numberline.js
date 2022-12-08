
const Numberline = (props) => {

    return (
        <>
            <p> {props.person.name} {props.person.number}</p>
            <button onClick={() => props.removeNumber(props.person.id)}>DELETE</button>
        </>
    )
}

export default Numberline