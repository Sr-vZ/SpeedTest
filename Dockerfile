FROM python:latest

COPY static app/static
COPY templates app/templates
COPY main.py app/
COPY requirements.txt app/

WORKDIR app/

RUN python3 -m pip install -r requirements.txt
RUN mkdir uploads

CMD ["uvicorn", "main:app", "--reload"]

