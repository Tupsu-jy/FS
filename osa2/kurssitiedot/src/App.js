import Course from "./Course"

const App = () => {

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      {courses.map((course) => <Course key={course.id} course={course} />)}
    </div >
  )
}

export default App

/*
eli uusi coures komponetti jonka sisäl kaikki ja joita mapataan olemaan. 

App
  Course <-- TÄMÄ LISÄTÄÄN
    Header
    Content
      Part
      Part

Jos et jo niin tehnyt, laske koodissasi tehtävien (koknais)määrä taulukon metodilla reduce.

Laajennetaan sovellusta siten, että kursseja voi olla mielivaltainen määrä:

Määrittele komponentti Course omana moduulinaan, jonka komponentti App importtaa. Voit sisällyttää kaikki kurssin alikomponentit samaan moduuliin.
eli Components??? pitää vaihtaa nimi vaan?

*/