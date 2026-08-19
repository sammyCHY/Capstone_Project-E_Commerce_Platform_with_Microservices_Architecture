const express = require("express");

const app = express();
const PORT = 3002;

app.use(express.json());

const carts = {};

// Add item to cart
app.post("/cart/:userId/items", (req, res) => {
    const userId = req.params.userId;

    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({
            message: "productId and quantity are required"
        });
    }

    if (!carts[userId]) {
        carts[userId] = [];
    }

    carts[userId].push({
        productId,
        quantity
    });

    res.status(201).json({
        message: "Item added to cart",
        cart: carts[userId]
    });
});

// View cart
app.get("/cart/:userId", (req, res) => {
    const userId = req.params.userId;

    res.json({
        userId,
        items: carts[userId] || []
    });
});

// Remove item from cart
app.delete("/cart/:userId/items/:productId", (req, res) => {
    const userId = req.params.userId;
    const productId = parseInt(req.params.productId);

    if (!carts[userId]) {
        return res.status(404).json({
            message: "Cart not found"
        });
    }

    carts[userId] = carts[userId].filter(
        item => item.productId !== productId
    );

    res.json({
        message: "Item removed",
        cart: carts[userId]
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "Cart service is running"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Cart service running on port ${PORT}`);
});