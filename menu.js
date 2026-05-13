let cart = [];

/* ================= ADD TO CART ================= */
function addToCart(food, price) {
    cart.push({
        name: food,
        price: price
    });

    updateCartCount();
}

/* ================= UPDATE CART COUNT ================= */
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

/* ================= CALCULATE TOTAL ================= */
function calculateTotal() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

/* ================= OPEN CART ================= */
function openCart() {
    let modal = document.getElementById("cartModal");
    let itemsContainer = document.getElementById("cart-items");
    let totalContainer = document.getElementById("cart-total");

    itemsContainer.innerHTML = "";

    if (cart.length === 0) {
        itemsContainer.innerHTML = "Your cart is empty.";
    } else {
        cart.forEach((item, index) => {
            itemsContainer.innerHTML += `
                <div class="cart-item">
                    <p>${item.name} - ₱${item.price.toFixed(2)}</p>
                    <button class="delete-btn" onclick="removeItem(${index})">✕</button>
                </div>
            `;
        });
    }

    totalContainer.innerText =
        "Total: ₱" + calculateTotal().toFixed(2);

    modal.style.display = "flex";
}

/* ================= REMOVE ITEM ================= */
function removeItem(index) {
    cart.splice(index, 1);
    updateCartCount();
    openCart(); // refresh UI
}

/* ================= CLEAR CART ================= */
function clearCart() {
    cart = [];
    updateCartCount();
    document.getElementById("cartModal").style.display = "none";
}

/* ================= CONFIRM ORDER ================= */
function confirmOrder() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        openOrderModal();
    }
}

/* ================= FILTER ================= */
function filterFood(category, event) {
    let cards = document.querySelectorAll(".menu-card");
    let buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    cards.forEach(card => {
        card.style.display = card.classList.contains(category)
            ? "block"
            : "none";
    });
}

/* ================= ORDER MODAL ================= */
function openOrderModal() {
    let orderNames = cart.map(item => item.name).join(", ");

    document.getElementById("order-items-field").value = orderNames;
    document.getElementById("order-total-field").value =
        "₱" + calculateTotal().toFixed(2);

    document.getElementById("cartModal").style.display = "none";
    document.getElementById("orderModal").style.display = "flex";
}

function closeOrderModal() {
    document.getElementById("orderModal").style.display = "none";
}

/* ================= SUBMIT ORDER ================= */
function submitOrder() {
    let name = document.getElementById("order-name").value;
    let email = document.getElementById("order-email").value;
    let phone = document.getElementById("order-phone").value;

    if (!name || !email || !phone) {
        alert("Please fill in all fields!");
        return;
    }

    alert("Order placed successfully! Thank you, " + name + "!");

    cart = [];
    updateCartCount();

    // Clear form fields
    document.getElementById("order-name").value = "";
    document.getElementById("order-email").value = "";
    document.getElementById("order-phone").value = "";

    document.getElementById("orderModal").style.display = "none";
}

/* ================= BUY NOW ================= */
function buyNow(food, price) {
    cart = [];

    cart.push({
        name: food,
        price: price
    });

    updateCartCount();
    openOrderModal();
}

window.onload = () => {
    filterFood('pork', {
        target: document.querySelector('.filter-btn.active')
    });
};


window.onclick = function(event) {

    let cartModal = document.getElementById("cartModal");
    let orderModal = document.getElementById("orderModal");

    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }

    if (event.target === orderModal) {
        orderModal.style.display = "none";
    }
};