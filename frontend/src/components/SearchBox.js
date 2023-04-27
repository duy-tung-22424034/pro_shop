import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../actions/productActions";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim() || category) {
      if (keyword.trim() && category) {
        history.push(`/search/category/${keyword}/${category}`);
      }else
      {
        if(keyword.trim())
        {
          history.push(`/search/${keyword}`);
        }
        if(category)
        {
          history.push(`/category/${category}`);
        }
      }
    } else {
      history.push("/");
    }
  };
  const dispatch = useDispatch();
  // Get list categories
  const categoriestLists = useSelector((state) => state.categoriestList);
  const { categories } = categoriestLists;

  useEffect(() => {
    dispatch(listCategories());
  }, []);

  return (
    <Form onSubmit={submitHandler} style={{ width: "100%" }} inline>
      <select
        className="form-select home-category-select"
        aria-label="Default select example"
        onChange={(e) => {
          setCategory(e.target.value);
          if(e.target.value)
          {
            if(keyword.trim())
            {
              history.push(`/search/category/${keyword}/${e.target.value}`);
            }
            else{
              history.push(`/category/${e.target.value}`);
            }
          }
        }}
        value={category}
      >
        <option value={""}>Choose Category</option>
        {categories != undefined &&
          categories &&
          categories.map((ct, index) => (
            <option value={ct} key={index}>
              {ct}
            </option>
          ))}
      </select>
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5 border-5"
      ></Form.Control>
    </Form>
  );
};

export default SearchBox;
