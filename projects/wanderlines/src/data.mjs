// Seed journeys — mocked data (no backend), the current LOG shape from the design.
export const JOURNEYS = [
  {
    id: "j1",
    name: "Southeast Asia",
    start: "2024-02-03",
    end: "2024-02-24",
    modes: ["plane", "train", "boat"],
    travelers: [
      { name: "You", age: "29", avatar: 0 },
      { name: "Sam", age: "31", avatar: 1 },
    ],
    review: { rating: 5, returnq: "yes", highlight: "Angkor Wat at sunrise", eats: "Mango sticky rice off a Bangkok cart", stay: "Riverside guesthouse in Hoi An" },
    remember: ["Book Angkor tickets the night before", "Pack lighter — laundry is cheap"],
    stops: [
      { name: "Bangkok", lon: 100.5, lat: 13.76, kind: "city" },
      { name: "Angkor Wat", lon: 103.87, lat: 13.41, kind: "unesco" },
      { name: "Vietnam", lon: 108.28, lat: 14.06, kind: "country" },
    ],
  },
  {
    id: "j2",
    name: "Andes Adventure",
    start: "2023-09-10",
    end: "2023-09-28",
    modes: ["car", "walking"],
    travelers: [{ name: "You", age: "29", avatar: 0 }],
    review: { rating: 4, returnq: "maybe", highlight: "Machu Picchu trek", eats: "Lomo saltado in Cusco", stay: "" },
    remember: ["Acclimatise in Cusco 2+ days before the trek"],
    stops: [
      { name: "Cusco", lon: -71.97, lat: -13.53, kind: "city" },
      { name: "Machu Picchu", lon: -72.55, lat: -13.16, kind: "unesco" },
      { name: "Chile", lon: -71.54, lat: -35.68, kind: "country" },
    ],
  },
];

export const THEME_LABELS = {
  retro: "Retro", sleek: "Sleek", disco: "Disco",
  earthy: "Earthy", cute: "Cute", classic: "Classic",
};
