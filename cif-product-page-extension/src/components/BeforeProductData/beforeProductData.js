import React from 'react';
import { useQuery } from '@apollo/client';
import getProductFragmentBySku from './getProductFragment.gql';

const BeforeProductData = ({ productDetails }) => {
    const { sku } = productDetails;
    console.log(`Got sku ${sku}`);
    const { loading, error, data } = useQuery(getProductFragmentBySku, {
        variables: { sku },
        context: { target: 'aem' }
    });

    if (loading) {
        console.log(`Loading...`);
        content = <p>Loading AEM data...</p>;
    }

    if (data) {
        const productData = data.productList.items[0];
        content = <p>{productData.text.plaintext}</p>;
    }

    return (
        <section className="section">
            <div>{content}</div>
        </section>
    );
};

export default BeforeProductData;
