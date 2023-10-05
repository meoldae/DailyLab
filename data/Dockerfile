FROM python:3.11.4

WORKDIR /data

# 시간 설정
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

RUN echo Asia/Seoul > /etc/timezone

COPY . .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

EXPOSE 8181
# 서버 실행
ENTRYPOINT ["python","main.py"]