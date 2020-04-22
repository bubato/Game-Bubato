function startGame(){

    var checkKey=true;
    var countSlide=1;
    var background_x = 0;
    var ground_y = 700;
    var mouse_x,mouse_y;
    var slideAnimation = 1;
    var limitTop=0;
    let bubato = new OB_bubato(400,100,60,60,'violet');
    let boss = new OB_boss(400,100,200,200,'image_boss');
    let sword = new OB_Sword(500,500,200,50,'sword',0);
    sword.ApplyRotate();
    var canvas = Id("canvas");
    var context = canvas.getContext('2d');
    var sword_all = [];
    var effect_all = [];
    sword_all.push(sword);
    sword_all.push(sword);
    CallRunTimeMain();

    function Frame(){
       var ground = new Image();
       var curson = new Image();
       var background = new Image();
       var bubato_img = new Image();
       var boss_img = new Image();
       var sword_img = new Image();
       var ro_sword_img = new Image();
       if(bubato.status == 1){
          bubato_img.src = "image/"+bubato.name+countSlide+".png";
       }else{
          bubato_img.src = "image/throw.png";
       }
       
       boss_img.src ="image/"+boss.image+"/a"+countSlide+".png";
       sword_img.src="image/sword.png";
       ro_sword_img.src="image/rotate-sword.png";
       background.src="image/background.png";
       ground.src = "image/ground.png";
       curson.src='image/target.png';
        

       Id("hpboss").style.width=50*boss.hp/500+'em';
       Id("hpbubato").style.width=50*bubato.hp/300+'em';
       Id("valuehpboss").innerHTML=Math.round(boss.hp*10)/10;
       Id("valuehpbubato").innerHTML=Math.round(bubato.hp*10)/10;
       Id("nobubato").style.width=bubato.rage/100*50+'em';
       Id("no").innerHTML=Math.round(bubato.rage*10)/10;
       Id('name').innerHTML=bubato.name;
       Id('damage').innerHTML='Damage: '+bubato.damage;
       Id('armor').innerHTML='Armor: '+bubato.armor;
       Id('damageboss').innerHTML='Damage: '+boss.damage*10;
       Id('armorboss').innerHTML='Armor: '+boss.armor;
       Id('speedboss').innerHTML='Speed: '+boss.speed;
       Id('speedbullet').innerHTML='Speed: '+bubato.speedMove;
       Id('timefight').innerHTML='Speed Fight: '+(1000/bubato.timeFight);
       
       context.drawImage(background,background_x,0,15312,768);
       context.drawImage(boss_img,boss.x,boss.y,boss.width,boss.height);
       if(bubato.currentSword == 2){
         drawImageAtAngle(ro_sword_img,bubato.x+30+20*bubato.scaleFull,bubato.y+30,bubato.width,bubato.height,sword_all[0].rotate+180);
       }else{
         flipImage(sword_img,bubato.x-5+20*bubato.scaleFull,bubato.y+10,bubato.width,bubato.height,bubato.scaleFull);
       }
       
       context.drawImage(bubato_img,bubato.x,bubato.y,bubato.width,bubato.height);
       flipImage(bubato_img,bubato.x,bubato.y,bubato.width,bubato.height,bubato.scaleFull);
       if(bubato.status == 1){
           if(bubato.currentSword<=bubato.limitSword && bubato.currentSword !=0){
             drawImageAtAngle(ro_sword_img,bubato.x+30-20*bubato.scaleFull,bubato.y+30,bubato.width,bubato.height,sword_all[1].rotate);
           }else{
             flipImage(sword_img,bubato.x-5-20*bubato.scaleFull,bubato.y+10,bubato.width,bubato.height,bubato.scaleFull);
           }         
       }
       
       var i=0;
       while(i<=effect_all.length-1){
            var effect_img = new Image();
            if(effect_all[i].folow == 1){
               effect_img.src = 'image/speedup'+effect_all[i].turn+'.png';
               context.drawImage(effect_img,bubato.x-60,bubato.y-80,effect_all[i].width,effect_all[i].height);                
            }else{
               effect_img.src = 'image/speedup'+effect_all[i].turn+'.png';
               context.drawImage(effect_img,boss.x-60,boss.y-80,effect_all[i].width*2,effect_all[i].height*2);                
            }
            if(effect_all[i].time == 0){
                effect_all.splice(i,1);
            }else{
                i++;
            }        
       }
       var i=2;
       var length = sword_all.length - 1;

       while(i<= length){
           var colis = sword_all[i];
           sword_all[i].CheckStatus();
           if(sword_all[i].CheckLimitMove()){
              sword_all.splice(i,1);
           }else{
                if(sword_all[i].status==3){
                   if(Collision(colis.x,colis.y,colis.height,colis.width,bubato.x,bubato.y,bubato.height,bubato.width+50)){
                       sword_all.splice(i,1);
                       bubato.currentSword+=1;
                       bubato.X4SpeedFight();
                       let effect = new OB_effect(bubato.x,bubato.y,150,150,4,1);
                       effect.RunDead();
                       effect_all.push(effect);
                       
                   }else{
                       var sword_img = new Image();
                       sword_img.src = sword_all[i].image;
                       drawImageAtAngle(sword_img,sword_all[i].x,sword_all[i].y,sword_all[i].width,sword_all[i].height,sword_all[i].rotate);                    
                   }
                }else{
                    if(Collision(colis.x,colis.y,colis.height,colis.width,boss.x,boss.y,boss.height,boss.width)){
                       bubato.increaseRage(4);
                       if(sword_all[i].status==2){
                           var direction_;
                           sword_all[i].status = 3;
                           if(bubato.x<boss.x){
                               direction_=-1;
                           }else{
                               direction_=1;
                           }
                           boss.damageBoss(bubato.damage*2);
                           sword_all[i].Bouncing(direction_);
                           
                       }else{
                           if(sword_all[i].status==1){
                               sword_all.splice(i,1);
                               boss.damageBoss(bubato.damage);
                           }                
                       }
        
                    }else{
                       var sword_img = new Image();
                       sword_img.src = sword_all[i].image;
                       drawImageAtAngle(sword_img,sword_all[i].x,sword_all[i].y,sword_all[i].width,sword_all[i].height,sword_all[i].rotate);
                    }                    
                }
            
            }

           length = sword_all.length - 1;
           i++;
       }
       context.drawImage(ground,0,ground_y,screen.width,130);
       context.drawImage(curson,mouse_x+10,mouse_y+10,20,20);


       bubato.Drop();
       bubato.CheckLimitMove(limitTop);
       bubato.CollistionBottom(ground_y);
       boss.Move();  
       boss.CheckLimitMove(); 
       


       function flipImage(v,x,y, width, height,scal){
            context.save();
            context.scale(scal,1);
            context.drawImage(v,x*scal,y,width*scal,height);
            context.restore();
       }
       function drawImageAtAngle(image,X,Y,width,height,degrees){
            var radians=degrees*Math.PI/180;
            var halfWidth=width/2;
            var halfHeight=height/2;
            context.beginPath();
            context.save();
            context.translate(X,Y);
            context.rotate(radians);
            context.drawImage(image,-halfWidth,-halfHeight,width,height);
            context.restore();
      }
 

       
       canvas.addEventListener("mousedown", click);
       canvas.addEventListener("mousemove", target);
       function target(mouseEvent){
          mouse_x=mouseEvent.offsetX;
          mouse_y=mouseEvent.offsetY;
       }
       function click(mouseEvent){
          mouse_x=mouseEvent.offsetX;
          mouse_y=mouseEvent.offsetY;
          if(bubato.actionFight){ 
             bulletCreate(mouse_x,mouse_y);
             if(mouse_x<bubato.x){
                   bubato.scaleFull=-1;
             }else{
                   bubato.scaleFull=1;
            }
            bubato.actionFight=false;
          }

       } 
    function bulletCreate(D_X,D_Y){
        let sword_cre = new OB_Sword(bubato.x+20,bubato.y+20,bubato.width,bubato.height,'sword',0);
        bubato.Throw();
        if(bubato.currentSword>=1 && bubato.currentSword<=bubato.limitSword){
            sword_cre.status = 2;
            bubato.currentSword-=1;
        }
        sword_all.push(sword_cre);
        var elem_sword=sword_all[sword_all.length-1];
        elem_sword.ApplyRotate();
        MoveTo(elem_sword,elem_sword.x,elem_sword.y,D_X,D_Y,bubato.speedBullet);

    }       
       if((boss.statusSkillQ) && (Math.pow(Math.pow(Math.abs(boss.x-bubato.x),2)+Math.pow(Math.abs(boss.y-bubato.y),2),1/2)<boss.rangeSlice)){
           /*boss.x=bubato.x-40;
           boss.y=bubato.y-40;*/
           MoveTo(boss,boss.x+80,boss.y+80,bubato.x+40,bubato.y+40,boss.speed);
           boss.speed = 15;
          // let effect = new OB_effect(bubato.x,bubato.y,150,150,4,1);
          // effect.RunDead();
          boss.activeRotate = true;
           
       } 
       if(Collision(bubato.x,bubato.y,bubato.height,bubato.width,boss.x,boss.y,boss.height,boss.width)){
           bubato.damageBubato(boss.damage)
       }
                  
    }

    function CallRunTimeMain(){ 
      runtime=setInterval(function(){
          Frame();
      },20);
    }    
    animation=setInterval(function(){     
        if(countSlide==5){
            countSlide=1;
        }else{
            countSlide++;
        }

    },80);


    boss.ApplyChangeDirection();
    boss.CountdownSkillQ();
    bubato.ApplyFight();
    //bubato.CountdownSkill1();
    setSpeedBackground=setInterval(function(){background_x--},30);  

    function k_key(event) {
       if(checkKey){ 
         var kCode = event.keyCode || event.which;
         var jumbSound = new Audio("sound/jumb.mp3");
         switch (kCode) {
           case 13:
               Super();
               break;
           case 37:
               bubato.g=0;
               if(bubato.checkJumb){
                   bubato.scaleFull=-1;
                   bubato.moveTo(1);
                   jumbSound.play();
               }
               break;
           case 38:
               if(bubato.Skill1 && bubato.currentSword<=2){
                  if(bubato.currentSword!=bubato.limitSword){
                     bubato.currentSword+=1;
                  }
                  
                  bubato.CountdownSkill1();
               }
               break;
           case 39:
               bubato.g=0;
               if(bubato.checkJumb){
                   bubato.scaleFull=1;
                   bubato.moveTo(-1);
                   jumbSound.play();
               }
               break;
           case 40:
               switch(bubato.status){
                    case 1:{
                        
                        break;
                    }                  
               }
               break;
           default:
           }
       }
    }
    document.onkeydown = function(event) {
       k_key(event);
    };    
}
function Collision(ob1_x,ob1_y,ob1_w,ob1_h,ob2_x,ob2_y,ob2_w,ob2_h){
    ob1_x+=5;
    ob1_y+=5;
    ob1_h-=10;
    ob1_w-=10;
    var ob1_n=ob1_w+ob1_x;
    var ob1_d=ob1_h+ob1_y;
    var ob2_n=ob2_w+ob2_x;
    var ob2_d=ob2_h+ob2_y;
    if((ob1_x>ob2_x && ob1_x<ob2_n && ob1_y>ob2_y && ob1_y<ob2_d)||(ob2_x>ob1_x && ob2_x<ob1_n && ob2_y>ob1_y && ob2_y<ob1_d)){
        return true;
    }else{
        return false;
    }
}
function MoveTo(Obj,s_x,s_y,d_x,d_y,speed){
        if((s_x<d_x) && (s_y<d_y)){
             var move=(d_x-s_x)/(d_y-s_y);
             if(move<1){
               Obj.move_x=move;
               Obj.move_y = 1;
             }else{
               Obj.move_x = 1;
               Obj.move_y = 1/move;
             }  
        }
        if((s_x>d_x) && (s_y>d_y)){
             var move=(d_x-s_x)/(d_y-s_y);
             if(move<1){
               Obj.move_x = -move;
               Obj.move_y = -1;
             }else{
               Obj.move_x = -1;
               Obj.move_y = -1/move;
             }  
        }
        if((s_x<d_x) && (s_y>d_y)){
             var move=(d_x-s_x)/(d_y-s_y);
             if(move>-1){
               Obj.move_x = -move;
               Obj.move_y = -1;
             }else{
               Obj.move_x = 1;
               Obj.move_y = 1/move;
             }  
        }
        if((s_x>d_x) && (s_y<d_y)){
             var move=(d_x-s_x)/(d_y-s_y);
             if(move>-1){
               Obj.move_x = move;
               Obj.move_y = 1;
             }else{
               Obj.move_x = -1;
               Obj.move_y = -1/move;
             }  
        }    
        Obj.Move(speed);
}
