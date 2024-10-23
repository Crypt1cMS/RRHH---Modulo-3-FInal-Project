import express from 'express';
import { getEmployees } from './controllers/employeeController'

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/employees', getEmployees)
