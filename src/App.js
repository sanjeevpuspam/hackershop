import React, {Component} from 'react';
import './App.css';
import 'h8k-components';
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
    constructor() {
        super();
        const products = [...PRODUCTS].map((product, index) => {
            product.id = index + 1;
            product.image = `./images/items/${product.name.toLocaleLowerCase()}.png`;
            product.cartQuantity = 0;
            return product;
        });
        this.state = {
            cart: {
                items: [],
                totalPrice: 0,
                totalQuantity: 0
            },
            products
        }
    }

    subItem=(items)=>{
        const products = [...this.state.products].map((product, index) => {
            if(product.id === items.id && items.cartQuantity > 0){
                product.cartQuantity = items.cartQuantity - 1;
            }
            return product;
        });
        this.updateCartState(products);
    }

    addItem=(items)=>{
        const products = [...this.state.products].map((product, index) => {
            if(product.id === items.id){
                product.cartQuantity = items.cartQuantity + 1;
            }
            return product;
        });
        this.updateCartState(products);
    }

    updateCartState=(products)=>{
        const items = [...this.state.products].filter(product => product.cartQuantity > 0);
        const totalPrice = items.reduce((a, b) => +a + +(b.price) * b.cartQuantity, 0);
        const totalQuantity = items.reduce((a, b) => +a + +b.cartQuantity, 0);

        this.setState({cart: {items,totalPrice,totalQuantity}, products});
    }

    render() {
        return (
            <div>
                <h8k-navbar header={title}></h8k-navbar>
                <div className="layout-row shop-component">
                    <ProductList add={this.addItem} sub={this.subItem} products={this.state.products}/>
                    { this.state.cart.items.length > 0 ? <Cart cart={this.state.cart}/> : '' } 
                </div>
            </div>
        );
    }
}

export const PRODUCTS = [
    {
        name: "Cap",
        price: 5
    },
    {
        name: "HandBag",
        price: 30
    },
    {
        name: "Shirt",
        price: 35
    },
    {
        name: "Shoe",
        price: 50
    },
    {
        name: "Pant",
        price: 35
    },
    {
        name: "Slipper",
        price: 25
    }
];
export default App;
