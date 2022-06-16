export function systemRatioByResolution(width) {
  const systemRatio = width / screen.width;
  console.log("systemRatioByResolution", systemRatio);
  return systemRatio;
}

export function systemRatioByFullscreen() {
  const ratio = screen.width / window.innerWidth;
  const systemRatio = devicePixelRatio / ratio;
  console.log("systemRatioByFullscreen", systemRatio);
  return systemRatio;
}
