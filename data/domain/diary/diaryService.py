import openai
import config
from datetime import datetime

openai.api_key = config.OPENAI_API_KEY

def createDiary(param, gpt_model):
    builder = DiaryContentBuilder(param)
    content = builder.build()

    todo_list = []
    sorted_todos = sorted(param["todos"], key=lambda x: x["date"] if x["date"] is not None else [0])
    for todo in sorted_todos:
        if todo["date"] is None:
            date_status = "(수행 하지 않음)"
        else:
            hour, minute = todo["date"][3], todo["date"][4]
            date_status = f"({hour}시 {minute}분 수행함)"
        todo_str = f"{todo['task']} - {date_status}"
        todo_list.append(todo_str)

    user_content = (
        "해야할 일\n" + 
        "\n".join(todo_list) + "\n\n" +
        "너에게 주어진 역할을 기반으로 해야할 일을 수행했을 때, 1인칭 시점의 일기를 작성해줘. 단, 날짜는 작성하지마"
    )

    response = openai.ChatCompletion.create(
        model=gpt_model,
            messages=[
            {"role": "system", "content": content},
            {"role": "user", "content": user_content
            }, 
        ], 

        temperature=0.8, # 상상력
        max_tokens=1500, # 반환 받을 문장 size => 비용
        top_p=0.8, # 답변의 무작위성, 낮을 수록 답변이 정확하고, 높을 수록 창의적
        frequency_penalty=0.0, # 특정 단어나 phrase 를 포함하지 않도록. -2~2 까지 조정 가능한테, 2에 가까울수록 penalty 가 커진다
        presence_penalty=0.0, # 반복적이지 않은 텍스트를 생성하도록 유도. 반복되며 penalty 부여되며 2에 가까울수록 penalty 가 커진다
    )
    return response['choices'][0]['message']['content']

class DiaryContentBuilder:
    def __init__(self, param):
        self.param = param
        self.content = "당신은 다음과 같은 특징을 가진 사람이야\n"

    def _add_gender(self):
        gender_map = {
            'M': "성별: 남자\n",
            'F': "성별: 여자\n"
        }
        self.content += gender_map.get(self.param.get('gender'), '')

    def _add_birthday(self):
        if self.param.get('birthday'):
            self.content += "생년월일: {0}-{1:02}-{2:02}\n".format(*self.param['birthday'])

    def _add_job(self):
        if self.param.get('job'):
            self.content += "직업: {}\n".format(self.param['job'])

    def _add_goal(self):
        if self.param.get('goal'):
            self.content += "이루고 싶은 목표: {}\n".format(self.param['goal'])

    def _add_religion(self):
        if self.param.get('religion'):
            self.content += "종교: {}\n".format(self.param['religion'])

    def _add_age(self):
        if self.param.get('birthday'):
            current_year = datetime.now().year
            birth_year = self.param['birthday'][0]
            age = current_year - birth_year
            self.content += "나이: {}세\n".format(age)

    def build(self):
        self._add_gender()
        self._add_birthday()
        self._add_age()  # 나이를 추가하기 위해 이 메서드를 호출
        self._add_job()
        self._add_goal()
        self._add_religion()
        return self.content