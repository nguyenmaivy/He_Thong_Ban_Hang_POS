// src/components/Menu.tsx
import { useState } from "react";
import ProductDetail from "./ProductDetail";
import Pay from "./Pay";
import { Product, CartItem } from "../types";
import styles from "../styles/Menu.module.css";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Menu: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showPayment, setShowPayment] = useState(false);

    const products: Product[] = [
        { id: 1, name: "Hamburger", price: 123000, image: "/images/hamburger.jpg" },
        { id: 2, name: "Grilled squid satay", price: 123000, image: "/images/grilled-squid.jpg" },
        { id: 3, name: "Grilled squid satay", price: 123000, image: "/images/grilled-squid.jpg" },
        { id: 4, name: "Grilled squid satay", price: 123000, image: "/images/grilled-squid.jpg" },
        { id: 5, name: "Grilled squid satay", price: 123000, image: "/images/grilled-squid.jpg" },
        { id: 6, name: "Grilled squid satay", price: 123000, image: "/images/grilled-squid.jpg" },
    ];

    const categories = [
        { name: "Cupcake", image: "/images/cupcake.jpg" },
        { name: "Sea food", image: "/images/seafood.jpg" },
        { name: "Juice", image: "/images/juice.jpg" },
        { name: "Coca", image: "/images/coca.jpg" },
        { name: "Orange juice", image: "/images/orange-juice.jpg" },
    ];

    // Trong Menu.tsx
    const addToCart = (product: Product & { quantity: number; note?; string }) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity, note: product.note || item.note }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: product.quantity, note: product.note || "" }]);
        }
    };

    const increaseQuantity = (id: number) => {
        setCart(
            cart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (id: number) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0)
        );
    };
    const handlePaymentClose = () => {
        setShowPayment(false);
    };
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.1; // 10% VAT
    const totalWithTax = total + tax;

    return (
        <div className={styles.container}>
            <div className={styles.lefSection}>
                <div className={styles.header}>
                    <button className={styles.backButton}>
                        <FaHome className="text-x1" />
                        <span className="ml-2 text-lg font-semibold">Back to home</span>
                    </button>
                </div>
                {/*thêm navigation*/}
                <div className="flex items-center justify-between mb-4">
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        <FaChevronLeft />
                    </button>
                    <div className={styles.categories}>
                        {categories.map((category, index) => (
                            <div key={index} className={styles.categoryItem}>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className={styles.categoryImage}
                                />
                                <p className="text-sm font-medium">{category.name}</p>
                            </div>
                        ))}
                    </div>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        <FaChevronRight />
                    </button>
                </div>

                {/* Cập nhật product items */}
                <div className={styles.content}>
                    <div className={styles.menu}>
                        {products.map((product, index) => (
                            <div key={product.id} className={styles.product}>
                                {/* <span className={styles.productNumber}>{index + 1}.</span> */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                                <h3 className="text-lg font-semibold">{index + 1}. {product.name}</h3>
                                <p className="text-red-500">Kr {product.price.toLocaleString()}</p>
                                <button
                                    className={styles.addToCartButton}
                                    onClick={() => setSelectedProduct(product)} // Hiển thị chi tiết sản phẩm
                                >
                                    <FaShoppingCart />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>



            </div>
            {/* Cập nhật giỏ hàng */}
            <div className={styles.cart}>
                <div className="flex justify-between items-center gap-4">
                    <h2 className="text-xl font-semibold text-red-500"> Your Cart ({cart.length})</h2>
                    <button className={styles.dineInButton}>DINE IN</button>
                </div>

                {cart.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                        <img src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-semibold">{index + 1}. {item.name}</h3>
                            <p className="text-red-500">Kr {(item.price * item.quantity).toLocaleString()}</p>

                        </div>
                        <div className={styles.quantityControls}>
                            <button
                                className={styles.quantityButton}
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                className={styles.quantityButton}
                                onClick={() => increaseQuantity(item.id)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}
                <div className={styles.total}>
                    <p>Total: Kr {totalWithTax.toLocaleString()}</p>
                    <p className={styles.tax}>(Incl. tax 10% = Kr {tax.toLocaleString()})</p>
                </div>
                <button className={styles.payment} onClick={() => setShowPayment(true)} disabled={cart.length === 0}>PAYMENT</button>
            </div>
            {showPayment && (
                <Pay
                    cartItems={cart}
                    total={total}
                    tax={tax}
                    totalWithTax={totalWithTax}
                    onClose={handlePaymentClose}
                />
            )}
            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    addToCart={addToCart}
                />
            )}
        </div>
    );
};

export default Menu;