import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState('')

  const generator = useCallback(() => {
    let pass = ""
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (number) alpha += "0123456789"
    if (charAllow) alpha += "@!#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * alpha.length + 1)
      pass += alpha.charAt(char)
    }
    setPassword(pass)

  }, [length, number, charAllow, setPassword])

  //useRef hook
  const passwordRef = useRef(null)

  const copypaste = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    generator()
  }, [length, number, charAllow, generator])

  return (
    <>
      <h1>Password Generator</h1>
      <div>

        <input className='wrapper' type="text" value={password} ref={passwordRef} readOnly />
        <button onClick={copypaste}>copy</button>
      </div>
      <div className='allinput'>
        <input type="range" min={5} max={20} value={length} onChange={e => { setLength(e.target.value) }} />
        <label htmlFor=''>Length: {length} </label>
        <input type="checkbox" defaultChecked={number} onChange={(e) => { setNumber((prev) => !prev) }} />
        <label htmlFor="">Number</label>
        <input type="checkbox" defaultChecked={charAllow} onChange={(e) => { setCharAllow((prev) => !prev) }} />
        <label htmlFor="">Character</label>
      </div>
    </>
  )
}

export default App
