import { Route, Routes } from "react-router-dom";
import NavBar from "../components/NavBar";
import DashBourd from "./DashBourd";
import Footer from "./Footer";
import { useState } from "react";
import ViewProduct from "./View-Product";
import swal from "sweetalert2";
import WatchOrder from "./WatchOrder";

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [Total, setTotal] = useState<number>(0);

  const [watchNameList, setNameList] = useState<string[]>([]);

  function clearCart() {
    setCart([]);
    setTotal(0);
  }

  function removeItem(index: number, item: any) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      setTotal((prevTotal) => prevTotal - item.price);
      newCart.splice(index, 1);
      removeItemAlert(index, item);
      return newCart;
    });
  }

  function addCart(item: any) {
    if (cart.find((i) => i.name === item.name)) {
      return;
    }

    item.qty = 1;

    setCart((prevCart) => [...prevCart, item]);
    setTotal((prevTotal) => prevTotal + item.price);
    successAlert();
  }

  function increaseQty(index: number) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index].qoh > newCart[index].qty) {
        newCart[index].qty += 1;
        newCart[index].price = newCart[index].price * newCart[index].qty;
      }
      return newCart;
    });
  }

  function decreaseQty(index: number, price: number) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index].qty === 1) {
        return newCart;
      }
      newCart[index].qty -= 1;
      newCart[index].price = newCart[index].price - price;
      return newCart;
    });
  }

  function removeItemAlert(index: number, item: any) {
    const Toast = swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = swal.stopTimer;
        toast.onmouseleave = swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "warning",
      title: "Item Removed from Cart !",
    });
  }

  function successAlert() {
    const Toast = swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = swal.stopTimer;
        toast.onmouseleave = swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Item Added to Cart !",
    });
  }

  return (
    <>
      <NavBar
        cart={cart}
        remove={removeItem}
        total={Total}
        increase={increaseQty}
        decrease={decreaseQty}
      />
      <Routes>
        <Route
          path="/"
          element={
            <DashBourd
              func={(item: any) => {
                if (cart.find((i) => i.name === item.name)) {
                  return;
                }
                item.qty = 1;
                setCart((prevCart) => [...prevCart, item]);
                setNameList((prevCart) => [...prevCart, item.name]);
                setTotal((prevTotal) => prevTotal + item.price);
                successAlert();
              }}
            />
          }
        />
        <Route path="/view/:name" element={<ViewProduct addCart={addCart} />} />
        <Route
          path="/order-watch"
          element={
            <WatchOrder cart={cart} Total={Total} removeItem={removeItem} clear={clearCart} />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}
