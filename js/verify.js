// Assuming you have a function for handling file download
function handleFileDownload(fileuri) {
    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', fileuri);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status === 200) {
            document.getElementById("downloadbtn").href = fileuri;
            document.getElementById("downloadbtn").style.display = "inline";

            document.getElementById("comparisionFilehash").style.display = "block";
        } else {
            console.error("Failed to load the file.");
        }
    };
}
