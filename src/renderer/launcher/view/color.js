// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
// local dependencies

export default observer(function Color () {

  return <div id="LayoutHome" className="relative flow-root min-h-full -p-4">
    <h2 className="text-4xl my-14 text-center">Color Pallet</h2>
    {/* tailwind working ¯\_(ツ)_/¯ */}
    {/*{_.map([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950], value => <p*/}
    {/*  key={value}*/}
    {/*  className={cn('text-center p-3 m-4', `bg-gray-${value}`, `text-gray-${1000 - value}`)}*/}
    {/*>*/}
    {/*  {value}*/}
    {/*</p>)}*/}
    <p className="text-center p-3 my-4 bg-gray-950 text-gray-50">bg-950/50-text</p>
    <p className="text-center p-3 my-4 bg-gray-900 text-gray-100">bg-900/100-text</p>
    <p className="text-center p-3 my-4 bg-gray-800 text-gray-200">bg-800/200-text</p>
    <p className="text-center p-3 my-4 bg-gray-700 text-gray-300">bg-700/300-text</p>
    <p className="text-center p-3 my-4 bg-gray-600 text-gray-400">bg-600/400-text</p>
    <p className="text-center p-3 my-4 bg-gray-500 text-gray-500">bg-500/500-text</p>
    <p className="text-center p-3 my-4 bg-gray-400 text-gray-600">bg-400/600-text</p>
    <p className="text-center p-3 my-4 bg-gray-300 text-gray-700">bg-300/700-text</p>
    <p className="text-center p-3 my-4 bg-gray-200 text-gray-800">bg-200/800-text</p>
    <p className="text-center p-3 my-4 bg-gray-100 text-gray-900">bg-100/900-text</p>
    <p className="text-center p-3 my-4 bg-gray-50 text-gray-950">bg-50/950-text</p>
  </div>
})
