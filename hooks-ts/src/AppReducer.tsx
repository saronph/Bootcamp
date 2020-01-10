import React, {useReducer} from 'react';

interface Cart {
  products: string[],
  shipping_value?: number;
}

type CartActionType = {
  type: 'ADD_PRODUCT' | 'REMOVE_PRODUCT'
}

const AppReducer: React.FC = () => {
  const cart = useReducer(
    (state: Cart, action: CartActionType) => {
      switch(action.type) {
        case 'ADD_PRODUCT':
          return {
            ...state,
            products: [...state.products, 'Produto novo']
          }
        default:
          return state;
      }
    },
    {
      products: ['dsadsa'],
      shipping_value: 0,
    },
  );


  return (
    <ul>
    </ul>
  );
}

export default AppReducer;
