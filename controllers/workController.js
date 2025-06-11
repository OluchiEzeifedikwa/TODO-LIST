import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

export const getWorks = async (req, res) => {
  const works = await prisma.work.findMany();
  const events = works.filter(work => work.date !== null).map(work => ({
    title: work.title,
    start: work.date.toISOString(),
  }));
  
  res.render('work', { works });
};

export const createWork = async (req, res) => {
  try {
    const { title, priority, date, assignee } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).send('Title is required');
    }

    const workDate = new Date(date);
    const createData = {
      title,
      priority,
      completed: false,
      assignee,
    };

    if (!isNaN(workDate.getTime())) {
      createData.date = workDate;
    }

    const work = await prisma.work.create({
      data: createData,
    });
    res.redirect('/work');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating work');
  }
};

export const updateWork = async (req, res) => {
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
};

export const editWork = async (req, res) => {
  try {
    const { id } = req.params;
    const work = await prisma.work.findUnique({ where: { id } });
    console.log(work);
    res.render('editWork', { work });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching work');
  }
};

export const updateWorkBoth = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date, priority } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).send('Title is required');
    }

    const workDate = new Date(date);
    const updateData = {
      title,
      priority,
    };

    if (!isNaN(workDate.getTime())) {
      updateData.date = workDate;
    }

    await prisma.work.update({
      where: { id },
      data: updateData,
    });
    res.redirect('/work');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating work');
  }
};

export const updateWorkPriority = async (req, res) => {
  const { id } = req.params;
  const { priority } = req.body;
  await prisma.work.update({
    where: { id },
    data: {
      priority,
    },
  });
  res.redirect('/work');
};

export const deleteWork = async (req, res) => {
  console.log('Delete route called');
  const { id } = req.params;
  await prisma.work.delete({
    where: { id },
  });
  
  res.redirect('/work')
};