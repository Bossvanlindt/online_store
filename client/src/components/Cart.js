import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ShopIcon from "@mui/icons-material/Shop";

const Cart = ({
  cart,
  cartOpen,
  setCartOpen,
  removeFromCart,
  completePurchase,
}) => {
  const totalPrice = cart.reduce((sum, prod) => sum + prod.price, 0);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartOpen(open);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        {/* No unique keys for each element – could refactor to present items as [count] x [product name] */}
        {cart.map((product) => (
          <ListItem key={product.name} disablePadding alignItems="flex-start">
            <ListItemButton onClick={() => removeFromCart(product)}>
              <ListItemIcon>{<RemoveShoppingCartIcon />}</ListItemIcon>
            </ListItemButton>
            <ListItemText
              primary={product.name + ": $" + product.price.toFixed(2)}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText
            primary={
              totalPrice !== 0
                ? "Total Price: $" + totalPrice.toFixed(2)
                : "Cart empty - go add stuff!"
            }
          />
        </ListItem>
      </List>
      <Divider />
      {cart.length > 0 && (
        <List>
          <ListItem>
            <ListItemButton onClick={completePurchase}>
              <ListItemIcon>{<ShopIcon />}</ListItemIcon>
              <ListItemText primary={"Purchase Items"} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <Drawer anchor={"right"} open={cartOpen} onClose={toggleDrawer(false)}>
      {list("right")}
    </Drawer>
  );
};

export default Cart;
