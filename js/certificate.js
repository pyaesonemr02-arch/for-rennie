/* =========================================
   LOVE CERTIFICATE PDF DOWNLOAD
========================================= */

document.getElementById("downloadCert")
.addEventListener("click",()=>{

    const element = document.querySelector(".certificate");

    const opt = {
        margin:1,
        filename:"Love_Certificate_Rennie.pdf",
        image:{ type:"jpeg", quality:0.98 },
        html2canvas:{ scale:2 },
        jsPDF:{ unit:"in", format:"letter", orientation:"portrait" }
    };

    html2pdf().set(opt).from(element).save();

});
