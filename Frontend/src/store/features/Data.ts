// theaterData.ts

export const theaterData = [
  {
    city: "Mumbai",
    theaters: [
      {
        id: 1,
        name: "PVR Cinemas Mumbai",
        chain: "Cinepolis",
        location: "Andheri West",
        formats: {
          regular: {
            price: 250,
            slots: ["10:00", "11:45", "11:50", "13:00"],
          },
          gold: {
            price: 350,
            slots: ["10:00", "17:00", "19:00", "22:30"],
          },
          velvet: { price: 750, slots: ["21:00", "23:30", "00:30"] },
        },
      },
      {
        id: 2,
        name: "Harry Theater Mumbai",
        chain: "Cinepolis",
        location: "Andheri East",
        formats: {
          regular: {
            price: 250,
            slots: ["10:30", "11:30", "12:30", "13:30"],
          },
          gold: {
            price: 350,
            slots: ["15:30", "17:30", "19:30", "21:30"],
          },
          velvet: { price: 750, slots: ["21:55", "22:00", "00:40"] },
        },
      },
     
    ],
  },
  {
    city: "Surat",
    theaters: [
      {
        id: 3,
        name: "Cinepolis Surat",
        chain: "Cinepolis",
        location: "Connaught Place",
        formats: {
          regular: {
            price: 250,
            slots: ["10:00", "11:45", "11:50", "13:00"],
          },
          gold: {
            price: 350,
            slots: ["15:00", "17:00", "19:00", "22:30"],
          },
          velvet: { price: 750, slots: ["21:00", "23:30", "00:30"] },
        },
      },
      {
        id: 4,
        name: "Carnival Cinemas Surat",
        chain: "CGV",
        location: "Karol Bagh",
        formats: {
          regular: { price: 500, slots: ["10:00", "11:30"] },
          gold: {
            price: 600,
            slots: ["15:00", "17:30", "19:00", "22:30"],
          },
          velvet: { price:650, slots: ["21:00", "23:30", "00:30"] },
        },
      },
    ],
  },
];
