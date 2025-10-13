import { Electronics } from "./Electronics.js";
import { Reviews } from "./AbstractProduct.js";
import { AbstractProduct, searchProducts, sortProducts  } from "./AbstractProduct.js";


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

const item = new Electronics(
  "DeWalt DCD991P2", //name
  "New drill", // description
  400, // price
  15, // quantity
  someReviews,
  someImages,
  "DeWalt", // brand
  12, // warranty
  1500 // power
);

const products = [];
products.push(
  new Electronics(
    "iPhone 15 Pro",
    "Latest smartphone with advanced camera",
    999,
    25,
    someReviews,
    someImages,
    "Apple",
    12,
    0
  )
);

products.push(
  new Electronics(
    "Samsung QLED 4K TV",
    "Smart TV with quantum dot technology",
    1200,
    8,
    someReviews,
    someImages,
    "Samsung",
    24,
    150
  )
);

products.push(
  new Electronics(
    "MacBook Air M2",
    "Thin and lightweight laptop",
    1299,
    12,
    someReviews,
    someImages,
    "Apple",
    12,
    0
  )
);

products.push(
  new Electronics(
    "Bosch Professional GWS 850",
    "Angle grinder for professional use",
    180,
    18,
    someReviews,
    someImages,
    "Bosch",
    36,
    850
  )
);

products.push(
  new Electronics(
    "Sony WH-1000XM5",
    "Wireless noise-canceling headphones",
    350,
    30,
    someReviews,
    someImages,
    "Sony",
    12,
    0
  )
);

products.push(
  new Electronics(
    "Dyson V11 Absolute",
    "Cordless vacuum cleaner",
    600,
    10,
    someReviews,
    someImages,
    "Dyson",
    24,
    650
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

console.log("-- Test 13: Try method getPriceForQuantity");
console.log(item.getPriceForQuantity(5), "\n");

console.log("-- Test 13: Try method getWithKey name");
console.log(item.getWithKey("name"), "\n");

console.log("-- Test 13: Try method getWithKey with invalid key");
tryMethod(() => item.getWithKey("colo"));

console.log("-- Test 14: Try function searchProducts with word 'Prof'");
console.log(searchProducts(products, "Prof"), "\n");

console.log("-- Test 15: Try function sortProducts by price");
console.log(sortProducts(products, "price"));

console.log("-- Test 16: Try function sortProducts by ID");
console.log(sortProducts(products, "ID"));

console.log("-- Test 17: Try function sortProducts by name");
console.log(sortProducts(products, "name"));
