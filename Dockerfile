FROM python:latest

COPY static app/static
COPY templates app/templates
COPY main.py app/
COPY requirements.txt app/

RUN python3 -m pip install
RUN mkdir app/uploads