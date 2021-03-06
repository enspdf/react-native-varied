import {gql} from '@apollo/client';

export const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    name
    price
    description
    favorite @client
    thumb {
      id
      url
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  {
    products {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const ADD_OR_REMOVE_PRODUCT_FROM_FAVORITE = gql`
  mutation addOrRemoveProductFromFavorite($productId: ID!) {
    addOrRemoveProductFromFavorite(productId: $productId) @client
  }
`;

export const FAVORITE_PRODUCT_FRAGMENT = gql`
  fragment FavoriteProductFragment on Product {
    favorite
  }
`;

export const GET_FAVORITE_PRODUCTS_COUNT = gql`
  {
    favoriteProductsCount @client
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(id: $productId) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_COMMENTS_BY_PRODUCT = gql`
  query GetCommentsByProduct($productId: ID!) {
    comments(where: {product: {id: $productId}}, sort: "id:desc") {
      id
      comment
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($comment: String!, $productId: ID!) {
    createComment(input: {data: {comment: $comment, product: $productId}}) {
      comment {
        id
        comment
      }
    }
  }
`;
