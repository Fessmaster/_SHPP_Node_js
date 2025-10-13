import { Clothes } from "./Clothes.js";
import { Electronics } from "./Electronics.js";
import { Reviews } from "./AbstractProduct.js";
import { AbstractProduct, searchProducts, sortProducts } from "./AbstractProduct.js";


const tryMethod = (func) => {
  try {
    return func();
  } catch (error) {
    console.log(error.message, "\n");
  }
};

const printFieldsOnly = (func) =>
  console.log(JSON.parse(JSON.stringify(func())), "\n");

const someImages = ["./img1", "./img2", "./img3"];
const someReviews = [];
someReviews.push(new Reviews(1244, "Sam", "Good item!", 5, 4, 4, 5));
someReviews.push(new Reviews(1238, "John", "This is bad!", 1, 1, 1, 1));
someReviews.push(new Reviews(1222, "Bob", "I am happy!", 5, 5, 5, 5));

const newReview = new Reviews(3242, "Greg", "Not bad!", 5, 4, 5, 3);

const item = new Clothes(
  "Hat",
  "New red hat",
  200.5,
  15,
  someReviews,
  someImages,
  "Adidas",
  "cotton",
  "red"
);

const products = [];
products.push(
  new Clothes(
    "Winter Jacket", 
    "Warm insulated jacket for cold weather", 
    1500.75, 
    8, 
    someReviews, 
    someImages,
    "The North Face", 
    "nylon, polyester", 
    "black") 
);

products.push(
  new Clothes(
    "Sneakers", 
    "Comfortable running shoes with extra cushioning", 
    2200, 
    25, 
    someReviews, 
    someImages,
    "Nike", 
    "textile, rubber", 
    "white") 
);

products.push(
  new Clothes(
    "T-Shirt", 
    "Basic cotton t-shirt for everyday wear", 
    450, 
    50, 
    someReviews, 
    someImages,
    "Uniqlo", 
    "cotton", 
    "blue") 
);

products.push(
  new Clothes(
    "Jeans", 
    "Classic slim-fit denim pants", 
    1200, 
    12, 
    someReviews, 
    someImages,
    "Levi's", 
    "denim", 
    "dark blue") 
);

products.push(
  new Clothes(
    "Backpack", 
    "Spacious backpack for laptops and accessories", 
    1800.99, 
    5, 
    someReviews, 
    someImages,
    "Herschel", 
    "polyester", 
    "grey") 
);

products.push(
  new Clothes(
    "Dress", 
    "Elegant evening dress for special occasions", 
    3500.5, 
    3, 
    someReviews, 
    someImages,
    "Zara", 
    "silk", 
    "green") 
);

console.log("-- Test 1: Try to get review by  ID 1222");
console.log(item.getReviewByID(1222), "\n");

console.log("-- Test 2: Try to get review by non-existent ID");
console.log(item.getReviewByID(12), "\n");

console.log("-- Test 3: Try to get image by index 2");
console.log(item.getImage(2), "\n");

console.log("-- Test 4: Try to get image without index");
console.log(item.getImage(), "\n");

console.log("-- Test 5: Try to get image with wrong index");
tryMethod(() => item.getImage(-1));

console.log("-- Test 6: Try to add new review ");
console.log(item.getReview());
item.addReview(newReview);
console.log(item.getReview(), "\n");

console.log("-- Test 7: Try add invalid value to review");
tryMethod(() => item.addReview(null));
tryMethod(() => item.addReview(undefined));
tryMethod(() => item.addReview("null"));

console.log("-- Test 8: Try delete review by ID 3242");
item.deleteReview(3242);
console.log(item.getReview());

console.log("-- Test 9: Try delete review by invalid ID ");
tryMethod(() => item.deleteReview(-1));
tryMethod(() => item.deleteReview(10000));

console.log("-- Test 10: Try method getAverageRating");
console.log(item.getAverageRating(), "\n");

console.log("-- Test 11: Try method getFullInformation");
console.log(item.getFullInformation(), "\n");

console.log("-- Test 12: Try method getPriceForQuantity");
console.log(item.getPriceForQuantity(5), "\n");

console.log("-- Test 13: Try method getWithKey color");
console.log(item.getWithKey('color') , "\n");

console.log("-- Test 14: Try method getWithKey with invalid key");
tryMethod(() => item.getWithKey('colo'));

console.log("-- Test 15: Try method setWithKey with invalid key");
tryMethod(() => item.setWithKey('colo', 'green'));

console.log("-- Test 16: Try method setWithKey with invalid type");
tryMethod(() => item.setWithKey('color', 15));

console.log("-- Test 17: Try method setWithKey with key price = 999");
item.setWithKey('price', 999)
console.log(item.getFullInformation(), '\n');

console.log("-- Test 18: Try function searchProducts with word 'Comf'");
console.log(searchProducts(products, "Comf"), "\n");

console.log("-- Test 19: Try function sortProducts by price");
console.log(sortProducts(products, "price"));

console.log("-- Test 20: Try function sortProducts by ID");
console.log(sortProducts(products, "ID"));

console.log("-- Test 21: Try function sortProducts by name");
console.log(sortProducts(products, "name"));



