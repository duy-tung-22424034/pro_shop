import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import ProductListScreen from './ProductListScreen'
import { listProducts,listProductByCategories } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const category = match.params.category
  console.log("category",category)

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productAllList = useSelector((state) => state.productAllList)
  const { loading : loadingCategory, productByCategorys } = productAllList

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(listProductByCategories())
  }, [])


  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber,'',true, category))
  }, [dispatch, keyword, pageNumber,category])

  return (
    <>
      {userInfo && userInfo.isAdmin ? 
      ( 
        <ProductListScreen />
      )
      : (
        <>
          <Meta />
          {(loading || loadingCategory) && <Loader/> }
          {!keyword && !category? (
            <ProductCarousel />
          ) 
          : 
          (
            <>
            <Link to='/' className='btn btn-light'>
              Go Back
            </Link>
          { error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div className='container-product'>
              <h1 className='category-title'>Search Result</h1>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              {/* <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
              /> */}
            </div>
          )}
            </>
          )}
          {!keyword && !category && productByCategorys && Object.entries(productByCategorys).map((item,index)=>(
            <React.Fragment key={index}>
              <h1 className='category-title'>{item[0]}</h1>
              <div className='container-product'>
                <Row>
                  {item[1].map((product,index) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
              </div>
            </React.Fragment>
          ))}
        </>
      )}
    </>
  )
}

export default HomeScreen
