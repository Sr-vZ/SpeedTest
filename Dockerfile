FROM python:3.11-slim

COPY static app/static
COPY templates app/templates
COPY main.py app/
COPY requirements.txt app/

WORKDIR /app/

RUN python3 -m pip install -r requirements.txt
RUN mkdir uploads

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload"]