// Wanderlines line-icons (extracted from the design) — single-stroke, currentColor.
export const ICON_PATHS = {
  car: "<path d=\"M5 11l2-4.2A2 2 0 0 1 8.8 5.6h6.4a2 2 0 0 1 1.8 1.2L19 11\"/><rect x=\"3.5\" y=\"11\" width=\"17\" height=\"5\" rx=\"1.3\"/><circle cx=\"7.5\" cy=\"17.5\" r=\"1.4\"/><circle cx=\"16.5\" cy=\"17.5\" r=\"1.4\"/>",
  bus: "<rect x=\"4\" y=\"4\" width=\"16\" height=\"13\" rx=\"2.4\"/><path d=\"M4 12h16M9 4v8\"/><circle cx=\"8\" cy=\"19\" r=\"1.2\"/><circle cx=\"16\" cy=\"19\" r=\"1.2\"/>",
  train: "<rect x=\"6\" y=\"4\" width=\"12\" height=\"12\" rx=\"3\"/><path d=\"M6 11h12\"/><circle cx=\"9\" cy=\"13.5\" r=\"0.9\"/><circle cx=\"15\" cy=\"13.5\" r=\"0.9\"/><path d=\"M8 16l-2 3.5M16 16l2 3.5\"/>",
  walking: "<circle cx=\"13\" cy=\"4\" r=\"1.8\"/><path d=\"M13 7l-1 5 3 3 1.5 4M12 12l-3 1.5M13.5 9l3 1.5\"/>",
  biking: "<circle cx=\"6\" cy=\"17\" r=\"3.2\"/><circle cx=\"18\" cy=\"17\" r=\"3.2\"/><path d=\"M6 17l4-7h4M9.5 10h4M14 10l4 7\"/><circle cx=\"14.5\" cy=\"5.5\" r=\"1.3\"/>",
  boat: "<path d=\"M12 3v10M12 5.5l5 7.5h-5z\"/><path d=\"M4 16h16l-2.2 4.2H6.2z\"/>",
  horseback: "<path fill=\"currentColor\" stroke=\"none\" d=\"M7.7 21c-.2-2.6.4-4.7 1.9-6.3-1.7.1-3.2-.4-4.2-1.6-.7-.8-.5-1.7.2-2.3l1.3 1.1.6-1.5-1-1c.8-1.9 2.3-3.5 4.6-4.3l-.5-1.7c-.1-.5.2-1 .8-.8 2 .6 5.7 2.7 6.6 7.3.5 2.6.2 6.6-2 11.1z\"/><circle cx=\"12.2\" cy=\"9\" r=\".7\" fill=\"var(--paper)\" stroke=\"none\"/>",
  cruise: "<path d=\"M4 17h16l-1.8 4H5.8z\"/><rect x=\"8\" y=\"9.5\" width=\"9\" height=\"4.5\"/><path d=\"M8 11.5h9M11.5 6h4v3.5h-4z\"/>",
  plane: "<path d=\"M12 3c.9 0 1.4 1.1 1.4 3v3.6l6.1 3.6v1.9l-6.1-1.7v3.4l1.9 1.4v1.5L12 22.2 8.8 21v-1.5l1.9-1.4v-3.4L4.6 16.4v-1.9l6.1-3.6V6c0-1.9.5-3 1.3-3z\"/>",
  flag: "<path d=\"M6 21V4\"/><path d=\"M6 5h11l-2.2 3 2.2 3H6\"/>",
  pin: "<path d=\"M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10z\"/><circle cx=\"12\" cy=\"11\" r=\"2.1\"/>",
  unesco: "<path d=\"M4 9l8-5 8 5\"/><path d=\"M5.5 9v8M9.5 9v8M14.5 9v8M18.5 9v8\"/><path d=\"M3.5 20h17\"/>",
  park: "<path d=\"M12 3l4.5 7H14l3 5H7l3-5H7.5z\"/><path d=\"M12 15v5\"/>",
  city: "<path d=\"M4 21V9l5-3v15M9 21V12l6-2.5V21M15 21V13l5 2v6\"/><path d=\"M3 21h18\"/>",
  water: "<path d=\"M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 14c2-2 4-2 6 0s4 2 6 0 4-2 6 0\"/>",
  compass: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M15.5 8.5l-2.2 4.8-4.8 2.2 2.2-4.8z\"/>",
  calendar: "<rect x=\"4\" y=\"5\" width=\"16\" height=\"15\" rx=\"2\"/><path d=\"M4 9.5h16M8 3v4M16 3v4\"/>",
  search: "<circle cx=\"11\" cy=\"11\" r=\"6\"/><path d=\"M15.6 15.6L20 20\"/>",
  person: "<circle cx=\"12\" cy=\"8\" r=\"3.4\"/><path d=\"M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6\"/>",
  list: "<path d=\"M9 6h11M9 12h11M9 18h11\"/><circle cx=\"4.5\" cy=\"6\" r=\"1\"/><circle cx=\"4.5\" cy=\"12\" r=\"1\"/><circle cx=\"4.5\" cy=\"18\" r=\"1\"/>",
  world: "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M3 12h18\"/><path d=\"M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18\"/>",
};
export function icon(name, size = 18) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-3px;flex:none">${ICON_PATHS[name] || ''}</svg>`;
}
export const STOP_ICON = { country:'flag', region:'pin', unesco:'unesco', park:'park', city:'city', water:'water' };
export const VEHICLES = ['car','bus','train','walking','biking','boat','horseback','cruise','plane'];
