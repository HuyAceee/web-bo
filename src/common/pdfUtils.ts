import jsPDF from 'jspdf'
import { FONT_FAMILY_PATH, FONT_NAME, FONT_WEIGHT_NAME, FONT_WITH_FORMAT, OPTIONS_CONFIG, PDF_FILE_NAME, XHTTP_METHOD } from '@/common/exportPdf'

export const printDownloadPdf = async (exportPdfRef: any) => {
    if (!exportPdfRef) return
    const doc = new jsPDF()
    const contentHtml = exportPdfRef?.innerHTML
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const font = xhttp.responseText
        doc.addFileToVFS(FONT_WITH_FORMAT.pretendard, font)
        doc.addFont(FONT_WITH_FORMAT.pretendard, FONT_NAME.pretendard, FONT_WEIGHT_NAME.normal)
        doc.setFont(FONT_NAME.pretendard)
        doc.html(contentHtml, {
          callback: function (doc) {
            doc.save(PDF_FILE_NAME.deliveryReceipt)
          },
          ...OPTIONS_CONFIG
        })
      }
    }
    xhttp.open(XHTTP_METHOD.get, window?.location?.protocol + '//' + window.location.host + FONT_FAMILY_PATH.pretendardRegularNormal, true)
    xhttp.send()
  }