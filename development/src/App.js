import { getAll, create, update } from './services/numbers'
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')

  getAll().then(response => { setPersons(response.data) })

  const addNumber = (event) => {
    event.preventDefault()
    const newPerson = { name: event.target[0].value, number: event.target[1].value }
    setPersons(persons => [...persons, newPerson])
    create(newPerson)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>name: <input /></div>
        <div>number: <input /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => <p>{person.name} {person.number}</p>)}
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