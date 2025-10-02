function Product(ID, name, description, price, brand, datе, reviews, images) {
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

  this.getReviewByID = (ID) => (reviews.find(el => (el.ID===ID))||"Reviewe not found");

  this.getImage = (param) => (this.images[param]||this.images[0]); // Додати перевірки!

  this.addSize = (size) => (this.size.push(size)); 

  this.deleteSize = (element) => (this.size.splice(this.size.indexOf(element), 1)) // Додати перевірки!

  // this.addReview

  // this.delereReview

  // this.getAverageRating
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
