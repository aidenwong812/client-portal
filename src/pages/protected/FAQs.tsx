import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import FAQs from '../../features/knowledge/faqs'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Knowledge Base"}))
      }, [])

    return(
        <FAQs />
    )
}

export default InternalPage