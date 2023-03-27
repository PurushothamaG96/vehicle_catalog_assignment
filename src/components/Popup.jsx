import React from 'react';
import "./popup.css"
function Popup(props) {
    
    return (props.trigg?(
        <div className='popup-page'>
            <div className="popup-container">
                <p type="button" onClick={()=>props.setTrigg(false)}>Close</p>
                <h2>{props.popData?.Mfr_Name}</h2>
                <h3>{props.popData?.Country}</h3>
                <h3>{props.popData?.Mfr_CommonName}</h3>
            </div>
        </div>
    ):"");
}

export default Popup;