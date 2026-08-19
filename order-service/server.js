const express = require("express");

const app = express();
const PORT = 3003;

app.use(express.json());

const orders = [];

// Create order
app.post("/orders", (req, res) => {
    const { userId, items } = req.body;

    if (!userId || !items) {
        return res.status(400).json({
            message: "userId and items are required"
        });
    }

    const order = {
        id: orders.length + 1,
        userId,
        items,
        status: "created",
        createdAt: new Date()
    };

    orders.push(order);

    res.status(201).json(order);
});

// Get all orders
app.get("/orders", (req, res) => {
    res.json(orders);
});

// Get one order
app.get("/orders/:id", (req, res) => {
    const order = orders.find(
        order => order.id === parseInt(req.params.id)
    );

    if (!order) {
        return res.status(404).json({
            message: "Order not found"
        });
    }

    res.json(order);
});

app.get("/health", (req, res) => {
    res.json({
        status: "Order service is running"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Order service running on port ${PORT}`);
});