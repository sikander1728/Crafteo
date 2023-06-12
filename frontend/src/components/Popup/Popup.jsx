import React from 'react'
import "../Popup/Popup.css"

const Popup = ({ onClose, logout, logoutUser, deleteProfile }) => {
   return (
      <div className="popup-overlay">
         <div className="popup-content">
            <p onClick={logout}>{logoutUser}</p>
            <p>{deleteProfile}</p>
            <p onClick={onClose}>Cancel</p>
         </div>
      </div>
   )
}

export default Popup
