/*
    GAME SCREEN
    For this demo we create a SpriteSheetAnimation object and
    five buttons to illustrate the animation controls: Play,
    Stop, 24fps, 48fps, and goto First Frame.



Current Bugs/Errors:

Future Changes:
	-Keep track of High Scores


 */


GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    	this.spriteSheetAnim;
	this.score = 0;
	this.turning = "";
	this.forward = false;
	this.scoresetup;
	this.dx=5;
	this.dy=5;
	this.startbutton;
	
	this.sWebs = [];
	
	this.healthBar;
	
	this.background;
	
	this.bugs = [];
	this.paused = false;
	this.pausebutton;
	

	//Set background color
    	this.backgroundColor = "#039AFF";

    //Just some display text
    
	
	this.scoresetup = new TGE.Text().setup({
        x:320,
        y:100,
        text: "Score: " + this.score.toString(),
        font:"32px sans-serif",
        color:"#FFF"
    });
	
	

    //*********************************************************
    //******     SET UP SPRITESHEET ANIMATION OBJECT     ******
    //*********************************************************
    /*
        This is where we set up our sprite sheet animation object
        with initial properties and position it on the screen.
    */
    
	this.startbutton = new TGE.Button().setup({
        textColor: "#000",
        text: "New Game",
        x:this.percentageOfWidth(0.5),
        y:450,
        pressFunction:this.startGame.bind(this)
    	});
	
	
	this.pausebutton = new TGE.Button().setup({
        textColor: "#000",
        text: "Pause",
        x:540,
        y:100,
        pressFunction:this.pauseGame.bind(this)
    	});
	
	
	this.addChild(this.startbutton);
	

/*
    	this.addChild(this.spriteSheetAnim);
	this.addChild(this.bugAnim);
	this.addChild(this.scoresetup);
	this.spriteSheetAnim.addEventListener("keydown",this.setSpiderStatus.bind(this));
	this.spriteSheetAnim.addEventListener("keyup",this.resetSpiderStat.bind(this));
	this.spriteSheetAnim.addEventListener("update",this.updateSpider.bind(this));
	this.bugAnim.addEventListener("update",this.updateBug.bind(this));
*/
    //Start the SpriteSheetAnimation Object playing
    //this.spriteSheetAnim.play();
	//this.bugAnim.play();

    //*************************************
    //******     CONTROL BUTTONS     ******
    //*************************************
    //Adding control buttons for the SpriteSheetAnimation Object
    //Play Button
/*this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Play",
        x:this.percentageOfWidth(0.5),
        y:400,
        pressFunction:this.playAnim.bind(this)
    }));

    //Stop Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "Stop",
        x:this.percentageOfWidth(0.5),
        y:450,
        pressFunction:this.stopAnim.bind(this)
    }));

    //24 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "24 fps",
        x:this.percentageOfWidth(0.33),
        y:500,
        pressFunction:this.set24FPS.bind(this)
    }));

    //48 FPS Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "48 fps",
        x:this.percentageOfWidth(0.66),
        y:500,
        pressFunction:this.set48FPS.bind(this)
    }));

    //First Frame Button
    this.addChild(new TGE.Button().setup({
        textColor: "#000",
        text: "First Frame",
        x:this.percentageOfWidth(0.5),
        y:550,
        pressFunction:this.gotoFirstFrame.bind(this)
    }));
*/
};





GameScreen.prototype =
{
    //*************************************************
    //******     ANIMATION CONTROL FUNCTIONS     ******
    //*************************************************

    //Play Animation, executes when the Play button is pressed
    

	playAnim: function(){
        	this.spriteSheetAnim.play();
        	this.spriteSheetAnim.x += 100;
    	},


	stopAnim:function(){
		this.spriteSheetAnim.stop();
	},


  
    //Stop Animation, executes when the Stop button is pressed
	

	resetSpiderStat: function(event){
        	if(event.keyCode == 65 || event.keyCode == 68){
			this.turning = "";
		}
		if(event.keyCode== 87){
			this.forward = false;
		}
    	},

   

 //24 and 48 FPS, set the playback speed of the object when the button is pressed
    

	set24FPS: function(){
    	    this.spriteSheetAnim.fps = 24;
    	},
    	set48FPS: function(){
        	this.spriteSheetAnim.fps = 48;
    	},
	
	

	pauseGame: function(){
		
		if(!this.paused){
			this.paused = true;
			
			this.pausebutton.text = "Continue"
			this.addChild(this.startbutton);
			this.spriteSheetAnim.stop();
		
		}

		
		else{
			
			this.paused = false;
			
			this.pausebutton.text = "Pause";
			
			this.removeChild(this.startbutton);
			

		
		}
		
	},
	
	
	startGame:function(){
	
	if(this.paused){
			
			for(var i in this.bugs){
				this.removeChild(this.bugs[i]);
			}
			
			for(var q in this.sWebs){
				
				this.removeChild(this.sWebs[q]);}
				
				this.removeChild(this.healthBar);
				
				this.addChild(this.startbutton);
				
				this.removeChild(this.spriteSheetAnim);	
				this.removeChild(this.pausebutton);
		
			}

		
		this.score = 0;
		
		this.scoresetup.text = "Score: " + this.score.toString();
		
		this.turning = "";
		this.forward = false;
		this.sWebs = [];

		
		
		this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
			image:"spriteSheetImg",
			columns:4,
			rows:5,
			totalFrames:19,
			fps:24,
			x: 320,
			y: 240,
			
			scaleX: .75,
			
			scaleY: .75,
		});

		
		this.background = new TGE.SpriteSheetAnimation().setup({
			image:"background",
			columns:1,
			rows:1,
			totalFrames:1,
			fps:24,
			x: 320,
			y: 416,
			scaleX: 2,
			scaleY: 2,
		});


//Change the max index to change the number of bugs that spawn in the game

		
		

		for(var index=0 ; index < 20 ; index ++){
			var name = ""
			
//Code to pic a random bug with different probabilities for each bug spawning
			
			var size;
			if(index >= 18){	name = "redBug"; size = 0.5;	}
			else if(index >= 14){ name = "yellowBug";	size = 0.08;	}
			else{	name = "bugImage";	size = 0.25;}
				
			
			this.bugs[index] = ( new TGE.SpriteSheetAnimation().setup({
				image: name,
				columns:1,
				rows:1,
				totalFrames:1,
				fps:24,
				x: (Math.random() * this.background.width)-this.background.width/2,
				y: (Math.random() * this.background.height)-this.background.height/2,
				scaleX: size,
				scaleY: size,
				rotation: Math.random() * 360
			}));
		
		}


	

/*
		this.sWebs  new TGE.SpriteSheetAnimation().setup({
			image:"spiderWeb",
			columns:1,
			rows:1,
			totalFrames:1,
			fps:24,
			x: 300,
			y: 340,
		scaleX: 0.075,
		scaleY: .075,
		});
*/
		


		this.healthBar = new TGE.SpriteSheetAnimation().setup({
			image:"healthBar",
			columns:1,
			rows:1,
			totalFrames:1,
			fps:24,
			x: 320,
			y: 750,
			
			width: 800,
			
			height: 20,
	
		});	
		this.addChild(this.background);
		
		this.addChild(this.healthBar);
		
		this.addChild(this.spriteSheetAnim);

		
		
		for(var i in this.bugs)
			{this.addChild(this.bugs[i]);}
		
		
		this.addChild(this.scoresetup);
		
		this.spriteSheetAnim.addEventListener("keydown",this.setSpiderStatus.bind(this));
		this.spriteSheetAnim.addEventListener("keyup",this.resetSpiderStat.bind(this));
		this.spriteSheetAnim.addEventListener("update",this.updateScreen.bind(this));
		
		
		this.pausebutton.text = "Pause";
		this.paused=false;
		
		this.addChild(this.pausebutton);
		this.removeChild(this.startbutton);
	
	},

    //Goto First Frame, executes when the First Frame button is pressed.
    //Jumps to the first animation frame and stops. Alternatively you could
    //use gotoAndPlay to jump to the first frame and keep the animation playing.
    
	gotoFirstFrame: function(){
       		this.spriteSheetAnim.gotoAndStop(1);
    	} ,
	
	setSpiderStatus:function(event){
		if(!this.paused){
			var spider = event.currentTarget;
		
			this.spriteSheetAnim.play();
		
			if(event.keyCode == 65)
				this.turning = "left";

//spider.rotation -= 10;
			
			if(event.keyCode == 68)
				this.turning = "right";

//spider.rotation += 10;
			
			if(event.keyCode == 87 ){
				this.forward=true;


/*spider.x -=  20 * Math.cos((spider.rotation + 90 ) * Math.PI/180);
spider.y -=  20 * Math.sin((spider.rotation + 90 )  * Math.PI/ 180);
*/
	
			}
			

			if(event.keyCode == 32){
			
				this.sWebs.push(new TGE.SpriteSheetAnimation().setup({
					image:"spiderWeb",
					columns:1,
					rows:1,
					totalFrames:1,
					fps:24,
					x: spider.x,
					y: spider.y,
					scaleX: 0.075,
					scaleY: .075,
				}));

			
				this.addChild(this.sWebs[this.sWebs.length-1]);



//Determines how much health you lose by placing down a spider web
			

				this.healthBar.x -= 150;
				
			
			}
		}



/*if(event.keyCode == 83){
spider.x +=  20 * Math.cos((spider.rotation + 90 ) * Math.PI/180);
spider.y +=  20 * Math.sin((spider.rotation + 90 )  * Math.PI/ 180);
}*/
	



	},


	
	updateScreen:function(event){
		if(!this.paused){
			var spider = event.currentTarget;
			
			var distance=4;
			
			var theta = (spider.rotation -90) * Math.PI/180;
			


			if(this.turning == "left"){
				spider.rotation -= 10;
			}
		
			
			if(this.turning == "right"){
				spider.rotation += 10;
			}
		

			
			if(this.forward ){





//Ensures that the modulus works in the following if statements by ensuring rotation is positive
				

				if(spider.rotation < 0 ) spider.rotation = 360-((spider.rotation * -1) % 360);
			



//Controls the horizontal controls for the background

			
				


				if((this.background.x < 320 - this.background.width/2 && spider.rotation % 360 > 0 && spider.rotation % 360 < 180) || (!(spider.x <= 320)  && !(spider.rotation % 360 > 0 && spider.rotation % 360 < 180 )) || (this.background.x > 320 + this.background.width/2 && spider.rotation % 360 > 180 && spider.rotation % 360 < 360) || (!(spider.x >= 320)  && !(spider.rotation % 360 > 180 && 	spider.rotation % 360 < 360 ) ) ){
	
					if(spider.x + distance * Math.cos(theta) > 10 && spider.x + distance * Math.cos(theta) < 640)
						
						spider.x += distance * Math.cos(theta);
			
				
				}
			
				
					

				else{

				
					
					this.background.x -= distance * Math.cos(theta);
					
					for(var i in this.bugs){
						
						this.bugs[i].x -= distance * Math.cos(theta);
					}




					for(var q in this.sWebs){
						
						this.sWebs[q].x -= distance * Math.cos(theta);
					
					}
				
				}

			




//Controls the vertical controls for the background
			
				




				if((this.background.y < 416 - this.background.height/2 && spider.rotation % 360 > 90  && spider.rotation % 360 < 270) || (!(spider.y <= 416)  && !(spider.rotation % 360 > 90 && spider.rotation % 360 < 270 )) || (this.background.y > 416 + this.background.height/2 && ((spider.rotation % 360 > 270 && spider.rotation % 360 <= 360) || (spider.rotation % 360 < 90 && spider.rotation % 360 >= 0))) || (!	(spider.y >= 416)  && !((spider.rotation % 360 > 270 && spider.rotation % 360 <= 360) || (spider.rotation % 360 < 90 && spider.rotation % 360 >= 0 )) ) ){

					

					if(spider.y + distance * Math.sin(theta) > 0 && spider.y + distance * Math.sin(theta) <832)
						
						spider.y += distance * Math.sin(theta);
				
				

				}
				
				else{

				
					this.background.y -= distance * Math.sin(theta);
			
					for(var i in this.bugs){
						
						this.bugs[i].y -= distance * Math.sin(theta);
					}
					
					for(var q in this.sWebs){
						
						this.sWebs[q].y -= distance * Math.sin(theta);
					
					}








/*
			var distance = 4;
			var theta = (spider.rotation - 90) * Math.PI / 180;
			if(spider.x + distance * Math.cos(theta) > 10 && spider.x + distance * Math.cos(theta) < 640 && spider.y + distance * Math.sin(theta) > 0 && spider.y + distance * Math.sin(theta) <832){
				spider.x += distance * Math.cos(theta);
				spider.y += distance * Math.sin(theta);

			
			}
*/

		



				}
		
		

		}
		
		

		if(this.turning !== "" || this.forward)
			spider.play();
		else
			spider.stop();





		for(var i in this.bugs){
			var bug = this.bugs[i];
		
			var move = true;
		
			if(bug.x <= this.background.x - this.background.width/2 -300 || bug.x >= this.background.x + this.background.width/2 + 300){
				if(bug.x <=this.background.x - this.background.width/2 -300 )
					bug.rotation = (Math.random() * 160) + 10;
			
				if(bug.x >= this.background.x + this.background.width/2 +300 )
					bug.rotation = (Math.random() * 160) + 190;
			}
		


			if(bug.y <= this.background.y - this.background.height/2 -400 || bug.y >= this.background.y + this.background.height/2 +400){
			
				if(bug.y <= this.background.y - this.background.height/2 -400)
					bug.rotation = (Math.random() * 160) + 100;
				if(bug.y >= this.background.y + this.background.height/2 +400 )
					bug.rotation = (Math.random() * 160) + 280;
			}

//Code to control the speed of the bugs
	

		



			var distance = 5;
		
			if( i >= 18 ) distance = 3;
		
			else if( i >= 14) distance = 7;
		

		


			if(this.sWebs.length > 0){
				for(var q in this.sWebs){
		
					var d = Math.sqrt(Math.pow(bug.x - this.sWebs[q].x, 2) + Math.pow(bug.y - this.sWebs[q].y, 2));
		
					if(d < (bug.width*.25 + this.sWebs[q].width * 0.075)*.5){

//If the bug is yellow then we remove the web.
			
					
						if( i >= 14 && i < 18 ){
				
							this.removeChild(this.sWebs[q]);
				
							this.sWebs.splice(q, 1);
				
							move = true; 
			
						}
			
						else{
				
							move = false;
				
							break;
			
						}
		


					}
				}
	



			}
		
			else{ move = true; } 

		


			if(move){
				var theta = (bug.rotation - 90) * Math.PI / 180;
				bug.x += distance * Math.cos(theta);
				bug.y += distance * Math.sin(theta);
			}
		

//Edit the following so that if the spider hits a red bug that is moving, the game comes to an end.
//Check for collision and increment the players score
		var dh = 0;
		if( i >= 18) {
			d = Math.sqrt(Math.pow(bug.x - spider.x, 2) + Math.pow(bug.y - spider.y,2));
		}

		else{

			d = Math.sqrt(Math.pow(bug.x - (spider.x + (spider.width*.5) * Math.cos((spider.rotation -90) * Math.PI/180)), 2) + Math.pow(bug.y - (spider.y + (spider.width*.5) * Math.sin((spider.rotation -90) * Math.PI/180)), 2));

		}
		
		if( d < (bug.height*bug.scaleY  + 25)/2){
			if( i >= 18 ){
				if(move == false){ this.score += 5; dh = 100; }
				else if(move == true){ this.healthBar.x = -350; }
			}

			else if ( i >= 14 ){ 
				this.score += 3;
				dh = 85;
			}

			else { this.score ++; dh = 70;	}
			


			this.scoresetup.text = "Score: " + this.score.toString();
			
			if(this.healthBar.x <= 270)
				this.healthBar.x += dh;
			else
				this.healthBar.x = 320;
			
			while((bug.x < 640 && bug.x >0 ) || (bug.y < 840 && bug.y > 0)){
				bug.x = (Math.random() * this.background.width)-this.background.width/2;
				bug.y = (Math.random() * this.background.height)-this.background.height/2;
			}
			
			bug.rotation = Math.random() * 360;
		}
		

	}
		
	
		this.healthBar.x -= 0.5;
		
		if(this.healthBar.x <= -350){
			for(var i in this.bugs){
				this.removeChild(this.bugs[i]);
			}
			
			for(var q in this.sWebs){
				this.removeChild(this.sWebs[q]);
			}
				
			this.removeChild(this.healthBar);
			this.addChild(this.startbutton);
			this.removeChild(this.spriteSheetAnim);	
			this.removeChild(this.pausebutton);
		}
	}
},
	
	/*
		Updates the bug to constantly have it move around the screen. 
		If it hits the border it turns to the right and turns
		else it moves forward. 
	*/
	
		
		
	
	
}
extend(GameScreen,TGE.Window);