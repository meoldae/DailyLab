import pandas as pd

# filePath = '../../../dataset/'
filePath = 'dataset/'
cosine_similarity_matrix = pd.read_csv(filePath + 'cosine_similarity_matrix2.csv', encoding='utf-8')
allDf = pd.read_csv(filePath + 'ToDoVersion2.csv', encoding='euc-kr')
periodMatrix = allDf['period']
classificationMatrix = allDf['classification']


def printSim(A):
    return cosine_similarity_matrix[A]


def findDummy():
    firstList = [88, 3]
    topFiveRecords = [4, 18, 22, 90, 220]
    resultList = [0] * 290
    for record in topFiveRecords:
        resultList = resultList + printSim(str(record))

    for item in firstList:
        resultList = resultList.drop(item)

    resultList = resultList.sort_values(ascending=False)
    return resultList

def getPeriod(index):
    answer = 2
    if periodMatrix[index] == 0:
        answer = 180
    elif periodMatrix[index] == 1:
        answer = 15
    elif periodMatrix[index] == 2:
        answer = 7
    elif periodMatrix[index] == 5:
        answer = 5000
    return answer

def getClassification(index):
    return classificationMatrix[index]