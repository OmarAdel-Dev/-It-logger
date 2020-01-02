import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import LogsContext from '../../context/logs/logContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const LogItem = ({ log }) => {
  const logContext = useContext(LogsContext);
  const { deleteLog, setCurrent, clearCurrent } = logContext;

  const { id } = log;

  const onDelete = () => {
    deleteLog(id);
    M.toast({ html: `Log with ID #${id} Deleted` });
  };

  return (
    <li className="collection-item">
      <a
        href="#edit-log-modal"
        className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`}
        onClick={() => setCurrent(log)}
      >
        {log.message}
      </a>
      <br />
      <span className="grey-text">
        <span className="black-text">ID #{log.id}</span> last updated by{' '}
        <span className="black-text">{log.tech}</span> on{' '}
        <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
      </span>
      <a href="#!" className="secondary-content">
        <i className="material-icons grey-text" onClick={onDelete}>
          delete
        </i>
      </a>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;
