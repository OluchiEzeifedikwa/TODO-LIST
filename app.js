import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
  });


// Get all todos
// app.get('/todos', async (req, res) => {
//     const todos = await prisma.todo.findMany();
//     res.json(todos);
//   });

// To render the todo personal form
app.get('/todos', async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.render('index', { todos });
});  

app.get('/', async (req, res) => {
  res.render('home');
});  

// To render the todo work form

// Create a new todo
app.post('/todos', async (req, res) => {
    const { title, priority } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        priority,
        completed: false,
      },
    });
    res.redirect('/todos');
});
  

// Update a todo
app.post('/todos/:id/update', async (req, res) => {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({
      where: { id },
    });
    await prisma.todo.update({
      where: { id },
      data: {
        completed: !todo.completed,
      },
    });
    res.redirect('/todos');
  });


  app.post('/todos/:id/priority', async (req, res) => {
    const { id } = req.params;
    const { priority } = req.body;
    await prisma.todo.update({
      where: { id },
      data: {
        priority,
       },
    });
    res.redirect('/todos');
  });


  
// Delete a todo
app.post('/todos/:id/delete', async (req, res) => {
    console.log('Delete route called');
    const { id } = req.params;
    await prisma.todo.delete({
      where: { id },
    });
    
    res.redirect('/todos')
});

// To render the todo work form
app.get('/work', async (req, res) => {
  const works = await prisma.work.findMany();
  res.render('work',  { works });
});

// Create a new work
app.post('/work', async (req, res) => {
    const { title, priority } = req.body;
    const work = await prisma.work.create({
      data: {
        title,
        priority,
        completed: false,
      },
    });
    res.redirect('/work');
});
  

// Update a work
app.post('/work/:id/update', async (req, res) => {
    const { id } = req.params;
    const work = await prisma.work.findUnique({
      where: { id },
    });
    await prisma.work.update({
      where: { id },
      data: {
        completed: !work.completed,
      },
    });
    res.redirect('/work');
  });


  app.post('/work/:id/priority', async (req, res) => {
    const { id } = req.params;
    const { priority } = req.body;
    await prisma.work.update({
      where: { id },
      data: {
        priority,
       },
    });
    res.redirect('/work');
  });


  
// Delete a work
app.post('/work/:id/delete', async (req, res) => {
    console.log('Delete route called');
    const { id } = req.params;
    await prisma.work.delete({
      where: { id },
    });
    
    res.redirect('/work')
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});