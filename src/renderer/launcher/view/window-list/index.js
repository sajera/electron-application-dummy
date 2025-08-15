// outsource dependencies
import _ from 'lodash'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import React, { useEffect, useMemo } from 'react'
import { EyeIcon, PlusIcon } from '@heroicons/react/24/outline'
// local dependencies
import store from './store'
import { WINDOW } from '../../navigation'
import { Btn } from '../../../component/btn'
import { Loader } from '../../../component/loader'
import { ErrorMessage } from '../../../component/alert'
import { isActiveElement } from '../../../component/hook'


export default observer(function List () {
  const { list, initialized, disabled, errorMessage } = store
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(store.initialize, [])

  const prepared = useMemo(() => _.map(list, item => ({
    ...item,
    link: WINDOW.DETAILS.LINK({ id: item.id }),
    // NOTE any buttons within "tr" will be ignored
    onClick: event => !isActiveElement(event) && WINDOW.DETAILS.PUSH({ id: item.id })
  })), [list])

  return <div className="relative flow-root">
    <h2 className="flex items-center text-3xl m-4">
      Windows
      <Btn
        tag={Link}
        title="Create new Window"
        to={WINDOW.DETAILS.LINK()}
        className="btn-primary-outline flex ml-4"
      >
        <PlusIcon className="size-6" />
      </Btn>
    </h2>
    <ErrorMessage message={errorMessage} onClear={store.clearError} className="m-4" />
    <div className="overflow-auto">
      <Loader active={!initialized || disabled.get('list')} className="!h-96">
        <div className="inline-block min-w-full align-middle">
          <table className="relative min-w-full align-middle">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-600 z-1 shadow-inner text-left text-sm">
              <tr>
                <th className="p-1 pl-3">ID</th>
                <th className="p-1 min-w-60">Title</th>
                <th className="p-1">Width</th>
                <th className="p-1">Height</th>
                <th className="p-1">Visibility</th>
                <th className="p-1 pr-3">Closed</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {!initialized ? null : _.isEmpty(prepared) ? <tr>
                <td colSpan="11" className="font-bold text-muted py-4 text-center">No windows were found</td>
              </tr> : _.map(prepared, item => <tr
              key={item.id}
              role="menuitem"
              onClick={item.onClick}
              onKeyDown={item.onClick}
              className="cursor-pointer even:bg-gray-100 hover:bg-gray-200 dark:even:bg-gray-800 dark:hover:bg-gray-700"
            >
                <td className="p-2 pl-3">#{item.id}</td>
                <td className="whitespace-nowrap p-2">
                  <Link to={item.link} className="link hover:underline">
                    {item.title}
                  </Link>
                </td>
                <td className="p-2">{item.width || '~ ~ ~'}</td>
                <td className="p-2">{item.height || '~ ~ ~'}</td>
                <td className="p-2">{item.show}</td>
                <td className="p-2">{item.closed}</td>
                <td>
                  <Btn
                  tag={Link}
                  to={item.link}
                  title="Go to window details"
                  className="flex items-center w-full whitespace-nowrap shadow-none"
                >
                    <EyeIcon className="size-4 text-primary-500 mr-2" /> Details
                  </Btn>
                </td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </Loader>
    </div>
  </div>
})
