function AbstractProduct() {
  this.ID = new Date().getTime().toString();
  this.name;
  this.description;
  this.price;
  this.quantity;
  this.reviews;
  this.images;
  this.date = getCurrentDate();
  this.brand;
}


  AbstractProduct.prototype.getID = function () {
   return this.ID;
  }

  AbstractProduct.prototype.getName = function () {
    return this.name;
  };
  AbstractProduct.prototype.setName = function (name) {
    this.name = name;
    return this;
  };

  AbstractProduct.prototype.getDescription = function () {
    this.description;
  };
  AbstractProduct.prototype.setDescription = function (description) {
    this.description = description;
    return this;
  };

  AbstractProduct.prototype.getPrice = function () {
    this.price;
  };
  AbstractProduct.prototype.setPrice = function (price) {
    this.price = price;
    return this;
  };

  AbstractProduct.prototype.getBrand = function () {
    return this.brand;
  };
  AbstractProduct.prototype.setBrand = function (brand) {
    this.brand = brand;
    return this;
  };

  AbstractProduct.prototype.getDate = function () {
    return this.date;
  };
  AbstractProduct.prototype.setDate = function (date) {
    this.date = date;
    return this;
  }

  AbstractProduct.prototype.getReview = function () {
    return this.reviews;
  }
  AbstractProduct.prototype.setReview = function (reviews) {
    this.reviews = reviews;
    return this;
  }

  AbstractProduct.prototype.getReviewByID = function (ID) {
    return this.reviews.find((el) => el.ID === ID) || "Review not found";
  }

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
    return this
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
    Reviews - ${this.review}
    Images - ${this.images}
    Date - ${this.date}
    Brand - ${this.brand}`
  };

  AbstractProduct.prototype.getPriceForQuantity = function (int) {
    return `$${Math.round(this.getPrice * int * 100) / 100}`;
  };


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
let a = 0.3 - 0.2;
console.log(a.toFixed(1));

export { AbstractProduct, Reviews };
