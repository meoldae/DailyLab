from sklearn import decomposition
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

# filePath = '../../../dataset/'
filePath = 'dataset/'

# csv 파일 읽기
ds = pd.read_csv(filePath + 'ToDoVer1.csv', encoding='utf-8')

# 읽은 csv 파일에서 특정 열만 선택해서 배열에 저장
x = ds.iloc[:, [4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]].values

# PCA (차원 축소)
pca = decomposition.PCA(n_components=2)  # 주성분 2개로 설정
pc = pca.fit_transform(x)

# DataFrame화
pc_df = pd.DataFrame(data=pc, columns=['PC1', 'PC2'])