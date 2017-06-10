
document.write("<script type='text/javascript' src='./graph.js'></script>");
document.write("<script type='text/javascript' src='./heap.js'></script>");

//
//	Algoritmo DISJKTRA
//
function Dijkstra(canvas,myfont,isdigraph,nodes,edges,isPrim) {
	
	// vars para o  Graph
	
	var context = canvas.getContext("2d");
	context.font = myfont;
	Graph(context,isdigraph,nodes,edges);
	
	// Vars locais para Algoritmo de Dijkstra
	
	var snode;	// iniciar node
	var u;		// selecionar node
	var step;	// step
	var iteration;	// número de interação
	var heap;	// selecioar nós adjacente
	// variáveis locais Dijkstra()
	const STAT = {fix:1, sel:2, adj:3, oth:4};
	
	
	// node é fixo, selecionado, adjacente ou outro

	// Method of Dijkstra
	this.start = function() {
		canvas.addEventListener('mousedown',function(evt) {
			var mousePos = getMousePos(canvas,evt);
			mouseDown(canvas,mousePos.x,mousePos.y);
		},false);
	}

	//
	//  Node Extensão para Algoritmo de Dijkstra
	//
	function extNode(node) {
		// extends Node Properties
		node.dist = -1;			// Distância do começo node
		node.prev = -1;			// node anterior no caminho mais curto
		node.stat = STAT.oth;		// Se fix, sel, adj, or oth
		node.labelPos = {dx:0, dy:0};	// Onde mostrar o rótulo
	}
	// Extensão Node Metódos Pintar 
	Node.prototype.paint = function(context,node) {	// sobrepor Node.paint
		if (node.stat==STAT.fix) {		// Fixo
			context.strokeStyle = 'blue';
			context.fillStyle = 'cyan';
		} else if (node.stat==STAT.sel) {	// Selecionado
			context.strokeStyle = 'blue';
			context.fillStyle = 'pink';
		} else if (node.stat==STAT.adj) {	// Adjacente
			context.strokeStyle = 'red';
			context.fillStyle = 'yellow';
		} else {				// Outros
			context.strokeStyle = 'black';
			context.fillStyle = 'white';
		}
		node.drawNode(context,node);
		printLabel(context,node);
	
		// Função local
		function printLabel(context,node) {	// Pintar valores
			var s;
			if (node.dist<0) {
				s = "";
			} else {
				var s = ""+node.dist;
			}
			var w1 = context.measureText(s).width+node.wh.h/5;
			var x1 = node.xy.x+(node.wh.w/2+node.wh.h/2)*node.labelPos.dx;
			var y1 = node.xy.y+(node.wh.h+1)*node.labelPos.dy;
			if ((node.stat==STAT.sel)||(node.stat==STAT.fix)) {
							// Se selecionado ou Fixo
				context.fillStyle = 'blue';
			} else if (node.stat==STAT.adj) {	// adjacent
				context.fillStyle = 'red';
			}
			context.fillText(s,x1,y1+node.wh.h/5);
		}	// Final do Método para pintar valores
	}
	Node.prototype.setlabelPos = function() {
		// Encontrar direção esparsa
		// Não chamar antes de bordas são registradas
		var x0 = [ 1,  0, -1,  1,  0, -1];
		var y0 = [ 1,  1,  1, -1, -1, -1];
		var m0 = y0.length;
		var k=0;
		var w=weight(this.num,x0[0],y0[0]);
		for (var j=1; j<m0; j++) {
			var z = weight(this.num,x0[j],y0[j]);
			if (z<w) {
				w = z;
				k = j;
			}
		}
		this.labelPos = {dx:x0[k], dy: y0[k]};
	
		// Função Local
		function weight(v0,x1,y1) {// Peso da direção (x1, y1)
			var w = 0;
			var z;
			var x0 = Nodes[v0].xy;
			for (var j = Nodes[v0].deltaP; j>=0; j=Edges[j].deltaP) {
				var v = Edges[j].termv;
				var pos = Nodes[v].xy;
				var x2 = pos.x-x0.x;
				var y2 = pos.y-x0.y;
				z = (x1*x2+y1*y2)/Math.sqrt((x1*x1+y1*y1)*(x2*x2+y2*y2))+1;
				w += z*z*z*z;
			}
			for (var j = Nodes[v0].deltaM; j>=0; j=Edges[j].deltaM) {
				var v = Edges[j].initv;
				var pos = Nodes[v].xy;
				var x2 = pos.x-x0.x;
				var y2 = pos.y-x0.y;
				z = (x1*x2+y1*y2)/Math.sqrt((x1*x1+y1*y1)*(x2*x2+y2*y2))+1;
				w += z*z*z*z;
			}
			return w;
		}	// Fim do Peso
	}
	
	//
	// Extensão de borda para Algoritmo de Dijkstra	
	//
	function extEdge(edge,len) {
		// Estende Propriedades de Borda
		edge.length = len;
	}
	// Métodos de borda Extensão
	Edge.prototype.paint = function(context,edge) {	//sobrepor Edge.paint
		var istat = Nodes[edge.initv].stat;
		var tstat = Nodes[edge.termv].stat;
	
		context.strokeStyle = 'black';
		context.lineWidth = 1;
		if (edge.initv == Nodes[edge.termv].prev) {
			if ((istat==STAT.fix)&&(tstat==STAT.adj)) {
				context.strokeStyle = 'red';
			} else {
				context.strokeStyle = 'blue';
			}
			context.lineWidth = 3;
		}
		if ((!isDigraph)&&(edge.termv == Nodes[edge.initv].prev)) {
			if ((tstat==STAT.fix)&&(istat==STAT.adj)) {
				context.strokeStyle = 'red';
			} else {
				context.strokeStyle = 'blue';
			}
			context.lineWidth = 3;
		}
		edge.drawEdge(context,edge);
		printLength(context,edge);
	
		// Função Local
		function printLength(context,edge) {
			var w = context.measureText(""+edge.length).width;
			var h = edge.fs;
			var xc = (edge.initxy.x+edge.termxy.x)/2;
			var yc = (edge.initxy.y+edge.termxy.y)/2;
			context.clearRect(xc-w/2,yc-h/2,w,h);
			context.fillStyle = 'black';
			context.fillText(""+edge.length,xc,yc+h/4);
		}
	}

	//
	// Outras funções locais do Algoritmo de Dijkstra	'
	//
	function mycomp(i,j) {	// Comparar valores de nó (node) (i) e nó(node) (j)
				// Usando o  heap
		var d1 = Nodes[i].dist;
		var d2 = Nodes[j].dist;
		return (d1-d2>0);
	}
	
	function step1() {	// Inicializar valores
		for (var i=0; i<n; i++) {
			Nodes[i].dist=-1;
			Nodes[i].prev=-1;
			Nodes[i].stat=STAT.oth;
		}
		u = snode;
		Nodes[u].dist=0;
		Nodes[u].stat=STAT.sel;
	}
	
	function step2() {	// Substituir os valores
		var j;

		var d0 = Nodes[u].dist;

		j = Nodes[u].deltaP;
		replaceLabels(j,d0,nextDPof,termVof);
		if (!this.isDigraph) {
			j = Nodes[u].deltaM;
			replaceLabels(j,d0,nextDMof,initVof);
		}
		Nodes[u].stat=STAT.fix;

		// Função Local
		function nextDPof(j) { return Edges[j].deltaP; }
		function nextDMof(j) { return Edges[j].deltaM; }
		function initVof(j) { return Edges[j].initv; }
		function termVof(j) { return Edges[j].termv; }

		function replaceLabels(j,d0,nextof,theotherVofu) {
			while (j>=0) {
				var i = theotherVofu(j);
				var s = Nodes[i].stat;
				var d = Nodes[i].dist;
				var l = Edges[j].length;
				if (!isPrim) {		// if Dijkstra
					l = l+d0;
				}
				if (((s==STAT.adj)&&(d>l)) || (d<0)) {
					Nodes[i].dist=l;	// substituir valor dist
					Nodes[i].prev=u;	// substituir valor prev
					if (d<0) {		// adicionar node(i) to Sbar
						heap.push(i);
						Nodes[i].stat=STAT.adj;
					} else {
						heap.replace(i);
					}
				}
				j = nextof(j);
			}
		}
	}

	function step3() {	// Encontrar o mais curto ,node in Sbar
				// Selecione u (snode)
		u = heap.pop();
		Nodes[u].stat=STAT.sel;
	}

	function step4() {	// fixe  U (snode)
		Nodes[u].stat=STAT.fix;
	}

	function mouseDown(canvas,mx,my) {
		//Alerta ("mD step="+step+", ite="+iteration);
		if (iteration == 0) {
			step1();
			iteration++;
			step = 2;
		} else if (iteration>=n) {
			step4();
			iteration = 0;
		} else {
			if (step ==2) {
				step2();
				step = 3;
			} else {
				step3();
				iteration++;
				step = 2;
			}
		}
		paint(canvas);
	}

	function paint(canvas) {
		var context = canvas.getContext("2d");
		var w = canvas.width;
		var h = canvas.height;
	
		context.clearRect(0,0,w,h);
		context.strokeStyle = 'black';
		context.fillStyle = 'black';
		context.lineWidth = 1;
		context.font = myfont;

		for (var i=0; i<n; i++) {
			Nodes[i].paint(context,Nodes[i]);
		}
		for (var i=0; i<m; i++) {
			Edges[i].paint(context,Edges[i]);
		}
	}
	function getMousePos(canvas,evt) {
		var rect=canvas.getBoundingClientRect();
		return {
			x: evt.clientX-rect.left,
			y: evt.clientY-rect.top
		};
	}

// Inicialização deve ser feita após def de Métodos para Node & Edge são executados
	// Estende as propriedades de nó e borda
	for (var i=0; i<n; i++) {
		extNode(Nodes[i]);
		Nodes[i].setlabelPos();
	}
	for (var i=0; i<m; i++) {
		var len = edges[i][3];
		extEdge(Edges[i],len);
	}
	// Extensão para Algoritmo de Dijkstra'
	// "Esse" é [object Window]
	snode = 0;
	iteration = 0;
	step = 0;
	u = -1;
	heap = new Heap(n,mycomp);

	// pintar valores e iniciar
	paint(canvas);
	step1();
}