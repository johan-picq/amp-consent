import { CmpApi } from "@iabtechlabtcf/cmpapi";
const cmpApi = new CmpApi(6, 1, true);

console.log("cmp tcf", cmpApi);
function toRunOnConsent() {
  console.log("tcf here");
  // Récupérer les informations de consentement
  const tcData = getTcData();

  // Transmettre les informations de consentement à l'amp-iframe
  const iframe = document.querySelector("amp-iframe");
  if (iframe) {
    iframe.postMessage({ consent: tcData }, "*");
  }
}

function getTcData() {
  console.log("tcf", window.__tcfapi);
  return window.__tcfapi("getTCData", 2, function (tcData, success) {
    if (success) {
      console.log("tc data", tcData);
      return tcData;
    } else {
      console.log("Impossible de récupérer les informations de consentement.");
      return null;
    }
  });
}

function checkConsentReady() {
  const consentInstance = document.getElementById("consent");
  consentInstance.addEventListener("accept", toRunOnConsent);
  consentInstance.addEventListener("reject", toRunOnConsent);
  consentInstance.addEventListener("dismiss", toRunOnConsent);
}

checkConsentReady();
