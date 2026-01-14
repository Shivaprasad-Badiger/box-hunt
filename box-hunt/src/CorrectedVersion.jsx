import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
    const [counter, setCounter] = useState(0)
    const [reactionTime, setReactionTime] = useState(1)
    const [status, setStatus] = useState(false)
    const [results, setResults] = useState([])
    const [randomDiv, setRandomDiv] = useState(null)

    const count = counter * 1000

    const main_div = []
    for (let index = 0; index < 50; index++) {
        main_div.push("")
    }
    let inetrvalRef = useRef(null);
    let randomDivRef = useRef(null);

    const handleStart = () => {
        setStatus(true)
        setRandomDiv(Math.floor(Math.random() * 50));
    }

    const handllePause = () => {
        clearInterval(inetrvalRef.current)
        clearInterval(randomDivRef.current)
        inetrvalRef.current = null
        randomDivRef.current = null
        setStatus(false)
    }


    const handleReset = () => {
        setCounter(0)
        setReactionTime(1)
        setRandomDiv(null)
        setStatus(false)
        setResults([])
        clearInterval(inetrvalRef.current)
        clearInterval(randomDivRef.current)
        inetrvalRef.current = null
        randomDivRef.current = null
    }

    useEffect(() => {
        if (status) {
            if (!randomDivRef.current) {
                randomDivRef.current = setInterval(() => {
                    setRandomDiv(Math.floor(Math.random() * 50));
                }, count);
            }
            if (!inetrvalRef.current) {
                inetrvalRef.current = setInterval(() => {
                    setReactionTime(prev => prev + 1)
                }, 1000);
            }
        }
    }, [count, status, results])

    return (
        <>
            <div style={{
                width: "1000px",
                height: "600px",
                border: "1px solid #000"
            }}>
                <div style={{
                    borderBottom: "1px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px"
                }}>
                    <h3>Box Hunt (Corrected)</h3>
                    <button>
                        <a href="/">Go to Original Version</a>
                    </button>
                </div>
                <div style={{
                    borderBottom: "1px solid #000",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    padding: "20px"
                }}>
                    <button onClick={handleStart}>
                        Start
                    </button>
                    <button onClick={handllePause}>
                        Pause
                    </button>
                    <button onClick={handleReset}>
                        Reset
                    </button>
                    <input type='number' value={counter} onChange={(e) => {
                        setCounter(e.target.value)
                    }}
                        placeholder='In sec'
                    /> In sec
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
                            main_div.map((_, index) => <button key={`index-${index}`} id={`index-${index}`} style={{
                                height: "50px",
                                width: "50px",
                                backgroundColor: randomDiv === index && "red",
                            }}
                                disabled={!status}
                                onClick={() => {
                                    if (randomDiv === index) {
                                        clearInterval(inetrvalRef.current)
                                        clearInterval(randomDivRef.current)
                                        inetrvalRef.current = null
                                        randomDivRef.current = null
                                        setResults(prev => {
                                            let temp = [...prev]
                                            temp.push({
                                                click: temp.length + 1,
                                                reaction_time: reactionTime
                                            })
                                            return temp
                                        })
                                        setReactionTime(0)
                                        setRandomDiv(Math.floor(Math.random() * 50));
                                    }
                                }}
                            >
                                {
                                    randomDiv === index ? reactionTime : ""
                                }
                            </button>
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
                                {results.map((i, index) => {
                                    return <tr key={index}>
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



//Learnings
// 1. Set ref.current = null when clearing interval to avoid multiple intervals being set.
// 2. Careful while assigning setInterval to useRef, always use ref.current.
