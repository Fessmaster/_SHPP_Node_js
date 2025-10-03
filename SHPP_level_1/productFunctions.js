function searchProducts(products, search) {
    return products.filter((product) => {
        return (
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
    });
}
export { searchProducts };
