import React, { useEffect, useState } from 'react'
import "../SearchUser/SearchUser.css"
import { MdPersonSearch } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { searchUser } from '../../Actions/User'
import SearchResultListing from '../Search Result Listing/SearchResultListing'

const SearchUser = () => {
   const [query, setQuery] = useState('')
   const dispatch = useDispatch()

   useEffect(()=>{
      if(query.length <1){
         dispatch({
            type: "resetSearch"
         })
      }
   },[query, dispatch])

   const handleSearch = (value) => {
      setQuery(value);
      if (value.length > 2) {
         dispatch(searchUser(value))
      }else{
         dispatch({
            type: "resetSearch"
         })
      }
   }

   const showAllData = () => {
      dispatch({
         type: "resetSearch"
      })
      dispatch(searchUser(query))
   }

   return (
      <div className="App">
         <div className='main d-flex'>
            <div className='content-section search-section'>
               <form className='w-100 text-center'>
                  <h3 className='pt-2 pb-4'>Search Users</h3>
                  <div className="input-search">
                     <input type="text" placeholder='Search' name='search'
                        value={query} onChange={(e) => handleSearch(e.target.value)} />
                     <MdPersonSearch onClick={showAllData}/>
                  </div>
               </form>
               <SearchResultListing/>
            </div>
         </div>
      </div>
   )
}

export default SearchUser
