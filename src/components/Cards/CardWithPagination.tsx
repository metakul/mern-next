import React from 'react'
import ProductCard1 from './ProductCard1'
import { IDropShipItem } from '@/Datatypes/interfaces/interface';

interface ProductCard1Props {
    cartItems: IDropShipItem[];
  }
  

  const CardWithPagination:React.FC<ProductCard1Props>=({cartItems})=> {
  return (
    <div>
      <ProductCard1 cartItems={cartItems}/>
    </div>
  )
}

export default CardWithPagination
