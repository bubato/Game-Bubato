class OB_boss extends OB_general {
  constructor(x,y,width,height,image) {
    super(x,y,width,height,image);
    this.move_x = 0.1;
    this.move_y = 0.1;
    this.speed = 5;
    this.damage = 0.21;
    this.nameBoss = 'Yamatory';
    this.hp = 500;
    this.armor = 55;
    this.changeSpeed = true;
    this.statusExDirection = true;
    this.statusSkillQ = false;
    this.rangeSlice = 800;
    this.actionSmoke = false;
    this.activeRotate = true;
  }
  ApplyChangeDirection(){}
  CountdownSkillQ(){}
  damageBoss(damage){
        this.hp-=damage*(100-this.armor)/100;
        if(this.hp>500){this.hp=500;}
        if(this.hp<=0){

        }
  }  
  UpSpeed(){
        if(this.changeSpeed){
          this.speed=Math.round((3.5+(5-this.hp/100)/1.2)*100)/100;
        }
  }
  Move(){
       this.x+=this.move_x*this.speed;
       this.y+=this.move_y*this.speed;    
  }
  changedirection(){
        this.move_x=Math.random()-0.5;
        this.move_y=Math.random()-0.5;
        if(this.statusExDirection){
            this.ApplyChangeDirection();
        }  
  }  
  CheckLimitMove(){
        if(this.x<-100){
            this.x=screen.width;
            this.changedirection();
            
        }
        if(this.y<-100){
            this.y=screen.height;
            this.changedirection();
            
        }
        if(this.x>screen.width+1){
            this.x=-90;
            this.changedirection();
        }
        if(this.y>screen.height+1){
            this.y=-90;
            this.changedirection();
        }    
  }
  CallSmoke(){
        return this.actionSmoke;
  }
}
OB_boss.prototype.ApplyChangeDirection = function () {
      var _this = this; 
      _this.statusExDirection = false;
      countdown = setTimeout(function(){
        _this.statusExDirection = true;
        _this.changedirection();
      },Math.random()*5000+2000);
}
OB_boss.prototype.CountdownSkillQ = function () {
      var _this = this; 
      countdown = setInterval(function(){
        _this.statusSkillQ = true;
        if(_this.activeRotate){
          _this.image = 'rotate-action';
          _this.activeRotate = false;
        }
        
        setTimeout(function(){
          _this.statusSkillQ = false;
          _this.speed = 5;
          _this.image = 'image_boss';
        },600);
      },5000);
}
