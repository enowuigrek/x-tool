$(function () {
	$.fn.extend({
		snow: function (props) {
			props = jQuery.extend({ amount: 60 }, props);
			let random = (min, max) => Math.random() * (max - min) + min;
			let svg = '<svg class="snow" xmlns="http://www.w3.org/2000/svg">';
			for (let index = 0; index < props.amount; index++) {
				svg += `<circle class="particle" r="${random(1, 3)}" cx="${random(
					1,
					100
				)}%" cy="-${random(1, 100)}" />`;
			}
			svg += "</svg>";
			this.replaceWith(svg);
		}
	});

	//Init snow
	$(".snow").snow({
		amount: 300
	});
});