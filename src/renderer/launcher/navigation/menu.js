// outsource dependencies
import { HomeIcon, WindowIcon, PlusIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid'
// local dependencies
import * as ROUTS from './routs'

export const MENU_ITEM_TYPE = {
  MENU: 'MENU',
  LINK: 'LINK',
  HEADER: 'HEADER',
  ACTION: 'ACTION',
  EXTERNAL_LINK: 'EXTERNAL_LINK',
}

export default [
  {
    icon: HomeIcon,
    name: 'Home',
    type: MENU_ITEM_TYPE.LINK,
    link: ROUTS.WELCOME.LINK(),
    isActive: path => ROUTS.WELCOME.ROUTE === path,
  },
  {
    icon: WindowIcon,
    name: 'WINDOWS',
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.WINDOW.TEST,
    list: [
      {
        name: 'View all',
        icon: WindowIcon,
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.WINDOW.LIST.LINK(),
        isActive: ROUTS.WINDOW.LIST.TEST,
      },
      {
        name: 'Create',
        icon: PlusIcon,
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.WINDOW.DETAILS.LINK(),
        isActive: path => ROUTS.WINDOW.DETAILS.LINK() === path,
      },

    ]
  },
  {
    icon: WrenchScrewdriverIcon,
    name: 'DEVELOPMENT',
    hidden: !process.env.DEBUG,
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.DEV.TEST,
    list: [
      {
        name: 'Color Pallet',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DEV.COLOR.LINK(),
        isActive: ROUTS.DEV.COLOR.TEST,
      },
      {
        name: 'Toasts',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DEV.TOAST.LINK(),
        isActive: ROUTS.DEV.TOAST.TEST,
      },
    ]
  },
]
