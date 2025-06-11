import express from 'express';
import { PrismaClient } from './generated/prisma/index.js';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import todoRoutes from './routes/todoRoutes.js';
import workRoutes from './routes/workRoutes.js';

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
app.use(todoRoutes);
app.use(workRoutes);

app.get(/(.*)/, (req, res) => {
  res.render('404'); // assuming you have a 404.ejs template
});

app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});