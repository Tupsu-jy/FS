import { getAllCountries } from "./services/connection"
import { useEffect, useState } from "react"
import Search from "./components/Search"
import Countryinformation from "./components/Countryinformation"

const App = () => {

  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    getAllCountries().then(response => {
      setCountries(response.data)
    })
  }, [])

  const searchFilter = (event) => {
    setShownCountries(countries.filter((element) => element.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const clickDetails = (country) => {
    setShownCountries([country])
  }

  return (
    <div>
      <Search searchFilter={searchFilter} />
      <Countryinformation countries={shownCountries} clickDetails={clickDetails} />
    </div>
  )
}

export default App

/*
 https://restcountries.com haetaan kaikki maat endpointista /all

 hakukenttä joka käy läpi maiden nimiä. näyttää jos alle 10

 Kun ehdon täyttäviä maita on enää yksi, näytetään maan perustiedot, lippu sekä maassa puhutut kielet:
lisää nappi maan nimen viereen jolla ylläolevan saa näkuyviin vaikka listassa monta maata

säät lopiksi. kts 2.14

axios service kompo erikseen. haetaan maat vain kerran (useeffect)

hakukenttä samalla lailla kun edellisessä. copy paste?

Counrtyinformation kompo joka näyttää maan tiedot. maa syötetään sille. ei näytä 
mitää jos mitään ei syötetä. täällä if elset shownCountries koon mukaa jotka määrittää
mihin alikomponentteihin shownCountries mapataan

sää? tehdään tapahtumankäsittelijä joka käynnistyy kun yksi maa jäljellä tai nappia painetaan.
se hakee sään.... ja sit.... laittaa ne muuttujaan ennen kuin maan titedot laitetaan usestateen

*/