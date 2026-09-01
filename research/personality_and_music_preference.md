# Wissenschaftliche Grundlage: Persönlichkeit und Musikpräferenzen

## Motivation

Unser Projekt erstellt ein individuelles **Music Personality Profile** aus zwei Informationsquellen:

- den Persönlichkeitsmerkmalen des Nutzers
- den musikalischen Eigenschaften von Songs, die der Nutzer angibt bzw. bewertet

Die Kombination dieser beiden Informationsquellen soll wissenschaftlich begründet werden.

## Zusammenhang zwischen Persönlichkeit und Musikpräferenzen

Rentfrow und Gosling (2003) untersuchten in sechs Studien mit insgesamt mehr als 3.500 Personen individuelle Unterschiede in Musikpräferenzen und deren Zusammenhang mit Persönlichkeit. Die Untersuchungen ergaben vier übergeordnete Musikpräferenz-Dimensionen:

- **Reflective & Complex**
- **Intense & Rebellious**
- **Upbeat & Conventional**
- **Energetic & Rhythmic**

Die Präferenzen für diese Dimensionen zeigten Zusammenhänge mit verschiedenen Persönlichkeitsmerkmalen, Selbstbildern und kognitiven Fähigkeiten. Damit liefert die Studie eine wichtige Grundlage für die Annahme, dass Musikpräferenzen und Persönlichkeitsmerkmale nicht unabhängig voneinander betrachtet werden müssen.

> Rentfrow, P. J., & Gosling, S. D. (2003). _The do re mi's of everyday life: The structure and personality correlates of music preferences_. Journal of Personality and Social Psychology, 84(6), 1236–1256. DOI: 10.1037/0022-3514.84.6.1236.

## Mehrdimensionale Beschreibung von Musikpräferenzen

Rentfrow, Goldberg und Levitin (2011) entwickelten das Konzept weiter und untersuchten Musikpräferenzen anhand von Bewertungen konkreter Musikausschnitte. In drei unabhängigen Studien fanden sie eine genreübergreifende Fünf-Faktoren-Struktur, das sogenannte **MUSIC-Modell**:

| Dimension         | Charakterisierung                                |
| ----------------- | ------------------------------------------------ |
| **Mellow**        | entspannend, ruhig, langsam, romantisch          |
| **Unpretentious** | weich, akustisch, unkompliziert, wenig aggressiv |
| **Sophisticated** | komplex, dynamisch, inspirierend                 |
| **Intense**       | laut, verzerrt, aggressiv, energiereich          |
| **Contemporary**  | rhythmisch, perkussiv, elektrisch                |

Die Faktoren sind damit nicht lediglich als Genres zu verstehen. Die Autoren zeigen, dass auch wahrgenommene musikalische Attribute zur Erklärung der Präferenzdimensionen beitragen.

> Rentfrow, P. J., Goldberg, L. R., & Levitin, D. J. (2011). _The Structure of Musical Preferences: A Five-Factor Model_. Journal of Personality and Social Psychology, 100(6), 1139–1157. DOI: 10.1037/a0022406.

## Verbindung zu unserem Projekt

Die beiden Arbeiten liefern unterschiedliche, sich ergänzende Grundlagen für unser Konzept:

```text
Rentfrow & Gosling (2003)
Personality
      ↕
Music Preferences

Rentfrow et al. (2011)
Music Preferences
      ↕
Musical / perceptual attributes

Cheng & Tang (2016)
Personality + Audio Features
          ↓
   Music Preference Prediction

                ↓

         Unser Projekt
Personality + Audio Features
          ↓
 Music Personality Profile
```

Wir übernehmen dabei **nicht direkt die Modelle der genannten Arbeiten**. Insbesondere verfolgen wir nicht das Ziel, die Persönlichkeit einer Person aus ihrer Musik zu bestimmen.

Stattdessen nutzen wir die Literatur als Grundlage für die Annahme, dass **Persönlichkeitsmerkmale und musikalische Präferenzen komplementäre Informationen über einen Nutzer darstellen können**.

Die von uns extrahierten Audio Features beschreiben dabei die Songs auf Signalebene. Aus mehreren vom Nutzer bewerteten Songs soll daraus ein individuelles Musikprofil entstehen. Dieses Musikprofil wird anschließend gemeinsam mit dem Persönlichkeitsprofil für die Generierung unseres Music Personality Profiles verwendet.

## Abgrenzung

Die Literatur rechtfertigt keine deterministischen Regeln wie:

```text
Openness = hoch → Person hört Jazz
```

oder

```text
hohe Openness → Spectral Centroid = hoch
```

Die beschriebenen Zusammenhänge sind statistische Zusammenhänge zwischen Persönlichkeitsmerkmalen und Musikpräferenzen. Die Effekte sind zudem vergleichsweise klein und nicht als individuelle Vorhersageregeln zu interpretieren.

Daher verwenden wir die Literatur primär zur **Begründung der Kombination von Personality und Music Features**, während die konkrete Transformation unserer Audio Features in ein Music Personality Profile Teil unserer eigenen Implementierung ist.

## Konsequenz für die Implementierung

Unser Profil soll daher mindestens zwei getrennte Komponenten enthalten:

```text
Personality Profile
        +
Music Preference Profile
        ↓
Music Personality Profile
```

Das Music Preference Profile wird aus den Audio Features der vom Nutzer bewerteten Songs aggregiert. Die genaue Auswahl, Normalisierung und Gewichtung der Audio Features wird durch weitere Literatur und technische Überlegungen festgelegt.

Das Personality Profile wird über einen geeigneten Persönlichkeitsfragebogen ermittelt.

Die beiden Profile werden anschließend nicht als wissenschaftlich bewiesene direkte Abbildung voneinander verstanden, sondern als **komplementäre Beschreibungen derselben Person**.
