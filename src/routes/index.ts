import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const FAQs = lazy(() => import('../pages/protected/FAQs'))
const Documents = lazy(() => import('../pages/protected/Documents'))
const Assistants = lazy(() => import('../pages/protected/Assistants'))
const Prompts = lazy(() => import('../pages/protected/Prompts'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/assistants', // the url
    component: Assistants, // view rendered
  },
  {
    path: '/knowledge-faqs', // the url
    component: FAQs, // view rendered
  },
  {
    path: '/knowledge-documents', // the url
    component: Documents, // view rendered
  },
  {
    path: '/prompts', // the url
    component: Prompts, // view rendered
  },
]

export default routes