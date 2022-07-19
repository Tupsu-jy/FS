import { getAll, create, update, remove } from './services/numbers'
import { useEffect, useState } from 'react'
import Numbers from './components/Numbers'
import Addform from './components/Addform'
import Search from './components/Search'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([
    { name: null, number: null, id: null }
  ])

  const [shownPersons, setShownPersons] = useState([
    { name: null, number: null, id: null }
  ])

  const [message, setMessage] = useState({ message: null, succes: null })

  useEffect(() => {
    getAll().then(response => {
      setPersons(response.data)
      setShownPersons(response.data)
    })
  }, [])

  const messageInit = (message, situation) => {
    setMessage({ message: message, succes: situation })
    setTimeout(() => { setMessage({ message: null, succes: null }) }, 5000)
  }

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = { name: event.target[0].value, number: event.target[1].value }
    const identical = persons.findIndex(person => person.name === newPerson.name)
    if (-1 === identical) {
      create(newPerson).then(() => {
        setPersons(persons => [...persons, newPerson])
        messageInit("Person added succesfully", true)
      }).catch(error => {
        messageInit("Person could not be added", false)
      })
    } else if (window.confirm("Name already there!")) {
      let updatedArray = [...persons]
      updatedArray[identical].number = newPerson.number
      update(persons[identical].id, newPerson).then(() => {
        setPersons(updatedArray)
        messageInit("Person updated succesfully", true)
      }).catch(error => {
        messageInit("Person could not be updated", false)
      })
    }
  }

  const removeNumber = (id) => {
    remove(id).then(() => {
      setPersons(persons.filter((element) => id !== element.id))
      setShownPersons(shownPersons.filter((element) => id !== element.id))
      messageInit("Person removed succesfully", true)
    }).catch(error => {
      messageInit("Person could not be romeved from database", false)
    })
  }

  const searchFilter = (event) => {
    setShownPersons(persons.filter((element) => element.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Search searchFilter={searchFilter} />
      <Addform addNumber={addNumber} />
      <Numbers persons={shownPersons} removeNumber={removeNumber} />
    </div>
  )
}

export default App

/*
puhelinluettole

lisätään nimiä + numeroita, lomake

hakukenttä nimille, filtteri

Jos koko sovelluksesi on tehty yhteen komponenttiin, refaktoroi sitä eriyttämällä sopivia komponentteja. Pidä kuitenkin edelleen kaikki tila- sekä tapahtumankäsittelijäfunktiot juurikomponentissa App.

db.json tietokanta jonne talletetaan nimet. talletetaan myös listaan sovellukksessa

mahis poistaa nimiä (axios). jos lisätään nimi joka on jo siellä niin korvataan
alert varoittamassa ja vaatimassa varmistusta

Tiettyä henkilöä vastaava resurssi tuhotaan palvelimelta tekemällä HTTP DELETE -pyyntö resurssia vastaavaan URL:iin. Eli jos poistaisimme esim. käyttäjän, jonka id on 2, tulisi tapauksessamme tehdä HTTP DELETE osoitteeseen localhost:3001/persons/2. Pyynnön mukana ei lähetetä mitään dataa.

hienot ilmoitukset siitä kun operaatio onnistuu tai epäonnistuu

(bonus erillinen 2.12 maiden tiedot, tehdään jälkeen)


mistä lähetään....

tietokanta? sitten axios, sitten lisäys. sitten poisto, sitten filtteri

*/