function Product(ID, name, description, price, brand, reviews, images) {
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.size = ["XS", "S", "M", "L", "XL", "XXL"];
  this.date = getCurrentDate();

  this.reviews = reviews;
  this.images = images;

  this.getID = function () {
    this.ID;
  };
  this.setID = function (ID) {
    if (typeof ID !== "number" || isNaN(ID)) {
      throw new Error("Type of ID must be a 'Number'!");
    }
    this.ID = ID;
  };

  this.getName = function () {
    this.name;
  };
  this.setName = function (name) {
    if (typeof name !== "string") {
      throw new Error("Type of name must be a 'String'!");
    }
    this.name = name;
  };

  this.getDescription = function () {
    this.description;
  };
  this.setDescription = function (description) {
    if (typeof description !== "string") {
      throw new Error("Type of description must be a 'String'!");
    }
    this.description = description;
  };

  this.getPrice = function () {
    this.price;
  };
  this.setPrice = function (price) {
    if (typeof price !== "number" || isNaN(price)) {
      throw new Error("Type of price must be a 'Number'!");
    }
    this.price = price;
  };

  this.getBrand = function () {
    this.brand;
  };
  this.setBrand = function (brand) {
    if (typeof brand !== "string") {
      throw new Error("Type of brand must be a 'String'!");
    }
    this.brand = brand;
  };

  this.getSize = function () {
    this.size;
  };
  this.setSize = function (size) {
    if (typeof size !== "string") {
      throw new Error("Type of size must be a 'String'!");
    }
    this.size = size;
  };

  this.getDate = function () {
    this.date;
  };
  this.setDate = function (date) {
    if (typeof date !== "string") {
      throw new Error("Type of date must be a 'String'!");
    }
    this.date = date;
  };

  this.getReview = function () {
    this.reviews;
  };
  this.setReview = function (reviews) {
    if (typeof reviews !== "object") {
      throw new Error("Type of reviews must be a 'Object'!");
    }
    this.reviews = reviews;
  };

  this.getReviewByID = (ID) =>
    reviews.find((el) => el.ID === ID) || "Review not found";

  this.getImage = (index) => {
    if (index < 0 || index >= this.images.length) {
      throw new Error("Image with this index does not exist in array!");
    }
    return this.images[index] || this.images[0];
  };

  this.addSize = (size) => this.size.push(size);

  this.deleteSize = (element) => {
    const index = this.size.indexOf(element);
    if (index === -1) {
      throw new Error("This size does not exist in array!");
    }
    this.size.splice(index, 1);
  };
  this.addReview = (review) => {
    if (!(review instanceof Reviews)) {
      throw new Error("Review must be an instance of Reviews");
    }
    this.reviews.push(review);
  };

  this.deleteReview = (ID) => {
    const index = reviews.findIndex((review) => review.ID === ID);
    if (index === -1) {
      throw new Error("This review does not exist in array!");
    }
    this.reviews.splice(index, 1);
  };

  this.getAverageRating = () => {
    if (this.reviews.length === 0) {
      throw new Error("There is no reviews in this product");
    }
    const result = this.reviews.reduce((acc, el) => {
      return acc + Object.values(el.rating).reduce((acc, next) => acc + next);
    }, 0);
    return result / (reviews.length * 4);
  };
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

export { Product, Reviews, sortProducts, searchProducts };
