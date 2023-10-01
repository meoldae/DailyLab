import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# filePath = '../../../dataset/'
filePath = 'dataset/'
cosine_similarity_matrix = pd.read_csv(filePath + 'userCosineSimilarity.csv', encoding='utf-8')

def makeMatrix(matrix):
    data = []
    for value in matrix:
        row_data = [
            value.get("memberId", None),
            value.get("ageGroup", None),
            value.get("gender", None),
            value.get("mbtiA", None),
            value.get("mbtiB", None),
            value.get("mbtiC", None),
            value.get("mbtiD", None),
            value.get("job", None),
            value.get("religion", None),
        ]
        for i in range(1, 34):
            if i in value.get("hobbyList", []):
                hobby_value = 1
            else:
                hobby_value = 0
            row_data.append(hobby_value)
        data.append(row_data)

    columnNames = ['memberId', 'ageGroup', 'gender', 'I/E', 'S/N', 'F/T', 'P/J', 'job', 'religion']
    for i in range(1, 34):
        newColumn = f'hobby{i}'
        columnNames.append(newColumn)

    mdf = pd.DataFrame(data, columns=columnNames)

    return mdf

def calculateSim(matrix):
    x = matrix.iloc[:, 1:]
    cosineMatrix = cosine_similarity(x, x)
    cosineDf = pd.DataFrame(cosineMatrix, columns=matrix.iloc[:, 0], index=matrix.iloc[:, 0])
    cosineDf.to_csv(filePath + 'userCosineSimilarity.csv')

def findBest(A):
    cosine_similarity_df = pd.DataFrame(cosine_similarity_matrix)
    print(cosine_similarity_df)
    answer = cosine_similarity_df.sort_values(by=f'{A}', ascending=False)
    return answer['memberId'].values.tolist()