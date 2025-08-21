// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Field, Form, Input, Switch } from '../../../component/form'


export default observer(function TabForm ({ className, ...attr }) {
  const { disabled, form, id } = store
  const isNew = !id

  // console.log(`%c TabForm ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n values:', { ...form.value }
  // )

  return <div className={cn('relative', className)} {...attr}>
    <Form store={form} className="grow overflow-y-auto h-40 -my-4 pt-4 -mr-4 pr-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Field
          checkmark
          // clearable or checkmark
          name="title"
          component={Input}
          placeholder="TITLE"
          disabled={disabled.get('form')}
          label={<span className="required-asterisk">Title</span>}
        />
        <div>
          {/* TODO icon */}
        </div>
        <div className="text-right flex items-start justify-end">
          <Btn
            onClick={form.reset}
            className="btn-secondary-outline btn-md mr-3"
            disabled={disabled.get('form') || form.isPristine}
          >
            RESET
          </Btn>
          <Btn
            type="submit"
            className="btn-primary btn-md"
            disabled={disabled.get('form')}
          >
            {isNew ? 'CREATE' : 'SAVE'}
          </Btn>
        </div>
      </div>
      {/* Background */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <Field
          component={Input}
          placeholder="BG HEX"
          name="backgroundColor"
          label="Background color"
          disabled={disabled.get('form')}
        />
        <Field
          max="1"
          min="0"
          step="0.01"
          type="number"
          name="opacity"
          label="Oacity"
          component={Input}
          placeholder="OPACITY"
          disabled={disabled.get('form')}
        />
        <Field
          className="pt-10"
          name="transparent"
          label="Transparent"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
        <div />
        <Field
          max="5"
          min="0"
          step="0.1"
          type="number"
          name="zoomFactor"
          label="Zoom factor"
          component={Input}
          placeholder="ZOOM"
          disabled={disabled.get('form')}
        />
      </div>
      {/* Behavior & Appearance */}
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 mb-2">
        <h4>Appearance</h4>
        <Field
          name="frame"
          label="Frame"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
        <Field
          name="closable"
          label="Closable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
        <Field
          name="show"
          label="Show"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 mb-2">
        <Field
          name="alwaysOnTop"
          component={Switch}
          label="Always on top"
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="kiosk"
          label="Kiosk"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="fullscreen"
          label="Fullscreen"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="skipTaskbar"
          label="Skip taskbar"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 mb-2">
        <Field
          name="movable"
          label="Movable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="focusable"
          label="Focusable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="fullscreenable"
          label="Fullscreenable"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="resizable"
          label="Resizable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="minimizable"
          label="Minimizable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="maximizable"
          label="Maximizable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
      </div>
      {/* Position */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <h4 className="mb-4">Window position</h4>
          <Field
            name="useContentSize"
            component={Switch}
            label="Use content size"
            disabled={disabled.get('form')}
            toggleClassName="toggle-primary"
          />
        </div>
        <Field
          name="x"
          type="number"
          placeholder="X"
          component={Input}
          label="X Position"
          disabled={disabled.get('form') || form.value.center}
        />
        <Field
          name="y"
          type="number"
          placeholder="Y"
          component={Input}
          label="Y Position"
          disabled={disabled.get('form') || form.value.center}
        />
        <div className="pt-10">
          <Field
            name="center"
            component={Switch}
            label="Auto-Center"
            disabled={disabled.get('form')}
            toggleClassName="toggle-warning"
            onChange={() => {
              form.setValue('x', '')
              form.setValue('y', '')
            }}
          />
        </div>
      </div>
      {/* Width */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Field
          type="number"
          name="width"
          label="Width"
          component={Input}
          placeholder="WIDTH"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          component={Input}
          name="defaultWidth"
          placeholder="DEFAULT"
          label="Default Width"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="minWidth"
          component={Input}
          placeholder="MIN"
          label="Min Width"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="maxWidth"
          component={Input}
          placeholder="MAX"
          label="Max Width"
          disabled={disabled.get('form')}
        />
      </div>
      {/* Height */}
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Field
          type="number"
          name="height"
          label="Height"
          component={Input}
          placeholder="HEIGHT"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          component={Input}
          name="defaultHeight"
          placeholder="DEFAULT"
          label="Default Height"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="minHeight"
          component={Input}
          placeholder="MIN"
          label="Min Height"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="maxHeight"
          component={Input}
          placeholder="MAX"
          label="Max Height"
          disabled={disabled.get('form')}
        />
      </div>

      <h3 className="text-lg font-medium mb-2">Web Preferences TODO</h3>

    </Form>
  </div>
})
