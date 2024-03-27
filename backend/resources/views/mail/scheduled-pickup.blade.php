<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pickup Scheduled Notification</title>
    <style>
        /* Simple styling for the email content */
        .container {
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 5px;
            font-family: Arial, sans-serif;
            max-width: 600px;
            margin: 0 auto;
        }
        h1 {
            color: #333;
        }
        p {
            color: #555;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Scheduled Pickup Notification</h1>
        <p>The following listing has been scheduled for pickup:</p>
        <ul>
            <li><strong>Title:</strong> {{ $listingTitle }}</li>
            <li><strong>ID:</strong> {{ $listingId }}</li>
            <li><strong>Scheduled By:</strong> {{ $scheduledBy }}</li>
        </ul>
    </div>
</body>
</html>
