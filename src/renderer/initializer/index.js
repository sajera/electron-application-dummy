// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
import { createRoot } from 'react-dom/client'
// local dependencies
import '../style/theme/index.css'
import logo from '../../assets/app-icon/icon.png'

const App = observer(function App () {

  return <div style={{
    backgroundImage: `url("${logo}")`
  }} className="relative bg-no-repeat bg-cover w-full h-full">
    <h2 className="bg-gray-100 dark:bg-gray-900 text-primary-500 absolute bottom-0 left-0">
      Initializing the App...
    </h2>
  </div>
})

createRoot(document.body).render(<App />)

console.log('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n sid:', process.env.SID
  , '\n preload:', preload
  // , '\n logo:', logo
)
