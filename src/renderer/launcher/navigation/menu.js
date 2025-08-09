// outsource dependencies
import { HomeIcon, CubeIcon, ChartPieIcon, BugAntIcon } from '@heroicons/react/24/solid'
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
    // hidden: true,
    icon: ChartPieIcon,
    name: 'DASHBOARDS',
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.DASHBOARD.TEST,
    list: [
      {
        name: 'Streaming Jobs',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DASHBOARD.STREAMING.LINK(),
        isActive: ROUTS.DASHBOARD.STREAMING.TEST,
      },
      {
        name: 'Batch Jobs',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DASHBOARD.BATCH.LINK(),
        isActive: ROUTS.DASHBOARD.BATCH.TEST,
      },
      {
        name: 'RDS Export',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DASHBOARD.RDS.LINK(),
        isActive: ROUTS.DASHBOARD.RDS.TEST,
      },
      {
        name: 'Data Export',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DASHBOARD.DATA_EXPORT.LINK(),
        isActive: ROUTS.DASHBOARD.DATA_EXPORT.TEST,
      },
      {
        name: 'SLA History',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DASHBOARD.SLA.LINK(),
        isActive: ROUTS.DASHBOARD.SLA.TEST,
      },
      {
        name: 'Tables Latency',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.DASHBOARD.LATENCY.LINK(),
        isActive: ROUTS.DASHBOARD.LATENCY.TEST,
      },
    ]
  },
  {
    icon: CubeIcon,
    name: 'TOOLS',
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.TOOLS.TEST,
    list: [
      {
        name: 'RDS Export Config',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.TOOLS.RDS_EXPORT.LINK(),
        isActive: ROUTS.TOOLS.RDS_EXPORT.TEST,
      },
      {
        name: 'Data Export Config',
        type: MENU_ITEM_TYPE.LINK,
        link: ROUTS.TOOLS.DATA_EXPORT.LINK(),
        isActive: ROUTS.TOOLS.DATA_EXPORT.TEST,
      }
    ]
  },
  {
    icon: BugAntIcon,
    name: 'BETA',
    // hidden: true,
    type: MENU_ITEM_TYPE.MENU,
    isActive: ROUTS.BETA.TEST,
    list: [
      {
        name: 'Metadata',
        type: MENU_ITEM_TYPE.LINK,
        link: '/TODO',
        isActive: () => false,
      }
    ]
  },
]
