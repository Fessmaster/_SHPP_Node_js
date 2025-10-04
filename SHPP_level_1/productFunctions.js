function searchProducts(products, search) {
    return products.filter((product) => {
        return (
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
    });
}

function sortProducts(products, sortRule) {
    return products.sort((firstProduct, secondProduct) => {        
            if (firstProduct[sortRule] < secondProduct[sortRule]) return -1;
            if (firstProduct[sortRule] === secondProduct[sortRule]) return 0;
            if (firstProduct[sortRule] > secondProduct[sortRule]) return 1;        
    });
}

export { searchProducts, sortProducts };
