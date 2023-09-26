import openai
import config
from datetime import datetime

openai.api_key = config.OPENAI_API_KEY

def createDiary(param, gpt_model):
    builder = DiaryContentBuilder(param)
    user_info = builder.build()

    todo_list = build_todo_list(param["todos"], gpt_model)
    
    content = (
        "당신은 한 사람의 완벽한 하루를 위해 연구하는 연구원이야. 주어진 내용을 토대로 관찰일지를 작성해줘"
    )

    user_content = (
        user_info + "\n" + 
        "오늘 할 일\n" + 
        "\n".join(todo_list) + "\n\n" +

        "너에게 주어진 역할을 기반으로, 다음의 양식으로 관찰일지를 작성해줘. \n" +
        "1. 읽고 싶게 자극적인 기사처럼 제목을 작성해줘. \n"
        "2. 오늘 할 일의 수행 여부, 감정 상태에 따라 관찰일지를 작성해줘. 단, 시간은 분 단위는 사용하지마. \n"
        "3. 성별, 나이, 생년월일은 보고서에 직접 사용 하지마. \n" +
        
        "title: \n" +
        "content: \n" +
        # "재료: 관찰일지에 사용된 할 일, 감정들을 기술합니다. \n" + 
        "관찰 내용: 할 일과 감정을 기반으로 관찰 결과를 기술합니다. \n" +
        "결론: 관찰 및 분석 결과를 기술합니다. \n" + 
        "조언 및 추천: 관찰 결론을 기반으로 관찰 대상에게 향후 방향성에 대해 추천하고 기술 합니다. "
    )

    print(user_content)
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
    data = response['choices'][0]['message']['content']

    clean_data = data.replace('\n', ' ')
    title_start = clean_data.find("title: ") + len("title: ")
    content_start = clean_data.find("content: ")

    title = clean_data[title_start:content_start].strip()
    content = clean_data[content_start + len("content: "):].strip()

    res = {
        "title": title,
        "content": content
    }

    return res

def build_todo_list(todos, gpt_model):
    todo_list = []
    sorted_todos = sorted(todos, key=lambda x: x["date"] if x["date"] is not None else [0])
    
    for todo in sorted_todos:
        todo_str = todo['task']
        
        if gpt_model == "gpt-3.5-turbo-16k":
            if todo["date"] is None:
                date_status = "(수행 하지 않음)"
            else:
                hour, minute = todo["date"][3], todo["date"][4]
                date_status = f"({hour}시 {minute}분 수행함)"
            todo_str += f" - {date_status}"
            
        todo_list.append(todo_str)

    return todo_list

class DiaryContentBuilder:
    def __init__(self, param):
        self.param = param
        self.content = "오늘 관찰일지 보고서를 작성할 사람은 다음과 같아. \n"

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