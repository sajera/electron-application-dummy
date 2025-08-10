// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
import { createRoot } from 'react-dom/client'
// local dependencies
import '../style/theme/index.css'
// NOTE Please try to avoid usage of "file-loader"
// import logo from '/assets/image/logo-512x512.png'

const App = observer(function App () {
  // NOTE for now all js part of Initializer completely useless
  return <>
    <h2 className="bg-gray-100 dark:bg-gray-900 text-primary-500">
      Initializing the App...
    </h2>
    {/*<img src={logo} alt="import" width="300px" height="300px" />*/}
    {/*<img src="/assets/image/logo-512x512.png" alt="string" width="300px" height="300px" />*/}
  </>
})

createRoot(document.getElementById('root')).render(<App />)

console.log('%c CONFIG ', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
  , '\n sid:', process.env.SID
  , '\n preload:', preload
  // , '\n logo:', logo
)
