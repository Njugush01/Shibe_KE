<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Volunteer Registration</title>
    <style>
        /* Add your custom styles here */
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .content {
            margin-bottom: 20px;
        }

        .footer {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Food Link!</h1>
        </div>
        <div class="content">
            <p>Hi {{ $name }},</p>
            <p>Thank you for signing up to become a Food Linker!</p>
            <p>Use this password: <strong>{{ $password }}</strong> to log in to your account.</p>
            <p>You can change the password to your liking after log in under 'My Profile' section.</p>
        </div>
        <div class="footer">
            <p>If you have any questions, please contact us at support@foodlinker.com</p>
        </div>
    </div>
</body>
</html>

