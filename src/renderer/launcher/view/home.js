// outsource dependencies
import React from 'react'
import { observer } from 'mobx-react'
// local dependencies
import { LogoPng, LogoIcon } from '../../component/image'

export default observer(function Home () {

  return <div id="LayoutHome" className="relative flow-root min-h-full -p-4">
    <h2 className="text-4xl my-14 text-center">
      Welcome to
      <LogoPng className="inline-block size-8 text-lne-600 mx-2 mb-2" />
      <span className="font-lne font-extrabold text-lne-600">Home</span>
      <LogoIcon className="inline-block size-8 text-lne-600 mx-2 mb-2" />
    </h2>


  </div>
})
