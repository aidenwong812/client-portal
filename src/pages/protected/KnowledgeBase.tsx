import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import KnowledgeBase from '../../features/knowledge'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Knowledge Base"}))
      }, [])

    return(
        <KnowledgeBase />
    )
}

export default InternalPage