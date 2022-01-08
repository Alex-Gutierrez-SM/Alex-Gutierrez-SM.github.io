<?php  
include ("conexion.php");
$bd = new BaseDatos();
$conexion = $bd-> conectar();

//Función para añadir usuarios a la base de datos.
function aniadirUsuario($usuario, $contrasena, $admin) {
    global $bd;
    $sql = "INSERT INTO usuario (UserName, Pass, Administrador) VALUES ('$usuario','$contrasena','$admin')";
    $bd -> insertar($sql);
}

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

//Comprueba si se han rellenado el nombre y contraseña, y los añade a la base de datos.
if(isset($_POST['nombreUsuario']) && isset($_POST['contrasena'])){
    $usuario = $_POST['nombreUsuario'];
    $contrasena = $_POST['contrasena'];
    $admin = "";
    //Si el checkbox de "admin" está marcado, se manda un 1 a la base de datos. Si no, se manda un 0.
    if(isset($_POST['admin'])){
        $admin = 1;
    }else{
        $admin = 0;
    }
    aniadirUsuario ($usuario, $contrasena, $admin);
    header('Location: index.php');
}

?>

<html>
<head>

</head>
<body>
    <h1>Crear Usuario</h1>
    <form method="POST" action="#">
      <label for="nombreUsuario">Usuario</label>
      <input type="text" name="nombreUsuario">
      <label for="contrasena">Contraseña</label>
      <input type="text" name="contrasena">
      <label for="admin">Admin</label>
      <input type="checkbox" name="admin">
      <button type="submit" name="enviar">Enviar</button>
    </form>
</body>
</html>