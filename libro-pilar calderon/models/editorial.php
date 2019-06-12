<?php
	require_once("conexion.php");
	class editorial
	{	private $nombre;
		private $mc;
		
		function __construct($nom)
		{	$this->nombre=$nom;
			
			$this->mc=new conexion();
		}
		function getEditorial()
		{	$sql="SELECT * FROM editorial";
			$conn=$this->mc->conectar();
			$res=$conn->query($sql);
			$j="";
			if($res->num_rows>0)
			{	while($r=$res->fetch_array())
					$a[]=$r;
				$j=json_encode($a);
			}
			return $j;
		}
	}
?>