import { Product, Reviews } from "./product.js";
import { searchProducts, sortProducts } from "./productFunctions.js";


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

const item = new Product(
  4523,
  "Hat",
  "New red hat",
  200.5,
  "Adidas",
  someReviews,
  someImages
);

const products = [];
products.push(
  new Product(
    3465,
    "Hat",
    "New red hat",
    200.5,
    "Adidas",
    someReviews,
    someImages
  )
);
products.push(
  new Product(
    5680,
    "Red Hat",
    "New red baseball cap",
    200.5,
    "Adidas",
    [],
    ["hat1.jpg", "hat2.jpg"]
  )
);
products.push(
  new Product(
    1123,
    "Blue T-Shirt",
    "Comfortable cotton t-shirt",
    350.0,
    "Nike",
    [],
    ["tshirt1.jpg"]
  )
);
products.push(
  new Product(
    4539,
    "Black Jacket",
    "Windproof sports jacket",
    1200.0,
    "Puma",
    [],
    ["jacket1.jpg", "jacket2.jpg", "jacket3.jpg"]
  )
);
products.push(
  new Product(
    2278,
    "White Sneakers",
    "Running shoes with cushioning",
    1800.75,
    "Reebok",
    [],
    ["shoes1.jpg", "shoes2.jpg"]
  )
);
products.push(
  new Product(
    7845,
    "Red Hat",
    "Waterproof backpack for sports",
    750.25,
    "Under Armour",
    [],
    ["backpack1.jpg"]
  )
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

console.log("-- Test 6: Try to delete size 'S' from array");
console.log(item.getSize());
item.deleteSize("S");
console.log(item.getSize(), "\n");

console.log("-- Test 7: Try to add size 'XXS' from array");
item.addSize("XXS");
console.log(item.getSize(), "\n");

console.log("-- Test 8: Try to delete non-exist size ");
tryMethod(() => item.deleteSize("Z"));

console.log("-- Test 9: Try to add new review ");
console.log(item.getReview());
item.addReview(newReview);
console.log(item.getReview(), "\n");

console.log("-- Test 10: Try add invalid value to review");
tryMethod(() => item.addReview(null));
tryMethod(() => item.addReview(undefined));
tryMethod(() => item.addReview("null"));

console.log("-- Test 11: Try delete review by ID 3242");
item.deleteReview(3242);
console.log(item.getReview());

console.log("-- Test 12: Try delete review by invalid ID ");
tryMethod(() => item.deleteReview(-1));
tryMethod(() => item.deleteReview(10000));

console.log("-- Test 13: Try method getAverageRating");
console.log(item.getAverageRating(), "\n");

console.log("-- Test 14: Try function searchProducts with word 'sh'");
printFieldsOnly(() => searchProducts(products, "sh"));

console.log("-- Test 15: Try function sortProducts by price");
printFieldsOnly(() => sortProducts(products, "price"));

console.log("-- Test 16: Try function sortProducts by ID");
printFieldsOnly(() => sortProducts(products, "ID"));

console.log("-- Test 17: Try function sortProducts by name");
printFieldsOnly(() => sortProducts(products, "name"));
