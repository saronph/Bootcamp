import React from 'react';
import PropTypes from 'prop-types';

//passar parametros da função, desestr para pegar apenas 'tech'
function TechItem({ tech, onDelete }) {
  return (    
    <li>
      {tech}
      <button       
      onClick={onDelete} 
      type="button">Remover</button>
    </li>
  );
}

//proptypes valida as propriedades que o componente recebe
//defaultprops preenche informações quando não informado
TechItem.defaultProps = {
  tech: 'Oculto',
};

TechItem.propTypes = {
  tech: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
}

export default TechItem;