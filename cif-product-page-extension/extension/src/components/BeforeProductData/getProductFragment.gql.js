import { gql } from '@apollo/client';

export default gql`
    query GetProductFragmentBySku($sku: String!) {
        productList(filter: { sku: { _expressions: { value: $sku } } }) {
            items {
                sku
                title
                text {
                    html
                    markdown
                    plaintext
                    json
                }
            }
        }
    }
`;
