import { Product, Reviews } from "./product.js";
import { searchProducts } from "./productFunctions.js";

const someImages = ['./img1','./img2','./img3']
const someReviewes = []
someReviewes.push( new Reviews(1244, 'Sam', 'Good item!', 5, 2, 3, 5 ));
someReviewes.push( new Reviews(1238, 'John', 'This is shit!', 1, 1, 1, 1 ));
someReviewes.push( new Reviews(1222, 'Bob', 'Uiiiiiii!', 5, 5, 5, 5 ));

const newReview = new Reviews(666, 'Adolf', 'Haile!', 3, 4, 5, 1 );

const item = new Product (4523, 'hat', 'New red hat', 200.5, 'Addidas', someReviewes, someImages)

const products = []
products.push(new Product (4523, 'hat', 'New red hat', 200.5, 'Addidas', someReviewes, someImages))
products.push(new Product(4523, 'Red Hat', 'New red baseball cap', 200.5, 'Adidas', [], ['hat1.jpg', 'hat2.jpg']));
products.push(new Product(4524, 'Blue T-Shirt', 'Comfortable cotton t-shirt', 350.0, 'Nike', [], ['tshirt1.jpg']));
products.push(new Product(4525, 'Black Jacket', 'Windproof sports jacket', 1200.0, 'Puma', [], ['jacket1.jpg', 'jacket2.jpg', 'jacket3.jpg']));
products.push(new Product(4526, 'White Sneakers', 'Running shoes with cushioning', 1800.75, 'Reebok', [], ['shoes1.jpg', 'shoes2.jpg']));
products.push(new Product(4527, 'Green Backpack', 'Waterproof backpack for sports', 750.25, 'Under Armour', [], ['backpack1.jpg']));

// console.log(item.getReviewByID(12));
// console.log(item.getImage(2));
// console.log(item.getImage());

// console.log(item.getSize());
// item.deleteSize('S');
// console.log(item.getSize());
// item.addSize('XXS')
// console.log(item.getSize());
// item.deleteSize('Z');

// console.log(item.getReview());
// item.addReview(null)
// console.log(item.getReview());
// item.addReview(newReview)
// console.log(item.getReview());
// item.delereReview(666)
// console.log(item.getReview());

// console.log(item.getAverageRating());

console.log(searchProducts(products, "ck"));

