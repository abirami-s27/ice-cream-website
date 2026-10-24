// Ice Cream Products
const products = [
    {
        id: 1,
        name: "Strawberry Bliss",
        price: 80,
        emoji: "🍓"
    },
    {
        id: 2,
        name: "Chocolate Dream",
        price: 100,
        emoji: "🍫"
    },
    {
        id: 3,
        name: "Vanilla Magic",
        price: 60,
        emoji: "🍦"
    },
    {
        id: 4,
        name: "Cookie Crunch",
        price: 120,
        emoji: "🍪"
    }
];

// Shopping Cart
let cart = [];

// Add Product to Cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    document.getElementById("message").textContent =
        product.name + " added to your cart! 💗";

    updateCart();
}

// Increase or decrease quantity
function changeQuantity(productId, amount) {
    const item = cart.find(product => product.id === productId);

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    updateCart();
}

// Remove Product
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart and Bill
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalElement = document.getElementById("total");
    const countElement = document.getElementById("cart-count");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<p class="empty-cart">' +
            'Your cart is empty. Add some ice cream! 🍦</p>';
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("div");

        const name = document.createElement("p");
        name.textContent = `${item.emoji} ${item.name}`;

        const price = document.createElement("p");
        price.textContent =
            `₹${item.price} × ${item.quantity} = ₹${itemTotal}`;

        details.append(name, price);

        const controls = document.createElement("div");
        controls.className = "quantity-controls";

        const decrease = document.createElement("button");
        decrease.textContent = "−";
        decrease.setAttribute("aria-label", "Decrease quantity");
        decrease.onclick = () => changeQuantity(item.id, -1);

        const quantity = document.createElement("span");
        quantity.textContent = item.quantity;

        const increase = document.createElement("button");
        increase.textContent = "+";
        increase.setAttribute("aria-label", "Increase quantity");
        increase.onclick = () => changeQuantity(item.id, 1);

        const remove = document.createElement("button");
        remove.textContent = "Remove";
        remove.className = "remove-btn";
        remove.onclick = () => removeFromCart(item.id);

        controls.append(decrease, quantity, increase, remove);
        row.append(details, controls);
        cartItems.appendChild(row);
    });

    totalElement.textContent = total;
    countElement.textContent = count;
}

// Place Order
function checkout() {
    const message = document.getElementById("message");

    if (cart.length === 0) {
        message.textContent =
            "Your cart is empty! Please add an ice cream first. 🍦";
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    message.textContent =
        `Thank you! Your demo order total is ₹${total}. 💗`;

    cart = [];
    updateCart();
}

// Initial Cart Display
updateCart();