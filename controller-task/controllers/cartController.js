exports.getCartForUser = (req, res) => {
    // Extracts :userId from the URL
    res.send(`Fetching cart for user with ID: ${req.params.userId}`);
};

exports.addProductToCart = (req, res) => {
    res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
};