function hsl(rgbArr) {
    var r1 = Number(rgbArr[0]) / 255, g1 = Number(rgbArr[1]) / 255, b1 = Number(rgbArr[2]) / 255;
    var maxColor = Math.max(r1,g1,b1), minColor = Math.min(r1,g1,b1);
    var L = (maxColor + minColor) / 2 , S = 0, H = 0;
    if(maxColor != minColor){
      if(L < 0.5){
        S = (maxColor - minColor) / (maxColor + minColor);
      }else{
        S = (maxColor - minColor) / (2.0 - maxColor - minColor);
      }
      if(r1 == maxColor){
        H = (g1-b1) / (maxColor - minColor);
      }else if(g1 == maxColor){
        H = 2.0 + (b1 - r1) / (maxColor - minColor);
      }else{
        H = 4.0 + (r1 - g1) / (maxColor - minColor);
      }
    }
    L = L * 100;
    S = S * 100;
    H = H * 60;
    if(H<0){
      H += 360;
    }
    return {h:H, s:S, l:L};
  }
  function colorName(hsl) {
    var l = Math.floor(hsl.l), s = Math.floor(hsl.s), h = Math.floor(hsl.h);
    if (s <= 10 && l >= 90) {
        return ("White")
    } else if (l <= 15) {
        return ("Black")
    } else if ((s <= 10 && l <= 70) || s === 0) {
        return ("Gray")
    } else if ((h >= 0 && h <= 15) || h >= 346) {
        return ("Red");
    } else if (h >= 16 && h <= 35) {
        if (s < 90) {
            return ("Brown");
        } else {
            return ("Orange");
        }
    } else if (h >= 36 && h <= 54) {
        if (s < 90) {
            return ("Brown");
        } else {
            return ("Yellow");
        }
    } else if (h >= 55 && h <= 165) {
        return ("Green");
    } else if (h >= 166 && h <= 260) {
        return ("Blue")
    } else if (h >= 261 && h <= 290) {
        return ("Purple")
    } else if (h >= 291 && h <= 345) {
        return ("Pink")
    }
}
function inten(rgb){
    var hex = "",hex = hex+Number(rgb[0]).toString(16), hex = hex+Number(rgb[1]).toString(16), hex=hex+ Number(rgb[2]).toString(16), txt = "";
    var rgb = parseInt(hex, 16);
    var r = (rgb >> 16) & 0xff; 
    var g = (rgb >>  8) & 0xff;
    var b = (rgb >>  0) & 0xff; 
    var inten = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if(inten >= 80 && inten <= 100){
      txt = "semi dark";
    }    else if(inten < 40){
      txt = "dark";
    }    else{
      txt = "light";
    }
   return txt;
  }
  const canvas = document.getElementById("canvas"),
    preview = document.getElementById("preview"),
    ctx = canvas.getContext("2d"),
    review = document.getElementById("review"),
    rtx = review.getContext("2d");
  canvas.width = 1;
  canvas.height = 1;
  
  preview.width = 400;
  preview.height = 400;

  review.width = 300;
  review.height = 300;
  function getDominantColor(imageObject) {
    //draw the image to one pixel and let the browser find the dominant color
    ctx.drawImage(imageObject, 0, 0, 1, 1);
  
    //get pixel color
    const i = ctx.getImageData(0, 0, 1, 1).data;
    var rgbcolor = `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`;
    console.log(`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`);
  
    console.log("#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1));
    let sg="#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);
  }
  function hexToRgb(hex) {
    const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
    if (normal) return normal.slice(1).map(e => parseInt(e, 16));
  
    const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
    if (shorthand) return shorthand.slice(1).map(e => 0x11 * parseInt(e, 16));
  
    return null;
  }
  function domcolor(imageObject) {
    //draw the image to one pixel
    ctx.drawImage(imageObject, 0, 0, 1, 1);
  
    //get pixel color
    const i = ctx.getImageData(0, 0, 1, 1).data;
  
    //console.log("#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1));
    let sg="#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1);
    return sg;
  }
  function compcolor(da) {
    rtx.rect(20, 20, 150, 100);
  rtx.fillStyle = da;
  rtx.fill();
  }
  
  
  function complementryRGBColor(r, g, b) {
  if (Math.max(r, g, b) == Math.min(r, g, b)) {
      return [255 - r, 255 - g, 255 - b];

  } else {
      r /= 255, g /= 255, b /= 255;
      var max = Math.max(r, g, b), min = Math.min(r, g, b);
      var h, s, l = (max + min) / 2;
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  
      switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
      }
  
      h = Math.round((h*60) + 180) % 360;
      h /= 360;
      
      function hue2rgb(p, q, t) {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
      }
  
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
  
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);

      return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
  }
}
  function complementryHexColor(hex){
  let r = hex.length == 4 ? parseInt(hex[1] + hex[1], 16) : parseInt(hex.slice(1, 3), 16);
  let g = hex.length == 4 ? parseInt(hex[2] + hex[2], 16) : parseInt(hex.slice(3, 5), 16);
  let b = hex.length == 4 ? parseInt(hex[3] + hex[3], 16) : parseInt(hex.slice(5), 16);

  [r, g, b] = complementryRGBColor(r, g, b);
  return '#' + (r < 16 ? '0' + r.toString(16) : r.toString(16)) + (g < 16 ? '0' + g.toString(16) : g.toString(16)) + (b < 16 ? '0' + b.toString(16) : b.toString(16));
  
  //get pixel color


}

  // vvv all of this is to just get the uploaded image vvv
  const input = document.getElementById("input");
  input.type = "file";
  input.accept = "image/*";

    input.onchange = event => {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = readerEvent => {
        const image = new Image();
      image.onload = function() {
        //shows preview of uploaded image
        preview.getContext("2d").drawImage(
          image,
          0,
          0,
          preview.width,
          preview.height,
        );
        getDominantColor(image);
        sg1=domcolor(image);
        let dec=complementryHexColor(sg1);
        compcolor(dec)
        console.log(sg1) 
        console.log(dec)
        console.log(complementryHexColor(sg1));

        //color
        var color1 = hexToRgb(dec).toString();
        console.log(color1)
        var rgb = color1.replace(/[^0-9,]/g,'').replace().split(",");

        var nameColor = colorName(hsl(color1))+" "+inten(color1);
        console.log(nameColor);
      };
      image.src = readerEvent.target.result;
    };
    reader.readAsDataURL(file, "UTF-8");
  };
  



