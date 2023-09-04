import React from 'react'
import "../Popup/Popup.css"

const Popup = ({ onClose, Items }) => {
   return (
      <div className="popup-overlay">
         <div className="popup-content">
            {Items.map((item, index) => (
               <p key={index} onClick={item.onClick}>{item.label}</p>
            ))}
            <p onClick={onClose}>Cancel</p>
         </div>
      </div>
   )
}

export default Popup
