MonsterSid
==========
PL:
<div>
  Aby dodać informację o plikach cookies na swojej witrynie wystarczy, że w sekcji <head> swojej strony dodasz:<br>
  &lt;script src="//rawgithub.com/Sieciech/MonsterSid/master/MonsterSid.js">&lt;/script>
</div>
plik musi być hostowany na rawgithub.com a nie raw.github.com, gdyż ma niewłaśicwy typ MIME i scrypt nie jest wykonywany.

Skrypt od wersji 2.0 (25.10.2015) obsługuje motywy:
* old - stary motyw
* classic - poprawiony stary motyw
* black - czarny motyw
* fire - czerwony motyw
* fufel - czarny motyw, niebieskie przyciski
* fufle - czarnobiały motyw, niebieskie przyciski
* panda - czarnobiały motyw
* zspworld - zielony motyw
* zspworld-up - zielony motyw - komunikat na górze

Aby ustawić motyw wystarczy zdefiniować zmienną <code>MonsterTheme</code> np:
<code>var MonsterTheme = 'panda';</code>

Można także ustawić wysokość komunikato względem wysokości ekranu np, żeby po rozwinięciu miało maksymalnie 25% wysokości wystarczy ustawić zmienną MonsterHeight:
<code>var MonsterHeight = 0.25;</code>
Aby zajmowało maksymalną wysokość wystarczy ustawić wartość na <code>false</code>, zalecane jedynie przy komunikatach na górze strony:
<code>var MonsterHeight = false;</code>


EN:
<div>
  To add information about cookie files on your site to add to your web page:<br>
  &lt;script src="//rawgithub.com/Sieciech/MonsterSid/master/MonsterSid.js">&lt;/script>
</div>
File must be hosted on rawgithub.com, because on raw.github.com script has text/plain mimetype.

Skrypt since version 2.0 (25.10.2015) support themes:
* old - old theme
* classic - upgraded old theme
* black - dark theme
* fire - red theme
* fufel - black theme, blue buttons
* fufle - black and white theme, blue buttons
* panda - black and white theme
* zspworld - green theme
* zspworld-up - green theme - message on top

For set theme you must just define variable <code>MonsterTheme</code> ex:
<code>var MonsterTheme = 'panda';</code>

You can set height too, just define <code>MonsterHeight</code> float variable, if you want get max 25% of window height define var:
<code>var MonsterHeight = 0.25;</code>
If you want to set max height just set <code>false</code>, but it is not recommendated in themes with box on bottom or position:fixed
<code>var MonsterHeight = false;</code>

Supported language:
* [PL] Polski
* [EN] English

I can add more languages if you need. Just send mail to michal (a) sieciechowicz.pl 
