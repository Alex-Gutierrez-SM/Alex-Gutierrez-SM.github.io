<?php  
include ("conexion.php");
$bd = new BaseDatos();
$conexion = $bd-> conectar();

function eliminarUsuario($userName) {
    global $bd;
    $sql = "DELETE FROM usuario WHERE UserName='$userName'";
    $bd -> eliminar($sql);
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

//En caso de clicar el botón de eliminar, se elimina el usuario seleccionado.
if(isset($_POST['eliminar'])) {
    $userName = $_POST['eliminar'];
    eliminarUsuario($userName);
}
?>

<html>
<head>

</head>
<body>
    <h1>Usuarios:</h1>
    <table>
        <tr>
            <td>Nombre</td>
            <td>Apellidos</td>
            <td>UserName</td>
            <td>Password</td>
            <td>Admin</td>
        </tr>
    <?php
        $result = $bd -> seleccionar('SELECT * FROM usuario');
        while ($arrayResult = $result -> fetch_assoc()){
            echo "<tr>";
            echo "<td>".$arrayResult['Nombre']."</td>";
            echo "<td>".$arrayResult['Apellidos']."</td>";
            echo "<td>".$arrayResult['UserName']."</td>";
            echo "<td>".$arrayResult['Pass']."</td>";
            echo "<td>".$arrayResult['Administrador']."</td>";
            echo '<form method="POST" action="#">';
            echo '<td><button type="submit" name="eliminar" value="'.$arrayResult['UserName'].'">Eliminar</button></td>';
            echo "</form>";
            echo "</tr>";
        }
    ?>
    </table>
</body>
</html>