var p;
var m=new Array();
var row=-1; //La fila actual
var reg; //El registro a insertar o actualizar
function guardar()
{	datos=validar();
	libro_id=$('#libro_id').html();
	if(datos!="")
	{
		$.ajax({
			type:'post',
			url:'../controllers/clibro.php',
			data:"libro_id="+libro_id+"&"+datos,
			success:function(id)
			{	if(row>-1)
					updateRow();
				else
				{
					$("#libro_id").html(id);
					//validar();
					reg[0]=id;
					m.push(reg);
					printDatos();
				}
			}
		});
	}
}
function validar()
{
	cod=$("#cod").val();
	tit=$("#tit").val();
	can=$("#can").val();
	disp=$("#disp").val();
	edi=$("#editorial_nombre").val();
	auto=$("#autor_nombre").val();
	gen=$("#genero_nombre").val();
	v=0;
	if(cod=="")
	{	v=1;
		$("#cod").attr("class","form-control error");
	}
	else
		$("#cod").attr("class","form-control");
	if(tit=="")
	{	v=1;
		$("#tit").attr("class","form-control error");
	}
	else
		$("#tit").attr("class","form-control");
	if(can=="")
	{	v=1;
		$("#can").attr("class","form-control error");
	}
	else
		$("#can").attr("class","form-control");
	if(disp=="")
	{	v=1;
		$("#disp").attr("class","form-control error");
	}
	else
		$("#disp").attr("class","form-control");
	
	///////
	
	datos="";
		
	if(v==0)
	{	datos="codigo="+cod+"&titulo="+tit+"&cantidad="+can+"&disponibles="+disp+"&editorial_nombre="+edi+"&autor_nombre="+auto+"&genero_nombre="+gen+"&accion=guardar";
	}
	reg=new Array($('#libro_id').html(),cod,tit,can,disp,edi,auto,gen);
	return datos;
	
}

function buscarxcod(){
	cod=$('#cod').val();
	$.ajax({
		type:'post',
		url:'../controllers/clibro.php',
		dataType:'json',
		data:'codigo='+cod+'&accion=buscarxcod',
		success:function(html)
		{
		//	alert(html);
			m=html;
			showDatos(0);
		}
	});
}

function eliminar()
{	id=$('#libro_id').html();
	if(confirm("Eliminar registro...?"))
	{	$.ajax({
			type:'post',
			url:'../controllers/clibro.php',
			data:'libro_id='+id+'&accion=eliminar',
			success:function(html)
			{	//alert(html);
				deleteRow();
			}
		});
	}
}
function updateRow()
{
	m.splice(row,1,reg);
	printDatos();
}

function deleteRow()
{
	m.splice(row,1);
	printDatos();
	row=-1;
}

function showDatos(fila)
{
	$('#libro_id').html(m[fila][0]);
	$('#cod').val(m[fila][1]);   
	$('#tit').val(m[fila][2]);
	$('#can').val(m[fila][3]);
	$('#disp').val(m[fila][4]);
	$('#editorial_nombre').val(m[fila][5]);
	$('#autor_nombre').val(m[fila][6]);
	$('#genero_nombre').val(m[fila][7]);
	row=fila;
}


function getEditorial()
{	$.ajax({
		type:'post',
		url:'../controllers/clibro.php',
		dataType:'json',
		data:'accion=getEditorial',
		success:function(html)
		{	selEditorial(html);
		}
	});
	
}
function getAutor()
{
    $.ajax({
		type:'post',
		url:'../controllers/clibro.php',
		dataType:'json',
		data:'accion=getAutor',
		success:function(html)
		{	selAutor(html);
		}
	});
}
function getGenero()
{
    $.ajax({
		type:'post',
		url:'../controllers/clibro.php',
		dataType:'json',
		data:'accion=getGenero',
		success:function(html)
		{	selGenero(html);
		}
	});
}
function selEditorial(m)
{
	nm=m.length;
	sel="<select id='editorial_nombre'>";
	for(i=0;i<nm;i++)
		sel+="<option value='"+m[i][0]+"'>"+m[i][0]+"</option>";
	sel+="</select>";
	// alert(sel)
	$('#editorial').html(sel);
}

function selAutor(m)
{
	nm=m.length;
	sel="<select id='autor_nombre'>";
	for(i=0;i<nm;i++)
		sel+="<option value='"+m[i][0]+"'>"+m[i][0]+"</option>";
	sel+="</select>";
	// alert(sel)
	$('#autor').html(sel);
}
function selGenero(m)
{
	nm=m.length;
	sel="<select id='genero_nombre'>";
	for(i=0;i<nm;i++)
		sel+="<option value='"+m[i][0]+"'>"+m[i][0]+"</option>";
	sel+="</select>";
	// alert(sel)
	$('#genero').html(sel);
}

function buscar(inicio,total){
	campo=$('#campo').val();
	operador=$('#operador').val();
	valor=$('#valor').val();
	datos="campo="+campo+"&operador="+operador+"&valor="+valor+"&inicio="+inicio+"&total="+total+"&accion=buscar";	$.ajax({
		type:'post',
		url:'../controllers/clibro.php',
		dataType:'json',
		data:datos,
		success:function(html)
		{
			 //alert(html)
			m=html;
			printDatos();
		}
	});
}

function printDatos()
{
	table="<table align='center' class='table'><tr><td>No</td><td>Codigo</td><td>Titulo</td><td>Editorial</td><td>Autor</td><td>Genero</td></tr>";
	nm=m.length;
	c=1;
	for(i=0;i<nm;i++)
	{
		table+="<tr><td>"+c+"</td><td>"+m[i][1]+"</td><td>"+m[i][2]+"</td><td>"+m[i][5]+"</td><td>"+m[i][6]+"</td><td>"+m[i][7]+"</td><td><button class='btn btn-primary' onclick='showDatos("+i+")'>E</button>&nbsp;&nbsp;<button class='btn btn-danger' onclick='showDatos("+i+");eliminar();'>X</button></td></tr>";
		c++;
	}
	table+="</table>";
	//alert(table);
	$('#results').html(table);
}
function paginar(n)
{	tamanho=3;
	buscar(0,tamanho);
	totalpags=Math.ceil(n/tamanho);
	html="";
	ini=0;
	for(i=1;i<=totalpags;i++)
	{
		html+="<a href='#' onclick='buscar("+ini+","+tamanho+")'>"+i+"</a>&nbsp;&nbsp;&nbsp;";
		ini+=tamanho;
	}
	$('#footer').html(html);
}
function getTotalRegs()
{	campo=$('#campo').val();
	operador=$('#operador').val();
	valor=$('#valor').val();
	$.ajax({
		type:'post',
		url:'../controllers/clibro.php',
		data:"campo="+campo+"&operador="+operador+"&valor="+valor+"&accion=totalRegs",
		success:function(html)
		{	paginar(html);
		}
	});
}


