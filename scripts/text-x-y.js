const mon = ['JAN', 'FEB', "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

const c = {
  price: rgb(0.33, 0.03, 0.34),
  date: rgb(0.83, 0, 0.45),
  itos: rgb(0, 0, 0.12)
}

const obj = (x, y, s, f, clr) => ({
  x: x,
  y: y,
  size: s,
  font: f,
  color: c[clr], // (1/255*85) 255 to 0 to 1 conversion
});

const xaxis = [185, 179, 183, 183]

const cptls = (a) => {
  const arr = a.split(" ");
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(" ");
  return str2
}

async function xandy(Page, Qdata, fnt, wd, ht, tfnt) {
  //qutation number
  let n = cptls(`${itos(Qdata.price)} only`)
  const dd = Qdata.date.split("-").map(a => parseInt(a))
  let date = new Date(Qdata.date)
  let txt = `${mon[date.getMonth()]} ${dd[2]} / ${Qdata.location}`;
  Page.drawText(`${Qdata.price} /-`, obj(xaxis[parseInt(Qdata.pk)], 245, 12, fnt, "price"));
  Page.drawText(txt, obj(Math.ceil(wd / 2) - (Math.floor(txt.length / 2) * 3.8), 235, 12, fnt, "date"));
  Page.drawText(n, obj(Math.ceil(wd / 2) - (Math.floor(n.length / 2) * 3.3), 225, 7, tfnt, "itos"));
}