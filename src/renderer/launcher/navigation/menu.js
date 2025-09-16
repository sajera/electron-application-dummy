// outsource dependencies
import { HomeIcon, QueueListIcon, WindowIcon, PlusIcon, WrenchScrewdriverIcon, CpuChipIcon, PaintBrushIcon } from '@heroicons/react/24/solid'
// local dependencies
import * as ROUTS from './routs'

export const MENU_ITEM_TYPE = {
  MENU: 'MENU',
  LINK: 'LINK',
  HEADER: 'HEADER',
  ACTION: 'ACTION',
  EXTERNAL_LINK: 'EXTERNAL_LINK',
}

export const createWindowMenuItem = ({ id, title }) => ({
  name: title,
  icon: WindowIcon,
  type: MENU_ITEM_TYPE.LINK,
  link: ROUTS.WINDOW.DETAILS.LINK({ id }),
  isActive: path => ROUTS.WINDOW.DETAILS.LINK({ id }) === path,
})

export default [
  {
    icon: HomeIcon,
    name: 'Home',
    type: MENU_ITEM_TYPE.LINK,
    link: ROUTS.WELCOME.LINK(),
    isActive: path => ROUTS.WELCOME.ROUTE === path,
  },
  {
    icon: PaintBrushIcon,
    name: 'Draw image',
    type: MENU_ITEM_TYPE.LINK,
    link: ROUTS.DRAW_IMAGE.LINK(),
    isActive: path => ROUTS.DRAW_IMAGE.ROUTE === path,
  },
  {
    name: 'AI',
    icon: CpuChipIcon,
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.WINDOW.TEST,
    list: [
      {
        name: 'Image',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.AI.IMAGE.LINK(),
        isActive: ROUTS.AI.IMAGE.TEST,
      },
      {
        icon: PlusIcon,
        name: 'Resources',
        disabled: true,
        type: MENU_ITEM_TYPE.ACTION,
        // link: ROUTS.WINDOW.DETAILS.LINK(),
        // isActive: path => ROUTS.WINDOW.DETAILS.LINK() === path,
      },
      {
        icon: PlusIcon,
        name: 'Create model',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.AI.DETAILS.LINK(),
        isActive: ROUTS.AI.DETAILS.TEST
      },
    ]
  },
  {
    name: 'WINDOWS',
    // icon: WindowIcon,
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.WINDOW.TEST,
    list: [
      {
        name: 'View all',
        icon: QueueListIcon,
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.WINDOW.LIST.LINK(),
        isActive: ROUTS.WINDOW.LIST.TEST,
      },
      {
        name: 'Create new',
        icon: PlusIcon,
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.WINDOW.DETAILS.LINK(),
        isActive: path => ROUTS.WINDOW.DETAILS.LINK() === path,
      }
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
      {
        name: 'DB SQLite',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DEV.SQL.LINK(),
        isActive: ROUTS.DEV.SQL.TEST,
      },
      {
        name: 'Debug Info',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DEV.DEBUG.LINK(),
        isActive: ROUTS.DEV.DEBUG.TEST,
      }
    ]
  },
]
