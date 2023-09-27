FROM python:3.10
ENV PYTHONBUFFERED=1

WORKDIR /code 
COPY requirements.txt .

RUN pip install -r requirements.txt
COPY . .

CMD ["python3", "manage.py", "runserver"]