import routes from '../routes/sidebar'
import { NavLink, Link, useLocation } from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'

const LeftSidebar = () => {
  const location = useLocation();

  const close = () => {
    document.getElementById('left-sidebar-drawer')?.click()
  }

  return (
    <div className="drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu p-0 pt-2 w-80 bg-base-100 text-base-content">
        <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" onClick={() => close()}>
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl">

          <Link to={'/'}><img className="mask mask-squircle w-10" src="/logo.png" alt="ChatBot Logo" />Client Portal</Link> </li>
        {
          routes.map((route, k) => {
            return (
              <li className="" key={k}>
                {
                  route.submenu ?
                    <SidebarSubmenu {...route} /> :
                    (<NavLink
                      end
                      to={route.path}
                      className={({ isActive }) => `${isActive ? 'font-semibold  bg-base-200 rounded-none' : 'font-normal'} py-3`} >
                      {route.icon} {route.name}
                      {
                        location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 bg-primary "
                          aria-hidden="true"></span>) : null
                      }
                    </NavLink>)
                }

              </li>
            )
          })
        }

      </ul>
    </div>
  )
}

export default LeftSidebar