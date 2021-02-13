let canvas = document.getElementById("treeCanvas");
let cx = canvas.getContext("2d");
let status = []

cx.translate(800,600); 
cx.rotate(180*Math.PI/180);
cx.translate(400,0);

initializeLiff("1655624196-wnWjnQAB")


function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
          let myLink = liff.permanentLink.createUrl();

          if(myLink.indexOf('?')!=-1)
          {
            let ary1 = myLink.split('?');
            let ary2 = ary1[1].split('=');
            var size = ary2[1];
            console.log(size);
          }

          console.log(myLink);
          console.log('LIFF init');

          // let num = document.getElementById('num');
          // num.innerHTML = size;
          branch(parseInt(size), 30, 0.8, 13);

        })
        .catch((err) => {
            console.log(err)
        });
}

function branch(length, angle, scale, n) {
  if (n > 0){
    if (n < 8){
      cx.fillStyle = 'red'
      cx.fillRect(0, 0, 2, length);
    }
    else {
      cx.fillStyle = 'black'
      cx.fillRect(0, 0, 2, length);
    }
  }
  else{
    return
  }
  
  cx.save();
  cx.translate(0, length);
  cx.rotate(-angle * Math.PI/180);
  branch(length * 0.8, angle, scale, n-1);

  cx.rotate(2 * angle * Math.PI/180);
  branch(length * 0.8, angle, scale, n-1);

  cx.restore();
}