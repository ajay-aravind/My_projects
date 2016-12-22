function displaymask()
{

	document.getElementById('mask').style.display='block';
	document.getElementById('mask1').style.display='block';
}
var food_number=0,running=0,count=0;
var snake_blocks=new Array();
var directions=new Array();
var just_resumed=0;
var blocks_no=1;
directions[0]=1;
snake_blocks[0]=0;
var d_right=1,d_down=2,d_left=3,d_up=4,obj1;
as(document).ready(
				   function(){
					   	as('#start').click(
										 function(){
											 if(running)
											{
												running=0;											
											}
											else 
											{
											running=1;
											obj1=as('.hai01');
											obj=obj1.get(snake_blocks[0]);
											obj.style.visibility='visible';
											if(!food_number)
												generate_food();
											else
												just_resumed=1;
											time1=time2=clock;
											//check_time(0);
											}
										 });
				   });
										 
function generate_food()
{	
	food_number=Math.random()*265;
	food_number=parseInt(food_number);
	if(is_partofsnake(food_number))
	{
			generate_food();
	}
	else{
			show_food(food_number);
	}
}
function is_partofsnake(food_number)
{	
	for(i=0;i<snake_blocks.length;i++)
	{
			if(food_number==snake_blocks[i])
			{
					return true;
			}
	}
	return false;
}
function show_food(food_number)
{
		obj=obj1.get(food_number);
		obj.style.visibility='visible';
		obj.style.backgroundColor='#00FF00';
}
