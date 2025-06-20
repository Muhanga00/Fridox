function generatePDF() {
  const head = document.getElementById('docHead').value.trim();
  const subHead = document.getElementById('subHead').value.trim();
  const body = document.getElementById('docBody').value.trim();
  const date = document.getElementById('docDate').value.trim();
  const signature = document.getElementById('docSignature').value.trim();
  const logoInput = document.getElementById('logoInput');
  const output = document.getElementById('pdfDocument');

  // Clear previous
  output.innerHTML = '';

  // Create wrapper
  const wrapper = document.createElement('div');

  // Add logo (if exists)
  if (logoInput.files.length > 0) {
    const img = document.createElement('img');
    img.style.maxWidth = '120px';
    img.style.margin = '0 auto 20px';
    img.style.display = 'block';

    const reader = new FileReader();
    reader.onload = function(e) {
      img.src = e.target.result;
      wrapper.appendChild(img);
      finishBuild();
    };
    reader.readAsDataURL(logoInput.files[0]);
  } else {
    finishBuild();
  }

  function finishBuild() {
    if (head) {
      const h1 = document.createElement('h1');
      h1.textContent = head;
      wrapper.appendChild(h1);
    }

    if (subHead) {
      const h2 = document.createElement('h2');
      h2.textContent = subHead;
      h2.style.marginBottom = '20px';
      wrapper.appendChild(h2);
    }

    // Body
    const paragraphs = body.split('\n');
    paragraphs.forEach(p => {
      if (p.trim()) {
        const para = document.createElement('p');
        para.textContent = p.trim();
        para.style.marginBottom = '12px';
        wrapper.appendChild(para);
      }
    });

    // Date
    if (date) {
      const dateElem = document.createElement('p');
      dateElem.textContent = `Date: ${date}`;
      dateElem.style.marginTop = '40px';
      wrapper.appendChild(dateElem);
    }

    // Signature
    if (signature) {
      const signElem = document.createElement('p');
      signElem.textContent = `Signed by: ${signature}`;
      signElem.style.marginTop = '10px';
      wrapper.appendChild(signElem);
    }

    output.appendChild(wrapper);
    document.getElementById('outputContainer').style.display = 'block';

    // Download PDF
    const opt = {
      margin:       0,
      filename:     `Fridox_Document_${Date.now()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(output).save();
  }
}