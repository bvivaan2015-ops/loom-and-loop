// ===============================
// EMAILJS
// ===============================

if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: "w15eIwZrEj2fAAo7X"
    });
}


// Load cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Calculate total
let total = 0;

cart.forEach(item => {
    total += item.price;
});

// ===============================
// Cart Elements
// ===============================

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

// -------------------------------
// Update Cart
// -------------------------------
function updateCart() {

    if (cartItems) {

        cartItems.innerHTML = "";

        cart.forEach((item, index) => {

            cartItems.innerHTML += `
                <li>
                    ${item.name} - ₹${item.price}
                    <button onclick="removeItem(${index})">
                        ❌
                    </button>
                </li>
            `;

        });

    }

    if (cartTotal) {
        cartTotal.textContent = total;
    }

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    // Save cart
    localStorage.setItem("cart", JSON.stringify(cart));

}

// -------------------------------
// Add To Cart
// -------------------------------
const addButtons = document.querySelectorAll(".add-to-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        cart.push({
            name,
            price
        });

        total += price;

        updateCart();

        alert(name + " added to cart!");

    });

});

// -------------------------------
// Remove Item
// -------------------------------
function removeItem(index) {

    total -= cart[index].price;

    cart.splice(index, 1);

    updateCart();

}

// Make it available to the HTML button
window.removeItem = removeItem




// -------------------------------
// Show saved cart when page loads
// -------------------------------
updateCart();












document.addEventListener("DOMContentLoaded", function () {

    const quickViewButtons =
        document.querySelectorAll(".quick-view");

    quickViewButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            alert("Quick View button is working!");

        });

    });

});



// ===============================
// CUSTOM PRODUCT
// ===============================

const customProduct = document.getElementById("customProduct");
const doneCustomProduct = document.getElementById("doneCustomProduct");
const customProductMessage = document.getElementById("customProductMessage");

if (customProduct) {

    customProduct.value =
        localStorage.getItem("customProduct") || "";

}

if (doneCustomProduct) {

    doneCustomProduct.addEventListener("click", function () {

        const productRequest = customProduct.value.trim();

        localStorage.setItem("customProduct", productRequest);

        if (customProductMessage) {

            if (productRequest !== "") {
                customProductMessage.textContent =
                    "✅ Your custom product request has been saved!";
            } else {
                customProductMessage.textContent =
                    "Custom product request cleared.";
            }

        }

    });

}


// ===============================
// CHECKOUT BUTTON
// ===============================

const checkoutButton = document.getElementById("checkoutButton");

if (checkoutButton) {

    checkoutButton.addEventListener("click", function () {

        const savedCustomProduct =
            localStorage.getItem("customProduct") || "";

        const hasCartItems = cart.length > 0;
        const hasCustomProduct = savedCustomProduct.trim() !== "";

        // Nothing selected
        if (!hasCartItems && !hasCustomProduct) {

            alert("🛒 Please add a product to your cart or describe the product you want.");

            return;

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        window.location.href = "checkout.html";

    });

}



// ===============================
// CHECKOUT PAGE
// ===============================

const checkoutItems = document.getElementById("checkoutItems");
const checkoutTotal = document.getElementById("checkoutTotal");

if (checkoutItems) {

    const savedCart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const savedCustomProduct =
        localStorage.getItem("customProduct") || "";

    let total = 0;

    // Show cart products
    savedCart.forEach(item => {

        checkoutItems.innerHTML += `
        <li>
            ${item.name} - ₹${item.price}
        </li>
        `;

        total += item.price;

    });

    // Show custom product request
    if (savedCustomProduct.trim() !== "") {

        checkoutItems.innerHTML += `
        <li>
            <strong>Custom Product Request:</strong>
            ${savedCustomProduct}
        </li>
        `;

    }

    checkoutTotal.textContent = total;

}


const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(e) {

        e.preventDefault();

        const customerName =
            document.getElementById("fullName").value;

        const customerEmail =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const address =
            document.getElementById("address").value;

        localStorage.setItem("customerName", customerName);
        localStorage.setItem("customerEmail", customerEmail);
        localStorage.setItem("phone", phone);
        localStorage.setItem("address", address);

        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const savedCustomProduct =
            localStorage.getItem("customProduct") || "";

        const hasCartItems = savedCart.length > 0;
        const hasCustomProduct =
            savedCustomProduct.trim() !== "";

        // CUSTOM PRODUCT ONLY
        if (!hasCartItems && hasCustomProduct) {

    alert(
        "We will contact you in 2-3 days and tell you the exact amount of the custom product."
    );

    window.location.href = "thankyou.html";
    return;
}

        // CART ONLY OR CART + CUSTOM
        window.location.href = "payment.html";

    });

}






const paymentItems = document.getElementById("paymentItems");
const paymentTotal = document.getElementById("paymentTotal");
const continuePayment = document.getElementById("continuePayment");

const savedCart =
    JSON.parse(localStorage.getItem("cart")) || [];

const customProductRequest =
    localStorage.getItem("customProduct") || "";

const hasCartItems = savedCart.length > 0;
const hasCustomProduct =
    customProductRequest.trim() !== "";


if (paymentItems && paymentTotal) {

    paymentItems.innerHTML = "";

    let total = 0;


    // CASE 1: CART ONLY
    if (hasCartItems && !hasCustomProduct) {

        savedCart.forEach((item) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            `;

            paymentItems.appendChild(li);

            total += item.price;
        });
    }


    // CASE 2: CUSTOM PRODUCT ONLY
    if (!hasCartItems && hasCustomProduct) {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>Custom Product</span>
            <span>
                We will contact you in 2-3 days and tell you the exact amount of the custom product.
            </span>
        `;

        paymentItems.appendChild(li);
    }


    // CASE 3: CART + CUSTOM PRODUCT
    if (hasCartItems && hasCustomProduct) {

        savedCart.forEach((item) => {

            const li = document.createElement("li");

            li.innerHTML = `
                <span>${item.name}</span>
                <span>₹${item.price}</span>
            `;

            paymentItems.appendChild(li);

            total += item.price;
        });

        const customLi = document.createElement("li");

        customLi.innerHTML = `
            <span>Custom Product</span>
            <span>
                We will contact you in 2-3 days and tell you the exact amount of the custom product.
            </span>
        `;

        paymentItems.appendChild(customLi);
    }


    // Only cart products are included in payment
    paymentTotal.textContent = total;
}


if (continuePayment) {

    continuePayment.addEventListener("click", function () {

        const selectedMethod =
            document.querySelector('input[name="payment"]:checked').value;

        if (selectedMethod === "cod") {

            localStorage.removeItem("cart");
            localStorage.removeItem("customProduct");

            window.location.href = "thankyou.html";

        } else {

            window.location.href = "upi-payment.html";
        }

    });
}



/* =====================================
   UPI PAYMENT PAGE
===================================== */

const copyUpi = document.getElementById("copyUpi");
const paidButton = document.getElementById("paidButton");
const upiId = document.getElementById("upiId");

// Copy UPI ID
if (copyUpi && upiId) {

    copyUpi.addEventListener("click", () => {

        navigator.clipboard.writeText(upiId.textContent);

        copyUpi.textContent = "Copied!";

        setTimeout(() => {

            copyUpi.textContent = "Copy";

        }, 2000);

    });

}

// Payment Complete
if (paidButton) {

    paidButton.addEventListener("click", () => {

        const utrInput = document.getElementById("utr");
        const error = document.getElementById("utrError");

        let utr = utrInput.value.trim();

        // Remove spaces
        utr = utr.replace(/\s/g, "");

        utrInput.value = utr;

        // Clear previous error
        error.textContent = "";

        // Rule 1 - Empty
        if (utr === "") {

            error.textContent =
                "⚠ Please enter your UPI Transaction ID (UTR).";
            return;

        }

        // Rule 2 - Less than 12 characters
        if (utr.length < 12) {

            error.textContent =
                "⚠ UTR must be at least 12 characters.";
            return;

        }

        // Rule 3 - More than 22 characters
        if (utr.length > 22) {

            error.textContent =
                "⚠ UTR cannot be more than 22 characters.";
            return;

        }

        // Rule 4 - Only letters and numbers
        if (!/^[A-Za-z0-9]+$/.test(utr)) {

            error.textContent =
                "⚠ UTR can only contain letters and numbers.";
            return;

        }

        // Save UTR
        localStorage.setItem("utr", utr);

        // Get saved customer information
        const customerName =
            localStorage.getItem("customerName") || "Not provided";

        const customerEmail =
            localStorage.getItem("customerEmail") || "Not provided";

        const phone =
            localStorage.getItem("phone") || "Not provided";

        const address =
            localStorage.getItem("address") || "Not provided";

        // Get cart
        const savedCart =
            JSON.parse(localStorage.getItem("cart")) || [];

        // Create product list
        const products = savedCart
            .map(item => `${item.name} - ₹${item.price}`)
            .join(", ");

        // Calculate cart total ONLY
        const total = savedCart.reduce(
            (sum, item) => sum + item.price,
            0
        );

        // Get custom product request
        const customProductRequest =
            localStorage.getItem("customProduct") || "";

        // Generate Order ID
        const orderId =
            "LL" + Math.floor(100000 + Math.random() * 900000);

        // Save Order ID
        localStorage.setItem("orderId", orderId);
        
        const customMessage =
    "We will contact you in 2-3 days and tell you the exact amount of the custom product.";

const emailCustomProduct =
    customProductRequest.trim() !== ""
        ? customProductRequest + "\n\n" + customMessage
        : "No custom product requested.";

const emailTotal =
    savedCart.reduce((sum, item) => sum + item.price, 0);

        // Send customer email
        emailjs.send(
            "service_pk02ec8",
            "template_6lcf1bo",
            {

                order_id: orderId,
                customer_name: customerName,
                customer_email: customerEmail,
                phone: phone,
                address: address,
                products: products,
                custom_product: emailCustomProduct,
                total: emailTotal,
                payment_method: "UPI",
                utr: utr

            }
        ).then(function(response) {

            // Send Loom & Loop email
            return emailjs.send(
                "service_pk02ec8",
                "template_1pzojch",
                {

                    order_id: orderId,
                    customer_name: customerName,
                    customer_email: customerEmail,
                    phone: phone,
                    address: address,
                    products: products,
                    custom_product: emailCustomProduct,
                    total: emailTotal,
                    payment_method: "UPI",
                    utr: utr

                }
            );

        }).then(function(response) {

            console.log(
                "Order emails sent!",
                response.status,
                response.text
            );

            // Clear cart and custom request
            localStorage.removeItem("cart");
            localStorage.removeItem("customProduct");

            // Go to Thank You page
            window.location.href = "thankyou.html";

        }).catch(function(error) {

            console.error("EmailJS error:", error);

            alert(
                "Your payment details were accepted, but the order email could not be sent. Please contact Loom & Loop."
            );

        });

    });

}







// WISHLIST SYSTEM
document.querySelectorAll(".wishlist").forEach(button => {
    button.addEventListener("click", function () {

        const card = this.closest(".card");
        const name = card.querySelector("h3").textContent.trim();
        const price = card.querySelector("p").textContent.trim();
        const image = card.querySelector("img").getAttribute("src");

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!wishlist.some(item => item.name === name)) {
            wishlist.push({ name, price, image });
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
        }

        const popup = document.createElement("div");
        popup.style.cssText = `
            position:fixed;
            top:50%;
            left:50%;
            transform:translate(-50%,-50%);
            background:#fff4e6;
            color:#5b3924;
            padding:30px;
            border-radius:15px;
            box-shadow:0 5px 20px #555;
            z-index:9999;
            text-align:center;
        `;

        popup.innerHTML = `
            <h3>${name} added to Wishlist! ❤️</h3>
            <button id="closeWishlistPopup">Close</button>
        `;

        document.body.appendChild(popup);

        document.getElementById("closeWishlistPopup").onclick = () => {
            popup.remove();
        };
    });
});








// 🌙 NIGHT MODE

const nightModeButton = document.getElementById("nightMode");

if (nightModeButton) {

    nightModeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            this.textContent = "☀️";
        } else {
            this.textContent = "🌙";
        }

    });

}