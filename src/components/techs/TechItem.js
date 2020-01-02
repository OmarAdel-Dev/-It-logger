import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TechContext from '../../context/techs/techContext';
import M from 'materialize-css/dist/js/materialize.min.js';

const TechItem = ({ tech }) => {
  const techContext = useContext(TechContext);

  const { deleteTech } = techContext;

  const onDelete = () => {
    deleteTech(tech.id);
    M.toast({ html: `Tech ${tech.firstName} ${tech.lastName} Deleted` });
  };

  return (
    <div className="collection-item">
      <div>
        {tech.firstName} {tech.lastName}
        <a href="#!" className="secondary-content">
          <i className="material-icons grey-text" onClick={onDelete}>
            delete
          </i>
        </a>
      </div>
    </div>
  );
};

TechItem.propTypes = {
  tech: PropTypes.object.isRequired
};

export default TechItem;
