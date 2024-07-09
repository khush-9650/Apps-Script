function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function capturePhoto(username, workflow, action, imageData) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var newRow = [new Date(), username, workflow, action, imageData];
vat one = 1;
    sheet.appendRow(newRow);

    return "Photo captured successfully!";
  } catch (e) {
    return "Error capturing photo: " + e.message;
  }
}

function recordData(username, workflow, action) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var newRow = [new Date(), username, workflow, action];
  sheet.appendRow(newRow);

  // Send confirmation email
  sendConfirmationEmail(username);
}

function sendConfirmationEmail(recipientEmail) {
  // var recipientEmail = "khushalv965@gmail.com"; // Update with the recipient's email address
  var subject = "Form Submission Confirmation";
  var message = "Dear " + recipientEmail + ",\n\nYour form has been successfully submitted. Thank you!";

  try {
    MailApp.sendEmail({
      to: recipientEmail,
      subject: subject,
      body: message
    });
    Logger.log("Confirmation email sent to " + recipientEmail);
  } catch (error) {
    Logger.log("Error sending confirmation email: " + error);
  }
}




