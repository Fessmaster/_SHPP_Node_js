import { csv } from "./csv.js";
import { text } from "./text,js";


function main(csv) {  
  
  const result = csv
    .split("\n") // split into an array of strings
    .filter((line) => /\d{2}\.\d{0,4},\d{2}\.\d{0,4},[a-zA-Z-]+,\d+/.test(line)) // validate each line with a regular expression
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
    
  return (str) => {
    
    for(const key in result){      
      if (str.includes(key)){
        str = str.replace(key, 
          `${key}(${result[key].rating} place in the TOP-10 largest cities in Ukraine, population ${result[key].population} people)`)          
      }
    }
    return str
  }
}

const city = main(csv)
console.log(city(text));