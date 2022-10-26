import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import cloudberry from "./cloudberry.png";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        src={cloudberry}
        alt="cloudberry"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="header" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.quantity} in stock
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => addToCart(product)}>
          Add to cart <AddShoppingCartIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
