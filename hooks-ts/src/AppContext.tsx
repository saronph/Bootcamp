import React, {useContext} from 'react';
import CartContext from './CartContext';

const AppContext: React.FC = () => {
  const {products} = useContext(CartContext);

  return (
    <ul>
      {products?.map(product => product.price)}
    </ul>
  );
}

export default AppContext;
