import Detailed from "./Detailed"
import Simple from "./Simple"

const Countryinformation = (props) => {

    let detailLevel = props.countries.map((country) => <Simple key={country.fifa} country={country} clickDetails={props.clickDetails} />)

    if (props.countries.length === 1) {
        detailLevel = <Detailed country={props.countries[0]} />
    } else if (props.countries.length > 10) {
        detailLevel = <p>Too many results</p>
    } else if (11 > props.countries.length) {
        detailLevel = props.countries.map((country) => <Simple key={country.fifa} country={country} clickDetails={props.clickDetails} />)
    } else {
        detailLevel = null
    }

    return (
        <div>
            {detailLevel}
        </div>
    )
}

export default Countryinformation