function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }
  return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ];
}

const colorPool = {};
let lastValue = 1;

export default function generateColor(seed){
  var value;
  console.log(value, colorPool);
  if(seed in colorPool) {
    value = colorPool[seed];
  } else {
    value = colorPool[seed] = lastValue;
    lastValue += 13;
  }
  //
  return 'rgb(' + HSVtoRGB((value % 100) / 100, 1, 0.55).join() + ')';
}
