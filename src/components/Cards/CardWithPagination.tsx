import React from 'react'
import ProductCard1 from './ProductCard1'
import { IDropShipItem } from '@/Datatypes/interfaces/interface';
import ShopDefault from '../Shop/ShopDefault';

interface ProductCard1Props {
    cartItems: IDropShipItem[];
  }
  

  const CardWithPagination:React.FC<ProductCard1Props>=({cartItems})=> {
  return (
      <ShopDefault/>
  )
}

export default CardWithPagination
