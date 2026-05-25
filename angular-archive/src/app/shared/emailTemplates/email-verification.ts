export const EMAIL_VERIFICATION_TEMPLATE = (visitorName: string, verificationLink: string) => `
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            width: 100%;
            background-color: #f7f7f7;
            padding: 20px 0;
        }
        .content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: $borderRadius;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .body {
            padding: 30px;
            text-align: center;
            color: #333333;
        }
        .body p {
            margin: 20px 0;
            font-size: 16px;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            font-size: 16px;
            border-radius: $borderRadius;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            padding: 15px;
            background-color: #f7f7f7;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='content'>
            <div class='header'>
                <h2>Welcome to PiSquare360</h2>
            </div>
            <div class='body'>
                <h3>Email Verification</h3>
                <p>Please confirm your email address to complete your registration.</p>
                <p>Click the button below to verify your email:</p>
                <a href='${verificationLink}' class='button'>Verify Email Address</a>
                <p>If you did not sign up for this account, please ignore this email.</p>
            </div>
        </div>
        <div class='footer'>
            © 2024 PiSquare360. All rights reserved.
        </div>
    </div>
</body>
</html>
`

export const VERIFiCATION_BODY =  `<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <title>Email Verified</title>
    <style>
        body {
            /* font-family: Arial, sans-serif; */
            margin: 0;
            padding: 0;
            background-color: #f7f7f7;
        }
        .container {
            width: 100%;
            background-color: #f7f7f7;
            padding: 20px 0;
        }
        .content {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: $borderRadius;
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }
        .body {
            padding: 30px;
            text-align: center;
            color: #333333;
        }
        .body p {
            margin: 20px 0;
            font-size: 16px;
        }
        .button {
            display: inline-block;
            padding: 15px 30px;
            margin: 20px 0;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            font-size: 16px;
            border-radius: $borderRadius;
        }
        .footer {
            text-align: center;
            font-size: 14px;
            color: #777777;
            padding: 15px;
            background-color: #f7f7f7;
        }
    </style>
</head>
<body>
    <div class='container'>
        <div class='content'>
            <div class='header'>
                <h2>Email Verified Successfully!</h2>
            </div>
            <div class='body'>
                <h3>Thank you for verifying your email</h3>
                <p>Your email address has been successfully verified. You can now fully enjoy our services.</p>
                <p>If you have any questions, feel free to reach out to us.</p>

            </div>
        </div>
        <div class='footer'>
            © 2024 PiSquare360. All rights reserved.
        </div>
    </div>
</body>
</html>
`
