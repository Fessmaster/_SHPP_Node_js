function Product(ID, name, description, price, brand, reviews, images) {
  this.ID = ID;
  this.name = name;
  this.description = description;
  this.price = price;
  this.brand = brand;
  this.size = ["XS", "S", "M", "L", "XL", "XXL"];
  this.date = new Date();
  this.reviews = reviews;
  this.images = images;

  this.getID = () => this.ID;
  this.setID = (ID) => (this.ID = ID);

  this.getName = () => this.name;
  this.setName = (name) => (this.name = name);

  this.getDescription = () => this.description;
  this.setDescription = (description) => (this.description = description);

  this.getPrice = () => this.price;
  this.setPrice = (price) => (this.price = price);

  this.getBrand = () => this.brand;
  this.setBrand = (brand) => (this.brand = brand);

  this.getSize = () => this.size;
  this.setSize = (size) => (this.size = size);

  this.getDate = () => this.date;
  this.setDate = (date) => (this.date = date);

  this.getReview = () => this.reviews;
  this.setReview = (reviews) => (this.reviews = reviews);

  this.getReviewByID = (ID) =>
    reviews.find((el) => el.ID === ID) || "Reviewe not found";

  this.getImage = (param) => {
    if (param < 0 || param >= this.images.length) return null;
    return this.images[param] || this.images[0];
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
    if (review !== null) this.reviews.push(review);
  };

  this.delereReview = (ID) => {
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
      return (
        acc + Object.values(el.rating).reduce((accum, next) => accum + next)
      );
    }, 0);
    return result / (reviews.length * 4);
  };
}

function Reviews(ID, author, comment, service, price, value, quality) {
  this.ID = ID;
  this.author = author;
  this.date = new Date();
  this.comment = comment;
  this.rating = {
    service: service,
    price: price,
    value: value,
    quality: quality,
  };
}

export { Product, Reviews };
