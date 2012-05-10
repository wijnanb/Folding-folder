var Folder = (function () {

	var canvas;
	var folded = true;
	var boxes = [];
	var foldedTimeout;
  var iterator = 1;
  var x = (Math.random()*2);
  var y = Math.floor(Math.random()*20);         
  var z = Math.floor(Math.random()*20)-10;
  var boxlistmult = []; 
	var init = function() {
		canvas = $("#canvas");

		$(".box").each(function(index) {				
			var color = "color" + Math.floor(Math.random()*4);
			$(this).addClass(color);
		});	

		$(".slider").on("change",onSliderChange);
	  $("#button-exploder").on("click", explode);	
		$("#button-open").on("click", open);
		$("#button-close").on("click", close);
		canvas.on("click", toggle);
		$("#checkbox-content").on("change",onToggleContent);
	};

	var open = function() {
    openVertical(0);
		openHorizontal(15, 800);
		folded = false;
	}

  var explode = function() {

	$(".box").css("-webkit-transition-delay","0ms");

        setInterval(function(){
        openExploder(0,0);
     },200);
  }

	var close = function() {
		openHorizontal(180);
		openVertical(180, 800);
		folded = true;
	}

	var toggle = function() {
		folded ? open() : close();
	}

	var onToggleContent = function(event) {
		var checked = $(event.target).prop("checked");
		$(".folder").toggleClass("no-content", !checked )
	}

	var onSliderChange = function(event) {
		var value = $(event.target).val();
		$(event.target).parent().find(".value").html(value);

		switch ($(event.target).parent().prop("id")) {
			case "slider-0":
				openVertical(value);
				openHorizontal(180);
				break;
			case "slider-1":
				openHorizontal(value);
				openVertical(0);
				break;
		}
	}
  var openExploder = function(value, delay) {
    console.log("blah");   
    $(".box").each(function(index) {
      if (typeof(boxlistmult[index]) == "undefined") { boxlistmult[index] = (Math.random()*8)-4;} 
      $(this).css("-webkit-transform", "translate3d("+z*iterator*boxlistmult[index]+"px,"+x*iterator*boxlistmult[index]+"px,"+z*iterator*boxlistmult[index]+"px) rotate3d(0,1,1,"+y*iterator*boxlistmult[index]+"deg)");
      iterator = iterator*1.02;
    });
  }

	var openVertical = function(value, delay) {
		if (typeof delay == 'undefined') { delay = 200; }
		$(".row").css("-webkit-transition-delay",delay+"ms");

		$(".row-1up, .row-2up, .row-3up").css("-webkit-transform", "translate3d(0px,-200px,0px) rotate3d(0,0,1,"+value+"deg)");
		$(".row-1down, .row-2down, row-3down").css("-webkit-transform", "translate3d(0px,200px,0px) rotate3d(0,0,1,-"+value+"deg)");	
	
		$("#slider-0 input").val(value);
	}

	var openHorizontal = function(value, delay) {
		if (typeof delay == 'undefined') { delay = 200; }
		$(".folder, .box").css("-webkit-transition-delay",delay+"ms");

		var middle = (4-1) * 200 / 2  * (value/180);

		value = Math.min(value, 179);

		$(".level0").css("-webkit-transform", "rotate3d(0,1,0,-"+(value/2)+"deg)");
		$(".level2, .level4, .level6").css("-webkit-transform", "translate3d(200px,0px,0px) rotate3d(0,1,0,-"+value+"deg)");
		$(".level1, .level3, .level5, .level7").css("-webkit-transform", "translate3d(200px,0px,0px) rotate3d(0,1,0,"+value+"deg)");
	
		if (value>=140) {
			$(".folder").css("-webkit-transform", "translate3d("+middle+"px,0px,0px) rotate3d(0,1,0,"+(value/2)+"deg)");
		} else {
			$(".folder").css("-webkit-transform", "translate3d("+middle+"px,0px,0px) rotate3d(0,1,0,0deg)");
		}

		clearTimeout(foldedTimeout);
		if (value>=179) {
			foldedTimeout = setTimeout(function(){
				$(".folder").addClass("folded");
			}, 100);
		} else {
			$(".folder").removeClass("folded");
		}
		
		$(".level1").on("webkitTransitionEnd", function(event){
			$(".folder").toggleClass("folded", value>=179 );
		});
	
		$("#slider-1 input").val(value);
	}

	return {
		init: init,
		open: open,
		close: close,
		toggle: toggle,
    explode: explode
	};
})();

Zepto(function($){
  Folder.init();

  setTimeout(function(){
  	 Folder.open();
  }, 1200 );
})
