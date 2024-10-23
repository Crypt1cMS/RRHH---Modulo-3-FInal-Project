import express from 'express';
import employeeRoutes from './routes/employees';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/employees', employeeRoutes);
app.post('/employees', employeeRoutes)

