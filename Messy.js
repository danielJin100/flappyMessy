class Messy extends BaseClass{
    constructor(x,y){
        var options = {
            'restitution':0.8,
            'friction':1.0,
            'density':1.0
        }
        super(x,y,44,32,MessyImg,options);
    }

    display(){
        super.display(0,1);
        if(gameState !== "play"){
            Matter.Body.setStatic(this.body,true);
        }
    }
}