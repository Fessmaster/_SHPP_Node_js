import { AbstractProduct } from "./AbstractProduct.js";
function Clothes(
  name,
  description,
  price,
  quantity,
  reviews,
  images,
  brand,
  material,
  color
) {
  AbstractProduct.call(this);
  this.name = name;
  this.description = description;
  this.price = price;
  this.quantity = quantity;
  this.reviews = reviews;
  this.images = images;
  this.brand = brand;
  this.material = material;
  this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Clothes.prototype.constructor = Clothes;


Clothes.prototype.getMaterial = function () {
  return this.material;
};
Clothes.prototype.setMaterial = function (material) {
  this.material = material;
  return this;
};

Clothes.prototype.getColor = function () {
  return this.color;
};
Clothes.prototype.setColor = function (color) {
  this.color = color;
  return this;
};
Clothes.prototype.getFullInformation = function () {
  let information = AbstractProduct.prototype.getFullInformation.call(this);
  information += `Material - ${this.material} \n`
  information += `Color - ${this.color}`
  return information
}

export { Clothes };
