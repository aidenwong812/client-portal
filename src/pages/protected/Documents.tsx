import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Documents from '../../features/knowledge/documents'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Knowledge Base"}))
      }, [])

    return(
        <Documents />
    )
}

export default InternalPage