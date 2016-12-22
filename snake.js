/*Directions:
 			  2
 			  |
 			  |
 			  |
		1<----+----->3
			  |
			  |
			  |
			  4
*/


/*
		0--------------16
		17-------------33
		34-------------
		51-------------*/
var pre_dir=0,t;
var count2=0;
var eating=0;
var clock=0;
var time1=0;var time2=0
var keyCount=0;
var t1;
check_time();
function check_time()
{
		clock=clock+1;
		setTimeout("check_time()",100);
}
as(document).ready(
	function (){
				as("body").keydown( 
				function (event){	
				if(running)		//If the game is beign played(!paused)
				{
					if(event.keyCode>=37&&event.keyCode<=40&&pre_dir!=event.keyCode&&pre_dir-event.keyCode!=2&&pre_dir-event.keyCode!=-2)
					{									//If keycode is arrow key && not previous direction && if moving in that is possible(i.e. if moving right immediate left is not possible) 
								time1=clock;
								b=event.keyCode-36;
								clearTimeout(t);
								clearTimeout(t1);
									pre_dir=event.keyCode;
									//If the snake is going in any previous direction clear those timings
									t1=setTimeout("change_directions(b)",200);		//Assign new directions
									time2=clock;
								
					}
					else if(event.keyCode>=37&&event.keyCode<=40&&pre_dir-event.keyCode!=2&&pre_dir-event.keyCode!=-2&&just_resumed)
					{
							just_resumed=0;
							pre_dir=event.keyCode;
							b=event.keyCode-36;
							clearTimeout(t);			//If the snake is going in any previous direction clear those timing
							change_directions(b);		//Assign new directions
						
					}
				}
				});
			});	
function change_directions(direction)
{
	if(running)
	{
			not_part=1;
	
			if(direction==4)				//If direction is move down
			{
				if(is_partofsnake(snake_blocks[0]+17)||!(snake_blocks[0]<=254))		//Checking if we are moving into part of a snake or out of board
				{
						runnig=0;
						not_part=0;
						show_gameover();			//If we are not safe then show game over
				}
			}
			else if(direction==1)			//If direction is left
			{
				if(is_partofsnake(snake_blocks[0]-1)||snake_blocks[0]<0||snake_blocks[0]%17==0)	//Checking if we are moving into part of a snake or out of board
				{
						running=0;
						not_part=0;
						show_gameover();		//If we are not safe then show game over
				}
			}
			else if(direction==2)		//If direction is up
			{
				if(is_partofsnake(snake_blocks[0]-17)||!(snake_blocks[0]>=17))
				{
						running=0;
						not_part=0;
						show_gameover();
				}
			}
			else if(direction==3)   //If direction is right
			{
				if(is_partofsnake(snake_blocks[0]+1)||!((((snake_blocks[0]+1)%17)!=0)&&snake_blocks[0]<as(".hai01").size()))
				{
						running=0;
						not_part=0;
						show_gameover();
				}
			}
		if(not_part)			//If it is snake is going to be in safe state then change the directions
		{
				if(!eating)		//if snake is not eating i.e If next block is not a food
				{
					for(i=0;i<directions.length;i++)		//Changing the directions of the block that is direction[i-1]=direction[i] i.e 2nd block will get 1st block direction and 1st block will continue its previous direction or will get new direection given by the user and last block direction will be gone
					{
							a=directions[i];
							directions[i]=direction;
							direction=a;
					}
				}
				else{
						directions[0]=direction;       //If snake is not eating food
				}
			give_directions();				//After chaging the directions we need to give the directions i.e actually move blocks in the new directions
		}
	}
}
function give_directions()
{
	if(running)
	{
			food=0;eating=0;
		//checking if next block is food
		if(directions[0]==4&&(snake_blocks[0]+17)==food_number)
		{	
			food=1;
			eating=1;
			Add_block(food_number);
		}
		else if(directions[0]==3&&(snake_blocks[0]+1)==food_number)
		{
			food=1;
			eating=1;
			Add_block(food_number);
		}
		else if(directions[0]==2&&(snake_blocks[0]-17)==food_number)
		{
			food=1;
			eating=1;
			Add_block(food_number);
		}
		else if(directions[0]==1&&(snake_blocks[0]-1)==food_number)
		{
			food=1;
			eating=1;
			Add_block(food_number);
		}
		//End of food checking...
		
		
		if(!food)			//If next block is not food block 
		{
			for(i=0;i<snake_blocks.length;i++)		//Instruct all block to move according to their changed directions
			{
					if(directions[i]==4)
					{
						movedown(snake_blocks[i],i);
					}
					else if(directions[i]==3)
					{
							moveright(snake_blocks[i],i);
					}
					else if(directions[i]==2)
					{
							moveup(snake_blocks[i],i);
					}
					else if(directions[i]==1)
					{
							moveleft(snake_blocks[i],i);
					}
			}
			
			a=directions[0];							//save present first direction in variable
			t=setTimeout("change_directions(a)",400);	//Repeat change directions after 400 milli seconds with future first direction as present first direction
		}
		else     								//If snake is eating food...
		{
			a=directions[0];							//save present first direction in variable
			t=setTimeout("change_directions(a)",400);
		}
	}
}
function add_score()
{
		score=document.getElementById('svalue').innerHTML;
		score=parseInt(score);
		score++;
		document.getElementById('svalue').innerHTML=score;
}
function Add_block(food_number)
{
	add_score();			//Increase the score
	b=as(".hai01")		
	snake_blocks.unshift(food_number);		//Add the new block as first block in snake
	directions.unshift(directions[0]);		//Add current snake's first block direction as future snake's first block direction
	for(i=0;i<272;i++)
	{
			b.get(i).style.backgroundColor='#8080FF';		
	}
	generate_food();
}
function moveright(block,index)
{
		block++;
		snake_blocks[index]=block;
		b=as(".hai01").get(block);
		b.style.visibility='visible';
		b=as(".hai01").get(block-1);
		b.style.visibility='hidden';
}
function moveleft(block,index)
{
		block--;
		snake_blocks[index]=block;
		b=as(".hai01").get(block);
		b.style.visibility='visible';
		b=as(".hai01").get(block+1);
		b.style.visibility='hidden';

}
function moveup(block,index)
{
		block-=17;
		snake_blocks[index]=block;
		b=as(".hai01").get(block);
		b.style.visibility='visible';
		b=as(".hai01").get(block+17);
		b.style.visibility='hidden';
}
function movedown(block,index)
{

		block+=17;
		snake_blocks[index]=block;
		b=as(".hai01").get(block);
		b.style.visibility='visible';
		b=as(".hai01").get(block-17);
		b.style.visibility='hidden';
}
var done=0;
var count1=0;
var speed=30;
function show_gameover()
{
		score=document.getElementById('svalue').innerHTML;
		document.getElementById('fscore').innerHTML=score;
		img=document.getElementById('gameover');
		img.style.display='block';
		b=as(".hai01");
		b.get(food_number).style.visibility='hidden';
		for(i=0;i<272;i++)
		{
			b.get(i).style.visibility='hidden';
		}
		//alert(img.offsetLeft+'px'+img.offsetTop+'px'+img.offsetHeight+'px'+img.offsetWidth+'px');
		if(parseInt(img.offsetHeight)<=600&&parseInt(img.offsetWidth)<=700&&!done)
		{
			if(count1<40)
			{
			setTimeout("enlarge_img()",speed+10);
				}
			else
			{
					setTimeout("enlarge_img()",speed+20);
			}
			//alert('I am in');
		}
		else if(parseInt(img.offsetWidth)>=500)
		{
				done=1;
				setTimeout("shrink_img()",60);
		}
		else
		{
				setTimeout("displaymask()",1000);
		}
		food_number=0;
}
function enlarge_img()
{
		img=document.getElementById('gameover');
		img.style.left=(parseInt(img.offsetLeft)-20)+'px';
		img.style.width=(parseInt(img.offsetWidth)+40)+'px';
		img.style.top=(parseInt(img.offsetTop)-10)+'px';
		img.style.height=(parseInt(img.offsetHeight)+20)+'px';
		//alert((parseInt(img.offsetLeft)-10)+'px'+(parseInt(img.offsetWidth)+20)+'px'+(parseInt(img.offsetTop)-10)+'px'+(parseInt(img.offsetHeight)+20)+'px');
		show_gameover();
}
function shrink_img()
{
	img=document.getElementById('gameover');
		img.style.left=(parseInt(img.offsetLeft)+20)+'px';
		img.style.width=(parseInt(img.offsetWidth)-40)+'px';
		img.style.top=(parseInt(img.offsetTop)+10)+'px';
		img.style.height=(parseInt(img.offsetHeight)-20)+'px';
		show_gameover();
}
