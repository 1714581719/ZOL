<?php

include 'conn.php';

if(isset($_POST['arrsid'])) {
    $arr = $_POST['arrsid'];
    $data = array();
    foreach($arr as $key => $value){
        $result = $conn->query("select * from goods_all where id='{$value}'");
        $data[] = $result->fetch_assoc();
    }
    echo json_encode($data);
}