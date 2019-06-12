<?php
	class conexion
	{	private $server;
		private $user;
		private $password;
		private $bd;
		private $enlace;
		
		function __construct()
		{	$this->server="127.0.0.1";
			$this->user="root";
			$this->password="";
			$this->bd="bdLibro2";
		}
		function conectar()
		{	$this->enlace=mysqli_connect($this->server,$this->user,$this->password,$this->bd);
			return $this->enlace;
		}
		function desconectar()
		{	mysqli_close($this->enlace);
		}
	}
?>