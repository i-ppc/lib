
$(".ans, .line3, .onoffcodeul").css("visibility","hidden");

$(".triggeronoffsp").each(function(index){
	//console.log($(this));
	triggeronoffMouseDown($(this).attr('id'),1);
	});

$(".showonoffsp img").on("click",function(index, value){

	//console.log($(this));
	//showonoffMouseDown($(this).attr('id'),1,1);
	});


