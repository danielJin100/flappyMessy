class Pipe extends BaseClass{
    constructor(Y, flip){
        var options = {
            'isStatic': true
        }
        super(850,Y+200,50,400,pipe,options);

        this.flip = flip
    }
    display(){
        if(this.body){
            if(this.body.position.x >=  0){
                if(gameState === "play"){
            Body.translate(this.body,{x:-5,y:0});
                }
                super.display(0,this.flip);
            } else {
                this.body = undefined;
            } 
        }
    }
}