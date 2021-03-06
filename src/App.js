import React, { Fragment, useEffect } from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import AddLogModal from './components/logs/AddLogModal';
import EditLogModal from './components/logs/EditLogModal';
import AddTechModal from './components/techs/AddTechModal';
import TechListModal from './components/techs/TechListModal';

import LogState from './context/logs/LogState';
import TechState from './context/techs/TechState';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

function App() {
  useEffect(() => {
    M.AutoInit();
  });
  return (
    <LogState>
      <TechState>
        <Fragment>
          <SearchBar />
          <div>
            <AddLogModal />
            <EditLogModal />
            <AddTechModal />
            <TechListModal />
            <AddBtn />
            <Logs />
          </div>
        </Fragment>
      </TechState>
    </LogState>
  );
}

export default App;
