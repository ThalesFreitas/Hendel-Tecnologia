import { useState, useEffect } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Collection } from '../../domain/models/collection'
import { ProductCollectionItem } from '../../domain/models/product.model'
import repo from '../../data/repositories/product.repository'
import {IoIosArrowBack,IoIosArrowForward} from 'react-icons/io'
import {Pagination} from './pagination'

function ProductList() {
  const currentPageLocalStorage = (localStorage.getItem('@Hendel:currentPage'));

  const [productCollection, setProductCollection] = useState<Collection<ProductCollectionItem>>()
  const [total_row_count, setTotal_Row_Count] = useState(1)
  const [page_size, setPage_Size] = useState(20)
  const [current_page, setCurrent_Page] = useState(currentPageLocalStorage ? Number(currentPageLocalStorage) : 0)
  const [predicate_price, setPredicate_Price] = useState('')
  const [predicate_quantity, setPredicate_Quantity] = useState('')
  const [id,setID] = useState('')
  const [name,setName] = useState('')
  const [quantity,setQuantity] = useState('')
  const [price,setPrice] = useState('')


  useEffect(() => {
    repo.getProducts(current_page, page_size, predicate_price, predicate_quantity, id, name, price, quantity).then(response => 
      {
        setProductCollection(response)
        setTotal_Row_Count(response.totalRowCount)
        setPage_Size(response.pageSize)
      }
      
    )
  }, [current_page,page_size,predicate_price,predicate_quantity,id,name,price,quantity])

  const [totalPages, setTotalPages] = useState(5)
 
  useEffect(() => {
    setTotalPages(Math.ceil( total_row_count / page_size))
  },[total_row_count,page_size])



  const pages = [];
  
  for (let i = 1; i <= Math.ceil( total_row_count / page_size); i++) { 
      pages.push(i);   
    }
    
    let maxPages = 5
    let startPage: number, endPage: number;

    if (pages.length <= maxPages) {
      startPage = 0;
      endPage = pages.length;
    } else {
      if (current_page <= 2) {
          startPage = 0;
          endPage = maxPages;
    
      } else if (current_page + 2 >= pages.length) {
          startPage = pages.length - maxPages + 1;
          endPage = pages.length;
      } else {
          startPage = current_page - 2;
          endPage = current_page + 2;
      }
    }
    let pageitem = Array.from(Array((endPage) - startPage).keys()).map(i => startPage + i);
   
    const previousClass = (totalPages > 0 && current_page > 0 ) === false && 'inactive_page';
    const nextClass = ((current_page + 1) < totalPages)  === false   && 'inactive_page';

    function handleActivePage(value:number) {
      setCurrent_Page(value) 
      localStorage.setItem('@Hendel:currentPage', JSON.stringify((value)))
    }

    function handleID(id:string){
        setCurrent_Page(0)
        setID(String(id))
    }
    function handleName(name:string){
      setCurrent_Page(0)
      setName(String(name))
    }
  
    function handlePredicatePrice(predicate:string) {
      
      
      if(predicate === "="){
        setPredicate_Price("eq")
      }else if (predicate === "<>"){
        setPredicate_Price("not_eq")
      }else if (predicate === ">"){
        setPredicate_Price("gt")
      }else if (predicate === ">="){
        setPredicate_Price("gteq")
      }else if (predicate === "<"){
        setPredicate_Price("lt")
      }else {
        setPredicate_Price("lteq")
      } 
    }
    
    function handlePrice(price:string) {
      setCurrent_Page(0)
      setPrice(String(price))
     
    }
  

    function handlePredicateQuantity(predicate:string){
      
      if(predicate === "="){
        setPredicate_Quantity("eq")
      }else if (predicate === "<>"){
        setPredicate_Quantity("not_eq")
      }else if (predicate === ">"){
        setPredicate_Quantity("gt")
      }else if (predicate === ">="){
        setPredicate_Quantity("gteq")
      }else if (predicate === "<"){
        setPredicate_Quantity("lt")
      }else {
        setPredicate_Quantity("lteq")
      }
    }

    function handleQuantity(quantity: string) {
      setCurrent_Page(0)
      setQuantity(String(quantity))
    }

  return (
    <div>
      <h1 className="h3 mb-2 text-gray-800">Listagem de produtos</h1>
      <Pagination>
      {totalPages !== 1 ? (
              <div className={`first_page ${previousClass}`}
              onClick={() => 
             
              handleActivePage(0)
              }
              >Primeira</div>
              ):
              ''
              }

      {totalPages !== 1 ? (
       <IoIosArrowBack className={`arrow-left ${previousClass}`} 
                onClick={() => handleActivePage(current_page > 0 ? current_page - 1 : 0 )}/>
                ): '' 
        }
         {totalPages !== 1 ? (
               <div className="number_of_pages">
                    {pageitem.map(item => (
                       <div className={`current ${item === current_page ? 'activepage' : ''}` } key={item} onClick={() => handleActivePage(item)}>
          
                      {item + 1}
              
                    </div> 
                    ))}
                
                </div>
               ):
               ''
               }
            <IoIosArrowForward  className={`arrow-right ${nextClass}`} 
                 onClick={() => handleActivePage(current_page + 1 < totalPages ? current_page +1 : current_page)}/> 

                <div className={`last_page ${nextClass}`}
                onClick={() => handleActivePage(totalPages - 1)}
                >
               Última</div>
      </Pagination>
    
      <div className="card shadow mb-4">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-bordered" width="100%">
              <thead className="card-header py-3">
                <tr>
                  <th style={{ width: '120px' }}>ID</th>
                  <th>Nome</th>
                  <th style={{ width: '200px' }}>Preço</th>
                  <th style={{ width: '200px' }}>Quantidade</th>
                </tr>
                <tr>
                  <th className='py-1'>
                    <Form.Control size='sm'  onChange={(e) => handleID(e.target.value)}/>
                  </th>
                  <th className='py-1'>
                    <Form.Control size='sm' onChange={(e) => handleName(e.target.value)}/>
                  </th>
                  <th className='py-1'>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <Form.Control as='select' size='sm' 
                        className={"predicate_price"}
                        onChange={(e) => 
                          handlePredicatePrice(e.target.value)}
                        >
                          
                          {
                            ['=', '<>', '>', '>=', '<', '<='].map((item, index) => 
                            
                            (
                              <option key={index} value={item} 
                                >{item}</option>
                            ))
                          }
                        </Form.Control >
                      </InputGroup.Prepend >
                      <Form.Control size='sm' onChange={(e) => handlePrice(e.target.value)}/>
                    </InputGroup>
                  </th>
                  <th className='py-1'>
                    <InputGroup >
                      <InputGroup.Prepend >
                        <Form.Control as='select' size='sm' 
                        onChange={(e) => handlePredicateQuantity(e.target.value)}
                        >
                          {
                            ['=', '<>', '>', '>=', '<', '<='].map((item, index) => (
                              <option key={index} value={item}
                              >{item}</option>
                            ))
                          }
                        </Form.Control>
                      </InputGroup.Prepend>
                      <Form.Control size='sm' onChange={(e) => handleQuantity(String(e.target.value))} 
                      />
                    </InputGroup>
                  </th>
                </tr>
              </thead>
              <tbody>
                {productCollection && (
                  productCollection.data.map(product => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td><Link to={`products/${product.id}`}>{product.name}</Link></td>
                      <td>R$ {product.price.toFixed(2)}</td>
                      <td>{product.quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList
