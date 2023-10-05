from domain.member.filtering import filtering

def makeMatrix(memberInfo):
    matrix = filtering.makeMatrix(memberInfo)
    filtering.calculateSim(matrix)
    return matrix