export interface Product {
  id: string,
  "image": {
      "thumbnail": string,
      "mobile": string,
      "tablet": string,
      "desktop": string
  },
  "name": string,
  "category": string,
  "price": number
}

export interface CartProduct {
  product: Product,
  quantity: number | 1,
}
