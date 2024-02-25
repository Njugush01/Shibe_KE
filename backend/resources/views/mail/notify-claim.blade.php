<!DOCTYPE html>
<html>
<head>
    <title>Listing Claimed</title>
</head>
<body>
    <p>Hello Admin,</p>
    <p>The listing with the title: {{ $listing->title }} and ID: {{ $listing->id }} has been claimed by {{ $user->name }}.</p>
</body>
</html>
