import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';

function ProductsCarousel({products}) {
    let topRatedProducts = [...products];
    topRatedProducts.sort((a, b) => Number(b.rating) - Number(a.rating));
    topRatedProducts = topRatedProducts.slice(0, 4);

    return (
        <Carousel pause="hover" className='bg-dark'>
            {topRatedProducts.map((product) => (<Carousel.Item key={product.id}>
                <Link to={`/products/${product.id}`}>
                    <Image src={product.image} alt={product.name} style={{objectFit:'cover'}}/>
                    <Carousel.Caption className='carousel-caption'>
                        <h4>{product.name} (₹{product.price})</h4></Carousel.Caption>
                </Link>
            </Carousel.Item>))}
        </Carousel>
    );
}

export default ProductsCarousel;