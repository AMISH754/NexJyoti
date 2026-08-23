/**
 * Cloudinary Direct Upload Utility
 * Handles uploading image files directly from the browser to Cloudinary
 * using an unsigned upload preset.
 */

export async function uploadToCloudinary(file, folder = "") {
  const cloudName = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "").trim();
  const uploadPreset = (import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "").trim();

  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Cloudinary credentials missing in .env. Please check VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET, then refresh your browser (Ctrl+F5)."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  if (folder) {
    formData.append("folder", folder);
  }

  let response;
  try {
    response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
  } catch (netErr) {
    console.error("Cloudinary Network / Fetch Error:", netErr);
    throw new Error(
      "Network/CORS error while connecting to Cloudinary. Please disable any Ad-Blocker/Brave Shield, verify your Cloud Name ('" +
        cloudName +
        "'), and Hard Refresh the page (Ctrl + F5)."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error?.message || `Cloudinary upload failed (Status: ${response.status})`);
  }

  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
  };
}
