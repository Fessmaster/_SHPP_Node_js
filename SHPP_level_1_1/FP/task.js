import { csv } from "./csv.js";


function main(csv) {
  let counter
  
  const result = csv
    .split("\n") // split into an array of strings
    .filter((line) => /\d{2}\.\d{0,4},\d{2}\.\d{0,4},[a-zA-Z-]+,\d+/.test(line)) // валідуємо регулярним виразом кожен рядок
    .map((line) => {
      const [x, y, name, population] = line.split(',');
      return {x, y, name, population};
    }) // convert string to object
    .sort((a,b) => b.population - a.population) // sort by population
    .slice(0,10) // leave the top 10 cities by population
    .reduce((acc, line, index) => {
      acc[line.name] = {
        population: line.population,
        rating: index+1 
      }
      return acc
    }, {})

  return result;
}

const cityes = main(csv);

console.log(cityes);
