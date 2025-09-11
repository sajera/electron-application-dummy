// outsource dependencies
import _ from 'lodash'
import cn from 'classnames'
import { observer } from 'mobx-react'
import { useDropzone } from 'react-dropzone'
import React, { memo, useEffect, useMemo } from 'react'
import { Cog8ToothIcon, CloudArrowDownIcon } from '@heroicons/react/24/solid'
import { PhotoIcon, RectangleGroupIcon, FolderPlusIcon } from '@heroicons/react/24/outline'
// local dependencies
import store from './store'
import Controls from './controls'
import { Btn } from '../../../component/btn'
import { Loader } from '../../../component/loader'
import { Dropdown } from '../../../component/dropdown'
import { ErrorMessage } from '../../../component/alert'
import { Form, Field, Input } from '../../../component/form'
import { useRefCallback, checkParentNodes } from '../../../component/hook'


export const NoRenderCanvas = memo(function NoRenderCanvas ({ ref }) {
  return <canvas ref={ref} className="border border-alt rounded" />
})

export default observer(function DrawImage () {
  const { sizeForm, errorMessage, initialized, disabled, data } = store
  const [canvas, getCanvas] = useRefCallback()

  useEffect(() => store.initialize(canvas), [canvas])

  const { getRootProps, getInputProps, isFileDialogActive, isDragAccept, isDragActive, isDragReject, acceptedFiles } = useDropzone({
    maxFiles: 1,
    maxSize: 16e6, // NOTE: max file size is 16MB
    preventDropOnDocument: true,
    disabled: disabled.get('upload'),
    onDrop: acceptedFiles => {
      const file = _.first(acceptedFiles)
      file && store.addImageToCanvas(file)
    },
    accept: {
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  })

  const rootPros = useMemo(() => ({
    onClick: event => checkParentNodes(event.target, t => t.classList?.contains('click-to-upload')) || event.stopPropagation()
  }), [])

  return <div className="relative flex flex-col h-full p-4" {...getRootProps(rootPros)}>
    <Controls className="z-10 bg-alt shadow-lg border-l border-alt" />
    <div className="flex items-start justify-between mb-4">
      <Form store={sizeForm} className="flex">
        <h2 className="text-3xl mr-3 truncate">Draw image</h2>
        <Btn
          type="submit"
          disabled={!sizeForm.isValid}
          title="Reset canvas and apply size settings"
          className="btn-secondary-outline btn-md mr-3 h-10 whitespace-nowrap"
        >
          RESET CANVAS
        </Btn>
        <div className="relative mr-3 w-44">
          <Field min="10" max="1000" type="number" name="width" component={Input} />
          <span className="text-muted absolute pointer-events-none top-2">
            <span className="opacity-0 mr-3 ml-1">{sizeForm.value.width}</span> WIDTH
          </span>
        </div>
        <div className="relative mr-3 w-44">
          <Field min="10" max="1000" type="number" name="height" component={Input} />
          <span className="text-muted absolute pointer-events-none top-2">
            <span className="opacity-0 mr-3 ml-1">{sizeForm.value.height}</span> HEIGHT
          </span>
        </div>
      </Form>
      <div className="flex justify-end">
        <Dropdown
          as="ul"
          anchor="bottom end"
          containerClassName="mr-3"
          className="min-w-32 bg-alt border border-alt rounded mt-1 z-50"
          trigger={({ active }) => <Btn title="Save Options" className={cn('btn-primary btn-md flex items-center truncate h-10', { active })}>
            <CloudArrowDownIcon className="size-6 mr-2" /> SAVE
          </Btn>}
        >
          <Dropdown.Item as="li">
            <Btn onClick={store.savePNG} className="btn-secondary-outline btn-md shadow-none ring-inset rounded-none border-b-0 flex items-center whitespace-nowrap text-right w-full">
              <PhotoIcon className="size-6 mr-2" />
              PNG image
            </Btn>
          </Dropdown.Item>
          <Dropdown.Item as="li">
            <Btn onClick={store.saveRAW} className="btn-secondary-outline btn-md shadow-none ring-inset rounded-none border-b-0 flex items-center whitespace-nowrap text-right w-full">
              <RectangleGroupIcon className="size-6 mr-2" />
              RAW Template
            </Btn>
          </Dropdown.Item>
          <Dropdown.Item as="li">
            <Btn className="btn-secondary-outline btn-md shadow-none ring-inset rounded-none flex items-center whitespace-nowrap text-right w-full">
              <FolderPlusIcon className="size-6 mr-2" />
              Add to source
            </Btn>
          </Dropdown.Item>
        </Dropdown>
        <Btn
          title="Show controls panel"
          onClick={() => store.update({ showControls: true })}
          className="btn-secondary-outline justify-center size-10 p-1"
        >
          <Cog8ToothIcon className="size-6 inline-block" />
        </Btn>
      </div>
    </div>
    <div className="h-0 overflow-visible">
      <input {...getInputProps()} />
      <div className={cn('flex flex-1 flex-col items-center justify-center cursor-pointer absolute text-5xl font-medium',
        {
          'bg-alt border border-2 border-alt border-dashed shadow shadow-alt shadow-2xl top-3 inset-x-3 z-50 !h-5/6': isDragActive || isFileDialogActive || disabled.get('add-image-to-canvas'),
          '!border-green-500 !text-green-500': isDragActive && isDragAccept,
          '!border-red-500 !text-red-500': isDragActive && isDragReject,
          '!border-primary-500 !text-primary-500': isFileDialogActive,
        })}>
        <Loader active={disabled.get('add-image-to-canvas')} size="32" title={`File "${_.get(acceptedFiles, '0.name', '~ ~ ~')}" is pushing to canvas...`}>
          {!isDragActive ? !isFileDialogActive ? null : <p>Selecting file...</p>
            : isDragReject ? <p>Invalid file...</p>
              : <p>Drop the file here ...</p>}
        </Loader>
      </div>
    </div>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="mb-4" />
    <Loader active={!initialized}>
      <div className="code-block_ mb-2">
        <NoRenderCanvas ref={getCanvas} />
      </div>
      <div className="flex grow code-block">
        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    </Loader>
  </div>
})
