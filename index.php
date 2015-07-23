<?php include('t4_code/header.php'); ?>
<!-- edit the left nav if you need to in header.php -->
<!-- override the css in new.css -->
<!-- this is the main page content -->

<?php include('_includes/Parsedown.php'); 

$Parsedown = new Parsedown();
$use = file_get_contents('_content/page.md'); 
echo $Parsedown->text($use);

?>






<!-- end editing here -->
<!-- jquery is added in the footer -->
<?php include('t4_code/footer.php'); ?>
