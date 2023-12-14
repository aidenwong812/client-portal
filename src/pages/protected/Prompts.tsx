import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Prompts from '../../features/prompts'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Prompts"}))
      }, [])


    return(
        <Prompts />
    )
}

export default InternalPage