import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Booking } from "../Modals/Booking";
import { User } from "../Modals/User";
import { Movies } from "../Modals/Movies";
import { Seat } from "../Modals/Seat";
import { SlotData } from "../Modals/SlotData";
import { In } from "typeorm";

export const createBookingWithPayment = async (req: Request, res: Response) => {
  const {
    userId,
    movieId,
    seatId,
    slotId,
    selectedSeats,
    bookingId,
    payment_status,
  } = req.body;

  try {
    const userRepo = AppDataSource.getRepository(User);
    const movieRepo = AppDataSource.getRepository(Movies);
    const seatRepo = AppDataSource.getRepository(Seat);
    const slotRepo = AppDataSource.getRepository(SlotData);
    const bookingRepo = AppDataSource.getRepository(Booking);

    const user = await userRepo.findOneBy({ id: userId });
    const movie = await movieRepo.findOneBy({ movie_id: movieId });
const seats = await seatRepo.find({
  where: {
    id: In(seatId),
  },
});    const slotData = await slotRepo.findOneBy({ id: slotId });

    if (!user || !movie || !seats || !slotData) {
       res
        .status(404)
        .json({ message: "One or more entities not found" });
        return;
    }

    const booking = bookingRepo.create({
      user,
      movie,
      seats,
      slotData,
      selectedSeats,
      bookingId,
      payment_status,
    });

    const savedBooking = await bookingRepo.save(booking);
     res.status(201).json(savedBooking);
     return;
  } catch (error) {
    console.error("Error creating booking:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
};
export const getUserBookings = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const limit = 7;

  try {
    const bookingRepo = AppDataSource.getRepository(Booking);

    const userBookings = await bookingRepo.find({
      where: { user: { id: Number(userId) } },
      relations: ["movie", "slotData", "slotData.theater", "seats"],take:limit,
      order:{createdAt:"DESC"} 
    });

    const response = userBookings.map((booking) => ({
      movie_poster: booking.movie.movie_poster,
      movie_title: booking.movie.movie_title,
      location: booking.slotData?.theater?.theater_name || "N/A",
      slot_time: booking.slotData.slot_time,
      slot_type:booking.slotData.slotType.type_name,
      selectedSeats: booking.selectedSeats,
      bookingId: booking.bookingId,
      payment_status: booking.payment_status,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


