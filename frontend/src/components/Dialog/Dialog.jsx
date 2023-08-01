import "../Dialog/Dialog.css"
import {AiOutlineClose} from 'react-icons/ai'

const Dialog = ({onClose, DialogTitle}) => {
   return (
      <div className="Dialog-overlay">
         <div className="Dialog-content">
            <div className="Dialog-header d-flex justify-content-center">
               <h5>{DialogTitle}</h5>
               <AiOutlineClose onClick={onClose}/>
            </div>
            <div className="Dialog-body">
               
            </div>
         </div>
      </div>
   )
}

export default Dialog
