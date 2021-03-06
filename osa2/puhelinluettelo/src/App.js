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

lis??t????n nimi?? + numeroita, lomake

hakukentt?? nimille, filtteri

Jos koko sovelluksesi on tehty yhteen komponenttiin, refaktoroi sit?? eriytt??m??ll?? sopivia komponentteja. Pid?? kuitenkin edelleen kaikki tila- sek?? tapahtumank??sittelij??funktiot juurikomponentissa App.

db.json tietokanta jonne talletetaan nimet. talletetaan my??s listaan sovellukksessa

mahis poistaa nimi?? (axios). jos lis??t????n nimi joka on jo siell?? niin korvataan
alert varoittamassa ja vaatimassa varmistusta

Tietty?? henkil???? vastaava resurssi tuhotaan palvelimelta tekem??ll?? HTTP DELETE -pyynt?? resurssia vastaavaan URL:iin. Eli jos poistaisimme esim. k??ytt??j??n, jonka id on 2, tulisi tapauksessamme tehd?? HTTP DELETE osoitteeseen localhost:3001/persons/2. Pyynn??n mukana ei l??hetet?? mit????n dataa.

hienot ilmoitukset siit?? kun operaatio onnistuu tai ep??onnistuu

(bonus erillinen 2.12 maiden tiedot, tehd????n j??lkeen)


mist?? l??het????n....

tietokanta? sitten axios, sitten lis??ys. sitten poisto, sitten filtteri

*/