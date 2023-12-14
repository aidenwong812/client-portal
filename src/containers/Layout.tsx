import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LeftSidebar from "./LeftSidebar";
import ModalLayout from "./ModalLayout";
import PageContent from "./PageContent";
import { RootState } from "../app/store";
import { removeNotificationMessage } from "../features/common/headerSlice";

const Layout = () => {
  const dispatch = useDispatch()
  const { newNotificationMessage, newNotificationStatus } = useSelector((state: RootState) => state.header)

  useEffect(() => {
    if (newNotificationMessage !== "") {
      if (newNotificationStatus === 1) {
        toast.success(newNotificationMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
      }
      if (newNotificationStatus === 0) {
        toast.error(newNotificationMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
      dispatch(removeNotificationMessage())
    }
  }, [newNotificationMessage])

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <PageContent />
        <LeftSidebar />
      </div>

      <ToastContainer />

      <ModalLayout />
    </>
  )
}

export default Layout;