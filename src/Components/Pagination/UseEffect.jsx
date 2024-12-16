import React, { useEffect, useState } from 'react';
import './Pagination.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const UseEffect = () => {
    const limit = 10;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [quantityPage, setQuantityPage] = useState(0);
    const [pageCurrent, setPageCurrent] = useState(0);

    useEffect(() => {
        fetchData();
    }, [pageCurrent]);

    const handleChange = (event, value) => {
        setPageCurrent(value);
        setLoading(true);
        setError(null);
    };

    const fetchData = async () => {
        try {
            const url = `https://dummyjson.com/products?skip=${pageCurrent * limit}&limit=${limit}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Cập nhật trạng thái với dữ liệu đã lấy
            setData(result.products);
            setQuantityPage(Math.ceil(result.total / limit));
        } catch (error) {
            console.error('Error fetching data:', error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className='box'>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className='box'>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div className='box'>
            <h2>Product List</h2>
            {data && data.length > 0 ? (
                <div className='product'>
                    {data.map(product => (
                        <div className='product__item' key={product.id}>
                            <div className='product__image'>
                                <img src={product.images} alt={product.title} />
                            </div>
                            <div className='product__title'>
                                {product.title}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available.</p>
            )}
            <Stack spacing={2}>
                <Pagination
                    className='test'
                    count={quantityPage}
                    page={pageCurrent}
                    color="secondary"
                    onChange={handleChange}
                />
            </Stack>
        </div>
    );
};

export default UseEffect;
