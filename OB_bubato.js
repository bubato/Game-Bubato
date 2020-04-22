//let bubato = new OB_bubato(400,100,60,60,'violet');
class OB_bubato extends OB_general {
  constructor(x,y,width,height,image) {
    super(x,y,width,height,image);
    this.check_skill = true;
    this.status = 1;
    this.rage = 0;
    this.hp = 300;
    this.useRage = 11;
    this.armor = 40;
    this.speedMove = 3;
    this.damage = 2.3;
    this.scaleFull = 1;
    this.speedBullet = 7.3;
    this.name = 'draven';
    this.timeFight = 1000;
    this.actionFight = true;
    this.g=1;
    this.checkJumb = true;
    this.currentSword = 0;
    this.limitSword = 2;
    this.Skill1 = true;
    this.Skill2 = true;
  }
  Move(speed){}
  moveTo(direction){}
  ApplyFight(){}
  increaseRage(rag){
        this.rage+=rag;
        if(this.rage<0){
              this.rage=0;
        }
        if(this.rage>100){
            this.rage=100;
        }    
  }
  Drop(){
        if(this.checkJumb){
             this.y = this.y +this.g;
             if(this.g<15){
                this.g*=1.05;
             }  
        }
  }
  changeSpeedFight(num){
        this.timeFight=num; 
        clearInterval(fight);
        this.ApplyFight();
  }
  damageBubato(damage){
        this.hp-=damage*(100-this.armor)/100; 
        if(this.hp>300){this.hp=300;}
        if(this.hp<=0){
           alert("gameover");
        }        
  }  
  CollistionBottom(pointCollistion){
        if(this.y>=pointCollistion-50){
          this.g=0;
            if(this.status==1){
              this.damageBubato(-0.005);
            }
        }
  }
  CheckLimitMove(limitTop){
        if(this.x<0){
            this.x+=20;
        }
        if(this.x>screen.width+30){
            this.x-=20;
        }
        if(this.y<limitTop){
            this.y=limitTop;
        }
  } 
}
OB_bubato.prototype.moveTo = function (direction) {
     var _this = this;
     var t=19;
     var l=7*_this.speedMove;
     _this.checkJumb=false;     
     move_ = setInterval(function () {
            _this.y-=t;
            _this.x-=l*direction;
            t*=0.75;
            l*=0.905;
            if(t<0.6/_this.speedMove/_this.speedMove){
                _this.g=1;
                _this.checkJumb=true;
                clearInterval(move_);
            }
     }, 20);
 };
 OB_bubato.prototype.ApplyFight = function () {
     var _this = this;
     fight = setInterval(function () {
         _this.actionFight = true;
     },_this.timeFight);
 };
 OB_bubato.prototype.Throw = function () {
     var _this = this;
     _this.status = 2;
     Throw = setTimeout(function () {
         _this.status = 1;
     },300);
 };
 OB_bubato.prototype.CountdownSkill1 = function () {
     var _this = this;
     _this.Skill1 = false;
     Throw = setTimeout(function () {
        _this.Skill1 = true; 
     },3000);
 };
 OB_bubato.prototype.X4SpeedFight = function () {
     var _this = this;
     _this.changeSpeedFight(250);
     Throw = setTimeout(function () {
        _this.changeSpeedFight(1000);
     },2000);
 }; 
