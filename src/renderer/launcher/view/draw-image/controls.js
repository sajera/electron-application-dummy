// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { ArrowUpCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Toggle } from '../../../component/toggle'
import { Form, Field, Input, Color, COLORS } from '../../../component/form'


export default observer(function Controls ({ className }) {
  const { showControls, fabric, options } = store

  // console.log(`%c DrawImage ${1} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n fabric:', fabric
  // )

  return <div className={cn(
    'settings overflow-y-auto p-4',
    className,
    // NOTE collapsible
    'inset-y-0 fixed mt-12 w-80 transition-all',
    showControls ? 'right-0' : '-right-80',
  )}>
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl text-alt">Controls panel</h2>
      <Btn
        title="Close controls panel"
        onClick={() => store.update({ showControls: false })}
        className="btn-secondary-outline flex items-center justify-center size-10 p-1"
      >
        <XMarkIcon className="size-6 inline-block" />
        {/*<strong>Hide</strong>&nbsp;CONTROLS*/}
      </Btn>
    </div>
    <Color
      label="BACKGROUND"
      classNameFormGroup="mb-3"
      value={options.backgroundColor}
      colors={[...COLORS, 'transparent']}
      input={{ onChange: value => store.setBG(value) }}
    />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <Toggle
      label="Enable drawing mode"
      className="toggle-primary mb-3"
      checked={options.isDrawingMode}
      toggleClassName="toggle-primary"
      onChange={({ target }) => store.setDrawingMode(target.checked)}
    />
    <Color
      label="Pencil color"
      classNameFormGroup="mb-3"
      value={options.pencilColor}
      colors={[...COLORS, '#000000']}
      disabled={!options.isDrawingMode}
      input={{ onChange: value => store.setPencilColor(value) }}
    />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <Toggle
      label="Enable grid mode"
      checked={options.isGridMode}
      className="toggle-primary mb-3"
      toggleClassName="toggle-primary"
      onChange={({ target }) => store.setGridMode(target.checked)}
    />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <Btn className="btn-primary-outline btn-lg flex items-center justify-center w-full text-center">
      <ArrowUpCircleIcon className="size-6 mr-2" />
      APPLY IMAGE
    </Btn>
    <hr className="border-t border-alt -mx-4 mb-3" />

    TODO more options ?
    TODO html zoom +/-


    TODO draw figures
    1. rect
    2. circle
    3. text
    4. poligon
    5. image
  </div>
})
