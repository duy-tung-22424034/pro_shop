import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Image,
  InputGroup,
  Form,
  Pagination
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import {
  listProducts,
  deleteProduct,
  listCategories
} from "../actions/productActions";

const ProductListScreen = ({ history, match }) => {

  const dispatch = useDispatch();
  const [keyWord, setKeyWord] = useState("");
  const [sortName, setSortName] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(true);
  const [pageNumber,setPageNumber] = useState(1);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const categoriestLists = useSelector((state) => state.categoriestList);
  const { categories } = categoriestLists;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    dispatch(listProducts(keyWord, pageNumber, sortName, sort));
    dispatch(listCategories())
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };

  const searchProducts = () => {
    dispatch(listProducts(keyWord, pageNumber, sortName, sort,category));
  };

  useEffect(() => {
    dispatch(listProducts(keyWord, pageNumber, sortName, sort,category));
  }, [sortName, sort,pageNumber,category]);

  const onClickSort = (name) => {
    if (sortName == name) {
      setSort(!sort);
    } else {
      setSortName(name);
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <LinkContainer to={`/admin/product/create`}>
            <Button className="my-3">
              <i className="fas fa-plus"></i> Create Product
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row
        className="align-items-center"
        style={{ paddingLeft: "15px", paddingRight: "15px" }}
      >
        <select className="select-category form-select"
        style={{marginBottom:'10px'}}
        aria-label="Default select example"
                        onChange={(e)=>{
                          setCategory(e.target.value)
                        }} value={category} required>
                    <option value={''}>Choose Category</option>
                    {categories && categories.map((ct,index) => (
                      <option value={ct} key={index}>{ct}</option>
                    ))}
                  </select>
        <InputGroup className="mb-2" onSubmit={()=>searchProducts}>
          <Form.Control
            placeholder="Name, Category, Brand, ..."
            value={keyWord}
            type="text"
            onSubmit={()=>searchProducts}
            onChange={(e) => setKeyWord(e.target.value)} 
          />
          <Button className="ml-2" onClick={searchProducts}>
            <i className="fas fa-search"></i> Search
          </Button>
        </InputGroup>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <>
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th width={50}>Index</th>
              <th width={120}>IMAGE</th>
              <th width={250} onClick={() => onClickSort("name")}>
                NAME <i className="fa fa-fw fa-sort"></i>
              </th>
              <th width={120} onClick={() => onClickSort("price")}>
                PRICE <i className="fa fa-fw fa-sort"></i>
              </th>
              <th width={120} onClick={() => onClickSort("countInStock")}>
                QUANTITY <i className="fa fa-fw fa-sort"></i>
              </th>
              <th width={150} onClick={() => onClickSort("category")}>
                CATEGORY <i className="fa fa-fw fa-sort"></i>
              </th>
              <th width={120} onClick={() => onClickSort("brand")}>
                BRAND <i className="fa fa-fw fa-sort"></i>
              </th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={150}
                    fluid
                  />
                </td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.countInStock}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {
          pages > 1 && (
            <Pagination>
              {[...Array(pages).keys()].map((x) => (
                  <Pagination.Item active={x + 1 === page} key={x+1} onClick={()=>setPageNumber(x+1)}>{x + 1}</Pagination.Item>
              ))}
            </Pagination>
          )
        }
      </>
    </>
  );
};

export default ProductListScreen;
