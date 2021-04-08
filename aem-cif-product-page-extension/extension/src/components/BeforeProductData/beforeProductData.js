import React from 'react';
import { useQuery } from '@apollo/client';
import getProductFragmentBySku from './getProductFragment.gql';
import classes from './beforeProductData.css';

const BeforeProductData = ({ productDetails }) => {
    const { sku } = productDetails;
    console.log(`Got sku ${sku}`);
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
        content = productData ? <p>{productData.text.plaintext}</p> : '';
    }

    return (
        <section className={classes.section}>
            <p>{content}</p>
        </section>
    );
};

export default BeforeProductData;
