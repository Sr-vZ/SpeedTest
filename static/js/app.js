const HTTP_TIMEOUT = 10000
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

async function logChunks(url, { signal }) {
    const response = await fetch(url, { signal });
    for await (const chunk of response.body) {
        // Do something with the chunk
        console.log(chunk)
    }
}

async function testSpeed() {
    test_stats_card.style.display = "block"
    document.getElementById("test_spinner").classList.remove("hidden")
    const downloadUrl = "/download";
    const uploadFile = await generateFile(5 * 1024 * 1024); // 25 MB

    // Measure download speed
    const downloadStart = performance.now();
    // await fetch(`/download-speed?url=${downloadUrl}`);
    res = await fetch(downloadUrl, {
        headers: {
            'Cache-Control': 'no-cache'
        }
    });
    const aborter = new AbortController();
    logChunks("/download", { signal: aborter.signal });
    const downloadEnd = performance.now();
    downloadedSize = parseInt(res.headers.get('Content-Length')) / 1024 / 1024
    const downloadSpeed = downloadedSize / ((downloadEnd - downloadStart) / 1000); // Convert to Mbps
    document.getElementById("download-speed").textContent = downloadSpeed.toFixed(2);

    // Measure upload speed
    const formData = new FormData();
    formData.append("file", uploadFile);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT);
    const uploadStart = performance.now();
    await fetch("/upload", {
        method: "POST",
        body: formData,
        // signal: controller.signal
    });
    const uploadEnd = performance.now();
    const uploadSpeed = 5 / ((uploadEnd - uploadStart) / 1000); // Convert to Mbps


    document.getElementById("upload-speed").textContent = uploadSpeed.toFixed(2);
    document.getElementById("test_spinner").classList.add("hidden")
    start_test.disabled = false
}