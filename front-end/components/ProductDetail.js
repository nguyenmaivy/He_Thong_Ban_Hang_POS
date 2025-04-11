import { useState } from "react";
import { FaShoppingCart, FaTimes, FaMinus, FaPlus } from "react-icons/fa";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = ({ product, onClose, addToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [sideDishes, setSideDishes] = useState(["Vegetables"]); // Mặc định chọn Vegetables

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

    const handleAddToCart = () => {
        const productWithQuantity = { ...product, quantity }; // Gắn quantity vào sản phẩm
        addToCart(productWithQuantity); // Gọi hàm addToCart từ props
        onClose(); // Đóng modal
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>ADD TO CART</h3>
                    <button className={styles.closeButton} onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className={styles.contentWrapper}>
                    <img src={product.image} alt={product.name} className={styles.modalImage} />
                    <div className={styles.productDetails}>
                        <div className={styles.productInfo}>
                            <div className={styles.infoItem}>
                                <div className={styles.label}>SKU</div>
                                <div className={styles.value}>401</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.productName}>{product.name}</div>
                                <div className={styles.category}>Burger</div>
                            </div>
                            <div className={styles.infoItem}>
                                <div className={styles.label}>Unit Price</div>
                                <div className={styles.price}>Kr {product.price.toLocaleString()}</div>
                            </div>
                        </div>
                        <div className={styles.quantityControls}>
                            <div className={styles.quantityLabel}>Quantity</div>
                            <div className={styles.quantityButtons}>
                                <button onClick={decreaseQuantity} className={styles.quantityButton}>
                                    <FaMinus />
                                </button>
                                <span className={styles.quantityValue}>{quantity}</span>
                                <button onClick={increaseQuantity} className={styles.quantityButton}>
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.sideDishesTitle}>Protein: </span>
                                <span>What is Lorem ipsum?</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.sideDishesTitle}>Additives: </span>
                                <span>03</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.sideDishesTitle}>Baking material: </span>
                                <span>040</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.sideDishesTitle}>Food decoration: </span>
                                <span>04</span>
                            </div>
                        </div>
                        <div className={styles.sideDishes}>
                            <div className={styles.sideDishesHeader}>
                                <div className={styles.sideDishesTitle}>Side dishes (<span className={styles.required}>*</span>)</div>
                                <div className={styles.selectedQuantity}>Selected quantity 0</div>
                            </div>
                            <div className={styles.sideDishesNote}>Please select one of the properties below</div>
                            <label className={styles.checkboxContainer}>
                                <input
                                    type="checkbox"
                                    checked={sideDishes.includes("Vegetables")}
                                    onChange={() =>
                                        setSideDishes(
                                            sideDishes.includes("Vegetables")
                                                ? sideDishes.filter((dish) => dish !== "Vegetables")
                                                : [...sideDishes, "Vegetables"]
                                        )
                                    }
                                />
                                <span className={styles.checkboxLabel}>Vegetables</span>
                            </label>
                        </div>
                        <div className={styles.addToCartContainer}>
                            <button className={styles.addToCartButton} onClick={handleAddToCart}>
                                <FaShoppingCart className={styles.cartIcon} />
                                Kr {(product.price * quantity).toLocaleString()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
