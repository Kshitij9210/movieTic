angular.module('movietic', ['ngMaterial'])

.config(['$interpolateProvider', function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[');
  $interpolateProvider.endSymbol(']}');
}])

.directive('movieChart', function ($parse, $window) {
    return {
      restrict:'EA',
      template:"<svg width='100%' height='100%' ></svg>",
       link: function(scope, elem, attrs){
				 	var exp = $parse(attrs.chartData);

           var orderData=exp(scope);
           var padding = 35;
           var pathClass="path";
           var xScale, yScale, xAxisGen, yAxisGen, lineFun;

           var d3 = $window.d3;
           var rawSvg=elem.find('svg');
           var svg = d3.select(rawSvg[0]);

					 var width = rawSvg[0].clientWidth,
					    height = rawSvg[0].clientHeight;
					 var x0,x1,y,xAxis, yAxis, legend,dtypes;

           scope.$watchCollection(exp, function(newVal, oldVal){
               orderData=newVal;
               drawBarsChart();
           });


					function setChartParameters(){

						svg.selectAll("*").remove();

						x0 = d3.scale.ordinal()
						    .rangeRoundBands([20, width], .1);

						x1 = d3.scale.ordinal();

						y = d3.scale.linear()
						    .range([height -45, 50]);

						color = d3.scale.ordinal()
						    .range(["#43aea8", "#60b1cc", "#bac3d2", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

						xAxis = d3.svg.axis()
						    .scale(x0)
						    .orient("bottom");

						yAxis = d3.svg.axis()
						    .scale(y)
						    .orient("left")
						    .tickFormat(d3.format("s")).ticks(3);

						dtypes = ['Theater X','Theater Y','Theater Z'];

						legend = svg.selectAll(".legend")
						      .data(dtypes.slice().reverse())
						      .enter().append("g")
						      .attr("class", "legend")
						      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

						legend.append("rect")
						      .attr("x", width - 18)
						      .attr("width", 18)
						      .attr("height", 18)
						      .style("fill", color);

						legend.append("text")
						      .attr("x", width - 24)
						      .attr("y", 9)
						      .attr("dy", ".35em")
						      .style("text-anchor", "end")
						      .text(function(d) { return d; });

					}

         function drawBarsChart() {

					 setChartParameters();

					 orderData.forEach(function(d) {
						 d.ordrs = dtypes.map(function(name) { return {name: name, value: +d[name]}; });
					 });


					 x0.domain(orderData.map(function(d) { return d.date; }));
					 x1.domain(dtypes).rangeRoundBands([0, x0.rangeBand()]);
					 y.domain([0, d3.max(orderData, function(d) { return d3.max(d.ordrs, function(d) { return d.value; }); }) + 50]);

					 svg.append("g")
							 .attr("class", "x axis")
							 .attr("transform", "translate(0," + (height -padding )+ ")")
							 .call(xAxis)
							 .append("text")
								.attr("transform", "translate(50,15)")
								.attr("y", 6 )
								.attr("dy", ".71em")
								.style("text-anchor", "start")
								.text("Days ->");

					 svg.append("g")
							 .attr("class", "y axis")
							 .attr("transform", "translate(30,10)")
							 .call(yAxis)
						 .append("text")
							 .attr("transform", "rotate(-90)")
							 .attr("y", 6 )
							 .attr("dy", ".71em")
							 .style("text-anchor", "end")
							 .text("Vacancy");

					 var state = svg.selectAll(".state")
							 .data(orderData)
						 .enter().append("g")
							 .attr("class", "state")
							 .attr("transform", function(d) { return "translate(" + x0(d.date) + ","+(-padding)+")"; });

					 state.selectAll("rect")
							 .data(function(d) { return d.ordrs; })
						 .enter().append("rect")
							 .attr("width", x1.rangeBand())
							 .attr("x", function(d) { return x1(d.name); })
							 .attr("y", function(d) { return y(d.value - 50 ) ; })
							 .attr("height", function(d) { return height - y(d.value - 50); })
							 .style("fill", function(d) { return color(d.name); });

           }

          drawBarsChart();
       }
   };
})

.controller('homeCtrl',
  ['$scope','$http',function($scope, $http) {
    $scope.myData = [];
    $scope.handler = StripeCheckout.configure({
      key: 'pk_test_IMy5aA4PoPc4kobJyjQG0yMs',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(token) {
        document.getElementById('stripeToken').value=token.id;
        document.getElementById('stripeAmount').value=$scope.checkoutamount;
        document.getElementById('custCheckout').submit();
        $scope.handler.close();
      }
    });
    $scope.init = function(){
      $http.get(STATIC_URL+"data.json")
      .then(function(response) {
          $scope.myData = response.data;
      });
    };
    $scope.openCheckout = function(){
      $scope.handler.open({
        name: 'MovieTic',
        description: 'Product',
        amount: $scope.checkoutamount
      });
    }
    $scope.setAmount = function(am){
      $scope.checkoutamount=am;
      $scope.showcheckout=true;
    }
    $scope.backtoselect = function(){
      $scope.showcheckout=false;
    }

}]);;
