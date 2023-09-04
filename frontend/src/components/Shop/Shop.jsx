import React, { useEffect, useState } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, searchProduct } from '../../Actions/Product';
import './shop.css'

const Shop = () => {
    const { product } = useSelector((state) => state.allProducts)
    const { products } = useSelector((state) => state.productSearch)
    const dispatch = useDispatch()
    const [searchQuery, setsearchQuery] = useState("")
    const [showsearch, setShowSearch] = useState(false)

    useEffect(() => {
        dispatch(getProducts())
        if (products?.length > 0) {
            setShowSearch(true)
        }
        if (searchQuery?.length < 1) {
            setShowSearch(false)
        }
    }, [dispatch, searchQuery, products])

    const handleSearch = (value) => {
        setsearchQuery(value);
        if (value.length > 2) {
            dispatch(searchProduct(value))
            setShowSearch(true)
        } else {
            dispatch({
                type: "resetSearch"
            })
        }
    }

    return (
        <div className="App">
            <div className='main d-flex'>
                <div className='content-section search-section'>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Shop</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className='select d-flex mt-5 justify-content-between'>
                        <select className='w-25 md-w-50'>
                            <option>Select Category</option>
                            <option value="1">Home Decor</option>
                            <option value="2">Fashion & Accessories</option>
                            <option value="3">Home & Kitchen</option>
                            <option value="2">Toys & Games</option>
                            <option value="3">Stationery</option>
                        </select>
                        <Form className="d-flex w-25 md-w-50 form" >
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="me-2 w-100 rounded-0"
                                aria-label="Search"
                                onChange={(e) => handleSearch(e.target.value)}
                                on
                            />
                        </Form>
                    </div>
                    {
                        showsearch === true ? (
                            <div className='grid-container mt-5'>
                                {
                                    !products ? null : typeof products === 'string' ? (
                                        <h4>No products found</h4>
                                    ) :
                                        products?.map((item, index) => (
                                            <>
                                                <div className='grid-item' key={index}>
                                                    <img src={item.images[0].url} alt="" />
                                                    <h3 className='pt-3'>{item.title}</h3>
                                                    <p className='pt-3'>{item.description}</p>
                                                    <h4 className='pt-4'>{item.price} PKR /-</h4>
                                                </div>
                                            </>
                                        ))
                                }
                            </div>
                        ) : (
                            <div className='grid-container mt-5'>
                                {
                                    product?.map((item, index) => (
                                        <>
                                            <div className='grid-item' key={index}>
                                                <img src={item.images[0].url} alt="" />
                                                <h3 className='pt-3'>{item.title}</h3>
                                                <p className='pt-3'>{item.description}</p>
                                                <h4 className='pt-4'>{item.price} PKR /-</h4>
                                            </div>
                                        </>
                                    ))
                                }
                            </div>
                        )
                    }

                </div>

            </div>
        </div>
    )
}

export default Shop
