// import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import { SideMenu } from '../utils/Type';
import { CircleStackIcon } from '@heroicons/react/24/outline';
import ServerStackIcon from '@heroicons/react/24/outline/ServerStackIcon';
import QueueListIcon from '@heroicons/react/24/outline/QueueListIcon';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'

const iconClasses = 'h-6 w-6';
const submenuIconClasses = 'h-5 w-5';

const routes: SideMenu = [
  // {
  //   path: '/app/dashboard',
  //   icon: <Squares2X2Icon className={iconClasses} />,
  //   name: 'Dashboard',
  // },
  {
    path: '/app/assistants',
    icon: <ServerStackIcon className={iconClasses} />,
    name: 'Assistants',
  },
  {
    path: '',
    icon: <CircleStackIcon className={`${iconClasses} inline`} />,
    name: 'Knowledge Base',
    submenu: [
      {
        path: '/app/knowledge-faqs', //url
        icon: <QueueListIcon className={submenuIconClasses} />, // icon component
        name: 'FAQ', // name that appear in Sidebar
      },
      {
        path: '/app/knowledge-documents',
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component,
        name: 'Document',
      },
    ]
  },
  // {
  //   path: '/app/prompts',
  //   icon: <QueueListIcon className={iconClasses} />,
  //   name: 'Prompts',
  // },
];

export default routes;