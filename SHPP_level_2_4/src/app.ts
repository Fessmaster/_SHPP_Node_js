import * as express from "express"
import * as fs from "fs"
import * as path from "path"

const app = express();
const port = 3005;
const filePath = path.join(__dirname, "../public/listOfTasks.txt"); 
let ID = 0;
let listOfTasks:string = '';
let list: Array<string> = []

try {
  listOfTasks = fs.readFileSync(filePath).toString();  
} catch (error: any) {
  console.log(error.message);
}

function printList (list:string){
  const arrayOfList = list.split('\n')
  if (arrayOfList.length > 0){
    const listOfTasks = arrayOfList.map(list => {
      const listOfItems = list.split(',');
      return {
        id: listOfItems[0],
        text: listOfItems[1],
        checked: listOfItems[2]
      }
    })
    listOfTasks.forEach(list => console.log(list))
  }
}
printList(listOfTasks)



// fs.writeFileSync(filePath, counter.toString());


let items =  [ 
  { id: 22, text: "Do some thing", checked: true } , 
  { id: 23, text: "Read a book", checked: false } , 
  { id: 24, text: "Complete task", checked: false } , 
]
app.use(express.json());
app.use(express.static('public'))

app.get('/api/v1/items',  (req, res) => {
  res.json({
    items: items
  }) 
})
app.post('/api/v1/items', (req, res) => {
  const newTask = req.body.text;
  items.push({id: ID++, text: newTask, checked:false})
  const newTaskInFile = `${ID++},${newTask},${false}\n`
  
  fs.appendFileSync(filePath, newTaskInFile);
  res.json({
    id: ID++, text: newTask, checked:false
  })
  res.end()
})

app.put('/api/v1/items', (req, res) =>{
  const item = items.find(item => item.id === req.body.id);  

  if (item) {
    Object.assign(item, req.body)
    res.json({ok:true});
    res.end();    
  } else {
    res.status(404).json({error: `Task not found`})
  }
})

app.delete('/api/v1/items', (req, res) =>{
  const item = items.find(item => item.id === req.body.id);    
  
  if (item){
    items = items.filter(confirmed => confirmed.id !== item.id)
    res.json({ok:true});
    res.end();
  } else {
    res.status(404).json({error: `Task not found`})
  }

})
app.listen(port, () =>{
  console.log(`Server was started on port ${port}`);
})