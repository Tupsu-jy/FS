const Simple = (props) => {

    return (
        <li>
            {props.country.name.common}
            <button onClick={() => props.clickDetails(props.country)} >show details</button>
        </li>
    )
}

export default Simple