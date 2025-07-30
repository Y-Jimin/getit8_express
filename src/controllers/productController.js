export const getProduct = (req, res) => {
    const { id } = req.query;
    res.json({
        message: "Product List",
        productId: id
    });
}

export const postProduct = (req, res) => {
    const { name, price } = req.body;
    res.status(201).json({
        message: "Product Created",
        data: {
            name: name,
            price: price
        }
    });
}