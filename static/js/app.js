const start_test = document.getElementById("start_test")
const test_stats_card = document.getElementById("test_stats_card")
test_stats_card.style.display = "none"
start_test.addEventListener("click", function () {
    start_test.disabled = true
    testSpeed()
})
async function generateFile(sizeInBytes) {
    const buffer = new Uint8Array(sizeInBytes);
    for (let i = 0; i < sizeInBytes; i++) {
        buffer[i] = Math.floor(Math.random() * 256);
    }
    return new Blob([buffer]);
}

async function testSpeed() {
    test_stats_card.style.display = "block"
    const downloadUrl = "/download";
    const uploadFile = await generateFile(25 * 1024 * 1024); // 25 MB

    // Measure download speed
    const downloadStart = performance.now();
    // await fetch(`/download-speed?url=${downloadUrl}`);
    await fetch(downloadUrl, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    const downloadEnd = performance.now();
    const downloadSpeed = 25 / ((downloadEnd - downloadStart) / 1000); // Convert to Mbps
    document.getElementById("download-speed").textContent = downloadSpeed.toFixed(2);

    // Measure upload speed
    const formData = new FormData();
    formData.append("file", uploadFile);

    const uploadStart = performance.now();
    await fetch("/upload", {
        method: "POST",
        body: formData,
    });
    const uploadEnd = performance.now();
    const uploadSpeed = 25 / ((uploadEnd - uploadStart) / 1000); // Convert to Mbps


    document.getElementById("upload-speed").textContent = uploadSpeed.toFixed(2);
    start_test.disabled = false
}