import React from 'react';

const AddBtn = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#add-log-modal"
        className="modal-trigger btn-floating btn-large darken-2 waves-effect waves-light blue"
      >
        <i className="material-icons">add</i>
      </a>
      <ul>
        <li>
          <a
            href="#tech-list"
            className="modal-trigger btn-floating waves-effect waves-light green"
          >
            <i className="material-icons">person</i>
          </a>
        </li>
        <li>
          <a
            href="#add-tech-modal"
            className="modal-trigger btn-floating waves-effect waves-light red"
          >
            <i className="material-icons">person_add</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
