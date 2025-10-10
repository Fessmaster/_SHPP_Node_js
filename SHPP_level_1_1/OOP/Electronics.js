import { AbstractProduct } from "./AbstractProduct.js";
function Electronics(
  name,
  description,
  price,
  quantity,
  reviews,
  images,
  brand,
  warranty,
  power
) {
  this.name = name;
  this.description = description;
  this.price = price;
  this.quantity = quantity;
  this.reviews = reviews;
  this.images = images;
  this.brand = brand;
  this.warranty = warranty,
  this.power = power, 
  AbstractProduct.call(this);
}

  Electronics.prototype = Object.create(AbstractProduct.prototype);
  Electronics.prototype.constructor = Electronics;

  Electronics.prototype.getWarranty = function () {
    return this.warranty;
  }
  Electronics.prototype.setWarranty = function (warranty) {
    this.warranty = warranty;
    return this;
  }

  Electronics.prototype.getPower = function () {
    return this.power;
  }
  Electronics.prototype.setPower = function (power) {
    this.power = power;
    return this
  }


export {Electronics}