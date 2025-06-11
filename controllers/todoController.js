import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const getTodos = async (req, res) => {
  const todos = await prisma.todo.findMany();
  const events = todos.filter(todo => todo.date !== null).map(todo => ({
    title: todo.title,
    start: todo.date.toISOString(),
  }));
  
  res.render('index', { todos, events });
};

export const createTodo = async (req, res) => {
  try {
    const { title, priority, date, assignee } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).send('Title is required');
    }

    const todoDate = new Date(date);
    const createData = {
      title,
      priority,
      completed: false,
      assignee,
    };

    if (!isNaN(todoDate.getTime())) {
      createData.date = todoDate;
    }

    const todo = await prisma.todo.create({
      data: createData,
    });
    res.redirect('/todos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating todo');
  }
};

export const updateTodo = async (req, res) => {
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
};

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await prisma.todo.findUnique({ where: { id } });
    console.log(todo);
    res.render('edit', { todo });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching todo');
  }
};

export const updateTodoBoth = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).send('Title is required');
    }

    const todoDate = new Date(date);
    const updateData = {
      title,
      priority,
    };

    if (!isNaN(todoDate.getTime())) {
      updateData.date = todoDate;
    }

    await prisma.todo.update({
      where: { id },
      data: updateData,
    });
    res.redirect('/todos');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating todo');
  }
};

export const updateTodoPriority = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;
  await prisma.todo.update({
    where: { id },
    data: {
      priority,
    },
  });
  res.redirect('/todos');
};

export const deleteTodo = async (req, res) => {
  console.log('Delete route called');
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id },
  });
  
  res.redirect('/todos')
};