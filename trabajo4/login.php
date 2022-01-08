<?php  
include ("conexion.php");
$bd = new BaseDatos();
$conexion = $bd-> conectar();

//Variable que comprueba si un usuario existe. En caso de existir se le redirige a la siguiente página.
//En caso contrario se le muestra un mensaje de error.
function comprobarUsuario($usuario, $contrasena) {
  global $bd;
  $sql = "SELECT * FROM usuario WHERE UserName='$usuario' AND Pass='$contrasena'";
  $resultado = $bd -> seleccionar($sql);
  $confirm = 0;
  $comprobarAdmin = 0;
  while ($arrayResult = $resultado -> fetch_assoc()){
    $fetchUsuario = $arrayResult['UserName'];
    $fetchPass = $arrayResult['Pass'];
    if($fetchUsuario == $usuario && $fetchPass == $contrasena){
      $confirm = 1;
      $comprobarAdmin = $arrayResult['Administrador'];
    }
  }
  if($confirm == 1) {
    //Se crea la variable de sesión con la hora de logeo además de la variable admin y se redirige al usuario.
    session_start();
    $_SESSION['compruebaAdmin'] = $comprobarAdmin;
    $_SESSION['timeout_duration'] = 60;
    $_SESSION['logeado'] = time();
    header("Location: index.php");
  }else{
    echo "<h1>USUARIO INCORRECTO</h1>";
  }
}

if(isset($_POST['nombreUsuario']) && isset($_POST['contrasena'])){
  $usuario = $_POST['nombreUsuario'];
  $contrasena = $_POST['contrasena'];
  comprobarUsuario($usuario, $contrasena);
}
?>

<html>
<head>

</head>
<body>
  <main>
    <h1>Login</h1>
    <form method="POST" action="#">
      <label for="nombreUsuario">Usuario</label>
      <input type="text" name="nombreUsuario">
      <label for="contrasena">Contraseña</label>
      <input type="text" name="contrasena">
      <button type="submit" name="enviar">Enviar</button>
    </form>
  </main>
</body>
</html>