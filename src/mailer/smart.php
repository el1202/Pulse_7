<?php 

// задаем переменные, берем из index, во внутрь которых будем класть сообщения
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

// php скрипт
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// натсройка php скрипта
// $mail->isSMTP(); - настр почку, каждая почта имеет свой SMTP сервер
// SMTP сервер залогинится под нашу почту и будет отправлять почту как бы от себя

// $mail->SMTPDebug = 3;                      // Enable verbose debug output

$mail->isSMTP();                              // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers / smtp - сервир почт. ресурса для gmail, mail.ru и тд
$mail->SMTPAuth = true;                       // Enable SMTP authentication / будем входить в почту при помощи этого аккаунта
$mail->Username = '';                         // Наш логин
$mail->Password = '';                         // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                    // Enable TLS encryption, `ssl` also accepted / ssl - защита
$mail->Port = 465;                            // TCP port to connect to / порт почтю ресурса gmail, берем с тайта smtp gmail или smtp mail.ru
// настраиваем само письмо 
$mail->setFrom('', 'Pulse');   // От кого письмо / 'Pulse'- имя отправителя
$mail->addAddress('');     // Add a recipient / куда будет приходить письмо, ('') - вписываем адрес получателя
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML
// верстаем письмо
$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
	Имя: ' . $name . ' <br>
	Номер телефона: ' . $phone . '<br>
	E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>