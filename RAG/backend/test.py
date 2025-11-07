def pnumer():
    lpaire = []
    limpai = []
    liste = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    for i in liste:
        if i % 2 == 0:
            lpaire.append(i)
        else:
            limpai.append(i)
    return lpaire
print(pnumer())