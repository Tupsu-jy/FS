import Numberline from "./Numberline"

const Numbers = (props) => {

    return (
        <>
            <h2>Numbers</h2>
            {props.persons.map((person) => <Numberline person={person} removeNumber={props.removeNumber} />)}
        </>
    )
}

export default Numbers