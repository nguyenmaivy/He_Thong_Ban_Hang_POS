// src/components/Menu.tsx
import { useState, useEffect, useRef } from "react";
import ProductDetail from "./ProductDetail";
import Pay from "./Pay";
import { Product, CartItem, Category } from "../types";
import styles from "../styles/Menu.module.css";
import { FaHome, FaShoppingCart, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Menu: React.FC = () => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showPayment, setShowPayment] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [categoryScrollPosition, setCategoryScrollPosition] = useState(0);

    const categoryContainerRef = useRef<HTMLDivElement>(null);

    // Fetch dữ liệu từ API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = selectedCategoryId
                    ? `/api/menu?categoryId=${selectedCategoryId}`
                    : '/api/menu';
                const res = await fetch(url);
                if (!res.ok) throw new Error('Failed to fetch');
                const data = await res.json();
                setProducts(data.products);
                setCategories(data.categories);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, [selectedCategoryId]);

    // Xử lý di chuyển danh mục
    const scrollCategories = (direction: 'left' | 'right') => {
        if (categoryContainerRef.current) {
            const scrollAmount = 150; // Khoảng cách di chuyển mỗi lần
            const newPosition =
                direction === 'left'
                    ? categoryScrollPosition - scrollAmount
                    : categoryScrollPosition + scrollAmount;

            // Giới hạn vị trí cuộn
            const maxScroll =
                categoryContainerRef.current.scrollWidth - categoryContainerRef.current.clientWidth;
            const boundedPosition = Math.max(0, Math.min(newPosition, maxScroll));

            categoryContainerRef.current.scrollTo({
                left: boundedPosition,
                behavior: 'smooth',
            });
            setCategoryScrollPosition(boundedPosition);
        }
    };

    const addToCart = (product: Product & { quantity: number; note?: string }) => {
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
    // Tính tổng và thuế
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = total * 0.1; // 10% VAT
    const totalWithTax = total + tax;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.lefSection}>
                <div className={styles.header}>
                    <button className={styles.backButton}>
                        <FaHome className="text-x1" />
                        <span className="ml-2 text-lg font-semibold">Back to home</span>
                    </button>
                </div>
                {/* Navigation */}
                <div className="flex items-center justify-between mb-4">
                    <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        onClick={() => scrollCategories('left')}
                        disabled={categoryScrollPosition === 0}
                    >
                        <FaChevronLeft />
                    </button>
                    <div className={styles.categories} ref={categoryContainerRef}>
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className={`${styles.categoryItem} ${selectedCategoryId === category.id ? styles.categoryItemSelected : ''
                                    }`}
                                onClick={() => setSelectedCategoryId(category.id)}
                            >
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className={styles.categoryImage}
                                />
                                <p className="text-sm font-medium">{category.name}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded"
                        onClick={() => scrollCategories('right')}
                        disabled={
                            categoryContainerRef.current
                                ? categoryScrollPosition >=
                                categoryContainerRef.current.scrollWidth -
                                categoryContainerRef.current.clientWidth
                                : false
                        }
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Product items */}
                <div className={styles.content}>
                    <div className={styles.menu}>
                        {products.map((product, index) => (
                            <div key={product.id} className={styles.product}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className={styles.productImage}
                                />
                                <h3 className="text-lg font-semibold">
                                    {index + 1}. {product.name}
                                </h3>
                                <p className="text-red-500">Kr {product.price.toLocaleString()}</p>
                                <button
                                    className={styles.addToCartButton}
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <FaShoppingCart />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Giỏ hàng */}
            <div className={styles.cart}>
                <div className="flex justify-between items-center gap-4">
                    <h2 className="text-xl font-semibold text-red-500">
                        Your Cart ({cart.length})
                    </h2>
                    <button className={styles.dineInButton}>DINE IN</button>
                </div>

                {cart.map((item, index) => (
                    <div key={index} className={styles.cartItem}>
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-semibold">
                                {index + 1}. {item.name}
                            </h3>
                            <p className="text-red-500">
                                Kr {(item.price * item.quantity).toLocaleString()}
                            </p>
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
                    <p className={styles.tax}>
                        (Incl. tax 10% = Kr {tax.toLocaleString()})
                    </p>
                </div>
                <button
                    className={styles.payment}
                    onClick={() => setShowPayment(true)}
                    disabled={cart.length === 0}
                >
                    PAYMENT
                </button>
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