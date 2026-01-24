import fs from "fs";

/* ================= CONFIG ================= */

const DATA_DIR = "./"; // adjust if needed
const DECIMALS = 1;
const MIN_RATING = 9.4;
const MAX_RATING = 10.0;

/* ================= NAMES (100+) ================= */

const firstNames = [
  "Pilypas","Raminta","Rūta","Dalia","Ineta","Egidijus","Augustinas","Audronius",
  "Lilija","Liudvika","Žymantė","Norbertas","Izabelė","Urbonas","Brunonas",
  "Salomėja","Dominykas","Oskaras","Akvilė","Bronislovas","Arūnas","Gabija",
  "Svajūnas","Mikalojus","Saulė","Inga","Izaokas","Albinas","Virginijus",
  "Simonas","Remigijus","Adomas","Ivanas","Tautvydas","Rebeka","Albina","Morta",
  "Aurelija","Liūtas","Larisa","Rima","Iveta","Aleksandra","Zinaida","Jokūbas",
  "Valdas","Pijus","Margarita","Jurgis","Agnius","Nerijus","Medardas","Erika",
  "Gražutė","Dorotėja","Raimundas","Magdalena","Donata","Virginija","Skolastika",
  "Irutė","Kastytis","Morkus","Adolfas","Veronika","Neringa","Marytė","Rimantė",
  "Vytautas","Marija","Evaldas","Pranciškus","Danas","Kasparas","Feliksas","Genė",
  "Simona","Daina","Eidmantas","Šarūnas","Vida","Andrius","Pranas","Ingrida",
  "Audrius","Viktorija","Balys","Irina","Lionginas","Romas","Artūras","Dalius",
  "Alma","Zita","Frederikas","Grigalius","Vaidivutis","Bronius","Nojus","Lidija",
  "Jonė","Stasė","Liuda","Adas","Laimutė","Arkadijus","Vytas","Henrikas","Anelė",
  "Osvaldas","Meilė","Algimantas","Vytautė","Grytė","Pranciška","Rimantas","Jovita",
  "Arūnė","Žygimantas","Marijonas","Aistė","Sigita","Titas","Rimvydas","Indrė",
  "Dovydas","Elvyra","Gytis","Virkantas","Eugenija","Stasys","Ramutė","Kotryna",
  "Stanislovas","Albertas","Suzana","Daiva","Regina","Naglis","Aušra","Pranė",
  "Alina","Radvilė","Motiejus","Žydrūnas","Barbora","Eidvilas","Teresė","Petras",
  "Regimantas","Violeta","Romanas","Mantas","Valentas","Samuelis","Laimis","Reda",
  "Jogirdas","Renė","Benas","Žadmantė","Eduardas","Eligijus","Liudvikas","Deividas",
  "Donaldas","Erikas","Gintautas","Vytenis","Dovilė","Robertas","Filomena","Monika",
  "Laimutis","Benjaminas","Mamertas","Renaldas","Renatas","Julija","Kazimiera",
  "Leonardas","Bernardas","Marius","Ugnius","Jadvyga","Vincentas","Laurynas",
  "Vladislova","Nomeda","Janė","Juozas","Martynas","Emilija","Edmundas","Henrika",
  "Jeremijas","Genovaitė","Stanislova","Liucija","Akvilas","Jolanta","Sigitas",
  "Jolita","Markas","Eimantas","Eugenijus","Alfreda","Agota","Felicija","Virgilijus",
  "Laura","Olivija","Nora","Birutė","Miglė","Antanina","Gražina","Paulius",
  "Vitalija","Edita","Alfredas","Zacharijas","Zenonas","Baltramiejus","Viktoras",
  "Ferdinandas","Vygantas","Vincas","Baltija","Marcelijus","Agnė","Danguolė",
  "Danutė","Kristupas","Girdutis","Giedrius","Rolandas","Valerija","Aurimas",
  "Konstancija","Algirdas","Antanas","Angela","Jurgita","Vilhelmas","Aloyzas",
  "Lina","Lozorius","Ilona","Ramunė","Leonas","Mirga","Gintaras","Alfonsas",
  "Jonas","Algis","Milda","Alvyra","Emanuelis","Amalija","Jūratė","Janina",
  "Teisutis","Jelena","Marijona","Vitalijus","Edgaras","Živilė","Eglė","Ignas",
  "Aurelijus","Vilija","Aspazija","Tylenis","Mykolas","Darius","Tadas","Abraomas",
  "Vidas","Adrijus","Marijus","Laima","Domas","Aivaras","Alvydas","Vaiva",
  "Bronislova","Lolita","Vladas","Vaclovas","Romualdas","Nijolė","Žemyna",
  "Kęstutis","Linas","Leopoldas","Juozapas","Austėja","Lida","Andrejus",
  "Brigita","Beata","Kristina","Kazys","Rapolas","Vytis","Lukas","Vilius",
  "Gintarė","Konstantinas","Diana","Stefanija","Valerijonas","Audronė","Vaida",
  "Justas","Salvinija","Julius","Danielius","Sandra","Valentinas","Arvydas",
  "Audra","Romualda","Zigmas","Loreta","Rytas","Klaudijus","Sonata","Ričardas",
  "Vaidas","Vita","Adamas","Rytis","Mindaugas","Joana","Arnas","Sofija",
  "Daliutė","Vilma","Aidas","Raimondas","Tomas","Natalija","Renata","Steponas",
  "Rimgaudas","Rokas","Justina","Česlovas","Aldona","Mozė","Ona","Povilas",
  "Norvaidė","Gabrielius","Kostas","Liveta","Benediktas","Anastazija","Ramūnas",
  "Silva","Justinas","Vygandas","Remis","Saulius","Jurga","Simas","Ernestas",
  "Kazimieras","Evelina","Irma","Airinė","Aleksas","Gediminas","Giedrė","Armandas",
  "Kristijonas","Ruslanas","Rasa","Saulutė","Rita","Matas","Ieva","Modestas",
  "Elena","Vaidilutė","Toma","Vladislovas","Faustas","Vidmantas","Donatas",
  "Gerardas","Skirmantas","Dainius","Vaidotas","Žilvinas","Aleksandras",
  "Domantas","Ina","Elzbieta","Gintas","Asta","Vanda","Edis","Petronelė",
  "Aušrinė","Edvinas","Irena","Karolis"
];



const lastNames = [
  "Petrauskas","Kazlauskas","Jankauskas","Stankevičius","Vasiliauskas",
  "Butkus","Žukauskas","Paulauskas","Urbonas","Kavaliauskas","Sabaliauskas",
  "Ivanauskas","Mikalauskas","Bagdonas","Rutkauskas","Navickas","Pocius",
  "Mažeika","Vaičiulis","Norkus","Jasaitis","Baranauskas","Žemaitis",
  "Gricius","Kairys","Petkevičius","Balevičius","Šimkus","Jakubauskas",
  "Dambrauskas","Mockus","Zabielskas","Skrebiškis","Balčiūnas","Kriščiūnas",
  "Markevičius","Vaišvila","Paškevičius","Tamošiūnas","Janulis",
  "Vaitkevičius","Lukoševičius","Blaževičius","Bielskis","Adomaitis",
  "Juodaitis","Stonys","Vilkas","Bendoraitis","Aleknavičius","Kudirka",
  "Vaičiūnas","Račkauskas","Gedvilas","Juknevičius","Masiulis","Rakauskas",
  "Burbulis","Petraitis","Bružas","Katkus","Lazauskas","Rimkus","Baniulis",
  "Daunys","Kniukšta","Puidokas","Žiogas","Paleckis","Tijūnaitis",
  "Švedas","Bublys","Naruševičius","Klišauskas","Balandis","Baravykas",
  "Šerkšnas","Voveris","Lapinskas","Miškinis","Džiugas","Varna","Šarka",
  "Vaitkus","Zinkevičius","Jakštas","Žebrauskas","Puodžiūnas","Kleinas",
  "Dargis","Daukantas","Klimas","Šalčius","Žalys","Kavolis","Petraitis",
  "Stankevičius","Gailius","Kumpys","Šimelionis","Mačiulis","Vaitiekūnas",
  "Brazaitis","Staniulis","Baronas","Rimšas","Šiugždinis","Kalinauskas",
  "Petraitis","Čepulis","Gudauskas","Milčius","Vaitkus","Ašmonas","Liauga",
  "Ragauskas","Morkūnas","Žukauskas","Paleckis","Varnas","Bielskis",
  "Kairys","Rimkevičius","Grigas","Petrauskas","Černius","Kazėnas","Balčius",
  "Stankus","Tautkus","Mockus","Raudonis","Urbonaitis","Skrebys","Adomaitis",
  "Maželis","Kavaliauskas","Šemeta","Jakštas","Barzda","Kalnietis","Vilutis",
  "Kudirka","Paškevičius","Masiulis","Lapinskas","Petraitis","Žemaitis",
  "Burbulis","Vainorius","Gailius","Rakauskas","Stonys","Blaževičius",
  "Petkevičius","Jakubauskas","Šarkauskas","Dambrauskas","Miškinis",
  "Žiogas","Kriščiūnas","Balandis","Šerkšnas","Tijūnaitis","Voveris",
  "Mockevičius","Vasiliauskas","Navickas","Bagdonas","Žiukelis","Urbonas",
  "Mikalauskas","Rimkus","Daunys","Baniulis","Puidokas","Švedas","Klišauskas",
  "Baravykas","Aleknavičius","Valiulis","Kleinas","Rimantėlis","Dainius",
  "Vainauskas","Kalinauskas","Žilinskas","Milčius","Petronis","Janulis",
  "Vaitkevičius","Lukoševičius","Bielskis","Adomaitis","Juodaitis","Stonys",
  "Vilkas","Bendoraitis","Kudirka","Vaičiūnas","Račkauskas","Gedvilas",
  "Juknevičius","Masiulis","Rakauskas","Burbulis","Petraitis","Bružas",
  "Katkus","Lazauskas","Rimkus","Baniulis","Daunys","Kniukšta","Puidokas",
  "Žiogas","Paleckis","Tijūnaitis","Švedas","Bublys","Naruševičius",
  "Klišauskas","Balandis","Baravykas","Šerkšnas","Voveris","Lapinskas",
  "Miškinis","Džiugas","Varna","Šarka","Vaitkus","Zinkevičius","Jakštas",
  "Žebrauskas","Puodžiūnas","Kleinas","Dargis","Daukantas","Klimas","Šalčius",
  "Žalys","Kavolis","Gailius","Kumpys","Šimelionis","Mačiulis","Vaitiekūnas",
  "Brazaitis","Staniulis","Baronas","Rimšas","Šiugždinis","Kalinauskas"
];


/* ================= TEXT POOLS (400+ VARIANTS) ================= */

const openings = [
  "Šį produktą pasirinkau po ilgos analizės",
  "Ieškojau kokybiško sprendimo savo namams",
  "Šią prekę užsisakiau internetu",
  "Pirkau po specialistų rekomendacijų",
  "Rinkausi pagal klientų atsiliepimus",
  "Ieškojau ilgaamžio varianto",
  "Pasirinkau remdamasis dizainu",
  "Nusprendžiau išbandyti šį gaminį",
  "Ilgai lyginau skirtingus variantus",
  "Norėjau aukštos klasės produkto",
  "Pirkau renovuojant būstą",
  "Ieškojau sprendimo interjerui",
  "Rinkausi pagal kainos ir kokybės santykį",
  "Ieškojau kažko patikimo ir tvirto",
  "Pasirinkimas buvo rekomenduotas draugų",
  "Norėjau modernaus ir stilingo varianto",
  "Ieškojau produkto, kuris ilgai tarnautų",
  "Pirkau, nes patiko dizaino sprendimas",
  "Nusprendžiau pabandyti po teigiamų atsiliepimų",
  "Ieškojau prekę, tinkamą mano būstui",
  "Pasirinkau remdamasis gamintojo reputacija",
  "Norėjau, kad produktas atitiktų mano poreikius",
  "Pirkau, nes rekomendavo specialistai",
  "Rinkausi iš kelių galimų variantų",
  "Ieškojau kažko patogaus ir praktiško",
  "Pasirinkau dėl teigiamų klientų atsiliepimų",
  "Nusprendžiau pabandyti naują gaminį",
  "Ieškojau prekę, kuri tiktų interjerui",
  "Pirkau remdamasis dizaino idėjomis",
  "Rinkausi dėl ilgaamžiškumo ir kokybės",
  "Pasirinkau, nes patiko gaminio spalva",
  "Ieškojau sprendimo, kuris atitiktų mano stilių",
  "Pirkau po patikimų rekomendacijų",
  "Rinkausi pagal medžiagų kokybę",
  "Ieškojau varianto, kuris lengvai derėtų su kitais elementais",
  "Pasirinkau, nes gaminys atrodo solidus",
  "Nusprendžiau pabandyti, nes buvo gera kaina",
  "Pirkau, nes ieškojau praktiško sprendimo",
  "Rinkausi pagal rekomenduojamą prekę specialistų",
  "Ieškojau produkto, kuris būtų stilingas ir patvarus",
  "Pasirinkau remdamasis klientų rekomendacijomis",
  "Norėjau patikrinto ir patikimo gaminio",
  "Pirkau, nes patiko nauja kolekcija",
  "Rinkausi dėl medžiagų kokybės ir ilgaamžiškumo",
  "Ieškojau produkto, kuris derėtų prie interjero",
  "Pasirinkau, nes buvo lengva užsisakyti internetu",
  "Nusprendžiau pirkti po teigiamų atsiliepimų",
  "Pirkau, nes ieškojau patikimo gaminio namams",
  "Rinkausi pagal stiliaus ir kainos santykį",
  "Ieškojau prekę, kuri atitiktų mano lūkesčius"
];

const quality = [
  "kokybė yra išskirtinė",
  "medžiagos atrodo labai tvirtos",
  "apdirbimas itin preciziškas",
  "dizainas atrodo prabangiai",
  "detalės išdirbtos nepriekaištingai",
  "paviršius lygus ir estetiškas",
  "spalva idealiai atitinka aprašymą",
  "bendra konstrukcija labai patikima",
  "matosi profesionalus gamybos lygis",
  "produktas atrodo solidžiai",
  "medžiagos kokybė pranoksta lūkesčius",
  "apdirbimas tikslus ir kruopštus",
  "dizainas modernus ir stilingas",
  "detalės išbaigtos su meile",
  "paviršius atrodo lygus ir malonus liesti",
  "spalvos sodrios ir tiksliai atkartoja nuotrauką",
  "konstrukcija tvirta ir stabiliai laikosi",
  "matosi profesionalus dėmesys detalėms",
  "produktas atrodo solidus ir patikimas",
  "medžiagos jaučiasi kokybiškos ir patvarios",
  "apdirbimas preciziškas, jokio trūkumo nematyti",
  "dizainas elegantiškas ir pritraukiantis dėmesį",
  "detalės išdirbtos su ypatingu tikslumu",
  "paviršius švelnus ir malonus liesti",
  "spalva atitinka aprašymą ir nuotrauką",
  "bendras gaminio įspūdis labai teigiamas",
  "matosi kruopštus gamybos procesas",
  "produktas atrodo aukštos klasės",
  "medžiagos tvirtos, patvarios ir kokybiškos",
  "apdirbimas nepriekaištingas",
  "dizainas stilingas ir modernus",
  "detalės subtiliai išbaigtos",
  "paviršius lygus, malonus akiai",
  "spalvos natūralios ir sodrios",
  "konstrukcija stabili ir saugi",
  "matosi profesionalumas kiekviename elemente",
  "produktas atrodo solidus ir patikimas",
  "medžiagos aukštos kokybės ir tvirtos",
  "apdirbimas kruopštus ir tikslus",
  "dizainas prabangus ir elegantiškas",
  "detalės išbaigtos nepriekaištingai",
  "paviršius lygus, be defektų",
  "spalvos sodrios, atitinka lūkesčius",
  "konstrukcija tvirta ir patikima",
  "matosi aukštos gamybos standartai",
  "produktas solidus, kokybiškas ir patikimas",
  "medžiagos atrodo tvirtos ir patvarios",
  "apdirbimas preciziškas, profesionalus",
  "dizainas modernus ir estetiškas",
  "detalės kruopščiai išdirbtos",
  "paviršius lygus ir malonus liesti"
];


const experience = [
  "naudojimas yra itin patogus",
  "montavimas buvo labai paprastas",
  "pritaikymas prie interjero nesukėlė sunkumų",
  "viskas atitiko mano lūkesčius",
  "rezultatas viršijo mano lūkesčius",
  "galutinis vaizdas labai estetiškas",
  "naudojimo patirtis puiki",
  "viskas veikia sklandžiai",
  "jaučiasi aukšta klasė",
  "produktas pateisino investiciją",
  "naudojimas paprastas ir intuityvus",
  "montavimas neužtruko nė minutės",
  "pritaikymas prie mano namų buvo lengvas",
  "rezultatas pranoko mano lūkesčius",
  "galutinis efektas atrodo profesionaliai",
  "naudojimo patirtis maloni ir sklandi",
  "viskas veikia nepriekaištingai",
  "produktas jaučiasi patvarus ir solidus",
  "naudojimas lengvas net pradedantiesiems",
  "montavimas buvo greitas ir paprastas",
  "pritaikymas prie interjero vyko be problemų",
  "rezultatas atrodo nepriekaištingai",
  "galutinis vaizdas atitinka nuotraukas",
  "naudojimo patirtis labai teigiama",
  "viskas veikia sklandžiai ir patikimai",
  "produktas suteikia komforto pojūtį",
  "naudojimas patogus ir paprastas",
  "montavimas tikrai nekelia rūpesčių",
  "pritaikymas prie kambario lengvai įmanomas",
  "rezultatas labai profesionalus",
  "galutinis vaizdas atrodo estetiškai ir kokybiškai",
  "naudojimo patirtis maloni ir paprasta",
  "viskas veikia be trikdžių",
  "produktas vertas investicijos",
  "naudojimas greitas ir komfortiškas",
  "montavimas nesudėtingas",
  "pritaikymas prie interjero nekelia problemų",
  "rezultatas viršijo mano tikslus",
  "galutinis efektas labai estetiškas",
  "naudojimo patirtis paprasta ir maloni",
  "viskas veikia nepriekaištingai ir patikimai",
  "produktas pateisino mano lūkesčius",
  "naudojimas patogus ir efektyvus",
  "montavimas buvo lengvas ir greitas",
  "pritaikymas prie interjero sėkmingas",
  "rezultatas atrodo labai profesionaliai",
  "galutinis vaizdas tikrai estetiškas",
  "naudojimo patirtis aukštos kokybės",
  "viskas veikia sklandžiai ir tiksliai",
  "produktas vertas kiekvieno cento"
];


const delivery = [
  "pristatymas buvo greitas",
  "pakuotė labai tvarkinga",
  "siunta atvyko laiku",
  "logistika suorganizuota profesionaliai",
  "prekė buvo saugiai supakuota",
  "užsakymas įvykdytas sklandžiai",
  "aptarnavimas malonus",
  "komunikacija buvo aiški",
  "užsakymo procesas paprastas",
  "visa patirtis sklandi",
  "prekė atvyko be pažeidimų",
  "siunta supakuota itin tvarkingai",
  "pristatymas greitas ir patikimas",
  "pakuotė saugi ir tvirta",
  "užsakymas įvykdytas laiku",
  "komunikacija su pardavėju puiki",
  "aptarnavimas draugiškas ir profesionalus",
  "logistika buvo gerai organizuota",
  "siunta pristatyta kaip sutarta",
  "visa patirtis su užsakymu teigiama",
  "prekė atvyko labai greitai",
  "pakuotė puikiai apsaugojo produktą",
  "užsakymo procesas aiškus ir paprastas",
  "pristatymas patogus ir greitas",
  "komunikacija buvo aiški ir maloni",
  "aptarnavimas paliko gerą įspūdį",
  "siunta pristatyta saugiai ir laiku",
  "prekė atvyko tiksliai laiku",
  "pakuotė tvarkinga ir saugi",
  "užsakymas įvykdytas be problemų",
  "logistika efektyvi ir profesionali",
  "visa patirtis maloni ir sklandi",
  "pristatymas greitas ir patikimas",
  "pakuotė apsaugojo produktą nuo pažeidimų",
  "užsakymas atliktas tiksliai kaip sutarta",
  "aptarnavimas draugiškas, komunikacija aiški",
  "siunta atvyko saugiai ir laiku",
  "prekė pristatyta nepriekaištingai",
  "pakuotė tvarkinga ir estetiška",
  "pristatymas patikimas ir greitas",
  "užsakymo procesas paprastas ir aiškus",
  "logistika suorganizuota nepriekaištingai",
  "visa patirtis su užsakymu puiki",
  "komunikacija su pardavėju sklandi",
  "aptarnavimas profesionalus ir malonus",
  "siunta pristatyta be jokių problemų",
  "prekė saugiai supakuota ir pristatyta",
  "pakuotė tvarkinga, pristatymas greitas",
  "užsakymo procesas labai patogus",
  "visa patirtis buvo labai teigiama"
];


const endings = [
  "Tikrai rekomenduoju kitiems.",
  "Drąsiai pirkčiau dar kartą.",
  "Tai puikus pasirinkimas.",
  "Likau labai patenkintas.",
  "Vertinu labai teigiamai.",
  "Rekomenduoju be abejonių.",
  "Tai aukščiausios klasės sprendimas.",
  "Pilnai pateisino lūkesčius.",
  "Esu labai patenkintas pirkiniu.",
  "Rezultatas nuostabus.",
  "Tikrai verta šio produkto.",
  "Pirksiu dar kartą be dvejonių.",
  "Labai džiaugiuosi pasirinkimu.",
  "Produktas pranoko mano lūkesčius.",
  "Rekomenduoju visiems, kurie ieško kokybės.",
  "Tikrai likau patenkintas pirkiniu.",
  "Puikus sprendimas namams ar biurui.",
  "Labai patenkinta ir maloni patirtis.",
  "Produktas vertas kiekvieno cento.",
  "Esu sužavėtas galutiniu rezultatu.",
  "Geriausias pasirinkimas rinkoje.",
  "Tikrai dar kartą pirksiu šį produktą.",
  "Puikus santykis tarp kainos ir kokybės.",
  "Labai rekomenduoju šį gaminį.",
  "Pirkimas buvo sėkmingas ir patogus.",
  "Esu labai patenkinta ir rekomenduoju.",
  "Rezultatas viršijo mano lūkesčius.",
  "Produktas tikrai kokybiškas ir patikimas.",
  "Tikrai verta investuoti į šį gaminį.",
  "Likau labai patenkinta pirkiniu.",
  "Labai džiaugiuosi rezultatu.",
  "Rekomenduoju draugams ir šeimai.",
  "Pirkimas buvo tikrai sėkmingas.",
  "Produktas labai gerai atliko savo funkciją.",
  "Labai maloni patirtis perkant šį gaminį.",
  "Esu visiškai patenkintas rezultatu.",
  "Tikrai puikus pasirinkimas namams.",
  "Produktas pranoko lūkesčius ir tikrai rekomenduoju.",
  "Labai džiaugiuosi šiuo pirkiniu.",
  "Rekomenduoju visiems, kurie ieško kokybės ir stiliaus.",
  "Produktas vertas didžiausio įvertinimo.",
  "Likau maloniai nustebintas rezultatu.",
  "Esu labai patenkinta šiuo pasirinkimu.",
  "Tikrai pirksiu dar kartą, jei prireiks.",
  "Produktas kokybiškas, patikimas ir estetiškas.",
  "Labai maloni patirtis su šiuo pirkiniu.",
  "Rekomenduoju visiems, kurie ieško patikimo produkto.",
  "Likau labai patenkinta rezultatu ir kokybe.",
  "Esu patenkintas ir drąsiai rekomenduoju.",
  "Tikrai vertinga investicija į kokybę.",
  "Produktas pilnai pateisino lūkesčius.",
  "Labai patenkinta ir rekomenduoju kitiems."
];


/* ================= HELPERS ================= */

function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rating() {
  const f = Math.pow(10, DECIMALS);
  return (
    Math.floor(
      (Math.random() * (MAX_RATING - MIN_RATING) + MIN_RATING) * f
    ) / f
  ).toFixed(DECIMALS);
}

function date() {
  const start = new Date(2022, 0, 1);
  const end = new Date();
  const d = new Date(start.getTime() + Math.random() * (end - start));
  return d.toISOString().split("T")[0];
}

function uniqueComment() {
  return `
${rand(openings)} ir iš karto pastebėjau, kad ${rand(quality)}.
${rand(experience)}, o ${rand(delivery)}.
Naudoju jau ${Math.floor(Math.random() * 36) + 1} mėnesius.
${rand(endings)}
`.replace(/\s+/g, " ").trim();
}

/* ================= LOAD PRODUCTS ================= */

// List all product JSON files
const categories = fs.readdirSync(DATA_DIR).filter(f => f.endsWith(".json") && f !== "combined.json" && f !== "produktai.json");

categories.forEach(file => {
  const filePath = path.join(DATA_DIR, file);
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!jsonData.products) return;

  jsonData.products.forEach(product => {
    // Decide 1 or 2 reviews per product
    const numReviews = Math.floor(Math.random() * 2) + 1;
    product.reviews = [];

    for (let i = 1; i <= numReviews; i++) {
      const first = rand(firstNames);
      const last = rand(lastNames);
      const review = {
        reviewId: `${product.code}_rev_${i}`,
        customerName: `${first} ${last}`,
        rating: rating(),
        comment: uniqueComment(),
        date: date(),
        verified: true,
        helpful: Math.floor(Math.random() * 60)
      };
      product.reviews.push(review);
    }
  });

  // Save the JSON file back
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), "utf8");
  console.log(`✅ Added reviews to ${file}`);
});