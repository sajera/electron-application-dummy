// outsource dependencies
import React from 'react'
import cn from 'classnames'
import { observer } from 'mobx-react'
// local dependencies
import store from './store'
import { Btn } from '../../../component/btn'
import { Field, Form, Input, SimpleSelect, Switch } from '../../../component/form'


export default observer(function TabForm ({ className, ...attr }) {
  const { disabled, form, id } = store
  const isNew = !id

  // console.log(`%c TabForm ${id} `, 'color: #FF6766; font-weight: bolder;'
  //   , '\n values:', { ...form.value }
  // )

  // FIXME should I remove direct "disabled" nad delay for update ?
  return <div className={cn('relative grow h-40 -my-4 py-4 -mr-4 pr-4 !overflow-y-auto', { 'pointer-events-none': disabled.get('form') }, className)} {...attr}>
    <Form store={form} className="">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <Field
          checkmark
          // clearable or checkmark
          name="title"
          component={Input}
          placeholder="TITLE"
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
      <div className="grid grid-cols-4 gap-4 mb-4">
        <Field
          component={Input}
          placeholder="BG HEX"
          name="backgroundColor"
          label="backgroundColor"
          disabled={disabled.get('form')}
        />
        <Field
          max="1"
          min="0"
          step="0.01"
          type="number"
          name="opacity"
          label="opacity"
          component={Input}
          placeholder="OPACITY"
          disabled={disabled.get('form')}
        />
        <Field
          component={Switch}
          name="paintWhenInitiallyHidden"
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
          label="paintWhenInitiallyHidden"
          classNameFormGroup="pt-10 col-span-2"
        />
      </div>
      {/* Behavior & Appearance */}
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 mb-2">
        <h4>Appearance</h4>
        <Field
          name="frame"
          label="frame"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
        <Field
          name="closable"
          label="closable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
        <Field
          name="show"
          label="show"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-danger"
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 mb-2">
        <Field
          name="alwaysOnTop"
          component={Switch}
          label="alwaysOnTop"
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="kiosk"
          label="kiosk"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="fullscreen"
          label="fullscreen"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="skipTaskbar"
          label="skipTaskbar"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-primary"
        />
        <Field
          name="movable"
          label="movable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-7 gap-x-4 mb-2">
        <Field
          name="focusable"
          label="focusable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="resizable"
          label="resizable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="fullscreenable"
          label="fullscreenable"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="minimizable"
          label="minimizable"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="maximizable"
          label="maximizable"
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
            label="useContentSize"
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
            label="center"
            component={Switch}
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
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
        <Field
          type="number"
          name="width"
          label="width"
          component={Input}
          placeholder="WIDTH"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          component={Input}
          name="defaultWidth"
          placeholder="DEFAULT"
          label="defaultWidth"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="minWidth"
          component={Input}
          placeholder="MIN"
          label="minWidth"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="maxWidth"
          component={Input}
          placeholder="MAX"
          label="maxWidth"
          disabled={disabled.get('form')}
        />
      </div>
      {/* Height */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-2">
        <Field
          type="number"
          name="height"
          label="height"
          component={Input}
          placeholder="HEIGHT"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          component={Input}
          name="defaultHeight"
          placeholder="DEFAULT"
          label="defaultHeight"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="minHeight"
          component={Input}
          placeholder="MIN"
          label="minHeight"
          disabled={disabled.get('form')}
        />
        <Field
          type="number"
          name="maxHeight"
          component={Input}
          placeholder="MAX"
          label="maxHeight"
          disabled={disabled.get('form')}
        />
      </div>

      <h3 className="text-lg font-medium mb-2">Web Preferences</h3>
      <Field
        component={Input}
        placeholder="ARGUMENTS"
        classNameFormGroup="mb-4"
        name="additionalArguments"
        // label="additionalArguments"
        disabled={disabled.get('form')}
      />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 mb-2">
        <Field
          name="sandbox"
          label="sandbox"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="nodeIntegration"
          label="nodeIntegration"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="nodeIntegrationInWorker"
          label="nodeIntegrationInWorker"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="nodeIntegrationInSubFrames"
          label="nodeIntegrationInSubFrames"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="webgl"
          label="webgl"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="javascript"
          label="javascript"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="webSecurity"
          label="webSecurity"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="allowRunningInsecureContent"
          label="allowRunningInsecureContent"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="experimentalFeatures"
          label="experimentalFeatures"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="contextIsolation"
          label="contextIsolation"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="disableDialogs"
          label="disableDialogs"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="safeDialogs"
          label="safeDialogs"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="images"
          label="images"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="offscreen"
          label="offscreen"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="webviewTag"
          label="webviewTag"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="navigateOnDragDrop"
          label="navigateOnDragDrop"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="devTools"
          label="devTools"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
          name="disableHtmlFullscreenWindowResize"
          label="disableHtmlFullscreenWindowResize"
        />
        <Field
          name="plugins"
          label="plugins"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="textAreasAreResizable"
          label="textAreasAreResizable"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="transparent"
          label="transparent"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="spellcheck"
          label="spellcheck"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="enableWebSQL"
          label="enableWebSQL"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          name="scrollBounce"
          label="scrollBounce"
          component={Switch}
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="enablePreferredSizeMode"
          label="enablePreferredSizeMode"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
        <Field
          component={Switch}
          name="backgroundThrottling"
          label="backgroundThrottling"
          disabled={disabled.get('form')}
          toggleClassName="toggle-secondary"
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 mb-2">
        <Field
          placeholder="ENCODING"
          name="defaultEncoding"
          label="defaultEncoding"
          component={SimpleSelect}
          disabled={disabled.get('form')}
          options={['', 'ISO-8859-1', 'UTF-8']}
        />
        <Field
          placeholder="POLICY"
          name="autoplayPolicy"
          label="autoplayPolicy"
          component={SimpleSelect}
          disabled={disabled.get('form')}
          options={['no-user-gesture-required', 'user-gesture-required', 'document-user-activation-required']}
        />
        <Field
          placeholder="ANIMATION"
          component={SimpleSelect}
          name="imageAnimationPolicy"
          label="imageAnimationPolicy"
          disabled={disabled.get('form')}
          options={['animate', 'animateOnce', 'noAnimation']}
        />
        <Field
          placeholder="CACHE"
          name="v8CacheOptions"
          label="v8CacheOptions"
          component={SimpleSelect}
          disabled={disabled.get('form')}
          options={['code', 'none', 'bypassHeatCheck', 'bypassHeatCheckAndEagerCompile']}
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 mb-2">
        <Field
          placeholder="ANIMATION"
          component={SimpleSelect}
          name="imageAnimationPolicy"
          label="imageAnimationPolicy"
          disabled={disabled.get('form')}
          options={['animate', 'animateOnce', 'noAnimation']}
        />
        <Field
          max="50"
          min="0"
          type="number"
          component={Input}
          placeholder="FONT"
          name="minimumFontSize"
          label="minimumFontSize"
          disabled={disabled.get('form')}
        />
        <Field
          max="50"
          min="1"
          type="number"
          component={Input}
          placeholder="FONT"
          name="defaultFontSize"
          label="defaultFontSize"
          disabled={disabled.get('form')}
        />
        <Field
          max="50"
          min="1"
          type="number"
          component={Input}
          placeholder="FONT"
          name="defaultMonospaceFontSize"
          label="defaultMonospaceFontSize"
          disabled={disabled.get('form')}
        />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 mb-2">
        <Field
          max="5"
          min="0"
          step="0.1"
          type="number"
          name="zoomFactor"
          label="zoomFactor"
          component={Input}
          placeholder="ZOOM"
          disabled={disabled.get('form')}
        />
        <Field
          component={Input}
          placeholder="MESSAGE"
          name="safeDialogsMessage"
          label="safeDialogsMessage"
          disabled={disabled.get('form')}
        />
        <Field
          component={Input}
          placeholder="TITLE"
          name="accessibleTitle"
          label="accessibleTitle"
          disabled={disabled.get('form')}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-4 mb-2">
        <Field
          component={Input}
          placeholder="ENABLE"
          name="enableBlinkFeatures"
          label="enableBlinkFeatures"
          disabled={disabled.get('form')}
        />
        <Field
          component={Input}
          placeholder="DISABLE"
          name="disableBlinkFeatures"
          label="disableBlinkFeatures"
          disabled={disabled.get('form')}
        />
      </div>
    </Form>
  </div>
})
