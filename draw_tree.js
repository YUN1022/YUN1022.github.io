let canvas = document.getElementById("treeCanvas");
let cx = canvas.getContext("2d");
cx.translate(800,600); 
cx.rotate(180*Math.PI/180)
cx.translate(400,0)
//cx.translate(400,0)//變更原點位置 (0,0) -> (x,y)

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

          let num = document.getElementById('em');
          num = size;
          branch(22, 0.5, 0.8);

        })
        .catch((err) => {
            console.log(err)
        });
}

function branch(length, angle, scale) {
    if (length < 30){
      cx.fillStyle = 'brown'
      cx.fillRect(0, 0, 2, length);
    }
    else{
      cx.fillStyle = 'brown'
      cx.fillRect(0, 0, 2, length); //畫長方形(x,y,width,height)
    }

    if (length < 10) return;
    cx.save();
    cx.translate(0, length);
    cx.rotate(-angle);
    branch(length * scale, angle, scale);
    cx.rotate(2 * angle);
    branch(length * scale, angle, scale);
    cx.restore();
  }