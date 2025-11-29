import * as express from "express"
import * as fs from "fs"
import * as path from "path"

const app = express();
const port = 3005;
const filePath = path.join(__dirname, "../public/listOfTasks.json"); 

interface Task {
  id: number,
  text: string,
  checked: boolean
}

let listOfTasks: Array<Task> = [];

function parseObject() {
  try {
    listOfTasks = JSON.parse(fs.readFileSync(filePath).toString())
  } catch (error: any) {
    console.log(error.message);
  }
}
function getId():number{
  if (listOfTasks.length > 0){
    return listOfTasks[listOfTasks.length-1].id
  }
  return 0
}
parseObject();

function reloadList(){
  fs.writeFileSync(filePath, JSON.stringify(listOfTasks));  
}

app.use(express.json());
app.use(express.static('public'))

app.get('/api/v1/items',  (req, res) => {
  res.json({
    items: listOfTasks
  }) 
})
app.post('/api/v1/items', (req, res) => {
  const newTask = req.body.text;
  let ID = listOfTasks.length > 0 ? listOfTasks[listOfTasks.length-1].id : 0
  listOfTasks.push({id: ++ID, text: newTask, checked:false})
  reloadList()
  res.json({
    id: ID, text: newTask, checked:false
  })  
})

app.put('/api/v1/items', (req, res) =>{
  const item = listOfTasks.find(item => item.id === req.body.id);  

  if (item) {
    Object.assign(item, req.body)
    reloadList()
    res.json({ok:true});
  } else {
    res.status(404).json({error: `Task not found`})
  }
})

app.delete('/api/v1/items', (req, res) =>{
  const item = listOfTasks.find(item => item.id === req.body.id);    
  
  if (item){
    listOfTasks = listOfTasks.filter(confirmed => confirmed.id !== item.id)
    reloadList()
    res.json({ok:true});
  } else {
    res.status(404).json({error: `Task not found`})
  }
})

app.listen(port, () =>{
  console.log(`Server was started on port ${port}`);
})