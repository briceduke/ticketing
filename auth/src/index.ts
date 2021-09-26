import express from 'express';

const app = express();

const port = 3000;

app.use(express.json());

app.get('/api/users/currentuser', (req, res) => {
	res.send('hi');
});

app.listen(port, () => {
	console.log(`Running on http://localhost:${port}`);
});
