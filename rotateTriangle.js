    var temp = function(){
        var canvas = document.getElementById("myCanvas") ;
        var ctx = canvas.getContext('2d') ;
        canvas.height = 600 ;
        canvas.width = 900 ;
        var height = canvas.height ;
        var width = canvas.width ;
        var angel = 0 ;
        var steps = [] ;
        var index = 0 ;
        var transformVector = null ;

        var div = document.getElementsByTagName("div")[0] ;
        div.style.width = "900px" ;

        ctx.fillStyle = "#000000" ;
        ctx.fillRect(0, 0, width, height) ;
        ctx.strokeStyle = "#ffffff" ;

        var triangle = {
            a : new Vector2(300, 300) ,
            b : new Vector2(350, parseInt(300+50*Math.pow(3,0.5))) ,
            c : new Vector2(250, parseInt(300+50*Math.pow(3,0.5))) ,
            center : new Vector2(300, parseInt(300+100/3*Math.pow(3,0.5))) ,
            targetA : new Vector2() ,
            targetB : new Vector2() ,
            targetC : new Vector2() ,
            targetCenter : new Vector2() ,
            draw : function(ctx) {
                ctx.beginPath() ;
                ctx.arc(this.targetCenter.x-this.targetCenter.x, this.targetCenter.y-this.targetCenter.y, 1, 0, Math.PI*2, true) ;
                ctx.closePath() ;
                ctx.stroke() ;
                //arc函数的角度弧度值沿顺时针方向增加
                ctx.beginPath() ;
                ctx.arc(this.targetA.x-this.targetCenter.x, this.targetA.y-this.targetCenter.y, 100, 1/3*Math.PI, 2/3*Math.PI, false) ;
                ctx.arc(this.targetB.x-this.targetCenter.x, this.targetB.y-this.targetCenter.y, 100, Math.PI, 4/3*Math.PI, false) ;
                ctx.arc(this.targetC.x-this.targetCenter.x, this.targetC.y-this.targetCenter.y, 100, 5/3*Math.PI, Math.PI*2, 0, false) ;
                ctx.closePath() ;
                ctx.stroke() ;
                if( index == 36 ){
                    index = 0;
                }
                else {
                    index = index + 1 ;
                }
            },
            rotate : function(ctx) {
                angel = angel - Math.PI/55 ;
                transformVector = steps[index].sub(this.center) ;
                this.targetCenter.x = steps[index].x ;
                this.targetCenter.y = steps[index].y ;
                this.targetA.x = this.a.x + transformVector.x ;
                this.targetA.y = this.a.y + transformVector.y ;
                this.targetB.x = this.b.x + transformVector.x ;
                this.targetB.y = this.b.y + transformVector.y ;
                this.targetC.x = this.c.x + transformVector.x ;
                this.targetC.y = this.c.y + transformVector.y ;
                //ctx.fillRect(200, 280, 200, 200) ;
                ctx.save() ;
                ctx.translate(this.targetCenter.x, this.targetCenter.y) ;
                ctx.rotate(angel) ;
                this.draw(ctx) ;
                ctx.restore() ;
                if( parseInt(angel*100) === -628 ) {
                    angel = 0 ;
                }
            }
        };

        for( var i = 36 ; i >= 0 ; i -- ) {
            steps.push(new Vector2(triangle.center.x+10*Math.cos(Math.PI/18*i), triangle.center.y-10*Math.sin(Math.PI/18*i) ) ) ;
        }

        var totalTime = 0 ;
        setInterval(_temp,80) ;
        function _temp() {
            triangle.rotate(ctx) ;
            totalTime += 1 ;
            if( totalTime === 143 ) {
                totalTime = 0 ;
                ctx.fillRect(0, 0, width, height) ;
            }
        }
    }

    var code = "(" + temp.toString() + "());" ;