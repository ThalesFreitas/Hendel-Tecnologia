import {useParams} from 'react-router-dom'
import { useState, useEffect,useCallback,FormEvent } from 'react'
import { Product} from '../../domain/models/product.model'
import {RelatedProduct} from '../../domain/models/related-product.model'
import repo from '../../data/repositories/product.repository'

import {Container,Content,RelatedProducts,RelatedProductsList,Toast} from './styledProductDetail'

import {AiOutlineClose} from 'react-icons/ai'

interface Params {
  id: string;
}

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState<Product>()
  const [related_product_id,setRelated_Product_Id] = useState(0)
  const [error,setError] = useState(false)
  const [none_product, setNone_Product] = useState(false)

  const [loading,setLoading] = useState(false)

const [relate_product, setRelated_Product] = useState<RelatedProduct[]>([])
const [submit,setSubmit] = useState(false)

const [toast,setToast] = useState(false)
const [message_toast,setMessage_Toast] = useState('')

  let {id} = useParams<Params>()
  

  useEffect(() => {
    async function List(){
      try {
        setLoading(true)
       await repo.getProduct(Number(id)).then(
        response => {
          setProductDetail(response)
          if(response.relatedProducts.length === 0){
            setNone_Product(true)
          }
          setRelated_Product(response.relatedProducts)
        } 
         )
       } catch (error) {
        throw new Error("Erro ao buscar os dados");
       }finally {
        setLoading(false)
       }
    }
    List()   
  }, [id])

 
 function handleChangeID(id: string){
    setRelated_Product_Id(Number(id))
 }

function handleToastView(){
  
  setToast(true)
  setTimeout(() => {
    setToast(false)
  },5000);
}
   
const handleNewProduct = useCallback(async (event: FormEvent) => {
  event.preventDefault()
  
  try {
    setSubmit(true)
   
    if(!related_product_id){
      setToast(true)
      setError(true)
      setTimeout(() => {
        
        setError(false)
        setToast(false)
      },5000
      )
     
      
     throw new Error("Preencha com um ID!");
     
    }
    
    if(related_product_id === Number(id)){
      handleToastView()
      throw new Error('Produto relacionado não pode ser o mesmo de produto principal!');
      
    }

    const productRelateExist = relate_product.find((item) =>  item.id === related_product_id) //verifica se existe produto igual
    if(productRelateExist === undefined && related_product_id !== Number(id)){
      await repo.addRelatedProduct(Number(id),related_product_id).then(
             response => {
                setRelated_Product(state => [...state, response])
             } 
           ).catch(
             () =>
             {
              handleToastView()
              throw new Error('Este produto não existe na lista de produtos!');
             }
           
           )
           
           setRelated_Product_Id(0)
           setNone_Product(false)
      }else{
        
        handleToastView()
       throw new Error('Este produto já foi inserido na lista!');
      }

  
  } catch (error) {
    setMessage_Toast(error.message)
  }finally{
    setSubmit(false)
  }
         
}, [id,related_product_id,relate_product])

const handleRemoveProduct = useCallback(async (value:number) => {
  await repo.removeRelatedProduct(Number(id),Number(value));

  const filterproduct = relate_product.filter(relate => relate.id !== value);
  setRelated_Product(filterproduct)
 
  if(relate_product.length === 1){
    setNone_Product(true)
  }
 
}, [id,relate_product])


  return (
    <>
    {loading === true ? <h3>Carregando...</h3> : ''}
  
    <Container>
      <Content>
        <h3>Detalhes do produto</h3>
        <strong>Nome</strong>
        <p>{productDetail?.name}</p>

          <div className={"container_quant_price"}>
              <div>
                <strong>Quantidade</strong>
                <p>{productDetail?.quantity}</p>
              </div>
              <p className="cash">{productDetail?.price}</p>
          </div>
        <RelatedProducts>
          <div className={`${error === true ? 'msn_erro_activ' : 'msn_erro_inativ'}`}>
          <span >Preencha com um ID</span>
          </div>
        
          <header>
          <strong>Produtos Relacionados</strong>
          <form onSubmit={handleNewProduct}>
          <input 
          className={`${error === true && 'input_erro_activ'}`}
          type="text" placeholder="ID do Produto" 
           value={related_product_id === 0 ? '' : related_product_id}
           onChange={(e) => handleChangeID(e.target.value)}
          />
          
            <button type="submit"
            disabled={submit ? true : false}
            className={`${submit && 'submit_button'}`}
            >{submit ? 'Cadastrando' : 'Cadastrar Produto'}</button>
          </form>
          </header>
         
            <RelatedProductsList>
             {none_product &&
               <strong>Nenhum produto relacionado, cadastre um novo produto!</strong>
             }
           
              {relate_product.map((relate) =>
              <section key={relate.id}>
              <div >
                <strong>ID {relate.id}</strong>
                <p>{relate.name}</p>
                <p className="related_cash">{relate.price}</p>
                <p>ID produto principal : {id}</p>
                 
             </div>
             <AiOutlineClose onClick={() =>handleRemoveProduct(relate.id)}/>
            </section>  
              )}
          </RelatedProductsList>
          
        </RelatedProducts>
        {toast &&
      <Toast>
      <div>
      <p>{message_toast}</p>
      </div>
      <AiOutlineClose onClick={() => setToast(false)}/>
    </Toast>
      }
      </Content>

      
    </Container>
   </>
  )
}

export default ProductDetail
