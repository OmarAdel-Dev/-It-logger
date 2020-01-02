import React, { useEffect, useContext } from 'react';
import LogContext from '../../context/logs/logContext';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';

const Logs = () => {
  const logContext = useContext(LogContext);

  const { logs, loading, getLogs } = logContext;

  useEffect(() => {
    getLogs();
    //eslint-disable-next-line
  }, []);

  if (loading) return <Preloader />;

  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h4 className="center">System Logs</h4>
      </li>
      {!loading && logs.length === 0 ? (
        <p className="center">No logs to show</p>
      ) : (
        logs.map(log => <LogItem log={log} key={log.id} />)
      )}
    </ul>
  );
};

export default Logs;
