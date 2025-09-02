// outsource dependencies
import cn from 'classnames'
import { observer } from 'mobx-react'
import React, { memo, useEffect } from 'react'
import { Bars4Icon, Cog8ToothIcon, XMarkIcon } from '@heroicons/react/24/solid'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Toggle } from '../../../component/toggle'
import { Loader } from '../../../component/loader'
import { ErrorMessage } from '../../../component/alert'
import { Form, Field, Input, Color } from '../../../component/form'


export default observer(function Controls ({ className }) {
  const { showControls, fabric, options } = store

  console.log(`%c DrawImage ${1} `, 'color: #FF6766; font-weight: bolder;'
    , '\n fabric:', fabric
  )

  return <div className={cn(
    'settings overflow-y-auto py-4 px-4',
    className,
    // NOTE collapsible
    'inset-y-0 fixed mt-12 w-80 transition-all',
    showControls ? 'right-0' : '-right-80',
  )}>
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl text-alt">Canvas options</h2>
      <Btn
        onClick={() => store.update({ showControls: false })}
        className="btn-secondary-outline flex items-center justify-center p-1"
      >
        <XMarkIcon className="size-6 inline-block" />
        {/*<strong>Hide</strong>&nbsp;CONTROLS*/}
      </Btn>
    </div>
    <Toggle
      label="Enable drawing mode"
      className="toggle-primary mb-2"
      checked={options.isDrawingMode}
      toggleClassName="toggle-primary"
      onChange={({ target }) => store.updateFabric({ isDrawingMode: target.checked })}
    />
    <Color
      label="BACKGROUND"
      classNameFormGroup="mb-2"
      value={options.backgroundColor}
      input={{ onChange: value => store.updateFabric({ backgroundColor: value }) }}
    />
    <Input
      min="10"
      type="number"
      label="WIDTH"
      value={options.width}
      classNameFormGroup="mb-2"
      input={{ onChange: value => store.updateFabric({ width: value }) }}
    />
    <Input
      min="10"
      type="number"
      label="HEIGHT"
      value={options.height}
      classNameFormGroup="mb-2"
      input={{ onChange: value => store.updateFabric({ height: value }) }}
    />
  </div>
})
