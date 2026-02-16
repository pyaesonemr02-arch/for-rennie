/* =========================================
   DIRECT PDF DOWNLOAD + PRINT
========================================= */

const downloadBtn = document.getElementById("downloadCert");
const printBtn = document.getElementById("printCert");

downloadBtn.addEventListener("click", () => {
    triggerConfetti();

    const link = document.createElement("a");
    link.href = "assets/love-certificate.pdf";
    link.download = "Love_Certificate_Rennie.pdf";
    link.click();
});

printBtn.addEventListener("click", () => {
    const printWindow = window.open("assets/love-certificate.pdf");
    printWindow.onload = function () {
        printWindow.print();
    };
});
