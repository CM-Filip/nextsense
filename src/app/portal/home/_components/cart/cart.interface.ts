import { ProductDTO } from "@shared/_services/store/store.interface"

export type CartDetails = {
  id: number
  userId: number
  date: string
  products: Array<CartProduct>
}

export type CartProduct = ProductDTO & {
  totalPrice: number
  quantity: number
}