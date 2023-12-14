import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Assistants from '../../features/assistants'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Assistants"}))
      }, [])

    return(
        <Assistants />
    )
}

export default InternalPage