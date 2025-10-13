function AbstractProduct() {
  this.ID = getUniqID(); //
  this.name = "";
  this.description = "";
  this.price = 0;
  this.quantity = 0;
  this.reviews = [];
  this.images = [];
  this.date = getCurrentDate();
  this.brand = "";
}

AbstractProduct.prototype.getID = function () {
  return this.ID;
};

AbstractProduct.prototype.getName = function () {
  return this.name;
};
AbstractProduct.prototype.setName = function (name) {
  if (typeof name !== "string") {
    throw new Error("Type of name must be a 'String'!");
  }
  this.name = name;
  return this;
};

AbstractProduct.prototype.getDescription = function () {
  this.description;
};
AbstractProduct.prototype.setDescription = function (description) {
  if (typeof description !== "string") {
    throw new Error("Type of description must be a 'String'!");
  }
  this.description = description;
  return this;
};

AbstractProduct.prototype.getPrice = function () {
  this.price;
};
AbstractProduct.prototype.setPrice = function (price) {
  if (typeof price !== "number" || isNaN(price)) {
    throw new Error("Type of price must be a 'number'!");
  }
  this.price = price;
  return this;
};

AbstractProduct.prototype.getBrand = function () {
  return this.brand;
};
AbstractProduct.prototype.setBrand = function (brand) {
  if (typeof brand !== "string") {
    throw new Error("Type of brand must be a 'String'!");
  }
  this.brand = brand;
  return this;
};

AbstractProduct.prototype.getDate = function () {
  return this.date;
};
AbstractProduct.prototype.setDate = function (date) {
  if (typeof date !== "string") {
    throw new Error("Type of date must be a 'String'!");
  }
  this.date = date;
  return this;
};

AbstractProduct.prototype.getReview = function () {
  return this.reviews;
};
AbstractProduct.prototype.setReview = function (reviews) {
  if (typeof reviews !== "object") {
    throw new Error("Type of reviews must be a 'Object'!");
  }
  this.reviews = reviews;
  return this;
};

AbstractProduct.prototype.getReviewByID = function (ID) {
  return this.reviews.find((el) => el.ID === ID) || "Review not found";
};

AbstractProduct.prototype.getImage = function (index) {
  if (index < 0 || index >= this.images.length) {
    throw new Error("Image with this index does not exist in array!");
  }
  return this.images[index] || this.images[0];
};

AbstractProduct.prototype.addReview = function (review) {
  if (!(review instanceof Reviews)) {
    throw new Error("Review must be an instance of Reviews");
  }
  this.reviews.push(review);
  return this;
};

AbstractProduct.prototype.deleteReview = function (ID) {
  const index = this.reviews.findIndex((review) => review.ID === ID);
  if (index === -1) {
    throw new Error("This review does not exist in array!");
  }
  this.reviews.splice(index, 1);
  return this;
};

AbstractProduct.prototype.getAverageRating = function () {
  if (this.reviews.length === 0) {
    throw new Error("There is no reviews in this product");
  }
  const result = this.reviews.reduce((acc, el) => {
    return acc + Object.values(el.rating).reduce((acc, next) => acc + next);
  }, 0);
  return result / (this.reviews.length * 4);
};

AbstractProduct.prototype.getFullInformation = function () {
  return `
ID - ${this.ID}
Name - ${this.name}
Description - ${this.description}
Price - ${this.price}
Quantity - ${this.quantity}
Reviews - ${this.getReviewInfo()}
Images - ${this.images}
Date - ${this.date}
Brand - ${this.brand} \n`;
};

AbstractProduct.prototype.getPriceForQuantity = function (int) {
  return `$${Math.round(this.price * int * 100) / 100}`;
};

AbstractProduct.prototype.getWithKey = function (key) {
  if (!(key in this)) {
    throw new Error("This key does not exist in object!");
  }
  return this[key];
};

AbstractProduct.prototype.setWithKey = function (key, value) {
  if (!(key in this)) {
    throw new Error("This key does not exist in object!");
  }
  if (typeof value !== typeof this[key]) {
    throw new Error(`Type of ${key} must be a ${typeof this[key]}!`);
  }
  this[key] = value;
  return this;
};

AbstractProduct.prototype.getReviewInfo = function () {
  let info = "\n";
  this.reviews.forEach((obj) => {
    info += printObj(obj);
  });
  return info.trimEnd(); // delete last line feed symbol
};

function printObj(obj, indent = 1) {
  let inf = "";
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object") {
      inf += `${"\t".repeat(indent)}${key} - \n`;
      inf += printObj(value, indent + 1);
    } else {
      inf += `${"\t".repeat(indent)}${key} - ${value}\n`;
    }
  }
  return inf;
}

function Reviews(ID, author, comment, service, price, value, quality) {
  this.ID = ID;
  this.author = author;
  this.date = getCurrentDate();
  this.comment = comment;
  this.rating = {
    service: service,
    price: price,
    value: value,
    quality: quality,
  };
}

function getCurrentDate() {
  const date = new Date();
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0") +
    " " +
    String(date.getHours()).padStart(2, "0") +
    ":" +
    String(date.getMinutes()).padStart(2, "0") +
    ":" +
    String(date.getSeconds()).padStart(2, "0")
  );
}

function getUniqID() {
  return new Date().getTime().toString() + Math.round(Math.random() * 1000);
}

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

export { AbstractProduct, Reviews, searchProducts, sortProducts };
