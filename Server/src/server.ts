import express from 'express';
import employeeRoutes from './routes/employees';
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/employees', employeeRoutes);
