import { Clothes } from "./Clothes.js";
import { Electronics } from "./Electronics.js";
import { Reviews } from "./AbstractProduct.js";
import { AbstractProduct } from "./AbstractProduct.js";

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
    "Winter Jacket", //name
    "Warm insulated jacket for cold weather", //description
    1500.75, // prise
    8, // quantity
    someReviews, 
    someImages,
    "The North Face", // brand
    "nylon, polyester", // material
    "black") // color 
);

products.push(
  new Clothes(
    "Sneakers", //name
    "Comfortable running shoes with extra cushioning", //description
    2200, // prise
    25, // quantity
    someReviews, 
    someImages,
    "Nike", // brand
    "textile, rubber", // material
    "white") // color 
);

products.push(
  new Clothes(
    "T-Shirt", //name
    "Basic cotton t-shirt for everyday wear", //description
    450, // prise
    50, // quantity
    someReviews, 
    someImages,
    "Uniqlo", // brand
    "cotton", // material
    "blue") // color 
);

products.push(
  new Clothes(
    "Jeans", //name
    "Classic slim-fit denim pants", //description
    1200, // prise
    12, // quantity
    someReviews, 
    someImages,
    "Levi's", // brand
    "denim", // material
    "dark blue") // color 
);

products.push(
  new Clothes(
    "Backpack", //name
    "Spacious backpack for laptops and accessories", //description
    1800.99, // prise
    5, // quantity
    someReviews, 
    someImages,
    "Herschel", // brand
    "polyester", // material
    "grey") // color 
);

products.push(
  new Clothes(
    "Dress", //name
    "Elegant evening dress for special occasions", //description
    3500.5, // prise
    3, // quantity
    someReviews, 
    someImages,
    "Zara", // brand
    "silk", // material
    "green") // color 
);






// console.log("-- Test 1: Try to get review by  ID 1222");
// console.log(item.getReviewByID(1222), "\n");

console.log("-- Test 2: Try to get review by non-existent ID");
console.log(item.getReviewByID(12), "\n");

console.log("-- Test 3: Try to get image by index 2");
console.log(item.getImage(2), "\n");

console.log("-- Test 4: Try to get image without index");
console.log(item.getImage(), "\n");

console.log("-- Test 5: Try to get image with wrong index");
tryMethod(() => item.getImage(-1));


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

console.log("-- Test 13: Try method getFullInformation");
console.log(item.getFullInformation(), "\n");


// console.log("-- Test 14: Try function searchProducts with word 'sh'");
// printFieldsOnly(() => searchProducts(products, "sh"));

// console.log("-- Test 15: Try function sortProducts by price");
// printFieldsOnly(() => sortProducts(products, "price"));

// console.log("-- Test 16: Try function sortProducts by ID");
// printFieldsOnly(() => sortProducts(products, "ID"));

// console.log("-- Test 17: Try function sortProducts by name");
// printFieldsOnly(() => sortProducts(products, "name"));


