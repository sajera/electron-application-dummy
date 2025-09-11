// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { ArrowUpCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import RectForm from './rect.form'
import CircleForm from './circle.form'
import { Btn } from '../../../component/btn'
import { Toggle } from '../../../component/toggle'
import { Input, Color, COLORS } from '../../../component/form'


export default observer(function Controls ({ className }) {
  const { showControls, options } = store

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
      </Btn>
    </div>
    <Color
      inLabel="BACKGROUND"
      classNameFormGroup="mb-3"
      value={options.backgroundColor}
      colors={[...COLORS, 'transparent']}
      input={{ onChange: value => store.setBG(value) }}
    />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <Btn className="click-to-upload btn-primary-outline btn-lg flex items-center justify-center w-full text-center mb-3">
      <ArrowUpCircleIcon className="size-6 mr-2" />
      APPLY IMAGE
    </Btn>
    <hr className="border-t border-alt -mx-4 mb-3" />
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-medium mr-3">PENCIL DRAWING</h2>
      <Toggle
        label="ENABLED"
        className="toggle-primary"
        checked={options.isDrawingMode}
        toggleClassName="toggle-primary"
        onChange={({ target }) => store.setDrawingMode(target.checked)}
      />
    </div>
    <Color
      inLabel="COLOR"
      classNameFormGroup="mb-3"
      value={options.pencilColor}
      colors={[...COLORS, '#000000']}
      disabled={!options.isDrawingMode}
      input={{ onChange: value => store.setPencilColor(value) }}
    />
    <Input
      min="5"
      step="1"
      type="number"
      inLabel="PX"
      classNameFormGroup="mb-3"
      value={options.pencilSize}
      input={{ onChange: value => store.setPencilSize(value) }}
    />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-medium mr-3">GRID</h2>
      <Toggle
        label="ENABLED"
        className="toggle-primary"
        checked={options.isGridMode}
        toggleClassName="toggle-primary"
        onChange={({ target }) => store.setGridMode(target.checked)}
      />
    </div>
    <Input
      min="5"
      step="1"
      max="50"
      type="number"
      inLabel="SIZE"
      value={options.grid}
      classNameFormGroup="mb-3"
      input={{
        onChange: value => store.setGridSize(value),
        onBlur: () => options.isGridMode && store.drawGrid(),
      }}
    />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <RectForm />
    <hr className="border-t border-alt -mx-4 mb-3" />
    <CircleForm />
    <hr className="border-t border-alt -mx-4 mb-3" />
    3. text
    <hr className="border-t border-alt -mx-4 mb-3" />
    4. undo/redo
    <hr className="border-t border-alt -mx-4 mb-3" />
    5. zoom +/-
  </div>
})
