import React, { useState, useContext, useEffect } from 'react';
import LogsContext from '../../context/logs/logContext';
import TechsContext from '../../context/techs/techContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const AddLogModal = () => {
  const logsContext = useContext(LogsContext);
  const techContext = useContext(TechsContext);

  const { addLog } = logsContext;
  const { techs, loading, getTechs } = techContext;

  useEffect(() => {
    getTechs();
    //eslint-disable-next-line
  }, []);

  const [log, setlog] = useState({
    message: '',
    attention: false,
    tech: ''
  });

  const { message, attention, tech } = log;

  const onChange = e => {
    setlog({ ...log, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (message === '' || tech === '') {
      M.toast({
        html: 'Please Enter a Message and a Tech'
      });
    } else {
      addLog(log, (log.date = new Date()));

      M.toast({ html: `Log added by ${tech}` });
      //Clear form
      setlog({
        message: '',
        attention: false,
        tech: ''
      });
    }
  };

  return (
    <div id="add-log-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={onChange}
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

export default AddLogModal;
