document.getElementById('certificateForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var certificateType = document.getElementById('certificateType').value;
    
    // Generate certificate logic
    var certificateText = `This is to certify that ${name} has successfully obtained a ${certificateType} certificate.`;
    
    // Display certificate text in an alert (for demonstration)
    alert(certificateText);
  });
  