import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

const Products = ({ products, addToCart }) => {
  return (
    <>
      <Container maxWidth="md">
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <ProductCard product={product} addToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Products;
