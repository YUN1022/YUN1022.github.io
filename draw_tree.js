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
            var isRecovery = ary[4].split('=')[1];
            // var lscale = parseInt(ary[4].split('=')[1]);
            // var rscale = parseInt(ary[5].split('=')[1]);
            // var scale = [Boolean(lscale),Boolean(rscale)];
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
          

          if (parseInt(length) === 50){status_size = '0'}
          branch(parseInt(length), parseInt(angle), 12, status_size, status_health, parseInt(isRecovery));

          liff.sendMessages([
            {
              type: 'image',
              originalContentUrl: 'https://i.imgur.com/MwS42AE.png?sender=Brown',
              previewImageUrl: 'https://i.imgur.com/MwS42AE.png?sender=Brown'
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

function branch(length, angle, n, status_size, status_health, isRecovery) {
  if (n > 0){

    switch(status_size){
      case '0' :
        tree('black' ,'green' ,length ,n ,8 ,0, isRecovery);
        scale_min = 0.1;
        scale_max = 0.8;   
        break;
      
      case '1':
        tree('black' ,'green' ,length ,n ,6 ,status_health, isRecovery);
        scale_min = 0.65;
        scale_max = 0.8;
        break;

      case '2':
        tree('black' ,'green' ,length ,n ,6 ,status_health, isRecovery);
        scale_min = 0.75;
        scale_max = 0.8;
        break;

      case '3':
        tree('black', 'green' ,length ,n ,6 ,status_health, isRecovery);
        scale_min = 0.75;
        scale_max = 0.85;
        break;
        
      default:
        tree('black' ,'green' ,length ,n ,8 ,status_health, isRecovery);
        scale_min = 0.8;
        scale_max = 0.8;
        break;
    }

  cx.save();
  cx.translate(0, length);
  cx.rotate(-angle * Math.PI/180);
  branch(length * getRandomScale(scale_min,scale_max), angle * getRandomScale(0.9,1.1), n-1, status_size, status_health, isRecovery);

  cx.rotate(2 * angle * Math.PI/180);
  branch(length * getRandomScale(scale_min,scale_max), angle * getRandomScale(0.9,1.1), n-1, status_size, status_health, isRecovery);

  cx.restore();      
  }
}

function getRandomScale(min, max) {
  return Math.random() * (max - min) + min;
}

function tree(trunkColor, leafColor, length, n, leafscale, status_health, isRecovery){
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
        if (isRecovery){
          p = getRandomScale(0,100);
          if (p > 95){
            cx.fillStyle = leafColor;
            cx.fillRect(0, 0, 2, length);            
          }
        }
        else{
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
      }
      else {
        cx.fillStyle = trunkColor
        cx.fillRect(0, 0, 2, length);
      }
      break;

    case '-1':
      if (n < leafscale){
        if (isRecovery){
          p = getRandomScale(0,100);
          if (p > 50){
            cx.fillStyle = leafColor
            cx.fillRect(0, 0, 2, length);
          }          
        }
        else{
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