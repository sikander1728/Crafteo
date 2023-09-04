import { useSelector } from 'react-redux'
import '../Search Result Listing/SearchResultListing.css'
import AllUsers from '../AllUsers/AllUsers'

const SearchResultListing = () => {
   const { users } = useSelector((state) => state.userSearch)

   if (!users) {
      return null; 
   }  
   if (typeof users === 'string') {
      return <h6 className='text-center pt-3'>No Users Found</h6>;
   }

   return (
      <div className="resultListing">
         {
            users?.map((elem) => {
               return <AllUsers userAvatar={elem.avatar?.url} username={elem.username} />
            })
         }
      </div>
   )
}

export default SearchResultListing
