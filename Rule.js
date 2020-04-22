function Id(doc){
        return document.getElementById(doc);
}
var dl=true;
function checkScreen(){
    if(window.innerWidth<screen.width || window.innerHeight<screen.height){
        Id('container').style.display='none';
    }else{
        Id('container').style.display='block';
        if(dl){startGame();dl=false;Id('canvas').height=screen.height-90;Id('canvas').width=screen.width;} 
    }
}
function show(s){
    Id("infos").style.display='block';
    var text1,text,text2;
    if(s<5){
        Id('infos').style.top='50px';
    }else{
        s+=statusBubato-1;
        Id('infos').style.top='500px';
    }
        switch(s){
            case 0:{
                 text1='Chạy trốn Tử Thần( Nội tại )';
                 text='Khi máu Boss càng thấp tốc độ đi chuyển càng cao, tăng 0.13 Speed cho mỗi 15 máu đã mất. Tối đa: 7.66';
                 text2='Đòn đánh của Boss là Cận chiến, gây sát thương liên tục từ 9.8 - 18.6 mỗi giây sát thương khi Xoay Kiếm.';
                 break;
            }            
            case 1:{
                 text1='Đánh Úp';
                 text='Khi khoảng cách nằm trong khoảng 500, Boss dịch chuyển tới vị trí Bubato, gây 5 - 10 damage.';
                 text2='Hồi chiêu : 5s';
                 break;
            }
            case 2:{
                 text1='Tre Trận';
                 text='Boss gọi Cọc tre đâm lên rồi từ từ hạ xuống. Nếu Bubato đi vào cọc tre lập tức bị nhốt trong Lồng Cọc.';
                 text2='Hồi chiêu : 30s';
                 break;
            }
            case 3:{
                 text1='Bẫy Tiêu';
                 text='Boss đặt một Bẫy Tiêu. Nếu Bubato bị dính bẫy lập tức bị choáng 1s đồng thời gây sát thương từ 1.9 - 2.9. Boss hồi lại 3.1-5.4 máu';
                 text2='Hồi chiêu : 6s';
                 break;
            }
            case 4:{
                 text1='Cuồng sát';
                 text='Boss tăng sức mạnh của hắn lên cực bội trong 15s. Tăng thêm 5 damage, đồng thời tốc độ đạt 15. Nếu trong thời gian đó sử dụng Đánh Úp tốc độ giảm xuống còn 3.5. Ngoài ra tầm thi triển Đánh Úp được tăng thành 850 . ';
                 text2='Hồi chiêu : 30s';
                 break;
            } 
            case 5:{
                 text1='Mưa đạn (Tiêu hao: 11 Nộ)';
                 text='KÍCH HOẠT: Tăng tốc SpeedFight lên 20 lần và SpeedBullet lên 1.5 lần nhưng Damage bị giảm còn 1.1 trong 3s. NỘI TẠI: Khi không bay được hồi máu ';
                 text2='Hồi chiêu : 15s';
                 break;
            } 
            case 6:{
                 text1='Bật tốc (Tiêu hao: 20 Nộ)';
                 text='KÍCH HOẠT: Tăng tốc độ di chuyển gấp 3 lần trong 10s. Trong thời gian này, được đi xuyên vật thể và miễn nhiễm sát thương . NỘI TẠI: Mỗi đòn bắn trúng tăng SpeedFight và SpeedBullet tối đa 2.92 và 30';
                 text2='Hồi chiêu : 20s';
                 break;
            }  
            case 7:{
                 text1='Siêu Bom (Tiêu hao: 30 Nộ)';
                 text='KÍCH HOẠT: Gọi 1 Siêu Bom xuống vị trí chỉ định sau 2s gây 2.2 lần Sát thương . NỘI TẠI: Mỗi đòn bắn trúng tăng Damage 1.5 tối đa 30, nếu k bắn trong 4s hoặc bắn trượt về giá trị mặc định';
                 text2='Hồi chiêu : 30s';
                 break;
            }  
            case 8:{
                 text1='Triệu hồi Binh Lính (Tiêu hao: 6 Nộ)';
                 text='KÍCH HOẠT: Triệu hồi 1 binh lính sống trong 60s, có thể tấn công Boss gây 1 damage  . NỘI TẠI: Khi bị tấn công hồi Nộ. Mỗi binh lính chết hồi 3 máu cho Bubato';
                 text2='Hồi chiêu : 4s';
                 break;
            }   
            case 9:{
                 text1='Cỏ 3 màu (Tiêu hao 9 Nộ)';
                 text=' KÍCH HOẠT: Hồi 8 máu đồng thời làm lộ diện Bẫy Tiêu trong 2s. NỘI TẠI :Mỗi 10s bạn sẽ nhận ngẫu nhiên 1 trong 3 lá. LÁ XANH: Tiêu hao 5 nộ nhưng hồi 8 máu. LÁ ĐỎ Tiêu hao 5 máu nhưng tạo Giáp hút thêm 50% . LÁ VÀNG: Tăng 7 nộ nhưng Boss Tăng 6 máu';
                 text2='Hồi chiêu : 12s';
                 break;
            }                                                               
        }
        Id("nameskill").innerHTML=text1;
        Id("infoskill").innerHTML=text;
        Id("cooldown").innerHTML=text2;

    }
function hide(){
        Id("infos").style.display='none';
}