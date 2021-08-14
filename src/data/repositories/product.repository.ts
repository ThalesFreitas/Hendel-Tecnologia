import { Collection } from '../../domain/models/collection'
import { Product, ProductCollectionItem } from '../../domain/models/product.model'
import { RelatedProduct } from '../../domain/models/related-product.model'
import { ProductRepositoty } from '../../domain/repositories/product.repository'
import { httpClient } from '../config/http-client'
import { productCollectionMapper,productMapper,relatedProductMapper } from '../mappers/product.mapper'




export class IProductDepository implements ProductRepositoty {
  async getProducts(current_page:number ,page_size: number, predicate_price:string,predicate_quantity:string,id: string, name:string, price:string, quantity:string): Promise<Collection<ProductCollectionItem>> {
    const response = await httpClient.get(`products?page=${current_page + 1}&page_size=${page_size}&q[id_eq]=${id}&q[name_cont]=${name}&q[price_${predicate_price}]=${price}&q[quantity_${predicate_quantity}]=${quantity}`)
    return productCollectionMapper(response.data)
  }

  async getProduct(id: number): Promise<Product> {
    const response = await httpClient.get(`products/${id}`)
    return productMapper(response.data)
    //throw new Error('Method not implemented.')
  }
  updateProduct(id: number, attributes: Record<string, any>): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  createProduct(attributes: Record<string, any>): Promise<Product> {
    throw new Error('Method not implemented.')
  }
  deleteProduct(id: number): Promise<void> {
    throw new Error('Method not implemented.')
  }
  async addRelatedProduct(productId: number, relatedProductId: number): Promise<RelatedProduct> {
    const response = await httpClient.post(`/products/${productId}/related_products`,{
      related_product_id: relatedProductId
    })
    return relatedProductMapper(response.data)
    //throw new Error('Method not implemented.')
  }
  async removeRelatedProduct(productId: number, relatedProductId: number): Promise<void> {
    const response = await httpClient.delete(`/products/${productId}/related_products/${relatedProductId}`,{
      
    })
    return (response.data)
    //throw new Error('Method not implemented.')
  }
}

export default new IProductDepository()
