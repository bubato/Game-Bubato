//let bubato = new OB_bubato(400,100,60,60,'violet');
class OB_effect extends OB_general {
  constructor(x,y,width,height,time_,_folow) {
    super(x,y,width,height);
    this.time = time_;
    this.turn = 1;
    this.folow = _folow;
  } 
}
 OB_effect.prototype.RunDead = function () {
     var _this = this;
     deadline = setInterval(function () {
        if(_this.turn==_this.time){
            _this.time = 0;
            clearInterval(deadline);
        }else{
            _this.turn++;
        }
     },100);
 }; 
