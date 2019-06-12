<?php
	require_once("conexion.php");
	class libro
	{	private $id;
		private $codigo;
		private $titulo;
		private $cantidad;
		private $disponibles;
		private $editorial_nombre;
		private $autor_nombre;
		private $genero_nombre;
		
		private $mc;
		
		function __construct($id,$cod,$tit,$can,$disp,$edi,$auto,$gen)
		{	$this->id=$id;
			$this->codigo=$cod;
			$this->titulo=$tit;
			$this->cantidad=$can;
			$this->disponibles=$disp;
			$this->editorial_nombre=$edi;
			$this->autor_nombre=$auto;
			$this->genero_nombre=$gen;
			
			$this->mc=new conexion();
		}
		function guardar()
		{
			$sql="INSERT INTO libro VALUES(0,'$this->codigo','$this->titulo','$this->cantidad','$this->disponibles','$this->editorial_nombre','$this->autor_nombre','$this->genero_nombre')";
			//echo $sql;
			$conn=$this->mc->conectar();
			$conn->query($sql);
			$id=$conn->insert_id;
			$this->mc->desconectar();
			return $id;
		}	
		function actualizar()
		{
			$sql="UPDATE libro SET titulo='$this->titulo',cantidad='$this->cantidad',disponibles='$this->disponibles',editorial_nombre='$this->editorial_nombre',autor_nombre='$this->autor_nombre',genero_nombre='$this->genero_nombre' WHERE id='$this->id'";
			$conn=$this->mc->conectar();
			$conn->query($sql);
			$this->mc->desconectar();	
		}
		function eliminar()
		{
			$sql="DELETE FROM libro WHERE id='$this->id'";
			$conn=$this->mc->conectar();
			$conn->query($sql);
			$this->mc->desconectar();
		}
		function buscarxcod()
		{
			$sql="SELECT * FROM libro WHERE codigo='$this->codigo'";
			$conn=$this->mc->conectar();
			$res=$conn->query($sql);
			//$res[0][0]
			$j="";
			if($res->num_rows>0)
			{
				$r=$res->fetch_array();
				$a[]=$r;
				$j=json_encode($a);
			}
			return $j;
		}
		function buscar($campo,$operador,$valor,$inicio,$total)
		{	if($operador=="LIKE")
				$valor="%".$valor."%";
			$sql="SELECT * FROM libro WHERE $campo $operador '$valor' LIMIT $inicio,$total";
			$conn=$this->mc->conectar();
			$res=$conn->query($sql);
			$j="";
			if($res->num_rows>0)
			{
				while($r=$res->fetch_array())
					$a[]=$r;
				$j=json_encode($a);
			}
			return $j;
		}
		function getTotalRegs($campo,$operador,$valor)
		{	if($operador=="LIKE")
				$valor="%".$valor."%";
			$sql="SELECT COUNT(*) FROM libro WHERE $campo $operador '$valor'";
			$conn=$this->mc->conectar();
			$res=$conn->query($sql);
			$r=$res->fetch_array();
			return $r[0];
		}
		
	}
?>



