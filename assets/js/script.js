/* Fake placeholder support in browsers that do not support the HTML input placeholder attribute. Ideally this would be paired with a javascript function that prevents form submit if the a given input's value is equivalent to the placeholder attribute. */
/*
function initPlaceholderSupport() {
    if( ! Modernizr.input.placeholder ) {
        $('[placeholder]').focus(function() {
          var input = $(this);
          if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
          }
        }).blur(function() {
          var input = $(this);
          if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
          }
        }).blur();
    }
}

initPlaceholderSupport();
*/

$(document).ready(function() {

var width = parseInt($('#container').css('width'));

/* data page */
if ($('#data').length > 0){
	
	var height = width * 0.642;

	var projection = d3.geo.albers().scale(width * 1.357).translate([width / 2, height / 2]);

	var path = d3.geo.path().projection(projection).pointRadius(1.5);

	var svg = d3.select("#geography").append("svg").style("width", width).style("height", height);
	
	d3.select(window).on('resize', resize1);
	
	queue().defer(d3.json, "assets/data/us.json").defer(d3.json, "assets/data/lived.json").await(ready);

		function ready(error, us, lived) {
			svg.append("path").datum(topojson.feature(us, us.objects.land)).attr("class", "land").attr("d", path);
			
			svg.append("path").datum(topojson.mesh(us, us.objects.states, function(a, b) {
				return a !== b;
			})).attr("class", "states").attr("d", path);
			
			svg.append("path").datum(topojson.feature(lived, lived.objects.lived)).attr("class", "points").attr("d", path);
			
			svg.append("path")
			    .datum({type: "LineString", coordinates: [[-76.285, 36.850], [-80.469, 36.386], [-94.598,35.406], [-97.439,35.222]]})
			    .attr("class", "livedarc")
			    .attr("d", path);
			   
	};

	var margin = {
		top : 20,
		bottom : 30,
		left : 40
	}, height1 = (width * .71) - margin.top - margin.bottom;

	var x = d3.scale.linear().range([0, width - 50]);

	var y = d3.scale.linear().range([height1, 0]);

	var color = d3.scale.category20();

	var xAxis = d3.svg.axis().scale(x).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left");

	var svg1 = d3.select("#skills").append("svg").attr("width", width).attr("height", height1 + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.tsv("assets/data/skills.tsv", function(error, data) {
		data.forEach(function(d) {
			d.level = +d.level;
			d.experience = +d.experience;
			d.use = +d.use;
		});

		x.domain(d3.extent(data, function(d) {
			return d.experience;
		})).nice();
		y.domain(d3.extent(data, function(d) {
			return d.level;
		})).nice();

		svg1.append("g").attr("class", "x axis").attr("transform", "translate(0," + height1 + ")").call(xAxis).append("text").attr("class", "label").attr("x", width - 40).attr("y", -6).style("text-anchor", "end").text("experience");

		svg1.append("g").attr("class", "y axis").call(yAxis).append("text").attr("class", "label").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", "0.71em").style("text-anchor", "end").text("competency level")

		svg1.selectAll(".dot").data(data).enter().append("circle").attr("class", "dot").attr("r", function(d) {
			return (3.4 + (d.use * 0.15))
		}).attr("cx", function(d) {
			return x(d.experience);
		}).attr("cy", function(d) {
			return y(d.level);
		}).style("fill", function(d) {
			return color(d.name);
		});

		var legend = svg1.selectAll(".legend").data(color.domain()).enter().append("g").attr("class", "legend").attr("transform", function(d, i) {
			return "translate(-80," + i * 20 + ")";
		});

		legend.append("rect").attr("x", width + 5).attr("width", 18).attr("height", 18).style("fill", color).attr("margin-left", "10px");

		legend.append("text").attr("x", width).attr("y", 9).attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
			return d;
		
		});

	});

	var parseDate = d3.time.format("%d").parse, formatYear = d3.format(""), formatDate = d3.format("%m");

	var margin2 = {
		top2 : 10,
		right2 : 5,
		bottom2 : 20,
		left2 : 80
	}, height2 = 500 - margin2.top2 - margin2.bottom2;

	var y0 = d3.scale.ordinal().rangeRoundBands([height2, 0], .2);

	var y1 = d3.scale.linear();

	var x1 = d3.scale.ordinal().rangeRoundBands([0, width *.90], .1, 0);
	//
	// var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(formatDate);

	var nest = d3.nest().key(function(d) {
		return d.group;
	});

	var stack = d3.layout.stack().values(function(d) {
		return d.values;
	}).x(function(d) {
		return d.date;
	}).y(function(d) {
		return d.value;
	}).out(function(d, y0) {
		d.valueOffset = y0;
	});

	var color1 = d3.scale.category20();

	var svg2 = d3.select("#week").append("svg").attr("width", width).attr("height", height2 + margin2.top2 + margin2.bottom2).append("g").attr("transform", "translate(" + margin2.left2 + "," + margin2.top2 + ")");

	svg2.append("text").attr("class", "label").attr("x", width * .03).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Sunday";});
	svg2.append("text").attr("class", "label").attr("x", width * .15).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Monday";});
	svg2.append("text").attr("class", "label").attr("x", width * .28).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Tuesday";});
	svg2.append("text").attr("class", "label").attr("x", width * .40).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Wednesday";});
	svg2.append("text").attr("class", "label").attr("x", width * .54).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Thursday";});
	svg2.append("text").attr("class", "label").attr("x", width * .68).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Friday";});
	svg2.append("text").attr("class", "label").attr("x", width * .80).attr("y", 473).style("text-anchor", "start").text(function(d) {return "Saturday";});

	d3.tsv("assets/data/weekgraph.tsv", function(error, data) {

		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.value = +d.value;
		});

		var dataByGroup = nest.entries(data);

		stack(dataByGroup);
		x1.domain(dataByGroup[0].values.map(function(d) {
			return d.date;
		}));
		y0.domain(dataByGroup.map(function(d) {
			return d.key;
		}));
		y1.domain([0, d3.max(data, function(d) {
			return d.value;
		})]).range([y0.rangeBand(), 0]);

		var group = svg2.selectAll(".group").data(dataByGroup).enter().append("g").attr("class", "group").attr("transform", function(d) {
			return "translate(0," + y0(d.key) + ")";
		});

		group.append("text").style("text-anchor","end").attr("class", "group-label1").attr("x", -5).attr("y", function(d) {
			return y1(d.values[0].value / 2);
		}).attr("dy", ".35em").text(function(d) {
			if (d.key == 1) {
				return "cooking";
			} else if (d.key == 2) {
				return "cycling";
			} else if (d.key == 3) {
				return "work";
			} else if (d.key == 4) {
				return "reading";
			} else if (d.key == 5) {
				return "coding";
			} else if (d.key == 6) {
				return "sleeping";
			} else {
				return "mystery";
			}
		});

		group.selectAll("rect").data(function(d) {
			return d.values;
		}).enter().append("rect").style("fill", function(d) {
			return color1(d.group);
		}).attr("x", function(d) {
			return x1(d.date);
		}).attr("y", function(d) {
			return y1(d.value);
		}).attr("width", x1.rangeBand()).attr("height", function(d) {
			return y0.rangeBand() - y1(d.value);
		});

		group.filter(function(d, i) {
			return !i;
		}).append("g").attr("class", "x axis").attr("transform", "translate(0," + y0.rangeBand() + ")");
		//.call(xAxis);

		d3.selectAll("input").on("change", change);

		var timeout = setTimeout(function() {
			d3.select("input[value=\"stacked\"]").property("checked", true).each(change);
		}, 15000);

		function change() {
			clearTimeout(timeout);
			if (this.value === "multiples")
				transitionMultiples();
			else
				transitionStacked();
		}

		function transitionMultiples() {
			var t = svg2.transition().duration(750), g = t.selectAll(".group").attr("transform", function(d) {
				return "translate(0," + y0(d.key) + ")";
			});
			g.selectAll("rect").attr("y", function(d) {
				return y1(d.value);
			});
			g.select(".group-label1").attr("y", function(d) {
				return y1(d.values[0].value / 2);
			})
		}

		function transitionStacked() {
			var t = svg2.transition().duration(750), g = t.selectAll(".group").attr("transform", "translate(0," + y0(y0.domain()[0]) + ")");
			g.selectAll("rect").attr("y", function(d) {
				return y1(d.value + d.valueOffset);
			});
			g.select(".group-label1").attr("y", function(d) {
				return y1(d.values[0].value / 1 + d.values[0].valueOffset);
			})
		}

	});
	
	function resize1() {
	   width = parseInt(d3.select('#geography').style('width'));
		    height = width * .642;
		
		    projection
		        .translate([width / 2, height / 2])
		        .scale(width * 1.357);
		
		    svg
		        .style('width', width + 'px')
		        .style('height', height + 'px');
		
		    svg.selectAll('.land').attr('d', path);
		    svg.selectAll('.states').attr('d', path);
		    svg.selectAll('.points').attr('d', path);
		    svg.selectAll('.livedarc').attr('d', path);

	}
	
} 

/* home page */
if ($('#pienav').length > 0){
	
    var height = Math.min(width, 600),
    radius = Math.min(width, height) / 2;

	//var color = d3.scale.ordinal()
	  //  .range(["#00A0B0", "#8EB4EF", "#EDC951"]);
	
	var arc = d3.svg.arc()
	    .outerRadius(radius - 10)
	    .innerRadius(0);
	
	var pie = d3.layout.pie()
	    .sort(null)
	    .value(function(d) { return d.percent; });
	
	var svg = d3.select("#pienav").append("svg")
	    .style("width", width + "px")
	    .style("height", height + "px").append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	    
	d3.select(window).on('resize', resize);
	
	var g;
	
	d3.csv("assets/data/index.csv", function(error, data) {
	
	  g = svg.selectAll(".arc")
	      .data(pie(data))
	      .enter().append("a")
	      .attr("xlink:href", function(d){return d.data.url;})
	      .append("g")
	      .attr("class", "arc");
	
	  g.append("path")
	      .attr("d", arc)
	      .attr("id", function(d) { return d.data.id; })
	      //.style("fill", function(d) { return color(d.data.id); })
	      .style("stroke", "white");
	
	  g.append("text")
	      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	      .attr("dy", ".35em")
	      .style("text-anchor", "middle")
	      .text(function(d) { return d.data.id; });
	
	});
	
	function resize() {
	    width = parseInt(d3.select('#pienav').style('width'));
	    height = Math.min(width, 600);
		radius = Math.min(width, height) / 2;
		
		d3.select('svg')
	        .style('width', width + 'px')
	        .style('height', height + 'px');
	        
	        svg.style('width', width + 'px')
	        .style('height', height + 'px')
	        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
	
	    arc
	        .outerRadius(radius - 10);
	        
	    g.selectAll('path').attr('d', arc);
	    g.selectAll('text').attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
	}
	
}
		
});