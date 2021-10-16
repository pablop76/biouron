# Landing Page Biouron

![Biouron](./layout.jpg)

## użyte technologie.

1. html,css,js,php
2. program tworzący pakiety [gulp.js](https://gulpjs.com/)

3. platforma front-end do tworzenia szybkich i wydajnych interfejsów internetowych [uikit](https://getuikit.com/)

## niezbędne oprogramowanie.

1. środowisko wykonawcze [node.js](https://nodejs.org/en/)
2. IDE (zintegrowane środowisko programistyczne) np: [Visual Studio Code](https://code.visualstudio.com/)

## knfiguracja projektu.

1. pobranie paczkę z projektem [github](https://github.com/pablop76/biouron)
2. wypakować
3. otworzyc folder za pomoca IDE
4. otworzyć terminal w katalogu projektu
5. zainstalowac zależności za pomocą komendy:

- npm install

## praca z projektem

1. uruchomienie

- gulp
2. ustawienie serwera
- w pliku gulpfile.js należy ustawić ścieżke do folderu we własciwości proxy, jeżeli korzystamy np. z xamppa
lub zakomentować proxy i odkomentować 'server' jeżeli korzystamy z serwera node.

## pliki produkcyjne

- są tworzone w katalogu dist

## bug
- DEPRECATION WARNING: Using / for division is deprecated and will be removed in Dart Sass 2.0.0.
- Po zmianach w pliku json z opiniami należy zapisać "zmiany" w pliku _testimonial.html lub ponownie uruchomić polecenie gulp 
- wartości w pliku testimonial.json muszą być w jednej linii

