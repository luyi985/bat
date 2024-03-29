game.ghost=function () {
	this.type="ghost";
	this.w=128*game.scale;
	this.h=190*game.scale;
	this.x=game.rand(0,game.width-200);
	this.y=game.rand(0,game.height-200);
	this.speed=2*game.scale;
	this.hitted=false;
	this.hittedTiming=20;
	this.moving=game.rand(50,150);
	this.remove=false;
	this.path=game.move(this);
	this.pathId=game.rand(0,7);
	this.movingNext=false;
	this.update=function(){
		if(this.movingNext){
			this.pathId = game.rand(0,7);
			this.moving=game.rand(50,150); 
			this.movingNext=false;
		}
		if (this.moving<=0) {
         	this.movingNext=true;   
        }
        if(this.x< this.cage().leftBorder){
            this.pathId=1;
        }
        if(this.x> this.cage().rightBorder){
            this.pathId=0;
        }
        if(this.y>this.cage().bottomBorder){
            this.pathId=2;
        }
        if(this.y<this.cage().topBorder){
            this.pathId=3;
        }
        if(this.hitted){
        	if(this.hittedTiming<=0){
        		this.hitted=false;
        		this.hittedTiming=10;
        	}
        	this.hittedTiming-=1;
        }
		this.moving-=1;
		this.path[this.pathId]();
	}
	this.render=function(){
		if(this.hitted){
			//game.mkSound.ghostCryStop();
			//game.mkSound.ghostCry();
			if(this.pathId==1||this.pathId==5||this.pathId==7||this.pathId==3)
				game.draw.ghostAngerR(this.x,this.y);
			else{
				game.draw.ghostAngerL(this.x,this.y);
			}
		}
		else{
			if(this.pathId==1||this.pathId==5||this.pathId==7||this.pathId==3)
				game.draw.ghostR(this.x,this.y);
			else{
				game.draw.ghostL(this.x,this.y);
			}
		}
	}
}
game.ghost.prototype.cage=game.border;