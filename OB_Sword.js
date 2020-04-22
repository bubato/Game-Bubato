class OB_Sword extends OB_general {
  constructor(x,y,width,height,image,_rotate) {
    super(x,y,width,height,image);
    this.flip = 1;
    this.status = 1;
    this.image = "image/sword.png";
    this.rotate = _rotate;
    this.move_x = 0;
    this.move_y = 0;  
    this.v0=5;  
  }    
  CheckLimitMove(){
        if(this.x<-30 || this.x>screen.width+30 || this.y<-1000 || this.y>screen.height+30 ){
            return true;
        }  
        return false;   
  }  
}
OB_Sword.prototype.ApplyRotate = function () {
     var _this = this;
     rotate = setInterval(function () {
         _this.rotate += 25;
     },25);
 };
OB_Sword.prototype.CheckStatus = function () {
     if(this.status==1){
       this.image = "image/sword.png";
     }else{
       this.image = "image/rotate-sword.png";
     }
 };
OB_Sword.prototype.Move = function (speed) {
     var _this = this;
     move = setInterval(function () {
       _this.x+=_this.move_x*speed*2;
       _this.y+=_this.move_y*speed*2;
     },20);
 };
 OB_Sword.prototype.Bouncing = function (angle) {
     var _this = this;
     _this.move_x = 0;
     _this.move_y = 0;
     var t=8;
     var incr = 3;
     var l=8;   
     var _angle = angle;
     bouncing = setInterval(function () {
            _this.y-=t*incr;
            _this.x+=l*_angle;
            incr-=0.1;
     }, 20);
 };
