import React from 'react';
import getProductFragmentBySku from '../../queries/getProductFragment.gql';
import { useQuery } from '@apollo/client';
import classes from '@magento/venia-ui/lib/components/ProductFullDetail/productFullDetail.css';

const ProductTitle = ({ productDetails }) => {
    const { sku, name } = productDetails;

    const { loading, error, data } = useQuery(getProductFragmentBySku, {
        variables: { sku },
        context: { target: 'aem' }
    });

    let content = '';
    if (loading) {
        content = <p>Loading AEM data...</p>;
    }

    if (data && data.productList && data.productList.items && data.productList.items.length > 0) {
        const productData = data.productList.items[0];
        content = productData ? <p>{productData.title}</p> : '';
    } else {
        content = name;
    }

    return <h1 className={classes.productName}>{content}</h1>;
};

export default ProductTitle;
