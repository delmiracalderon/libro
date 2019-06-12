<?php
    require_once("../models/editorial.php");
    require_once("../models/autor.php");
	 require_once("../models/genero.php");
	require_once("../models/libro.php");
	$accion=$_REQUEST['accion'];
	switch($accion)
	{	case 'guardar':
			$libro_id=$_REQUEST['libro_id'];
			$cod=$_REQUEST['codigo'];
			$tit=$_REQUEST['titulo'];
			$can=$_REQUEST['cantidad'];
			$disp=$_REQUEST['disponibles'];
			$edi=$_REQUEST['editorial_nombre'];
			$auto=$_REQUEST['autor_nombre'];
			$gen=$_REQUEST['genero_nombre'];
			$lib=new libro($libro_id,$cod,$tit,$can,$disp,$edi,$auto,$gen);
			if($libro_id>0)
			{
				$lib->actualizar();
			}
			else
			{	$jj=$lib->buscarxcod();
		        if($jj=="")
					$lib->guardar();
				else
					echo "El codigo ya existe...";
			}
			break;
		case 'buscar':
			$campo=$_REQUEST['campo'];
			$operador=$_REQUEST['operador'];
			$valor=$_REQUEST['valor'];
			$inicio=$_REQUEST['inicio'];
			$total=$_REQUEST['total'];
			$lib=new libro(0,"","",0,0,'','','');
			$j=$lib->buscar($campo,$operador,$valor,$inicio,$total);
			echo $j;
			break;	
		case 'getEditorial':
			$edi=new editorial("");
			$j=$edi->getEditorial();
			echo $j;
            break;
        case 'getAutor':
             $auto=new autor("");
             $j=$auto->getAutor();
             echo $j;
             break;
		case 'getGenero':
			$gen=new genero("");
			$j=$gen->getGenero();
			echo $j;
            break;
		case 'buscarxcod':
			$cod=$_REQUEST['codigo'];
			$lib=new libro(0,$cod,"",0,0,'','','');
			$j=$lib->buscarxcod();
			echo $j;
			break;		
		case 'eliminar':
			$id=$_REQUEST['libro_id'];
			$lib=new libro($id,"","",0,0,'','','');
			$lib->eliminar();
			echo "Registro eliminado exitosamente...";
			break;	
		case 'totalRegs':
			$campo=$_REQUEST['campo'];
			$operador=$_REQUEST['operador'];
			$valor=$_REQUEST['valor'];
			$lib=new libro(0,"","",0,0,'','','');
			$j=$lib->getTotalRegs($campo,$operador,$valor);
			echo $j;
			break;			
		
	}
?>