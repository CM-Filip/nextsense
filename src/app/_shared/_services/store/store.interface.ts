export type ProductsDTO = Array<ProductDTO>
export type ProductDTO = {
  id: number
  title: string
  description: string
  category: string
  price: string
  image: string
}
export type CategoriesDTO = Array<string>
export type CartsDTO = Array<CartDTO>
export type CartDTO = {
  id: number
  userId: number
  date: string
  products: Array<CartProductDTO>
}
export type CartProductDTO = {
  productId: number
  quantity: number
}
export type CartData = {
  userId: number
  date: string
  products: Array<CartProductDTO>
}
export type GetProductsRequestParams = {
  limit?: number
  sort?: 'desc' | 'asc'
}