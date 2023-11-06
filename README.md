# SpeedTest
A simple internet SpeedTest app similar to Okla or Google Speedtest

<p align="center" width="100%">
    <img width="33%" src="/static/img/SpeedTest%20Logo.jpg">
</p>

## Overview

This is a Speed Testing App created using Python FastAPI for the backend and JavaScript with Tailwind CSS for the front end. This application allows users to test their internet connection's speed, including download and upload speeds, and view the results in a user-friendly interface. You can run this app both locally and deploy it on a server.

## Features

- Test internet connection speed.
- Display real-time download and upload speed results.
- User-friendly interface with visual feedback.
- Responsive design thanks to Tailwind CSS.

## Installation and Deployment

Follow these steps to set up and deploy the Speed Testing App:

### Local Installation

1. Clone the repository:

```bash
  git clone https://github.com/your-username/speed-testing-app.git
```
2. Change to the project directory:

```bash
  cd speed-testing-app
```
3. Install the required Python packages:

```bash
  pip install -r requirements.txt
```
4. Start the FastAPI server:

```bash
  uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
5. Access the app in your web browser at `http://localhost:8000`.

# Server Deployment
To deploy the app on a server, you can use any platform or server of your choice, such as AWS, Heroku, or Docker. Refer to the deployment documentation for detailed instructions on deploying the app to a server.

# Usage
Open the app in your web browser.
Click the "Start Test" button to begin the speed test.
The app will display real-time download and upload speed results.
Once the test is complete, you can view the results on the screen.

# Technologies Used
- Backend: Python FastAPI
- Frontend: JavaScript, Tailwind CSS

