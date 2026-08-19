const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.json());

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 1200
    },
    {
        id: 2,
        name: "Keyboard",
        price: 80
    },
    {
        id: 3,
        name: "Mouse",
        price: 40
    }
];

// Get all products
app.get("/products", (req, res) => {
    res.json(products);
});

// Get one product
app.get("/products/:id", (req, res) => {
    const product = products.find(
        p => p.id === parseInt(req.params.id)
    );

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

app.get("/health", (req, res) => {
    res.json({
        status: "Product service is running"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Product service running on port ${PORT}`);
});