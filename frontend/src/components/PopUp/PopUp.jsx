import React from 'react';
import './PopUp.css'; 

const PopUp = ({ show, handleClose, handleSave, title, setTitle }) => {
    if (!show) {
        return null;
      }
    
      return (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Thread Title</h2>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Thread title"
            />
            <div className="modal-actions">
              <button onClick={handleClose}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      );
};

export default PopUp;
