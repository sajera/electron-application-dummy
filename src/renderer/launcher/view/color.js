// outsource dependencies
import _ from 'lodash'
import React from 'react'
import { observer } from 'mobx-react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
// local dependencies
import { layoutStore } from '../store'
import { Btn } from '../../component/btn'

export default observer(function Color () {

  return <div id="LayoutHome" className="relative flow-root min-h-full -p-4">
    <h2 className="text-3xl mb-4 text-center border border-alt"><span className="text-alt">C</span>olor <span className="text-muted">Pallet</span></h2>
    <h3 className="text-2xl mb-4 flex items-center">
      The {layoutStore.isDarkModeEnabled ? 'Dark' : 'Light'} mode enabled -&gt;
      <Btn
        onClick={() => layoutStore.setDarkMode(!layoutStore.isDarkModeEnabled)}
        title={<span>Switch to {layoutStore.isDarkModeEnabled ? 'Light' : 'Dark'}&nbsp;mode</span>}
        className="btn-secondary inline-flex items-center justify-between size-8 rounded-full p-0 mx-3"
      >
        {layoutStore.isDarkModeEnabled ? <SunIcon className="size-8" /> : <MoonIcon className="size-8" />}
      </Btn>
    </h3>
    <h3 className="text-2xl mb-10 flex items-center">
      The {layoutStore.theme} enabled -&gt;
      <div className="flex items-center border border-primary-500 rounded shadow">
        {_.map(layoutStore.themes, theme => <Btn
          id={theme}
          key={theme}
          onClick={() => layoutStore.setTheme(theme)}
          title={<span>Setup {_.startCase(theme)}</span>}
          className="btn-primary rounded-none"
        >
          {_.replace(theme, '-theme', '')}
        </Btn>)}
      </div>
    </h3>

    <div className="grid grid-cols-3 gap-4 m-4 bg-alt_ p-2">
      <div className="flex flex-col gap-4">
        <Btn className="btn-primary">btn-primary</Btn>
        <Btn className="btn-primary" disabled>btn-primary disabled</Btn>
        <Btn className="btn-primary active">btn-primary</Btn>

        <Btn className="btn-primary-outline">btn-primary-outline</Btn>
        <Btn className="btn-primary-outline" disabled>btn-primary-outline disabled</Btn>
        <Btn className="btn-primary-outline active">btn-primary-outline</Btn>
      </div>
      <div className="flex flex-col gap-4">
        <Btn className="btn-secondary btn-md">btn-secondary btn-md</Btn>
        <Btn className="btn-secondary" disabled>btn-secondary disabled</Btn>
        <Btn className="btn-secondary active">btn-secondary</Btn>

        <Btn className="btn-secondary-outline">btn-secondary-outline</Btn>
        <Btn className="btn-secondary-outline" disabled>btn-secondary-outline disabled</Btn>
        <Btn className="btn-secondary-outline active">btn-secondary-outline</Btn>
      </div>
      <div className="flex flex-col gap-4">
        <Btn className="btn-danger btn-lg">btn-danger btn-lg</Btn>
        <Btn className="btn-danger" disabled>btn-danger disabled</Btn>
        <Btn className="btn-danger active">btn-danger</Btn>

        <Btn className="btn-danger-outline">btn-danger-outline</Btn>
        <Btn className="btn-danger-outline" disabled>btn-danger-outline disabled</Btn>
        <Btn className="btn-danger-outline active">btn-danger-outline</Btn>
      </div>
    </div>

    <p className="text-center p-3 my-4 bg-primary-950 text-primary-50">bg-950/50-text</p>
    <p className="text-center p-3 my-4 bg-primary-900 text-primary-100">bg-900/100-text</p>
    <p className="text-center p-3 my-4 bg-primary-800 text-primary-200">bg-800/200-text</p>
    <p className="text-center p-3 my-4 bg-primary-700 text-primary-300">bg-700/300-text</p>
    <p className="text-center p-3 my-4 bg-primary-600 text-primary-400">bg-600/400-text</p>
    <p className="text-center p-3 my-4 bg-primary-500 text-primary-500">bg-500/500-text</p>
    <p className="text-center p-3 my-4 bg-primary-400 text-primary-600">bg-400/600-text</p>
    <p className="text-center p-3 my-4 bg-primary-300 text-primary-700">bg-300/700-text</p>
    <p className="text-center p-3 my-4 bg-primary-200 text-primary-800">bg-200/800-text</p>
    <p className="text-center p-3 my-4 bg-primary-100 text-primary-900">bg-100/900-text</p>
    <p className="text-center p-3 my-4 bg-primary-50 text-primary-950">bg-50/950-text</p>


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
