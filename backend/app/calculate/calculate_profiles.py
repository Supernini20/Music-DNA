import json

with open(r"..\..\frontend\src\data\testData.json", "r", encoding="UTF-8") as file:
    data = json.load(file)


def calculate_big_five(data):
    answers = data["personality"]["answers"]

    ergebnisse = {
    "E": [],
    "V": [],
    "G": [],
    "N": [],
    "O": []
    }

    for item in answers:
        answer = item['answer']
        if item['polung'] == "-":
            answer = 6 - answer

        dimension = item['dimension']
        ergebnisse[dimension].append(answer)

    big_five_profile = {}

    for dimension, values in ergebnisse.items():
        if values:
            big_five_profile[dimension] = round(sum(values) / len(values), 2)

    return ergebnisse, big_five_profile

resultat = calculate_big_five(data)

print(resultat)
