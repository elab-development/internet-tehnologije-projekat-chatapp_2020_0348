<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Export Chat</title>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Chat: {{ $chat->name }}</h1>
    <table>
        <thead>
            <tr>
                <th>User ID</th>
                <th>Message</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($chat->messages as $message)
                <tr>
                    <td>{{ $message->user_id }}</td>
                    <td>{{ $message->text }}</td>
                    <td>{{ $message->created_at->format('Y-m-d H:i:s') }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>
