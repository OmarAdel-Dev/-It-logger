import React, { useState, useContext } from 'react';
import TechContext from '../../context/techs/techContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = () => {
  const techContext = useContext(TechContext);

  const { addTech } = techContext;

  const [tech, settech] = useState({
    firstName: '',
    lastName: ''
  });

  const { firstName, lastName } = tech;

  const onChange = e => {
    settech({ ...tech, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (firstName === '' || lastName === '') {
      M.toast({
        html: 'Please Enter the First and Last Names'
      });
    } else {
      addTech(tech);
      M.toast({
        html: `Tech ${firstName} ${lastName} was added to Techs list`
      });
      //Clear form
      settech({
        firstName: '',
        lastName: ''
      });
    }
  };

  return (
    <div id="add-tech-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Add New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={onChange}
            />
            <label htmlFor="firstName" className="active">
              Log firstName
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={onChange}
            />
            <label htmlFor="lastName" className="active">
              Log lastName
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          href="#!"
          className="modal-close btn waves-effect blue"
          onClick={onSubmit}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default AddLogModal;
