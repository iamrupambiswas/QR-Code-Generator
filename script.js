import express from 'express';
import qr from 'qr-image';
import inquirer from 'inquirer';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/generate', async (req, res) => {
  try {
    const url = req.body.URL;
    const qr_svg = qr.image(url);

    qr_svg.pipe(fs.createWriteStream('demo.png'));
    fs.writeFile('text.txt', url, (err) => {
      if (err) throw err;
      console.log('Successfully created file!');
    });

    res.send('Successfully created files!');
  } catch (error) {
    res.send('Error: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});