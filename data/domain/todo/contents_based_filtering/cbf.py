import pandas as pd

# filePath = '../../../dataset/'
filePath = 'dataset/'
cosine_similarity_matrix = pd.read_csv(filePath + 'cosine_similarity_matrix.csv', encoding='utf-8')

def printSim(A):
    return cosine_similarity_matrix[A]


def findDummy():
    firstList = [88, 3]
    topFiveRecords = [4, 18, 22, 90, 220]
    resultList = [0] * 290
    for record in topFiveRecords:
        resultList = resultList + printSim(str(record))

    for item in firstList:
        print(item)
        resultList = resultList.drop(item)

    resultList = resultList.sort_values(ascending=False)
    return resultList

print(findDummy())