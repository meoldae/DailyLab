import pandas as pd
import random

# csv 파일 읽기
cosine_similarity_matrix = pd.read_csv('../../../dataset/cosine_similarity_matrix.csv', encoding='utf-8')

random_number_list = []
most_similar_list = []
most_unsimilar_list = []

for randomNum in range(5):
    random_number = random.randint(0, 289)
    random_number_list.append(random_number)

    for index, row in cosine_similarity_matrix.iterrows():
        if index != random_number:
            similarity = row[str(random_number)]
            most_similar_list.append((index, similarity))

most_similar_list.sort(key=lambda  x: x[1], reverse=True)
most_unsimilar_list = sorted(most_similar_list, key=lambda x: x[1], reverse=False)

ds = pd.read_csv('../../../dataset/ToDoVer1.csv', encoding = 'utf-8')
x = ds.iloc[:, [0, 1, 2]].values

for random_number in random_number_list:
    print("기존 : " + x[random_number])

    for idx in range(5):
        print("추천 : " + x[most_similar_list[idx][0]])
        print("비추천 : " + x[most_unsimilar_list[idx][0]])

    print()

print(random_number_list)

print(most_similar_list)
print(most_unsimilar_list)