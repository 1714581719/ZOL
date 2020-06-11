<?php

include "conn.php";

// 检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from login where id='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

// 接收前端表提交的数据
if(isset($_POST['submit'])) {
    $username = $_POST['username'];
    $tel = $_POST['tel'];
    $password = sha1($_POST['password']); //给密码加密
    $conn->query("insert login values('$username','$password','$tel',NOW())");
    echo '<script>location.href="http://10.31.162.21/ZOL/src/login.html"</script>';
}