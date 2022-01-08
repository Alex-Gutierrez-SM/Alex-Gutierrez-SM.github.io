<?php  
include ("conexion.php");
$bd = new BaseDatos();
$conexion = $bd-> conectar();

//Continuamos la sesión con tiempo límite determinado en el login en el cual se permitirá navegar al usuario.
session_start();
if(!isset($_SESSION['logeado'])) {
    header('Location: login.php');
    exit;
}else{
    $tiempo_limite = $_SESSION['logeado'] + $_SESSION['timeout_duration'];
    $time = time();
    if($tiempo_limite < $time) {
        session_unset();
        header('Location: login.php');
        exit;
    }
}
//En función del botón clicado, redirige a diferentes php, mantentiendo las variables de sesión.
if(isset($_POST['familia'])) {
  header('Location: ');
}elseif(isset($_POST['tipo'])){
  header('Location: ');
}elseif(isset($_POST['producto'])){
  header('Location: fichaproducto.php');
}elseif(isset($_POST['usuario'])){
  header('Location: usuarios.php');
}

?>

<html>
<head>

</head>
<body>
  <main>
    <h1>PruebaIndex</h1>
    <form method="POST" action="#">
      <?php
        //Si la variable de sesión dice que es admin muestra unos valores, si no, otros.
        if($_SESSION['compruebaAdmin'] == 1){
          echo '<button type="submit" name="familia">Familia</button>';
          echo '<button type="submit" name="tipo">Tipo</button>';
          echo '<button type="submit" name="producto">Producto</button>';
          echo '<button type="submit" name="usuario">Usuario</button>';
        }else{
          echo '<button type="submit" name="peasant">No button, PEASANT.</button>';
        }
        echo '<h1>'.$_SERVER['REMOTE_ADDR'].'</h1>';
        $ip = $_SERVER['REMOTE_ADDR']; // get client's IP
        $details = json_decode(file_get_contents("http://ipinfo.io/{$ip}/json"));// Send to ipinfo
        echo $details->city; // Gives you the city of the client.
      ?>

    </form>
  </main>
</body>
</html>