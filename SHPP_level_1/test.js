import { Product, Reviews } from "./product.js";
const someImages = ['./img1','./img2']
const someReviewe = []
someReviewe.push( new Reviews(1244, 'Sam', 'Good item!', 5, 2, 3, 5 ));
someReviewe.push( new Reviews(1238, 'John', 'This is shit!', 1, 1, 1, 1 ));
someReviewe.push( new Reviews(1222, 'Bob', 'Uiiiiiii!', 5, 5, 5, 5 ));
const item = new Product (4523, 'hat', 'New red hat', 200.5, 'Addidas', new Date, someReviewe, someImages)

console.log(item.getReviewByID(12));
console.log(item.getImage(1));
console.log(item.getImage());

console.log(item.getSize());
item.deleteSize('S');
console.log(item.getSize());
item.addSize('XXS')
console.log(item.getSize());



