// src/components/Pay.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CartItem } from "../types";
import "../styles/Payment.css";

interface PayProps {
  cartItems: CartItem[];
  total: number;
  tax: number;
  totalWithTax: number;
  onClose: () => void;
}

const Pay: React.FC<PayProps> = ({
  cartItems,
  total,
  tax,
  totalWithTax,
  onClose,
}) => {
  const router = useRouter();
  const [phuongThuc, setPhuongThuc] = useState<"card" | "cash">("card");
  const [soThe, setSoThe] = useState("");
  const [ngayHetHan, setNgayHetHan] = useState("");
  const [cvv, setCvv] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  // Xử lý định dạng thẻ
  const xuLyThe = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 19) value = value.slice(0, 19);
    setSoThe(value);
  };

  // Xử lý định dạng ngày hết hạn
  const xuLyNgayHetHan = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);

    let formattedValue = "";
    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2));
      if (month > 12) month = 12;
      formattedValue = month.toString().padStart(2, "0");
      if (value.length > 2) {
        formattedValue += "/" + value.slice(2, 4);
      }
    } else {
      formattedValue = value;
    }
    setNgayHetHan(formattedValue);
  };

  // Xử lý CVV
  const xuLyCVV = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) value = value.slice(0, 3);
    setCvv(value);
  };

  // Kiểm tra validation
  const kiemTraInputs = () => {
    if (phuongThuc === "card") {
      if (!soThe.trim() || !ngayHetHan.trim() || !cvv.trim()) {
        setErrorMessage("Vui lòng nhập đầy đủ thông tin thẻ");
        return false;
      }
      if (soThe.length < 16 || soThe.length > 19) {
        setErrorMessage("Số thẻ không hợp lệ");
        return false;
      }
      if (ngayHetHan.length !== 5 || !ngayHetHan.includes("/")) {
        setErrorMessage("Ngày hết hạn không hợp lệ");
        return false;
      }
      const [monthStr, yearStr] = ngayHetHan.split("/");
      const month = parseInt(monthStr);
      const year = parseInt("20" + yearStr);

      const ngayHienTai = new Date();
      if (
        year < ngayHienTai.getFullYear() ||
        (year === ngayHienTai.getFullYear() && month < ngayHienTai.getMonth() + 1)
      ) {
        setErrorMessage("Thẻ đã hết hạn");
        return false;
      }
      if (cvv.length !== 3) {
        setErrorMessage("CVV không hợp lệ");
        return false;
      }
    }
    return true;
  };

  // Xử lý thanh toán
  const handleSubmit = () => {
    if (!kiemTraInputs()) return;

    // Giả lập API call
    setTimeout(() => {
      alert("Thanh toán thành công!");
      onClose();
      router.push("/menu"); // Sử dụng router.push để điều hướng lại trang menu
      router.refresh(); // Refresh lại trang để đảm bảo dữ liệu được cập nhật
    }, 1000);
  };

  return (
    <div className="paymentOverlay">
      <div className="paymentModal">
        <button className="closeButton" onClick={onClose}>
          ×
        </button>

        <div className="container">
          <main className="main">
            <div className="backButtonContainer">
              <div className="backButtonCircle" onClick={onClose}>
                <button className="backButton">←</button>
              </div>
            </div>

            <h1 className="title">Thanh toán</h1>

            {/* Phần chi tiết đơn hàng */}
            <div className="section_info_order">
              <h2 className="sectionTitle">Chi tiết đơn hàng</h2>
              {cartItems.map((item, index) => (
                <div key={index} className="orderDetailsItem">
                  <div>
                    <span>{item.name} x {item.quantity}</span>
                    {item.note && <p className="note">{item.note}</p>}
                  </div>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
              <div className="orderDetailsTotal">
                <span>Tổng tiền:</span>
                <span>{formatCurrency(totalWithTax)}</span>
              </div>
            </div>

            {/* Phần chọn phương thức thanh toán */}
            <div className="section_pay">
              <label
                className={`phuongThuc ${phuongThuc === "card" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="phuongThuc"
                  value="card"
                  checked={phuongThuc === "card"}
                  onChange={() => setPhuongThuc("card")}
                />
                <span className="paymentContent">
                  <span className="icon">💳</span>
                  <span>Thẻ tín dụng</span>
                </span>
              </label>

              <label
                className={`phuongThuc ${phuongThuc === "cash" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="phuongThuc"
                  value="cash"
                  checked={phuongThuc === "cash"}
                  onChange={() => setPhuongThuc("cash")}
                />
                <span className="paymentContent">
                  <span className="icon">💵</span>
                  <span>Tiền mặt</span>
                </span>
              </label>
            </div>

            {/* Phần nhập thông tin thẻ */}
            {phuongThuc === "card" && (
              <div className="cardDetails">
                <input
                  className="input"
                  type="text"
                  placeholder="Số thẻ"
                  value={soThe}
                  onChange={xuLyThe}
                  maxLength={19}
                />
                <div className="row">
                  <input
                    className="inputSmall"
                    placeholder="MM/YY"
                    value={ngayHetHan}
                    onChange={xuLyNgayHetHan}
                    maxLength={5}
                  />
                  <input
                    className="inputSmall"
                    placeholder="CVV"
                    value={cvv}
                    onChange={xuLyCVV}
                    maxLength={3}
                  />
                </div>
              </div>
            )}

            {/* Nút thanh toán */}
            <button className="payButton" onClick={handleSubmit}>
              {phuongThuc === "cash" ? "Xác nhận đặt hàng" : "Thanh toán ngay"}
            </button>

            {/* Hiển thị lỗi */}
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}

            {/* Phần thông tin thuế */}
            <div className="taxInfo">
              <p>Thuế (10%): {formatCurrency(tax)}</p>
              <p>Tổng thanh toán: {formatCurrency(totalWithTax)}</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Pay;