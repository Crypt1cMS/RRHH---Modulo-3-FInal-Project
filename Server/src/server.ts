import express from 'express';
import cors from 'cors';
import employeeRoutes from './routes/employeesRoutes';
import loginRoutes from './routes/authlogInRoutes';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/employees', employeeRoutes);
app.use('/auth', loginRoutes); 
