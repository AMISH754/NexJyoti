// Reading the Secure QR code on an Aadhaar (the big one, signed by UIDAI) on the joining page. The page only reads the
// digits; the Hub checks UIDAI's signature. The reader (zxing-wasm, about 1 MB) loads only when someone scans, and its
// .wasm is served from our own site.

let ready;
function reader() {
  if (!ready) {
    ready = Promise.all([import("zxing-wasm/reader"), import("zxing-wasm/reader/zxing_reader.wasm?url")]).then(([zx, wasm]) => {
      zx.prepareZXingModule({ overrides: { locateFile: (path, prefix) => (path.endsWith(".wasm") ? wasm.default : prefix + path) } });
      return zx;
    });
  }
  return ready;
}

const OPTIONS = { formats: ["QRCode"], tryHarder: true, maxNumberOfSymbols: 4 };

/* What QR codes an image has (a File, or ImageData from the camera) → { digits, old }. digits: the Secure QR (a long
 * run of digits), or null. old: the card only has the older, unsigned QR (XML), as on cards printed before 2019. */
export async function readAadhaarQr(image) {
  const { readBarcodes } = await reader();
  const results = await readBarcodes(image, OPTIONS);
  const hit = results.find((r) => /^\d{1000,}$/.test((r.text || "").trim()));
  return { digits: hit ? hit.text.trim() : null, old: !hit && results.some((r) => /<\?xml|PrintLetterBarcodeData/i.test(r.text || "")) };
}

/* Scans the camera until a Secure QR is found. onFound(digits) once; returns stop(). */
export function scanCamera(video, onFound, onError) {
  let stopped = false;
  let stream;
  const canvas = document.createElement("canvas");
  const tick = async () => {
    if (stopped) return;
    if (video.readyState >= 2 && video.videoWidth) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(video, 0, 0);
      try {
        const { digits } = await readAadhaarQr(ctx.getImageData(0, 0, canvas.width, canvas.height));
        if (digits && !stopped) { stop(); onFound(digits); return; }
      } catch { /* keep trying */ }
    }
    setTimeout(tick, 350);
  };
  const stop = () => {
    stopped = true;
    stream?.getTracks().forEach((t) => t.stop());
  };
  navigator.mediaDevices?.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } })
    .then((s) => {
      if (stopped) { s.getTracks().forEach((t) => t.stop()); return; }
      stream = s;
      video.srcObject = s;
      video.play().catch(() => {});
      reader().then(tick, onError);
    })
    .catch(() => onError(new Error("We couldn’t open your camera. Allow camera access, or upload a photo of the QR code instead.")));
  if (!navigator.mediaDevices) onError(new Error("This browser can’t use the camera here. Upload a photo of the QR code instead."));
  return stop;
}
