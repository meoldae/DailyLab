from sklearn import decomposition
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

filePath = '../../../dataset/'

def load_data():
    df_todos = pd.read_csv(filePath + 'ToDoVer1.csv', encoding='utf-8')


# csv 파일 읽기
ds = pd.read_csv(filePath + 'ToDoVer1.csv', encoding='utf-8')

# 읽은 csv 파일에서 특정 열만 선택해서 배열에 저장
x = ds.iloc[:, [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]].values
df = pd.DataFrame(data=x)

# PCA (차원 축소)
pca = decomposition.PCA(n_components=2)  # 주성분 2개로 설정
pc = pca.fit_transform(x)

# DataFrame화
pc_df = pd.DataFrame(data=pc, columns=['PC1', 'PC2'])

# Cosine 유사도 계산
cosine_similarity_matrix = cosine_similarity(pc_df)
cosine_similarity_matrix2 = cosine_similarity(df, df)

# DataFrame화
cosine_similarity_df = pd.DataFrame(cosine_similarity_matrix, columns=pc_df.index, index=pc_df.index)
cosine_similarity_df2 = pd.DataFrame(cosine_similarity_matrix2, columns=df.index, index=df.index)
print(cosine_similarity_df)
print(cosine_similarity_df2)

cosine_similarity_df2.to_csv(filePath + 'cosine_similarity_matrix.csv', index=False)

