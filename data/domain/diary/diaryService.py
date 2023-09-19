import openai

openai.api_key = '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' # 디에고

def createDiary():
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
            messages=[
            {"role": "system", "content": "당신은 다음과 같은 특징을 가진 사람이야\n"
                                        # "성격:내향형\n"
                                        "성별: 남자\n"
                                        "생년월일: 1995-02-06\n"
                                        # "이루고 싶은 목표: 취업하기\n"
                                        # "좋아하는 음식: 피자\n"
                                        # "좋아하는 여행지: 뉴욕\n"
                                        },
            {"role": "user",
            "content":                 
                    "해야할 일\n"
                    "1.한화투자증권 자소서 완성\n"
                    "2.공통 이력서 첨삭\n"
                    "3.비타민 검색하기\n"
                    "4.두부먹기\n"
                    
                    "너에게 주어진 역할과 말투를 기반으로 해야할 일을 수행했을 때, 1인칭 시점의 2023년 9월 5일 일기를 작성해줘"
            }, 
        ], 

        temperature=0.8, # 상상력
        max_tokens=1500, # 반환 받을 문장 size => 비용
        top_p=0.8, # 답변의 무작위성, 낮을 수록 답변이 정확하고, 높을 수록 창의적
        frequency_penalty=0.0, # 특정 단어나 phrase 를 포함하지 않도록. -2~2 까지 조정 가능한테, 2에 가까울수록 penalty 가 커진다
        presence_penalty=0.0, # 반복적이지 않은 텍스트를 생성하도록 유도. 반복되며 penalty 부여되며 2에 가까울수록 penalty 가 커진다
    )

    print(response)
    print(response['choices'][0]['message']['content'])

    return response

