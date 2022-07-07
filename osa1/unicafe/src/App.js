import { Header, Button, Statistic } from "./Components"
import { useState } from 'react'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let all = good + neutral + bad
  let avarage = all / 3
  let positive = (good / all * 100).toString() + " %"

  const stats = [
    ["good", good],
    ["neutral", neutral],
    ["bad", bad],
    ["all", all],
    ["avarage", avarage],
    ["positive", positive]
  ]

  const clickHandler = (usestate, setter) => {
    return () => setter(usestate + 1)
  }

  return (
    <div>
      <Header name="give feedback" />
      <div>
        <Button handler={clickHandler(good, setGood)} name="good" />
        <Button handler={clickHandler(neutral, setNeutral)} name="neutral" />
        <Button handler={clickHandler(bad, setBad)} name="bad" />
      </div>
      <Header name="statistics" />
      <Statistic stats={stats} />
    </div>
  )
}

export default App

/*
Refaktoroi sovelluksesi siten, että tilastojen näyttäminen on eriytetty oman komponentin Statistics vastuulle. 
Sovelluksen tila säilyy edelleen juurikomponentissa App.

Muuta sovellusta siten, että numeeriset tilastot näytetään ainoastaan, jos palautteita on jo annettu:

tilastojen näyttäminen on eriytetty oman komponentin Statistics vastuulle. Sovelluksen tila säilyy edelleen juurikomponentissa App.
Button vastaa yksittäistä palautteenantonappia. sinne syötetään usestate joka syötetään siel cli9ckhandler funktioon
StatisticLine huolehtii tilastorivien, esim. keskiarvon näyttämisestä

Toteuta tilastojen näyttäminen HTML:n taulukkona 

APP sisältää "good, neutral, bad" usestatet ja muuttujat avarage ja positive. Samoin otsikot.
BUTTON vastaa yksittäistä palautteenantonappia. tänne syötetään setStatet
STATISTIC sisältää taulukon sarakkeet ja STATISTICLINE sisältää taulukon solut (2)


*/