# Personality und Music Features

## Motivation

Unser Projekt erstellt ein individuelles **Music Personality Profile**, das aus zwei Informationsquellen entsteht:

1. **Persönlichkeitsmerkmalen des Nutzers**
2. **Audio Features von Songs, die der Nutzer angibt bzw. bewertet**

Die grundlegende Idee, diese beiden Informationsquellen gemeinsam zu betrachten, wird durch Cheng und Tang (2016) unterstützt. Die Autoren entwickeln ein hybrides Musikempfehlungssystem, das sowohl **akustische Eigenschaften von Songs (Content Information)** als auch **Persönlichkeitsmerkmale des Nutzers (Context Information)** berücksichtigt.

> **Quelle:** Cheng, R., & Tang, B. (2016). *A Music Recommendation System Based on Acoustic Features and User Personalities*. In *PAKDD 2016 Workshops*, LNAI 9794, 203–213. https://doi.org/10.1007/978-3-319-42996-0_17

## Ansatz von Cheng & Tang

Die Autoren beschreiben Musik unter anderem durch Audio Features aus drei Bereichen:

* **Timbral Texture:** z. B. MFCC, Spectral Centroid, Spectral Rolloff und Spectral Flux
* **Rhythmic Content:** rhythmische bzw. beatbezogene Merkmale
* **Pitch Content:** Merkmale der Tonhöhenstruktur

Für die Nutzer werden verschiedene Persönlichkeitsmerkmale erfasst. Anschließend werden die Informationen gemeinsam verwendet, um die Bewertung eines Songs durch einen bestimmten Nutzer vorherzusagen.

Vereinfacht lässt sich der Ansatz darstellen als:

```text
User Personality ──────┐
                       ├──> Recommendation / Rating Prediction
Song Audio Features ───┘
```

Damit betrachten die Autoren sowohl **Eigenschaften der Musik** als auch **Eigenschaften des Nutzers**, anstatt Musikpräferenzen ausschließlich aus vergangenen Nutzerbewertungen abzuleiten.

## Ergebnisse

Die Autoren vergleichen drei Varianten:

| Modell                  |        MAE | Direction Accuracy |
| ----------------------- | ---------: | -----------------: |
| Audio Features          |     0,8497 |             75,2 % |
| Personality Features    |     0,8866 |             77,9 % |
| **Audio + Personality** | **0,8149** |         **89,7 %** |

Der hybride Ansatz erzielte in ihrem Datensatz damit bessere Ergebnisse als die Verwendung von Audio Features oder Persönlichkeitsmerkmalen allein. Die Autoren berichten außerdem, dass Persönlichkeitsmerkmale insbesondere bei der Vorhersage der Präferenzrichtung hilfreich waren, während Audio Features stärker zur Genauigkeit der vorhergesagten Bewertungen beitrugen.

Dies liefert für unser Projekt eine **empirische Motivation dafür, Musik- und Persönlichkeitsinformationen gemeinsam zu berücksichtigen**.

## Übertragung auf unser Projekt

Unser Ziel unterscheidet sich jedoch wesentlich von dem von Cheng und Tang.

Die Autoren wollen:

```text
Personality + Song Features
            ↓
     Rating Prediction
            ↓
      „Gefällt der
       Nutzer Song X?“
```

Unser Projekt möchte dagegen:

```text
Personality
     +
Audio Features mehrerer bewerteter Songs
            ↓
   Music Personality Profile
            ↓
   ┌────────┴────────┐
   ↓                 ↓
 Image             Sound
```

Wir übernehmen daher **nicht den SVM/SVR-basierten Recommendation-Ansatz** und auch nicht das konkrete Ziel der Ratingvorhersage.

Stattdessen nutzen wir das Paper als wissenschaftliche Grundlage für die konzeptionelle Entscheidung, **Persönlichkeitsmerkmale und musikalische Eigenschaften gemeinsam in einer Repräsentation des Nutzers zu berücksichtigen**.

Die Audio Features der vom Nutzer bewerteten Songs sollen dabei zunächst zu einem individuellen Musikpräferenzprofil zusammengeführt werden. Dieses wird anschließend mit dem Persönlichkeitsprofil kombiniert.

### Abgrenzung und Limitation

Die Ergebnisse von Cheng und Tang zeigen nicht, dass sich Persönlichkeit direkt aus Audio Features bestimmen lässt. Sie zeigen lediglich, dass Persönlichkeitsinformationen zusammen mit Audio Features für die Vorhersage von Musikpräferenzen nützlich sein können.

Außerdem basiert die Studie auf einer vergleichsweise kleinen Stichprobe von **102 Nutzern, 120 Songs und 1.050 Bewertungen**. Die Autoren nennen die begrenzte Datengröße selbst als Limitation und schlagen eine Evaluation mit größeren Datensätzen als zukünftige Forschung vor.

Daher verwenden wir das Paper als **Begründung für die Kombination der beiden Informationsquellen**, nicht als Beweis für konkrete Zusammenhänge zwischen einzelnen Persönlichkeitsmerkmalen und einzelnen Audio Features.

## Relevanz für unsere Implementierung

Aus dem Paper übernehmen wir insbesondere folgende Prinzipien:

* Musik kann durch **quantitative Audio Features** beschrieben werden.
* Nutzer können zusätzlich durch **Persönlichkeitsmerkmale** beschrieben werden.
* Beide Informationsquellen können gemeinsam betrachtet werden.
* Audio Features und Personality können unterschiedliche Informationen über Musikpräferenzen beitragen.
* Audio Features sollten aufgrund unterschiedlicher Wertebereiche **normalisiert** werden.

Die konkrete Auswahl unserer Audio Features und die Frage, welche Zusammenhänge zwischen Persönlichkeit und Musik bestehen, müssen jedoch durch weitere Literatur begründet werden.
