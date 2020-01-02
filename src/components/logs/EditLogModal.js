import React, { useState, useEffect, useContext } from 'react';
import LogContext from '../../context/logs/logContext';
import TechsContext from '../../context/techs/techContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const EditLogModal = () => {
  const logContext = useContext(LogContext);
  const techsContext = useContext(TechsContext);

  const { current, updateLog } = logContext;
  const { techs, loading, getTechs } = techsContext;

  useEffect(() => {
    getTechs();

    if (current !== null) {
      setlog(current);
    } else {
      setlog({
        message: '',
        attention: false,
        tech: ''
      });
    }
    //eslint-disable-next-line
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
              {!loading && techs.length === 0 ? (
                <p>No techs to show</p>
              ) : (
                techs.map(tech => (
                  <option
                    key={tech.id}
                    value={tech.firstName + ' ' + tech.lastName}
                  >
                    {tech.firstName} {tech.lastName}
                  </option>
                ))
              )}
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
