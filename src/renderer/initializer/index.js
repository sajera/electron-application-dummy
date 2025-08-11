// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
import { createRoot } from 'react-dom/client'
// local dependencies
import '../style/theme/index.css'

const App = observer(function App () {
  // NOTE totally useless
  return <>
    <h2 className="bg-gray-100 dark:bg-gray-900 text-primary-500 absolute bottom-0 left-0 px-2 truncate">
      Initializing the App...
    </h2>
  </>
})

createRoot(document.body).render(<App />)

// console.log('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
//   , '\n sid:', process.env.SID
//   , '\n preload:', preload
//   // , '\n logo:', logo
// )
