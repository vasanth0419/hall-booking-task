let rooms = [
  {
    room_id: 1,
    room_name: "room-1",
    room_status: "available",
    amenities: "Tv, Washing Machine, Iron box",
    seats: 4,
    price_per_hrs: 1000,
  },
  {
    room_id: 2,
    room_name: "room-2",
    room_status: "available",
    amenities: "Tv, Washing Machine, Iron box",
    seats: 4,
    price_per_hrs: 2000,
  },
  {
    room_id: 3,
    room_name: "suite-room-s",
    room_status: "available",
    amenities: "Tv, Washing Machine, Iron box, Indoor-swimmingpool",
    seats: 4,
    price_per_hrs: 15000,
  },
  {
    room_id: 4,
    room_name: "suite-room-l",
    room_status: "available",
    amenities: "Tv, Washing Machine, Iron box, Indoor-swimmingpool",
    seats: 6,
    price_per_hrs: 20000,
  },
];

let bookingRoom = [];

export const api = (req, res) => {
  res.status(200).send("api is working");
};

export const createRoom = (req, res) => {
  let id = rooms.length ? rooms[rooms.length - 1].room_id + 1 : 1;
  req.body.room_id = id;
  rooms.push(req.body);
  res.status(200).json({
    message: "Room Created Succesfully",
    Room: rooms,
  });
};

export const getallroom = (req, res) => {
  res.status(200).json({ message: "Rooms details", rooms });
};

export const bookRoom = (req, res) => {
  let { customer_name, date, start_time, end_time, roomID } = req.body;

  let room = rooms.find(
    (e) => e.room_status === "available" && e.room_id == roomID
  );
  if (!room) {
    return res.status(400).json({
      message: "Room is not Available",
    });
  }

  let bookingConflict = bookingRoom.find(
    (booking) =>
      booking.date === date &&
      booking.roomID === roomID &&
      ((start_time >= booking.start_time && start_time < booking.end_time) ||
        (end_time > booking.start_time && end_time <= booking.end_time) ||
        (start_time <= booking.start_time && end_time >= booking.end_time))
  );
  if (bookingConflict) {
    return res.status(400).json({
      message: "Room is already booked for the specified date and time",
    });
  }

  let booking = {
    customer_name,
    start_time,
    end_time,
    roomID,
    date,
    booking_id: bookingRoom.length + 1,
    booking_date: new Date().toISOString().split("T")[0],
    status: "booked",
  };

  bookingRoom.push(booking);

  room.room_status = "booked";

  return res.status(200).json({
    message: "Successfully Booked Room",
    bookingDetails: booking,
  });
};

export const bookedroom = (req, res) => {
  const bookedRooms = bookingRoom.filter(
    (booking) => booking.status === "booked"
  );

  return res.status(200).json({
    message: "Booked rooms",
    bookedRooms: bookedRooms,
  });
};

export const getAllCustomerData = (req, res) => {
  const customerList = bookingRoom.map((booking) => {
    const room = rooms.find((r) => r.room_id === booking.roomID);
    return {
      Customer_Name: booking.customer_name,
      Room_Name: room ? room.room_name : null,
      Date: booking.date,
      start_time: booking.start_time,
      end_time: booking.end_time,
    };
  });

  return res.status(200).json({
    message: "Customer data",
    customerList: customerList,
  });
};
