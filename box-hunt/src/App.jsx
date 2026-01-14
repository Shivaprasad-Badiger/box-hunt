import { useEffect, useRef, useState } from 'react'
import './App.css'
import { debounce } from 'lodash'

// Hey, thanks for taking the time to review this code.
// There some of the issues I have encountered while building this so code became a little messy and I do acknowledge it.

// I originally tried handling setInterval using useRef, but I made a small mistake by assigning the 
// interval directly to the ref instead of ref.current and faced issue with clearInterval. Because of that, 
// I ended up removing useRef and just assigning setInterval to a variable.

// That one mistake led me down a bit of a workaround using localStorage and reloads. 
// The main functionality works fine overall, though there are still a few minor bugs.

function App() {
  const [count, setCount] = useState()
  const [reactionTime, setReactionTime] = useState(localStorage.getItem("reactionTime") || 0)
  const [status, setStatus] = useState(false)
  const [results, setResults] = useState(JSON.parse(localStorage.getItem("results")) || [])
  const [randomDiv, setRandomDiv] = useState(parseInt(localStorage.getItem("randomDiv")) || null)
  const [lastReactionTime, setLastReactionTime] = useState(0)
  const [lastRandomDiv, setLastRandomDiv] = useState(null)

  const main_div = []
  for (let index = 0; index < 50; index++) {
    main_div.push("")
  }
  let inetrvalRef;
  let randomDivRef;

  useEffect(() => {
    if (status) {
      setRandomDiv(Math.floor(Math.random() * 50));
    }
  }, [status])

  const resetFunction = () => {
    setCount(0)
    localStorage.setItem("reactionTime", 0)
    localStorage.setItem("randomDiv", "")
    localStorage.setItem("results", JSON.stringify([]))
    window.location.reload()
  }

  useEffect(() => {
    if (status) {
      if (!randomDivRef) {
        randomDivRef = setInterval(() => {
          setRandomDiv(Math.floor(Math.random() * 50));
        }, count);
      }
      if (!inetrvalRef) {
        inetrvalRef = setInterval(() => {
          setReactionTime(prev => prev + 1)
        }, 1000);
      }
    }
  }, [count, status])

  const inputNumber = debounce((e) => {
    setCount(e.target.value * 1000)
  }, 1000)

  return (
    <>
      <div style={{
        width: "1000px",
        height: "600px",
        border: "1px solid #000"
      }}>
        <div style={{
          borderBottom: "1px solid #000"
        }}>
          <button onClick={() => {
            setReactionTime(lastReactionTime)
            setRandomDiv(lastRandomDiv)
            setStatus(true)
          }}>
            Start
          </button>
          <button onClick={() => {
            clearInterval(inetrvalRef)
            clearInterval(randomDivRef)
            localStorage.setItem("reactionTime", reactionTime)
            localStorage.setItem("randomDiv", randomDiv)
            localStorage.setItem("results", JSON.stringify(results))
            setLastReactionTime(reactionTime)
            setLastRandomDiv(randomDiv)
            setStatus(false)
            window.location.reload()

          }}>
            Pause
          </button>
          <button onClick={() => {
            resetFunction()
          }}>
            Reset
          </button>
          <input type='number' value={count} onChange={inputNumber} />
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
          gap: "30px"
        }}>
          <div style={{
            height: "250px",
            width: "500px",
            display: "flex",
            flexWrap: "wrap",
            border: "1px solid #000"
          }}>
            {
              main_div.map((_, index) => <div key={`index-${index}`} id={`index-${index}`} style={{
                height: "50px",
                width: "50px",
                backgroundColor: randomDiv === index && "red"
              }}
                onClick={() => {
                  if (randomDiv === index) {
                    setResults(prev => {
                      let temp = [...prev]
                      temp.push({
                        click: temp.length + 1,
                        reaction_time: reactionTime
                      })
                      return temp
                    })
                    setRandomDiv(Math.floor(Math.random() * 50));
                    setReactionTime(0)
                  }
                }}
              >
                &nbsp;
              </div>
              )
            }

          </div>
          <div style={{
            border: "2px solid #000",
            width: "200px",
            hright: "100px"
          }}>

            <table>
              <thead>
                <tr>
                  <th>
                    Click Counter
                  </th>
                  <th>
                    Reaction Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.map((i) => {
                  return <tr>
                    <td>
                      {i.click}
                    </td>
                    <td>
                      {i.reaction_time}
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
