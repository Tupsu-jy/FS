
const Button = (props) => {
    return <button onClick={props.handler}>{props.name}</button>
}

const Header = (props) => {
    return <h1>{props.name}</h1>
}

const Statistic = (props) => {
    if (props.stats[3][1] !== 0) {
        return (
            <table>
                <tbody>
                    {props.stats.map((line) => <StatisticLine key={line[0]} first={line[0]} second={line[1]} />)}
                </tbody>
            </table>
        )
    }
}

const StatisticLine = (props) => {
    return (
        <tr>
            <th>{props.first}</th>
            <th>{props.second}</th>
        </tr>
    )
}

export { Header, Button, Statistic }