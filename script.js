// ================================
// SHOPPING CART
// ================================

let cart = [];


// -------------------------------
// Product Buttons
// -------------------------------

const buttons = document.querySelectorAll(".add-cart");

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard =
            button.closest(".product-card");

        const productName =
            productCard.querySelector("h3").textContent;

        const productPriceText =
            productCard.querySelector("p").textContent;

        const productPrice =
            Number(
                productPriceText
                    .replace("₹", "")
                    .replace(",", "")
            );


        // Check if product already exists
        const existingProduct =
            cart.find(
                item => item.name === productName
            );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1
            });

        }


        updateCart();

    });

});


// -------------------------------
// Update Cart
// -------------------------------

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    // Calculate total quantity
    let totalQuantity = 0;

    cart.forEach(function (item) {
        totalQuantity += item.quantity;
    });


    cartCount.textContent = totalQuantity;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent =
            "Total: ₹0";

        return;
    }


    // Display cart items
    cartItems.innerHTML = "";


    let totalPrice = 0;


    cart.forEach(function (item, index) {

        totalPrice +=
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `
            <h3>${item.name}</h3>

            <p>₹${item.price.toLocaleString()}</p>

            <div class="quantity-controls">

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <span>${item.quantity}</span>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

            </div>

            <button onclick="removeItem(${index})">
                Remove
            </button>
        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        "Total: ₹" +
        totalPrice.toLocaleString();

}


// -------------------------------
// Increase Quantity
// -------------------------------

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// -------------------------------
// Decrease Quantity
// -------------------------------

function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity === 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


// -------------------------------
// Remove Product
// -------------------------------

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// -------------------------------
// Clear Cart
// -------------------------------

const clearCartButton =
    document.getElementById("clear-cart");


clearCartButton.addEventListener("click", function () {

    cart = [];

    updateCart();

});


// -------------------------------
// Checkout
// -------------------------------

const checkoutButton =
    document.getElementById("checkout-btn");


checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for shopping with ShopEase!"
    );

});

// ================================
// PRODUCT SEARCH
// ================================

const searchInput =
    document.getElementById("search-input");

searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.toLowerCase().trim();

    productCards.forEach(function (product) {

        const productName =
            product.querySelector("h3")
                .textContent
                .toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "block";

        } else {

            product.style.display = "none";

        }

    });

});