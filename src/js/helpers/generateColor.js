import { defaultTo } from 'lodash';

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
let lastHue = 1;

export default function generateColor(seed, option = {}){
  var hue; // percentile
  var saturation = defaultTo(option.saturation, 1);
  var value = defaultTo(option.value, 0.55);

  console.log(hue, colorPool);
  if(seed in colorPool) {
    hue = colorPool[seed];
  } else {
    hue = colorPool[seed] = lastHue;
    lastHue += 13;
  }
  //
  return 'rgb(' + HSVtoRGB((hue % 100) / 100, saturation, value).join() + ')';
}
