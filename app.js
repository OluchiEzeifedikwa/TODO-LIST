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

// To display the home page
app.get('/home', (req, res) => {
    res.render('homepage');
  });  
  

// To render the todo personal form
app.get('/todos', async (req, res) => {
    const todos = await prisma.todo.findMany();
    const events = todos.map(todo => ({
      title: todo.title,
      start: todo.date.toISOString(),
    }));
    
    res.render('index', { todos, events });
});  


// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const { title, priority, date, assignee } = req.body;

    // Check if title is not empty
    if (!title || title.trim() === '') {
      return res.status(400).send('Title is required');
    }

    // Check if date is valid
    const todoDate = new Date(date);
    if (isNaN(todoDate.getTime())) {
      return res.status(400).send('Invalid date');
    }

    const todo = await prisma.todo.create({
      data: {
        title,
        priority,
        date: todoDate,
        completed: false,
        assignee,
      },
    });
    res.redirect('/todos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating todo');
  }
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

// To edit todo
app.get('/todos/:id/edit', async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await prisma.todo.findUnique({ where: { id } });
      console.log(todo);
      res.render('edit', { todo });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching todo');
    }
  });

  app.post('/todos/:id/update-title', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      await prisma.todo.update({
        where: { id },
        data: {
          title,
        },
      });
      res.redirect('/todos');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error updating todo');
    }
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

// To create a new work
app.post('/work', async (req, res) => {
  try {
    const { title, priority, date, assignee } = req.body;

    // Check if title is not empty
    if (!title || title.trim() === '') {
      return res.status(400).send('Title is required');
    }

    // Check if date is valid
    const workDate = new Date(date);
    if (isNaN(workDate.getTime())) {
      return res.status(400).send('Invalid date');
    }

    const work = await prisma.work.create({
      data: {
        title,
        priority,
        date: workDate,
        completed: false,
        assignee,
      },
    });
    res.redirect('/work');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating todo');
  }
});

// update a work
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

// To edit todo
app.get('/work/:id/edit', async (req, res) => {
  try {
    const { id } = req.params;
    const work = await prisma.work.findUnique({ where: { id } });
    console.log(work);
    res.render('edit', { work });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching work');
  }
});

app.post('/work/:id/update-title', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    await prisma.work.update({
      where: { id },
      data: {
        title,
      },
    });
    res.redirect('/work');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating todo');
  }
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
  
// Delete a work todo
app.post('/work/:id/delete', async (req, res) => {
    console.log('Delete route called');
    const { id } = req.params;
    await prisma.work.delete({
      where: { id },
    });
    
    res.redirect('/work')
});

app.get(/(.*)/, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});