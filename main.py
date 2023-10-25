from fastapi import FastAPI, Request, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse, StreamingResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse
import aiohttp
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
import os
import shutil
import logging
import uvicorn
from io import BytesIO

app = FastAPI()
# Configure logging
logging.basicConfig(
    filename="file_transfer.log",
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")
# Directory to store uploaded files
upload_dir = "uploads"

# payload_file = "./payload.zip"

# Ensure the directory exists
os.makedirs(upload_dir, exist_ok=True)


# # TODO: remove it later
# @app.get("/")
# async def root():
#     # return templates.TemplateResponse('index.html')
#     return {"message": "Hello World"}


@app.get("/healthcheck")
async def healthcheck():
    return {"status": "Running"}


@app.get("/download")
async def download():
    file_path = "payload.zip"
    with open(file_path, "wb") as f:
        f.write(os.urandom(5 * 1024 * 1024))
    if os.path.exists(file_path):
        logger.info("File served")
        return FileResponse(file_path)
    else:
        logger.warning("File not found for download")
        raise HTTPException(status_code=404, detail="File not found")


@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Save the uploaded file to the server
        with open(f"{upload_dir}/{file.filename}", "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Log the details of the file transfer
        logger.info(f"File uploaded: {file.filename}")

        return {"message": "File uploaded successfully"}
    except Exception as e:
        logger.error(f"File upload failed: {str(e)}")
        raise HTTPException(status_code=500, detail="File upload failed")


# TODO : Move it to top level


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("index.html", context)


# Add trusted host middleware to protect against host header attacks.
app.add_middleware(TrustedHostMiddleware, allowed_hosts=["localhost"])


async def generate_download_payload():
    payload_size = 25 * 1024 * 1024  # 25 MB
    payload = b"\0" * payload_size  # Creating a 25 MB payload of null bytes
    return StreamingResponse(BytesIO(payload), media_type="application/octet-stream")


if __name__ == "__main__":
    logger.info("app started")
