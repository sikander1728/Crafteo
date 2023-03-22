import React from 'react'
import '../Dropup/Dropup.css'

const Dropup = () => {
    return (
        <div class="btn-group dropup">
            <button type="button" class="btn text-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
            </button>
            <ul class="dropdown-menu up rounded-5 ps-3 text-light">
                <li>Logout</li>
            </ul>
        </div>
    )
}

export default Dropup
