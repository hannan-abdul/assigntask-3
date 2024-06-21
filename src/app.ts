import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/Auth/auth.route';
import { ServiceRoutes } from './app/modules/service/service.route';
import { SlotRoutes } from './app/modules/slot/slot.route';
import { BookingRoutes } from './app/modules/booking/booking.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

// app routes
app.use('/api', UserRoutes);
app.use('/api', AuthRoutes);
app.use('/api', ServiceRoutes);
app.use('/api', SlotRoutes);
app.use('/api', BookingRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Car wash booking system');
};

app.get('/', getAController);

export default app;
