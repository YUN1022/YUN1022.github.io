let canvas = document.getElementById("treeCanvas");
let cx = canvas.getContext("2d");
canvas.style.width = 800
canvas.style.height = 600

initializeLiff("1655624196-wnWjnQAB")


function initializeLiff(myLiffId) {
    liff.init({
            liffId: myLiffId
        })
        .then(() => {
          let myLink = liff.permanentLink.createUrl();
          console.log(myLink);
          if(myLink.indexOf('?')!=-1)
          {
            var ary = myLink.split('?');
            var ary = ary[1].split('&');
            var length = ary[0].split('=')[1];
            var angle = ary[1].split('=')[1];
            var status_size = ary[2].split('=')[1];
            var status_health = ary[3].split('=')[1];
            var lscale = parseInt(ary[4].split('=')[1]);
            var rscale = parseInt(ary[5].split('=')[1]);
            // var treeN = ary[6].split('=')[1];
            var scale = [Boolean(lscale),Boolean(rscale)];
            // document.title=decodeURIComponent(treeN);
          }

          console.log('LIFF init');

          // let num = document.getElementById('num');
          // num.innerHTML = size;

          switch(status_size){
            case '0':
              canvas.width  = 400;
              canvas.height = 300;
              
              cx.translate(canvas.width, canvas.height); 
              cx.rotate(180*Math.PI/180);
              cx.translate(canvas.width / 2, 0);
              break;
            case '1':
              canvas.width  = 520;
              canvas.height = 390;

              cx.translate(canvas.width, canvas.height); 
              cx.rotate(180*Math.PI/180);
              cx.translate(canvas.width / 2, 0);
              break;
            case '2':
              canvas.width  = 800;
              canvas.height = 600;

              cx.translate(canvas.width, canvas.height); 
              cx.rotate(180*Math.PI/180);
              cx.translate(canvas.width / 2, 0);
              break;
            case '3':
              canvas.width  = 800;
              canvas.height = 600;

              cx.translate(canvas.width, canvas.height); 
              cx.rotate(180*Math.PI/180);
              cx.translate(canvas.width / 2, 0);
              break;                               
          }
          

          branch(parseInt(length), parseInt(angle), scale, 12, status_size, status_health);

          liff.sendMessages([
            {
              type: 'text',
              text: '我的樹看起來怎麼樣?'
            }
          ])
            .then(() => {
              console.log('message sent');
            })
            .catch((err) => {
              console.log('error', err);
            });

        })
        .catch((err) => {
            console.log(err)
        });

}

function branch(length, angle, scale, n, status_size, status_health) {
  if (n > 0){

    switch(status_size){
      case '0' :
        tree('black' ,'green' ,length ,n ,8 ,status_health);
        rmin = 0.1;
        rmax = 0.8;
        lmin = 0.1;
        lmax = 0.8;          
        break;
      
      case '1':
        tree('black' ,'green' ,length ,n ,6 ,status_health);
        if(scale[0]){
          lmin = 0.65;
          lmax = 0.8;                   
        }else{
          lmin = 0.4;
          lmax = 0.65;            
        }
        if(scale[1]){
          rmin = 0.65;
          rmax = 0.8;                   
        }else{
          rmin = 0.4;
          rmax = 0.65;            
        }
        break;

      case '2':
        tree('black' ,'green' ,length ,n ,6 ,status_health);
        if(scale[0]){
          lmin = 0.75;
          lmax = 0.8;                   
        }else{
          lmin = 0.5;
          lmax = 0.65;            
        }
        if(scale[1]){
          rmin = 0.75;
          rmax = 0.8;                   
        }else{
          rmin = 0.5;
          rmax = 0.65;            
        }
        break;

      case '3':
        tree('black', 'green' ,length ,n ,6 ,status_health);
        if(scale[0]){
          lmin = 0.75;
          lmax = 0.85;                   
        }else{
          lmin = 0.5;
          lmax = 0.65;            
        }
        if(scale[1]){
          rmin = 0.75;
          rmax = 0.85;                   
        }else{
          rmin = 0.5;
          rmax = 0.65;            
        }
        break;
        
      default:
        tree('black' ,'green' ,length ,n ,8 ,status_health);
        rmin = 0.8;
        rmax = 0.8;
        lmin = 0.8;
        lmax = 0.8;
        break;
    }

  cx.save();
  cx.translate(0, length);
  cx.rotate(-angle * Math.PI/180);
  branch(length * getRandomScale(lmin,lmax), angle * getRandomScale(0.9,1.1), scale, n-1, status_size, status_health);

  cx.rotate(2 * angle * Math.PI/180);
  branch(length * getRandomScale(rmin,rmax), angle * getRandomScale(0.9,1.1), scale, n-1, status_size, status_health);

  cx.restore();      
  }
}

function getRandomScale(min, max) {
  return Math.random() * (max - min) + min;
}

function tree(trunkColor, leafColor, length, n, leafscale, status_health){
  switch(status_health){
    case '-3':
      if(n < leafscale){
        break;
      }
      else{
        cx.fillStyle = trunkColor
        cx.fillRect(0, 0, 2, length);        
      }
      break;

    case '-2':
      if (n < leafscale){
        p = getRandomScale(0,100);
        if (p > 70){
          cx.fillStyle = 'brown'
          cx.fillRect(0, 0, 2, length);
        }
        else if(70 >= p && p > 15){
          break;  
        }
        else{
          cx.fillStyle = leafColor
          cx.fillRect(0, 0, 2, length);      
        }
        
      }
      else {
        cx.fillStyle = trunkColor
        cx.fillRect(0, 0, 2, length);
      }
      break;

    case '-1':
      if (n < leafscale){
        p = getRandomScale(0,100);
        if (p > 70){
          cx.fillStyle = 'brown'
          cx.fillRect(0, 0, 2, length);
        }
        else{
          cx.fillStyle = leafColor
          cx.fillRect(0, 0, 2, length);      
        }
        
      }
      else {
        cx.fillStyle = trunkColor
        cx.fillRect(0, 0, 2, length);
      }
      break;
    
    case '0':
      if (n < leafscale){
        p = getRandomScale(0,100);
        cx.fillStyle = leafColor
        cx.fillRect(0, 0, 2, length);      
      }
      else {
        cx.fillStyle = trunkColor
        cx.fillRect(0, 0, 2, length);
      }
      break;

      case '1':
        if (n < leafscale){
          p = getRandomScale(0,100);
          cx.fillStyle = leafColor
          cx.fillRect(0, 0, 2, length);      
        }
        else {
          cx.fillStyle = trunkColor
          cx.fillRect(0, 0, 2, length);
        }
        break;

    default:
      temp = leafscale + 2
      if (n < temp){
        cx.fillStyle = 'green'
        cx.fillRect(0, 0, 2, length);
      }
      else {
        cx.fillStyle = 'black'
        cx.fillRect(0, 0, 2, length);
      }
      break;
  }
}