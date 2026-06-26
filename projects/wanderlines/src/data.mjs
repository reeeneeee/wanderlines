// Seed journeys — mocked data (no backend), the same shape the prototype uses.
export const JOURNEYS = [
  {
    id: "j1",
    name: "Southeast Asia",
    start: "2024-02-03",
    end: "2024-02-24",
    modes: ["plane", "train", "boat"],
    travelers: [
      { name: "You", age: "29", avatar: "🧑" },
      { name: "Sam", age: "31", avatar: "👩" },
    ],
    review: { rating: 5, pace: "balanced", budget: "midrange", weather: "sunny", returnq: "yes", highlight: "Angkor Wat at sunrise" },
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
    travelers: [{ name: "You", age: "29", avatar: "🧑" }],
    review: { rating: 4, pace: "packed", budget: "shoestring", weather: "mixed", returnq: "maybe", highlight: "Machu Picchu trek" },
    stops: [
      { name: "Cusco", lon: -71.97, lat: -13.53, kind: "city" },
      { name: "Machu Picchu", lon: -72.55, lat: -13.16, kind: "unesco" },
      { name: "Chile", lon: -71.54, lat: -35.68, kind: "country" },
    ],
  },
];

export const THEME_META = {
  retro: "Retro", sleek: "Sleek", disco: "Disco",
  earthy: "Earthy", cute: "Cute", classic: "Classic",
};
