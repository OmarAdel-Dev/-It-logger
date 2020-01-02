import React, { useState, useEffect, useContext } from 'react';
import LogContext from '../../context/logs/logContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = () => {
  const logContext = useContext(LogContext);

  const { current, updateLog, clearCurrent } = logContext;

  useEffect(() => {
    if (current !== null) {
      setlog(current);
    } else {
      setlog({
        message: '',
        attention: false,
        tech: ''
      });
    }
  }, [logContext, current]);

  const [log, setlog] = useState({
    message: '',
    attention: false,
    tech: ''
  });

  const { id, message, attention, tech } = log;

  const onChange = e => {
    setlog({ ...log, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current !== null) {
      updateLog(log);
      M.toast({ html: `Log with ID #${id} Updated` });

      //Clear form
      setlog({
        message: '',
        attention: false,
        tech: ''
      });
    }
  };

  return (
    <div id="edit-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Edit System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={onChange}
              placeholder=" "
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={onChange}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <option value="Rawan">Rawan</option>
              <option value="Yumna">Yumna</option>
              <option value="Ahmed">Ahmed</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  name="attention"
                  checked={attention}
                  value={attention}
                  onChange={onChange}
                />
                <span>Needs Attention</span>
              </label>
            </p>
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

export default EditLogModal;
