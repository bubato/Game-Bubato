//let bubato = new OB_bubato(400,100,60,60,'violet');
//multi.inherit
class OB_general {
  constructor(_x,_y,_width,_height,_image) {
    this.x = _x;
    this.y = _y;
    this.height = _height;
    this.width = _width;
    this.image = _image;
  }  

  setX(_x){
    x = _x;       
  }
  setY(_y){
    y = _y;       
  }
  setHeight(_height){
    height = _height;       
  }
  setWidth(_width){
    width = _width;       
  }
  setImage(_image){
    image = _image;       
  }
  getX(){
    return x;
  }
  getY(){
    return y;
  }
  getWidth(){
    return width;
  }  
  getHeight(){
    return height;
  }

  getImage(){
    return image;
  } 

}