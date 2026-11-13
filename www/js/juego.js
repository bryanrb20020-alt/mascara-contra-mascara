"use strict";
const $=s=>document.querySelector(s);
let RNG=Math.random;
const R=(a,b)=>a+RNG()*(b-a),RI=(a,b)=>Math.floor(R(a,b+1)),pick=a=>a[RI(0,a.length-1)],chance=p=>RNG()<p;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=RI(0,i);[a[i],a[j]]=[a[j],a[i]];}return a;};
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const todayStr=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');};

// ---------- Cartas ----------
const CARDS={
 golpe:{n:'Golpe',e:'👊',c:1,t:'atk',dmg:6,up:{dmg:9}},
 bloqueo:{n:'Bloqueo',e:'🛡️',c:1,t:'def',block:5,up:{block:8}},
 hurra:{n:'Hurracarrana',e:'🌀',c:1,t:'atk',dmg:7,aff:2,air:1,up:{dmg:10}},
 patada:{n:'Patada voladora',e:'🦶',c:2,t:'atk',dmg:12,aff:3,air:1,up:{dmg:16}},
 plancha:{n:'Plancha desde la tercera',e:'🪂',c:2,t:'atk',dmg:18,self:4,aff:4,air:1,up:{dmg:24}},
 tope:{n:'Tope suicida',e:'☄️',c:1,t:'atk',dmg:10,self:3,aff:3,air:1,up:{dmg:13}},
 lazo:{n:'Lazo',e:'💪',c:1,t:'atk',dmg:9,up:{dmg:12}},
 candado:{n:'Candado',e:'🔒',c:1,t:'atk',dmg:4,ap:{debil:2},llave:1,up:{dmg:6,ap:{debil:3}}},
 brazo:{n:'Llave al brazo',e:'🦾',c:1,t:'atk',dmg:5,ap:{abierto:2},llave:1,up:{dmg:7,ap:{abierto:3}}},
 rana:{n:'La Rana',e:'🐸',c:2,t:'atk',dmg:8,sub:1,llave:1,up:{dmg:11}},
 quebradora:{n:'Quebradora',e:'💥',c:2,t:'atk',dmg:13,ap:{mareado:1},cond:'abierto',up:{dmg:17}},
 contra:{n:'Contraataque',e:'↩️',c:1,t:'def',block:6,contra:5,up:{block:8,contra:7}},
 saludo:{n:'Saludo al público',e:'🙌',c:0,t:'hab',aff:3,draw:1,up:{aff:4,draw:2}},
 aire:{n:'Recuperar aire',e:'😮‍💨',c:1,t:'def',block:4,draw:2,up:{block:7}},
 grito:{n:'Grito de guerra',e:'🔥',c:1,t:'hab',sf:{furia:2},ex:1,up:{sf:{furia:3}}},
 tirabuzon:{n:'Tirabuzón',e:'🌪️',c:2,t:'atk',dmg:5,hits:3,aff:3,air:1,up:{dmg:7}},
 cristo:{n:'Cristo invertido',e:'✝️',c:2,t:'atk',dmg:10,ap:{debil:2,abierto:2},llave:1,up:{dmg:14}},
 muralla:{n:'Muralla',e:'🧱',c:2,t:'def',block:14,up:{block:19}},
 corbata:{n:'Corbata',e:'👔',c:1,t:'atk',dmg:6,aff:1,draw:1,up:{dmg:9}},
 aplastar:{n:'Aplastón',e:'🦍',c:2,t:'atk',dmg:16,ap:{mareado:1},cond:'abierto',up:{dmg:21}},
 provoca:{n:'Provocación',e:'😏',c:0,t:'hab',aff:3,ap:{debil:1},up:{aff:4,ap:{debil:2}}},
 beso:{n:'Beso al público',e:'💋',c:1,t:'hab',aff:4,heal:4,up:{aff:5,heal:7}},
 fuera:{n:'Salir del ring',e:'🏃',c:1,t:'def',fuera:1,up:{c:0}},
 esquiva:{n:'Esquivar',e:'💨',c:1,t:'def',block:8,draw:1,up:{block:11}},
 piquete:{n:'Piquete de ojos',e:'👉',c:0,t:'atk',dmg:4,ap:{debil:2},dirty:1,up:{dmg:6}},
 silla:{n:'Sillazo',e:'🪑',c:1,t:'atk',dmg:14,dirty:1,ex:1,up:{dmg:20}},
 bajo:{n:'Golpe bajo',e:'🥊',c:1,t:'atk',dmg:9,ap:{mareado:1},cond:'abierto',dirty:1,up:{dmg:12}},
 jalon:{n:'Jalón de máscara',e:'🎭',c:1,t:'hab',ap:{abierto:3,debil:1},dirty:1,up:{ap:{abierto:4,debil:2}}},
 polvo:{n:'Polvo a los ojos',e:'🌫️',c:1,t:'hab',ap:{mareado:1},pr:1,dirty:1,ex:1,up:{c:0}},
 mordida:{n:'Mordida',e:'🦷',c:1,t:'atk',dmg:7,heal:3,dirty:1,up:{dmg:9,heal:5}},
 cadena:{n:'Cadenazo',e:'⛓️',c:2,t:'atk',dmg:22,dirty:2,ex:1,up:{dmg:28}},
 lesion:{n:'Lesión',e:'🤕',c:9,t:'hab',useless:1},
 chop:{n:'Chop de pecho',e:'✋',c:1,t:'atk',dmg:7,aff:1,up:{dmg:10}},
 patadita:{n:'Patada baja',e:'🦵',c:0,t:'atk',dmg:3,ap:{abierto:1},up:{dmg:5}},
 cabezazo:{n:'Cabezazo',e:'🤕',c:1,t:'atk',dmg:11,self:2,up:{dmg:14}},
 cuerdas:{n:'Rebote en cuerdas',e:'🪢',c:1,t:'hab',draw:2,aff:1,pos:'cuerdas',up:{draw:3}},
 resistir:{n:'Resistir',e:'😤',c:1,t:'def',block:7,aff:1,up:{block:10}},
 abrazo:{n:'Abrazo de oso',e:'🐻',c:1,t:'atk',dmg:5,llave:1,ap:{debil:1},up:{dmg:8}},
 golpe2:{n:'Doble golpe',e:'👊',c:1,t:'atk',dmg:4,hits:2,up:{dmg:6}},
 pose:{n:'Pose de culturista',e:'💪',c:0,t:'hab',aff:2,block:3,up:{aff:3,block:5}},
 tornillo:{n:'Tornillo',e:'🌀',c:2,t:'atk',dmg:9,hits:2,air:1,aff:3,rar:'r',up:{dmg:12}},
 tapatia:{n:'La Tapatía',e:'🎯',c:2,t:'atk',dmg:12,llave:1,ap:{debil:2,abierto:1},rar:'r',up:{dmg:16}},
 pulpo:{n:'El Pulpo',e:'🐙',c:2,t:'atk',dmg:6,llave:1,subx:2,rar:'r',up:{dmg:9}},
 mesa:{n:'Mesa rota',e:'🪵',c:2,t:'atk',dmg:20,self:5,dirty:1,ex:1,rar:'r',up:{dmg:26}},
 escalera:{n:'Desde la escalera',e:'🪜',c:2,t:'atk',dmg:26,self:6,air:1,aff:4,ex:1,rar:'r',up:{dmg:32}},
 muro2:{n:'Muro de hierro',e:'🛡️',c:2,t:'def',block:18,contra:4,rar:'r',up:{block:23}},
 hype:{n:'Prender al público',e:'🔊',c:1,t:'hab',aff:6,ex:1,rar:'r',up:{c:0}},
 segundo:{n:'Segundo aire',e:'⚡',c:0,t:'hab',en:1,draw:1,ex:1,rar:'r',up:{draw:2}},
 cuenta2:{n:'Me levanto en 2',e:'✌️',c:1,t:'def',block:6,heal:6,ex:1,rar:'r',up:{heal:10}},
 campana:{n:'Salvado por la campana',e:'🔔',c:1,t:'def',block:12,draw:1,ex:1,rar:'r',up:{block:16}},
 arranca:{n:'Arrancar la máscara',e:'😱',c:2,t:'atk',dmg:15,ap:{abierto:3},dirty:2,rar:'r',up:{dmg:20}},
 talco:{n:'Talco en el guante',e:'🧤',c:1,t:'hab',sf:{furia:3},dirty:1,ex:1,rar:'r',up:{c:0}},
 ahorca:{n:'Ahorcar con la cuerda',e:'🪢',c:1,t:'atk',dmg:8,llave:1,dirty:1,up:{dmg:11}},
 leyenda:{n:'Llave de leyenda',e:'🏛️',c:3,t:'atk',dmg:30,llave:1,ap:{mareado:1},pr:1,rar:'l',up:{c:2}},
 angel:{n:'Vuelo del Ángel',e:'👼',c:2,t:'atk',dmg:8,hits:3,air:1,aff:5,rar:'l',up:{dmg:11}},
 pueblo:{n:'Grito del pueblo',e:'📢',c:1,t:'hab',aff:10,ex:1,rar:'l',up:{c:0}},
 titan:{n:'Puño de titán',e:'🗿',c:2,t:'atk',dmg:24,sf:{furia:2},rar:'l',up:{dmg:30}},
 fantasma:{n:'Fantasma del ring',e:'👻',c:1,t:'def',fuera:1,block:10,draw:2,rar:'l',up:{c:0}},
 correr:{n:'Correr a las cuerdas',e:'🏃',c:0,t:'def',pos:'cuerdas',block:3,up:{block:6}},
 subir:{n:'Subir a la tercera',e:'🗼',c:1,t:'hab',pos:'tercera',aff:2,up:{c:0}},
 remate:{n:'Remate',e:'🎯',c:1,t:'atk',dmg:6,finish:1,up:{dmg:8}},
 contragolpe:{n:'Contragolpe',e:'⚔️',c:1,t:'atk',dmg:5,counter:7,up:{counter:10}},
 lectura:{n:'Leer al rival',e:'👀',c:1,t:'hab',choice:[{t:'🛡️ +9 de defensa',e:{block:9}},{t:'📣 +3 afición y roba 1',e:{aff:3,draw:1}},{t:'🎯 Rival Abierto 2',e:{ap:{abierto:2}}}],up:{c:0}},
 improvisa:{n:'Improvisar',e:'🎲',c:0,t:'hab',ex:1,choice:[{t:'⚡ +1 de energía',e:{en:1}},{t:'🃏 Roba 2 cartas',e:{draw:2}},{t:'🛡️ +5 de defensa',e:{block:5}}],up:{ex:0}},
 lanzar:{n:'Lanzar a las cuerdas',e:'↪️',c:1,t:'atk',dmg:5,ap:{abierto:1},pos:'cuerdas',up:{dmg:8}},
 mano:{n:'Mano dura',e:'✊',c:2,t:'atk',rar:'r',choice:[{t:'💥 18 de daño',e:{dmg:18}},{t:'🥴 10 de daño y Débil 2',e:{dmg:10,ap:{debil:2}}},{t:'🛡️ +14 defensa y Contra 4',e:{block:14,contra:4,t:'def'}}],up:{c:1}},
 agua:{n:'Tomar agua',e:'💧',c:1,t:'hab',heal:6,draw:1,up:{heal:9}},
 vendar:{n:'Vendaje rápido',e:'🩹',c:1,t:'def',heal:4,block:4,up:{heal:6,block:6}},
 respira:{n:'Respiración profunda',e:'🌬️',c:0,t:'hab',heal:3,up:{heal:5}},
 apoyo:{n:'Apoyo del público',e:'🤗',c:1,t:'hab',healAff:1,aff:1,rar:'r',up:{c:0}},
 renacer:{n:'Renacer del luchador',e:'🔥',c:2,t:'hab',heal:20,aff:3,ex:1,rar:'l',up:{heal:28}},
 giro:{n:'Patada giratoria',e:'🌀',c:1,t:'atk',dmg:8,ap:{abierto:1},up:{dmg:11}},
 bulldog:{n:'Bulldog',e:'🐶',c:1,t:'atk',dmg:8,aff:2,up:{dmg:11}},
 suplex:{n:'Suplex',e:'🔄',c:2,t:'atk',dmg:14,ap:{debil:1},up:{dmg:18}},
 rodilla:{n:'Rodillazo',e:'🦿',c:1,t:'atk',dmg:10,self:1,up:{dmg:13}},
 guardia:{n:'Guardia alta',e:'🙅',c:0,t:'def',block:4,up:{block:6}},
 sacudir:{n:'Sacudirse',e:'💢',c:1,t:'hab',sf:{furia:1},block:4,up:{block:7}},
 lanza:{n:'Lanza',e:'🏈',c:1,t:'atk',dmg:11,up:{dmg:14}},
 paloma:{n:'La Paloma',e:'🕊️',c:1,t:'atk',dmg:6,air:1,aff:2,draw:1,up:{dmg:9}},
 cerrojo:{n:'Cerrojo',e:'🔐',c:1,t:'atk',dmg:3,llave:1,sub:1,ap:{debil:1},up:{dmg:5}},
 escuadra:{n:'Escuadra',e:'📐',c:1,t:'atk',dmg:6,llave:1,ap:{abierto:1},draw:1,up:{dmg:8}},
 rebote:{n:'Rebote y tacle',e:'🏉',c:1,t:'atk',dmg:7,pos:'cuerdas',aff:1,up:{dmg:10}},
 respiro:{n:'Tomar distancia',e:'↔️',c:1,t:'def',block:6,draw:1,up:{block:9}},
 bofetada:{n:'Bofetada',e:'🖐️',c:0,t:'atk',dmg:3,aff:2,up:{dmg:5,aff:3}},
 saliva:{n:'Escupitajo',e:'💦',c:0,t:'hab',ap:{debil:1,abierto:1},dirty:1,up:{ap:{debil:2,abierto:1}}},
 jalonpelo:{n:'Jalón de greñas',e:'🧑‍🦱',c:1,t:'atk',dmg:6,ap:{abierto:2},dirty:1,up:{dmg:9}},
 canadiense:{n:'Quebradora canadiense',e:'🍁',c:2,t:'atk',dmg:16,ap:{mareado:1},rar:'r',up:{dmg:21}},
 luna:{n:'Moonsault',e:'🌙',c:2,t:'atk',dmg:19,self:3,air:1,aff:4,rar:'r',up:{dmg:24}},
 mexicana:{n:'La Mexicana',e:'🌶️',c:2,t:'atk',dmg:10,llave:1,ap:{debil:2},sf:{furia:1},rar:'r',up:{dmg:14}},
 espejo:{n:'Espejo',e:'🪞',c:1,t:'def',block:8,contra:6,rar:'r',up:{block:11,contra:8}},
 porra:{n:'La porra canta',e:'🎺',c:1,t:'hab',aff:4,draw:2,rar:'r',up:{aff:6}},
 caida2:{n:'Segunda caída',e:'🔁',c:1,t:'hab',heal:8,sf:{furia:1},ex:1,rar:'r',up:{heal:12}},
 hurrainv:{n:'Huracarrana invertida',e:'🔃',c:2,t:'atk',dmg:12,air:1,aff:3,ap:{abierto:2},rar:'r',up:{dmg:16}},
 distraer:{n:'Distraer al réferi',e:'🙈',c:0,t:'hab',sf:{furia:2},dirty:1,ex:1,rar:'r',up:{sf:{furia:3}}},
 manopla:{n:'Manopla escondida',e:'🥊',c:1,t:'atk',dmg:16,dirty:2,rar:'r',up:{dmg:21}},
 gavilan:{n:'Vuelo del Gavilán',e:'🦅',c:2,t:'atk',dmg:12,hits:2,air:1,aff:5,heal:5,rar:'l',up:{dmg:15}},
 tormenta:{n:'Tormenta de topes',e:'⛈️',c:3,t:'atk',dmg:7,hits:4,air:1,aff:6,self:4,rar:'l',up:{dmg:9}},
 sagrada:{n:'Máscara sagrada',e:'🎭',c:1,t:'def',block:15,heal:8,sf:{furia:1},ex:1,rar:'l',up:{block:20}},
 finT:{n:'Hurracarrana Celestial',e:'🌟',c:0,t:'fin',dmg:28,air:1,ex:1},
 finR:{n:'Martinete Infernal',e:'😈',c:0,t:'fin',dmg:22,ap:{mareado:1},pr:1,ex:1},
 finG:{n:'Bomba Atómica',e:'💣',c:0,t:'fin',dmg:34,ex:1},
 finV:{n:'Huracán Estelar',e:'🦋',c:0,t:'fin',dmg:6,hits:5,air:1,ex:1},
 finX:{n:'Beso Robado',e:'💘',c:0,t:'fin',dmg:20,heal:10,ap:{mareado:1},pr:1,ex:1},
 finM:{n:'Mini Tornillo',e:'🔩',c:0,t:'fin',dmg:18,block:15,air:1,ex:1}
};
const COMMON=['giro','bulldog','suplex','rodilla','guardia','sacudir','lanza','paloma','cerrojo','escuadra','rebote','respiro','bofetada','hurra','patada','plancha','tope','lazo','candado','brazo','rana','quebradora','contra','saludo','aire','grito','tirabuzon','muralla','corbata','fuera','chop','patadita','cabezazo','cuerdas','resistir','abrazo','golpe2','pose','correr','subir','remate','contragolpe','lectura','improvisa','lanzar','agua','vendar','respira'];
const RARE=['canadiense','luna','mexicana','espejo','porra','caida2','hurrainv','apoyo','mano','tornillo','tapatia','pulpo','escalera','muro2','hype','segundo','cuenta2','campana','cristo'];const RARE_D=['distraer','manopla','mesa','arranca','talco','cadena'];const LEG=['gavilan','tormenta','sagrada','leyenda','angel','pueblo','titan','fantasma','renacer'];
const DIRTY=['saliva','jalonpelo','piquete','silla','bajo','jalon','polvo','mordida','ahorca'];
const STN={debil:'Débil',abierto:'Abierto',mareado:'Mareado',furia:'Furia',contra:'Contra',evade:'Sombra',amarrado:'Amarrado',fuera:'Fuera del ring',regreso:'Tope de regreso'};
const STI={debil:'🥴',abierto:'🎯',mareado:'💫',furia:'🔥',contra:'↩️',evade:'🌫️',amarrado:'🪢',fuera:'🏃',regreso:'☄️'};
const NONUM=['mareado','evade','amarrado','fuera','regreso'];

// ---------- Luchadores / mánagers / mejoras ----------
const LUCH={
 T:{n:'El Técnico',e:'😇',hp:74,fin:'finT',cost:0,m:['#3b6fb6','#ffd23f','star'],deck:['golpe','golpe','golpe','bloqueo','bloqueo','bloqueo','hurra','contra','tope','candado','correr'],pool:COMMON.concat(['cristo']),d:'Equilibrado: llaves aéreas y defensa.'},
 R:{n:'El Rudo',e:'😈',hp:62,fin:'finR',cost:0,m:['#c0392b','#111','horns'],deck:['golpe','golpe','golpe','bloqueo','bloqueo','bloqueo','piquete','silla','bajo','chop','contragolpe'],pool:COMMON.filter((_,i)=>i%2===0).concat(DIRTY,DIRTY),d:'Juego sucio: pega más, pero el réferi lo vigila.'},
 G:{n:'El Gigante',e:'🦍',hp:92,fin:'finG',cost:300,m:['#4e342e','#ffd23f','bands'],deck:['golpe','golpe','golpe','bloqueo','bloqueo','bloqueo','lazo','muralla','aplastar','cabezazo','remate'],pool:COMMON.concat(['aplastar','aplastar','muralla','lazo','suplex','lanza']),d:'+2 de daño en cada ataque, pero roba 4 cartas por turno.'},
 V:{n:'La Voladora',e:'🦋',hp:60,fin:'finV',cost:450,m:['#ff2e88','#fff','bolt'],deck:['golpe','golpe','bloqueo','bloqueo','bloqueo','hurra','tope','patada','subir','correr','lectura'],pool:COMMON.concat(['hurra','patada','plancha','tope','tirabuzon','paloma','rebote']),d:'Las llaves aéreas dan +1 de afición extra.'},
 X:{n:'El Exótico',e:'💋',hp:66,fin:'finX',cost:600,m:['#8e44ad','#ffd23f','heart'],deck:['golpe','golpe','golpe','bloqueo','bloqueo','provoca','saludo','beso','pose','chop','lectura'],pool:COMMON.concat(['provoca','beso','saludo','bofetada']),d:'Empieza cada lucha con 4 de afición. Se gana al público.'},
 M:{n:'Mini Estrella',e:'⭐',hp:54,fin:'finM',cost:800,m:['#16a085','#ffd23f','star'],deck:['golpe','golpe','golpe','bloqueo','bloqueo','esquiva','contra','tope','golpe2','correr','improvisa'],pool:COMMON.concat(['esquiva','contra','tope','guardia','respiro']),d:'La energía que no uses se vuelve defensa (+3 por punto).'}
};
const RELEVO={T:'12 de daño y +2 afición',R:'14 de daño y Débil 2',G:'18 de daño',V:'4 golpes de 4',X:'+5 afición y te cura 6',M:'10 de daño y 10 de defensa'};
const MAN={ninguno:{n:'Sin mánager',e:'—',d:'Luchas solo.',cost:0},lic:{n:'La Licenciada',e:'👩‍💼',d:'El réferi te descubre 50% menos.',cost:200},profe:{n:'El Profe',e:'👨‍🏫',d:'+1 carta el primer turno y más cartas mejoradas en recompensas.',cost:250},cuca:{n:'Doña Cuca',e:'👵',d:'Te venda y te soba: empiezas cada lucha con +5 de defensa.',cost:250},promotor:{n:'El Promotor',e:'🤑',d:'+40% de dinero ganado.',cost:350}};
const UPG={hp:{n:'+6 de vida inicial',e:'❤️',cost:[100,220,400]},aff:{n:'+1 de afición inicial',e:'📣',cost:[150,320]},oro:{n:'+$25 al empezar',e:'💰',cost:[80,180]},carta:{n:'Empezar con 1 carta mejorada',e:'⬆️',cost:[160,340]},relevo:{n:'Relevo +50% más fuerte',e:'🤝',cost:[300]}};
const PATTERNS={star:0,horns:0,bolt:40,crown:60,skull:50,fin:40,spots:40,x:40,bands:40,crest:50,flame:'pase',heart:'pase',diamond:'pase'};
const PATN={star:'Estrella',horns:'Cuernos',bolt:'Rayo',crown:'Corona',skull:'Calavera',fin:'Aleta',spots:'Manchas',x:'Equis',bands:'Franjas',crest:'Cresta',flame:'Llamas',heart:'Corazón',diamond:'Diamante'};
const COLORS=['#3b6fb6','#c0392b','#2e9d46','#ffd23f','#111111','#ffffff','#8e44ad','#e67e22','#ff2e88','#16a085','#cfd8dc','#4e342e'];

// ---------- Rivales ----------
const EN={
 costal:{n:'El Costal',hp:30,m:['#c9a66b','#7a5a30','bands'],mv:[{n:'Costalazo',dmg:6}]},
 chiva:{n:'Chiva Loca',ai:'agresivo',hp:34,m:['#f5f5f5','#2e9d46','horns'],mv:[{n:'Cabezazo',dmg:8},{n:'Embestida',dmg:5,hits:2},{n:'Bufido',sf:{furia:2}}]},
 gallo:{n:'El Gallo Negro',ai:'tramposo',hp:38,m:['#111','#e74c3c','crest'],mv:[{n:'Picotazo',dmg:6,ap:{debil:1}},{n:'Aleteo',block:8},{n:'Espolón',dmg:11}]},
 momia:{n:'La Momia de Tultepec',ai:'defensivo',hp:40,revive:.4,note:'Revive una vez con 40% de vida.',m:['#d9cfae','#7a6a4a','bands'],mv:[{n:'Abrazo',dmg:7,ap:{abierto:1}},{n:'Vendas',block:10},{n:'Maldición',ap:{debil:2}},{n:'Abrazo',dmg:9}]},
 kid:{n:'Kid Alacrán',ai:'calculador',hp:74,note:'Tu amigo de la infancia. Conoce todos tus trucos y encadena combos.',m:['#2ecc71','#4a148c','fin'],mv:[{n:'Aguijonazo',dmg:8,ap:{debil:1}},{n:'Coraza de alacrán',block:10,sf:{furia:1}},{n:'Pinzas',dmg:6,hits:2},{n:'Picadura Final',dmg:16},{n:'"Te conozco, carnal"',ap:{abierto:2}}]},
 panzon:{n:'El Panzón de la Vecindad',hp:50,boss:1,ai:'agresivo',note:'Pesado y lento: cuando prepara el Sentón, cúbrete.',m:['#e67e22','#ffffff','spots'],mv:[{n:'Panzazo',dmg:8},{n:'Sentón',dmg:14},{n:'Echarse un taco',block:8,sf:{furia:1}},{n:'Abrazo de oso',dmg:5,ap:{debil:1}}]},
 charrooro:{n:'El Charro de Oro',hp:64,boss:1,ai:'tramposo',note:'Su reata te amarra y su grito lo enfurece.',m:['#ffd23f','#222222','star'],mv:[{n:'Espuelazo de oro',dmg:10},{n:'Reata dorada',dmg:5,amarra:1},{n:'¡Ay, ay, ay!',sf:{furia:2},block:6},{n:'Jaripeo',dmg:7,hits:2}]},
 carnicero:{n:'El Carnicero de la Merced',hp:104,boss:1,ai:'agresivo',blood:1,note:'Huele la sangre: pega más cuando tienes poca vida.',m:['#c0392b','#f5f5f5','x'],mv:[{n:'Gancho de carnicero',dmg:13},{n:'Ablandar la carne',dmg:6,ap:{debil:1,abierto:1}},{n:'Mandil de acero',block:14},{n:'Antebrazo de hierro',dmg:18},{n:'Afilar',sf:{furia:2}}]},
 veneno:{n:'Kid Alacrán',hp:225,boss:1,ai:'tramposo',blood:1,revive:.4,transform:{at:.5,n:'Kid Alacrán (sin piedad)',m:['#000000','#c0392b','fin'],dmg:4},note:'Juega sucio y no se queda en la lona: se enfurece a la mitad y se levanta una vez con 40% de vida.',m:['#111111','#2ecc71','fin'],mv:[{n:'Golpe bajo',dmg:13,ap:{debil:1}},{n:'Escupitajo verde',ap:{abierto:2,debil:1}},{n:'Le paga al réferi',accuse:1,block:10},{n:'Silla escondida',dmg:20},{n:'Compinche desde afuera',dmg:7,hits:2},{n:'Coraza de alacrán',block:16,sf:{furia:2}},{n:'Mano rápida',dmg:6,steal:1},{n:'Picadura Final',dmg:26}]},
 venenoH:{n:'Kid Alacrán',hp:210,boss:1,ai:'calculador',revive:.4,transform:{at:.5,n:'Kid Alacrán (a todo o nada)',m:['#2ecc71','#000000','fin'],dmg:3},note:'La lucha de honor: lucha limpio, conoce todos tus trucos y se levanta una vez con 40% de vida.',m:['#2ecc71','#4a148c','fin'],mv:[{n:'Aguijonazo',dmg:10,ap:{debil:1}},{n:'Coraza de alacrán',block:14,sf:{furia:1}},{n:'Pinzas',dmg:8,hits:2},{n:'"Te conozco, carnal"',ap:{abierto:2}},{n:'Picadura Final',dmg:24}]},
 charro:{n:'El Charro Negro',ai:'tramposo',hp:40,note:'Su reata te amarra: tu siguiente carta cuesta +1.',m:['#222','#ffd23f','star'],mv:[{n:'Espuelazo',dmg:9},{n:'Reata',dmg:4,amarra:1},{n:'Grito',sf:{furia:2},block:5}]},
 tramposo:{n:'El Rata Tramposo',ai:'tramposo',hp:36,note:'Te roba cartas de la mano.',m:['#7f8c8d','#c0392b','x'],mv:[{n:'Carterista',dmg:4,steal:1},{n:'Piquete',dmg:6,ap:{debil:1}},{n:'Esconderse',block:9}]},
 ciclon:{n:'Los Gemelos Ciclón',ai:'agresivo',hp:58,twin:1,note:'Cuando baja a la mitad, entra el otro gemelo.',m:['#3b6fb6','#fff','bolt'],mv:[{n:'Doble patada',dmg:7,hits:2},{n:'Relevo',block:12,sf:{furia:1}},{n:'Ciclón doble',dmg:15}]},
 emperador:{n:'El Emperador Dorado',hp:80,boss:1,m:['#ffd23f','#8e44ad','crown'],mv:[{n:'Golpe imperial',dmg:14},{n:'Corona',block:15,sf:{furia:2}},{n:'Decreto',ap:{debil:2,abierto:2}},{n:'Lluvia de oro',dmg:6,hits:3}]},
 tiburon:{n:'Tiburón Blanco',ai:'agresivo',hp:56,blood:1,note:'Huele la sangre: pega +3 si tienes menos de la mitad de vida.',m:['#cfd8dc','#1565c0','fin'],mv:[{n:'Mordida',dmg:12},{n:'Frenesí',dmg:4,hits:4},{n:'Olfatear sangre',sf:{furia:3}}]},
 calavera:{n:'Calavera Ninja',ai:'tramposo',hp:52,note:'Su sombra esquiva tu siguiente ataque.',m:['#111','#fff','skull'],mv:[{n:'Estrella',dmg:7,hits:2,ap:{abierto:1}},{n:'Sombra',block:10,evade:1},{n:'Corte',dmg:14}]},
 jaguar:{n:'Rey Jaguar',ai:'agresivo',hp:62,m:['#f39c12','#111','spots'],mv:[{n:'Zarpazo',dmg:14},{n:'Rugido',sf:{furia:3},ap:{debil:1}},{n:'Salto',dmg:9,hits:2}]},
 nahual:{n:'El Nahual',ai:'calculador',hp:58,note:'A la mitad de su vida se transforma y pega más.',transform:{at:.5,n:'El Nahual (forma jaguar)',m:['#f39c12','#111','spots'],dmg:4},m:['#5d4037','#ff7043','bolt'],mv:[{n:'Transformación',block:12,sf:{furia:2}},{n:'Garra',dmg:11,ap:{debil:1}},{n:'Aullido',ap:{abierto:2,debil:1}}]},
 bestia:{n:'La Bestia del Ring',ai:'agresivo',hp:100,note:'Te carga: robas 1 carta menos el siguiente turno.',m:['#4e342e','#c0392b','horns'],mv:[{n:'Aplastar',dmg:18},{n:'Cargada',dmg:8,cargar:1},{n:'Rugir',sf:{furia:3},block:10},{n:'Azotón',dmg:9,hits:2,ap:{abierto:1}}]},
 siniestro:{n:'Dr. Siniestro',hp:125,boss:1,m:['#2c3e50','#2ecc71','x'],mv:[{n:'Inyección',ap:{debil:2,abierto:2}},{n:'Bisturí',dmg:8,hits:3},{n:'Experimento',sf:{furia:3},block:18},{n:'Anestesia',dmg:10,cargar:1},{n:'Operación',dmg:22}]},
 inmortal:{n:'El Inmortal',hp:165,boss:1,revive:.3,note:'Revive una vez con 30% de vida.',m:['#fff','#000','skull'],mv:[{n:'Llamado del más allá',sf:{furia:3},block:20},{n:'Guadaña',dmg:12,hits:2},{n:'Maldición eterna',ap:{debil:3,abierto:3}},{n:'Juicio final',dmg:30},{n:'Almas',dmg:5,hits:5}]},
 catrina:{n:'La Catrina Letal',ai:'calculador',hp:72,season:'muertos',m:['#fff','#8e44ad','skull'],mv:[{n:'Abanico',dmg:8,hits:2},{n:'Pan de muerto',block:12,sf:{furia:2}},{n:'Ofrenda',ap:{debil:2,abierto:2}},{n:'Baile final',dmg:17}]},
 nieve:{n:'El Hombre de Nieve',ai:'defensivo',hp:76,season:'navidad',m:['#fff','#3b6fb6','x'],mv:[{n:'Bola de nieve',dmg:6,hits:3},{n:'Ventisca',ap:{debil:2},block:10},{n:'Avalancha',dmg:18}]}
};
const ACTS=[{n:'Circuito Independiente',t0:0,span:2,pool:['chiva','gallo','momia','charro','tramposo'],elite:'ciclon',boss:'emperador',sc:1},
 {n:'Las Grandes Arenas',t0:3,span:1,pool:['tiburon','calavera','jaguar','nahual'],elite:'bestia',boss:'siniestro',sc:1},
 {n:'La Gira Mundial',t0:5,span:1,pool:['tiburon','calavera','jaguar','nahual','charro','tramposo'],elite:'bestia',boss:'inmortal',sc:1.25}];
const MASKS={
 oro:{n:'Máscara de Oro',e:'🟡',d:'+8 de vida máxima.'},
 halcon:{n:'Máscara del Halcón',e:'🦅',d:'Empiezas cada lucha con 3 de afición.'},
 acero:{n:'Máscara de Acero',e:'⚙️',d:'Empiezas cada lucha con 8 de defensa.'},
 roja:{n:'Máscara Roja',e:'🔴',d:'Empiezas cada lucha con 1 de furia.'},
 pueblo:{n:'Máscara del Pueblo',e:'🏘️',d:'Tras cada victoria, el pueblo te cuida: +4 de defensa en la siguiente lucha.'},
 diablo:{n:'Máscara del Diablo',e:'👹',d:'El réferi te descubre la mitad de las veces.'},
 azul:{n:'Máscara Azul',e:'🔵',d:'Robas 2 cartas extra en el primer turno.'},
 imperial:{n:'Máscara Imperial',e:'👑',d:'+1 de energía cada turno.',boss:1},
 siniestra:{n:'Máscara Siniestra',e:'🧪',d:'El rival empieza cada lucha Abierto 2 y Débil 1.',boss:1},
 cempa:{n:'Máscara de Cempasúchil',e:'🌼',d:'Te curas 2 al inicio de cada turno.',season:'muertos'},
 esfera:{n:'Máscara Navideña',e:'🎄',d:'+12 de vida máxima y +1 carta el primer turno.',season:'navidad'}
};
const SEASON=(()=>{const m=new Date().getMonth();if(m===9||m===10)return{k:'muertos',n:'🌼 Temporada de Muertos',en:'catrina'};if(m===11||m===0)return{k:'navidad',n:'🎄 Temporada Navideña',en:'nieve'};return{k:'regular',n:'🏟️ Temporada Regular',en:null};})();
const PASS=[{f:['fama',20],p:'Máscara dorada brillante'},{f:['pat','flame'],p:'Entrada con humo'},{f:['fama',30],p:'Lona morada'},{f:['pat','heart'],p:'Grito de victoria'},{f:['fama',40],p:'Capa de campeón'},{f:['fama',50],p:'Música de entrada'},{f:['pat','diamond'],p:'Máscara arcoíris'},{f:['fama',60],p:'Trono de entrada'},{f:['fama',80],p:'Cinturón de oro'},{f:['titulo','Leyenda del Pancracio'],p:'Marco de perfil'}];
const PASSXP=80;
const CAB=['Normal','Rivales +10% de vida','Los jefes pegan +2','Empiezas con 10 de vida menos','Los rivales normales pegan +2','Ganas 25% menos dinero','Rivales +10% de vida extra','El gimnasio cura 20% en vez de 30%','Los jefes empiezan con 2 de furia','Empiezas con una carta de Lesión en el mazo','Cabellera máxima: rivales +2 de daño y +10% de vida'];
const ACHS=['s_sobrio','s_carnal','s_fiel','s_estafa','s_levanta','s_milagro','s_jaula','s_lluvia','s_rapado'];
const ACH={s_sobrio:['🥤','Cero copas','Termina el modo historia sin tomar ni una vez',60],s_carnal:['🤙','Carnales para siempre','Termina la historia con Beto como tu mejor amigo',60],s_fiel:['🤝','Lealtad','Termina la historia sin cambiar de representante',50],s_estafa:['💸','Lo que no te mata','Gana la historia después de que te estafaron',60],s_levanta:['✌️','¡En dos!','Levántate en la cuenta de dos y gana esa lucha',40],s_milagro:['🙏','El milagro','Tu abuelo se recupera de su enfermedad',40],s_jaula:['🔒','Rey de la jaula','Gana una lucha en jaula',30],s_lluvia:['🎉','Lluvia de vasos','Atrapa 10 objetos que avienta el público',30],s_rapado:['💇','Peluquero','Rapa a un rival en cabellera contra cabellera',30],primera:['🥇','Primera sangre','Gana tu primera lucha',10],mascara1:['🎭','Máscara en mano','Gana tu primera Máscara contra Máscara',25],campeon:['🏆','Campeón Mundial','Termina el modo historia como campeón',100],limpio:['😇','Juego limpio','Sé campeón sin usar cartas sucias',60],rana:['🐸','¡Se rindió!','Remata a un rival con La Rana',20],fin10:['🌟','Showman','Usa 10 llaves maestras',30],vuelo:['🪽','Vuelo en cadena','Haz el combo de 3 llaves aéreas',15],combinada:['🔗','Llavero','Haz el combo de 2 llaves',15],rafaga:['👊','Ráfaga','Haz el combo de 4 ataques',15],intocable:['🛡️','Intocable','Gana una lucha sin recibir daño',25],nocaut:['💥','Nocaut','Haz 40 o más de daño con una sola carta',25],rico:['💰','Bolsa llena','Junta $200 en una historia',20],revancha:['😤','Revancha','Vence a tu némesis',20],mini:['⭐','Pequeño gigante','Llega al Campeonato Mundial con Mini Estrella',50],racha7:['🔥','Fiel a la arena','Juega 7 días seguidos',50],coleccion:['📖','Coleccionista','Consigue 6 máscaras distintas',40],diario:['📅','Constante','Gana 3 luchas del día',30],cab3:['💇','Sin miedo','Gana el modo historia en Cabellera 3 o más',80],todos:['🤼','El vestidor completo','Desbloquea a todos los luchadores',60],torneo:['🏆','Campeón de torneo','Gana un torneo eliminatorio',40],retos5:['👻','Cazafantasmas','Gana 5 retos',30],promotor:['🏟️','Empresario','Organiza 5 funciones',30],historia:['📜','Final de película','Termina la historia de un luchador',40],trofeo:['🎭','Cazamáscaras','Gánale la máscara a tu némesis',40],legend:['🌟','¡Legendaria!','Consigue una carta legendaria',20]};
const TUT=[{t:'👋 ¡Bienvenido al ring! Tu rival está a la derecha. El letrero blanco <b>⚔️6</b> dice que en su turno te va a pegar 6.',need:'ok'},
 {t:'Cada carta cuesta ⚡ energía (tienes 3 por turno). Toca <b>👊 GOLPE</b> para pegarle.',need:'golpe'},
 {t:'¡Bien! Ahora toca <b>🛡️ BLOQUEO</b>. La defensa te protege del golpe que viene este turno.',need:'bloqueo'},
 {t:'Cuando termines, toca <b>TERMINAR ▶</b> para que el rival haga su movimiento.',need:'end'},
 {t:'¡El bloqueo aguantó casi todo! Las cartas con 🪽 son llaves aéreas y llenan la <b>afición 📣</b>. Toca <b>🌀 HURRACARRANA</b>.',need:'hurra'},
 {t:'<b>🙌 Saludo al público</b> cuesta 0 y prende a la gente. ¡Tócalo!',need:'saludo'},
 {t:'📣 ¡La afición está al máximo! Te llegó tu <b>LLAVE MAESTRA</b> (la carta dorada). ¡Remata al Costal!',need:'finT'}];
const UNMASKED=['Pancho López, contador de Toluca','Don Beto, el de la tiendita','Rigoberto, maestro de secundaria','tu vecino de enfrente','Juan Pérez, taxista','el primo de tu compadre','un dentista de Monterrey','el señor de los tamales'];
const SHOUTS={air:['¡SE TIRÓ DESDE LA TERCERA!','¡VUELA, VUELA!','¡QUÉ BÁRBARO!','¡DESDE LAS ALTURAS!'],big:['¡TREMENDO CASTIGO!','¡QUÉ GOLPAZO!','¡LO DEJÓ VIENDO ESTRELLAS!'],dirty:['¡EL RÉFERI NO VIO NADA!','¡QUÉ TRAMPOSO!','¡ABUCHEOS EN LA ARENA!'],fin:['¡LA LLAVE MAESTRA!','¡SE CAE LA ARENA!','¡LOCURA TOTAL!']};

// ---------- Meta / guardado ----------
let META;
function defMeta(){return{fama:0,total:0,unl:['T','R'],man:['ninguno'],upg:{},album:[],unmasked:[],pats:['star','horns'],mask:{a:'#3b6fb6',b:'#ffd23f',p:'star'},streak:{last:'',n:0},daily:{date:'',best:0,done:false},nemesis:null,pass:{season:SEASON.k,xp:0,claimed:[]},stats:{runs:0,wins:0,bestAct:0},titulo:'',coins:0,col:null,decks:{},freePack:'',tutDone:false,hints:{},belts:[],belt:'',trophies:[],ghosts:[],promo:{lvl:1,fans:0,last:0,shows:0,full:0},look:{cape:'',boots:'',trunk:''},capeOwned:false,theme:'clasico',themes:['clasico'],pose:'brazos',poses:['brazos'],story:{},opt:{sfx:1,music:1,spd:1,vib:1,big:0,voz:1},ach:{},cnt:{fin:0,daily:0},maxCab:0,sel:{l:'T',man:'ninguno',partner:'R',cab:0}};}
function colAdd(id,n){META.col[id]=META.col[id]||{n:0,lv:1};META.col[id].n+=(n||1);}
function addStarter(l){LUCH[l].deck.forEach(id=>colAdd(id));}
function colInit(){if(!META.col){META.col={};META.unl.forEach(addStarter);if(META.tutDone&&!META.colGift){META.fama+=300;META.colGift=1;}saveMeta();}}
function coins(n){META.fama+=n;META.total=(META.total||0)+n;}
function loadMeta(){setTimeout(()=>{if(META&&META.coins){META.fama+=META.coins;META.coins=0;saveMeta();}},0);try{const s=localStorage.getItem('mcm_meta');META=s?Object.assign(defMeta(),JSON.parse(s)):defMeta();}catch(e){META=defMeta();}if(META.pass.season!==SEASON.k)META.pass={season:SEASON.k,xp:0,claimed:[]};if(META.sel.cab===undefined)META.sel.cab=0;if(!META.cnt)META.cnt={fin:0,daily:0};if(!META.ach)META.ach={};META.opt=Object.assign({sfx:1,music:1,spd:1,vib:1,big:0,voz:1,ent:1},META.opt||{});META.cnt.retos=META.cnt.retos||0;META.look=Object.assign({cape:'',boots:'',trunk:''},META.look||{});}
function saveMeta(){try{localStorage.setItem('mcm_meta',JSON.stringify(META))}catch(e){}}
const upl=k=>META.upg[k]||0;
function saveRun(){if(!P||P.daily||P.tut||P.mode)return;try{localStorage.setItem('mcm_run',JSON.stringify(P))}catch(e){}}
function loadRun(){try{const s=localStorage.getItem('mcm_run');const r=s?JSON.parse(s):null;if(r&&(!r.map||!r.map.rows))return null;return r;}catch(e){return null}}
function clearRun(){try{localStorage.removeItem('mcm_run')}catch(e){}}
let achT=0;function unlock(id){if(!META||META.ach[id]||(P&&P.tut))return;const A=ACH[id];META.ach[id]=1;META.fama+=A[3];META.total+=A[3];saveMeta();const el=document.getElementById('ach');el.textContent='🏅 Logro: '+A[0]+' '+A[1]+' (+'+A[3]+'⭐)';el.classList.add('on');try{sfx.win()}catch(e){}clearTimeout(achT);achT=setTimeout(()=>el.classList.remove('on'),2600);}

// ---------- Utilidades de cartas ----------
function def(c){const d=CARDS[c.id];let u=d;if(c.up&&d.up){u={...d,...d.up};if(d.up.ap)u.ap={...d.ap,...d.up.ap};}
 if(c.mods){u={...u};const m=c.mods;if(m.c)u.c=Math.max(0,u.c+m.c);if(m.air){u.air=1;u.aff=(u.aff||0)+2;}if(m.aff)u.aff=(u.aff||0)+m.aff;}return u;}
function baseDmg(d){let b=d.dmg+(P&&P.l==='G'?2:0)+(d.dirty&&META.belt==='hard'?2:0);if(!C||C.over)return b;const E=C.e;if(d.sub&&E.hp<=E.max*.4)b*=3;if(d.finish&&E.hp<E.max*.5)b*=2;if(d.counter&&E.cur&&E.cur.dmg&&!E.st.mareado)b+=d.counter;if(d.air){if(C.p.st.regreso)b*=2;if(C.pos==='cuerdas')b=Math.floor(b*1.5);if(C.pos==='tercera')b*=2;}return b;}
function shownDmg(d){const b=baseDmg(d);if(!C||C.over)return b;return dmgCalc(b,{st:C.p.st},C.e);}
function cardText(c,live){const d=def(c),t=[];
 if(d.useless)t.push('No se puede jugar. Solo estorba');
 if(d.choice)t.push('Elige: '+d.choice.map(o=>o.t).join(' / '));
 if(d.pos)t.push(d.pos==='tercera'?'Subes a la tercera 🗼 (aéreas x2, recibes +50%, sin llaves)':'Vas a las cuerdas 🪢 (aéreas x1.5)');
 if(d.finish)t.push('Doble si el rival tiene menos de 50%');if(d.counter)t.push('+'+d.counter+' si el rival va a atacar');
 if(d.en)t.push('+'+d.en+' Energía');if(d.subx)t.push('Llena la rendición el doble');
 if(d.dmg){const base=d.dmg+(P&&P.l==='G'?2:0),sd=live?shownDmg(d):base;t.push('Daño <b class="'+(sd>base?'dmgup':sd<base?'dmgdn':'')+'">'+sd+'</b>'+(d.hits?' x'+d.hits:''));}
 if(d.block)t.push('Defensa '+d.block);
 if(d.sub)t.push('Si el rival tiene 40% de vida o menos: daño x3');
 if(d.llave)t.push('Llena la barra de rendición');
 if(d.fuera)t.push('Esquivas todo el próximo ataque y tu siguiente llave aérea hace doble daño');
 if(d.ap)t.push((d.cond==='abierto'?'Si el rival está Abierto 🎯: ':'')+Object.entries(d.ap).map(([k,v])=>STN[k]+(k==='mareado'?'':' '+v)).join(', '));
 if(d.sf)t.push('+'+d.sf.furia+' Furia');if(d.contra)t.push('Devuelve '+d.contra+' por golpe');
 if(d.aff)t.push('+'+d.aff+' Afición');if(d.draw)t.push('Roba '+d.draw);if(d.heal)t.push('Cura '+d.heal);if(d.healAff)t.push('Te curas tanto como tu afición (mín. 2)');if(d.self)t.push('Te haces '+d.self);
 if(d.dirty)t.push('<i>Sucio'+(d.dirty>1?' x'+d.dirty:'')+'</i>');if(d.ex)t.push('<i>Se agota</i>');return t.join('. ')+'.';}
function cardCost(c){const d=def(c);return d.c+(C&&C.hand&&C.hand.includes(c)&&C.p.st.amarrado?1:0);}
const CAT={atk:{n:'GOLPE',i:'👊',bg:'#ffcdd2',hd:'#c62828'},air:{n:'AÉREA',i:'🪽',bg:'#b3e5fc',hd:'#0277bd'},llave:{n:'LLAVE',i:'🔗',bg:'#ffe0b2',hd:'#e65100'},def:{n:'DEFENSA',i:'🛡️',bg:'#c5cae9',hd:'#283593'},show:{n:'SHOW',i:'📣',bg:'#f8bbd0',hd:'#ad1457'},cura:{n:'CURA',i:'❤️',bg:'#c8e6c9',hd:'#2e7d32'},mov:{n:'MOVIMIENTO',i:'📍',bg:'#fff9c4',hd:'#c79100'},sucia:{n:'SUCIA',i:'😈',bg:'#e1bee7',hd:'#6a1b9a'},tac:{n:'TÁCTICA',i:'🎲',bg:'#d7ccc8',hd:'#4e342e'},fin:{n:'MAESTRA',i:'🌟',bg:'linear-gradient(#fff59d,#ffb74d)',hd:'#b8860b'},lesion:{n:'LESIÓN',i:'🤕',bg:'#cfd8dc',hd:'#546e7a'}};
function cardCat(d){if(d.useless)return'lesion';if(d.t==='fin')return'fin';if(d.dirty)return'sucia';if(d.choice)return'tac';if(d.air)return'air';if(d.llave)return'llave';if((d.heal||d.healAff)&&!d.dmg)return'cura';if(d.pos&&!d.dmg)return'mov';if(d.t==='def')return'def';if(d.t==='hab')return(d.aff||d.sf)?'show':'tac';return'atk';}
function chipsHTML(d,live){const k=[];const cl=(v,b)=>v>b?' up':v<b?' dn':'';
 if(d.dmg){const b=d.dmg+(P&&P.l==='G'?2:0),v=live?shownDmg(d):b;k.push('<span class="kc'+cl(v,b)+'">⚔️'+v+(d.hits?'×'+d.hits:'')+'</span>');}
 if(d.block)k.push('<span class="kc">🛡️'+d.block+'</span>');if(d.heal)k.push('<span class="kc">❤️'+d.heal+'</span>');if(d.healAff)k.push('<span class="kc">❤️='+(live?Math.max(2,C.aff):'📣')+'</span>');
 if(d.aff)k.push('<span class="kc">📣'+d.aff+'</span>');if(d.draw)k.push('<span class="kc">🃏'+d.draw+'</span>');if(d.en)k.push('<span class="kc">⚡'+d.en+'</span>');
 if(d.ap)for(const s in d.ap)k.push('<span class="kc">'+STI[s]+(NONUM.includes(s)?'':d.ap[s])+'</span>');
 if(d.sf)k.push('<span class="kc">🔥'+d.sf.furia+'</span>');if(d.contra)k.push('<span class="kc">↩️'+d.contra+'</span>');if(d.self)k.push('<span class="kc">🩸-'+d.self+'</span>');
 if(d.pos)k.push('<span class="kc">'+(d.pos==='tercera'?'🗼':'🪢')+'</span>');if(d.fuera)k.push('<span class="kc">🏃</span>');if(d.ex)k.push('<span class="kc">⏳</span>');if(d.dirty)k.push('<span class="kc">👁+'+d.dirty+'</span>');
 return'<div class="kcs">'+k.join('')+'</div>';}
function basicText(d){const t=[];if(d.dmg)t.push('Pega '+d.dmg+(d.hits?' × '+d.hits:''));if(d.block)t.push('Te cubres '+d.block);if(d.heal)t.push('Curas '+d.heal);if(d.self)t.push('te quita '+d.self+' de vida');if(d.draw)t.push('robas '+d.draw);if(d.en)t.push('+'+d.en+' energía');if(d.aff)t.push('+'+d.aff+' afición');const s=t.join(', ');return s?s.charAt(0).toUpperCase()+s.slice(1):'';}
function specialText(d){const t=[];if(d.useless)t.push('No se puede jugar');if(d.choice)t.push('Elige 1 de 3 efectos');if(d.sub)t.push('x3 si el rival ≤40%');if(d.finish)t.push('x2 si el rival <50%');if(d.counter)t.push('+'+d.counter+' si el rival ataca');if(d.cond)t.push('💫 solo si está 🎯');if(d.subx)t.push('Rendición x2');if(d.llave&&!d.sub)t.push('Llena la rendición');if(d.fuera)t.push('Esquiva el próximo golpe');if(d.pos==='tercera')t.push('Aéreas x2 · recibes +50%');if(d.pos==='cuerdas')t.push('Aéreas x1.5');if(d.healAff)t.push('Cura = tu afición');if(d.t==='fin')t.push('¡Tu golpe definitivo!');return t.length?t.join(' · '):basicText(d);}
const CNUM={};Object.keys(CARDS).forEach((k,i)=>CNUM[k]=i+1);let CREG={},CRN=0;
function cardHTML(c,i,disabled){const d=def(c);const live=!!(C&&C.hand&&C.hand.includes(c));const m=c.mods||{};const am=live&&C.p.st.amarrado;const K=CAT[cardCat(d)];
 if(CRN>3000){CREG={};CRN=0;}const key='c'+(++CRN);CREG[key]=c;
 const rr=(d.rar==='l'?' rl':d.rar==='r'?' rr':' rc')+(live&&C.keep===c.uid?' kept':'')+(live&&d.llave&&C.pos==='tercera'?' no':'');
 return'<div class="card'+rr+(c.up?' upg':'')+(disabled?' no':'')+'" data-i="'+i+'" data-c="'+key+'" style="--bg:'+K.bg+';--hd:'+K.hd+'"><div class="in"><div class="co"'+(am?' style="background:#ff6b6b"':'')+'>'+(d.useless?'✖':cardCost(c))+'</div>'+(live&&d.t!=='fin'&&!C.tut?'<div class="pin" data-pin="'+i+'">📌</div>':'')
  +'<div class="nm">'+d.n+(c.up?'+':'')+(m.c?' 🪶':'')+(m.aff?' ✨':'')+(m.air?' 🪽':'')+'</div><div class="art">'+cardArt(d,c.id)+'</div><div class="ty">'+K.i+' '+K.n+'</div>'+chipsHTML(d,live)+'<div class="ct">'+specialText(d)+'</div>'
  +'<div class="ft"><span>#'+String(CNUM[c.id]||0).padStart(3,'0')+'</span><span>'+(d.rar==='l'?'★ LEGENDARIA':d.rar==='r'?'◆ RARA':'● COMÚN')+'</span></div><div class="info">i</div></div></div>';}
function cardTips(d){const t=[];
 if(d.t==='fin')t.push('Cuesta 0 y se queda en tu mano hasta que la uses. Úsala cuando el rival no tenga mucha defensa 🛡️.');
 if(d.air)t.push('Pega <b>x1.5 desde las cuerdas 🪢</b> y <b>x2 desde la tercera 🗼</b>.','3 aéreas en un mismo turno = <b>Vuelo en cadena</b> (+10 de daño).');
 if(d.llave)t.push('Llena la <b>barra de rendición</b>: al 100% el rival se rinde, aunque tenga mucha vida.','2 llaves en un turno = <b>Llave combinada</b> (Débil + Abierto).','No se puede usar desde la tercera 🗼.');
 if(d.sub)t.push('Guárdala para cuando el rival tenga <b>40% o menos</b>: hace triple daño.');
 if(d.finish)t.push('Úsala cuando el rival esté <b>debajo de la mitad</b> de su vida.');
 if(d.counter)t.push('Úsala cuando el letrero del rival muestre <b>⚔️</b> (va a atacar).');
 if(d.cond)t.push('Primero deja al rival <b>Abierto 🎯</b> (por ejemplo con Llave al brazo) para que además lo marees 💫 y pierda su turno.');
 if(d.block&&!d.dmg)t.push('Úsala cuando el rival vaya a atacar. El botón <b>Listo</b> te dice cuánto daño recibirías.');
 if(d.contra)t.push('Brilla contra rivales que pegan varias veces (⚔️x2, x3): devuelve daño por cada golpe.');
 if(d.heal)t.push('Úsala cuando ya te hayan pegado: si tienes la vida llena, se desperdicia.');
 if(d.healAff)t.push('Primero llena la afición 📣: entre más afición, más te curas.');
 if(d.aff)t.push('La afición 📣 al llegar a 10 te da tu <b>llave maestra</b>.');
 if(d.dirty)t.push('Sube la sospecha del réferi 👁. No llegues al límite al terminar el turno… o aprovecha cuando el réferi esté en el suelo.');
 if(d.pos==='tercera')t.push('Súbete y en el mismo turno usa una aérea: si te quedas arriba, recibes +50% de daño.');
 if(d.pos==='cuerdas')t.push('Juégala justo antes de una aérea para pegar x1.5.');
 if(d.fuera)t.push('Ideal cuando el rival anuncia un golpe muy fuerte: lo esquivas completo.');
 if(d.draw||d.en)t.push('Úsala al principio del turno para tener más opciones.');
 if(d.self)t.push('Te lastima un poco 🩸: cuidado si te queda poca vida.');
 if(d.sf)t.push('La furia 🔥 dura toda la lucha: entre más pronto, mejor.');
 if(d.ap&&d.ap.debil)t.push('Débil 🥴: el rival pega 25% menos mientras dure.');
 if(d.ap&&d.ap.abierto)t.push('Abierto 🎯: el rival recibe 50% más daño. Juégala antes de tus golpes fuertes.');
 if(d.choice)t.push('Elige según lo que anuncie el rival: defensa si va a atacar, otra cosa si no.');
 if(d.ex)t.push('Se agota ⏳: solo la puedes usar una vez por lucha.');
 if(d.useless)t.push('No sirve para nada. Cúrala en el gimnasio con Fisioterapia.');
 if(!t.length)t.push('Carta básica y confiable. Combínala con efectos como Abierto 🎯 o Furia 🔥.');return t;}
function showInfo(c){if(!c)return;const d=def(c),z=$('#zoom');const u=(!c.up&&CARDS[c.id].up)?{...c,up:true}:null;
 z.innerHTML='<div style="display:flex;flex-direction:column;align-items:center;gap:44px"><div style="margin-top:40px">'+cardHTML(c,0)+'</div><div class="tips"><b>📖 Qué hace</b><br>'+cardText(c)+'<br><br><b>💡 Cómo usarla mejor</b><br>• '+cardTips(d).join('<br>• ')+(u?'<br><br><b>💪 Mejorada:</b> '+cardText(u):'')+'<br><br><span class="small">Toca para cerrar</span></div></div>';z.classList.add('on');z.onclick=()=>z.classList.remove('on');}
document.addEventListener('click',e=>{const t=e.target&&e.target.closest&&e.target.closest('.card .info');if(!t)return;e.stopPropagation();e.preventDefault&&e.preventDefault();const el=t.closest('.card');showInfo(CREG[el.dataset.c]);sfx.card();},true);
function lpBind(el,c,onTap){let t=0,lp=false;el.onpointerdown=()=>{lp=false;clearTimeout(t);t=setTimeout(()=>{lp=true;zoomCard(c);},420);};el.onpointerup=el.onpointerleave=el.onpointercancel=()=>clearTimeout(t);el.oncontextmenu=e=>{e.preventDefault&&e.preventDefault();};el.onclick=()=>{if(lp){lp=false;return;}onTap();};}
function zoomCard(c){if(!c)return;const z=$('#zoom');const ft=x=>'<div class="small" style="margin-top:46px;max-width:170px;background:#000a;padding:4px 6px;border-radius:6px">'+cardText(x)+'</div>';let h='<div style="text-align:center;display:flex;flex-direction:column;align-items:center"><div class="small" style="margin-bottom:46px">Actual</div>'+cardHTML(c,0)+ft(c)+'</div>';const d=CARDS[c.id];if(!c.up&&d.up){const u={...c,up:true};h+='<div style="text-align:center;display:flex;flex-direction:column;align-items:center"><div class="small" style="margin-bottom:46px">Mejorada 💪</div>'+cardHTML(u,0)+ft(u)+'</div>';}h+='<div style="width:100%;text-align:center" class="small">Toca para cerrar</div>';z.innerHTML=h;z.classList.add('on');z.onclick=()=>z.classList.remove('on');}
let UID=1;const mkc=(id,up)=>({id,up:!!up,uid:UID++});

// ---------- Sonido ----------
let AC=null;function MV(){return META&&META.opt&&META.opt.mv!==undefined?META.opt.mv:.7;}function SV(){return META&&META.opt&&META.opt.sv!==undefined?META.opt.sv:.8;}
function beep(f,d,ty,v,dl){if(META&&META.opt&&!META.opt.sfx)return;tone(f,d,ty,(v||.05)*SV(),dl);}function toneM(f,d,ty,v){tone(f,d,ty,v*MV()*1.4*MF());}
function tone(f,d,ty,v,dl){try{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime+(dl||0),o=AC.createOscillator(),g=AC.createGain();o.type=ty||'square';o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(v||.05,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.02);}catch(e){}}
let MUS=null,MUSK=null,MF0=0;function MF(){const m=MUSK==='menu',t=Math.max(0,(performance.now()-MF0)/(m?7000:2500));return Math.min(1,t*t)*(m?.5:1);}
function musicStart(boss){musicStop();if(!META.opt.music)return;MUSK=boss;MF0=performance.now();try{if(!AC)AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
 if(typeof boss==='string'&&VTH[boss])return musicVenue(VTH[boss]);
 const th=boss===true?THEMES.jefe:THEMES[typeof boss==='string'?boss:(META.theme||'clasico')]||THEMES.clasico;const bass=th.b,lead=th.l;let i=0;
 MUS=setInterval(()=>{if(!META.opt.music)return;if(bass[i%8])toneM(bass[i%8],.16,th.bt||'square',.016);if(i%2===0&&lead[(i>>1)%8])toneM(lead[(i>>1)%8],.14,'triangle',.02);if(i%4===2||th.g)toneM(th.g?3200:2400,.03,'square',th.g?.004:.006);i++;},th.t);}
const THEMES={clasico:{n:'Clásico de arena',b:[131,131,165,131,147,147,175,147],l:[523,0,659,0,587,659,784,0],t:220,cost:0},rock:{n:'Rock pesado',b:[82,82,98,82,110,110,98,73],l:[330,0,392,0,440,392,330,0],t:180,bt:'sawtooth',cost:80},cumbia:{n:'Cumbia del ring',b:[131,0,196,0,147,0,220,0],l:[523,587,659,0,659,587,523,0],t:160,g:1,cost:80},epico:{n:'Épico',b:[110,110,110,110,87,87,98,98],l:[440,0,523,659,587,0,523,494],t:200,cost:120},jefe:{n:'Jefe',b:[110,110,131,110,98,98,123,98],l:[440,0,523,0,494,0,440,392],t:190,cost:-1}};
function musicStop0(){}
let NZ=null;function noiseB(){if(!NZ){const b=AC.createBuffer(1,Math.floor(AC.sampleRate*.3),AC.sampleRate);const d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;NZ=b;}return NZ;}
function drum(k){try{const t=AC.currentTime;if(k==='k'){const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.setValueAtTime(140,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);g.gain.setValueAtTime(.09*MV()*1.4*MF(),t);g.gain.exponentialRampToValueAtTime(.0001,t+.16);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.18);return;}
 const Q={s:['bandpass',1800,.05,.13],h:['highpass',7000,.018,.035],g:['bandpass',3800,.035,.06],c:['highpass',5000,.03,.3]}[k];if(!Q)return;const sr=AC.createBufferSource();sr.buffer=noiseB();const f=AC.createBiquadFilter(),g=AC.createGain();f.type=Q[0];f.frequency.value=Q[1];g.gain.setValueAtTime(Q[2]*MV()*1.4*MF(),t);g.gain.exponentialRampToValueAtTime(.0001,t+Q[3]);sr.connect(f);f.connect(g);g.connect(AC.destination);sr.start(t);sr.stop(t+Q[3]+.02);}catch(e){}}
// Temas por categoría (16 pasos): b=bajo, l=melodía, c=acordes, k=bombo/tarola, h=platillo/güiro
const VTH={
 v0:{n:'Cumbia sonidera',t:150,bt:'triangle',lt:'square',b:[110,0,0,165,110,0,0,165,98,0,0,147,98,0,0,147],l:[440,0,523,0,494,440,0,392,440,0,0,0,330,392,440,0],k:'k...s...k...s...',h:'g.g.g.g.g.g.g.g.'},
 v1:{n:'Banda de pueblo',t:125,bt:'sawtooth',lt:'triangle',b:[147,0,0,0,220,0,0,0,147,0,0,0,220,0,0,0],c:[0,0,[294,370,440],0,0,0,[294,370,440],0,0,0,[277,330,440],0,0,0,[294,370,440],0],l:[587,0,740,0,880,0,740,0,784,0,659,0,587,0,0,0],k:'k...s...k...s...',h:''},
 v2:{n:'Arena de barrio',t:190,bt:'square',lt:'triangle',b:[131,0,131,0,165,0,131,0,147,0,147,0,175,0,147,0],l:[523,0,0,0,659,0,0,0,587,0,659,0,784,0,0,0],k:'k...s...k.k.s...',h:'h.h.h.h.h.h.h.h.'},
 v3:{n:'Mariachi de la Coliseo',t:165,bt:'triangle',lt:'sawtooth',b:[98,0,147,0,196,0,147,0,110,0,165,0,220,0,165,0],l:[392,0,494,587,0,587,494,392,440,0,523,659,0,587,523,494],k:'k.....s.k.....s.',h:'..h...h...h...h.'},
 v4:{n:'Fanfarria nacional',t:180,bt:'square',lt:'square',b:[110,110,110,110,87,87,87,87,98,98,98,98,131,131,123,123],l:[440,0,523,0,659,0,587,523,494,0,523,0,587,0,0,0],k:'k..k..s.k..k..s.',h:'h.h.h.h.h.h.h.h.'},
 v5:{n:'Rock texano',t:150,bt:'sawtooth',lt:'square',b:[82,82,82,82,82,82,98,98,110,110,110,110,98,98,73,73],l:[330,0,392,0,440,0,392,330,0,0,294,0,330,0,0,0],k:'k...s...k.k.s...',h:'hhhhhhhhhhhhhhhh'},
 v6:{n:'Himno del estadio',t:170,bt:'square',lt:'square',b:[131,0,131,0,175,0,175,0,196,0,196,0,175,0,165,0],c:[[262,330,392],0,0,0,[349,440,523],0,0,0,[392,494,587],0,0,0,[349,440,523],0,0,0],l:[523,0,659,784,0,784,880,784,659,0,698,587,523,0,0,0],k:'k.k.s...k.k.s...',h:'c.......c.......'},
 menu:{n:'Tema principal',t:140,bt:'triangle',lt:'square',b:[110,0,165,0,147,0,165,0,131,0,196,0,175,0,165,0],c:[[220,262,330],0,0,0,0,0,0,0,[262,330,392],0,0,0,0,0,0,0],l:[440,0,523,587,659,0,587,523,494,0,440,0,392,440,0,0],k:'k...s...k.k.s...',h:'..g...g...g...g.'},
 boss:{n:'Máscara contra Máscara',t:160,bt:'sawtooth',lt:'square',b:[110,110,131,110,98,98,123,98,110,110,131,110,87,87,98,98],l:[440,0,523,0,494,0,440,392,440,0,523,659,587,0,523,494],k:'k.k.s.k.k.k.s.k.',h:'hhhhhhhhhhhhhhhh'}};
function musicVenue(th){let i=0;MUS=setInterval(()=>{if(!META.opt.music)return;const j=i%16;if(th.b[j])toneM(th.b[j],.18,th.bt,.018);if(th.l[j])toneM(th.l[j],.15,th.lt,th.lt==='sawtooth'?.012:.016);if(th.c&&th.c[j])th.c[j].forEach(f=>toneM(f,.2,'triangle',.008));const kk=th.k[j],hh=th.h&&th.h[j];if(kk&&kk!=='.')drum(kk);if(hh&&hh!=='.')drum(hh);i++;},th.t);}
function musicStop(){MUSK=null;if(MUS){clearInterval(MUS);MUS=null;}}
let VOICE=null,VMALE=false,vozLast=0;function pickVoice(){try{const vs=speechSynthesis.getVoices().filter(v=>/^es/i.test(v.lang));const MALE=/Jorge|Juan|Diego|Carlos|Ra[uú]l|Pablo|Andr[eé]s|Enrique|[AÁ]lvaro|Alonso|Gerardo|Liberto|Cecilio|Luciano|Tom[aá]s|Gonzalo|Mart[ií]n|Miguel|Javier|Federico|Emilio|Rodrigo|Arnau|Dario|male/i,GOOD=/Natural|Online|mejorad|Enhanced|Premium|Neural/i,LOC=/es[-_](MX|US|419)/i;const sc=v=>(MALE.test(v.name)?10:0)+(GOOD.test(v.name)?5:0)+(LOC.test(v.lang)?3:0)+(/female|mujer|Paulina|M[oó]nica|Sabina|Helena|Laura|Dalia|Elvira|Google español$/i.test(v.name)?-12:0);vs.sort((a,b)=>sc(b)-sc(a));VOICE=vs[0]||null;VMALE=!!(VOICE&&MALE.test(VOICE.name));}catch(e){}}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}catch(e){}
function voz(parts,force){if(!META||!META.opt.voz)return;const now=Date.now();if(!force&&(now-vozLast<2200||(window.speechSynthesis&&speechSynthesis.speaking)))return;vozLast=now;if(typeof parts==='string')parts=[{t:parts}];
 try{speechSynthesis.cancel();parts.forEach(p=>{const u=new SpeechSynthesisUtterance(p.t);if(VOICE){u.voice=VOICE;u.lang=VOICE.lang;}else u.lang='es-MX';const pp=p.p||1.2,rr=p.r||1.15;u.rate=Math.max(.95,Math.min(1.22,.9+(rr-1)*.6));u.pitch=Math.max(.7,Math.min(1.08,(VMALE?.82:.68)+(pp-1)*.55));u.volume=META.opt.vv!==undefined?META.opt.vv:1;speechSynthesis.speak(u);});}catch(e){}}
const HYPE={big:['¡Qué golpazo!','¡Uy, uy, uy!','¡Lo está destrozando!','¡Tremendo castigo!'],air:['¡Vuela, vuela!','¡Desde las alturas!','¡Qué locura!','¡Se tiró, se tiró!'],sub:['¡Lo tiene atrapado!','¡Se va a rendir!'],low:['¡Está contra las cuerdas!','¡Aguanta, campeón!']};
function hype(k){voz([{t:pick(HYPE[k]),p:1.3,r:1.2}]);}
const NARR={start:['¡Arranca la lucha! {p} contra {e}. ¡Que suene la campana!','¡Comienza el combate! {p} y {e} se miden en el centro del ring.','¡Ahí va la campana! {e} no le quita la vista a {p}.'],
 hit:['{p} conecta {m}.','¡Buen golpe de {p}!','{m} de {p}, y {e} lo resiente.'],
 big:['¡Tremendo {m} de {p}! ¡{e} se tambalea!','¡Qué castigo! ¡{p} no tiene piedad!','¡Se cimbró la lona con ese {m}!'],
 air:['¡{p} se lanza por los aires! ¡{m}!','¡Vuela, vuela {p}! ¡Qué locura!','¡Desde las alturas! ¡{m} espectacular de {p}!'],
 llave:['¡{p} aplica {m}! ¡{e} está atrapado!','¡Llave de {p}! ¡{e} busca las cuerdas!','¡Lo tiene amarrado! ¡{m}!'],
 dirty:['¡Ay, ay, ay! ¡{p} hace trampa y el réferi no vio nada!','¡Qué rudeza de {p}! ¡{m}!','¡Eso no se vale, {p}! ¡Pero la gente lo disfruta!'],
 block:['{p} se cubre bien.','{p} cierra la guardia y espera.'],
 fin:['¡AQUÍ VIENE! ¡{m}! ¡La llave final de {p}!','¡NO LO PUEDO CREER! ¡{m}! ¡{e} está acabado!'],
 eBig:['¡Responde {e} con {m}! ¡Qué golpazo!','¡{e} le pega con todo a {p}!','¡Ay, mamá! ¡{m} de {e}!'],
 eCombo:['¡Combo de {e}! ¡{m}! ¡{p} está en problemas!','¡{e} encadena todo su arsenal! ¡{m}!'],
 eDirty:['¡Trampa de {e}! ¡Réferi, réferi!','¡{e} juega sucio! ¡Qué descaro!'],
 eHeal:['{e} busca aire en las cuerdas.','{e} se toma un respiro. Está cansado.'],
 low:['¡{p} está contra las cuerdas! ¡Aguanta, aguanta!','¡{p} está muy lastimado! ¡La gente le pide que se levante!'],
 eLow:['¡{e} ya no puede más! ¡Está listo para el remate!','¡{e} se tambalea! ¡Se acerca el final!']};
function narr(k,a,force){if(!C||!META||!META.opt.voz)return;const L=NARR[k];if(!L)return;const t=pick(L).replace(/\{p\}/g,pnm()+(k==='start'&&P&&P.apodo?', '+P.apodo+',':'')).replace(/\{e\}/g,C.e.n.replace(/ \(.*\)$/,'')).replace(/\{m\}/g,(a&&a.m)||'');const ex=['big','air','fin','eCombo','low','eLow'].includes(k);voz([{t,p:ex?1.25:1.1,r:ex?1.2:1.1}],force);}
function vib(ms){if(!META||!META.opt.vib)return;try{navigator.vibrate&&navigator.vibrate(ms)}catch(e){}}
function W(ms){return ms/((META&&META.opt&&META.opt.spd)||1);}
const sfx={hit:()=>beep(110,.12,'sawtooth',.08),big:()=>{beep(70,.25,'sawtooth',.1);beep(140,.12,'square',.05,.05)},block:()=>beep(400,.07,'triangle',.06),card:()=>beep(700,.04,'square',.03),crowd:()=>{for(let i=0;i<8;i++)beep(300+Math.random()*500,.18,'sawtooth',.015,i*.03)},win:()=>[523,659,784,1047].forEach((f,i)=>beep(f,.15,'square',.05,i*.12)),lose:()=>[392,330,262,196].forEach((f,i)=>beep(f,.2,'square',.05,i*.18)),bell:()=>{beep(1200,.5,'sine',.06);beep(1200,.5,'sine',.05,.25)},slap:()=>beep(180,.08,'square',.09),combo:()=>[660,880,1100].forEach((f,i)=>beep(f,.07,'square',.04,i*.05))};

// ---------- Estado de partida ----------
let P=null,C=null,UNM=null,PENDING=null,LASTDT=0;
const has=m=>P&&P.masks.includes(m);
function newRun(daily){const mode=typeof daily==='string'?daily:(daily?'daily':'');daily=mode==='daily';const s=Object.assign({},META.sel);if(!mode){s.l='T';if(!s.partner||s.partner==='T')s.partner=META.unl.find(x=>x!=='T');}const L=LUCH[s.l];
 const cab=daily?0:(s.cab||0);P={l:s.l,man:s.man,partner:s.partner,cab,daily:!!daily,hp:L.hp+upl('hp')*6-(cab>=3?10:0),max:L.hp+upl('hp')*6-(cab>=3?10:0),dirtyUsed:false,gold:30+upl('oro')*25,deck:(mode?L.deck:deckFor(s.l)).map(id=>mkc(id,!mode&&colLv(id)>=2)),masks:[],act:0,row:0,from:null,visited:[],won:0,fama:0,flags:{},revived:false,mode,inj:[]};
 const bonusHp=(META.trophies||[]).length*2+(META.belt==='peso'?6:0);P.hp+=bonusHp;P.max+=bonusHp;if(mode&&mode!=='daily')P.cab=0;
 for(let i=0;i<upl('carta');i++){const c=P.deck.find(c=>!c.up&&CARDS[c.id].up&&c.id!=='bloqueo')||P.deck.find(c=>!c.up);if(c)c.up=true;}
 if(cab>=9)P.deck.push(mkc('lesion'));
 if(!mode){const QS=!META.qsDone&&!META.stats.runs;META.qsDone=1;clearRun();META.stats.runs++;saveMeta();P.map=genMap();P.aw=0;P.ch=0;P.rel={kid:2,mama:1,abuelo:1,rep:0};P.ab='ok';P.rep='lic';P.reps=['lic'];P.repSince=0;P.scam=pick(['billetes','billetes','vale','johnny']);P.drink=0;P.used=[];const PP=P;return askName(nm=>{PP.name=nm;PP.rname=META.rname||'';(QS?(f=>f(1)):askDiff)(df=>{PP.diff=df;let pro=prologue(PP.l);if(QS){const pp=prologueParts(PP.l);pro=pp.a;PP.flags.proLater=pp.b;PP.qs=1;}talk(pro,()=>(QS?(f=>f()):whyChoice)(()=>{showPanel('<h1>📍 Empiezas desde abajo</h1><p><b>'+VEN[0].e+' '+VEN[0].n+'</b>. '+VEN[0].d+'</p>'+ladderHTML(0));addBtn('🔔 ¡A la arena!','gold',startChapter);}));});});}}
function genMap(){const rows=[[0,1,2].map(c=>({t:'lucha',c}))];
 for(let r=1;r<=4;r++){const row=[0,1,2].map(c=>({t:nodeType(r===1?'elite':null),c}));if(row.every(n=>n.t===row[0].t))row[1].t=row[0].t==='lucha'?'evento':'lucha';rows.push(row);}
 rows.push(shuffle(['gym','tienda',pick(['gym','evento','tienda'])]).map((t,c)=>({t,c})));rows.push([{t:'boss',c:1}]);
 for(let r=0;r<5;r++){rows[r].forEach(n=>{n.next=[n.c];const nb=n.c+(chance(.5)?1:-1);if(nb>=0&&nb<=2&&chance(.65))n.next.push(nb);});
  rows[r+1].forEach(m=>{if(!rows[r].some(n=>n.next.includes(m.c))){const src=rows[r].reduce((a,n)=>Math.abs(n.c-m.c)<Math.abs(a.c-m.c)?n:a);src.next.push(m.c);}});}
 rows[5].forEach(n=>n.next=[1]);
 const nem=META.nemesis;if(nem&&nem.act===P.act)rows[RI(1,4)][RI(0,2)].t='nemesis';
 if(SEASON.en&&P.act<2&&chance(.7)){let n;do{n=rows[RI(1,4)][RI(0,2)];}while(n.t==='nemesis');n.t='temporada';}
 return{rows};}
function nodeType(not){const w=[['lucha',42],['elite',16],['gym',12],['tienda',12],['evento',18]];let t;do{let r=RI(1,100);for(const[k,v]of w){r-=v;if(r<=0){t=k;break;}}}while(t===not);return t;}
const NODE={lucha:['🤼','Lucha','Un rival del cartel'],elite:['💀','Lucha estelar','Más difícil · regala una máscara'],gym:['🏋️','Gimnasio','Descansa o entrena una carta'],tienda:['🛒','Tienda','Compra cartas o quita una'],evento:['❓','Evento','Algo pasa tras bambalinas'],boss:['🎭','MÁSCARA CONTRA MÁSCARA','Si pierdes, te quitan la máscara'],nemesis:['😡','¡REVANCHA!','Tu némesis regresa más fuerte · +25 fama'],temporada:['🎉','Lucha de temporada','Rival especial · máscara exclusiva']};

// ---------- Combate ----------
// ---------- Nombre, diálogos y elenco del modo historia ----------
const NAMEGEN={T:['El',['Rayo','Ángel','Místico','Halcón','Príncipe','Relámpago'],['de Plata','Azteca','del Norte','Dorado','Celestial','Jr.']],R:['El',['Veneno','Diablo','Cuervo','Látigo','Alacrán','Chacal'],['Negro','Salvaje','del Barrio','Infernal','Maldito','Rojo']],G:['El',['Coloso','Tanque','Titán','Mamut','Toro','Gorila'],['de Hierro','del Mercado','Mayor','Furioso','de Acero','Norteño']],V:['La',['Golondrina','Centella','Libélula','Cometa','Pluma','Tormenta'],['Voladora','de Fuego','Azul','Estelar','Plateada','del Circo']],X:['',['Lentejuela','Diva','Glamour','Brillantina','Primor','Fantasía'],['Divina','de Oro','Fatal','Estelar','Chic','del Amor']],M:['El',['Mini','Pulga','Chispa','Ratón','Pequeño','Chamaquito'],['Veloz','Maravilla','Dinamita','Atómico','Bravo','Turbo']]};
function genName(l){const g=NAMEGEN[l]||NAMEGEN.T;return((g[0]?g[0]+' ':'')+pick(g[1])+' '+pick(g[2])).trim();}
function rnm(){return(P&&P.rname)||META.rname||pnm();}
const FAMW=['mama','abuelo','papa','hermano','kid'];
function fmtW(w,t){return fmt(FAMW.includes(w)?String(t).replace(/\{n\}/g,rnm()):t);}
function askName(cb){const L=LUCH.T;const sug=META.pname||genName('T');
 showPanel('<h1>🎭 Tu nombre de luchador</h1><div class="nmbox"><div class="pe">'+L.e+'</div><label class="nml">Nombre de luchador</label><input id="nmIn" maxlength="20" value="'+sug.replace(/"/g,'')+'" autocomplete="off"><label class="nml">Tu nombre real</label><input id="rnIn" class="rn" maxlength="16" value="'+(META.rname||'').replace(/"/g,'')+'" placeholder="Tu nombre" autocomplete="off"></div>');
 addBtn('🎲 Otro nombre','',()=>{const i=$('#nmIn');if(i)i.value=genName('T');});
 addBtn('✅ ¡Ese es mi nombre!','gold',()=>{const i=$('#nmIn');let v=((i&&i.value)||sug).replace(/[<>"]/g,'').trim().slice(0,20);if(v.length<2)v=sug;META.pname=v;const ri=$('#rnIn');let rv=((ri&&ri.value)||'').replace(/[<>"{}]/g,'').trim().slice(0,16);META.rname=rv.length>=2?rv:'';saveMeta();cb(v);});}
const CAST={chuy:['🧓','Don Chuy','tu entrenador'],mama:['👩','Mamá',''],lic:['💼','El Licenciado Barrera','promotor'],kid:['🦂','Kid Alacrán','tu amigo de la infancia, ahora tu rival'],nar:['📖','',''],chucho:['🎙️','Chucho','comentarista'],lupe:['👵','Doña Lupe','dueña del patio']};
let DLG=null;
function talk(lines,cb){lines=(lines||[]).filter(Boolean);if(!lines.length)return cb();let k=0;const L=P?LUCH[P.l]:LUCH[META.sel.l];
 const show=()=>{const[w,t0]=lines[k];const c=w==='yo'?[L.e,pnm(),'tú']:castOf(w)||CAST.nar;const full=fmtW(w,t0).replace(/\{l\}/g,L.n);
  const ph=(w==='nar'||w==='sys')?null:portHTML(w,full,1);showPanel('<div class="dlg '+(w==='yo'?'me':(w==='nar'||w==='sys')?'nar':'')+(w==='sys'?' sys':'')+'"><div class="who">'+(ph||'<span class="pe">'+c[0]+'</span>')+'<div><b>'+(c[1]||'')+'</b><span class="small">'+(c[2]||'')+'</span></div></div><div class="tx" id="dlgT"></div><div class="dots">'+lines.map((_,i)=>i===k?'●':'○').join('')+'</div></div>');
  if(DLG&&DLG.tm)clearInterval(DLG.tm);DLG={full,i:0};const el=$('#dlgT');const done=()=>{if(DLG.tm)clearInterval(DLG.tm);DLG.tm=0;DLG.i=full.length;if(el)el.textContent=full;};
  if(el&&el.style){el.textContent='';DLG.tm=setInterval(()=>{DLG.i+=2;if(DLG.i>=full.length)return done();el.textContent=full.slice(0,DLG.i);},16);}else done();
  const box=document.querySelector('.dlg');if(box)box.onclick=()=>{if(DLG.tm)done();else adv();};
  addBtn(k<lines.length-1?'▶ Siguiente':'▶ Continuar','gold',()=>{if(DLG.tm)return done();adv();});
  if(lines.length>2&&k<lines.length-1)addBtn('⏩ Saltar escena','',()=>{done();cb();});};
 const adv=()=>{k++;if(k>=lines.length)return cb();show();};show();}
function say(w,t){const c=castOf(w);if(!c)return;let e=$('#say');if(!e||!e.style)return;const tt=t.replace(/\{n\}/g,pnm());e.innerHTML=(portHTML(w,tt)||'<span class="pe">'+c[0]+'</span>')+'<div><b>'+c[1]+'</b><br>'+tt+'</div>';e.classList.remove('on');void e.offsetWidth;e.classList.add('on');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('on'),4200);}
const REACT=[['chuy','¡Así se hace, {n}! Pero no te confíes.'],['chuy','Esa llave te salió chueca... pero funcionó.'],['chuy','Mañana a las 6 en el gimnasio. Sin excusas.'],['mama','Te vi en el celular de tu tía. ¡Cuídate la espalda, mijo!'],['mama','¿Ya comiste? Te guardé un plato de mole.'],['kidE','Suerte de principiante, {n}. Disfrútala mientras dura.'],['kidE','Te estoy viendo, {n}. Nos vamos a encontrar arriba.'],['kidA','¡Esa, carnal! Como en el patio de la escuela.'],['kidA','Bien hecho, {n}. No se lo digas a nadie, pero te eché porras.'],['lic','Buena taquilla. Sigue así y te subo la bolsa.'],['lic','La gente pregunta por ti. Eso vale dinero, {n}.'],['chucho','¡Qué lucha nos regaló {n}! ¡Se cimbró la lona!'],['lupe','Mijo, la próxima vez no me tumbes el tendedero.']];
function sayReact(){const t=vTier(),k=(P.rel&&P.rel.kid)||0;const pool=REACT.filter(r=>(r[0]!=='lupe'||t===0)&&(r[0]!=='kidA'||k>=1)&&(r[0]!=='kidE'||k<1));const r=pick(pool);setTimeout(()=>say(r[0]==='kidA'||r[0]==='kidE'?'kid':r[0],r[1]),450);}
const VSCN={1:[['lic','¡{n}! Me contaron que llenaste el patio. Hay una kermés en el pueblo y necesitan luchadores.'],['kid','¿Te acuerdas, carnal? De niños nos colábamos a la kermés para ver las luchas por debajo de la carpa.'],['chuy','Nada de comer antes de luchar, ¿eh?'],['yo','...¿Ni un elotito?']],
 2:[['chuy','Ya tienes nombre en el barrio, {n}. La Arena del barrio te quiere en el cartel.'],['nar','Esa misma noche, el Licenciado le ofrece a Beto un lugar en la Arena Coliseo. Solo había lugar para uno... y él no te dijo nada.'],['kid','Firmé con la Coliseo, {n}. Solo había un lugar.'],['yo','¿Y lo que juramos de niños, Beto?'],['kid','Éramos niños. Aquí no hay carnales, hay contratos. Y me llamo Kid Alacrán.'],['chuy','Las prisas solo sirven para caerse del tercer tensor. Ya regresará... o no.']],
 3:[['nar','Después de ganar tu primera Máscara contra Máscara, el teléfono no deja de sonar.'],['kid','(en la tele) ¿{n}? Sí, lo conozco. Era mi compañero de juegos. Ahora juega a ser luchador.'],['mama','{n}, mijo, voy a ir a verte a la Coliseo con tus tías.'],['yo','Mamá, por favor no lleves la manta con mi foto de bebé...'],['mama','Ya la mandé hacer. 🙂']],
 4:[['lic','Televisión nacional, {n}. Y la Arena Nacional quiere el duelo del año: los amigos de la infancia, cara a cara.'],['kid','Te estaba esperando, {n}. Hoy se acaba el cuento de los dos niños del patio.'],['chuy','Lucha como en el patio: con el corazón. Y no dejes que te gane la rabia.']],
 5:()=>[['nar','Tu segunda máscara ganada se vuelve noticia hasta del otro lado de la frontera.'],(P.rel&&P.rel.kid>=1)?['kid','Vi tu lucha, carnal. Nada mal... Cuídate allá en Texas, ¿eh?']:['kid','(en redes) Que se vaya a Texas. Aquí nadie lo va a extrañar.'],['lic','Me habló un promotor de Houston. Quieren al de la máscara viral: o sea, tú.'],['mama','Llévate un suéter, que allá el aire acondicionado está bien fuerte.'],['nar','Cruzas el puente internacional con una maleta llena de máscaras y un sueño.']],
 6:()=>(P.rel&&P.rel.kid>=1)?[['chuy','{n}... cuando llegaste al gimnasio no podías ni dar una maroma. Mírate ahora.'],['kid','Sesenta mil personas, carnal. Como lo juramos con el meñique... aunque yo me haya perdido en el camino.'],['yo','Esto también es tuyo, Beto.']]:[['chuy','{n}... cuando llegaste al gimnasio no podías ni dar una maroma. Mírate ahora.'],['kid','Disfruta tu estadio, {n}. Yo debería estar ahí.'],['yo','Podías estar, Beto. Tú escogiste otro camino.']]};
function REL0(){}
function REL(k,n){P.rel=P.rel||{kid:0,mama:0,lic:0};P.rel[k]=Math.max(-5,Math.min(5,(P.rel[k]||0)+n));}
function relHTML(){const r=P.rel||{};return'<div class="rels">'+[['kid','🦂','Kid'],['mama','👩','Mamá'],['lic','💼','Lic.']].map(([k,e,n])=>{const v=r[k]||0;return'<span class="'+(v>=2?'up':v<=-2?'dn':'')+'">'+e+' '+n+' '+(v>=2?'💚':v<=-2?'💔':'🤝')+'</span>';}).join('')+'</div>';}
const VCH={1:()=>['💼','El Licenciado','Te ofrece ser tu representante. Se queda con el 10% de cada bolsa, pero promete conseguirte mejores funciones.',[['🤝 Aceptar','lic',2,null,'"¡No se va a arrepentir!" Te da una tarjeta de presentación con faltas de ortografía.'],['🙅 Prefiero ir solo','lic',-1,()=>LH.g(15),'"Usted se lo pierde." Te quedas con tu dinero completo.']]],
 2:()=>{P.rel.kid=-2;return['🦂','Kid Alacrán','Tu amigo de toda la vida te dio la espalda. ¿Qué le dices antes de que se vaya?',[['🤝 "Algún día vas a regresar, Beto"','kid',1,()=>LH.hp(8),'Se detiene en la puerta un segundo... y se va sin voltear.'],['😤 "Desde hoy eres mi rival"','kid',-1,()=>LH.pf(2),'Te tragas el coraje y lo conviertes en furia: +2 en tu próxima lucha.']]];},
 3:()=>['👩','Mamá','Te pide que termines la escuela además de luchar. "Por si un día te lastimas, mijo."',[['📚 Prometerle estudiar en línea','mama',2,()=>LH.hp(10),'Tu mamá te abraza y te manda tortas para toda la semana.'],['🎭 "La lucha es mi vida, mamá"','mama',-1,()=>LH.f(10),'Se queda callada. La afición, en cambio, adora tu pasión.']]],
 4:()=>['🦂','Kid Alacrán','Antes del duelo, en la conferencia de prensa, Kid te avienta la máscara de cartón que hicieron de niños.',[['💬 Recogerla y guardarla','kid',1,()=>LH.pb(5),'La guardas en tu maleta. Kid se queda callado. Empiezas la lucha con 5 de defensa.'],['🔥 Romperla frente a las cámaras','kid',-2,()=>{LH.f(12);LH.pf(2);},'¡Las cámaras explotan! +2 de furia para el duelo.']]],
 5:()=>['🤠','Promotor de Houston','Te ofrece el doble de bolsa... si dejas al Licenciado.',[['🤝 Quedarte con el Licenciado','lic',2,null,'El Licenciado se entera y llora en el teléfono: "Usted es como mi hijo".'],['💵 Irte con el de Houston (+$60)','lic',-3,()=>LH.g(60),'Cobras el doble. El Licenciado te bloquea de todos lados.']]],
 6:()=>(P.rel&&P.rel.kid>=1)?['🦂','Kid Alacrán','Se lastimó la rodilla y no podrá luchar en el estadio. Te pide que uses su llave en su honor.',[['🦂 Aprender su llave','kid',1,()=>{const n=LH.card(true);return'Te la enseña en el estacionamiento, con muletas. Aprendiste: '+n+'.';}],['🏆 "Voy a ganar a mi manera"','kid',0,()=>LH.pf(2),'"Así me gusta." Saldrás con +2 de furia.']]]
  :['🦂','Kid Alacrán','Dice en redes que le robaste su lugar en el estadio.',[['📱 Ir a hablar con él','kid',3,null,'Se dan un abrazo incómodo. "Gánales, pues. Pero la revancha es mía."'],['😈 Responderle en redes','kid',-2,()=>LH.f(15),'Tu respuesta es tendencia mundial. Kid jura venganza.']]]};
function kidF0(){}
function kidFight(){P.kidF=1;const r=(P.rel&&P.rel.kid)||0;talk([['chucho','¡DAMAS Y CABALLEROS! ¡El duelo que todo el barrio esperaba!'],['chucho','¡Dos amigos de la infancia que juraron llegar juntos... y hoy se parten el alma!'],r>=0?['kid','No te voy a tener piedad, {n}. Aunque me duela.']:['kid','Te voy a regresar al patio de donde saliste, {n}.'],['yo',r>=0?'Ni yo a ti, Beto.':'Ya veremos quién barre el patio.']],()=>entrance(()=>startCombat('kid','kid')));}
function kidPost(cb){const r=(P.rel&&P.rel.kid)||0;talk([['chucho','¡GANÓ {n}! ¡Kid Alacrán se queda tendido en la lona!'],['kid',r>=0?'...Sigues siendo el mismo terco del patio de la escuela.':'Esto no se queda así...']],()=>{
 showPanel('<div class="dlg"><div class="who"><span class="pe">🦂</span><div><b>Kid Alacrán</b><span class="small">tu decisión</span></div></div><div class="tx">Kid está en la lona, sin aire. Las cámaras te enfocan. Todo el país está viendo.</div></div>');
 addBtn('🤝 Ayudarlo a levantarse','blu',()=>{REL('kid',3);showPanel('<div class="dlg"><div class="who"><span class="pe">🦂</span><div><b>Kid Alacrán</b></div></div><div class="tx">Duda... y toma tu mano. Al oído te dice: \"Perdóname, carnal\". La arena aplaude de pie.</div><div class="rn g">🦂 Kid Alacrán: 💚 mejora mucho la relación</div></div>'+relHTML());addBtn('Continuar','',cb);});
 addBtn('😈 Ponerle el pie encima para la foto','',()=>{REL('kid',-3);LH.f(15);showPanel('<div class="dlg"><div class="who"><span class="pe">🦂</span><div><b>Kid Alacrán</b></div></div><div class="tx">La foto da la vuelta al mundo. Kid te mira desde la lona: \"Esto no se acaba aquí\".</div><div class="rn b">🦂 Kid Alacrán: 💔 empeora mucho la relación</div></div>'+relHTML());addBtn('Continuar','',cb);});});}
function relChoice(t,cb){if(!VCH[t]||!P||P.mode)return cb();const[e,who,q,op]=VCH[t]();showPanel('<div class="dlg"><div class="who"><span class="pe">'+e+'</span><div><b>'+who+'</b><span class="small">tu decisión</span></div></div><div class="tx">'+q+'</div></div>');
 op.forEach(([l,k,n,f,txt])=>addBtn(l,'blu',()=>{if(n)REL(k,n);const r=f?f():null;const msg=(typeof r==='string'?r:txt)||'';const c=CAST[k]||CAST.nar;showPanel('<div class="dlg"><div class="who"><span class="pe">'+e+'</span><div><b>'+who+'</b></div></div><div class="tx">'+msg+'</div>'+(n?'<div class="rn '+(n>0?'g':'b')+'">'+c[0]+' '+c[1]+': '+(n>0?'💚 mejora la relación':'💔 empeora la relación')+'</div>':'')+'</div>'+relHTML());addBtn('Continuar','',cb);}));}
const ENDS={familia:'🤝 Familia del ring',hermanos:'🦂 Hermanos de lona',rivalidad:'😈 La rivalidad continúa',lobo:'🐺 Lobo solitario',mama:'👩 Orgullo de mamá',pueblo:'🏆 Campeón del pueblo'};
function endKey(){const r=P.rel||{};if(r.kid>=2&&r.mama>=2)return'familia';if(r.kid>=2)return'hermanos';if(r.kid<=-2)return'rivalidad';if(r.lic<=-2&&(r.mama||0)<=0)return'lobo';if(r.mama>=2)return'mama';return'pueblo';}
function endW(){const r=P.rel||{},k=endKey();const L=[['chucho','¡SE ACABÓ! ¡{n} ES CAMPEÓN MUNDIAL!']];
 L.push(r.kid>=2?['kid','¡HERMANO! Sabía que lo ibas a lograr. Desde el patio hasta el estadio, {n}.']:r.kid<=-2?['kid','Disfrútalo, {n}. Esto no se acaba aquí... nos vemos en la revancha.']:['kid','Lo hiciste, {n}. Te debo un elote.']);
 L.push(r.mama>=2?['mama','¡Ese es mi hijo! ¡Ese es mi hijo! (Sí, llevó la manta.)']:r.mama<=-1?['mama','No me gusta que te pegues... pero hoy estoy muy orgullosa de ti.']:['mama','Ya vente a cenar. Y tráete el cinturón para que lo vea tu abuela.']);
 L.push(r.lic>=2?['lic','¡Se lo dije desde el patio! ¡De 50 pesos a campeón mundial!']:r.lic<=-2?['nar','El Licenciado Barrera ve la final desde su casa... y apaga la tele.']:['lic','Buena bolsa, buena bolsa. ¿Firmamos la revancha?']);
 L.push(['chuy','Ya puedo retirarme tranquilo. Bueno... mañana a las 6 en el gimnasio, campeón.']);
 META.endings=META.endings||[];if(!META.endings.includes(k))META.endings.push(k);saveMeta();
 L.push(['nar','Final desbloqueado: '+ENDS[k]+'\n\n'+META.endings.length+'/6 finales descubiertos. Tus decisiones con Kid, Mamá y el Licenciado cambian el final.']);return L;}
const ENDW=[['chucho','¡SE ACABÓ! ¡{n} ES CAMPEÓN MUNDIAL!'],['kid','Lo hiciste, {n}. Desde el patio hasta el estadio. Te debo una disculpa... y un elote.'],['mama','¡Ese es mi hijo! ¡Ese es mi hijo! (Sí, llevó la manta.)'],['chuy','Ya puedo retirarme tranquilo. Bueno... mañana a las 6 en el gimnasio, campeón.']];
const ENDL=[['chuy','Levántate, {n}. Los grandes también pierden.'],['chuy','Mañana a las 6 en el gimnasio. Empezamos otra vez, más fuertes.']];

// ---------- Modo historia: categorías y vida fuera del ring ----------
const VEN=[
 {n:'Lona en el patio',e:'🏚️',d:'Una lona parchada en el patio de una vecindad. Las cuerdas son de mecate, el réferi es el vecino y la "arena" son 30 sillas de plástico prestadas.',pay:.6,crowd:.12,mat:'#a8977a',apr:'#6b5a42',post:'#7a5a32',tb:'#555',rope:['#c9b48a','#c9b48a','#c9b48a'],bg:'#101626',com:[['Chucho','¡Desde el patio de Doña Lupe, con 30 valientes en sillas prestadas!'],['Profe','La lona tiene más parches que mi pantalón, pero aquí empiezan los grandes.'],['Chucho','¡Cuidado con el tendedero, que se lleva los calzones de la vecina!']]},
 {n:'Kermés del pueblo',e:'🎪',d:'Te contratan en la feria del pueblo, entre el palenque y los juegos mecánicos. Hay banda, elotes y un señor que grita "¡lotería!" cada cinco minutos.',pay:.8,crowd:.3,mat:'#c9bca2',apr:'#8a3b2a',post:'#9a9a9a',tb:'#e74c3c',rope:['#e74c3c','#e74c3c','#e74c3c'],bg:'#140f2a',com:[['Chucho','¡En vivo desde la kermés, entre la rueda de la fortuna y los tacos de canasta!'],['Profe','Hay más gente en la fila de los elotes que en las gradas. Hay que ganárselos.'],['Chucho','¡Si gana, le regalan un peluche del tiro al blanco!']]},
 {n:'Arena de barrio',e:'🏟️',d:'Tu primera arena de verdad: gradas de concreto, 500 lugares, una porra que grita todo y un señor que vende chicharrones preparados.',pay:1,crowd:.5,mat:'#d0cfe0',apr:'#2b2140',post:'#ccc',tb:'#ff2e88',rope:['#e74c3c','#fff','#3b6fb6'],bg:'#1d0f33',com:[['Chucho','¡Media entrada en la arena del barrio, pero con mucho corazón!'],['Profe','Aquí se hacen las carreras. Cada lucha cuenta.'],['Chucho','¡Ya hasta vende chicharrones con su cara el señor de la entrada!']]},
 {n:'Arena Coliseo',e:'🏛️',d:'La legendaria arena del centro: techo de lámina, 5,000 personas y la porra más brava de la ciudad. Aquí el promotor ya paga en efectivo... y completo.',pay:1.2,crowd:.72,mat:'#3b6fb6',apr:'#16213a',post:'#e9e9f2',tb:'#ff2e88',rope:['#e74c3c','#e74c3c','#e74c3c'],bg:'#1a1030',picado:1,com:[['Chucho','¡La Coliseo está a reventar, compadre! ¡Huele a historia y a cacahuates!'],['Profe','Arena legendaria. Aquí no perdonan una llave mal hecha.']]},
 {n:'Arena Nacional',e:'🌟',d:'La catedral de la lucha libre: 16,000 lugares, televisión nacional y pantallas gigantes. Tu mamá ya te puede ver sin internet.',pay:1.5,crowd:.9,mat:'#2a62c9',apr:'#0d1530',post:'#ffd23f',tb:'#ff2e88',rope:['#e74c3c','#fff','#2ecc71'],bg:'#180c2e',screen:1,picado:1,logo:'ARENA NACIONAL',com:[['Chucho','¡Transmisión nacional desde la catedral de la lucha libre!'],['Profe','Dieciséis mil almas. Esto ya son ligas mayores.']]},
 {n:'Gira por Texas',e:'🤠',d:'Show en un gimnasio enorme de Houston: luces de colores, comentaristas en inglés y la paisanada gritando "¡Mé-xi-co, Mé-xi-co!".',pay:1.7,crowd:.85,mat:'#262626',apr:'#111',post:'#c0c0c0',tb:'#3b9bff',rope:['#e33','#eee','#33e'],bg:'#0e0e1e',screen:1,neon:1,logo:'LUCHA USA',com:[['Chucho','¡Hello, Houston! ¡Puro paisano en las gradas, compadre!'],['Profe','El estilo americano es de pura fuerza. Ojo con las sillas.'],['Chucho','¡Los comentaristas gringos no saben pronunciar "huracarrana"!']]},
 {n:'Estadio Mundial',e:'🏆',d:'El gran evento del año en un estadio: 60,000 personas, pirotecnia, transmisión a todo el mundo y una entrada con fuegos artificiales.',pay:2,crowd:1,mat:'#151515',apr:'#0a0a0a',post:'#ffd23f',tb:'#ffd23f',rope:['#ffd23f','#ffd23f','#ffd23f'],bg:'#0b0618',screen:1,pyro:1,logo:'MUNDIAL',com:[['Chucho','¡SESENTA MIL PERSONAS, SEÑORES! ¡SE CAE EL ESTADIO!'],['Profe','El evento más grande del año. Aquí se escriben las leyendas.']]}];
function healP0(){}
function healP(n){n=Math.round(n);const h=Math.min(Math.max(0,P.max-P.hp),n);P.hp+=h;const ov=n-h;if(ov>0&&!P.mode&&!C){P.flags.pBlk=Math.min(15,(P.flags.pBlk||0)+Math.ceil(ov/2));}}
function pnm(){const L=P?LUCH[P.l]:LUCH[META.sel.l];return(P&&P.name)||META.pname||L.n;}
function vTier(){if(!P)return 4;if(P.tut)return 0;if(P.venue!==undefined)return P.venue;if(isStory()&&P.ch!==undefined)return P.ch;if(P.mode==='torneo')return 4;if(P.mode||P.daily)return 3;const a=ACTS[Math.min(P.act,2)];if(C&&C.kind==='boss')return a.t0+a.span;return Math.min(a.t0+a.span,a.t0+Math.floor((P.aw||0)/2));}
function ladderHTML(t){return'<div class="lad">'+VEN.map((v,i)=>'<span class="'+(i<t?'dn':i===t?'on':'')+'" title="'+v.n+'">'+v.e+'</span>').join('<i>›</i>')+'</div>';}
function drawWear(t){const c=$('#wearc');if(!c||!c.getContext)return;const g=c.getContext('2d');if(!g)return;g.imageSmoothingEnabled=false;g.setTransform(4,0,0,4,0,0);try{luchador(g,1,1,playerMask(),false,'#d9a066',PT(),'flex',Object.assign({},(META&&META.look)||{},{wear:t}));}catch(e){}}
function promoUp(t,cb){if(false){promoUp._in=1;return talk(typeof VSCN[t]==='function'?VSCN[t]():VSCN[t],()=>relChoice(t,()=>promoUp(t,cb)));}promoUp._in=0;const v=VEN[t];sfx.win();confetti(30);try{voz([{t:'¡Sube de categoría! ¡Ahora en '+v.n+'!',p:1.4,r:1.1}],true);}catch(e){}
 showPanel('<h1>⬆️ ¡GANASTE LA MÁSCARA! SUBES DE CATEGORÍA</h1>'+ladderHTML(t)+'<div class="venue"><div class="vi">'+v.e+'</div><b>'+v.n+'</b></div><p>'+v.d+'</p><div class="wear"><canvas id="wearc" width="72" height="132"></canvas><div><b>👕 Traje nuevo</b><br>'+WEARTXT[t]+'</div></div><p>\n\n💰 Bolsa por lucha: x'+v.pay+(v.pay>1?' 🤑':'')+'\n👥 Público: '+Math.round(v.crowd*100)+'%</p>');addBtn('🔔 ¡Vamos!','gold',cb);drawWear(t);}
function drawVenue(vt,V){const T=tk;
 if(vt<=1){cx.fillStyle='#fff';for(let i=0;i<40;i++){const[x,y]=CROWD[i];if((T>>4)%7!==i%7)cx.fillRect(x,y%26,1,1);}}
 if(vt===0){cx.fillStyle='#f3e9b0';cx.beginPath();cx.arc(172,9,5,0,7);cx.fill();cx.fillStyle=V.bg;cx.beginPath();cx.arc(170,8,4,0,7);cx.fill();
  cx.fillStyle='#5a3a2e';cx.fillRect(0,28,200,16);cx.fillStyle='#6e4838';for(let y=28;y<44;y+=4)for(let x=((y/4)%2)*5;x<200;x+=10)cx.fillRect(x,y,9,3);
  cx.fillStyle='#ddd';for(let x=0;x<200;x+=2)cx.fillRect(x,18+Math.round(Math.sin(x/200*Math.PI)*4),2,1);
  const cl=['#e74c3c','#3b6fb6','#ffd23f','#fff','#2ecc71','#ff2e88'];for(let i=0;i<9;i++){const x=12+i*21,y=19+Math.round(Math.sin(x/200*Math.PI)*4),sw=Math.round(Math.sin(T/20+i)*1);cx.fillStyle=cl[i%6];cx.fillRect(x+sw,y,6,i%3===0?8:5);if(i%3===0){cx.fillRect(x+sw,y+8,2,3);cx.fillRect(x+4+sw,y+8,2,3);}}
  cx.fillStyle='#222';cx.fillRect(100,0,1,30);const fl=(T%90<3)?'#776':'#ffe680';cx.fillStyle=fl;cx.fillRect(98,30,5,5);cx.fillStyle='rgba(255,230,128,.07)';cx.beginPath();cx.moveTo(100,34);cx.lineTo(40,80);cx.lineTo(160,80);cx.fill();
  cx.fillStyle='#e9e9e9';for(let i=0;i<7;i++){const x=6+i*29;cx.fillRect(x,40,6,4);cx.fillRect(x,44,1,4);cx.fillRect(x+5,44,1,4);}}
 if(vt===1){const wx=30,wy=24,r=17,a0=T/90;cx.fillStyle='#8a8aa8';for(let i=0;i<8;i++){const a=a0+i*Math.PI/4;for(let k=0;k<r;k+=2)cx.fillRect(Math.round(wx+Math.cos(a)*k),Math.round(wy+Math.sin(a)*k),1,1);const cx2=Math.round(wx+Math.cos(a)*r),cy2=Math.round(wy+Math.sin(a)*r);cx.fillStyle=['#e74c3c','#ffd23f','#3b6fb6','#2ecc71'][i%4];cx.fillRect(cx2-2,cy2,4,3);cx.fillStyle='#8a8aa8';}
  cx.fillRect(wx-1,wy,2,22);cx.fillRect(wx-8,wy+20,16,2);
  for(let i=0;i<6;i++){cx.fillStyle=i%2?'#fff':'#e74c3c';cx.beginPath();cx.moveTo(150+i*7,16);cx.lineTo(186,4);cx.lineTo(150+i*7+7,16);cx.fill();}cx.fillStyle='#e74c3c';cx.fillRect(150,16,42,22);cx.fillStyle='#fff';for(let i=0;i<42;i+=8)cx.fillRect(150+i,16,4,22);
  const bc=['#ffd23f','#ff2e88','#2ecc71','#3b9bff'];for(let x=0;x<200;x+=6){const y=4+Math.round(Math.sin(x/200*Math.PI*2)*3+3);cx.fillStyle=((x/6+(T>>3))%4<2)?bc[(x/6)%4]:'#333';cx.fillRect(x,y,2,2);}}
 if(vt>=2){cx.fillStyle='#ffffff0d';for(const y of[12,22,32])cx.fillRect(0,y,200,3);}
 if(V.picado){const pc=['#ff2e88','#ffd23f','#2ecc71','#3b9bff','#e67e22'];for(let i=0;i<20;i++){const x=i*10+2,sw=Math.round(Math.sin(T/25+i)*1);cx.fillStyle=pc[i%5];cx.fillRect(x,1+sw,8,6);cx.fillStyle=V.bg;cx.fillRect(x+2,3+sw,1,1);cx.fillRect(x+5,3+sw,1,1);cx.fillRect(x+3,5+sw,2,1);}cx.fillStyle='#888';cx.fillRect(0,1,200,1);}
 if(V.screen){const sx=78,sy=V.picado?9:3;cx.fillStyle='#000';cx.fillRect(sx-1,sy-1,46,24);cx.fillStyle='#123a5a';cx.fillRect(sx,sy,44,22);cx.fillStyle=(T%60<30)?'#ff2e88':'#ffd23f';cx.fillRect(sx+16,sy+3,12,12);cx.fillStyle='#fff';cx.fillRect(sx+18,sy+7,3,2);cx.fillRect(sx+23,sy+7,3,2);cx.font='bold 5px monospace';cx.textAlign='center';cx.fillStyle='#fff';cx.fillText((T%120<60)?'EN VIVO':'LUCHA',sx+22,sy+21);cx.textAlign='left';}
 if(V.neon){const on=(T%100)>4;cx.font='bold 8px monospace';cx.textAlign='center';cx.fillStyle=on?'#ff2e88':'#552';cx.fillText('LUCHA',30,14);cx.fillStyle=on?'#3bf':'#225';cx.fillText('LIBRE',170,14);cx.textAlign='left';}
 if(V.pyro){cx.fillStyle='#333';for(const x of[2,190]){cx.fillRect(x+3,6,2,40);cx.fillStyle='#fffbe0';for(let i=0;i<3;i++)for(let j=0;j<2;j++)cx.fillRect(x+i*3,2+j*3,2,2);cx.fillStyle='#333';}
  if(T%150===0||(C&&C.anim&&C.anim.ef===8&&T%3===0)){for(const x of[14,186])for(let i=0;i<14;i++)PARTS.push({x,y:74,vx:R(-.6,.6),vy:R(-3.4,-1.8),l:22,c:['#ffd23f','#ff7a1a','#fff'][i%3]});}}}
const LH={hp:n=>{if(n>0)healP(n);else P.hp=Math.max(1,P.hp+n);},g:n=>{P.gold=Math.max(0,P.gold+n);},f:n=>{P.fama=Math.max(0,P.fama+n);},mx:n=>{P.max+=n;P.hp+=n;},
 up:k=>{const l=shuffle(P.deck.filter(c=>!c.up&&CARDS[c.id].up)).slice(0,k);l.forEach(c=>c.up=true);return l.map(c=>CARDS[c.id].n).join(' y ')||'nada nuevo';},
 aff:n=>{P.flags.entAff=(P.flags.entAff||0)+n;},ef:n=>{P.flags.eFur=(P.flags.eFur||0)+n;},pf:n=>{P.flags.pFur=(P.flags.pFur||0)+n;},pb:n=>{P.flags.pBlk=(P.flags.pBlk||0)+n;},deb:()=>{P.flags.chisme=1;},
 inj:(n,f)=>{(P.inj=P.inj||[]).push({n,f});},cure:()=>{const l=P.deck.find(c=>c.id==='lesion');if(l)P.deck.splice(P.deck.indexOf(l),1);const had=(P.inj||[]).length;P.inj=[];return!!(had||l);},
 card:up=>{const id=rollCard('elite');const c=mkc(id,!!up);P.deck.push(c);return CARDS[id].n+(c.up?'+':'');}};
const LIFE=[
 {id:'multa',k:'pre',w:[0,4],f:()=>['🚔 ¡Detenido por exceso de velocidad!','Vas tarde a la función y una patrulla te detiene a 120 km/h... con la máscara puesta. El oficial te mira de arriba a abajo: "¿Usted es el de la tele?"',[
  ['✍️ Firmarle un autógrafo a su hijo',()=>{if(chance(.65)){LH.f(6);return'Te deja ir con una advertencia y una selfie. La foto se vuelve viral: "Policía detiene a luchador... y le pide autógrafo".';}LH.g(-20);return'Resulta que su hijo le va a tu rival. Rompe el autógrafo y te pone la multa completa.';}],
  ['💵 Pagar la multa como ciudadano ejemplar',()=>{LH.g(-15);LH.f(8);return'Pagas sin chistar. El oficial sube la foto: "Hasta los luchadores respetan la ley".';}],
  ['🎭 "Un luchador nunca se quita la máscara"',()=>{LH.aff(2);return'El oficial se conmueve, prende la sirena y te escolta hasta la arena. Entras como presidente: +2 de afición al iniciar la lucha.';}]]]},
 {id:'hospital',k:'post',w:[0,6],f:()=>['🏥 Visita al hospital infantil','Una fundación te invita a visitar el pabellón infantil del hospital. Los niños llevan semanas preguntando por ti.',[
  ['🎭 Ir con la máscara y llevar regalos',()=>{REL('mama',1);LH.g(-10);LH.f(14);LH.aff(2);return'Un niño te enseña su llave secreta: la "Patada Dinosaurio". Le prometes usarla en tu próxima lucha. Sales con el corazón lleno: +2 de afición en tu próxima lucha.';}],
  ['🏋️ No puedes, tienes entrenamiento',()=>{const n=LH.up(1);return'Entrenas solo en el gimnasio... mejoraste '+n+', pero algo te falta.';}]]]},
 {id:'especie',k:'post',w:[0,1],f:()=>['🍗 Te pagan en especie','El promotor dice que "la taquilla estuvo floja" y te quiere pagar con tres kilos de tortillas, un pollo rostizado y un boleto para la rifa.',[
  ['🙏 Aceptar con humildad',()=>{LH.hp(15);return'Cenas como rey. Ganas la rifa: era un trapeador. Algo es algo.';}],
  ['😠 Exigir tu dinero',()=>{if(chance(.5)){LH.g(30);return'Saca un fajo de billetes del calcetín: "Ya, ya, aquí está". Te pagó completo.';}LH.ef(2);return'Te borra del próximo cartel... y le da tu parte a tu próximo rival, que llega muy motivado: +2 de furia.';}]]]},
 {id:'combi',k:'pre',w:[0,2],f:()=>['🚐 ¡Se descompuso la combi!','Van rumbo a la función y la combi de la empresa truena en plena carretera. Faltan 40 minutos y 30 kilómetros.',[
  ['💪 Empujarla junto con los rudos',()=>{LH.hp(-8);LH.aff(2);return'Llegan sudados pero como hermanos. Los rudos hasta te echan porras desde el vestidor: +2 de afición.';}],
  ['🚛 Pedir aventón a un trailero',()=>{if(chance(.55)){LH.g(10);LH.f(4);return'El trailero es fan, te pone corridos de luchadores todo el camino y te regala $10 para el refresco.';}LH.ef(2);return'El tráiler va a 40 por hora. Llegas tarde y sin calentar: tu rival empieza con +2 de furia.';}]]]},
 {id:'xv',k:'post',w:[0,3],f:()=>['💃 XV años con máscara','Una familia te contrata para el vals sorpresa de los XV años de su hija. La quinceañera quiere entrar cargada por un luchador.',[
  ['💰 Cobrar tu tarifa',()=>{LH.g(40);return'Bailas el vals con la máscara puesta. El chambelán te mira con envidia.';}],
  ['🎁 Hacerlo gratis',()=>{LH.f(10);LH.hp(10);return'La familia te adopta: barbacoa, consomé y un video de tu vals con 300 mil vistas.';}]]]},
 {id:'lluvia',k:'pre',w:[0,1],f:()=>['🌧️ ¡Se vino el aguacero!','La función es al aire libre y empieza a llover. La lona está encharcada y el promotor pregunta si le seguimos.',[
  ['🌊 ¡Luchar bajo la lluvia!',()=>{LH.aff(3);LH.hp(-4);return'La gente se queda empapada pero grita como nunca. Te resbalas al subir, pero empiezas con +3 de afición.';}],
  ['⛺ Pedir que pongan una lona encima',()=>{LH.g(-8);LH.pb(5);return'Cooperas para el plástico. Luchas sequito: empiezas con 5 de defensa.';}]]]},
 {id:'pirata',k:'post',w:[1,4],f:()=>['👕 Máscaras piratas en el tianguis','En el tianguis venden máscaras "originales" tuyas a $50... con tu nombre mal escrito.',[
  ['🛍️ Ponerte a venderlas tú mismo',()=>{LH.g(35);return'Firmas cada una. El puesto se agota en una hora y el vendedor te ofrece sociedad.';}],
  ['📣 Exigir que las quiten',()=>{LH.f(6);LH.hp(8);return'El vendedor se disculpa y te invita unos tacos de suadero. Las redes aplauden tu honestidad.';}]]]},
 {id:'viral',k:'post',w:[1,6],f:()=>['📱 ¡Te hiciste viral!','Un video de tu última lucha tiene 2 millones de vistas. Todos quieren saber quién eres.',[
  ['🕺 Hacer el baile de moda con la máscara',()=>{LH.f(16);return'Tu baile se vuelve tendencia. Hasta tu abuela lo hizo.';}],
  ['👕 Sacar playeras con tu frase',()=>{LH.g(35);return'"¡A LA LONA, CHAMACO!" Se agotan en dos días.';}]]]},
 {id:'emboscada',k:'pre',w:[1,6],f:()=>['🅿️ Emboscada en el estacionamiento','Tu rival y dos compinches te esperan junto a tu coche. Las cámaras de la empresa lo están grabando todo.',[
  ['👊 Defenderte',()=>{LH.hp(-10);LH.deb();return'Te llevas unos golpes, pero le diste su merecido: tu rival llega cojeando (empieza con 2 de Débil).';}],
  ['🏃 Correr hacia la arena',()=>{LH.ef(2);LH.f(-4);return'Llegas a salvo... pero el video se hace viral con música de caricatura. Tu rival llega crecido: +2 de furia.';}]]]},
 {id:'radio',k:'pre',w:[0,6],f:()=>['🎙️ Entrevista en la radio','El programa matutino más escuchado te tiene al aire. "¿Algo que decirle a tu rival de hoy?"',[
  ['😤 Retarlo en vivo',()=>{LH.f(10);LH.ef(2);return'"¡Te voy a dejar como trapeador de vecindad!" Los teléfonos explotan. Tu rival llega con +2 de furia.';}],
  ['👵 Mandar saludos a tu mamá',()=>{REL('mama',1);LH.hp(6);return'Tu mamá llama a la estación para decir que estás muy flaco. Todo el país se ríe contigo.';}]]]},
 {id:'comision',k:'post',w:[2,4],f:()=>['⚖️ La Comisión de Lucha','La Comisión de Box y Lucha te multa por "lenguaje inapropiado" en el micrófono. Dijiste "chamaco" con mucho sentimiento.',[
  ['💵 Pagar la multa',()=>{LH.g(-20);return'Pagas. El comisionado te pide una foto "para su sobrino".';}],
  ['📜 Apelar',()=>{if(chance(.5)){LH.f(8);return'Te dan la razón: "chamaco" no es grosería. Eres un héroe del idioma.';}LH.g(-40);return'Pierdes la apelación. Multa doble... y te dejan de saludar.';}]]]},
 {id:'fan',k:'pre',w:[0,6],f:()=>['🧒 Tu fan número uno','En primera fila hay un niño con tu máscara hecha de cartón y un letrero que dice "TÚ PUEDES".',[
  ['❤️ Dedicarle la lucha',()=>{LH.aff(3);return'Señalas al niño antes de la campana. La arena entera aplaude: +3 de afición.';}],
  ['🎭 Regalarle tu máscara de repuesto',()=>{LH.f(10);return'El niño llora de emoción. Su papá también. Tú también, pero por dentro.';}]]]},
 {id:'limpia',k:'pre',w:[0,3],f:()=>['🌿 La limpia de Doña Chona','La señora de los tamales dice que "traes la vibra pesada" y te ofrece una limpia con ramas, huevo y loción.',[
  ['🥚 Aceptar la limpia',()=>{LH.g(-10);LH.hp(12);const c=LH.cure();return'El huevo sale con una figura rara. Doña Chona dice que era "la envidia". Te sientes ligero.'+(c?' ¡Hasta se te quitó la lesión!':'');}],
  ['🙄 No creer en eso',()=>{if(chance(.5)){LH.hp(-6);return'Saliendo te tropiezas con una cubeta. Doña Chona solo dice: "Se lo dije".';}return'No pasa nada... por ahora.';}]]]},
 {id:'pelicula',k:'post',w:[2,6],f:()=>['🎬 Película de luchadores','Un director quiere que salgas en "El Enmascarado contra las Momias Zombis 3". Presupuesto: bajo. Momias: de papel de baño.',[
  ['🎥 Actuar',()=>{LH.g(45);LH.f(10);return'Tu actuación es terrible. La película se vuelve de culto. Te piden secuela.';}],
  ['🏋️ Rechazar y entrenar',()=>{const n=LH.up(1);return'Mejor el gimnasio. Mejoraste '+n+'.';}]]]},
 {id:'fiesta',k:'post',w:[0,6],f:()=>['🍻 Fiesta en el vestidor','Los luchadores celebran después de la función. Hay mariachi, barbacoa y un rudo cantando "El Rey" desafinado.',[
  ['🎉 Quedarte a la fiesta',()=>{REL('kid',1);LH.g(-10);LH.hp(8);LH.f(5);return'Cooperas para la barbacoa y terminas cantando a dueto con tu peor enemigo.';}],
  ['😴 Irte a dormir temprano',()=>{P.flags.energia=1;return'Duermes nueve horas. En tu próxima lucha tendrás +1 de energía.';}]]]},
 {id:'aterrizaje',k:'pre',w:[0,6],f:()=>['🤕 Mal aterrizaje','Practicando un tope suicida en el calentamiento aterrizas sobre unas sillas plegables.',[
  ['😬 Luchar lastimado',()=>{LH.inj('la espalda',2);LH.aff(2);return'La gente ve que cojeas y te apoya: +2 de afición. Tendrás una carta de Lesión por 2 luchas.';}],
  ['💆 Ir con el sobador',()=>{LH.g(-15);return'Te truena hasta el alma. Quedaste nuevo.';}]]]},
 {id:'botch',k:'post',w:[0,6],f:()=>['😬 Se te pasó la mano','En la lucha le diste un rodillazo de verdad a tu compañero del gimnasio. Ahora no puede ni masticar.',[
  ['🙏 Pagarle el dentista',()=>{LH.g(-25);LH.f(10);return'El vestidor respeta a quien responde. Tu compañero te perdona... con la boca chueca.';}],
  ['🤷 Culpar a la lona',()=>{LH.f(-5);LH.ef(2);return'Nadie te cree. El vestidor te hace la ley del hielo y alguien le "pasa tips" a tu próximo rival: +2 de furia.';}]]]},
 {id:'guion',k:'pre',w:[1,5],f:()=>['📋 El promotor y el guion','El promotor te pide que hoy dejes que el rival te domine al principio "para darle emoción a la tele".',[
  ['🎬 Seguir el guion',()=>{REL('lic',1);LH.hp(-10);LH.g(30);LH.aff(3);return'Recibes una paliza al principio y la gente se muere de nervios. Bono de $30 y +3 de afición.';}],
  ['😤 Hacer lo tuyo',()=>{REL('lic',-1);LH.ef(2);LH.f(6);return'El promotor anota tu nombre en su libretita negra. Tu rival sale con +2 de furia, pero la afición respeta tu orgullo.';}]]]},
 {id:'pareja',k:'post',w:[3,6],f:()=>['💔 Siempre de gira','Tu pareja dice que pasas más tiempo con El Bestia que con ella.',[
  ['🌹 Llevarla a cenar',()=>{LH.g(-25);LH.hp(15);return'Cena, serenata y cero lucha libre. Recargas pila.';}],
  ['🏆 "Después del campeonato, te lo juro"',()=>{LH.pf(2);return'Ella no responde. Tú conviertes la tristeza en coraje: empiezas tu próxima lucha con +2 de furia.';}]]]},
 {id:'bullying',k:'post',w:[1,6],f:()=>['🏫 Plática contra el bullying','Una primaria te invita a dar una plática: "Los verdaderos rudos no molestan a nadie".',[
  ['🎤 Dar la plática',()=>{LH.f(12);return'Los niños te hacen una porra. La directora pide foto para el periódico mural.';}],
  ['🤸 Hacer una exhibición en el patio',()=>{LH.hp(-6);LH.g(15);LH.f(6);return'Haces una plancha en el pasto. La cooperativa te paga con $15 y un bolis.';}]]]},
 {id:'cohetes',k:'pre',w:[1,3],f:()=>['🎆 Pirotecnia casera','El promotor compró cohetes en el mercado para tu entrada. Las mechas se ven sospechosamente cortas.',[
  ['🔥 ¡Encenderlos!',()=>{LH.aff(4);if(chance(.35)){LH.hp(-6);return'¡ESPECTACULAR! +4 de afición... y te quedaste sin cejas.';}return'¡ESPECTACULAR! Entras entre chispas: +4 de afición.';}],
  ['🚶 Entrar caminando normalito',()=>'Entras con dignidad. Y con cejas.']]]},
 {id:'autografos',k:'post',w:[2,6],f:()=>['✍️ Firma de autógrafos','Una plaza comercial te invita a firmar autógrafos. La fila le da dos vueltas a la tienda departamental.',[
  ['💰 Cobrar por foto',()=>{LH.g(30);return'Tres horas, 400 fotos y la mano entumida.';}],
  ['🎁 Firmar gratis',()=>{LH.f(12);return'Una señora te pide que le firmes el yeso. Otro que le firmes la tortilla. Lo haces todo.';}]]]},
 {id:'videojuego',k:'post',w:[4,6],f:()=>['🎮 ¡Sales en un videojuego!','Una compañía quiere ponerte en su juego de lucha libre.',[
  ['💰 Cobrar regalías',()=>{LH.g(60);return'Firmas el contrato. Tu personaje tiene 72 de poder. Lo vas a reclamar en redes.';}],
  ['⭐ Pedir que te pongan 99 de poder',()=>{LH.f(15);return'Aceptan. Ahora eres el personaje más usado en línea.';}]]]},
 {id:'comercial',k:'post',w:[2,6],f:()=>['📺 Comercial de refrescos','"¡Chispa-Cola, la bebida de los campeones!" Te quieren de imagen.',[
  ['💰 Aceptar',()=>{LH.g(40);return'Tu abuela te ve en la tele y llora de orgullo.';}],
  ['🤑 Pedir el doble',()=>{if(chance(.5)){LH.g(85);return'¡Aceptaron! Hasta te regalan un refri lleno.';}return'Se ofendieron y contrataron a tu rival. Ahora lo ves en cada esquina.';}]]]},
 {id:'foto',k:'post',w:[3,6],f:()=>['📸 ¡Foto sin máscara!','Alguien subió una foto de un señor sin máscara comiendo tacos... y dicen que eres tú.',[
  ['🤥 "Es mi primo"',()=>{if(chance(.6)){LH.f(8);return'La gente te cree. Tu "primo" ahora también tiene fans.';}LH.f(-10);return'Nadie te cree: el "primo" tiene tu mismo tatuaje.';}],
  ['🏋️ Ignorarlo y entrenar',()=>{const n=LH.up(1);return'El chisme muere solo. Mejoraste '+n+'.';}]]]},
 {id:'ingles',k:'pre',w:[5,6],f:()=>['🗣️ Promo en inglés','Te dan el micrófono en un show en Texas... y hay que hablar en inglés.',[
  ['🇲🇽 ¡Gritar "VIVA MÉXICO"!',()=>{LH.aff(4);return'La paisanada enloquece. Los gringos no entendieron, pero también aplauden: +4 de afición.';}],
  ['🤓 Intentarlo en inglés',()=>{if(chance(.5)){LH.f(15);return'"I am the best luchador of the universe!" Te vuelves meme del bueno.';}LH.f(5);return'Dijiste "I am very exciting". Se ríen contigo... casi todos.';}]]]},
 {id:'maleta',k:'pre',w:[5,6],f:()=>['🧳 ¡Perdieron tu maleta!','Llegas al aeropuerto y la aerolínea mandó tu maleta con las máscaras a Toronto.',[
  ['🛒 Comprar una en la tienda de disfraces',()=>{LH.g(-20);return'Consigues una máscara de luchador "genérico". Te queda chica, pero cumple.';}],
  ['🎃 Luchar con máscara de calabaza',()=>{LH.aff(3);LH.f(6);return'La gente ama a "El Calabazo". +3 de afición.';}]]]},
 {id:'gimmick',k:'post',w:[5,6],f:()=>['🌮 Cambio de personaje','Un promotor gringo quiere que cambies tu nombre a "El Burrito Loco" y entres con un sombrero gigante y maracas.',[
  ['💵 Aceptar',()=>{LH.g(70);LH.f(-15);return'Te pagan muy bien. En México nadie te lo va a perdonar.';}],
  ['✋ Rechazar con orgullo',()=>{LH.f(15);return'"Mi nombre es mi máscara." La paisanada te hace tendencia.';}]]]},
 {id:'hardcore',k:'pre',w:[5,6],f:()=>['🪑 Show hardcore','En una bodega de Dallas te ofrecen luchar con mesas, sillas y escaleras. Pagan bien.',[
  ['🔨 Aceptar el reto',()=>{LH.g(50);LH.hp(-12);LH.aff(3);return'Te dan con una silla de metal. Le das con una mesa. +$50 y +3 de afición.';}],
  ['🙅 Lucha normal',()=>'Prefieres no terminar en el hospital. Sabia decisión.']]]},
 {id:'restaurante',k:'post',w:[5,6],f:()=>['🍔 La mesera regia','En un restaurante de Houston la mesera es de Monterrey, te reconoce y no te deja pagar.',[
  ['🙏 Aceptar',()=>{LH.hp(12);return'Te sirve doble porción y un cabrito "de la casa".';}],
  ['💵 Dejar una propina enorme',()=>{LH.g(-15);LH.f(10);return'Ella sube la foto del ticket. Todo Monterrey te quiere.';}]]]},
 {id:'aduana',k:'post',w:[5,6],f:()=>['🛃 La revisión del aeropuerto','El agente abre tu maleta: 14 máscaras, 3 capas y un cinturón dorado. Te pregunta si eres superhéroe.',[
  ['🦸 Decir que sí',()=>{LH.f(8);return'Te pide una selfie y te deja pasar primero.';}],
  ['🤼 Hacerle una llave de demostración',()=>{if(chance(.5)){LH.f(12);return'Le encanta. Te regala un pin y ahora es tu fan.';}LH.hp(-8);return'Mala idea. Revisión extra de dos horas.';}]]]},
 {id:'japon',k:'post',w:[4,6],f:()=>['🗾 Invitación de Japón','Una empresa de Tokio te invita a una gira. Quieren aprender tu estilo... y enseñarte el suyo.',[
  ['🤝 Intercambiar llaves',()=>{const n=LH.card(true);return'Te mandan un video de sus mejores llaves. Aprendiste: '+n+'.';}],
  ['⭐ Agendar la gira para después',()=>{LH.f(15);return'La noticia sale en todas partes: "Luchador mexicano conquista Japón".';}]]]},
 {id:'conferencia',k:'pre',w:[3,6],f:()=>['🎤 Conferencia de prensa','Antes de la estelar hay conferencia de prensa. Tu rival te avienta su vaso de agua a la cara.',[
  ['🤬 Voltearle la mesa',()=>{LH.f(15);LH.ef(3);return'¡Se arma la campal! Las cámaras lo transmiten todo. Tu rival llega con +3 de furia.';}],
  ['😌 Mantener la calma',()=>{LH.hp(6);LH.pb(6);return'Te secas con elegancia. Llegas concentrado: empiezas con 6 de defensa.';}]]]},
 {id:'casa',k:'post',w:[4,6],c:()=>P.gold>=60,f:()=>['🏠 La casa de tu mamá','Tu mamá lleva 20 años rentando. Con lo que ganas ya alcanza para un enganche.',[
  ['🔑 Darle el enganche',()=>{REL('mama',3);LH.g(-60);LH.mx(15);LH.f(10);return'Tu mamá llora, te persigna y te da un caldito. Te sientes invencible: +15 de vida máxima.';}],
  ['⏳ Esperar a juntar más',()=>'"No te preocupes, mijo." Pero tú sí te preocupas.']]]},
 {id:'despedida',k:'post',w:[2,4],f:()=>['👴 La despedida del veterano','El Gran Tlacuache se retira después de 40 años y te pide luchar en su función de despedida.',[
  ['🤝 Aceptar con honor',()=>{const n=LH.up(1);LH.f(12);return'Te enseña su llave secreta en el vestidor. Mejoraste '+n+'.';}],
  ['📅 No te da tiempo',()=>{LH.g(20);return'Te quedas a trabajar en otra función. Te llega un mensaje: "Ni modo, chamaco".';}]]]},
 {id:'sindicato',k:'post',w:[2,5],f:()=>['✊ Asamblea de luchadores','Los luchadores se reúnen para exigir que el promotor pague seguro médico para todos.',[
  ['📣 Apoyar a tus compañeros',()=>{REL('lic',-1);REL('kid',1);LH.f(10);LH.ef(2);return'Ganan el seguro. El promotor te tiene en la mira y te pone un rival muy motivado: +2 de furia.';}],
  ['🤐 No meterte',()=>{REL('lic',1);REL('kid',-1);LH.g(15);return'El promotor te da un "bono por lealtad". El vestidor no te habla igual.';}]]]},
 {id:'mma',k:'post',w:[3,6],f:()=>['🥊 Oferta de artes marciales mixtas','Una empresa de artes marciales mixtas te ofrece una pelea "de verdad".',[
  ['🥋 Entrenar con ellos una semana',()=>{LH.mx(6);LH.hp(-6);return'Te dan una paliza en el entrenamiento, pero sales más duro: +6 de vida máxima.';}],
  ['🎭 "Lo mío es el espectáculo"',()=>{LH.f(8);return'Respondes en redes con un video haciendo una huracarrana. Ganaste la discusión.';}]]]},
 {id:'chismes',k:'post',w:[3,6],f:()=>['📺 Programa de chismes','En la tele dicen que andas de novio con una cantante famosa. Tú ni la conoces.',[
  ['🙅 Desmentirlo',()=>{LH.f(5);return'"Ni la conozco." Nadie te cree, pero quedaste como caballero.';}],
  ['😏 No decir nada',()=>{LH.f(18);LH.hp(-6);return'Tu fama sube como espuma... y tu mamá te regaña por teléfono una hora.';}]]]},
 {id:'perrito',k:'post',w:[0,2],c:()=>!P.flags.perro,f:()=>['🐕 El perro del barrio','Un perrito callejero te sigue desde la arena hasta tu casa.',[
  ['🦴 Adoptarlo',()=>{LH.g(-10);P.flags.perro=1;return'Se llama Chato II. Te cuida la espalda: +4 de defensa al inicio de cada lucha.';}],
  ['🤗 Darle una caricia',()=>'Mueve la cola y se va. Lo vas a extrañar.']]]},
 {id:'feria',k:'pre',w:[1,1],f:()=>['🎡 El reto de la feria','El dueño del juego de "toques" te reta: si aguantas la máquina de electricidad hasta el final, te paga.',[
  ['⚡ Aguantar los toques',()=>{if(chance(.5)){LH.g(25);LH.pf(1);return'¡Aguantaste! Te pagan $25 y sales con los pelos parados y +1 de furia.';}LH.hp(-6);return'Soltaste en el nivel 3. Todo el pueblo se ríe.';}],
  ['🌽 Comprarte un elote',()=>{LH.g(-3);LH.hp(5);return'Con mayonesa, queso y chile. Prioridades.';}]]]},
 {id:'vecino',k:'pre',w:[0,0],f:()=>['🏚️ El vecino enojado','El vecino del patio de al lado dice que "tanto brinco" le está tirando los platos y amenaza con llamar a la patrulla.',[
  ['🎟️ Invitarlo de primera fila',()=>{LH.aff(2);return'Se vuelve tu fan más gritón: +2 de afición.';}],
  ['🙏 Prometer no volar tanto',()=>{LH.pb(4);return'Luchas más a ras de lona: empiezas con 4 de defensa.';}]]]}
];
function lifeEv(when,cb){const t=vTier();const seen=P.seenL=P.seenL||[];let pool=LIFE.filter(e=>(when==='map'||e.k===when)&&t>=e.w[0]&&t<=e.w[1]&&!seen.includes(e.id)&&(!e.c||e.c()));if(!pool.length)return cb();
 const e=pick(pool);seen.push(e.id);const[ti,tx,op]=e.f();const papers=t>=5?['📰 NOTICIAS DE LA FRONTERA','📱 TENDENCIA EN REDES','📺 NOTICIERO DE LA NOCHE']:['📰 EL GRÁFICO DE LA LUCHA','📱 TENDENCIA EN REDES','📻 RADIO PANCRACIO'];
 const head=when==='pre'?'⏰ ANTES DE LA LUCHA':pick(papers);const box=b=>'<div class="news"><div class="nh">'+head+' · '+VEN[t].e+' '+VEN[t].n+'</div><h1>'+ti+'</h1><p>'+b+'</p></div>';
 sfx.bell();showPanel(box(tx));op.forEach(([l,f])=>addBtn(l,'blu',()=>{const s0=[P.hp,P.gold,P.fama,P.max,P.flags.pBlk||0];const r=f();const d=[['❤',P.hp-s0[0]],['$',P.gold-s0[1]],['⭐',P.fama-s0[2]],['❤ máx',P.max-s0[3]],['🛡 inicial',(P.flags.pBlk||0)-s0[4]]].filter(x=>x[1]).map(x=>'<span class="'+(x[1]>0?'up':'dn')+'">'+x[0]+' '+(x[1]>0?'+':'')+x[1]+'</span>').join(' ');
  showPanel(box(r+(d?'</p><div class="delta">'+d+'</div><p>':'')));addBtn('Continuar','',cb);}));}
function preLife(cb){if(P.mode||P.daily||!chance(.3))return cb();lifeEv('pre',cb);}
function postLife(cb){if(P.mode||P.daily||!chance(.6))return cb();lifeEv('post',cb);}

const VOTES=[{t:'¡Que vuele! (usa una llave aérea 🪽)',ck:()=>C.played.some(d=>d.air)},{t:'¡Llave! (usa una llave 🔗)',ck:()=>C.played.some(d=>d.llave)},{t:'¡Castigo! (haz 15 o más de daño este turno)',ck:()=>C.turnDmg>=15},{t:'¡Que aguante! (termina el turno con 10+ de defensa)',ck:()=>C.p.block>=10},{t:'¡Show! (usa 3 cartas este turno)',ck:()=>C.played.length>=3}];
function coinFace(f){return f==='a'?'<div class="cf a">🦅<small>ÁGUILA</small></div>':'<div class="cf s">☀️<small>SOL</small></div>';}
function coinToss(){if(!C||C.tut)return startTurn();C.busy=true;render();const rn=C.e.n.replace(/ \(.*\)$/,'');
 showPanel('<h1>🪙 ¡Volado!</h1><p style="text-align:center">¿Quién empieza la lucha?<br><span class="small">'+pnm()+' vs '+rn+'</span></p><div class="coinw"><div class="coin" id="coin">'+coinFace('a')+'</div></div>');
 voz([{t:'¡Volado! ¿Águila o sol?',p:1.2,r:1.1}],true);
 const go=pickS=>{const res=RNG()<.5?'a':'s';const win=pickS===res;const pn=$('#pn');if(pn&&pn.querySelectorAll)pn.querySelectorAll('button').forEach(b=>b.remove());sfx.card();
  const c=$('#coin');let k=0,face='a';const N=14;if(c&&c.classList)c.classList.add('flip');
  const tick=()=>{k++;face=face==='a'?'s':'a';if(k>=N)face=res;if(c)c.innerHTML=coinFace(face);if(k<N)setTimeout(tick,W(60+k*7));else setTimeout(done,W(350));};
  const done=()=>{if(!C)return;const t=(res==='a'?'🦅 ¡Cayó águila!':'☀️ ¡Cayó sol!');showPanel('<h1>'+t+'</h1><div class="coinw"><div class="coin land">'+coinFace(res)+'</div></div><p style="text-align:center;font-size:17px">Elegiste '+(pickS==='a'?'águila':'sol')+'.<br><b>'+(win?'¡Empiezas tú!':'Empieza '+rn+'.')+'</b>'+(win?'':'<br><span class="small">Por empezar segundo tendrás +1 de energía en tu primer turno.</span>')+'</p>');
   voz([{t:(res==='a'?'¡Cayó águila!':'¡Cayó sol!')+' '+(win?'¡Empieza '+pnm()+'!':'¡Empieza '+rn+'!'),p:1.2,r:1.15}],true);if(win){sfx.win();wkAdd('w_coin');}
   addBtn('🔔 ¡A luchar!','gold',()=>{hidePanel();if(!C)return;if(win){C.busy=false;startTurn();}else{C.firstE=1;C.busy=true;C.p.block=C.startBlock;C.startBlock=0;shout('¡EMPIEZA '+rn.toUpperCase()+'!');setTimeout(()=>{if(C&&!C.over)enemyTurn();},W(700));}});};
  setTimeout(tick,W(60));};
 addBtn('🦅 Águila','gold',()=>go('a'));addBtn('☀️ Sol','blu',()=>go('s'));}
function startCombat(key,kind,opt){opt=opt||{};BETO=opt.beto||0;if(isStory()){try{const cp=Object.assign({},P);delete cp.chSnap;delete cp.fSnap;P.fSnap=JSON.stringify(cp);P.fKey=key;}catch(e){}}const a=ACTS[Math.min(P.act,2)],e=EN[key],L=LUCH[P.l];let sc=opt.sc||a.sc;sc*=1+(P.cab>=1?.1:0)+(P.cab>=6?.1:0)+(P.cab>=10?.1:0);if(kind==='nemesis')sc*=1.2;if(!P.mode&&!P.daily&&!P.tut){sc*=[.85,1.03,1.2][DIF()];if(P.ch!==undefined&&kind!=='boss')sc*=1.1+.12*P.ch;if(P.ch!==undefined&&kind==='boss')sc*=[1.35,1.45,1.5,1.55,1.55,1.4,1.7][P.ch]||1;}
 const F=P.flags;const startAff=(has('halcon')?3:0)+(P.l==='X'?4:0)+upl('aff')+(F.banda?2:0)+(F.aff3&&P.act===2?3:0)+(F.entAff||0)+(kind==='boss'&&P.rel&&P.rel.mama>=2?2:0)+(kind==='boss'&&P.flags.abMem?3:0)+(META.belt==='torneo'?1:0);F.entAff=0;
 C={kind,turn:0,pile:shuffle(P.deck.map(c=>({...c}))),hand:[],disc:[],exh:[],energy:3,maxE:3+(has('imperial')?1:0)+(opt.energy||0),pen:0,aff:0,sus:0,played:[],relevoUsed:false,mods:opt.mods||{},
  startBlock:(has('acero')?8:0)+(F.perro?4:0)+(META.belt==='retos'?3:0),sub:0,vote:null,turnDmg:0,drawPen:0,stealNext:false,mv:null,llaveTurn:false,surrender:false,
  p:{block:0,st:{furia:(has('roja')?1:0)+(opt.pfuria||0)+(F.formula?1:0)}},
  e:{key,n:(kind==='nemesis'?e.n+' (Revancha)':e.n),hp:Math.round(e.hp*sc),max:Math.round(e.hp*sc),block:0,st:{},mv:e.mv,mi:0,m:e.m,revive:e.revive,twin:e.twin,transform:e.transform,blood:e.blood,
   dmgB:(a.sc>1.1?2:0)+(P.cab>=2&&e.boss?2:0)+(P.cab>=4&&!e.boss?2:0)+(P.cab>=10?2:0)+(kind==='nemesis'?2:0)},anim:{pf:0,ef:0,stop:0},busy:false,over:false,ref:P.flags.ref,dmgTaken:0,lastId:null,tut:kind==='tut'?{step:0}:null};
 P.flags.ref=0;C.aff=0;addAff(startAff,true);
 if(F.energia){C.maxE++;F.energia=0;}
 if(META.belt==='muertos'||META.belt==='navidad')C.p.st.furia=(C.p.st.furia||0)+1;
 if(P.inj&&P.inj.length){P.inj.forEach(()=>C.pile.push(mkc('lesion')));shuffle(C.pile);}
 if(F.chisme){C.e.st.debil=(C.e.st.debil||0)+2;F.chisme=0;}
 if(F.reto){C.e.st.furia=(C.e.st.furia||0)+2;F.reto=0;}
 if(!P.mode&&!P.daily&&!P.tut){if(P.ch!==undefined&&kind!=='boss')C.e.dmgB+=Math.floor(P.ch/2)+1;C.e.guard=P.ch!==undefined?Math.round(1+P.ch*1.2)+(kind==='boss'?3:0):0;if(DIF()===2)C.e.dmgB+=2;if(DIF()===0)C.e.dmgB-=2;if(kind==='boss'&&P.ch!==undefined)C.e.dmgB+=[2,2,3,3,4,3,5][P.ch]||0;if(kind==='boss'&&P.ch!==undefined){C.e.st.furia=(C.e.st.furia||0)+(P.ch>=2?1:0);C.e.block=[4,6,8,10,12,12,15][P.ch]||0;}}
 C.stip=opt.stip||null;applyStip();if(isStory()&&P.home)C.startBlock+=P.home*2;if(META.ent&&META.opt.ent&&!C.tut){C.introT=90;setTimeout(entFx,W(600));}
 if(isStory()&&kind==='boss'&&P.ch===6&&P.flags.estudio){C.e.hp=C.e.max=Math.round(C.e.max*.9);}
 if(kind==='boss'&&P.rel&&!P.mode&&P.ch!==6){if(P.rel.kid>=2){C.p.st.furia=(C.p.st.furia||0)+2;setTimeout(()=>say('kid','¡Estoy en tu esquina, {n}! ¡Dale con todo! (+2 furia)'),1200);}else if(P.rel.kid<=-2){C.e.st.furia=(C.e.st.furia||0)+2;setTimeout(()=>say('kid','Le di unos consejitos a tu rival, {n}. Suerte. (+2 furia al rival)'),1200);}else if(P.rel.mama>=2)setTimeout(()=>say('mama','¡Aquí estamos con la manta, mijo! (+2 afición)'),1200);}
 if(F.eFur){C.e.st.furia=(C.e.st.furia||0)+F.eFur;F.eFur=0;}if(F.pFur){C.p.st.furia=(C.p.st.furia||0)+F.pFur;F.pFur=0;}if(F.pBlk){C.startBlock+=F.pBlk;F.pBlk=0;}
 if(F.insulto&&e.boss){C.e.st.furia=(C.e.st.furia||0)+3;F.insulto=0;}
 if(F.trampa&&e.boss&&P.act===2){C.e.st.furia=(C.e.st.furia||0)+3;}
 if(has('siniestra')){C.e.st.abierto=2;C.e.st.debil=1;}
 if(opt.efuria)C.e.st.furia=opt.efuria;
 if(P.cab>=8&&e.boss)C.e.st.furia=(C.e.st.furia||0)+2;
 if(C.tut)C.aff=5;
 C.e.ai=e.ai||(e.boss?'calculador':'normal');C.hist={blk:[],dmg:0,hand:5};C.ps={air:0,llave:0,dirty:0,turns:0,blockT:0};C.refDown=false;C.pos='centro';C.keep=null;C.mullUsed=false;C.carry=0;chooseIntent();setTimeout(()=>{if(C&&!C.tut)hint('ai','🧠 Los rivales piensan: el letrero blanco dice qué harán y el negro te dice POR QUÉ. Deciden viendo tu vida, tu defensa, tu afición y lo que hiciste antes.');},W(1400));
 sfx.bell();hidePanel();setLog((kind==='boss'?'🎭 ¡Máscara contra máscara! ':kind==='nemesis'?'😡 ¡Revancha contra ':'🔔 ¡Arranca la lucha contra ')+e.n+(kind==='boss'?'':'!')+(e.note?'<br>⚠ '+e.note:''));
 voz(kind==='tut'?[{t:'¡Bienvenido al ring, campeón!',p:1.4,r:1.2}]:kind==='boss'?[{t:'¡Atención, atención!',p:1.25,r:1.2},{t:'¡Esta noche, máscara contra máscara!',p:1.4,r:1.1},{t:'¡'+pnm()+'!',p:1.55,r:.95},{t:'¡contra '+e.n+'!',p:1.5,r:.95}]:[{t:'¡Señoras y señores!',p:1.2,r:1.2},{t:'¡En esta esquina!',p:1.3,r:1.15},{t:'¡'+pnm()+'!',p:1.55,r:.95},{t:'¡Y en la otra esquina!',p:1.3,r:1.15},{t:'¡'+e.n+'!',p:1.45,r:.95}],true);
 musicStart(!P.mode&&!P.daily&&!P.tut&&META.opt.vmus?(e.boss?'boss':'v'+vTier()):(e.boss?true:false));com('start');if(!C.tut)setTimeout(()=>narr('start'),900);
 setTimeout(()=>{if(!C)return;if(e.note)hint('en_'+key,'⚠ '+e.n+': '+e.note);if(P.inj&&P.inj.length)hint('lesion','🤕 Tienes una lesión: hay cartas de Lesión en tu mazo que no se pueden jugar. Cúralas en el gimnasio con Fisioterapia.');if($('#relevo').style.display==='flex')hint('relevo','🤝 El botón Relevo mete a tu compañero una vez por lucha: daño extra y +8 de vida.');},W(900));
 $('#relevo').style.display=C.stip==='relevos'&&(C.beto?!C.betoGone:(P.partner&&P.partner!==P.l))?'flex':'none';
 coinToss();}
function mulligan(){if(!C||C.busy||C.over||C.mullUsed||C.turn!==1||C.played.length)return;C.mullUsed=true;const n=C.hand.filter(c=>def(c).t!=='fin').length;C.pile.push(...C.hand.filter(c=>def(c).t!=='fin'));C.hand=C.hand.filter(c=>def(c).t==='fin');shuffle(C.pile);draw(n);sfx.card();setLog('🔄 Cambiaste tu mano.');render();}
function draw(n){for(let i=0;i<n;i++){if(C.hand.length>=10)return;if(!C.pile.length){if(!C.disc.length)return;C.pile=shuffle(C.disc);C.disc=[];}C.hand.push(C.pile.pop());}}
function startTurn(){if(!C||C.over)return;C.turn++;tmStart();if(isStory()&&(C.e.key==='veneno')&&C.turn%2===0&&!C.tut)setTimeout(()=>{if(C&&!C.over)say('kid',pick(TAUNT));},W(500));if(C.turn>=(C.kind==='boss'?24:18)&&!C.tut){const d=Math.min(20,(C.turn-(C.kind==='boss'?23:17))*3);C.e.hp-=d;P.hp-=Math.ceil(d/2);shout('¡EL RÉFERI PIDE ACCIÓN!');setLog('⏱️ La lucha se alarga: los dos se cansan (rival -'+d+', tú -'+Math.ceil(d/2)+').');if(C.e.hp<=0){render();return setTimeout(win,W(300));}if(P.hp<=0){render();return setTimeout(lose,W(450));}}C.p.block=C.turn===1?C.startBlock:0;C.p.st.contra=0;C.played=[];C.turnDmg=0;C.llaveTurn=false;
 if(C.p.st.fuera){C.p.st.fuera=0;C.p.st.regreso=1;}
 C.energy=Math.max(0,C.maxE+(C.carry||0)-C.pen+(C.firstE?1:0));if(C.firstE){C.firstE=0;setTimeout(()=>{if(C)float('p','+1⚡ por empezar segundo','#ffd23f');},W(300));}C.pen=0;C.carry=0;
 if(has('cempa')&&C.turn>1){healP(2);}
 let n=P.l==='G'?4:5;if(C.turn===1){if(has('azul'))n+=2;if(P.man==='profe')n++;if(has('esfera'))n++;}n-=C.drawPen;C.drawPen=0;
 if(C.tut){const H=C.turn===1?['golpe','bloqueo','golpe']:C.turn===2?['hurra','saludo','golpe']:['golpe','golpe','bloqueo'];C.hand=H.map(id=>mkc(id));if(C.aff>=10)C.hand.push(mkc('finT'));}else draw(n);
 if(C.stealNext)hint('steal','🐀 Este rival te roba la carta MÁS CARA de tu mano al inicio de tu turno.');
 if(C.stealNext&&C.hand.length){C.stealNext=false;let i=0;C.hand.forEach((c,j)=>{const d=def(c);if(d.t!=='fin'&&!d.useless&&d.c>def(C.hand[i]).c)i=j;});const c=C.hand.splice(i,1)[0];C.exh.push(c);setLog('🐀 ¡'+C.e.n+' te robó '+def(c).n+'!');shout('¡TE ROBÓ UNA CARTA!');}
 if(!C.tut&&C.turn>=2&&chance(.09)){refFall(pick(['¡EL RÉFERI SE RESBALÓ!','¡EL RÉFERI SE TROPEZÓ CON LA CUERDA!','¡EL RÉFERI SE CAYÓ SOLO!']));}
 if(!C.tut&&C.turn>=2&&C.turn%3===2){C.vote=pick(VOTES);sfx.crowd();hint('vote','📣 ¡La afición pide algo! Mira el letrero rosa. Si lo cumples este turno: +3 afición y +5 vida. Si no, pierdes afición.');}else C.vote=null;
 C.busy=false;render();if(isStory()&&!C.intf&&C.turn>=2&&(C.e.ai==='tramposo'||C.stip==='todo')&&C.e.hp<=C.e.max*.5){C.intf=1;setTimeout(()=>{if(C&&!C.busy&&!C.over)interf();},W(500));}else if(!C.tut&&!C.lluv&&C.aff>=8&&chance(.2)){C.lluv=1;setTimeout(lluvia,W(400));}}
function dmgCalc(base,att,def_){let d=base+(att.st.furia||0);if(att.st.debil)d*=.75;if(def_.st.abierto)d*=1.5;return Math.max(0,Math.floor(d));}
function hurtE(d,src){const E=C.e;if(src!=='x'&&E.st.evade){E.st.evade=0;float('e','¡FALLÓ!','#ddd');sfx.block();if(d>=12&&!C.tut&&!C.refDown){refFall('¡LE PEGÓ AL RÉFERI!');}return 0;}
 const b=Math.min(E.block,d);E.block-=b;const r=d-b;E.hp-=r;C.turnDmg+=r;float('e',r>0?'-'+r:'🛡'+b,r>0?(CATCOL[C.lastCat]||'#ff5252'):'#8ec5ff',r);
 if(r>0){C.anim.ef=8;if(r>=14){sfx.big();shake();C.anim.stop=6;vib(60);}else{sfx.hit();vib(20);}juice('e',r);}else sfx.block();
 enemyChecks();return r;}
function enemyChecks(){const E=C.e;if(C.surrender)return;
 if(C.beto===2&&!C.betoGone&&E.tagIn&&E.hp<=E.max*.45&&E.hp>0){betrayal();return;}
 if(E.hp<=0&&E.tag&&!E.tagIn&&!(E.revive&&!E.revived)){E.tagIn=1;const T=E.tag;E.n=T.n;E.m=T.m;E.mv=T.mv;E.mi=0;E.hp=E.max=T.hp;E.block=0;E.st={};E.phase2=true;shout('¡ENTRA SU PAREJA!');sfx.crowd();vib(80);setLog('🤝 Cayó uno... ¡ahora entra <b>'+T.n+'</b> con '+T.hp+' de vida!');com('revive');}
 if(E.hp>0&&EN[E.key]&&EN[E.key].boss&&!E.phase2&&E.hp<=E.max*.5){E.phase2=true;E.st.furia=(E.st.furia||0)+2;E.ai='agresivo';shout('¡FASE 2!');setLog('😤 '+E.n+' se enfurece: +2 de furia y ahora es más agresivo.');hint('phase','😤 Los jefes se enfurecen a la mitad de su vida: ganan furia y se vuelven más agresivos.');}
 if(E.hp<=0&&E.revive&&!E.revived){E.revived=true;E.hp=Math.round(E.max*E.revive);E.st={};E.block=0;shout('¡SE LEVANTA! ¡NO PUEDE SER!');com('revive');hint('revive','💀 Algunos rivales reviven una vez. ¡Guarda algo de daño!');sfx.crowd();setLog('⚠ '+E.n+' se levanta con '+E.hp+' de vida.');}
 if(E.hp>0&&E.twin&&!E.twinUsed&&E.hp<=E.max*.5){E.twinUsed=true;E.hp=Math.min(E.max,E.hp+25);E.st.furia=(E.st.furia||0)+3;shout('¡ENTRA EL OTRO GEMELO!');hint('twin','👬 Los gemelos se relevan cuando uno baja a la mitad: el otro entra con vida y furia.');setLog('👬 Relevo de los gemelos: +25 de vida y +3 de furia.');}
 if(E.hp>0&&E.transform&&!E.transformed&&E.hp<=E.max*E.transform.at){E.transformed=true;E.n=E.transform.n;E.m=E.transform.m;E.dmgB+=E.transform.dmg;shout('¡SE TRANSFORMÓ!');hint('transform','🐆 Este rival se transforma a la mitad de su vida y pega más fuerte.');setLog('🐆 '+E.n+': ahora pega +'+E.transform.dmg+'.');}}
function hurtP(d){if(C.p.st.fuera){float('p','¡FUERA DEL RING!','#7dff8a');sfx.block();return 0;}
 
 const b=Math.min(C.p.block,d);C.p.block-=b;const r=d-b;P.hp-=r;C.dmgTaken+=r;float('p',r>0?'-'+r:'🛡'+b,r>0?'#ff5252':'#8ec5ff',r);
 if(r>0){C.anim.pf=8;sfx.hit();vib(r>=12?80:30);if(r>=12)shake();juice('p',r);if(P.hp<P.max*.3&&!C.lowCom){C.lowCom=1;com('low');}}else sfx.block();return r;}
function addAff(n,silent){if(!n)return;if(C.mods.affx2)n*=2;const before=C.aff;C.aff=Math.min(10,C.aff+n);if(C.aff>=10&&before<10){if(!silent){sfx.crowd();shout('¡LA AFICIÓN ENLOQUECE!');confetti(30);}setLog('📣 ¡LA AFICIÓN ENLOQUECE! Tienes tu llave maestra.');C.hand.push(mkc(LUCH[P.l].fin));if(!silent)hint('fin','🌟 ¡Afición al máximo! Te llegó tu LLAVE MAESTRA (carta dorada): cuesta 0 y hace muchísimo daño. Se queda en tu mano hasta que la uses.');}}
function play(i){if(!C||C.busy||C.over)return;const c=C.hand[i];if(!c)return;const d=def(c);C.lastCat=d.t==='fin'?'fin':cardCat(d);
 if(d.useless){float('p','No se puede usar','#ffd23f');nudge();return;}
 if(d.fuera&&C.stip==='jaula'){float('p','¡Es una jaula!','#ffd23f');return;}
 if(d.llave&&C.pos==='tercera'){float('p','Bájate de la tercera','#ffd23f');hint('tercera','🗼 Desde la tercera cuerda no puedes aplicar llaves. Usa una llave aérea 🪽 para bajar volando.');return;}
 const cost=cardCost(c);if(cost>C.energy){float('p','Sin energía','#ffd23f');return;}
 if(C.tut){const ts=TUT[C.tut.step];if(!ts||ts.need!==c.id){nudge();return;}}
 C.energy-=cost;if(C.p.st.amarrado)C.p.st.amarrado=0;C.hand.splice(i,1);sfx.card();C.lastId=c.id;if(C.keep===c.uid)C.keep=null;
 if(d.choice){C.busy=true;showPanel('<h1>'+d.e+' '+d.n+'</h1><p>Elige una opción:</p>');d.choice.forEach(o=>addBtn(o.t,'blu',()=>{hidePanel();C.busy=false;const dd={...d,...o.e,choice:null};if(o.e.t)dd.t=o.e.t;resolve(dd,c);}));return;}
 resolve(d,c);}
function resolve(d,c){
 setMv('p',animFor(d,c&&c.id));styAdd(d);if(d.air)wkAdd('w_air20');
 const E=C.e,Pp=C.p;let txt=d.e+' '+d.n;
 if(d.dmg){const fromPos=C.pos;let base=baseDmg(d);if(d.air&&C.stip==='jaula')base=Math.round(base*1.3);if(d.sub&&E.hp<=E.max*.4)txt+=' — ¡SE RINDE DEL DOLOR!';if(d.finish&&E.hp<E.max*.5)txt+=' — ¡REMATE!';
  if(d.air&&Pp.st.regreso){Pp.st.regreso=0;shout('¡TOPE DE REGRESO!');txt+=' — ¡desde afuera del ring, doble daño!';}
  if(d.air&&fromPos!=='centro'){txt+=fromPos==='tercera'?' — ¡DESDE LA TERCERA! x2':' — ¡rebotando en las cuerdas! x1.5';C.pos='centro';}
  let tot=0;for(let h=0;h<(d.hits||1);h++){tot+=hurtE(dmgCalc(base,{st:Pp.st},E));if(E.hp<=0)break;}
  if(tot>=40)unlock('nocaut');narr(d.t==='fin'?'fin':d.air?'air':d.dirty?'dirty':d.llave?'llave':tot>=16?'big':'hit',{m:d.n},d.t==='fin');if(E.hp>0&&E.hp<E.max*.25&&!C.nEL){C.nEL=1;setTimeout(()=>narr('eLow'),1600);}
  if(d.t!=='fin'&&!(d.air&&txt.includes('regreso'))){if(d.air){shout(pick(SHOUTS.air));com('air');}else if(tot>=16){shout(pick(SHOUTS.big));com('big');}}}
 if(d.llave&&E.hp>0){C.llaveTurn=true;let add=25+(E.hp<E.max*.5?15:0);if(EN[E.key].boss)add=Math.round(add/2);if(d.subx)add*=d.subx;C.sub=Math.min(100,C.sub+add);hint('sub','🔗 Barra de rendición (morada, bajo la vida del rival): cada llave la llena. Al 100% el rival se rinde. Si un turno no usas llaves, baja.');if(C.sub>=60)com('sub');
  if(C.sub>=100){C.surrender=true;E.hp=0;txt+=' — ¡SE RINDIÓ!';shout('¡SE RINDE! ¡SE RINDE!');}}
 if(d.block){if(!d.dmg&&chance(.3))narr('block');Pp.block+=d.block;float('p','+'+d.block+'🛡','#8ec5ff');}
 if(d.fuera){Pp.st.fuera=1;txt+=' — esquivarás el próximo ataque';hint('fuera','🏃 Estás fuera del ring: el siguiente ataque del rival no te pega, y tu siguiente llave aérea 🪽 hará doble daño.');}
 if(d.en)C.energy+=d.en;
 if(d.pos){C.pos=d.pos;hint('pos','📍 Posición: desde las cuerdas 🪢 tus aéreas pegan x1.5 y desde la tercera 🗼 x2. Pero en la tercera recibes +50% de daño y no puedes hacer llaves. Al usar una aérea regresas al centro.');}
 if(d.ap&&E.hp>0&&(d.cond!=='abierto'||E.st.abierto)){for(const k in d.ap)E.st[k]=(E.st[k]||0)+d.ap[k];}
 if(d.sf)for(const k in d.sf)Pp.st[k]=(Pp.st[k]||0)+d.sf[k];
 if(d.contra)Pp.st.contra=(Pp.st.contra||0)+d.contra;
 if(d.heal){healP(d.heal);float('p','+'+d.heal+'❤','#7dff8a');}
 if(d.healAff){const h=Math.max(2,C.aff);healP(h);float('p','+'+h+'❤','#7dff8a');}
 if(d.self){P.hp-=d.self;float('p','-'+d.self,'#ff5252');}
 if(d.dirty){P.dirtyUsed=true;C.dirtyN=(C.dirtyN||0)+1;if(C.refDown||C.stip==='todo'){txt+=' (¡el réferi está en el suelo, no vio nada!)';}else{C.sus+=d.dirty;refDo('point',50);}addAff(1);txt+=' (¡abucheos!)';shout(pick(SHOUTS.dirty));com('dirty');hint('ref','👁 Cada carta sucia suma sospecha (arriba de tu mano). Si al terminar tu turno llegas al límite (normalmente 3), el réferi te castiga. Cada turno limpio baja 1.');}
 if(d.t==='fin'){if(!C.tut){META.cnt.fin++;saveMeta();if(META.cnt.fin>=10)unlock('fin10');}C.aff=0;sfx.crowd();shout(pick(SHOUTS.fin));confetti(25);vib(120);txt='🔥 '+d.n+'!!!';voz([{t:'¡Se acabó!',p:1.55,r:1.15},{t:'¡'+d.n+'!',p:1.5,r:1}],true);com('fin');}
 if(d.aff)addAff(d.aff+(P.l==='V'&&d.air?1:0));
 if(d.draw)draw(d.draw);
 (d.ex||d.t==='fin'?C.exh:C.disc).push(c);
 C.played.push(d);combos(d);
 setLog(txt);
 if(C.tut){C.tut.step++;}
 if(E.hp<=0)return win();if(P.hp<=0)return lose();
 render();}
function combos(d){const pl=C.played,air=pl.filter(x=>x.air).length,ll=pl.filter(x=>x.llave).length,atk=pl.filter(x=>x.t==='atk').length;if(C.e.hp<=0)return;
 if((d.air&&air===3)||(d.llave&&ll===2)||(d.t==='atk'&&atk===4)){com('combo');hint('combo','✨ ¡Hiciste un combo! En un mismo turno: 3 aéreas 🪽 = Vuelo en cadena · 2 llaves 🔗 = Llave combinada · 4 ataques = Ráfaga.');}
 if(d.air&&air===3){sfx.combo();shout('¡COMBO: VUELO EN CADENA!');unlock('vuelo');hurtE(10,'x');addAff(2);setLog('🪽🪽🪽 ¡Vuelo en cadena! +10 de daño y +2 de afición.');}
 if(d.llave&&ll===2&&C.e.hp>0){sfx.combo();shout('¡COMBO: LLAVE COMBINADA!');C.e.st.debil=(C.e.st.debil||0)+1;unlock('combinada');C.e.st.abierto=(C.e.st.abierto||0)+2;setLog('🔗🔗 ¡Llave combinada! Rival Débil y Abierto.');}
 if(d.t==='atk'&&atk===4){sfx.combo();shout('¡COMBO: RÁFAGA!');unlock('rafaga');C.energy++;setLog('👊x4 ¡Ráfaga! +1 de energía.');}}
function relevo(){if(!C||C.busy||C.over||C.tut||C.stip!=='relevos')return;if(C.beto)return betoRelevo();if(C.relevoUsed)return;C.relevoUsed=true;const k=P.partner,m=(upl('relevo')?1.5:1)*(P.flags.relevoBoost&&P.act===1?1.5:1),E=C.e;sfx.slap();shout('¡RELEVO! ENTRA '+LUCH[k].n.toUpperCase());voz([{t:'¡Relevo!',p:1.5,r:1.2},{t:'¡Entra '+LUCH[k].n+'!',p:1.45,r:1.1}],true);
 C.mv={who:'p',type:'air',t:0,dur:30};
 if(k==='T'){hurtE(dmgCalc(Math.round(12*m),{st:{}},E),'x');addAff(2);}if(k==='R'){hurtE(dmgCalc(Math.round(14*m),{st:{}},E),'x');E.st.debil=(E.st.debil||0)+2;}
 if(k==='G')hurtE(dmgCalc(Math.round(18*m),{st:{}},E),'x');if(k==='V')for(let i=0;i<4;i++)hurtE(dmgCalc(Math.round(4*m),{st:{}},E),'x');
 if(k==='X'){addAff(5);healP(Math.round(6*m));}if(k==='M'){hurtE(dmgCalc(Math.round(10*m),{st:{}},E),'x');C.p.block+=Math.round(10*m);}
 healP(8);setLog('🤝 '+LUCH[k].n+' entra al relevo y te da un respiro (+8 de vida).');
 if(E.hp<=0)return win();render();}
function endTurn(){if(!C||C.busy||C.over)return;if(C.tut){if(TUT[C.tut.step].need!=='end'){nudge();return;}C.tut.step++;}C.busy=true;const left=C.energy;if(left>0){C.carry=1;if(P.l==='M'){C.p.block+=3*left;float('p','+'+3*left+'🛡 agilidad','#8ec5ff');}hint('carry','⚡ La energía que no usas no se pierde del todo: guardas 1 para tu siguiente turno.');}
 C.ps.turns++;if(C.played.some(d=>d.air))C.ps.air++;if(C.played.some(d=>d.llave))C.ps.llave++;if(C.played.some(d=>d.dirty))C.ps.dirty++;if(C.p.block>=8)C.ps.blockT++;
 C.hist.blk.push(C.p.block);if(C.hist.blk.length>3)C.hist.blk.shift();C.hist.dmg=C.turnDmg;C.hist.hand=C.hand.length;if(C.played.some(d=>d.dirty))C.dirtyTurn=true;else C.dirtyTurn=false;
 const kept=c=>def(c).t==='fin'||c.uid===C.keep;C.disc.push(...C.hand.filter(c=>!kept(c)));C.hand=C.hand.filter(kept);C.keep=null;
 if(C.vote){if(C.vote.ck()){addAff(3);healP(5);shout('¡LA AFICIÓN TE AMA!');refDo('dance',90);setLog('📣 ¡Cumpliste lo que pidió la afición! +3 afición y +5 vida.');sfx.crowd();}else{C.aff=Math.max(0,C.aff-2);setLog('📣 La afición se decepciona... -2 de afición.');}C.vote=null;}
 if(!C.llaveTurn&&C.sub>0)C.sub=Math.max(0,C.sub-10);
 if(C.sus>=refT()&&!C.ref&&!C.refDown){refDo('point',100);C.aff=Math.max(0,C.aff-5);C.pen=1;C.sus=0;setLog('🟥 ¡EL RÉFERI TE VIO! Pierdes afición y 1 de energía el próximo turno.');com('ref');shout('¡AMONESTACIÓN!');beep(2000,.3,'sine',.05);}
 else if(!C.dirtyTurn&&C.sus>0)C.sus--;
 C.refDown=false;
 tickSt(C.p.st);render();setTimeout(enemyTurn,W(650));}
function refT(){return 3+(has('diablo')?1:0)+(P.man==='lic'?1:0);}
function tickSt(st){for(const k of['debil','abierto'])if(st[k])st[k]--;}
function enemyTurn(){if(!C||C.over)return;const E=C.e,mv=E.cur;E.block=E.guard||0;if(E.guard&&!C.guardHint){C.guardHint=1;setTimeout(()=>hint('guard','🛡 Los rivales de categorías altas se cubren solos cada turno. Rompe su defensa con golpes fuertes o llaves.'),W(800));}if(E.cdHeal>0)E.cdHeal--;
 if(!E.st.mareado&&mv){if(mv.combo){const cm=ECOMBOS.find(c=>c.n===mv.combo);shout('¡COMBO '+mv.combo.toUpperCase()+'!');sfx.big();vib(60);hint('ecombo','🔗 ¡El rival hizo un COMBO! Encadenó movimientos para potenciar el último. Cuando veas 🔗 en su intención, cúbrete o pégale antes.');E.chain=[];}else{E.chain=(E.chain||[]).concat([mv.tag||tagOf(mv)]).slice(-3);}}else E.chain=[];
 if(E.st.mareado){E.st.mareado=0;setLog('💫 '+E.n+' está mareado y no ataca.');}
 else{if(!mv.dmg)setMv('e',animForE(mv));if(mv.block)E.block+=mv.block+(E.dmgB?4:0);if(mv.sf)for(const k in mv.sf)E.st[k]=(E.st[k]||0)+mv.sf[k];if(mv.ap)for(const k in mv.ap)C.p.st[k]=(C.p.st[k]||0)+mv.ap[k];
  if(mv.evade){E.st.evade=1;hint('evade','🌫️ El rival se volvió sombra: tu siguiente ataque fallará. Usa primero una carta barata.');}if(mv.amarra){C.p.st.amarrado=1;hint('amarra','🪢 Te amarraron: tu siguiente carta cuesta +1 de energía (el número sale en rojo).');}if(mv.cargar){C.drawPen=1;hint('cargar','🏋️ Te cargaron y azotaron: el próximo turno robas 1 carta menos.');}if(mv.steal)C.stealNext=true;if(mv.escape){C.sub=Math.max(0,C.sub-40);shout('¡SE ZAFÓ!');}
  if(mv.affDown){C.aff=Math.max(0,C.aff-mv.affDown);shout('¡ABUCHEOS!');hint('prov','📣 Este rival le habla al público para bajarte la afición. Usa tu llave maestra antes de que lo haga.');}
  if(mv.heal){E.hp=Math.min(E.max,E.hp+mv.heal);E.cdHeal=3;float('e','+'+mv.heal+'❤','#7dff8a');}
  if(mv.accuse){C.sus+=2;refDo('point',90);shout('¡TE ACUSARON!');hint('accuse','👁 El rival te acusó con el réferi: +2 de sospecha. Si llegas al límite al terminar tu turno, te castigan.');}
  if(mv.pierce){C.p.block=Math.floor(C.p.block/2);}
  if(mv.dmg){setMv('e',animForE(mv));const bonus=E.blood&&P.hp<P.max*.5?3:0;for(let h=0;h<(mv.hits||1);h++){hurtP(Math.floor(dmgCalc(mv.dmg+E.dmgB+bonus,E,C.p)*(C.pos==='tercera'?1.5:1)));if(C.p.st.contra)hurtE(C.p.st.contra,'x');if(P.hp<=0||E.hp<=0)break;}}
  {const tdm=mv.dmg?perHit(mv)*(mv.hits||1):0;if(mv.combo)narr('eCombo',{m:mv.combo},true);else if(/bajo|silla|réferi|Mano rápida|Compinche|Escupitajo/i.test(mv.n))narr('eDirty',{m:mv.n});else if(tdm>=14)narr('eBig',{m:mv.n});else if(mv.heal)narr('eHeal');if(P.hp>0&&P.hp<P.max*.25&&!C.nPL){C.nPL=1;setTimeout(()=>narr('low',null,true),1500);}}
  setLog(E.n+': '+mv.n+(mv.steal?' — ¡te robará una carta!':mv.cargar?' — robarás 1 carta menos':mv.amarra?' — tu siguiente carta cuesta +1':mv.evade?' — esquivará tu siguiente ataque':''));}
 tickSt(E.st);
 if(E.hp<=0){render();return setTimeout(win,W(300));}
 if(P.hp<=0){render();return setTimeout(lose,W(450));}
 chooseIntent();render();setTimeout(startTurn,W(550));}
const AIW={normal:{atk:0,def:0,buff:0,deb:0,spc:0},agresivo:{atk:2,def:-1,buff:0,deb:-.5,spc:0},defensivo:{atk:-1,def:2,buff:1,deb:0,spc:0},tramposo:{atk:-.5,def:0,buff:0,deb:2,spc:2.5},calculador:{atk:1,def:1,buff:1,deb:1,spc:1}};
function perHit(mv){const E=C.e;let d=(mv.dmg||0)+E.dmgB+(E.blood&&P.hp<P.max*.5?3:0)+(E.st.furia||0);if(E.st.debil)d*=.75;if((C.p.st.abierto||0)>1)d*=1.5;if(C.pos==='tercera')d*=1.5;return Math.max(0,Math.floor(d));}
function incoming(){const E=C.e,mv=E.cur;if(!mv||E.st.mareado||!mv.dmg||C.p.st.fuera)return 0;const per=perHit(mv);let blk=C.p.block+(P.l==='M'?3*C.energy:0),tot=0;if(mv.pierce)blk=Math.floor(blk/2);for(let i=0;i<(mv.hits||1);i++){const b=Math.min(blk,per);blk-=b;tot+=per-b;}return tot;}
function tagOf0(){}
function tagOf(m){if(m.dmg)return'atk';if(m.heal)return'heal';if(m.block&&!m.sf)return'blk';if(m.sf)return'buf';if(m.ap)return'deb';return'spc';}
const ECOMBOS=[
 {n:'Martillo',e:'🔨',s:['atk','atk','atk'],d:'Tres ataques seguidos: el tercero pega 50% más.',f:m=>({dmg:Math.round(m.dmg*1.5)})},
 {n:'Contragolpe',e:'🔁',s:['blk','atk'],d:'Se cubre y luego contraataca: +4 de daño y rompe la mitad de tu defensa.',f:m=>({dmg:m.dmg+4,pierce:1})},
 {n:'Rudeza encadenada',e:'⛓️',s:['deb','atk'],d:'Te debilita y luego castiga: +3 de daño y te deja Débil.',f:m=>({dmg:m.dmg+3,ap:Object.assign({},m.ap||{},{debil:1})})},
 {n:'Furia desatada',e:'🌋',s:['buf','buf','atk'],d:'Junta furia dos veces y suelta un golpe extra.',f:m=>({hits:(m.hits||1)+1})},
 {n:'Sombra y castigo',e:'🌑',s:['spc','atk'],d:'Después de una maña, ataca por sorpresa: +5 de daño.',f:m=>({dmg:m.dmg+5})},
 {n:'Segundo aire',e:'💨',s:['heal','atk'],d:'Recupera aire y vuelve con todo: +3 de daño y +1 de furia.',f:m=>({dmg:m.dmg+3,sf:Object.assign({},m.sf||{},{furia:1})})},
 {n:'Llave de castigo',e:'🪢',s:['deb','deb','atk'],d:'Dos castigos y remata: te deja Abierto.',f:m=>({dmg:m.dmg+2,ap:Object.assign({},m.ap||{},{abierto:2})})},
 {n:'Muro y remate',e:'🧱',s:['blk','blk','atk'],d:'Aguanta dos turnos y remata: +8 de daño.',f:m=>({dmg:m.dmg+8})},
 {n:'Golpe y golpe',e:'👊',s:['buf','atk'],d:'Se calienta y conecta: +2 de daño.',f:m=>({dmg:m.dmg+2})}];
function comboFor(mv){const E=C.e,ch=E.chain||[],tg=tagOf(mv);let best=null;for(const c of ECOMBOS){const k=c.s.length;if(c.s[k-1]!==tg)continue;const need=c.s.slice(0,k-1);if(ch.length<need.length)continue;if(need.every((t,i)=>ch[ch.length-need.length+i]===t)&&(!best||k>best.s.length))best=c;}return best;}
function comboProg(mv){const E=C.e,ch=(E.chain||[]).concat([tagOf(mv)]);let p=0;for(const c of ECOMBOS){const k=c.s.length;if(k<3)continue;for(let j=Math.min(k-1,ch.length);j>=1;j--){if(c.s.slice(0,j).every((t,i)=>ch[ch.length-j+i]===t)){p=Math.max(p,j/k);break;}}}return p;}
function DIF(){return(P&&!P.mode&&!P.daily&&!P.tut&&P.diff!==undefined)?P.diff:1;}
const DIFS=[{n:'Fácil',e:'🟢',d:'Rivales con menos vida, menos daño y sin combos. Para disfrutar la historia.',f:.75},{n:'Regular',e:'🟡',d:'Rivales que encadenan combos y leen tu estilo. La experiencia recomendada.',f:1},{n:'Difícil',e:'🔴',d:'Rivales más fuertes, que buscan combos siempre y pegan más. +30% de fama.',f:1.3}];
function askDiff(cb){const cur=META.diff!==undefined?META.diff:1;showPanel('<h1>⚖️ Elige la dificultad</h1><p class="small">Puedes cambiarla cada vez que empieces una historia nueva.</p>');
 DIFS.forEach((d,i)=>addBtn(d.e+' '+d.n+(i===cur?' ✓':''),i===1?'gold':i===2?'':'blu',()=>{META.diff=i;saveMeta();cb(i);},d.d));}
function chooseIntent(){const E=C.e,w=AIW[E.ai]||AIW.normal,h=C.hist||{blk:[],dmg:0,hand:5};const blkAvg=h.blk.length?h.blk.reduce((a,b)=>a+b,0)/h.blk.length:0;
 const opts=E.mv.slice();if(C.sub>=50)opts.push({n:'Zafarse de la llave',escape:1,block:6});
 const ps=C.ps||{air:0,llave:0,dirty:0,turns:0,blockT:0},tn=Math.max(1,ps.turns);
 if(C.aff>=6)opts.push({n:'Provocar al público',affDown:3,gen:1});
 if(E.hp<E.max*.45&&!(E.cdHeal>0))opts.push({n:'Recuperar aire',heal:Math.round(E.max*.12),block:4,gen:1});
 if(blkAvg>=8||ps.blockT/tn>=.6)opts.push({n:'Rompe guardia',dmg:8,pierce:1,gen:1});
 if(ps.dirty>0&&C.sus>=1&&!C.refDown)opts.push({n:'Acusar con el réferi',accuse:1,gen:1});
 if(!E.plan&&C.turn>=1&&chance([.15,.4,.7][DIF()])){const buff=E.mv.find(m=>m.sf&&!m.dmg),big=E.mv.filter(m=>m.dmg).sort((a,b)=>perHit(b)*(b.hits||1)-perHit(a)*(a.hits||1))[0],deb=E.mv.find(m=>m.ap&&m.ap.abierto);
  if(buff&&big&&P.hp>P.max*.4)E.plan={steps:[buff,big],i:0,why:['🧠 Plan: junta furia ahora para un golpe fuerte después','🧠 Plan: ¡ahora sí, el golpazo con furia!']};
  else if(deb&&big&&deb!==big)E.plan={steps:[deb,big],i:0,why:['🧠 Plan: te deja Abierto para castigarte','🧠 Plan: ¡castiga mientras estás Abierto!']};}
 let best=opts[0],bs=-1e9,why='';
 for(const mv of opts){let s=1+R(0,DIF()===0?4:1.2),r='🧠 Ataque directo';const dmg=mv.dmg?perHit(mv)*(mv.hits||1):0;
  if(mv.dmg){s+=dmg/8+w.atk;if(C.pos==='tercera'){s+=3;r='🧠 Te vio en la tercera: ¡te va a bajar!';}if(dmg>=P.hp){s+=25;r='🧠 ¡Huele la victoria: va por el remate!';}else if(P.hp<P.max*.35){s+=3;r='🧠 Te ve débil: ¡va con todo!';}else if((C.p.st.abierto||0)>1){s+=3;r='🧠 Te vio Abierto: ¡golpe fuerte!';}else if(blkAvg>=dmg*.8){s-=2.5;r='🧠 Sabe que te cubres, pero insiste';}if(E.st.debil)s-=2;}
  if(mv.block){let d=1+w.def;if(E.hp<E.max*.4){d+=4;r='🧠 Está herido: se va a cubrir';}else if(C.aff>=7){d+=3;r='🧠 Le teme a tu llave maestra';}else if(h.dmg>=15){d+=2;if(!mv.dmg)r='🧠 Le dolió tu último turno: se protege';}s+=d;}
  if(mv.sf){let b=1+w.buff-(E.st.furia||0)*.8;if(P.hp<P.max*.35)b-=3;if(C.turn<=1&&!E.warm){b+=1.5;E.warm=1;if(!mv.dmg)r='🧠 Se está calentando';}else if(blkAvg>=8){b+=2;if(!mv.dmg)r='🧠 Como te cubres mucho, junta fuerza';}s+=b;}
  if(mv.ap){let d=1.5+w.deb;if(mv.ap.debil&&C.p.st.debil)d-=2;if(mv.ap.abierto&&C.p.st.abierto)d-=2;if(h.dmg>=12)d+=1.5;s+=d;if(!mv.dmg)r='🧠 Te quiere debilitar antes de atacar';}
  if(mv.steal){s+=w.spc+(h.hand>=3?2:0);r='🧠 Quiere robarte tu carta más cara';}
  if(mv.evade){s+=w.spc+(h.dmg>=12?3:0);if(!mv.dmg)r='🧠 Tus golpes le duelen: se esconde';}
  if(mv.cargar){s+=w.spc+1;r='🧠 Te quiere cargar para que robes menos';}
  if(mv.amarra){s+=w.spc+1;r='🧠 Te quiere amarrar con la reata';}
  if(mv.escape){s+=4+C.sub/15;r='🧠 ¡Desesperado por zafarse de tu llave!';}
  if(mv.affDown){s+=2+C.aff*.5+w.spc*.5;r='🧠 Va a provocar al público para bajarte la afición';}
  if(mv.heal){s+=3+w.def+(E.hp<E.max*.3?2:0);r='🧠 Necesita aire: se va a recuperar';}
  if(mv.pierce){s+=dmg/8+blkAvg/4+w.atk;r='🧠 Leyó que te cubres mucho: ¡rompe guardia!';}
  if(mv.accuse){s+=1.5+C.sus*1.5+w.spc;r='🧠 Te va a acusar con el réferi 👁';}
  if(mv.evade&&ps.air/tn>=.5){s+=2;r='🧠 Ya vio que vuelas mucho: se va a esconder';}
  if(mv.escape&&ps.llave/tn>=.5)s+=1;
  if(E.plan&&E.plan.steps[E.plan.i]===mv&&E.hp>E.max*.3){s+=4;r=E.plan.why[E.plan.i];}
  if(DIF()>0){const cm=comboFor(mv);if(cm){s+=DIF()===2?6:3.5;r='🔗 Combo';}else{const pr=comboProg(mv);if(pr>0)s+=pr*(DIF()===2?3:1.5);}}
  if(E.last===mv.n){s-=3;if(E.last2===mv.n)s-=10;}
  if(s>bs){bs=s;best=mv;why=r;}}
 if(E.plan){if(E.plan.steps[E.plan.i]===best){E.plan.i++;if(E.plan.i>=E.plan.steps.length)E.plan=null;}else E.plan=null;}
 E.last2=E.last;E.last=best.n;E.cur=best;E.why=why;E.combo=null;if(DIF()>0&&!C.tut){const cm=comboFor(best);if(cm){E.combo=cm;E.cur=Object.assign({},best,cm.f(best),{n:best.n+' '+cm.e,combo:cm.n,tag:tagOf(best)});}}}
function nextIntent(){chooseIntent();}
function intentText(){const E=C.e,mv=E.cur;if(!mv)return'';if(E.st.mareado)return'💫 Mareado';const p=[];if(mv.combo)p.push('🔗'+mv.combo.toUpperCase()+'!');
 if(mv.dmg)p.push('⚔️'+perHit(mv)+(mv.hits?'x'+mv.hits:''));if(mv.block)p.push('🛡️'+(mv.block+(E.dmgB?4:0)));if(mv.escape)p.push('🔓');if(mv.affDown)p.push('📣-'+mv.affDown);if(mv.heal)p.push('❤️+'+mv.heal);if(mv.pierce)p.push('🔨');if(mv.accuse)p.push('👁+2');if(mv.sf)p.push('🔥+'+mv.sf.furia);if(mv.ap)p.push(Object.entries(mv.ap).map(([k,v])=>STI[k]+v).join(''));if(mv.steal)p.push('🐀');if(mv.cargar)p.push('🏋️');if(mv.evade)p.push('🌫️');if(mv.amarra)p.push('🪢');return p.join(' ');}

// ================= MODO HISTORIA v16: capítulos, camino y elenco =================
function isStory(){return !!(P&&!P.mode&&!P.daily&&!P.tut);}
const CHT=['Lona y mecate','La kermés','La traición','La Coliseo','La televisión','Del otro lado','La gran final'];
const CHB=['panzon','charrooro','emperador','carnicero','siniestro','inmortal','veneno'];
function chBoss(){return P.ch===6?(((P.rel&&P.rel.kid)||0)>=2?'venenoH':'veneno'):CHB[P.ch];}
const REPS={
 lic:{e:'💼',n:'El Licenciado Barrera',d:'Honrado pero codo. Funciones seguras, bolsa normal.',pay:.05,min:0},
 billetes:{e:'🤑',n:'Chuy "Billetes" Montoya',d:'Promete fama y dinero rápido. +30% de bolsa... si todo sale bien.',pay:.3,min:1},
 tona:{e:'👵',n:'Doña Toña',d:'Representó leyendas de los 70. Te cuida como hijo: +4 de defensa al iniciar cada lucha.',pay:0,min:2,care:1},
 vale:{e:'📱',n:'Valeria "La Güera" Cortés',d:'Experta en redes. +15% de bolsa y +5⭐ extra por victoria.',pay:.15,min:2,fame:1},
 johnny:{e:'🤠',n:'Johnny Ramírez',d:'Representante de Houston. Contratos en dólares: +40% de bolsa.',pay:.4,min:4},
 rigo:{e:'🧔',n:'Tu compadre Rigo',d:'Tu amigo de la cuadra. No sabe de negocios, pero jamás te traicionaría.',pay:-.05,min:1,loyal:1}};
const REPL={
 lic:{hi:'Mucho gusto, {n}. Yo no prometo milagros: prometo que siempre te voy a pagar.',bye:'Ni modo, mijo. Aquí está mi tarjeta por si te arrepientes.',win:['Buena taquilla. Ya pagué la luz de la oficina.','Así se hace. Te conseguí la siguiente fecha... con refresco incluido.','Sigue así y te subo la bolsa. Un poquito.']},
 billetes:{hi:'¡Mi campeón! Conmigo vas a ganar más billetes que el Banco de México.',bye:'Tú te lo pierdes, campeón. ¡Al rato me ruegas!',win:['¡Eso! Ya tengo tres patrocinadores... bueno, dos y medio.','¡Te dije, te dije! ¿Ya viste mis lentes nuevos? Cortesía tuya, jeje.','Firmamos más fechas. Tú nomás lucha, de la lana me encargo yo.']},
 tona:{hi:'Ay, mijo, tienes los ojos de un campeón. Yo te voy a cuidar.',bye:'Que Dios te acompañe, mijo. Aquí siempre tienes un plato de sopa.',win:['¡Así luchaba El Santo! Te traje un tecito para la garganta.','Te vendé las muñecas como a los de antes. Por eso aguantaste.','Bien hecho, mijo. Ahora a dormir temprano.']},
 vale:{hi:'Hola, {n}. Tu problema no es el ring: es que nadie te conoce. Eso se arregla hoy.',bye:'Ok. Te dejo de seguir. Nada personal, son negocios.',win:['¡Tu video ya va en un millón de vistas!','Sonríe para la foto... no, con la máscara no se ve. Bueno, haz pose.','Te conseguí una marca de bebidas. Bueno, de agua de jamaica.']},
 johnny:{hi:'Hey, champ! Welcome to the big leagues. Aquí todo es en dólares.',bye:'Ok, amigo. No hard feelings... pero sí un poquito.',win:['Great job, champ! Los gringos te aman.','Te conseguí un comercial de pickups. Muy americano.','Ese tope suicida ya está en todos los noticieros de Texas.']},
 rigo:{hi:'¡Compadre! No sé ni qué hace un representante, pero aquí estoy.',bye:'Ta bueno, compadre. Ya sabes dónde vivo.',win:['¡Compadre! ¡Ya hasta en la cuadra te dicen "el campeón"!','Te traje unas tortas de la esquina. Así se festeja.','No entendí ni el contrato, pero ganamos, ¿no?']}};
function repOf(){return REPS[P.rep]||null;}
function repPay(){const r=repOf();return r?r.pay:0;}
Object.assign(CAST,{abuelo:['👴','Abuelo Ramón','tu abuelo'],vane:['💃','Vanessa',''],papa:['🧔','Tu papá',''],hermano:['👦','Toño','tu hermano menor'],reporter:['🎤','Reportera',''],doc:['🩺','La doctora',''],sys:['📊','',''],fan:['🙋','Un aficionado','']});
for(const k in REPS)CAST[k]=[REPS[k].e,REPS[k].n,'representante'];
function castOf(w){if(w==='kid'&&P&&!P.mode&&(P.ch===undefined||P.ch<=2)&&!(P.flags&&P.flags.kidHeel))return['🙂','Beto','tu amigo de la infancia'];if(w==='rep')return P&&REPS[P.rep]?[REPS[P.rep].e,REPS[P.rep].n,'tu representante']:CAST.chuy;return CAST[w];}
function fmt(t){return String(t).replace(/\{n\}/g,pnm()).replace(/\{r\}/g,P&&REPS[P.rep]?REPS[P.rep].n:'tu representante').replace(/\{s\}/g,P&&REPS[P.scam]?REPS[P.scam].n:'');}
function seq(a,done){let i=0;const nx=()=>{if(i>=a.length)return done();a[i++](nx);};nx();}
function RR(k){return(P.rel&&P.rel[k])||0;}
function abAlive(){return P.ab!=='dead';}
function snap(){return{hp:P.hp,max:P.max,g:P.gold,f:P.fama,rel:Object.assign({},P.rel||{}),pb:P.flags.pBlk||0,pf:P.flags.pFur||0,af:P.flags.entAff||0};}
function deltaText(s){const o=[];const d=(v,l)=>{if(v)o.push(l+' '+(v>0?'+':'')+v);};d(P.hp-s.hp,'❤');d(P.max-s.max,'❤ máx');d(P.gold-s.g,'$');d(P.fama-s.f,'⭐');
 const RI_={kid:'🦂 Kid',mama:'👩 Mamá',abuelo:'👴 Abuelo',rep:'🤝 Repr.'};for(const k in RI_){const v=RR(k)-(s.rel[k]||0);if(v)o.push(RI_[k]+' '+(v>0?'💚 mejora':'💔 empeora'));}
 d((P.flags.pBlk||0)-s.pb,'🛡 inicial');d((P.flags.pFur||0)-s.pf,'🔥 furia');d((P.flags.entAff||0)-s.af,'📣 afición');return o.join(' · ');}
function relHTML(){if(!P||!P.rel)return'';const ch=(k,e,n)=>{const v=RR(k);return'<span class="'+(v>=2?'up':v<=-2?'dn':'')+'">'+e+' '+n+' '+(v>=2?'💚':v<=-2?'💔':'🤝')+'</span>';};
 const heel=P.ch>2||!!(P.flags&&P.flags.kidHeel);let h='<div class="rels">'+(heel?ch('kid','🦂','Alacrán'):ch('kid','👦','Beto'))+ch('mama','👩','Mamá')+(P.ab==='dead'?'<span>🕯️ Abuelo</span>':ch('abuelo','👴','Abuelo'+(P.ab==='sick'?' 🏥':'')));const r=repOf();if(r)h+='<span>'+r.e+' '+r.n.split(' ').slice(-1)[0]+'</span>';return h+'</div>';}
function REL(k,n){P.rel=P.rel||{};P.rel[k]=Math.max(-5,Math.min(5,(P.rel[k]||0)+n));}
function drinkUp(n){P.drink=(P.drink||0)+(n||1);}

// ---------- historias con decisiones ----------
function choice(who,q,opts,cb){const c=who==='yo'?[LUCH[P.l].e,pnm()]:(castOf(who)||CAST.nar);
 showPanel('<div class="dlg"><div class="who"><span class="pe">'+c[0]+'</span><div><b>'+(c[1]||'')+'</b><span class="small">tu decisión</span></div></div><div class="tx">'+fmtW(who,q)+'</div></div>');
 opts.filter(o=>!o[2]||o[2]()).forEach(([lab,fn])=>addBtn(fmt(lab),'blu',()=>{const s0=snap();const r=fn();let L=typeof r==='string'?[['nar',r]]:(r||[]);const d=deltaText(s0);if(d)L=L.concat([['sys',d]]);talk(L,cb);}));}
function runStory(id,cb){const f=BETO_ST[id]||SE[id];if(!f)return cb();(P.used=P.used||[]).push(id);const e=f();if(!e)return cb();talk(e.l||[],()=>{if(!e.o||!e.o.length)return cb();choice(e.who||'nar',e.q||'¿Qué haces?',e.o,cb);});}
const SE={
 abuelo_mascara:()=>({l:[['nar','Antes de tu primera lucha, tu abuelo Ramón te espera en la puerta de la vecindad con una caja de zapatos.'],['abuelo','Esta máscara la usé en 1974, en la Arena Coliseo. Me decían "El Gavilán". Una sola lucha... y perdí.'],['abuelo','Pero ese día supe lo que era volar. Ahora es tuya, {n}. Llévala más lejos de lo que yo llegué.']],who:'abuelo',q:'¿Qué le dices a tu abuelo?',o:[
  ['🙏 "Te prometo llevarla hasta el estadio"',()=>{REL('abuelo',2);return[['abuelo','Con eso me basta, mijo. Ahora ve y que se oiga tu nombre.']];}],
  ['🎭 Ponértela en tu primera lucha',()=>{REL('abuelo',1);LH.aff(2);return[['abuelo','¡Ándale! Que la vea la gente otra vez.'],['nar','Empiezas tu próxima lucha con +2 de afición.']];}],
  ['😅 "Abuelo, eso ya es de museo..."',()=>{REL('abuelo',-1);LH.f(3);return[['abuelo','(se ríe, pero se le apagan los ojos) Tienes razón... guárdala de todos modos.']];}]]}),
 kid_juramento:()=>({l:[['nar','La noche antes de tu primera máscara, Beto y tú suben a la azotea, como cuando eran niños.'],['kid','Oye, carnal... ¿te acuerdas del juramento del meñique?'],['kid','Si uno sube, sube el otro. Nadie se queda atrás.']],who:'kid',q:'¿Qué le respondes a Beto?',o:[
  ['🤙 Repetir el juramento',()=>{REL('kid',1);return[['kid','Hasta el estadio, carnal.'],['yo','Hasta el estadio.']];}],
  ['🍺 Sacar unas cervezas para festejar',()=>{REL('kid',1);drinkUp(1);LH.hp(-6);return[['kid','¡Salud por los futuros campeones!'],['nar','Al día siguiente te duele la cabeza: -6 de vida.']];}],
  ['😏 "El que llegue primero, gana"',()=>{REL('kid',-1);LH.pf(1);return[['kid','(se ríe incómodo) Ah... ¿así va a ser? Va.']];}]]}),
 kermes_fiesta:()=>({l:[['nar','Después de la función, el comité de la feria organiza un baile con banda. El mezcal corre como agua.'],['kid','¡Carnal! ¡Vente, que hoy invita el comisario!'],['vane','Hola... tú eres el de la máscara, ¿verdad? Te vi luchar. Me llamo Vanessa.']],who:'vane',q:'La banda empieza a tocar. ¿Qué haces?',o:[
  ['💃 Sacar a bailar a Vanessa',()=>{P.love='vane';LH.f(4);return[['vane','Bailas mejor de lo que luchas... y eso ya es mucho.'],['nar','Te da su número escrito en una servilleta.']];}],
  ['🥃 Echarte unos mezcales con Beto',()=>{drinkUp(1);REL('kid',1);LH.hp(-8);return[['kid','¡Otro! ¡Otro!'],['nar','No recuerdas cómo llegaste a tu casa. La cruda te quita 8 de vida.']];}],
  ['🏠 Irte temprano a descansar',()=>{REL('mama',1);LH.pb(5);return[['mama','¿Llegaste temprano? ¿Estás enfermo, mijo?'],['nar','Duermes como bebé: +5 de defensa al iniciar tu próxima lucha.']];}]]}),
 hermano:()=>({l:[['hermano','¡{n}! ¡Ya me salí de la secundaria! ¡Quiero ser luchador como tú!'],['mama','¡Dile algo a tu hermano! Por tu culpa se le metió esa idea.']],who:'hermano',q:'¿Qué le dices a Toño?',o:[
  ['📚 "Primero la escuela, luego el ring"',()=>{REL('mama',2);return[['hermano','...Está bien. Pero me enseñas una llave.'],['mama','Gracias, mijo. Por fin alguien con cabeza en esta casa.']];}],
  ['🤼 "Vente al gimnasio conmigo"',()=>{REL('mama',-2);LH.f(6);const n=LH.up(1);return[['hermano','¡Síííí!'],['mama','Si algo le pasa, va a ser tu culpa, {n}.'],['nar','Enseñándole, repasas lo básico: mejoraste '+n+'.']];}],
  ['🤷 "No es mi problema"',()=>{REL('mama',-1);return[['hermano','(baja la cabeza) Ok...']];}]]}),
 papa:()=>({l:[['nar','Un señor te espera afuera del gimnasio. Tardas en reconocerlo: es tu papá. No lo ves desde que tenías ocho años.'],['papa','Mijo... te vi en el periódico. Estoy en un apuro. ¿Me prestas algo?']],who:'papa',q:'Tu papá espera tu respuesta.',o:[
  ['💵 Darle $30',()=>{LH.g(-30);LH.pb(4);return[['papa','Te lo pago, te lo juro.'],['nar','Nunca te lo paga. Pero algo en tu pecho se siente más ligero.']];},()=>P.gold>=30],
  ['🍽️ Invitarlo a comer y escucharlo',()=>{REL('mama',-1);LH.hp(6);return[['papa','Perdóname por todo, {n}. Fui un cobarde.'],['mama','(por teléfono) ¿Con ESE señor comiste? Ay, mijo...']];}],
  ['🚪 Darle la espalda',()=>{REL('mama',1);LH.pf(2);return[['papa','Igualito a tu madre...'],['nar','Te tragas el coraje: +2 de furia en tu próxima lucha.']];}]]}),
 deuda:()=>({l:[['mama','Mijo... el banco nos quiere quitar la casa. Debemos tres meses.'],['abuelo','No le digas a {n}, mujer. Él tiene que concentrarse.']],who:'mama',q:'Tu mamá no se atreve a pedírtelo.',o:[
  ['🏠 Pagar la deuda ($50)',()=>{LH.g(-50);REL('mama',3);REL('abuelo',1);return[['mama','(llorando) No sé cómo pagarte esto, mijo.'],['abuelo','Ese es mi nieto.']];},()=>P.gold>=50],
  ['💪 "Dame tiempo, gano la siguiente y te ayudo"',()=>{REL('mama',1);LH.pf(1);return[['mama','Confío en ti, {n}.']];}],
  ['📞 "Ahorita no puedo, mamá"',()=>{REL('mama',-2);return[['mama','Ya veré cómo le hago... como siempre.']];}]]}),
 boda:()=>({l:[['nar','Tu prima se casa el mismo día de tu próxima lucha.'],['mama','Toda la familia va a estar. Tu abuelo quiere bailar contigo.']],who:'mama',q:'¿Qué haces?',o:[
  ['💒 Ir a la boda y luego a la arena',()=>{REL('abuelo',2);REL('mama',1);LH.hp(-10);return[['abuelo','¡Así se baila, mijo! ¡Con todo y víbora de la mar!'],['nar','Llegas a la arena oliendo a pastel: -10 de vida.']];}],
  ['🎁 Mandar un regalo caro ($25)',()=>{LH.g(-25);REL('mama',1);return[['mama','Bonito regalo... pero te extrañamos.']];},()=>P.gold>=25],
  ['🤼 Ir directo a la arena',()=>{REL('mama',-1);REL('abuelo',-1);LH.pb(4);return[['mama','Ya sabemos que la lucha va primero.']];}]]}),
 mama_retiro:()=>({l:[['mama','Vi tu última lucha. Ese golpe en la cabeza... {n}, quiero que te retires.'],['mama','No te crié para que te rompas la espalda por unos pesos.']],who:'mama',q:'Tu mamá llora en la cocina.',o:[
  ['🫂 "Te prometo cuidarme, mamá"',()=>{REL('mama',1);return[['mama','Prométemelo de verdad.']];}],
  ['🩺 Ir al doctor para que se quede tranquila ($15)',()=>{LH.g(-15);REL('mama',2);LH.mx(3);return[['doc','Estás sano como un roble. Cuídate el cuello.'],['mama','Ay, menos mal.']];},()=>P.gold>=15],
  ['😠 "¡Es mi vida, no la tuya!"',()=>{REL('mama',-2);LH.pf(1);return[['mama','(azota la puerta del cuarto)']];}]]}),
 kid_traicion:()=>{P.rel.kid=Math.min(RR('kid'),0)-2;return{l:[['chuy','Ya tienes nombre en el barrio, {n}. La Arena del barrio te quiere en el cartel.'],['nar','Esa misma noche, el promotor de la Coliseo le ofrece a Beto el único lugar de su cartel. Él firma... y no te dice nada.'],['kid','Firmé con la Coliseo, {n}. Solo había un lugar.'],['yo','¿Y el juramento del meñique, Beto?'],['kid','Éramos niños. Aquí no hay carnales, hay contratos. Y ya no me digas Beto: soy Kid Alacrán.']],who:'kid',q:'Tu amigo de toda la vida te dio la espalda.',o:[
  ['🤝 "Algún día vas a regresar, Beto"',()=>{REL('kid',1);return[['nar','Se detiene en la puerta un segundo... y se va sin voltear.']];}],
  ['😤 "Desde hoy eres mi rival"',()=>{REL('kid',-1);LH.pf(2);return[['kid','Por fin dices algo inteligente.'],['nar','Conviertes el coraje en furia: +2 en tu próxima lucha.']];}],
  ['👊 Empujarlo frente a todos',()=>{REL('kid',-2);LH.f(8);return[['kid','Ahí está. Ahora sí somos enemigos.'],['chuy','¡Sepárense! ¡Esto es un gimnasio, no una cantina!']];}]]};},
 abuelo_enfermo:()=>{P.ab='sick';return{l:[['mama','(por teléfono, llorando) {n}... tu abuelo se desmayó en el dominó. Está en el hospital.'],['doc','Su corazón está muy cansado. Con un tratamiento podría mejorar, pero es caro.'],['abuelo','(débil) No te preocupes por mí, mijo. Tú sigue luchando.']],who:'abuelo',q:'Tu abuelo te aprieta la mano.',o:[
  ['💊 Pagar el tratamiento ($60)',()=>{LH.g(-60);P.abT=1;REL('abuelo',2);REL('mama',2);return[['doc','Empezamos hoy mismo. Es un buen comienzo.'],['abuelo','Ay, mijo... ese dinero era para ti.']];},()=>P.gold>=60],
  ['💵 Dar todo lo que tienes ($'+P.gold+')',()=>{P.abT=P.gold>=30?.6:.3;LH.g(-P.gold);REL('abuelo',2);REL('mama',2);return[['doc','Con esto podemos empezar. Ojalá alcance.'],['mama','Gracias, mijo. Dios te lo va a pagar.']];},()=>P.gold<60&&P.gold>0],
  ['🏥 Quedarte la noche con él',()=>{P.abVis=(P.abVis||0)+1;REL('abuelo',2);LH.hp(-8);return[['abuelo','Cuéntame otra vez cómo le ganaste al Panzón...'],['nar','No duermes nada, pero no te arrepientes: -8 de vida.']];}],
  ['🏋️ "Tengo que entrenar, abuelo"',()=>{REL('abuelo',-2);REL('mama',-1);LH.mx(3);return[['abuelo','Está bien... ve.'],['mama','Ni una hora pudiste quedarte, {n}.']];}]]};},
 prensa_familia:()=>({l:[['nar','Primera estelar en la Coliseo. La sala de prensa está llena de cámaras.'],['reporter','{n}, ¿qué papel ha jugado tu familia en tu carrera?']],who:'reporter',q:'Todas las cámaras te apuntan.',o:[
  ['❤️ "Todo se lo debo a mi mamá y a mi abuelo"',()=>{REL('mama',2);REL('abuelo',2);LH.f(5);return[['mama','(viéndote en la tele) ¡Ese es mi hijo! ¡Ese es mi hijo!']];}],
  ['🤐 "Prefiero no hablar de mi vida privada"',()=>{LH.f(2);return[['reporter','Muy bien... siguiente pregunta.']];}],
  ['😤 "Mi familia nunca creyó en mí. Llegué solo."',()=>{P.bad=1;REL('mama',-4);REL('abuelo',-4);LH.f(12);return[['nar','Murmullos en la sala. La frase es tendencia en minutos: "{n} reniega de su familia".'],['nar','Tu mamá deja de contestar tus llamadas.']];}]]}),
 familia_prensa:()=>({l:[['nar','En el noticiero de la noche...'],['reporter','Hablamos con la mamá de {n}, que rompe el silencio.'],['mama','Ese no es el hijo que yo crié. Le di todo... y ahora dice que llegó solo.']].concat(abAlive()?[['abuelo','Yo le di su primera máscara. Que no se le olvide de dónde viene.']]:[]).concat([['nar','Los comentarios en redes te destrozan.']]),who:'mama',q:'Tu familia habló mal de ti en la tele.',o:[
  ['🙏 Pedir perdón en público',()=>{P.bad=2;REL('mama',3);REL('abuelo',3);LH.f(-5);return[['yo','Me equivoqué. Mi familia es todo lo que tengo. Perdóname, mamá.'],['mama','(días después) Ven a comer el domingo. Hice mole.']];}],
  ['💬 Llamarlos en privado',()=>{REL('mama',1);REL('abuelo',1);LH.f(-8);return[['mama','No sé, {n}. Me dolió mucho.']];}],
  ['📵 Bloquear a tu familia',()=>{P.bad=3;REL('mama',-3);REL('abuelo',-3);LH.pf(2);LH.f(-10);return[['nar','Bloqueas todos los números. El silencio pesa más que cualquier llave.']];}]]}),
 abuelo_final:()=>{let ch=.6-(P.abT||0)*.45-(P.abVis||0)*.05+(RR('abuelo')<0?.1:0);ch=Math.max(.12,Math.min(.85,ch));const dies=chance(ch);
  if(!dies){P.ab='healed';REL('abuelo',1);unlock('s_milagro');return{l:[['mama','(llorando, pero de felicidad) {n}... ¡tu abuelo despertó!'],['doc','Es un milagro. Su corazón respondió.'],['abuelo','¿Qué hacen todos llorando? ¡Todavía tengo que verte en el estadio!']]};}
  P.ab='dead';P.flags.abMem=1;return{l:[['mama','(por teléfono, a las 3 de la mañana) {n}... tu abuelo...'],['nar','...']],memorial:1};},
 lesion_rodilla:()=>({l:[['nar','En el entrenamiento escuchas un "crack" en tu rodilla.'],['doc','Ligamento lastimado. Lo ideal es operarte, aunque te va a doler la cartera.'],['rep','La tele quiere que luches sí o sí, {n}. Tú decides.']],who:'doc',q:'La rodilla está hinchada como toronja.',o:[
  ['🏥 Operarte ($40)',()=>{LH.g(-40);LH.mx(4);LH.hp(-10);addScar('rodilla');return[['doc','Quedó perfecta. Vas a estar mejor que antes.'],['nar','+4 de vida máxima, pero te tocará luchar adolorido.']];},()=>P.gold>=40],
  ['💉 Infiltrarte y luchar así',()=>{LH.inj('la rodilla',3);if(chance(.3)){LH.mx(-8);addScar('rodilla');return[['nar','A media lucha sientes que algo se rompe. La rodilla nunca vuelve a ser la misma: -8 de vida máxima.']];}return[['nar','Aguantas. Tendrás una carta de Lesión por 3 luchas.']];}],
  ['🌿 Ir con el sobador del barrio ($8)',()=>{LH.g(-8);if(chance(.5))return[['nar','"Nomás estaba zafada", dice el sobador. Quedaste como nuevo.']];LH.inj('la rodilla',2);return[['nar','El sobador te deja peor. Lesión por 2 luchas.']];}]]}),
 kid_tv:()=>{const k=RR('kid');
  if(k<=-2)return{l:[['kid','(en la tele) ¿{n}? Un muerto de hambre que sigue viviendo con su mamá.'],['kid','Su abuelito le cosía las máscaras, imagínense. Qué ternurita.'],['kid','(a la cámara) Te voy a quitar la máscara, {n}, y la voy a usar de trapeador.']],who:'kid',q:'Kid Alacrán se burla de ti y de tu familia en televisión nacional.',o:[
   ['📞 Llamarlo para arreglarlo en privado',()=>{REL('kid',1);return[['kid','¿Arreglar qué? Ya no somos niños, {n}. (cuelga)']];}],
   ['📣 Responderle en la tele',()=>{REL('kid',-1);LH.f(10);LH.pf(1);return[['yo','Beto, tú me enseñaste a amarrarme las botas. Ojalá te acuerdes de quién eras.'],['nar','El video da la vuelta al país.']];}],
   ['🙄 Ignorarlo',()=>{LH.pb(5);return[['chuy','Bien hecho. Los perros que ladran se cansan solos.']];}]]};
  if(k>=1)return{l:[['nar','Un mensaje a las 2 de la mañana...'],['kid','Carnal, perdóname por lo de la Coliseo. Fui un idiota. Extraño el patio de la escuela.']],who:'kid',q:'¿Qué le contestas a Beto?',o:[
   ['🤝 "Ya pasó, carnal. Aquí estoy."',()=>{REL('kid',2);return[['kid','Gracias... No sabes cuánto necesitaba oír eso.']];}],
   ['⏳ "Todavía me duele, Beto"',()=>{REL('kid',0);return[['kid','Lo entiendo. Aquí voy a estar.']];}]]};
  return{l:[['nar','En un programa de lucha entrevistan a Kid Alacrán.'],['kid','¿{n}? Sí, lo conozco. Era mi compañero de juegos. Ahora juega a ser luchador.']],who:'kid',q:'Te mencionó en la tele.',o:[
   ['💬 Mandarle un mensaje: "Te extraño, carnal"',()=>{REL('kid',2);return[['kid','(visto... y luego) Yo también, wey.']];}],
   ['😤 Retarlo en redes',()=>{REL('kid',-2);LH.f(10);return[['kid','(responde) Cuando quieras, perdedor. Te espero arriba.']];}]]};},
 kid_campeon:()=>{const k=RR('kid'),ex=P.reps&&P.reps.length>1?REPS[P.reps[P.reps.length-2]]:null;
  if(k>=2)return{l:[['nar','Kid Alacrán gana el Campeonato Mundial en Los Ángeles.'],['kid','Gané, carnal... pero se siente vacío. Quiero defenderlo contra ti, en el estadio. Limpio, como en el patio.']],who:'kid',q:'Beto te ofrece la lucha de sus vidas.',o:[['🤙 "Limpio, como en el patio"',()=>{REL('kid',1);LH.f(10);return[['kid','Te veo en el estadio. Y lleva a tu abuelo... si puede.']];}],['🏆 "Ese cinturón va a ser mío"',()=>{LH.pf(2);return[['kid','Así me gusta.']];}]]};
  const L=[['nar','Kid Alacrán gana el Campeonato Mundial... con un silletazo que el réferi "no vio".'],['kid','(con el cinturón) ¡{n}! Te espero en el estadio. Y dile a tu mamá que ya no me mande tuppers, jaja.']];
  if(ex&&k<=-2)L.push(['nar','Además, contrató a tu exrepresentante, '+ex.n+', para que le cuente todos tus secretos.']);if(k<=-3&&P.ab==='dead')L.push(['kid','Lástima que tu abuelito ya no te va a ver perder. Bueno... a lo mejor sí, desde arriba.']);
  return{l:L,who:'kid',q:'El campeón te reta frente a todos.',o:[['📝 Aceptar: Máscara contra Máscara en el estadio',()=>{LH.f(15);return[['chucho','¡Ya es oficial! ¡La lucha del siglo!']];}],['🤝 "Beto, todavía podemos luchar limpio"',()=>{REL('kid',1);return[['kid','¿Limpio? Ya se me olvidó cómo es eso, {n}.']];}],['👊 Subirte al ring y empujarlo',()=>{REL('kid',-1);LH.pf(2);LH.f(8);return[['nar','¡Se arma la campal! Los de seguridad tienen que separarlos.']];}]]};},
 texas_fiesta:()=>({l:[['nar','Fiesta en Houston después del show: botellas, música a todo volumen y una influencer que quiere grabar contigo.'],['fan','¡Oye, {n}! ¡Un video para mis cuatro millones de seguidores!']],who:'fan',q:'La fiesta apenas empieza.',o:[
  ['🍾 Quedarte hasta el amanecer',()=>{drinkUp(1);LH.hp(-12);LH.f(8);const L=[['nar','Amaneces en la alberca del hotel con un sombrero que no es tuyo. -12 de vida.']];if(P.love==='vane'&&chance(.6)){P.love='over';L.push(['vane','(mensaje) Vi las fotos, {n}. No me busques.']);}return L;}],
  ['📹 Grabar un video y retirarte',()=>{LH.f(12);if(P.love==='vane'){REL('mama',0);return[['vane','(videollamada) ¿Y esa güera quién es? ...Ok, está bien, te creo.']];}return[['nar','El video llega a un millón de vistas antes del desayuno.']];}],
  ['🛏️ Regresarte al hotel',()=>{LH.pb(6);return P.love==='vane'?[['vane','(videollamada) Te ves cansado... ¡pero orgulloso!']]:[['nar','Duermes 9 horas. +6 de defensa inicial.']];}]]}),
 llamada_mama:()=>({l:[['nar','Una noche en el hotel, ves en tu celular la foto de tu mamá. Hace meses que no hablan.']],who:'mama',q:'¿La llamas?',o:[
  ['📞 Llamarla y pedirle perdón',()=>{REL('mama',3);if(abAlive())REL('abuelo',2);if(P.bad)P.bad=2;return[['mama','(después de un silencio largo) ...¿Ya comiste, mijo?'],['yo','No, mamá.'],['mama','Ay, este niño. Te voy a mandar tamales por paquetería.']];}],
  ['📴 Apagar el teléfono',()=>{REL('mama',-1);return[['nar','La foto se apaga junto con la pantalla.']];}]]}),
 vane_acapulco:()=>({l:[['vane','Vámonos a Acapulco este fin. Nada de lucha, solo tú y yo.'],['chuy','Si te vas, pierdes una semana de entrenamiento. Tú sabrás.']],who:'vane',q:'Vanessa ya compró los boletos de autobús.',o:[
  ['🏖️ Irte con ella',()=>{LH.hp(15);LH.mx(-2);return[['vane','¡Eres el mejor!'],['nar','Regresas bronceado y feliz... y un poco fuera de forma.']];}],
  ['🏋️ "Mi amor, tengo que entrenar"',()=>{if(chance(.5)){P.love='over';return[['vane','Siempre es la lucha, {n}. Siempre.'],['nar','Vanessa no vuelve a contestar.']];}LH.mx(3);return[['vane','Ok... pero me debes un viaje.'],['nar','Entrenas toda la semana: +3 de vida máxima.']];}],
  ['💍 Proponerle que se vaya a vivir contigo',()=>{P.love='pareja';REL('mama',-1);return[['vane','¿En serio? ¡Sí!'],['mama','¿¡Que QUÉ!? ¿Y a mí cuándo me la presentas?']];}]]}),
 intervencion:()=>{P.interv=1;return{l:[['nar','Llegas al gimnasio con lentes oscuros. Te esperan Don Chuy, tu mamá'+(abAlive()?' y tu abuelo':'')+'.'],['chuy','{n}, hueles a cantina desde la entrada. Tres veces este mes llegaste crudo.'],['mama','No te estoy pidiendo que dejes la lucha. Te estoy pidiendo que no te pierdas.']],who:'chuy',q:'Todos te miran en silencio.',o:[
  ['🙏 "Tienen razón. Ya no voy a tomar."',()=>{P.drink=0;P.sober=1;REL('mama',2);if(abAlive())REL('abuelo',2);LH.mx(6);return[['chuy','Así se habla. El mejor rival es el que te ve en el espejo.'],['nar','Te sientes más fuerte que nunca: +6 de vida máxima.']];}],
  ['🥃 "Yo lo controlo"',()=>{REL('mama',-2);if(abAlive())REL('abuelo',-2);LH.mx(-6);return[['chuy','Así empiezan todos los que terminan en el olvido, {n}.'],['nar','-6 de vida máxima.']];}]]};},
 papel_firma:()=>({l:[['rep','Fírmame aquí, campeón. Es un papelito para cobrar tus bolsas más rápido.'],['nar','El papel está casi en blanco. Hasta abajo dice, con letra chiquita: "Poder amplio y general".']],who:'rep',q:'{r} te ofrece su pluma dorada.',o:[
  ['✍️ Firmar sin leer',()=>{P.signed=1;REL('rep',1);return[['rep','¡Eso! Tú nomás preocúpate por luchar.']];}],
  ['🔍 Pedirle a tu mamá que lo lea',()=>{P.scamDone=1;const old=REPS[P.rep];P.rep='rigo';P.repSince=P.ch;(P.reps=P.reps||[]).push('rigo');REL('mama',2);return[['mama','Mijo... esto es un poder para que maneje TODO tu dinero.'],['nar','Corres a '+old.n+' de tu vida. Tu compadre Rigo se ofrece a ayudarte mientras tanto.'],['rigo','No sé nada de contratos, compadre, pero yo nunca te voy a robar.']];}],
  ['🙅 "Mejor otro día"',()=>{REL('rep',-1);return[['rep','(se le borra la sonrisa) Claro, claro... otro día.']];}]]}),
 vispera:()=>{const L=[['nar','La noche antes de la gran final. El cuarto de hotel está en silencio.']];
  if(P.ab==='dead')L.push(['nar','Pones la vieja máscara de El Gavilán sobre la cama. Casi puedes oír su voz: "Vuela, mijo".']);else if(RR('abuelo')>=0)L.push(['abuelo','(por teléfono) Mañana voy a estar en primera fila, mijo. Con mi máscara del 74.']);else L.push(['nar','Tu abuelo no te ha llamado. Sabes que está viendo las noticias.']);
  if(RR('mama')>=1)L.push(['mama','Ya tengo la manta. Y no, no te voy a decir qué foto le puse.']);else if(P.bad===3)L.push(['nar','Tu celular no tiene mensajes de casa. Hace mucho que no los tiene.']);
  if(P.love==='vane'||P.love==='pareja')L.push(['vane','Pase lo que pase mañana, yo ya gané contigo.']);
  if(repOf())L.push(['rep',(REPL[P.rep]||REPL.lic).win[0]]);L.push(['chuy','Duerme, {n}. Mañana vas a volar como nunca.']);
  return{l:L,who:'yo',q:'¿Cómo pasas la última noche?',o:[['🧘 Meditar en silencio',()=>{LH.pb(8);return'Respiras hondo. Empiezas la final con 8 de defensa.';}],['📼 Ver videos de Alacrán para estudiarlo',()=>{P.flags.estudio=1;return'Descubres sus mañas. Kid Alacrán empezará con menos vida.';}],['📞 Llamar a tu familia',()=>{REL('mama',1);if(abAlive())REL('abuelo',1);LH.aff(2);return'Hablan hasta la medianoche. Empiezas con +2 de afición.';}]]};},
 kid_cara:()=>{const k=RR('kid');
  if(k>=2)return{l:[['nar','Firma del contrato, frente a la prensa. Beto se quita los lentes y te mira a los ojos.'],['kid','Mañana es nuestro sueño, carnal. El de los dos niños del patio.'],['kid','Que gane el mejor... y que sea limpio.']],who:'kid',q:'Te extiende el meñique, como cuando tenían diez años.',o:[['🤙 Juramento del meñique',()=>{REL('kid',1);return[['kid','Hasta el estadio.'],['yo','Hasta el estadio.']];}],['🤝 Darle un abrazo',()=>{REL('kid',1);LH.aff(2);return[['chucho','¡Los dos rivales se abrazan! ¡Esto es lucha libre, señores!']];}]]};
  const L=[['nar','Firma del contrato, frente a la prensa. Kid Alacrán llega tarde, masticando chicle.'],['kid','Mañana te voy a quitar la máscara, {n}. Y luego me voy a quedar con tu público, tu dinero y tu lugar.']];
  if(k<=-2){L.push(['kid','Le pagué al réferi, por cierto. Bueno, es broma... ¿o no?']);if(P.ab==='dead')L.push(['kid','Y tranquilo: tu abuelito no va a ver cómo te humillo. Ah, no, espérate...']);else if(P.bad)L.push(['kid','Hasta tu mamá me pidió autógrafo. Dice que yo sí la quiero.']);L.push(['chuy','(sujetándote) ¡Déjalo, {n}! Eso es justo lo que quiere.']);}
  return{l:L,who:'kid',q:'Kid Alacrán te avienta el contrato a la cara.',o:[['😤 Contenerte',()=>{LH.pb(8);return'Guardas la rabia para el ring: empiezas con 8 de defensa.';}],['👊 Voltearle la mesa',()=>{REL('kid',-1);LH.pf(3);LH.f(15);return[['chucho','¡CAMPAL EN LA FIRMA DE CONTRATO!']];}],['💬 "Beto... ¿qué te pasó?"',()=>{REL('kid',2);return[['kid','(silencio largo) ...No me digas Beto.'],['nar','Pero por un segundo, viste al niño del patio en sus ojos.']];}]]};},
 // ---- fiestas ----
 cantina:()=>({l:[['nar','Los luchadores te invitan a la cantina "El Último Round" después de la función.']],who:'yo',q:'Ya pidieron la primera ronda.',o:[['🍺 Unas cuantas nada más',()=>{drinkUp(.5);LH.hp(-4);LH.f(3);return'Cantas "El Rey" desafinado con tres rudos. -4 de vida.';}],['🥃 Hasta que cierren',()=>{drinkUp(1);LH.hp(-12);LH.f(5);return'Te cierran la cantina... contigo adentro. -12 de vida.';}],['🥤 Pedir un refresco y platicar',()=>{LH.pb(3);return[['chuy','(al día siguiente) Me dijeron que pediste refresco. Así me gusta.']];}]]}),
 antro:()=>({l:[['nar','Te invitan a la zona VIP de un antro. En la mesa de al lado, alguien te reconoce.'],['fan','¿Tú eres {n}? ¡Mi papá es tu fan número uno!']],who:'fan',q:'Te ofrecen la mesa más grande.',o:[['💃 Bailar toda la noche',()=>{LH.f(6);LH.hp(-6);if(P.love==='vane'&&chance(.4)){P.love='over';return[['nar','Alguien sube una foto tuya bailando con una desconocida.'],['vane','Qué bonito bailas, {n}. Ojalá te diviertas. Adiós.']];}return'Sales en todas las historias de Instagram. -6 de vida.';}],['🍾 Pedir botella para la mesa ($20)',()=>{LH.g(-20);drinkUp(1);LH.f(10);LH.hp(-10);return'Eres el rey de la noche... y el de la cruda. -10 de vida.';},()=>P.gold>=20],['📸 Tomarte fotos con todos y retirarte',()=>{LH.f(8);return'Te vas temprano con 50 fotos y cero cruda.';}]]}),
 ex_msg:()=>({l:[['nar','1:13 a.m. Te llega un mensaje de tu ex: "¿Sigues despierto?"']],who:'yo',q:'El celular vibra otra vez.',o:[['💬 Contestar',()=>{if(P.love==='vane'||P.love==='pareja'){P.love='over';REL('mama',-1);return[['nar','Vanessa ve el mensaje en tu pantalla. Esa misma noche hace sus maletas.']];}LH.hp(-6);return'Platican hasta las 4. Llegas desvelado: -6 de vida.';}],['📵 Bloquear y dormir',()=>{LH.pb(4);return'Duermes tranquilo. +4 de defensa inicial.';}]]}),
 palenque:()=>({l:[['nar','Te llevan a un palenque de feria. Hay apuestas, banda y mucho ruido.']],who:'yo',q:'Un señor te ofrece apostar.',o:[['🎲 Apostar $20',()=>{if(chance(.45)){LH.g(25);return'¡Ganaste! +$25. El señor se va murmurando.';}LH.g(-20);return'Perdiste los $20. La casa siempre gana.';},()=>P.gold>=20],['🎶 Solo disfrutar la banda',()=>{LH.f(4);LH.hp(4);return'Te piden foto en el escenario. La banda te dedica un corrido improvisado.';}],['🚶 Irte',()=>'Te vas antes de que empiece lo bueno. O lo malo.']]}),
 vane_cita:()=>({l:[['vane','Hoy es nuestro aniversario de un mes. Reservé en un restaurante bonito.']],who:'vane',q:'Pero mañana tienes entrenamiento temprano.',o:[['🌹 Ir a la cena ($15)',()=>{LH.g(-15);LH.hp(10);return[['vane','Gracias por estar aquí, {n}.']];},()=>P.gold>=15],['🌮 Proponer tacos de la esquina',()=>{LH.hp(6);return[['vane','(se ríe) Eres imposible. Pero sí, vamos.']];}],['🏋️ Cancelar por el entrenamiento',()=>{LH.mx(2);if(chance(.4)){P.love='over';return[['vane','Ya entendí cuál es tu prioridad.']];}return[['vane','Ok... la próxima.']];}]]}),
 // ---- visitas familiares ----
 comida_dom:()=>({l:[['mama','¡Siéntate, mijo! Hice mole, arroz y agua de jamaica.']].concat(abAlive()&&P.ab!=='sick'?[['abuelo','Pásame las tortillas, campeón.']]:[]),who:'mama',q:'Tu mamá te sirve el tercer plato.',o:[['🍽️ Comer hasta reventar',()=>{LH.hp(20);REL('mama',1);return'Sales rodando, pero feliz.';}],['💬 Contarles tus planes',()=>{REL('mama',1);if(abAlive())REL('abuelo',1);LH.aff(2);return'Te escuchan como si fueras el presidente. +2 de afición en tu próxima lucha.';}]]}),
 abuelo_llaves:()=>P.ab==='ok'||P.ab==='healed'?({l:[['abuelo','Siéntate, mijo. Te voy a enseñar la "Tapatía" como me la enseñaron a mí en el 72.']],who:'abuelo',q:'Tu abuelo se acomoda en el sillón con mucho cuidado.',o:[['🙏 Escucharlo con atención',()=>{const n=LH.up(1);REL('abuelo',1);return'Mejoraste '+n+'. Tu abuelo sonríe orgulloso.';}],['😴 "Ya me la sé, abuelo"',()=>{REL('abuelo',-1);return'Se queda callado y prende la tele.';}]]}):null,
 tumba:()=>P.ab==='dead'?({l:[['nar','Visitas la tumba de tu abuelo. Alguien le dejó una veladora y una máscara de juguete.'],['nar','Le cuentas tu última lucha, como si te estuviera escuchando.']],who:'yo',q:'El viento mueve las flores.',o:[['🕯️ Prender otra veladora',()=>{LH.aff(3);return'Sientes que alguien te echa porras. +3 de afición en tu próxima lucha.';}],['🎭 Dejarle tu máscara de la última lucha',()=>{LH.f(10);LH.pb(5);return'Te vas con el corazón más ligero.';}]]}):null,
 hermano_entrena:()=>({l:[['hermano','¡{n}! Ya me salió la patada voladora. ¡Mírame!']],who:'hermano',q:'Toño casi tumba la tele.',o:[['🤼 Entrenar con él en el patio',()=>{LH.f(5);LH.hp(-4);REL('mama',RR('mama')>=0?0:1);return'Te tumba una vez. Te haces el lastimado para que se sienta grande.';}],['📚 Ayudarle con la tarea',()=>{REL('mama',2);return[['mama','Ay, mijo, gracias. Yo ya no entiendo esas matemáticas.']];}]]}),
 mama_cumple:()=>({l:[['nar','Es el cumpleaños de tu mamá.']],who:'mama',q:'Te espera con pastel de tres leches.',o:[['🎁 Regalarle algo bonito ($20)',()=>{LH.g(-20);REL('mama',2);return[['mama','¡Ay, no te hubieras molestado! (sí quería)']];},()=>P.gold>=20],['🎶 Llevarle mariachi con tus compañeros',()=>{REL('mama',2);LH.f(6);return[['mama','(llorando) ¡Mis luchadores cantando "Las Mañanitas"!']];}],['📱 Mandarle un mensaje',()=>{REL('mama',-1);return[['mama','Gracias, mijo. (con un emoji que no sabes interpretar)']];}]]})
};
const FAMC=['hermano','papa','deuda','boda','mama_retiro'];
function pickUnused(list){const u=P.used||[];const l=list.filter(x=>!u.includes(x)&&(!SE[x]||true));return l.length?pick(l):null;}
function storyId(ch,slot){const fam=()=>pickUnused(FAMC)||'comida_dom';const scamNow=P.rep===P.scam&&!P.signed&&!P.scamDone;
 if(ch===0)return slot==='A'?pick(['abuelo_mascara','abuelo_mascara','mama_no_quiere','primer_entreno']):pick(['kid_juramento','noche_antes','primera_bolsa']);
 if(ch===1)return slot==='A'?'kermes_fiesta':fam();
 if(ch===2)return slot==='A'?'kid_traicion':'abuelo_enfermo';
 if(ch===3)return slot==='A'?'prensa_familia':(scamNow?'papel_firma':(P.love==='vane'&&chance(.6))?'vane_acapulco':pick(['kid_tv',fam()]));
 if(ch===4)return slot==='A'?(P.ab==='sick'?'abuelo_final':P.bad===1?'familia_prensa':'kid_tv'):'lesion_rodilla';
 if(ch===5)return slot==='A'?'kid_campeon':(RR('mama')<=-1||P.bad===1||P.bad===3)?'llamada_mama':scamNow?'papel_firma':'texas_fiesta';
 return slot==='A'?'vispera':'kid_cara';}
function partyEv(cb){const base=['cantina','antro','palenque','ex_msg'];const id=pickUnused(base)||'cantina';runStory(id,cb);}
function familyEv(cb){const base=['comida_dom','hermano_entrena','mama_cumple'].concat(FAMC);if(P.ab==='dead')base.push('tumba','tumba');else if(P.ab!=='sick')base.push('abuelo_llaves','abuelo_llaves');let id=pickUnused(base)||'comida_dom';if(!SE[id]()&&id!=='comida_dom')id='comida_dom';P.used=(P.used||[]).filter(x=>x!==id||FAMC.includes(x));runStory(id,cb);}

// ---------- memoria del abuelo ----------
function memorial(cb){const good=RR('abuelo')>=1&&P.bad!==1&&P.bad!==3;const k=RR('kid');
 showPanel('<div class="mem"><div class="cd">🕯️</div><h1>En memoria de<br>Ramón "El Gavilán"</h1><div class="yr">1948 – 2026</div><p>'+fmt(good?'Tu abuelo se fue en paz, mientras dormía.\n\nLa enfermera te cuenta que la última noche vio tu lucha en la tele y le dijo: "Ese es mi nieto. Yo le enseñé a volar."\n\nEn su buró encontraron la máscara de 1974... y un recorte de periódico con tu foto.':'Tu abuelo se fue sin que pudieran hablar.\n\nEn su buró encontraron recortes de periódico de todas tus luchas, guardados con cuidado. Incluso los de la semana en que hablaste mal de tu familia.\n\nEn una servilleta, con letra temblorosa, escribió: "Díganle a '+rnm()+' que lo perdono. Y que vuele."')+'</p></div>');
 try{musicStop();[262,247,220,196].forEach((f,i)=>tone(f,.9,'triangle',.03*MV(),i*.7));}catch(e){}
 addBtn('🕯️ Dedicarle el resto de tu camino','gold',()=>{REL('mama',1);const L=[['mama','Él siempre supo que ibas a llegar, mijo.']];if(k>=0)L.push(['kid','Carnal... lo siento mucho. Tu abuelo me enseñó a amarrarme las botas.']),REL('kid',1);else if(k<=-2)L.push(['nar','Kid Alacrán publica en redes: "Qué pena lo del abuelito de {n}. Ojalá no le afecte para la lucha... jaja."']),REL('kid',-1);L.push(['chuy','Cada vez que subas al ring, él va a estar en tu esquina.']);L.push(['sys','📣 +3 de afición en cada Máscara contra Máscara, en su honor.']);talk(L,cb);});}
const _runStory=runStory;runStory=function(id,cb){if(id==='abuelo_final'){(P.used=P.used||[]).push(id);const e=SE.abuelo_final();return talk(e.l,()=>e.memorial?memorial(cb):cb());}return _runStory(id,cb);};

// ---------- representantes ----------
function scamScene(cb){const r=REPS[P.rep];const lost=Math.round(P.gold*.7)+10;P.gold=Math.max(0,P.gold-lost);P.scamDone=1;P.scammed=P.rep;REL('mama',0);
 talk([['nar','Llegas a la oficina de '+r.n+' para cobrar tu última bolsa... y está vacía. Solo quedó un calendario de 2019.'],['nar','Se llevó tus ahorros: $'+lost+'. Su teléfono "ya no existe".'],['chuy','Te lo dije, {n}. En este negocio hay más lobos que luchadores.'],RR('mama')>=0?['mama','Ay, mijo... ven a la casa. Aquí nunca te va a faltar un plato.']:['nar','Pensaste en llamar a tu mamá. No lo hiciste.'],['sys','💸 -$'+lost+' · Necesitas nuevo representante.']],()=>{P.rep=null;cb();});}
function repOffer(cb){const ch=P.ch,cur=P.rep;let cands=Object.keys(REPS).filter(k=>k!==cur&&REPS[k].min<=ch&&k!==P.scammed&&!(P.reps||[]).includes(k)||(k==='lic'&&k!==cur&&!P.rep&&k!==P.scammed));cands=shuffle(cands).slice(0,cur?2:3);
 if(!cands.length)return cb();const c=repOf();
 showPanel('<h1>🤝 Ofertas de representantes</h1><p>'+(c?'Tu representante actual: <b>'+c.e+' '+c.n+'</b>\n'+c.d:'Ahora mismo nadie te representa.')+'\n\nEsta temporada te buscaron:</p>');
 if(c)addBtn('✅ Quedarme con '+c.n,'gold',()=>{REL('rep',1);talk([['rep',pick(['¡Sabía que podías confiar en mí!','Juntos hasta el final, {n}.','No te vas a arrepentir.'])]],cb);});
 cands.forEach(k=>{const R_=REPS[k];addBtn(R_.e+' '+R_.n,'blu',()=>{const L=[];if(c)L.push(['rep',(REPL[P.rep]||REPL.lic).bye]);P.rep=k;P.repSince=ch;P.signed=0;(P.reps=P.reps||[]).push(k);P.rel.rep=0;L.push([k,REPL[k].hi]);talk(L,cb);},R_.d);});}

// ---------- capítulos ----------
const CHINTRO=[
 ()=>pick([[['chuy','Primera parada: el patio de Doña Lupe. Si quieres salir de aquí, tienes que quitarle la máscara al dueño de la plaza.'],['lupe','Aquí manda El Panzón, mijo. Lleva diez años sin perder... porque nadie más se anima.']],[['nar','El patio de Doña Lupe huele a ropa recién lavada y a carnitas del domingo.'],['lupe','¿Tú eres el nuevo? Aquí el rey es El Panzón. Dicen que una vez aplastó a un luchador... y a la silla de atrás.'],['kid','Tranquilo, carnal. Es puro panza.']],[['chuy','Escúchame bien: en el patio no hay réferi de verdad, no hay lona nueva y no hay piedad.'],['chuy','Y hay un Panzón que no ha perdido nunca. Si le quitas la máscara, la colonia entera va a saber tu nombre.']],[['nar','La primera vez que pisas la lona del patio, se te hunde el pie en un hoyo.'],['lupe','¡Ay, ese hoyo! Ahí se cayó el compadre Toño en el 2015. Píselo con cuidado.'],['nar','A lo lejos, El Panzón se come un taco de suadero y te mira de arriba a abajo.']]]),
 ()=>[['nar','Capítulo 2. La feria del pueblo.'],['rep','Te conseguí la kermés, {n}. Ahí el que manda es El Charro de Oro.'],RR('kid')>=1?['kid','¡Carnal! Aquí de niños nos colábamos por debajo de la carpa, ¿te acuerdas?']:['kid','Ya llegó el de la máscara de su abuelito.']],
 ()=>[['nar','Capítulo 3. Tu primera arena de verdad.'],['chuy','Aquí ya hay gradas, réferi con licencia y un Emperador que se cree dueño del barrio.'],abAlive()?['abuelo','Mijo, ya te vienen a ver mis amigos del dominó. No me hagas quedar mal.']:['nar','...']],
 ()=>[['nar','Capítulo 4. La legendaria Arena Coliseo.'],['rep','Primera estelar, {n}. Hay prensa, hay patrocinadores... y hay un Carnicero que no perdona.'],RR('kid')<=-2?['kid','(en el pasillo) Bienvenido a mi casa, perdedor.']:RR('kid')>=1?['kid','(en el pasillo) Esta arena es dura, carnal. Cuídate.']:['nar','Kid Alacrán pasa a tu lado sin saludar.']],
 ()=>[['nar','Capítulo 5. Televisión nacional.'],['chucho','¡Señoras y señores, en vivo para todo el país, la Arena Nacional!'],['chuy','El Dr. Siniestro estudia a sus rivales como ratas de laboratorio. No le des patrones.']],
 ()=>[['nar','Capítulo 6. Cruzas el puente internacional con una maleta llena de máscaras.'],['rep','Houston, Dallas, San Antonio... y El Inmortal, que nunca ha perdido su máscara.'],RR('mama')>=0?['mama','Llévate un suéter, que allá el aire acondicionado está bien fuerte.']:['nar','Nadie de tu casa te despidió en la central.']],
 ()=>[['nar','Capítulo final. El Estadio Mundial. Sesenta mil boletos agotados en 4 minutos.'],RR('kid')>=2?['kid','Lo logramos, carnal. Los dos niños del patio, en el estadio.']:['kid','Bienvenido a tu funeral, {n}.'],['chuy','Todo lo que entrenaste, todo lo que perdiste... es para mañana.']]];
const CHEND=[
 ()=>[['chucho','¡{n} le quita la máscara al Panzón de la Vecindad! ¡El patio de Doña Lupe se viene abajo!'],['lupe','¡Ese muchacho va a llegar lejos! ¡Y me debe la lona!'],abAlive()?['abuelo','(con los ojos rojos) Como en el 74, mijo. Pero tú sí ganaste.']:['nar','...'],['chuy','Primera máscara. Guárdala. Nunca se olvida la primera.']],
 ()=>[['chucho','¡El Charro de Oro pierde la máscara frente a su pueblo!'],['nar','Los niños de la feria te persiguen hasta la combi.'],RR('kid')>=1?['kid','¡Esa, carnal! ¡Vamos por la arena del barrio!']:['kid','Suerte de principiante...'],['rep',(REPL[P.rep]||REPL.lic).win[1]]],
 ()=>[['chucho','¡CAYÓ EL EMPERADOR! ¡El barrio tiene nuevo rey!'],RR('mama')>=1?['mama','¡Mijo! ¡Ya te vieron hasta mis comadres de Iztapalapa!']:['nar','Tu mamá no vino esta vez.'],['chuy','Ahora sí, {n}. Te invitaron a la Coliseo. Ahí se separan los luchadores de los aficionados.']],
 ()=>[['chucho','¡EL CARNICERO DE LA MERCED SE QUEDA SIN MÁSCARA!'],['nar','Un promotor de la tele te espera en el vestidor con un contrato.'],['rep','¡Televisión nacional, {n}! ¡Vamos a la Arena Nacional!'],RR('kid')<=-2?['kid','(en redes) Ganarle a un carnicero... ¿qué sigue, un panadero?']:['nar','Kid Alacrán te manda un pulgar arriba. Solo eso.']],
 ()=>[['chucho','¡EL DR. SINIESTRO, DESENMASCARADO EN VIVO PARA TODO EL PAÍS!'],P.ab==='dead'?['nar','Levantas la vista. Por un segundo, juras ver a tu abuelo en la tercera fila.']:abAlive()&&RR('abuelo')>=0?['abuelo','(en la tele de su casa) ¡Ese es mi nieto! ¡YO LE ENSEÑÉ!']:['nar','En algún lugar, tu abuelo apaga la tele en silencio.'],['rep','Me hablaron de Texas, {n}. Te quieren del otro lado.']],
 ()=>[['chucho','¡CAYÓ EL INMORTAL! ¡LA LEYENDA TIENE DUEÑO!'],['nar','Los paisanos invaden el ring con banderas. Alguien te pone un sombrero texano.'],RR('kid')>=2?['kid','Te veo en el estadio, carnal. Como lo juramos.']:['kid','(en redes) Disfrútalo. En el estadio te espero yo.'],['chuy','Solo falta uno, {n}. El más difícil.']],
 ()=>[]];
function startChapter(){const ch=P.ch;try{const cp=Object.assign({},P);delete cp.chSnap;delete cp.fSnap;P.chSnap=JSON.stringify(cp);P.fSnap=null;}catch(e){}P.road=genRoad(ch);P.row=0;P.hp=P.max;if(ch===0&&P.flags.proLater){const r=P.road;[r[0],r[1]]=[r[1],r[0]];}const st=[];
 if(ch>=1&&P.rep&&P.rep===P.scam&&!P.scamDone&&(P.repSince||0)<ch&&(P.signed||chance(.35)))st.push(cb=>scamScene(cb));
 if(ch>=3&&(P.drink||0)>=3&&!P.interv)st.push(cb=>runStory('intervencion',cb));
 if(ch>=1)st.push(cb=>repOffer(cb));
 st.push(cb=>talk(CHINTRO[ch](),cb));seq(st,showMap);}
function chapterEnd(){const ch=P.ch;const vt=vaneTick();talk(CHEND[ch]().filter(x=>x&&x[1]!=='...').concat(vt||[]).concat((()=>{const ap=apodoCheck();return ap?[['chucho','¡Señoras y señores, desde hoy la afición lo bautizó: «'+ap+'»!']]:[];})()),()=>{addXP(40);if(ch>=6)return endRun(true);P.ch++;META.maxCh=Math.max(META.maxCh||0,P.ch);saveMeta();P.act=[0,0,0,1,1,2,2][P.ch];if(P.ch>=5&&P.l==='M')unlock('mini');P.hp=P.max;P.map=P.map||{};upgCards(1,()=>promoUp(P.ch,startChapter));});}
function upgCards(n,cb){const ok=c=>!c.up&&CARDS[c.id]&&CARDS[c.id].up;if(n<=0||!P.deck.some(ok))return cb();if(!META.hints||!META.hints.upg){META.hints=META.hints||{};META.hints.upg=1;saveMeta();flashMsg('⬆️ Ganar ya no da cartas nuevas: mejora una de las tuyas. Las cartas mejoradas (+) pegan o cubren más.');}sfx.win&&sfx.win();
 pickCard('⬆️ Mejora una carta ('+n+' restante'+(n>1?'s':'')+')<br><span class="small">Don Chuy te enseña a perfeccionar tus llaves. Elige cuál mejorar.</span>',ok,c=>{c.up=true;float&&0;saveRun();upgCards(n-1,cb);},()=>cb());
 const b=document.querySelector('#pn .btns button:last-child,#pn button:last-child');if(b&&/Volver/.test(b.textContent))b.textContent='Saltar';}
function genRoad(ch){const r=genRoad0(ch);if(P.mode)return r;
 if(ch===0){r[1]={t:'fight',beto:1,stip:'relevos'};r.splice(2,0,{t:'story',id:'lic_contrata'});}
 if(ch===1){r.splice(2,0,{t:'story',id:'beto_segundo'});r.splice(4,0,{t:'story',id:'beto_casa'});r.splice(6,0,{t:'story',id:'lic_coche'});}
 if(ch===2){r[0]={t:'story',id:'traicion_previa'};r.splice(1,0,{t:'fight',beto:2,stip:'relevos'},{t:'story',id:'kid_traicion'});}
 if(ch===3)r.splice(3,0,{t:'story',id:'beto_3am'});
 if(ch===4)r.splice(3,0,{t:'story',id:'beto_patio'});
 if(ch===6)r[0]={t:'story',id:'lic_revela'};
 return r;}
function genRoad0(ch){const opts=shuffle(['train','shop','party','family','life']).slice(0,3);if(P.love==='vane'||P.love==='pareja')opts[0]='vane';if(META.nemesis&&!P.nemDone&&ch>=1&&chance(.4))opts[2]='nemesis';else if(SEASON.en&&!P.tempDone&&ch>=1&&chance(.25))opts[2]='temporada';
 return[{t:'story',slot:'A'},{t:ch>=3&&chance(.5)?'elite':'fight',stip:ch>=1&&chance(.4)?pick(Object.keys(STIPS)):null},{t:'fork',o:opts},{t:'story',slot:'B'},{t:'boss'}];}
const FORKS={vane:['♥','Ver a Vanessa','Si no le das tiempo, se cansa'],train:['🏋️','Entrenar con Don Chuy','Descansar, ganar vida máxima o cambiar cartas'],shop:['🛒','Tianguis de la lucha','Compra cartas y objetos'],party:['🍻','Salir de fiesta','Diversión... con consecuencias'],family:['🏠','Visitar a la familia','Comida, consejos y broncas de casa'],life:['📰','Salir a la calle','Cualquier cosa puede pasar'],nemesis:['😡','Revancha','Tu némesis te espera'],temporada:['🎉','Lucha de temporada','Máscara exclusiva del evento']};
function stepInfo(s,i){const v=VEN[P.ch];if(s.t==='story')return['❓',i<P.row?'Capítulo de tu historia':'Algo va a pasar...','Diálogo y decisiones'];if((s.t==='fight'||s.t==='elite')&&s.stip)return[STIPS[s.stip].e,STIPS[s.stip].n+(s.t==='elite'?' (estelar)':''),STIPS[s.stip].d];if(s.t==='fight')return['🤼','Lucha en el cartel','Rival de '+v.n];if(s.t==='elite')return['💀','Lucha estelar','Un rival peligroso'];
 if(s.t==='fork')return['🔀','Tiempo libre','Tú eliges: '+s.o.map(k=>FORKS[k][0]).join(' ')];return['🎭','Máscara contra Máscara','vs '+EN[chBoss()].n];}
function showRoad(){C=null;if(P.ch===undefined){P.ch=[0,3,5][Math.min(P.act,2)];P.road=null;}if(!P.rel||P.rel.abuelo===undefined)P.rel=Object.assign({kid:0,mama:1,abuelo:1,rep:0},P.rel||{});if(!P.ab)P.ab='ok';if(P.rep===undefined){P.rep='lic';P.reps=['lic'];P.scam=pick(['billetes','billetes','vale','johnny']);}
 if(!P.road){P.road=genRoad(P.ch);P.row=0;}saveRun();render();setTimeout(()=>hint('road','📍 Avanza paso a paso. Al final te espera el dueño de esta arena 🎭.'),300);
 const ch=P.ch,v=VEN[ch],cur=P.road[P.row];if(!cur){P.row=P.road.length-1;return showRoad();}
 let h='<div class="chap">CAPÍTULO '+(ch+1)+' DE 7 · '+DIFS[DIF()].e+' '+DIFS[DIF()].n+'</div>'+(P.apodo?'<div class="chap" style="color:#ffd23f">«'+P.apodo+'»</div>':'')+'<h1>'+v.e+' '+CHT[ch]+'</h1>'+ladderHTML(ch)+relHTML()+'<p class="small" style="text-align:center">❤ '+P.hp+'/'+P.max+' · $'+P.gold+' · ⭐'+P.fama+(P.inj&&P.inj.length?' · 🤕'+P.inj.length:'')+'</p><div class="road">';
 P.road.forEach((s,i)=>{const[ic,n,sub]=stepInfo(s,i);h+='<div class="rs '+(i<P.row?'done':i===P.row?'cur':'lock')+'"><span class="ri">'+(i<P.row?'✅':ic)+'</span><div><b>'+n+'</b><small>'+sub+'</small></div></div>';});
 h+='</div>';showPanel(h);
 if(cur.t==='fork'){cur.o.forEach(k=>{const F=FORKS[k];addBtn(F[0]+' '+F[1],'gold',()=>doFork(k),k==='nemesis'&&META.nemesis?META.nemesis.n+' quiere revancha':F[2]);});}
 else{const[ic,n]=stepInfo(cur,P.row);addBtn('▶ '+(cur.t==='story'?'Continuar la historia':n),'gold',()=>doStep(cur));}
 addBtn('📱 Celular','alt',celularView);addBtn('📜 Mi mazo ('+P.deck.length+')','alt',()=>deckView(showMap));addBtn('🎭 Mis máscaras','alt',()=>vitrinaView(showMap));addBtn('🏠 Salir al menú (se guarda)','alt',()=>{saveRun();menu();});if(P.chSnap&&P.row>0)addBtn('🔁 Reiniciar capítulo','alt',()=>{showPanel('<h1>¿Reiniciar el capítulo '+(P.ch+1)+'?</h1><p>Vuelves al inicio del capítulo con lo que tenías al llegar. Se pierde lo que hayas ganado en este capítulo.</p>');addBtn('Sí, reiniciar','gold',chRestart);addBtn('No','alt',showMap);});addBtn('🏳️ Rendirse','alt',()=>{showPanel('<h1>¿Rendirte?</h1><p>Terminas la historia y cobras la fama que llevas.\n\n<span class="small">💾 Tu historia se guarda sola. Puedes cerrar el juego y seguir después.</span></p>');addBtn('Sí, rendirme','',()=>endRun(false));addBtn('No','alt',showMap);});}
function doStep(s){const a=ACTS[P.act];P._lt=s.t;
 if(s.t==='story'){if(P.flags.proLater){const L_=P.flags.proLater;P.flags.proLater=0;return talk(L_,()=>whyChoice(next));}if(!s.id)s.id=storyId(P.ch,s.slot);return runStory(s.id,next);}
 if(s.t==='fight'){const k=s.beto===1?'gemelos':s.beto===2?'gemelos2':pick(a.pool);return(s.beto||(P.qs&&P.ch===0&&P.row===0)?(f=>f()):preLife)(()=>startCombat(k,'lucha',{stip:s.stip,beto:s.beto}));}
 if(s.t==='elite')return preLife(()=>entrance(()=>startCombat(a.elite,'elite',{stip:s.stip})));
 if(s.t==='boss'){const bk=chBoss();return vsIntro(bk,()=>{const B=EN[bk];showPanel('<h1>🎭 MÁSCARA CONTRA MÁSCARA</h1><p>'+B.n+' te espera en el centro del ring.\nSi pierdes, te quitan la máscara frente a todos.'+(B.note?'\n\n⚠ '+B.note:'')+'</p>');addBtn('¡A la lucha!','gold',()=>entrance(()=>startCombat(bk,'boss')));});}}
function doFork(k){P._lt=k;if(k==='vane')return vaneVisit(next);if(k==='train')return gym();if(k==='shop')return shop();if(k==='party')return partyEv(next);if(k==='family')return familyEv(next);if(k==='life')return lifeEv('map',next);if(k==='nemesis'){P.nemDone=1;return enterNode('nemesis');}if(k==='temporada'){P.tempDone=1;return enterNode('temporada');}}

// ---------- diálogos al terminar cada parte ----------
function partLines(type){const k=RR('kid'),m=RR('mama'),a=RR('abuelo'),C_=[];const add=(w,l)=>C_.push([w,pick(l)]);
 if(type==='win'){add('chuy',['¡Así se hace, {n}! Pero esa guardia baja me va a sacar canas.','Bien. Mañana a las 6, a correr al parque.','Esa llave te salió chueca... pero funcionó.','¿Viste cómo te aplaudió la gente? Eso no se compra.','No te emociones. El de la máscara siempre es más duro.','Te faltó aire en la segunda caída. A correr más.']);
  if(m>=0)add('mama',['¡Te vi en el celular de tu tía! ¡Cuídate la espalda!','¿Ya comiste? Te guardé tamales.','Tus tías ya te hicieron porra en el grupo de la familia.','Mijo, ese golpe se oyó hasta acá. ¿Estás bien?']);else add('nar',['Tu mamá no te llamó esta vez.','En el grupo de la familia nadie comentó tu lucha.']);
  if(P.ab==='ok'||P.ab==='healed'){if(a>=0)add('abuelo',['¡Así volaba yo en el 74! Bueno... casi.','Mijo, ese tope estuvo de película.','Vi tu lucha con mis amigos del dominó. Les presumí toda la tarde.']);else add('nar',['Tu abuelo vio la lucha. No dijo nada.']);}
  if(P.ab==='sick')add('abuelo',['(desde el hospital) Las enfermeras ya saben tu nombre, mijo.','(desde el hospital) Me subiste la presión... de gusto.']);
  if(P.ab==='dead')add('nar',['Levantas la mirada al cielo, como siempre que ganas.','Tocas la vieja máscara de El Gavilán antes de salir del ring.']);
  if(k>=1)add('kid',['¡Esa, carnal! Como en el patio de la escuela.','Te eché porras desde la tele. No le digas a nadie.']);else if(k<=-2)add('kid',['(en redes) Suerte de principiante. Ya ni la gracia.','Le ganaste a un costal de papas. Felicidades, campeón de vecindad.','Disfruta mientras puedas, {n}.','(en redes) Mi abuelita pega más fuerte. Y eso que ya se murió.']);else add('nar',['Kid Alacrán le dio "me gusta" a tu foto... y lo quitó a los dos minutos.']);
  if(repOf())C_.push(['rep',pick((REPL[P.rep]||REPL.lic).win)]);
  if(P.love==='vane'||P.love==='pareja')add('vane',['¡Te vi! Grité tan fuerte que me corrieron de la fila.','¿Me dedicaste el saludo del final? Dime que sí.']);
  add('fan',['¡{n}! ¿Me firmas la frente?','¡Mi hijo se llama como tú, campeón!','Te traje unas naranjas para la energía.']);
  if((P.drink||0)>=2&&!P.sober)add('chuy',['Hueles a cantina, {n}. No creas que no me doy cuenta.']);
  return shuffle(C_).slice(0,2);}
 if(type==='train')return[['chuy',pick(['Otra vez, {n}. Hasta que la llave te salga dormido.','El sudor de hoy es la máscara de mañana.','Mi rodilla ya no da para enseñarte el tope. Imagínatelo.','Así me gusta. Disciplina.'])]];
 if(type==='shop')return[['fan',pick(['¡Llévelo, llévelo, que es original de la Coliseo!','¿No quiere una máscara de su rival? Para pisarla, digo.'])]];
 return[];}
function partEnd(type,cb){const L=partLines(type);if(!L.length)return cb();talk(L,cb);}

// ---------- finales ----------
const ENDS2={familia:'🤝 Familia del ring',hermanos:'🦂 Hermanos de lona',abuelo:'🕯️ Por el abuelo',rivalidad:'😈 La rivalidad continúa',solo:'🐺 Campeón solitario',botella:'🍾 La gloria y la botella',mama:'👩 Orgullo de mamá',amor:'💃 Campeón enamorado',pueblo:'🏆 Campeón del pueblo'};
function endKey(){const fam=RR('mama')+(P.ab!=='dead'?RR('abuelo'):0);
 if((P.drink||0)>=3&&!P.sober)return'botella';if(RR('kid')>=2&&fam>=3)return'familia';if(RR('kid')>=2)return'hermanos';if(P.bad===3||fam<=-4)return'solo';
 if(P.ab==='dead'&&RR('abuelo')>=1)return'abuelo';if(RR('kid')<=-2)return'rivalidad';if(RR('mama')>=3)return'mama';if(P.love==='pareja'||P.love==='vane')return'amor';return'pueblo';}
function endW(){const k=endKey(),kid=RR('kid');const L=[['chucho','¡SE ACABÓ! ¡{n} LE GANA LA MÁSCARA A KID VENENO! ¡{n} ES CAMPEÓN MUNDIAL!']];
 if(kid>=2)L.push(['kid','(sin máscara, sonriendo) Siempre fue tuya, carnal... desde el patio de la escuela.'],['kid','Hasta el estadio, como lo juramos.']);
 else if(kid<=-2)L.push(['nar','Beto, sin máscara, escupe en la lona y se va sin darte la mano. Los abucheos lo siguen hasta el vestidor.'],['kid','Esto no se acaba, {n}. Nunca se va a acabar.']);
 else L.push(['kid','(sin máscara, mirando al suelo) Felicidades, {n}. Te lo ganaste... carnal.']);
 if(P.ab==='dead')L.push(['nar','Levantas la vieja máscara de El Gavilán hacia el cielo. Sesenta mil personas guardan silencio un segundo... y luego gritan su nombre.']);
 else if(RR('abuelo')>=0)L.push(['abuelo','(en primera fila, con su máscara del 74) ¡ESE ES MI NIETO! ¡YO LE ENSEÑÉ A VOLAR!']);else L.push(['nar','Tu abuelo no vino. Dicen los vecinos que, frente a la tele, se le salieron las lágrimas.']);
 if(P.bad===3||RR('mama')<=-2)L.push(['nar','Tu mamá apagó la tele antes del final. Ganaste el mundo... pero tu casa sigue en silencio.']);else if(RR('mama')>=1)L.push(['mama','¡Ese es mi hijo! (Sí, llevé la manta. Y sí, es tu foto de bebé.)']);else L.push(['mama','Ya vente a cenar, campeón. Te hice mole.']);
 if(P.scammed)L.push(['nar','En una cárcel de Texas, '+REPS[P.scammed].n+' ve tu victoria en la tele. Nadie le cree que fue tu representante.']);
 if(repOf())L.push(['rep',pick(['¡Campeón del mundo! ¡Ya no te cobro comisión este mes!','Te lo dije desde el primer día, {n}.','Ahora sí: gira mundial.'])]);
 if(P.love==='vane'||P.love==='pareja')L.push(['vane','Te dije que bailabas mejor de lo que luchabas. Me equivoqué.']);
 if(k==='botella')L.push(['nar','Esa noche celebras como siempre: hasta perder la cuenta. A la mañana siguiente, el cinturón está tirado en el piso del baño.']);
 L.push(['chuy','Ya me puedo retirar tranquilo. Bueno... mañana a las 6 en el gimnasio, campeón.']);
 META.endings=META.endings||[];if(!META.endings.includes(k))META.endings.push(k);saveMeta();const tot=Object.keys(ENDS2).length;
 L.push(['nar','Final desbloqueado: '+ENDS2[k]+'\n\n'+META.endings.filter(x=>ENDS2[x]).length+'/'+tot+' finales descubiertos.']);return L;}
function endL(){const L=[['chuy','Levántate, {n}. Los grandes también pierden.']];if(P.ab==='dead')L.push(['nar','Miras la máscara de tu abuelo. Él también perdió una vez. Y nunca dejó de soñar.']);else if(RR('abuelo')>=0)L.push(['abuelo','Mijo, yo perdí mi única lucha y aquí sigo. Lo importante es que volaste.']);
 if(RR('kid')<=-2)L.push(['nar','Kid Alacrán sube una foto de tu derrota con tres emojis de risa.']);else if(RR('kid')>=1)L.push(['kid','Arriba, carnal. Esto no termina así.']);L.push(['chuy','Mañana a las 6 en el gimnasio. Empezamos otra vez, más fuertes.']);return L;}

// ================= Prólogo variado =================
const LSTORYX={
 T:['Tu abuelo te enseñó a amarrarte las botas antes que las agujetas de los zapatos. "Primero el ring, luego la escuela", decía, y tu mamá le aventaba la chancla.','Cuando tenías ocho años te perdiste en la Arena Coliseo. Te encontraron dormido en el vestidor de los técnicos, abrazado a una máscara que no era tuya.'],
 R:['En la secundaria te suspendieron tres veces: una por pelear, otra por pelear... y la tercera por vender las respuestas del examen. Siempre has sido de los que buscan el atajo.','Tu papá se fue cuando eras niño. Lo único que dejó fue una playera de El Perro Aguayo. Desde entonces, a los rudos los entiendes mejor que a la gente.'],
 G:['A los catorce años ya medías 1.90 y no cabías en el pupitre. Los maestros te sentaban atrás, los bravucones te dejaban en paz y las señoras del mercado te pedían que les cargaras el garrafón.','En la colonia te dicen "El Ropero". No te molesta. Lo que te molesta es que nadie te haya preguntado nunca qué quieres ser.'],
 V:['Aprendiste a dar maromas antes que a caminar bien. Tu abuela te llevaba a las prácticas del circo y tú te escapabas a ver las luchas del domingo en la plaza.','Una vez te caíste del trapecio y te rompiste la muñeca. Mientras te enyesaban, juraste que la próxima vez que volaras sería sobre un ring.'],
 X:['De niño te ponías los vestidos de tu tía para imitar a los exóticos de la tele. Tu abuelo era el único que aplaudía. Tu mamá apagaba la tele.','En la prepa te hacían burla por cómo caminabas. Un día le contestaste a un bravucón con una huracarrana en la cancha. Ese día nació tu personaje.'],
 M:['Te dijeron que nunca serías luchador porque eras "muy chiquito". Desde entonces cuelgas un letrero en tu cuarto: "Los grandes también caen".','En la primaria te escondías en los lockers para que no te molestaran. Ahí aprendiste lo más importante de la lucha: a escapar de cualquier llave.']};
const PRO_OPEN=[
 'Son las 5 de la mañana en la colonia. Los gallos de Doña Lupe todavía no cantan, pero tú ya estás despierto mirando el techo.',
 'La tele de tu abuelo sigue siendo de las de bulbos. Esa noche pasan una lucha de los 80 y no puedes despegar los ojos.',
 'Llueve en la colonia. Corres por el mercado con el mandado y, en la pared de la carnicería, ves un cartel despintado: "SE BUSCAN LUCHADORES. INFORMES CON DON CHUY".',
 'Hoy cumples diecinueve años. Tu mamá te da un pastel de tres leches y, envuelto en periódico, un par de botas de lucha usadas.',
 'Hoy te corrieron del trabajo en la fábrica. Llevas la caja con tus cosas bajo el brazo y, sin saber por qué, tus pies te llevan al gimnasio de la esquina.',
 'En el camión rumbo a la prepa, un señor de bigote lee una revista de lucha. En la portada, una máscara que conoces desde niño.',
 'Es el velorio de tu tío Chencho, el único de la familia que siempre creyó en ti. Entre los tamales y el café de olla encuentras su libreta: "Mi sobrino va a ser luchador".',
 'La señora de la tienda te fía unas papas y te dice: "Ya ponte a hacer algo de tu vida, mijo". Tiene razón. Y sabes exactamente qué.',
 'Domingo en la plaza. Unos luchadores de pueblo montan un ring con tablas y mecates. Cuando gritan "¿alguien del público se anima?", tu mano se levanta sola.',
 'Tu mamá encuentra debajo de tu cama una caja con 47 máscaras hechas a mano, una por cada año que llevas soñando lo mismo.'];
const PRO_FAM=[
 [['nar','Tu mamá vende gelatinas afuera de la primaria desde hace quince años. Con eso pagó tu escuela, tus tenis y tus sueños.'],['mama','Mijo, si vas a hacer esa locura, por lo menos desayuna.']],
 [['nar','Tu mamá es enfermera del turno de noche. Ha cosido más heridas de luchadores de las que te imaginas.'],['mama','Ya vi cómo terminan, {n}. Con la espalda chueca y sin un peso.']],
 [['nar','Tu mamá tiene una fonda de comida corrida. Los luchadores de la Arena del barrio comen ahí cada viernes.'],['mama','Esos señores comen como pelones de hospicio. ¿Eso quieres ser? ...Bueno, te sirvo doble.']],
 [['nar','Tu mamá cose vestidos de XV años. Esta semana, en lugar de un vestido, la encontraste cosiendo una capa con lentejuelas.'],['mama','No me veas así. Si vas a subir a un ring, que por lo menos te veas decente.']],
 [['nar','Tu mamá limpia casas en las Lomas. Llega a la casa a las diez de la noche, con los pies hinchados y una sonrisa para ti.'],['mama','Tú haz lo que te haga feliz, {n}. Yo me encargo de lo demás.']]];
const PRO_ABU=[
 [['abuelo','Yo te llevé a tu primera lucha a los cinco años, {n}. Te dormiste en la tercera caída.']],
 [['nar','Tu abuelo Ramón juega dominó todas las tardes y le presume a todos que una vez luchó en la Coliseo. Nadie le cree.'],['abuelo','¡Es en serio! Me decían El Gavilán. ¡Pregúntenle a cualquiera de mi época!']],
 [['abuelo','Mira, {n}: la lucha no se trata de pegar. Se trata de levantarte cuando todos creen que ya no puedes.']],
 [['nar','Tu abuelo ya casi no ve, pero no se pierde una función por la radio. Dice que los golpes "se oyen" mejor.'],['abuelo','Ese tope sonó a madera vieja, mijo. Ese es de los buenos.']],
 [['abuelo','Cuando yo era chamaco, la lucha la veíamos por la ventana del vecino. Tú vas a salir en esa ventana, {n}. Me lo prometes.']]];
const PRO_BETO=[
 [['nar','En la primaria, tú y Beto se hacían máscaras de cartón y luchaban en el patio de la escuela, sobre colchones viejos.']],
 [['nar','A los diez años, tú y Beto se colaron a la Arena Coliseo por la puerta de los vendedores de cacahuates. Los cacharon en la segunda caída.'],['nar','Mientras el guardia los sacaba de la oreja, Beto gritaba: "¡Un día vamos a entrar por la puerta grande!".']],
 [['nar','En cuarto de primaria, unos de sexto te querían quitar tu torta. Beto se metió a defenderte y perdió un diente.'],['nar','Desde ese día, cuando sonríe, se le ve el hueco. Él dice que es "su cicatriz de campeón".']],
 [['nar','Tú y Beto vendían chicles en el metro para comprar la revista de lucha de cada semana. Se turnaban para leerla con una lámpara debajo de la cobija.']],
 [['nar','La noche del temblor, tú y Beto durmieron en la calle con sus familias. Para no tener miedo, se inventaron sus nombres de luchador.'],['nar','Él escogió "Alacrán". Tú todavía no sabías cuál sería el tuyo.']],
 [['nar','Tú y Beto grababan sus luchas con el celular de la mamá de él. Tienen más de doscientos videos. En todos, Beto hace trampa.']]];
const PRO_KID=[
 [['kid','¡{n}! Por fin te animaste, carnal. Ya hasta tengo máscara nueva, ¿cómo ves? Tú y yo, como lo juramos: hasta el estadio.'],['yo','Tú y yo, Beto. Hasta el estadio.']],
 [['nar','Beto te espera afuera de tu casa, sentado en la banqueta con dos máscaras en la mano.'],['kid','Una es para ti, carnal. Ya me cansé de esperarte. Hoy empezamos.'],['yo','¿Y si no somos buenos, Beto?'],['kid','Pues nos hacemos buenos. Como siempre.']],
 [['kid','(por mensaje) ¿Ya viste el cartel de Don Chuy? Si no vas tú, voy a ir a sacarte de las greñas. Como en la primaria.'],['yo','Ya voy, ya voy.']],
 [['nar','Beto llega corriendo al mercado, sin aire, con un papel arrugado en la mano.'],['kid','¡Carnal! ¡Don Chuy nos va a probar a los dos! ¡Mañana a las seis!'],['yo','¿A las seis de la mañana?'],['kid','Los campeones no duermen, {n}.']]];
const PRO_CHUY=[
 [['nar','El gimnasio de Don Chuy huele a sudor, a lona vieja y a pomada de árnica.'],['chuy','¿Así que tú eres {n}? Beto no deja de hablar de ti. Aquí nadie empieza arriba.']],
 [['chuy','Cien sentadillas. Si terminas sin vomitar, te quedas. Si vomitas... también te quedas, pero limpias.']],
 [['nar','Don Chuy fue luchador en los setenta. Dicen que le rompió la nariz a tres campeones y que él nunca se dejó romper la suya.'],['chuy','Tu abuelo y yo luchamos en la misma función en el 74. Él perdió. Yo también. Esa noche nos hicimos compadres.']],
 [['nar','Don Chuy te vio en el mercado cuando le quitaste la cartera a un ratero... y se la devolviste a la señora con una reverencia.'],['chuy','Tienes reflejos y tienes teatro. Eso no se enseña. Lo demás, sí.']],
 [['chuy','No me importa qué tan fuerte pegues. Me importa cuántas veces te levantas. Vamos a ver de qué estás hecho, {n}.']]];
const PRO_LIC=[
 [['lic','Soy el Licenciado Barrera, promotor. Te pago 50 pesos y un refresco. Si me llenas el patio, hablamos.'],['kid','¿50 pesos? ¡Somos millonarios, carnal! Yo pongo los tacos.']],
 [['lic','Licenciado Barrera, mucho gusto. Licenciado en Derecho... bueno, me faltaron tres materias. Te consigo funciones, tú pones el espectáculo.'],['kid','¿Y cuánto nos va a pagar?'],['lic','Lo justo. O sea, poquito.']],
 [['nar','El Licenciado Barrera llega en un Tsuru con una calcomanía de "Promociones Barrera: la lucha con clase".'],['lic','Tengo una función el sábado en un patio. Pago en efectivo y, si ganas, te invito unas quesadillas.']]];
const PRO_WHY=[
 ['chuy','Antes de empezar, dime una cosa, {n}: ¿por qué quieres ser luchador?'],
 ['chuy','Todos los que entran por esa puerta quieren algo. ¿Tú qué buscas, {n}?'],
 ['abuelo','Mijo... antes de que te subas a ese ring, dime por qué lo haces.']];
function prologueParts(l){const LS=LSTORY[l];const intro=pick([LS.intro].concat(LSTORYX[l]||[]));const ip=intro.split('\n\n');
 return{a:[['nar',pick(PRO_OPEN)],['nar',ip[0]]].concat(pick(PRO_ABU)),b:ip.slice(1).map(x=>['nar',x]).concat(pick(PRO_FAM),pick(PRO_BETO),[['nar','Juraron con el meñique que un día llegarían juntos a la Arena Nacional... y después a un estadio lleno.']],pick(PRO_KID),pick(PRO_CHUY),[['lupe','Y yo soy Doña Lupe. El patio es mío, la lona es mía y las sillas son prestadas. Si rompen algo, lo pagan.']])};}
function prologue(l){const LS=LSTORY[l];const intro=pick([LS.intro].concat(LSTORYX[l]||[]));
 const L=[['nar',pick(PRO_OPEN)]].concat(intro.split('\n\n').map(x=>['nar',x]),pick(PRO_FAM),pick(PRO_ABU),pick(PRO_BETO),[['nar','Juraron con el meñique que un día llegarían juntos a la Arena Nacional... y después a un estadio lleno.']],pick(PRO_KID),pick(PRO_CHUY),[['lupe','Y yo soy Doña Lupe. El patio es mío, la lona es mía y las sillas son prestadas. Si rompen algo, lo pagan.']]);
 return L;}
function whyChoice(cb){const q=pick(PRO_WHY);talk([q],()=>choice(q[0],'¿Por qué quieres ser luchador?',[
 ['👩 "Por mi familia"',()=>{REL('mama',1);REL('abuelo',1);return[[q[0],q[0]==='abuelo'?'Esa es la mejor razón que hay, mijo.':'Buena respuesta. La familia aguanta cuando todo lo demás se cae.']];}],
 ['🏆 "Por la gloria"',()=>{LH.f(6);LH.pf(1);return[[q[0],'La gloria es bonita, {n}... pero pesa. Ya verás.']];}],
 ['💵 "Para salir de aquí"',()=>{LH.g(15);return[[q[0],'Mucha gente entra a la lucha por hambre. Los que llegan lejos son los que no la pierden.']];}],
 ['🤙 "Por Beto y nuestro juramento"',()=>{REL('kid',1);return[['kid','¡Eso, carnal! ¡Hasta el estadio!'],[q[0],'Ojalá ese juramento les dure.']];}],
 ['🎭 "Porque es lo único que sé hacer"',()=>{LH.mx(4);return[[q[0],'Entonces vas a tener que hacerlo mejor que nadie.']];}]],cb));}

// ---------- más variedad en el primer capítulo ----------
Object.assign(SE,{
 mama_no_quiere:()=>({l:[['nar','Tu mamá encuentra una máscara en tu mochila mientras lava la ropa.'],['mama','¿Y esto, {n}? ¿Me vas a decir que es para una fiesta de disfraces?']],who:'mama',q:'Tu mamá te mira con la máscara en la mano.',o:[
  ['🗣️ Decirle la verdad',()=>{REL('mama',1);return[['mama','(suspira) Tu abuelo te metió esas ideas... Prométeme que te vas a cuidar.'],['yo','Te lo prometo, mamá.']];}],
  ['🤥 "Es de Beto, me la prestó"',()=>{REL('mama',-1);REL('kid',0);return[['mama','Ajá. Y yo soy Miss Universo.']];}],
  ['🎭 Ponértela y hacerle una pose',()=>{LH.f(3);REL('mama',RR('mama')>=1?0:1);return[['mama','(intenta no reírse) Ay, este niño... ¡Quítate eso y ven a comer!']];}]]}),
 primer_entreno:()=>({l:[['chuy','Primer día. Vas a correr con esta llanta amarrada a la cintura alrededor de la cuadra. Diez vueltas.'],['kid','(ya en la tercera vuelta) ¡Apúrate, carnal!']],who:'chuy',q:'La llanta pesa más que tu primo Toño.',o:[
  ['💪 Aguantar las diez vueltas',()=>{LH.mx(4);LH.hp(-6);return[['chuy','Nada mal. Mañana son quince.'],['nar','+4 de vida máxima. Te duele hasta el pelo.']];}],
  ['🧠 Pedirle que mejor te enseñe una llave',()=>{const n=LH.up(1);return[['chuy','Listo el chamaco. Va, pero mañana corres doble.'],['nar','Mejoraste '+n+'.']];}],
  ['😏 Cortar camino por el callejón',()=>{LH.pf(1);REL('kid',1);return[['chuy','(desde la esquina) ¡Te vi, {n}! ...Bueno, también se vale ser listo en el ring.'],['kid','¡Jajaja! Igualito que en la primaria.']];}]]}),
 noche_antes:()=>({l:[['nar','La noche antes de tu primera Máscara contra Máscara no puedes dormir.']].concat(pick([[['abuelo','(tocando tu puerta) ¿Tampoco puedes dormir, mijo? Yo tampoco dormí la noche antes de mi lucha.']],[['mama','(desde la cocina) ¿Quieres un tecito de manzanilla, mijo? Te escucho dando vueltas.']],[['kid','(por mensaje) ¿Despierto? Yo tampoco. Mañana es el primer paso, carnal.']]])),who:'yo',q:'Son las 2 de la mañana.',o:[
  ['☕ Platicar con quien está despierto',()=>{REL('mama',1);REL('abuelo',1);LH.aff(2);return'Te acuestas tranquilo. Empiezas con +2 de afición.';}],
  ['🏋️ Hacer lagartijas hasta cansarte',()=>{LH.mx(2);LH.hp(-4);return'Caes rendido a las 4. +2 de vida máxima.';}],
  ['📼 Ver videos del Panzón',()=>{LH.pb(5);return'Te sabes de memoria su Sentón. Empiezas con 5 de defensa.';}]]}),
 primera_bolsa:()=>({l:[['lic','Aquí está tu primera bolsa, {n}: cincuenta pesos y un refresco de manzana.'],['nar','Son los primeros cincuenta pesos que ganas con tu máscara.']],who:'yo',q:'¿Qué haces con tu primera bolsa?',o:[
  ['👩 Dársela a tu mamá',()=>{REL('mama',2);return[['mama','(guarda el billete en su monedero, doblado con mucho cuidado) Este no me lo gasto nunca.']];}],
  ['🌮 Invitarle unos tacos a Beto',()=>{REL('kid',2);LH.hp(5);return[['kid','¡Por los futuros campeones! ...Pásame la salsa.']];}],
  ['🖼️ Enmarcarla',()=>{LH.f(4);REL('abuelo',1);return[['abuelo','Así hice yo con mi primer boleto de la Coliseo. Todavía lo tengo.']];}]]})});

// ================= Animaciones variadas por carta / movimiento =================
const ANIMID={patada:'kick',patadita:'kick',giro:'spinkick',chop:'chop',bofetada:'chop',lazo:'lariat',corbata:'lariat',cabezazo:'head',rodilla:'knee',lanza:'spear',rebote:'spear',lanzar:'spear',suplex:'slam',aplastar:'slam',quebradora:'slam',canadiense:'slam',titan:'slam',bajo:'knee',golpe2:'combo',tirabuzon:'spin',tornillo:'spin',angel:'spin',hurra:'hurra',hurrainv:'hurra',paloma:'hurra',tope:'dive',gavilan:'dive',tormenta:'dive',plancha:'splash',escalera:'splash',luna:'moon',silla:'chair',mesa:'chair',cadena:'chain',manopla:'punch',polvo:'dust',saliva:'dust',piquete:'poke',jalon:'poke',jalonpelo:'poke',arranca:'poke',mordida:'bite',abrazo:'hug',rana:'hug',pulpo:'behind',tapatia:'behind',cristo:'behind',mexicana:'behind',escuadra:'hold',cerrojo:'hold',candado:'hold',brazo:'hold',ahorca:'behind',leyenda:'behind',contra:'counter',contragolpe:'counter',espejo:'counter',muralla:'wall',muro2:'wall',sagrada:'wall',esquiva:'dodge',fuera:'dodge',fantasma:'dodge',respiro:'dodge',guardia:'guard',bloqueo:'guard',resistir:'guard',campana:'guard',grito:'rage',talco:'rage',sacudir:'rage',distraer:'taunt',provoca:'taunt',saludo:'taunt',hype:'taunt',porra:'taunt',pueblo:'taunt',beso:'taunt',pose:'flex',agua:'heal',vendar:'heal',respira:'heal',renacer:'heal',cuenta2:'heal',caida2:'heal',apoyo:'heal'};
const ADUR={punch:16,chop:16,kick:20,spinkick:24,lariat:24,head:20,knee:20,spear:24,slam:42,combo:24,spin:36,hurra:34,dive:34,splash:40,moon:38,chair:26,chain:26,dust:22,poke:16,bite:22,hug:38,behind:40,hold:36,counter:24,wall:22,dodge:20,guard:18,rage:26,taunt:26,flex:24,heal:26,fin:46};
function hashS(s){let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))|0;return Math.abs(h);}
function animFor(d,id){if(d.t==='fin')return'fin';if(ANIMID[id])return ANIMID[id];
 if(d.air)return(d.hits||1)>1?'spin':['hurra','dive','moon'][hashS(id)%3];
 if(d.llave)return['hold','hug','behind'][hashS(id)%3];
 if(d.dirty&&d.dmg)return['chair','poke','bite'][hashS(id)%3];
 if(d.dmg)return(d.hits||1)>1?'combo':d.dmg>=14?'slam':['punch','chop','kick','lariat','head'][hashS(id)%5];
 if(d.contra||d.counter)return'counter';if(d.fuera)return'dodge';if(d.block)return d.block>=12?'wall':'guard';if(d.heal)return'heal';if(d.sf)return'rage';if(d.aff)return'taunt';return'flex';}
function animForE(mv){const n=mv.n||'';
 if(/Patada|Jaripeo|Espuel/i.test(n))return'kick';if(/Cabezazo|Embestida|Picotazo/i.test(n))return'head';if(/Sentón|Panzazo|Aplast|Antebrazo|Gancho|Martillo|Ciclón doble|Bomba/i.test(n))return'slam';
 if(/Abrazo|Reata|Enrosc|Amarr/i.test(n))return'hug';if(/Silla|Mesa/i.test(n))return'chair';if(/Escupitajo|Polvo|Picadura Final/i.test(n))return/Picadura Final/.test(n)?'hurra':'dust';
 if(/Mordida|Colmillo/i.test(n))return'bite';if(/Lanza|Tacle|Compinche/i.test(n))return'spear';if(/bajo|Piquete|Mano rápida|Carterista/i.test(n))return'poke';
 if(mv.combo)return['slam','hurra','spear'][hashS(n)%3];if((mv.hits||1)>1)return'combo';if(mv.dmg)return mv.dmg>=14?['slam','lariat','spear'][hashS(n)%3]:['punch','chop','kick','lariat','head','knee'][hashS(n)%6];
 if(mv.heal)return'heal';if(mv.block&&mv.sf)return'rage';if(mv.block)return mv.block>=12?'wall':'guard';if(mv.sf)return'rage';if(mv.ap)return'taunt';return'taunt';}
function setMv(who,sub){C.mv={who,type:sub,sub,t:0,dur:ADUR[sub]||20};const vp=VIBP[sub];if(vp)vib(who==='p'?vp.map((x,i)=>i%2?x:Math.round(x*.6)):vp);}
function spark(x,y,cols,n,spd){for(let i=0;i<(n||8);i++)PARTS.push({x,y,vx:R(-1.4,1.4)*(spd||1),vy:R(-1.6,.6)*(spd||1),l:R(10,20),c:pick(cols)});}
// devuelve la pose y desplazamiento del que ataca
function mvOff(who){const Z={dx:0,dy:0,pose:false,rot:0,flipT:false,prop:null};if(!C||!C.mv||C.mv.who!==who)return Z;const m=C.mv,p=Math.min(1,m.t/m.dur),dir=who==='p'?1:-1,s=Math.sin(Math.PI*p);let o=Object.assign({},Z);const sub=m.sub||m.type;
 const ex=who==='p'?148:20,me=who==='p'?20:148;const hitX=who==='p'?150:40,hitY=FY+24;const once=k=>{if(!m['_'+k]){m['_'+k]=1;return true;}return false;};
 switch(sub){
  case'punch':o.dx=s*24;o.pose=p>.25&&p<.75?'lariat':false;if(p>.45&&once('h'))spark(hitX,hitY,['#fff','#ffd23f'],6);break;
  case'chop':o.dx=s*18;o.pose=p<.45?'chop':'lariat';if(p>.5&&once('h'))spark(hitX,hitY-6,['#fff','#ff8a8a'],6);break;
  case'kick':o.dx=s*26;o.dy=-s*6;o.pose=p>.2&&p<.8?'kick':false;if(p>.5&&once('h'))spark(hitX,hitY+8,['#fff','#ffd23f'],7);break;
  case'spinkick':o.dx=s*26;o.dy=-s*8;o.flipT=p<.55&&Math.floor(m.t/3)%2===1;o.pose=p>.45&&p<.85?'kick':false;if(p>.6&&once('h'))spark(hitX,hitY-4,['#fff','#3bf'],8);break;
  case'lariat':o.dx=s*50;o.pose='lariat';if(p>.5&&once('h'))spark(hitX,hitY-8,['#fff','#ffd23f','#ff7a1a'],9,1.3);break;
  case'head':o.dx=s*26;o.dy=s*3;o.rot=s*.4*dir;if(p>.5&&once('h'))spark(hitX,hitY-14,['#ffd23f','#fff'],8);break;
  case'knee':o.dx=s*28;o.dy=-s*12;o.pose='kick';o.rot=-s*.2*dir;if(p>.5&&once('h'))spark(hitX,hitY,['#fff'],6);break;
  case'spear':o.dx=s*60;o.dy=s*10;o.rot=s*1.25*dir;if(p>.5&&once('h'))spark(hitX,hitY+6,['#fff','#ffd23f'],10,1.4);break;
  case'combo':o.dx=Math.abs(Math.sin(Math.PI*p*3))*20+8*s;o.pose=Math.floor(m.t/4)%2?'lariat':'chop';if(m.t%8===4)spark(hitX,hitY-4+R(-6,6),['#fff'],3);break;
  case'slam':if(p<.3)o.dx=p/.3*58;else if(p<.7){o.dx=58;o.dy=-Math.sin((p-.3)/.4*Math.PI)*24;o.pose='brazos';}else o.dx=(1-p)/.3*58;if(p>.68&&once('h')){spark(hitX,FY+60,['#d0cfe0','#fff','#ffd23f'],14,1.5);C.anim.stop=Math.max(C.anim.stop||0,4);}break;
  case'hurra':o.dx=s*66;o.dy=-s*32;o.rot=p*Math.PI*2*dir;if(p>.6&&once('h'))spark(hitX,hitY,['#ff2e88','#ffd23f','#fff'],10);break;
  case'dive':o.dx=(p<.55?p/.55:1-(p-.55)/.45)*72;o.dy=-Math.sin(Math.min(1,p/.55)*Math.PI)*10;o.rot=dir*Math.PI/2*Math.min(1,p<.55?p*2.4:(1-p)*2.2);if(p>.5&&once('h'))spark(hitX,hitY,['#fff','#3bf','#ffd23f'],12,1.4);break;
  case'splash':o.dx=s*64;o.dy=-s*40;o.rot=dir*Math.PI/2*Math.min(1,p*1.6);if(p>.75&&once('h')){spark(hitX,FY+56,['#fff','#ffd23f'],14,1.5);C.anim.stop=Math.max(C.anim.stop||0,4);}break;
  case'moon':o.dx=s*62;o.dy=-s*38;o.rot=-p*Math.PI*2*dir;if(p>.7&&once('h'))spark(hitX,FY+50,['#fff','#c0c0ff'],12);break;
  case'spin':o.dx=s*60;o.dy=-s*30;o.flipT=Math.floor(m.t/3)%2===1;o.rot=Math.sin(m.t/2)*.3;if(m.t%9===5)spark(hitX,hitY,['#fff','#ff2e88'],4);break;
  case'fin':o.dx=s*70;o.dy=-s*44;o.rot=p*Math.PI*2*dir;o.pose=p>.8?'brazos':false;if(p>.7&&once('h')){spark(hitX,hitY,['#ffd23f','#ff2e88','#fff','#3bf'],22,1.8);C.anim.stop=Math.max(C.anim.stop||0,6);}break;
  case'chair':o.dx=s*28;o.pose='brazos';o.prop={k:'chair',a:p};if(p>.5&&once('h')){spark(hitX,hitY-14,['#ccc','#fff','#ffd23f'],12,1.3);}break;
  case'chain':o.dx=s*26;o.pose='lariat';o.prop={k:'chain',a:p};if(p>.5&&once('h'))spark(hitX,hitY-6,['#bbb','#fff'],8);break;
  case'dust':o.dx=s*18;o.pose='senala';if(p>.4&&once('h'))spark(hitX-10*dir,hitY-16,who==='e'&&/Escupitajo/.test((C.e.cur||{}).n||'')?['#7dff8a','#2ecc71']:['#ddd','#bbb','#fff'],14,.8);break;
  case'poke':o.dx=s*20;o.pose='senala';if(p>.5&&once('h'))spark(hitX,hitY-16,['#fff'],4);break;
  case'bite':o.dx=s*32;o.rot=s*.3*dir;o.dy=s*2;if(p>.5&&once('h'))spark(hitX,hitY-10,['#ff4d4d','#fff'],6);break;
  case'hug':o.dx=Math.min(1,p/.25)*(p>.85?(1-p)/.15:1)*56;o.pose=p>.2&&p<.85?'hug':false;o.dy=p>.25&&p<.85?(m.t%4<2?-1:1):0;break;
  case'behind':o.dx=Math.min(1,p/.3)*(p>.85?(1-p)/.15:1)*84;o.pose=p>.25&&p<.85?'hug':false;o.dy=p>.3&&p<.85?(m.t%4<2?-1:0):0;break;
  case'hold':o.dx=(p<.25?p/.25:p>.8?(1-p)/.2:1)*62;o.dy=(p>.25&&p<.8)?(m.t%4<2?-1:1):0;o.pose=p>.25&&p<.8?'hug':false;break;
  case'counter':o.dx=p<.5?-Math.sin(p*2*Math.PI)*8:Math.sin((p-.5)*2*Math.PI)*22;o.pose=p<.5?'guard':'lariat';break;
  case'wall':o.dy=3;o.pose='guard';o.prop={k:'wall'};break;
  case'guard':o.dy=2;o.pose='guard';o.prop={k:'bar'};break;
  case'dodge':o.dx=-s*16;o.dy=-s*10;o.rot=-s*.25*dir;break;
  case'rage':o.pose='flex';o.dx=(m.t%4<2?1:-1);if(m.t%5===0)spark(me+16+R(-10,10),FY+30+R(-20,20),['#ff4d4d','#ff7a1a'],2,.6);break;
  case'taunt':o.pose=p<.5?'senala':'brazos';o.dy=-Math.abs(Math.sin(Math.PI*p*2))*5;break;
  case'heal':o.pose='flex';if(m.t%4===0)spark(me+16+R(-10,10),FY+40+R(-10,20),['#7dff8a','#c8ffcf'],2,.5);break;
  case'block':o.dy=2;o.pose='guard';o.prop={k:'bar'};break;
  case'air':o.dx=s*64;o.dy=-s*26;break;
  case'llave':o.dx=(p<.25?p/.25:p>.8?(1-p)/.2:1)*62;o.dy=(p>.25&&p<.8)?(m.t%4<2?-1:1):0;break;
  case'golpe':o.dx=s*20;o.pose=true;break;
  default:o.dy=-s*4;o.pose='flex';}
 o.dx*=dir;if(o.pose===false&&['punch','spear','dive','splash','moon','hurra','spin','head','bite','dodge'].indexOf(sub)<0)o.pose=sub==='flex'?'flex':false;return o;}
// reacción del que recibe
function mvReact(who){const Z={dx:0,dy:0,rot:0};if(!C||!C.mv||C.mv.who===who)return Z;const m=C.mv,p=Math.min(1,m.t/m.dur),away=who==='e'?1:-1;const sub=m.sub||m.type;const atk=['punch','chop','kick','spinkick','lariat','head','knee','spear','combo','chair','chain','poke','bite','golpe','counter'];
 if(atk.includes(sub)&&p>.45&&p<.8)return{dx:away*5*Math.sin((p-.45)/.35*Math.PI),dy:0,rot:sub==='lariat'||sub==='spear'?away*.5*Math.sin((p-.45)/.35*Math.PI):0};
 if(sub==='slam'&&p>.3&&p<.7){const q=Math.sin((p-.3)/.4*Math.PI);return{dx:-away*6*q,dy:-q*30,rot:away*Math.PI*q};}
 if((sub==='hurra'||sub==='fin')&&p>.55)return{dx:away*6,dy:0,rot:-away*(p-.55)/.45*Math.PI*2};
 if((sub==='splash'||sub==='dive'||sub==='moon')&&p>.6&&p<.95)return{dx:away*4,dy:4,rot:away*.6};
 if((sub==='hug'||sub==='hold'||sub==='behind'||sub==='llave')&&p>.25&&p<.85)return{dx:0,dy:(m.t%4<2?1:-1),rot:0};
 if(sub==='dust'&&p>.4)return{dx:away*2,dy:0,rot:Math.sin(m.t)*.08};
 return Z;}
function drawF(x,y,m,flip,skin,trunk,pose,lk,rot){if(rot){cx.save();cx.translate(Math.round(x)+16,Math.round(y)+40);cx.rotate(rot);big(cx,-16,-40,m,flip,skin,trunk,pose,lk);cx.restore();}else big(cx,x,y,m,flip,skin,trunk,pose,lk);}
function drawProp(o,x,y,flip){if(!o.prop)return;const dir=flip?-1:1;const hx=x+(flip?0:32);
 if(o.prop.k==='chair'){const a=(o.prop.a<.5?-1.2+o.prop.a*3:0.3)*dir;cx.save();cx.translate(hx,y+14);cx.rotate(a);cx.fillStyle='#8a8f99';cx.fillRect(-2,-22,16*dir,3);cx.fillRect(-2,-22,3,20);cx.fillRect(12*dir-1,-22,3,20);cx.fillStyle='#5a5f66';cx.fillRect(-2,-12,16*dir,2);cx.restore();}
 if(o.prop.k==='chain'){cx.fillStyle='#b0b0b0';const a=o.prop.a;for(let i=0;i<10;i++){const t=i/9;cx.fillRect(Math.round(hx+dir*t*30*Math.sin(Math.PI*a)),Math.round(y+16-Math.sin(t*Math.PI)*8),2,2);}}
 if(o.prop.k==='bar'){cx.fillStyle='rgba(142,197,255,.6)';cx.fillRect(x+(flip?-4:34),y+18,3,36);}
 if(o.prop.k==='wall'){cx.fillStyle='rgba(142,197,255,.45)';cx.fillRect(x+(flip?-8:34),y+8,6,52);cx.fillStyle='rgba(255,255,255,.5)';cx.fillRect(x+(flip?-6:36),y+10,1,48);}}
// ---- heridas visibles según la vida ----
function hurtOv(P_,h,sk,skD,A,B){if(!h||h<.3)return;const T=tk||0;
 P_(19,26,3,2,'#7a4a8a');P_(20,27,1,1,'#5a2a6a');if(T%40<20){P_(8,6,1,2,'#bfe6ff');}else P_(23,9,1,2,'#bfe6ff');
 if(h>=.5){P_(12,6,3,1,'#c0392b');P_(13,7,1,2,'#c0392b');P_(19,2,3,2,sk);P_(20,3,1,1,'#3a2a1a');P_(4,30,2,2,'#7a4a8a');P_(12,33,3,2,'#8a5a9a');P_(11,45,2,1,shade(sk,-50));}
 if(h>=.7){const dl=2+Math.floor((T%60)/15);P_(14,8,1,dl,'#b0182a');P_(17,1,5,4,sk);P_(18,2,2,1,'#3a2a1a');P_(17,8,4,4,'#4a2040');P_(18,9,2,2,'#2a1020');P_(23,24,2,3,'#7a4a8a');P_(9,36,4,1,'#c0392b');}
 if(h>=.85){P_(15,18,1,3,'#b0182a');P_(16,22,1,4,'#9a1020');P_(10,12,2,1,'#b0182a');P_(25,35,3,1,'#b0182a');}}

// ================= Íconos pixelados propios del juego =================
const PXC={K:'#1a1020',W:'#ffffff',Y:'#ffd23f',D:'#c98a00',R:'#e74c3c',r:'#a32020',B:'#3b6fb6',b:'#24477a',L:'#8ec5ff',G:'#9aa0aa',g:'#5f6570',S:'#e0a46a',s:'#b77a45',P:'#ff2e88',p:'#b0185e',O:'#ff8a1a',N:'#2ecc71',n:'#1a7a40',U:'#8e44ad',u:'#5a2a7a',M:'#8a5a32',m:'#4a2a1a',C:'#fff3c4',E:'#2a2a2a',V:'#7dff8a'};
const ICO={
plancha:['.................KKKKK..','.............KKKKKPPPP..','...KKKKKKKKKKSSSSKPWPW..','LLLKEESSSSBBBSsSsKPPPP..','...KEESSSSBBBSSSSKYYYY..','.LLKEESSSSBBBSSSSKKKKK..','...KKKKKKKBBBSSSSKKKKKSS','LLL.......KKKSSSSKSSSSSS','.............KKKKKKKKKKK','GK......................','RRWWWWWWWWWWWWWWWWWWWWWW','GK......................','GK......................','RRWWWWWWWWWWWWWWWWWWWWWW','GK......................','GK......................'],
alacran:['......KKK...','.....KRRRK..','.....KRKRK..','........KRK.','........KRK.','.K....KKRRK.','KRK.KKRRRK..','.KRKRRRRK...','..KRRRRK.K..','.KRK.KRKKRK.','KRK.KRK..K..','.K...K......'],
golpe:["..K.K.K.....",".KSKSKSK....",".KSKSKSK.K..",".KSKSKSKKSK.",".KSSSSSSKSK.",".KSSSSSSSSK.",".KsSSSSSSSK.",".KSSSSSSSK..","..KSSSSSK...","..KWWWWWK...","..KWgWgWK...","..KKKKKKK..."],
defensa:["............",".KKKKKKKKKK.",".KBBBBBBBBK.",".KBLBBYBBBK.",".KBBBYYYBBK.",".KBBYYYYYBK.",".KBBBYYYBBK.",".KBBYBBBYBK.","..KBBBBBBK..","...KBBBBK...","....KBBK....",".....KK....."],
aficion:["............","........KK..","......KKYK..",".KKK.KKYYK..",".KWKKYYYYK..",".KWKYYYYYKP.",".KWKYYYYYK.P",".KWKKYYYYKP.",".KKK.KKYYK..","..KK...KKYK.","..KK.....KK.","............"],
vida:["............","..KK....KK..",".KRRK..KRRK.","KRWRRKKRRRRK","KRWRRRRRRRRK","KRRRRRRRRRRK",".KRRRRRRRRK.","..KRRRRRRK..","...KRRRRK...","....KRRK....",".....KK.....","............"],
fama:[".....KK.....",".....KYK....","....KYYK....","KKKKKYYKKKKK","KYYYYWYYYYYK",".KYYYWYYYYK.","..KYYYYYYK..","..KYYYYYYK..",".KYYYKKYYYK.",".KYYK..KYYK.","KKKK....KKKK","............"],
mascara:["...KKKKKK...","..KBBYYBBK..",".KBBBYYBBBK.",".KYYYBBYYYK.","KBYWKBBKWYBK","KBYKKBBKKYBK","KBBYYBBYYBBK",".KBBBYYBBBK.",".KBBYRRYBBK.","..KBYRRYBK..","...KKKKKK...","............"],
energia:["......KKK...",".....KYYK...","....KYYK....","...KYYK.....","..KYYYYYYK..","..KKKKYYK...",".....KYK....","....KYK.....","...KYK......","..KYK.......","..KK........","............"],
furia:[".....K......","....KRK.....","....KRK..K..","...KROK.KRK.","..KROOKKROK.","..KROYOROK..",".KROYYYOROK.",".KROYWYYORK.",".KROYYYYORK.","..KROOOORK..","...KKKKKK...","............"],
sangre:[".....KK.....","....KRRK....","....KRRK....","...KRRRRK...","...KRWRRK...","..KRWRRRRK..","..KRRRRRRK..","..KRRRRrRK..","...KRRrRK...","....KKKK....","............","............"],
mareado:["............","..K.....K...",".KYK...KYK..","KYYYK.KYYYK.",".KYK...KYK..","..K..K..K...",".....KYK....","....KYYYK...",".....KYK....","......K.....","............","............"],
abierto:["....KKKK....","..KKRRRRKK..",".KRRWWWWRRK.",".KRWRRRRWRK.","KRWRWWWWRWRK","KRWRWRRWRWRK","KRWRWRRWRWRK","KRWRWWWWRWRK",".KRWRRRRWRK.",".KRRWWWWRRK.","..KKRRRRKK..","....KKKK...."],
debil:["............","...KKKKKK...","..KUUUUUUK..",".KUUWUUWUUK.",".KUUKUUKUUK.",".KUUUUUUUUK.",".KUUKKKKUUK.",".KUKUUUUKUK.","..KUUUUUUK..","...KKKKKK...","....K..K....","............"],
ojo:["............","............","...KKKKKK...","..KWWWWWWK..",".KWWKKKKWWK.","KWWKBBBBKWWK","KWWKBKKBKWWK",".KWWKKKKWWK.","..KWWWWWWK..","...KKKKKK...","............","............"],
cadena:["............",".KKKK.......","KGGGGK......","KGKKGK......","KGGKKKKK....",".KKKGGGGK...","....KGKKGK..","....KGGKKKKK",".....KKKGGGG","........KGKK","........KGGG",".........KKK"],
cuerdas:["K..........K","KK........KK","KRRRRRRRRRRK","KK........KK","KWWWWWWWWWWK","KK........KK","KBBBBBBBBBBK","KK........KK","KK........KK","KK........KK","KK........KK","KK........KK"],
tercera:["...KKKKK....","...KPPPK....","...KPWPK....","...KPPPK....","....KGK.....","....KGK.....","....KGK.....","....KGK.....","....KGK.....","...KKGKK....","..KGGGGGK...","..KKKKKKK..."],
moneda:["....KKKK....","..KKYYYYKK..",".KYYDDDDYYK.",".KYDYYYYDYK.","KYDYYKYYYDYK","KYDYKKKYYDYK","KYDYYKKYYDYK","KYDYKKKYYDYK",".KYDYKYYDYK.",".KYYDDDDYYK.","..KKYYYYKK..","....KKKK...."],
cinturon:["............","....KKKK....","KKKKYYYYKKKK","KmmKYWYYKmmK","KMMKYYRYKMMK","KmmKYYYYKmmK","KKKKYYYYKKKK","....KKKK....","............","............","............","............"],
sobre:["............","KKKKKKKKKKKK","KPPPPPPPPPPK","KPKKPPPPKKPK","KPPPKKKKPPPK","KPPPPYYPPPPK","KPPPYYYYPPPK","KPPPPYYPPPPK","KPPPPPPPPPPK","KPPPPPPPPPPK","KKKKKKKKKKKK","............"],
mazo:["............","...KKKKKKK..","..KKWWWWWK..",".KWKWRRRWK..",".KWKWRWRWK..",".KWKWRRRWK..",".KWKWWWWWK..",".KWKKKKKKK..",".KWWWWWK....",".KKKKKKK....","............","............"],
pincel:["..........KK",".........KYK","........KYK.",".......KDK..","......KDK...",".....KMK....","....KKMK....","...KPPK.....","..KPPPK.....",".KPPPK......","KPPKK.......","KKK........."],
pesas:["............","............","KK......KK..","KKK....KKK..","KKKKKKKKKKKK","KGKGGGGGGKGK","KKKKKKKKKKKK","KKK....KKK..","KK......KK..","............","............","............"],
mas:["............","............","KKKKKKKKKKKK","KWWWWWWWWWWK","KKKKKKKKKKKK","............","KKKKKKKKKKKK","KWWWWWWWWWWK","KKKKKKKKKKKK","............","KKKKKKKKKKKK","KWWWWWWWWWWK"],
engrane:["....KKKK....","..K.KGGK.K..",".KGKKGGKKGK.","..KGGGGGGK..","KKGGKKKKGGKK","KGGKK..KKGGK","KGGKK..KKGGK","KKGGKKKKGGKK","..KGGGGGGK..",".KGKKGGKKGK.","..K.KGGK.K..","....KKKK...."],
calendario:["..K....K....","KKKKKKKKKKKK","KRRRRRRRRRRK","KKKKKKKKKKKK","KWWWWWWWWWWK","KWKWKWKWKWWK","KWWWWWWWWWWK","KWKWKWKRRWWK","KWWWWWWRRWWK","KWKWKWKWKWWK","KWWWWWWWWWWK","KKKKKKKKKKKK"],
fantasma:["....KKKK....","..KKWWWWKK..",".KWWWWWWWWK.",".KWKKWWKKWK.","KWWKKWWKKWWK","KWWWWWWWWWWK","KWWWKKKKWWWK","KWWWWWWWWWWK","KWWWWWWWWWWK","KWKWWKKWWKWK","KK.KK..KK.KK","............"],
arena:["............","KKKKKKKKKKKK","KPKPKPKPKPKK","KKKKKKKKKKKK","KGGGGGGGGGGK","KGWGGWWGGWGK","KGWGGWWGGWGK","KGGGGGGGGGGK","KGGGKKKKGGGK","KGGGKmmKGGGK","KKKKKmmKKKKK","............"],
ring:["............","K..........K","KRRRRRRRRRRK","K..........K","KWWWWWWWWWWK","K..........K","KBBBBBBBBBBK","K..........K","KLLLLLLLLLLK","KLLLLLLLLLLK","KKKKKKKKKKKK","............"],
calavera:["...KKKKKK...","..KWWWWWWK..",".KWWWWWWWWK.","KWWWWWWWWWWK","KWKKKWWKKKWK","KWKKKWWKKKWK","KWWWWKKWWWWK",".KWWWWWWWWK.","..KWKWKWKWK.","..KWWWWWWWK.","...KKKKKKK..","............"],
cruce:["............",".......KKKK.",".......KYYK.","........KYK.",".KKK...KYKK.",".KYYKKKYK...",".KKYYYYK....","....KYYYKK..","...KYKKYYYK.","..KYK..KKKK.","..KKK.......","............"],
pregunta:["...KKKKK....","..KYYYYYK...",".KYYKKKYYK..",".KKK...KYK..",".......KYK..","......KYK...",".....KYK....",".....KYK....",".....KKK....",".....KYK....",".....KKK....","............"],
tienda:["............","KK..........","KYK.........",".KKKKKKKKKK.","..KYYYYYYYK.","..KYKYKYKYK.","..KYYYYYYYK.","...KYYYYYK..","...KKKKKKK..","...KK...KK..","...KK...KK..","............"],
tarro:["............","..KKKKKK....",".KWWWWWWK...",".KWCWCWWKKK.",".KYYYYYYKYK.",".KYWYYYYK.K.",".KYWYYYYK.K.",".KYWYYYYKYK.",".KYYYYYYKKK.",".KYYYYYYK...",".KKKKKKKK...","............"],
casa:[".....KK.....","....KRRK....","...KRRRRK...","..KRRRRRRK..",".KRRRRRRRRK.","KKKKKKKKKKKK",".KCCCCCCCCK.",".KCBBCCMMCK.",".KCBBCCMMCK.",".KCCCCCMMCK.",".KKKKKKKKKK.","............"],
periodico:["............","KKKKKKKKKK..","KWWWWWWWWKK.","KWKKKKKKWKWK","KWWWWWWWWKWK","KWKKWKKKWKWK","KWKKWWWWWKWK","KWKKWKKKWKWK","KWWWWWWWWKWK","KWKKKKKKWKKK","KWWWWWWWWK..","KKKKKKKKKK.."],
vela:[".....KK.....","....KOYK....","....KYOK....",".....KK.....","....KWWK....","....KWCK....","....KWWK....","....KWCK....","....KWWK....","...KKWWKK...","..KDDDDDDK..","..KKKKKKKK.."],
corazonv:["............","..KK....KK..",".KNNK..KNNK.","KNVNNKKNNNNK","KNVNNNNNNNNK","KNNNNNNNNNNK",".KNNNNNNNNK.","..KNNNNNNK..","...KNNNNK...","....KNNK....",".....KK.....","............"],
corazonr:["............","..KK....KK..",".KRRK..KRRK.","KRRRRKKRRRRK","KRRRKRRRRRRK","KRRRRKRRRRRK",".KRRRKRRRRK.","..KRRRKRRK..","...KRKRRK...","....KRRK....",".....KK.....","............"],
apreton:["............","............","KK......KK..","KSKKKKKKKSK.","KSSSSSSSSSK.","KSsSSsSSsSK.",".KSSSSSSSSK.","..KSSSSSSK..","...KKKKKK...","............","............","............"],
campana:[".....KK.....","....KYYK....","...KYYYYK...","..KYWYYYYK..","..KYWYYYYK..","..KYYYYYYK..",".KYYYYYYYYK.","KYYYYYYYYYYK","KKKKKKKKKKKK","....KYYK....",".....KK.....","............"],
libro:["............","KKKKK.KKKKK.","KWWWWKWWWWK.","KWKKWKWKKWK.","KWWWWKWWWWK.","KWKKWKWKKWK.","KWWWWKWWWWK.","KWKKWKWKKWK.","KWWWWKWWWWK.","KKKKKKKKKKK.","............","............"],
medalla:["..KK...KK...","..KBK.KRK...","...KBKRK....","....KKK.....","...KYYYK....","..KYYYYYK...","..KYYWYYK...","..KYYYYYK...","...KYYYK....","....KKK.....","............","............"],
candado:["....KKKK....","...KGGGGK...","..KGK..KGK..","..KGK..KGK..",".KKKKKKKKKK.",".KYYYYYYYYK.",".KYYYKKYYYK.",".KYYYKKYYYK.",".KYYYYYYYYK.",".KKKKKKKKKK.","............","............"],
check:["............","..........KK",".........KNK","........KNK.","KK.....KNK..","KNK...KNK...",".KNK.KNK....","..KNKNK.....","...KNK......","....K.......","............","............"],
x:["............","KK......KK..","KRK....KRK..",".KRK..KRK...","..KRKKRK....","...KRRK.....","..KRKKRK....",".KRK..KRK...","KRK....KRK..","KK......KK..","............","............"],
ala:["............","........KKK.","......KKWWK.","....KKWWWWK.","..KKWWWLLWK.",".KWWWWLLWWK.","KWWWLLWWWK..","KWWLLWWWK...",".KWWWWKK....","..KKKK......","............","............"],
bota:["....KKKKK...","....KRRRK...","....KRWRK...","....KRRRK...","....KRWRK...","....KRRRK...","....KRWRKK..","....KRRRRRK.","...KRRRRRRK.","...KKKKKKKKK","...KEEEEEEEK","...KKKKKKKKK"],
silla:["..KKKKKKKK..","..KGGGGGGK..","..KGKKKKGK..","..KGGGGGGK..","..KKKKKKKK..","..KGK..KGK..","KKKGKKKKGKKK","KGGGGGGGGGGK","KKKKKKKKKKKK",".KGK....KGK.",".KGK....KGK.",".KKK....KKK."],
cura:["............","....KKKK....","....KNNK....","....KNNK....",".KKKKNNKKKK.",".KNNNNNNNNK.",".KNNNNNNNNK.",".KKKKNNKKKK.","....KNNK....","....KNNK....","....KKKK....","............"],
aguila:["............","KK........KK","KMK..KK..KMK","KMMK.KYK.KMM",".KMMKMMKMMK.","..KMMMMMMK..","...KMMWMK...","....KMMK....","...KYKKYK...","..KYK..KYK..","............","............"],
sol:[".....KK.....",".K...KK...K.","..K.KKKK.K..","...KYYYYK...",".KKYYYYYYKK.","KKKYYYYYYKKK","KKKYYYYYYKKK",".KKYYYYYYKK.","...KYYYYK...","..K.KKKK.K..",".K...KK...K.",".....KK....."],
carpa:[".....KK.....","....KRRK....","...KRWRWK...","..KRWRWRWK..",".KRWRWRWRWK.","KKKKKKKKKKKK",".KRWKKKKWRK.",".KRWKmmKWRK.",".KRWKmmKWRK.",".KRWKmmKWRK.",".KKKKKKKKKK.","............"],
coliseo:["....KKKK....","..KKCCCCKK..","KKCCCCCCCCKK","KKKKKKKKKKKK",".KCK.KCK.KCK",".KCK.KCK.KCK",".KCK.KCK.KCK",".KCK.KCK.KCK",".KCK.KCK.KCK","KKKKKKKKKKKK","KCCCCCCCCCCK","KKKKKKKKKKKK"],
sombrero:["............","....KKKK....","...KMMMMK...","...KMMMMK...","...KmmmmK...","KK.KMMMMK.KK","KMKKKKKKKKMK",".KMMMMMMMMK.","..KKKKKKKK..","............","............","............"],
patio:["............","....KKKK....","...KMMMMK...","..KMMMMMMK..",".KKKKKKKKKK.",".KWWWWWWWWK.",".KWKKWWKKWK.",".KWKKWWMMWK.",".KWWWWWMMWK.",".KKKKKKKKKK.","............","............"],
play:["............","..KK........","..KYK.......","..KYYK......","..KYYYK.....","..KYYYYK....","..KYYYYK....","..KYYYK.....","..KYYK......","..KYK.......","..KK........","............"],
cambiar:["............","...KKKKK....","..KNNNNNK.K.",".KNK...KNKNK",".KNK....KNNK",".KK....KNNNK","KNNNK....KK.","KNNK....KNK.","KNKNK...KNK.",".K.KNNNNNK..","....KKKKK...","............"],
dado:["............",".KKKKKKKKKK.",".KWWWWWWWWK.",".KWKKWWKKWK.",".KWKKWWKKWK.",".KWWWWWWWWK.",".KWWWKKWWWK.",".KWWWKKWWWK.",".KWWWWWWWWK.",".KWKKWWKKWK.",".KKKKKKKKKK.","............"],
microfono:["....KKKK....","...KGgGgK...","...KgGgGK...","...KGgGgK...","....KKKK....","..K..KK..K..","..KK.KK.KK..","...KKKKKK...",".....KK.....",".....KK.....","...KKKKKK...","............"],
final:[".....KK.....","....KYYK....","KK.KYPPYK.KK","KYKYPPPPYKYK",".KYPPWWPPYK.","KYPPWYYWPPYK","KYPPWYYWPPYK",".KYPPWWPPYK.","KYKYPPPPYKYK","KK.KYPPYK.KK","....KYYK....",".....KK....."],
estrella2:[".....KK.....","....KPPK....","....KPPK....","KKKKKPPKKKKK","KPPPPWWPPPPK",".KPPPWPPPPK.","..KPPPPPPK..","..KPPPPPPK..",".KPPPKKPPPK.",".KPPK..KPPK.","KKKK....KKKK","............"]};
// ---- retratos (generados) ----
function face(o){const sk=o.sk||'S',sd=o.sd||'s',h=o.h||'m';const G=[];for(let y=0;y<12;y++)G.push('............'.split(''));const put=(x,y,c)=>{if(y>=0&&y<12&&x>=0&&x<12)G[y][x]=c;};
 for(let y=2;y<11;y++)for(let x=2;x<10;x++)put(x,y,sk);for(let y=3;y<10;y++){put(1,y,'K');put(10,y,'K');}for(let x=2;x<10;x++){put(x,1,'K');put(x,11,'K');}put(2,10,'K');put(9,10,'K');
 if(o.mask){for(let y=2;y<11;y++)for(let x=2;x<10;x++)put(x,y,o.mask);put(5,2,o.mask2);put(6,2,o.mask2);put(5,3,o.mask2);put(6,3,o.mask2);put(3,5,'W');put(4,5,'K');put(7,5,'K');put(8,5,'W');put(4,8,'R');put(5,8,'R');put(6,8,'R');put(7,8,'R');return G.map(r=>r.join(''));}
 put(4,5,'K');put(7,5,'K');put(4,4,sd);put(7,4,sd);put(5,7,sd);put(6,7,sd);put(4,9,'r');put(5,9,'r');put(6,9,'r');put(7,9,'r');
 if(o.hair==='short'){for(let x=2;x<10;x++){put(x,1,h);put(x,2,h);}put(2,3,h);put(9,3,h);}
 if(o.hair==='bun'){for(let x=2;x<10;x++){put(x,1,h);put(x,2,h);}put(2,3,h);put(9,3,h);put(2,4,h);put(9,4,h);put(5,0,h);put(6,0,h);}
 if(o.hair==='long'){for(let x=1;x<11;x++){put(x,1,h);put(x,2,h);}for(let y=3;y<11;y++){put(1,y,h);put(10,y,h);}}
 if(o.hair==='bald'){put(2,3,h);put(9,3,h);}
 if(o.must){put(3,8,o.must);put(4,8,o.must);put(5,8,o.must);put(6,8,o.must);put(7,8,o.must);put(8,8,o.must);put(4,9,sk);put(5,9,'r');put(6,9,'r');put(7,9,sk);}
 if(o.glasses){put(3,5,'K');put(4,5,'L');put(5,5,'K');put(6,5,'K');put(7,5,'L');put(8,5,'K');}
 if(o.shades){for(let x=3;x<9;x++)put(x,5,'E');}
 if(o.hat){for(let x=0;x<12;x++)put(x,2,o.hat);for(let x=3;x<9;x++){put(x,0,o.hat);put(x,1,o.hat);}}
 if(o.cap){for(let x=2;x<10;x++){put(x,1,o.cap);put(x,2,o.cap);}put(10,2,o.cap);put(11,2,o.cap);}
 if(o.lips){put(5,9,'P');put(6,9,'P');}
 if(o.tie){put(5,11,'R');put(6,11,'R');}
 return G.map(r=>r.join(''));}
Object.assign(ICO,{p_chuy:face({hair:'bald',h:'G',must:'G',cap:'B'}),p_mama:face({hair:'bun',h:'m',lips:1}),p_abuelo:face({hair:'bald',h:'W',glasses:1,must:'W'}),p_beto:face({hair:'short',h:'m'}),p_kid:face({mask:'N',mask2:'U'}),p_lic:face({hair:'short',h:'E',glasses:1,tie:1}),p_lupe:face({hair:'bun',h:'G',sk:'S'}),p_chucho:face({hair:'short',h:'m',must:'m',shades:0}),p_vane:face({hair:'long',h:'Y',lips:1}),p_papa:face({hair:'short',h:'g',must:'m'}),p_hermano:face({hair:'short',h:'E',cap:'R'}),p_reporter:face({hair:'long',h:'m',lips:1,glasses:1}),p_doc:face({hair:'short',h:'m',cap:'W'}),p_fan:face({hair:'short',h:'O'}),p_billetes:face({hair:'short',h:'E',shades:1,must:'E'}),p_vale:face({hair:'long',h:'Y',shades:1,lips:1}),p_johnny:face({hat:'M',must:'m'}),p_rigo:face({hair:'short',h:'E',must:'E',cap:'N'}),p_tona:face({hair:'bun',h:'W',glasses:1})});
function maskIco(m){const g=ICO.mascara.map(r=>r.replace(/B/g,'1').replace(/Y/g,'2'));return{g,c:{'1':m[0],'2':m[1]}};}
const ICACHE={};
function icoURL(name,mask){const key=name+(mask?mask.join(''):'');if(ICACHE[key])return ICACHE[key];let g=ICO[name],cmap=PXC;if(mask){const mi=maskIco(mask);g=mi.g;cmap=Object.assign({},PXC,mi.c);}if(!g)return'';
 try{const w=g[0].length,h=g.length,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');if(!x||!c.toDataURL)return'';g.forEach((row,yy)=>[...row].forEach((ch,xx)=>{const col=cmap[ch];if(col){x.fillStyle=col;x.fillRect(xx,yy,1,1);}}));ICACHE[key]=c.toDataURL();return ICACHE[key];}catch(e){return'';}}
function ic(name,cls,mask){const u=icoURL(name,mask);return u?'<img class="pi'+(cls?' '+cls:'')+'" src="'+u+'" alt="">':'';}
const EMAP={'🦂':'alacran','★':'fama','📌':'candado','🪶':'ala','📍':'cuerdas','🎲':'dado','⚔':'golpe','👊':'golpe','✊':'golpe','💥':'golpe','🛡':'defensa','📣':'aficion','📢':'aficion','🔊':'aficion','❤':'vida','♥':'vida','⭐':'fama','🌟':'estrella2','✨':'estrella2','🎭':'mascara','⚡':'energia','🔥':'furia','🌋':'furia','😤':'furia','🩸':'sangre','💧':'sangre','💫':'mareado','😵':'mareado','🎯':'abierto','🥴':'debil','👁':'ojo','👀':'ojo','🔗':'cadena','⛓':'cadena','🪢':'cuerdas','🗼':'tercera','💰':'moneda','💵':'moneda','🤑':'p_billetes','💸':'moneda','🏆':'cinturon','🥇':'medalla','🏅':'medalla','🎁':'sobre','🃏':'mazo','📜':'mazo','🎨':'pincel','🏋':'pesas','💪':'pesas','☰':'mas','⚙':'engrane','📅':'calendario','👻':'fantasma','🏟':'arena','🤼':'ring','💀':'calavera','☠':'calavera','😈':'calavera','🔀':'cruce','❓':'pregunta','🛒':'tienda','🍻':'tarro','🍺':'tarro','🥃':'tarro','🍾':'tarro','🏠':'casa','🏚':'patio','📰':'periodico','📻':'periodico','📺':'periodico','📱':'p_vale','😡':'calavera','🕯':'vela','💚':'corazonv','💔':'corazonr','🤝':'apreton','🙏':'apreton','🔔':'campana','📖':'libro','🎓':'libro','🔒':'candado','🔐':'candado','✅':'check','✔':'check','❌':'x','✖':'x','🪽':'ala','🕊':'ala','🦅':'aguila','☀':'sol','🌞':'sol','🎪':'carpa','🏛':'coliseo','🤠':'sombrero','▶':'play','⏩':'play','🔄':'cambiar','🔁':'cambiar','🎲':'dado','🎙':'microfono','🎤':'p_reporter','🦶':'bota','🦵':'bota','🦿':'bota','🪑':'silla','🪵':'silla','💊':'cura','🩹':'cura','🩺':'p_doc','💖':'vida','🧓':'p_chuy','👩':'p_mama','👴':'p_abuelo','🙂':'p_beto','🦂':'p_kid','💼':'p_lic','👵':'p_lupe','💃':'p_vane','🧔':'p_papa','👦':'p_hermano','🙋':'p_fan','🤕':'cura','⬆':'play','🎟':'sobre','🥊':'golpe','🧱':'defensa','🙅':'defensa','💨':'ala','🌀':'ala','☄':'ala','🪂':'ala','🌪':'ala','🌙':'ala','🔃':'ala','🦋':'ala','👋':'apreton','🖐':'golpe','✋':'golpe','🏃':'cuerdas','↪':'cuerdas','🏉':'cuerdas','🏈':'golpe'};
const LUCHE={'😇':'T','😈':'R','🦍':'G','🦋':'V','💋':'X','⭐':'M'};
const EMORE=/(?:\p{Extended_Pictographic}|[☀-➿])(?:️|‍(?:\p{Extended_Pictographic}|[☀-➿])️?|[\u{1F3FB}-\u{1F3FF}])*/gu;
function pxText(t){return t.replace(EMORE,m=>{const base=m.replace(/️|‍.*$|[\u{1F3FB}-\u{1F3FF}]/gu,'');if(LUCHE[base]&&base!=='⭐'&&typeof LUCH!=='undefined')return ic('mascara','',LUCH[LUCHE[base]].m);const k=EMAP[base]||EMAP[m];if(k)return ic(k);return'';}).replace(/\s{2,}/g,' ');}
function pxify(html){if(html==null)return html;html=String(html);if(!/[←-⯿\u{1F000}-\u{1FAFF}]/u.test(html))return html;return html.split(/(<[^>]*>)/).map(p=>p[0]==='<'?p:pxText(p)).join('');}

const ARTID={patada:'bota',patadita:'bota',giro:'bota',rodilla:'bota',silla:'silla',mesa:'silla',escalera:'tercera',cadena:'cadena',candado:'candado',cerrojo:'candado',agua:'cura',respira:'cura',vendar:'cura',cuenta2:'cura',caida2:'cura',renacer:'cura',apoyo:'vida',saludo:'aficion',provoca:'aficion',hype:'aficion',porra:'aficion',pueblo:'aficion',beso:'vida',correr:'cuerdas',cuerdas:'cuerdas',rebote:'cuerdas',lanzar:'cuerdas',subir:'tercera',grito:'furia',talco:'furia',sacudir:'furia',distraer:'ojo',polvo:'mareado',saliva:'mareado',lectura:'ojo',improvisa:'dado',mano:'dado',piquete:'ojo',jalon:'mascara',jalonpelo:'mascara',arranca:'mascara',mordida:'sangre',leyenda:'cinturon',titan:'cinturon',fantasma:'fantasma',sagrada:'mascara',aire:'cura',pose:'pesas',lesion:'sangre',segundo:'energia',campana:'campana',fuera:'cuerdas'};
const ARTCAT={atk:'golpe',air:'plancha',llave:'cadena',def:'defensa',show:'aficion',cura:'cura',mov:'cuerdas',sucia:'calavera',tac:'dado',fin:'final',lesion:'sangre'};
function cardArt(d,id){const n=ARTID[id]||ARTCAT[cardCat(d)]||'golpe';return ic(n,n==='plancha'?'big wide':'big');}
const EMTEST=/[←-⯿\u{1F000}-\u{1FAFF}]/u;
function pxEsc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function pxTextNode(n){const t=n.nodeValue;if(!t||!EMTEST.test(t))return;const p=n.parentNode;if(!p||(p.classList&&p.classList.contains('pxs'))||/^(SCRIPT|STYLE|TEXTAREA|OPTION|TITLE)$/.test(p.nodeName))return;const e=pxEsc(t),h=pxText(e);if(h===e)return;const sp=document.createElement('span');sp.className='pxs';sp.innerHTML=h;p.replaceChild(sp,n);}
function pxWalk(r){if(!r)return;if(r.nodeType===3)return pxTextNode(r);if(r.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(r.nodeName))return;const tw=document.createTreeWalker(r,4);const L=[];let n;while((n=tw.nextNode()))L.push(n);L.forEach(pxTextNode);}
function pxStart(){if(typeof MutationObserver==='undefined'||!document.body||!document.createTreeWalker)return;pxWalk(document.body);new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')pxTextNode(m.target);else m.addedNodes.forEach(pxWalk);}}).observe(document.body,{childList:true,subtree:true,characterData:true});}

// ================= v2.15: ring, luchador, celular, retos, vitrina, calidad =================
// ---------- luchas especiales ----------
const STIPS={jaula:{n:'Lucha en jaula',e:'🔒',d:'Nadie puede salir del ring. Las aéreas pegan 30% más desde lo alto.'},todo:{n:'Todo se vale',e:'🪑',d:'No hay réferi que castigue. Los dos pegan más fuerte.'},cabellera:{n:'Cabellera contra cabellera',e:'💇',d:'Si ganas, rapas al rival frente a todos (+20⭐).'},relevos:{n:'Lucha de parejas (2 vs 2)',e:'🤝',d:'Tú y tu compañero contra dos rivales: hay que vencer a los dos. Usa el botón Relevo para meter a tu compañero una vez.'}};
function applyStip(){const s=C.stip;if(!s)return;const S=STIPS[s];if(s==='todo'){C.e.dmgB+=3;C.p.st.furia=(C.p.st.furia||0)+1;}if(s==='relevos'){C.beto=BETO;if(C.beto){C.e.tag={key:'gemelo',n:C.e.n.replace(/ I$/,' II'),m:C.e.m,mv:C.e.mv,hp:Math.round(C.e.max*.6)};C.startBlock+=4;return;}if(!P.partner||P.partner===P.l)P.partner=pick(Object.keys(LUCH).filter(k=>k!==P.l));const pool=(ACTS[Math.min(P.act||0,2)].pool||[]).filter(k=>k!==C.e.key&&EN[k]);const tk=pool.length?pick(pool):'gallo',T=EN[tk];C.e.tag={key:tk,n:T.n,m:T.m,mv:T.mv,hp:Math.round(C.e.max*.55)};C.startBlock+=4;setTimeout(()=>hint('tag','🤝 Lucha de parejas: cuando venzas a '+C.e.n+' entra '+T.n+'. Tu botón Relevo mete a tu compañero una vez: úsalo cuando lo necesites.'),W(1200));}
 setTimeout(()=>{if(!C)return;shout(S.n.toUpperCase()+'!');setLog(S.e+' <b>'+S.n+'</b>: '+S.d);voz([{t:'¡'+S.n+'!',p:1.25,r:1.1}]);},W(1300));}
// ---------- interferencias ----------
function interf(){C.busy=true;render();const rn=C.e.n.replace(/ \(.*\)$/,'');const rep=repOf();const mine=rep&&chance(.4);
 if(!mine){showPanel('<h1>😱 ¡Interferencia!</h1><p>¡El compinche de '+rn+' se sube al ring mientras el réferi no ve!</p>');
  addBtn('👊 Sacarlo del ring','blu',()=>{P.hp=Math.max(1,P.hp-4);addAff(2);done('Lo avientas por encima de la tercera cuerda. ¡La gente enloquece! (+2 afición, -4 vida)');});
  addBtn('🌀 Aventárselo al rival','blu',()=>{if(chance(.6)){hurtE(12,'x');done('¡Lo lanzas contra '+rn+' y caen los dos! (-12 al rival)');}else{P.hp=Math.max(1,P.hp-8);done('Te esquiva y te pegan los dos. (-8 vida)');}});
  addBtn('🙄 Ignorarlo','blu',()=>{C.e.st.furia=(C.e.st.furia||0)+2;done('Lo ignoras... y le pasa una silla a '+rn+'. (+2 furia al rival)');});}
 else{showPanel('<h1>😏 ¡'+rep.n+' se mete!</h1><p>Tu representante se sube al delantal y se pone a discutir con el réferi.</p>');
  addBtn('😈 Aprovechar mientras no ve','blu',()=>{C.refDown=true;done('El réferi no ve nada este turno: tus trampas no suman sospecha.');});
  addBtn('🙅 "¡Bájese de ahí!"','blu',()=>{addAff(2);done('La afición aplaude que luches limpio. (+2 afición)');});}
 function done(t){hidePanel();setLog(t);C.busy=false;render();if(C.e.hp<=0)setTimeout(win,W(300));}}
// ---------- cuenta de tres ----------
function kickout(){C.busy=true;render();const need=[7,10,13][DIF()]||10;let taps=0,t0=Date.now(),fin=false;
 showPanel('<h1>😵 ¡CONTRA LA LONA!</h1><p style="text-align:center">¡Toca rápido para levantarte antes del 3!</p><div class="kick"><div class="kknum" id="kc">1</div><div class="kb"><i id="kbar"></i></div></div>');
 const b=document.createElement('button');b.className='b gold kbtn';b.textContent='¡LEVÁNTATE!';b.onclick=()=>{if(fin)return;taps++;vib(15);const k=$('#kbar');if(k&&k.style)k.style.width=Math.min(100,taps/need*100)+'%';if(taps>=need)end(true);};$('#pn').appendChild(b);
 voz([{t:'¡Uno!',p:1.2,r:1}],true);const tk1=setTimeout(()=>{const c=$('#kc');if(c)c.textContent='2';voz([{t:'¡Dos!',p:1.25,r:1}],true);},1100);const tk2=setTimeout(()=>end(taps>=need),2300);
 function end(ok){if(fin)return;fin=true;clearTimeout(tk1);clearTimeout(tk2);if(!C)return;
  if(ok){C.kicked=1;P.hp=Math.max(1,Math.round(P.max*.12));hidePanel();shout('¡SE LEVANTÓ EN DOS!');sfx.crowd();voz([{t:'¡NO, NO, NO! ¡SE LEVANTÓ EN DOS!',p:1.3,r:1.2}],true);addAff(3);addScar('ceja');wkAdd('w_kick');C.busy=false;chooseIntent();render();setTimeout(()=>{if(C&&!C.over)startTurn();},W(500));}
  else{const c=$('#kc');if(c)c.textContent='3';voz([{t:'¡Tres!',p:1.1,r:1}],true);setTimeout(()=>{hidePanel();lose();},600);}}}
// ---------- lluvia de objetos ----------
function lluvia(){const w=$('#ringwrap');if(!w||!C||!w.appendChild)return;shout('¡LLUVIA DE OBJETOS!');const kinds=['moneda','tarro','sombrero'];
 for(let i=0;i<3;i++){const k=pick(kinds);const e=document.createElement('button');e.className='obj';e.style.left=(12+i*28+R(-5,5))+'%';e.style.animationDelay=(i*.25)+'s';e.innerHTML=ic(k);
  e.onclick=()=>{if(!C)return;sfx.card();e.remove();META.cnt.obj=(META.cnt.obj||0)+1;wkAdd('w_lluvia');if(META.cnt.obj>=10)unlock('s_lluvia');
   if(k==='moneda'){if(isStory()){P.gold+=3;float('p','+$3','#ffd23f');}else{coins(2);float('p','+2⭐','#ffd23f');}}if(k==='tarro'){C.p.block+=3;float('p','+3🛡','#8ec5ff');}if(k==='sombrero')addAff(1);render();saveMeta();};
  w.appendChild(e);setTimeout(()=>e.remove(),3200);}}
// ---------- apodos y cicatrices ----------
function styAdd(d){if(!P||P.mode||P.tut)return;P.sty=P.sty||{a:0,d:0,l:0,b:0};if(d.air)P.sty.a++;if(d.dirty)P.sty.d++;if(d.llave)P.sty.l++;if((d.dmg||0)*(d.hits||1)>=12)P.sty.b++;}
function apodoCheck(){if(P.apodo||P.ch<1)return null;const s=P.sty||{a:0,d:0,l:0,b:0};const top=Object.entries(s).sort((a,b)=>b[1]-a[1])[0];if(!top||top[1]<6)return P.ch>=3?(P.apodo='El Orgullo del Barrio'):null;
 P.apodo={a:'El Rey de la Tercera',d:'El Tramposo de Tepito',l:'El Maestro de las Llaves',b:'El Martillo de la Colonia'}[top[0]];return P.apodo;}
function addScar(k){if(!P||P.mode||P.tut)return;P.scars=P.scars||[];if(!P.scars.includes(k))P.scars.push(k);}
function scarOv(P_,sc){if(!sc||!sc.length)return;const c='#b85a5a',c2='#e8b0a0';
 if(sc.includes('pecho')){P_(10,26,6,1,c);P_(11,25,1,1,c2);P_(13,27,1,1,c2);P_(15,25,1,1,c2);}
 if(sc.includes('brazo')){P_(3,27,4,1,c);P_(4,26,1,1,c2);}
 if(sc.includes('rodilla')){P_(18,53,4,1,c);P_(19,52,1,1,c2);P_(21,54,1,1,c2);}
 if(sc.includes('ceja')){P_(16,6,5,1,'#e8c0b0');P_(17,5,1,1,'#7a3a3a');P_(19,7,1,1,'#7a3a3a');}}
// ---------- entradas personalizadas ----------
const ENTS={song:{menu:['Tema principal',0],v0:['Cumbia sonidera',0],v1:['Banda de pueblo',60],v3:['Mariachi',90],v5:['Rock texano',120],v6:['Himno del estadio',160],boss:['Máscara contra Máscara',220]},pose:{brazos:['Brazos arriba',0],flex:['Flexionando',40],senala:['Señalando al público',40],cuerda:['Sobre las cuerdas',80]},fx:{none:['Sin efectos',0],confeti:['Confeti',50],humo:['Humo',80],fuego:['Pirotecnia',140]}};
function entOwn(){META.entOwn=META.entOwn||['song:menu','song:v0','pose:brazos','fx:none'];META.ent=META.ent||{song:'menu',pose:'brazos',fx:'none'};return META.entOwn;}
function entradaView(back){entOwn();let h='<h1>🎶 Mi entrada</h1><p class="small">⭐ '+META.fama+' de fama para desbloquear</p>';
 const sec=(k,t)=>{h+='<h2>'+t+'</h2>';for(const id in ENTS[k]){const[n,c]=ENTS[k][id],own=META.entOwn.includes(k+':'+id),sel=META.ent[k]===id;h+='<div class="opt '+(sel?'sel ':'')+(own?'':'lock')+'" data-ek="'+k+'" data-ei="'+id+'"><div style="flex:1"><b>'+n+'</b></div><b>'+(sel?'✅':own?'':'🔒 '+c+'⭐')+'</b></div>';}};
 sec('song','Canción');sec('pose','Pose de entrada');sec('fx','Efectos');showPanel(h);
 const pn=$('#pn');if(pn.querySelectorAll)pn.querySelectorAll('[data-ek]').forEach(el=>el.onclick=()=>{const k=el.dataset.ek,id=el.dataset.ei,key=k+':'+id,c=ENTS[k][id][1];
  if(!META.entOwn.includes(key)){if(META.fama<c){sfx.card();return;}META.fama-=c;META.entOwn.push(key);}META.ent[k]=id;saveMeta();sfx.card();if(k==='song'){musicStart(id);}entradaView(back);});
 addBtn('Volver','alt',back||menu);}
function entFx(){if(!C||!META.ent)return;const fx=META.ent.fx,x=36;if(fx==='confeti')confetti(40);if(fx==='humo')for(let i=0;i<30;i++)PARTS.push({x:x+R(-14,14),y:FY+50,vx:R(-.5,.5),vy:R(-.9,-.3),l:R(30,60),c:pick(['#ddd','#bbb','#999'])});
 if(fx==='fuego')for(const px of[10,70])for(let i=0;i<16;i++)PARTS.push({x:px,y:74,vx:R(-.5,.5),vy:R(-3.2,-1.6),l:22,c:pick(['#ffd23f','#ff7a1a','#fff'])});}
// ---------- celular: redes, mensajes, hogar ----------
function segs(){return Math.max(80,Math.round(150+P.fama*37+(P.ch||0)*900+(P.apodo?1500:0)+(P.bad===1?-600:0)));}
const USERS=['@luchafan92','@lamerenguera','@tacosdeljuan','@doñachela_oficial','@rudo4ever','@elcompadrehugo','@mascarasyboletos','@lagüeradelamerced','@topesuicida','@arenalovers'];
function feed(){const n=pnm(),L=[];const k=RR('kid');const A=(t,h)=>L.push([pick(USERS),t.replace(/\{n\}/g,n),h]);
 A(pick(['¡{n} es el mejor luchador de la colonia!','Lo vi en vivo, ¡qué tope tan loco!','Mi hijo ya quiere una máscara como la de {n}.','Ese {n} vuela más que mi suegra cuando hay oferta.']),0);
 A(pick(['Puro teatro, la lucha libre es falsa.','{n} no le gana ni a mi abuelita.','Sobrevalorado.']),1);
 if(k<=-2)A(pick(['#TeamVeneno, {n} no tiene nivel.','Kid Alacrán lo va a dejar sin máscara jaja.']),1);if(k>=2)A('Ojalá {n} y Kid Alacrán vuelvan a hacer equipo #Carnales',0);
 if(P.bad===1||P.bad===3)A('¿Cómo puede hablar así de su propia familia? Qué decepción.',1);if(P.bad===2)A('Bien por {n} por pedir perdón. Eso es de hombres.',0);
 if((P.drink||0)>=2&&!P.sober)A('Lo vieron otra vez saliendo de la cantina a las 4 a.m....',1);if(P.sober)A('Dicen que {n} ya dejó la bebida. ¡Así se hace, campeón!',0);
 if(P.love==='vane'||P.love==='pareja')A('Qué bonita pareja hacen {n} y Vanessa.',0);if(P.love==='over')A('¿Ya vieron que Vanessa dejó de seguir a {n}? jajaja',1);
 if(P.ab==='dead')A('Q.E.P.D. Don Ramón "El Gavilán". Fuerza, {n}.',0);if(P.ab==='sick')A('Oraciones por el abuelito de {n}.',0);if(P.scammed)A('Dicen que su representante se fugó con su lana jajaja',1);
 if(P.apodo)A('¡Viva '+P.apodo+'!',0);if(P.home===2)A('{n} le compró casa a su mamá. Eso es ser buen hijo.',0);return shuffle(L).slice(0,7);}
function redesView(back){const F=feed();showPanel('<div class="phone"><div class="ph-top">'+ic('p_vale')+' <b>LuchaGram</b></div><div class="ph-prof"><div class="pp">'+ic('mascara','',playerMask())+'</div><div><b>'+pnm()+'</b>'+(P.apodo?'<br><small>«'+P.apodo+'»</small>':'')+'<br><small>'+segs().toLocaleString('es-MX')+' seguidores</small></div></div>'+F.map(([u,t,h])=>'<div class="post '+(h?'hate':'')+'"><b>'+u+'</b><br>'+t+'</div>').join('')+'</div>');addBtn('Volver','alt',back);}
const THREADS=[
 {w:'mama',ok:()=>true,m:()=>RR('mama')>=1?['¿Ya comiste, mijo?','Te guardé tamales en el refri.','Tus tías te mandan bendiciones 🙏']:RR('mama')<=-2?['(Visto)','...']:['Hola mijo.','Cuídate mucho, ¿sí?'],r:[['Sí, mamá, ya comí ❤️',1],['Ahorita no puedo, ma',-1]]},
 {w:'kid',ok:()=>true,m:()=>{const k=RR('kid');return k>=2?['Carnal, ¿te acuerdas del patio de la escuela?','Hasta el estadio 🤙']:k<=-2?['Disfruta mientras puedas, perdedor.','Tu lugar es en el patio de Doña Lupe.']:['Vi tu lucha.','No estuvo mal... para ser tú.'];},r:[['🤙 Hasta el estadio, Beto',1],['Déjame en paz',-1]]},
 {w:'rep',ok:()=>!!repOf(),m:()=>[(REPL[P.rep]||REPL.lic).win[0],'Te conseguí otra fecha. No me falles.'],r:[['¡Gracias! 💪',1],['¿Y mi lana?',-1]]},
 {w:'vane',ok:()=>P.love==='vane'||P.love==='pareja',m:()=>['¿Cómo te fue hoy?','Te extraño 💕'],r:[['Te dedico la próxima lucha',0],['Ahorita estoy entrenando',0]]},
 {w:'abuelo',ok:()=>P.ab==='ok'||P.ab==='healed',m:()=>['Mijo, aprendí a mandar mensajes.','ESE TOPE ESTUVO BUENISIMO','(audio de 3 minutos)'],r:[['¡Gracias, abuelo!',1],['Ahorita no, abuelo',-1]]}];
function msgsView(back){const key=k=>'c'+P.ch+'_'+k;P.msgR=P.msgR||{};let h='<div class="phone"><div class="ph-top">'+ic('apreton')+' <b>Mensajes</b></div>';
 THREADS.filter(t=>t.ok()).forEach((t,i)=>{const c=castOf(t.w)||CAST.nar;h+='<div class="th"><div class="th-h">'+c[0]+' <b>'+c[1]+'</b></div>'+t.m().map(x=>'<div class="bub">'+fmtW(t.w,x)+'</div>').join('');const done=P.msgR[key(t.w)];
  if(done!==undefined)h+='<div class="bub me">'+t.r[done][0]+'</div>';else h+='<div class="rep">'+t.r.map((r,j)=>'<button class="chip" data-t="'+i+'" data-j="'+j+'">'+r[0]+'</button>').join('')+'</div>';h+='</div>';});
 h+='</div>';showPanel(h);const TT=THREADS.filter(t=>t.ok());const pn=$('#pn');if(pn.querySelectorAll)pn.querySelectorAll('[data-t]').forEach(el=>el.onclick=()=>{const t=TT[+el.dataset.t],j=+el.dataset.j;P.msgR[key(t.w)]=j;const v=t.r[j][1];if(v)REL(t.w==='abuelo'?'abuelo':t.w,v);sfx.card();msgsView(back);});
 addBtn('Volver','alt',back);}
const HOMES=[{n:'Cuarto en la vecindad',d:'Un cuarto con una cama, un póster de El Santo y una gotera.',c:0},{n:'Departamento propio',d:'+4 de vida máxima y +2 de defensa al iniciar cada lucha.',c:60},{n:'Casa para tu mamá',d:'+6 de vida máxima, +4 de defensa al iniciar cada lucha. Tu familia te lo agradecerá.',c:150}];
function hogarView(back){const h0=P.home||0;let h='<h1>🏠 Dónde vivir</h1>';HOMES.forEach((H,i)=>{h+='<div class="opt '+(i===h0?'sel':'')+'"><div class="ic">'+ic(i===0?'patio':i===1?'arena':'casa')+'</div><div style="flex:1"><b>'+H.n+'</b><br>'+H.d+'</div><b>'+(i<=h0?'✅':'$'+H.c)+'</b></div>';});showPanel(h+'<p class="small">Tienes $'+P.gold+'</p>');
 if(h0<2){const N=HOMES[h0+1];addBtn('🔑 Mudarte: '+N.n+' ($'+N.c+')',P.gold>=N.c?'gold':'alt',()=>{if(P.gold<N.c){sfx.card();return;}P.gold-=N.c;P.home=h0+1;LH.mx(P.home===1?4:6);const L=P.home===2?[['mama','(llorando) ¿Una casa? ¿Para mí? Ay, mijo...'],['abuelo','Ese es mi nieto.']]:[['chuy','Departamento propio. Ya eres todo un profesional, {n}.']];if(P.home===2){REL('mama',3);if(abAlive())REL('abuelo',1);}talk(L,()=>hogarView(back));});}
 addBtn('Volver','alt',back);}
function celularView(){const back=celularView;const unread=THREADS.filter(t=>t.ok()&&P.msgR?P.msgR['c'+P.ch+'_'+t.w]===undefined:true).length;
 showPanel('<h1>📱 Tu celular</h1><p class="small">'+segs().toLocaleString('es-MX')+' seguidores'+(P.apodo?' · «'+P.apodo+'»':'')+'</p>');
 addBtn('💬 Mensajes'+(unread?' ('+unread+')':''),'blu',()=>msgsView(back));addBtn('📱 LuchaGram','blu',()=>redesView(back));addBtn('🏠 Dónde vivir','blu',()=>hogarView(back),HOMES[P.home||0].n);addBtn('Volver','alt',showMap);}
// ---------- retos de la semana ----------
const WKC={w_story3:['Gana 3 Máscara contra Máscara en el modo historia',3],w_clean:['Gana una lucha en Difícil sin cartas sucias',1],w_air20:['Usa 20 cartas aéreas',20],w_llave:['Gana una lucha por rendición',1],w_coin:['Gana 5 volados',5],w_kick:['Levántate en la cuenta de dos',1],w_lluvia:['Atrapa 5 objetos del público',5],w_nodmg:['Gana una lucha recibiendo menos de 10 de daño',1],w_stip:['Gana 2 luchas especiales',2]};
function weekId(){const d=new Date();const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const day=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-day);const y0=new Date(Date.UTC(t.getUTCFullYear(),0,1));return t.getUTCFullYear()+'-'+Math.ceil(((t-y0)/864e5+1)/7);}
function wk(){const id=weekId();if(!META.wk||META.wk.id!==id){const keys=Object.keys(WKC);const r=mulberry(id.split('-').join('')|0);const pickd=[];while(pickd.length<3){const k=keys[Math.floor(r()*keys.length)];if(!pickd.includes(k))pickd.push(k);}META.wk={id,ch:pickd,prog:{},done:[]};}return META.wk;}
function wkAdd(k,n){return;if(!META||(P&&P.tut))return;const W_=wk();if(!W_.ch.includes(k)||W_.done.includes(k))return;W_.prog[k]=(W_.prog[k]||0)+(n||1);if(W_.prog[k]>=WKC[k][1]){W_.done.push(k);coins(150);const el=document.getElementById('ach');if(el){el.textContent='📅 Reto semanal cumplido: '+WKC[k][0]+' (+150⭐)';el.classList.add('on');clearTimeout(achT);achT=setTimeout(()=>el.classList.remove('on'),2800);}}saveMeta();}
function retosView(){const W_=wk();let h='<h1>📅 Retos de la semana</h1><p class="small">Se renuevan cada lunes. Cada uno da ⭐ 150.</p>';W_.ch.forEach(k=>{const[t,n]=WKC[k],p=Math.min(n,W_.prog[k]||0),ok=W_.done.includes(k);h+='<div class="opt '+(ok?'sel':'')+'"><div class="ic">'+(ok?'✅':'📅')+'</div><div style="flex:1"><b>'+t+'</b><div class="wkb"><i style="width:'+Math.round(p/n*100)+'%"></i></div><small>'+p+'/'+n+'</small></div></div>';});showPanel(h);addBtn('Volver','alt',moreView);}
function wkFightWin(c){return;if(!P||P.tut||!c)return;if(DIF()===2&&!c.dirtyN&&isStory())wkAdd('w_clean');if(c.surrender)wkAdd('w_llave');if(c.dmgTaken<10)wkAdd('w_nodmg');if(c.stip){wkAdd('w_stip');if(c.stip==='jaula')unlock('s_jaula');if(c.stip==='cabellera')unlock('s_rapado');}if(c.kicked)unlock('s_levanta');if(c.kind==='boss'&&isStory())wkAdd('w_story3');}
// ---------- vitrina ----------
const VBIO={panzon:'Rey del patio de Doña Lupe por diez años. Debajo de la máscara: un señor que vende carnitas los domingos.',charrooro:'Dueño de la kermés del pueblo. Llegaba a caballo... prestado.',emperador:'Se creía dueño del barrio. Su capa era una cortina de terciopelo.',carnicero:'Leyenda de la Merced. Sus golpes olían a chicharrón.',siniestro:'Estudiaba a sus rivales como ratas de laboratorio. No previó el tuyo.',inmortal:'Nunca había perdido su máscara. Hasta que llegaste tú.',veneno:'Tu amigo de la infancia. Tu peor rival. Beto.',venenoH:'Dos niños del patio, en el estadio. Como lo juraron.'};
function vitrinaOld(){const U=META.unmasked||[];let h='<h1>🎭 Mi vitrina</h1><p class="small">'+U.length+' máscaras ganadas</p><div class="vit">';
 if(!U.length)h+='<p>Todavía no le quitas la máscara a nadie. ¡Gana una Máscara contra Máscara!</p>';U.forEach(k=>{const E=EN[k];if(!E)return;h+='<div class="vm"><div class="vmi">'+ic('mascara','big',E.m)+'</div><b>'+E.n+'</b><small>'+(VBIO[k]||E.note||'Una máscara más para tu colección.')+'</small></div>';});
 showPanel(h+'</div>');addBtn('Volver','alt',moreView);}
// ---------- vibración por movimiento ----------
const VIBP={slam:[60,40,90],spear:[50,30,50],hurra:[20,20,20,20,70],dive:[30,20,70],splash:[30,20,100],moon:[25,25,80],fin:[40,30,40,30,150],chair:[90],chain:[30,20,30],kick:[35],spinkick:[20,20,40],punch:[20],chop:[25],lariat:[45],head:[50],knee:[40],combo:[15,30,15,30,15],guard:[10],wall:[15],heal:[8,30,8],bite:[30,10,30]};
// ---------- pausa automática ----------
let HIDDEN=0;
function pauseInit(){if(!document.addEventListener)return;document.addEventListener('visibilitychange',()=>{if(document.hidden){HIDDEN=1;try{speechSynthesis.cancel();}catch(e){}try{AC&&AC.suspend&&AC.suspend();}catch(e){}}
 else if(HIDDEN){HIDDEN=0;try{AC&&AC.resume&&AC.resume();}catch(e){}const ov=$('#ov');if(C&&!C.over&&ov&&!ov.classList.contains('on')){showPanel('<h1>⏸️ Pausa</h1><p>La lucha te espera en el ring.</p>');addBtn('▶ Continuar la lucha','gold',hidePanel);}}});}


// ---------- estilos de luchador (cuerpo/vestuario) ----------
function styleOv(P_,st,A,B,AD,trunk,trD,band,sk,skD,skL,pat,pose){
 const masked=pat!=='hair';
 if(st==='R'){const K='#161616',K2='#2c2c2c',ST='#c9c9c9';
  // mallas largas
  P_(9,46,6,10,trunk);P_(17,46,6,10,trunk);P_(9,46,1,10,trD);P_(22,46,1,10,trD);P_(14,46,1,10,band);P_(17,46,1,10,band);
  P_(8,50,8,4,K);P_(16,50,8,4,K);P_(9,51,6,1,K2);P_(17,51,6,1,K2);
  // botas negras con agujetas rojas
  P_(8,55,8,8,K);P_(16,55,8,8,K);P_(11,57,2,1,'#c0392b');P_(11,59,2,1,'#c0392b');P_(19,57,2,1,'#c0392b');P_(19,59,2,1,'#c0392b');P_(7,62,10,2,'#000');P_(15,62,10,2,'#000');
  // chaleco de cuero con estoperoles
  P_(7,21,4,18,K);P_(21,21,4,18,K);P_(5,21,4,3,K);P_(23,21,4,3,K);P_(10,21,2,4,K);P_(20,21,2,4,K);P_(8,22,1,16,K2);P_(23,22,1,16,K2);
  for(let i=0;i<4;i++){P_(9,24+i*4,1,1,ST);P_(22,24+i*4,1,1,ST);}P_(6,22,1,1,ST);P_(25,22,1,1,ST);
  if(masked){// ceño fruncido, ojos amarillos y colmillos
   P_(11,7,2,1,'#000');P_(13,8,3,1,'#000');P_(19,7,2,1,'#000');P_(16,8,3,1,'#000');
   P_(12,9,3,2,'#ffe14a');P_(17,9,3,2,'#ffe14a');P_(13,9,1,2,'#000');P_(18,9,1,2,'#000');
   P_(13,14,6,3,'#111');P_(13,14,1,2,'#fff');P_(15,14,1,1,'#fff');P_(16,14,1,1,'#fff');P_(18,14,1,2,'#fff');P_(14,16,4,1,'#7a1010');
   P_(10,10,1,6,AD);P_(21,10,1,6,AD);}
 }
 else if(st==='G'){const tL=shade(trunk,22);
  // leotardo de una pieza con tirantes
  P_(9,21,3,4,trunk);P_(20,21,3,4,trunk);P_(8,25,16,22,trunk);P_(6,29,20,11,trunk);P_(6,29,1,11,trD);P_(25,29,1,11,trD);P_(8,25,1,4,trD);P_(23,25,1,4,trD);
  P_(11,31,10,2,tL);P_(12,33,8,1,tL);P_(9,39,14,2,band);P_(14,26,4,3,band);P_(15,27,2,1,trunk);
  P_(8,46,8,2,trunk);P_(16,46,8,2,trunk);P_(15,44,2,3,trD);
  // barba que asoma bajo la máscara
  if(masked){P_(12,18,8,3,'#3a2416');P_(13,21,6,1,'#3a2416');P_(13,18,6,1,'#5a3a26');}
 }
 else if(st==='X'){const H='#ffe08a',Hd='#d4a020',Hl='#fff6c8',PK='#ff7ac0',PKd='#d94f9a';
  // cabellera rubia de salón (sin máscara)
  P_(7,-1,18,6,H);P_(6,2,5,20,H);P_(21,2,5,20,H);P_(5,6,2,13,H);P_(25,6,2,13,H);P_(6,2,1,20,Hd);P_(25,2,1,17,Hd);P_(9,0,6,1,Hl);P_(17,1,4,1,Hl);
  P_(10,4,12,14,sk);P_(10,4,12,2,H);P_(10,6,3,1,H);P_(19,6,3,1,H);P_(10,17,12,2,skD);
  // maquillaje
  P_(12,8,3,1,'#b05ad8');P_(17,8,3,1,'#b05ad8');P_(12,9,3,2,'#fff');P_(17,9,3,2,'#fff');P_(13,9,1,2,'#3a2a5a');P_(18,9,1,2,'#3a2a5a');
  P_(11,8,1,2,'#111');P_(20,8,1,2,'#111');P_(12,7,3,1,'#5a3a26');P_(17,7,3,1,'#5a3a26');
  P_(11,12,2,1,'#ff9db8');P_(19,12,2,1,'#ff9db8');P_(15,11,2,2,skD);P_(14,15,4,1,'#e8287a');P_(15,16,2,1,'#c01060');
  P_(9,13,1,3,'#ffd23f');P_(22,13,1,3,'#ffd23f');P_(9,16,1,1,'#fff');P_(22,16,1,1,'#fff');
  // boa de plumas
  for(let i=0;i<12;i++){P_(4+i*2,19+(i%2),3,3,i%3?PK:PKd);}P_(6,19,1,1,'#fff');P_(13,20,1,1,'#fff');P_(20,19,1,1,'#fff');P_(26,20,1,1,'#fff');
  for(let j=0;j<5;j++){P_(9+(j%2),22+j*3,3,3,j%2?PKd:PK);P_(20-(j%2),22+j*3,3,3,j%2?PK:PKd);}P_(10,25,1,1,'#fff');P_(21,31,1,1,'#fff');
  // lentejuelas
  P_(10,41,1,1,'#fff');P_(13,44,1,1,'#ffd23f');P_(18,42,1,1,'#fff');P_(21,45,1,1,'#ffd23f');P_(16,40,1,1,'#fff');
 }
 else if(st==='V'){const HR='#2a1a12',HL='#4a3020',tl=shade(trunk,22),ml=shade(trunk,-30);
  // leotardo de una pieza con escote
  P_(10,21,3,3,trunk);P_(19,21,3,3,trunk);P_(9,24,14,16,trunk);P_(8,28,16,12,trunk);P_(8,28,1,12,trD);P_(23,28,1,12,trD);P_(14,24,4,2,sk);P_(15,26,2,1,sk);P_(11,30,2,2,tl);P_(19,30,2,2,tl);P_(8,39,16,1,band);
  // mallas y botas altas
  P_(9,46,6,6,ml);P_(17,46,6,6,ml);P_(8,51,8,12,band);P_(16,51,8,12,band);P_(8,51,8,1,shade(band,-30));P_(16,51,8,1,shade(band,-30));for(let i=0;i<4;i++){P_(11,53+i*2,2,1,'#fff');P_(19,53+i*2,2,1,'#fff');}P_(7,62,10,2,'#111');P_(15,62,10,2,'#111');
  // cola de caballo que sale de la máscara
  P_(14,-3,5,4,HR);P_(18,-2,4,3,HR);P_(21,0,3,9,HR);P_(22,8,3,8,HR);P_(23,15,2,3,HR);P_(15,-3,2,1,HL);P_(22,2,1,6,HL);P_(13,0,6,1,band);
  if(masked){P_(11,8,1,2,'#111');P_(20,8,1,2,'#111');P_(14,15,4,1,'#d8326e');P_(15,16,2,1,'#a0204e');}
 }
 else if(st==='M'){// mini: botas y rodilleras de colores, máscara brillante
  P_(8,50,8,4,band);P_(16,50,8,4,band);P_(12,1,4,1,'#fff');
 }
}

// ---------- Amistoso (lucha rápida) ----------
const AMI_R={T:{n:'El Místico Azul',m:['#1f5fbf','#fff','star'],ai:'normal'},R:{n:'Doctor Vudú',m:['#5a1a1a','#e74c3c','horns'],ai:'tramposo'},G:{n:'Toro Bravo',m:['#3a2a1a','#c0392b','bands'],ai:'agresivo'},V:{n:'La Reina Pirata',m:['#111','#ffffff','skull'],ai:'agresivo'},X:{n:'El Elegante',m:['#ff2e88','#ffd23f','heart'],ai:'calculador'},M:{n:'Mini Ciclón',m:['#16a085','#fff','bolt'],ai:'defensivo'}};
const AMI_LEG={panzon:'G',charrooro:'R',emperador:'T',carnicero:'G',siniestro:'T',inmortal:'G',veneno:'R'};
function amiRivals(){const out=Object.keys(AMI_R).map(k=>({id:'s_'+k,sty:k,n:AMI_R[k].n,m:AMI_R[k].m,sub:'Estilo '+LUCH[k].n.replace(/^(El|La) /,'')}));const um=META.unmasked||[];Object.keys(AMI_LEG).forEach(k=>{if(EN[k]&&(um.includes(k)||(META.trophies||[]).includes(k)))out.push({id:'e_'+k,sty:AMI_LEG[k],n:EN[k].n,m:EN[k].m,sub:'Leyenda desenmascarada',leg:k});});return out;}
const AMI_ST=[{k:'',n:'Lucha normal',e:'🔔'}].concat(Object.keys(STIPS).map(k=>({k,n:STIPS[k].n,e:STIPS[k].e})));
function amiCfg(){const a=META.ami||(META.ami={l:META.sel.l||'T',r:0,v:4,s:0,d:1});return a;}
function amiPrev(id,l,m,flip){const c=$('#'+id);if(!c||!c.getContext)return;const g=c.getContext('2d');if(!g)return;g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,c.width,c.height);g.imageSmoothingEnabled=false;g.setTransform(2,0,0,2,0,0);try{big(g,6,12,m,flip,'#d9a066',flip?m[1]:PT(),'flex',flip?{style:l}:Object.assign({},(META&&META.look)||{},{style:l}));}catch(e){}}
function amistoso(){const a=amiCfg(),RV=amiRivals(),LS=Object.keys(LUCH);a.r=Math.min(a.r,RV.length-1);a.v=Math.min(a.v,VEN.length-1);if(!LUCH[a.l])a.l='T';
 const rv=RV[a.r],L=LUCH[a.l],V=VEN[a.v],ST=AMI_ST[a.s]||AMI_ST[0],D=DIFS[a.d];
 const row=(k,lab,val)=>'<div class="amirow"><button class="amiar" data-k="'+k+'" data-d="-1"></button><div><span class="small">'+lab+'</span><br><b>'+val+'</b></div><button class="amiar" data-k="'+k+'" data-d="1"></button></div>';
 let h='<h1>⚔️ Amistoso</h1><div class="amivs"><div><canvas id="amiP" width="90" height="152"></canvas><b>'+L.n+'</b><span class="small">Tú</span></div><div class="amivsx">VS</div><div><canvas id="amiR" width="90" height="152"></canvas><b>'+rv.n+'</b><span class="small">'+rv.sub+'</span></div></div>';
 h+=row('l','Tu estilo',L.e+' '+L.n+' · ❤'+L.hp)+row('r','Rival',rv.n)+row('v','Arena',V.e+' '+V.n)+row('s','Tipo de lucha',ST.e+' '+ST.n)+row('d','Dificultad',D.e+' '+D.n);
 showPanel(h);amiPrev('amiP',a.l,playerMask(),false);amiPrev('amiR',rv.sty,rv.m,true);
 document.querySelectorAll('#pn .amiar').forEach(b=>b.onclick=()=>{const k=b.dataset.k,d=+b.dataset.d;sfx.card();const n={l:LS.length,r:RV.length,v:VEN.length,s:AMI_ST.length,d:DIFS.length}[k];
  if(k==='l'){a.l=LS[(LS.indexOf(a.l)+d+n)%n];}else a[k]=(a[k]+d+n)%n;saveMeta();amistoso();});
 addBtn('🔔 ¡A LA LUCHA!','gold',amiGo);addBtn('🎲 Aleatorio','blu',()=>{a.l=pick(LS);a.r=RI(0,RV.length-1);a.v=RI(0,VEN.length-1);a.s=chance(.5)?0:RI(1,AMI_ST.length-1);saveMeta();amistoso();});addBtn('Volver','alt',torneo);}
function amiGo(){const a=amiCfg(),rv=amiRivals()[a.r],ST=AMI_ST[a.s]||AMI_ST[0];const sel=META.sel.l;META.sel.l=a.l;newRun('amistoso');META.sel.l=sel;P.venue=a.v;P.ami=1;
 for(let i=0;i<3;i++)P.deck.push(mkc(rollCard('elite'),chance(.3)));
 let def;if(rv.leg){def=Object.assign({},EN[rv.leg],{sty:rv.sty,boss:0});def.hp=Math.round(EN[rv.leg].hp*.62+LUCH[a.l].hp*.35);}
 else{const R_=AMI_R[rv.sty],Ls=LUCH[rv.sty];def={n:R_.n,hp:Ls.hp+14,m:R_.m,ai:R_.ai,sty:rv.sty,mv:deckMoves(Ls.deck),note:'Pelea con el estilo de '+Ls.n+'.'};}
 EN.amigo=def;const sc=[.8,1,1.2][a.d];const go=()=>startCombat('amigo','amistoso',{sc,stip:ST.k||null});entrance(go);}
function amiEnd(won){const a=amiCfg();META.amiW=META.amiW||{w:0,l:0};META.amiW[won?'w':'l']++;coins(won?10:3);saveMeta();sfx[won?'win':'lose']();
 showPanel('<h1>'+(won?'🏆 ¡Ganaste el amistoso!':'😵 Perdiste el amistoso')+'</h1><p>⭐ +'+(won?10:3)+'\nRécord en amistosos: '+META.amiW.w+'G - '+META.amiW.l+'P'+casiTxt()+'</p>');P=null;
 addBtn('🔁 Revancha','gold',amiGo);shareBtn();addBtn('⚔️ Cambiar luchadores','blu',amistoso);addBtn('Volver al menú','alt',menu);}

// ---------- 2 vs 2: compañeros en el delantal ----------
function tagMini(x,y,m,flip,trunk,sty){cx.save();cx.translate(x,y);cx.scale(1.15,1.15);try{luchador(cx,0,0,m,flip,'#d9a066',trunk,false,{style:sty});}catch(e){}cx.restore();}
function tagDraw(){if(!C)return;cx.globalAlpha=.85;if(C.beto&&!C.betoGone){tagMini(0,58,EN.kid.m,false,EN.kid.m[1],'T');}else if(!C.beto&&P.partner&&!C.relevoUsed){const L=LUCH[P.partner];tagMini(0,58,L.m,false,L.m[1],P.partner);}
 const T=C.e.tag;if(T&&!C.e.tagIn)tagMini(182,58,T.m,true,T.m[1],ESTY[T.key]||'T');cx.globalAlpha=1;}

// ---------- Nivel de luchador (1-50) ----------
function lvNeed(l){return 40+l*12;}
function lvInfo(){let x=META.lvx||0,l=1;while(l<50&&x>=lvNeed(l)){x-=lvNeed(l);l++;}return{l,x,need:lvNeed(l)};}
const LVPAT={10:'flame',20:'heart',30:'diamond'};
function lvReward(l){if(LVPAT[l])return{t:'pat',p:LVPAT[l],txt:'Diseño de máscara: '+PATN[LVPAT[l]]};if(l===50)return{t:'titulo',txt:'Título: Leyenda del Pancracio'};return l%5===0?{t:'oro',txt:'Sobre de Oro'}:{t:'coins',n:20+l*4,txt:(20+l*4)+' de fama'};}
function addXP(n){if(!META||(P&&P.tut))return;const a=lvInfo().l;META.lvx=(META.lvx||0)+n;const b=lvInfo().l;saveMeta();
 for(let l=a+1;l<=b;l++){const r=lvReward(l);if(r.t==='coins')coins(r.n);else if(r.t==='pat'){if(!META.pats.includes(r.p))META.pats.push(r.p);}else if(r.t==='titulo'){META.titulo='Leyenda del Pancracio';}else{META.ptok=META.ptok||{};META.ptok.oro=(META.ptok.oro||0)+1;}saveMeta();setTimeout(()=>toastU(null,'⬆️ <b>¡Nivel '+l+'!</b><br>Premio: '+r.txt),900+(l-a)*400);}}
// ---------- Gimnasio en pausa ----------
function idleCalc(){const now=Date.now();if(!META.lastSeen){META.lastSeen=now;saveMeta();return null;}const h=Math.min(12,(now-META.lastSeen)/3.6e6);if(h<1)return null;return{h:Math.floor(h),f:Math.round(h*4),c:Math.round(h*3)};}
function idleCollect(){const r=idleCalc();if(!r)return;META.fama+=r.f;META.total+=r.f;coins(r.c);META.lastSeen=Date.now();saveMeta();sfx.win&&sfx.win();toastU(null,'🏋️ Tu luchador entrenó '+r.h+' h<br><b>+'+(r.f+r.c)+'⭐</b>');setTimeout(menu,300);}
// ---------- Metas pendientes ----------
function goalsHTML(){const G=[];const lv=lvInfo();
 const idle=idleCalc();if(idle)G.push('<button class="goal hot" data-k="idle">🏋️ Tu luchador entrenó '+idle.h+' h · <b>Recoger +'+(idle.f+idle.c)+'⭐</b></button>');
 const tk=META.ptok||{};const nt=(tk.arena||0)+(tk.oro||0);if(nt>0)G.push('<button class="goal hot" data-k="packs">🎁 Tienes <b>'+nt+' sobre'+(nt>1?'s':'')+'</b> por abrir</button>');
 else if(META.freePack!==todayStr()&&mOk('packs'))G.push('<button class="goal" data-k="packs">🎁 Tu sobre gratis de hoy está listo</button>');
 const lk=Object.keys(MUNL).filter(k=>!mOk(k)).map(k=>{const m=/Gana (\d+)|primera/.exec(MUNL[k][0]);const need=m?(m[1]?+m[1]:1):null;return need?{k,left:need-(META.fw||0)}:null;}).filter(Boolean).sort((a,b)=>a.left-b.left)[0];
 if(lk)G.push('<div class="goal">🔒 Te falta'+(lk.left>1?'n '+lk.left+' victorias':' 1 victoria')+' para <b>'+MUNM[lk.k]+'</b></div>');
 if((META.total||0)>200&&(!META.bkLast||Date.now()-META.bkLast>7*864e5))G.unshift('<button class="goal hot" data-k="bk">💾 Guarda tu código de respaldo para no perder tu progreso</button>');
 if(META.col){const tot=Object.keys(CARDS).filter(id=>CARDS[id].t!=='lesion'&&!CARDS[id].useless).length,own=Object.keys(META.col).length;if(G.length<3)G.push('<div class="goal">🃏 Colección: <b>'+own+'/'+tot+'</b> cartas</div>');}
 if(G.length<3&&META.streak&&META.streak.n>=1){const n=META.streak.n,nx=n+1;G.push('<div class="goal">🔥 Racha de '+n+' día'+(n>1?'s':'')+' · mañana: '+(nx%7===0?'<b>Sobre de Oro</b>':nx%3===0?'<b>Sobre de Arena</b>':'+'+(10*Math.min(nx,7))+'⭐')+'</div>');}
 const r=lvReward(lv.l+1);return'<div class="lvbar"><b>Nivel '+lv.l+'</b><div class="lvb"><i style="width:'+Math.round(lv.x/lv.need*100)+'%"></i><span>'+lv.x+'/'+lv.need+' · Próximo: '+r.txt+'</span></div></div><div class="goals">'+G.slice(0,3).join('')+'</div>';}
// ---------- Lucha rápida ----------
function quickGo(){const ks=META.unl.length?META.unl:['T'];const l=pick(ks);const sel=META.sel.l;META.sel.l=l;newRun('rapida');META.sel.l=sel;const mc=Math.min(6,META.maxCh||0);P.venue=RI(0,Math.max(1,mc));P.act=Math.min(2,[0,0,0,1,1,2,2][mc]);
 for(let i=0;i<2+Math.floor(mc/2);i++)P.deck.push(mkc(rollCard(chance(.3)?'elite':'normal'),chance(.25)));
 const pool=ACTS[P.act].pool.filter(k=>EN[k]);const k=pick(pool);const stip=chance(.25)?pick(Object.keys(STIPS)):null;const go=()=>startCombat(k,'rapida',{sc:1+mc*.06,stip});entrance(go);}
function quickEnd(won){const c=won?12:4;coins(c);META.qW=META.qW||{w:0,l:0};META.qW[won?'w':'l']++;saveMeta();sfx[won?'win':'lose']();
 showPanel('<h1>'+(won?'⚡ ¡Ganaste la lucha rápida!':'⚡ Esta vez no')+'</h1><p>⭐ +'+c+' · ✨ +'+(won?12:5)+' XP<br>Récord: '+META.qW.w+'G - '+META.qW.l+'P'+casiTxt()+'</p>');P=null;
 addBtn('⚡ Otra lucha rápida','gold',quickGo);shareBtn();addBtn('Volver al menú','alt',menu);}

// ---------- Trofeo: ganar la máscara ----------
function maskTrophy(key,m,turns,ex,cb){P.bm=P.bm||[];if(!P.bm.some(x=>x.k===key))P.bm.push({k:key,m});saveRun();
 const n=EN[key].n,slots=[0,1,2,3,4,5,6].map(i=>{const x=P.bm[i];return'<div class="tslot'+(x?' on':'')+(x&&x.k===key?' nw':'')+'">'+(x?ic('mascara','',x.m):'?')+'</div>';}).join('');
 showPanel('<div class="troph"><div class="trays"></div><div class="tlab">¡MÁSCARA CONTRA MÁSCARA!</div><div class="tmask">'+ic('mascara','',m)+'</div><h1 class="tttl">¡GANASTE LA MÁSCARA<br>DE '+n.toUpperCase()+'!</h1><p class="small" style="text-align:center">'+ex+'</p><div class="tstat"><span>⏱ '+turns+' turnos</span><span>❤ '+P.hp+'/'+P.max+'</span></div><div class="tcol">'+slots+'</div><p class="small" style="text-align:center">Máscaras ganadas: '+P.bm.length+' de 7</p></div>');
 sfx.crowd();vib([60,40,60,40,200]);confetti(60);setTimeout(()=>confetti(50),W(700));setTimeout(()=>{confetti(40);sfx.win&&sfx.win();},W(1400));
 voz([{t:'¡Se le cae la máscara! ¡'+pnm()+' gana la máscara de '+n+'!',p:1.25,r:1.12}],true);
 setTimeout(()=>{addBtn('🎭 ¡Levantar la máscara!','gold',cb);},W(1200));}

// ---------- Temporizador de turno (30 s) ----------
let TMI=null;
function tmOn(){return C&&!C.tut&&!C.over&&META.opt.timer!==0;}
function tmTxt(){return tmOn()&&C.tLeft!=null&&!C.busy?' <b class="tmn'+(C.tLeft<=10?' hot':'')+'">'+C.tLeft+'</b>':'';}
function tmMax(){return isStory()?[45,30,20][DIF()]||30:30;}
function tmStart(){if(!C)return;C.tLeft=tmMax();if(C.turn===1&&tmOn())setTimeout(()=>hint('timer','⏱️ Tienes '+tmMax()+' segundos por turno (lo ves en el botón Listo). Si se acaba, tu turno termina solo.'),W(900));if(TMI)return;TMI=setInterval(()=>{if(!C||C.over){clearInterval(TMI);TMI=null;return;}
 if(!tmOn()||C.busy||HIDDEN)return;const ov=$('#ov');if(ov&&ov.classList&&ov.classList.contains&&ov.classList.contains('on'))return;const z=$('#zoom');if(z&&z.classList&&z.classList.contains&&z.classList.contains('on'))return;
 C.tLeft=Math.max(0,(C.tLeft==null?tmMax():C.tLeft)-1);if(C.tLeft<=5&&C.tLeft>0){try{beep(880,.05,'square',.03);}catch(e){}}
 if(C.tLeft===0){C.tLeft=null;shout('¡SE ACABÓ EL TIEMPO!');setLog('⏱️ Se te acabó el tiempo: tu turno terminó.');endTurn();return;}
 const b=$('#endT');if(b){const sp=b.querySelector?b.querySelector('span'):null;if(sp)sp.innerHTML='LISTO'+tmTxt();}},1000);}
// ---------- Expositor de máscaras ----------
const BOSSK=['panzon','charrooro','emperador','carnicero','siniestro','inmortal','veneno'];
function vitrinaView(back){back=typeof back==='function'?back:menu;const U=META.unmasked||[];const has_=k=>U.includes(k)||(k==='veneno'&&U.includes('venenoH'));
 const extra=U.filter(k=>EN[k]&&!BOSSK.includes(k)&&k!=='venenoH');const list=BOSSK.concat(extra);const won=list.filter(has_).length;
 let h='<h1>🎭 Expositor de máscaras</h1><p class="small" style="text-align:center">'+won+' de '+list.length+' máscaras · Toca una para ver su historia</p><div class="expo">';
 list.forEach((k,i)=>{const E=EN[k],ok=has_(k);h+='<div class="exs'+(ok?' on':'')+'" data-k="'+k+'"><div class="exl"></div><div class="exm">'+(ok?ic('mascara','',E.m):ic('mascara','',['#1a1020','#2a2040']))+'</div><div class="exp">'+(ok?E.n:'???')+'</div></div>';if(i%3===2)h+='<div class="exsh"></div>';});
 showPanel(h+'<div class="exsh"></div></div>');
 document.querySelectorAll('#pn .exs').forEach(el=>el.onclick=()=>{const k=el.dataset.k,E=EN[k];sfx.card();if(!has_(k)){flashMsg(k==='veneno'?'La máscara final. Gánala en el último capítulo.':'Todavía no ganas esta máscara.');return;}
  showPanel('<h1>'+E.n+'</h1><div class="tmask">'+ic('mascara','',E.m)+'</div><p>'+(VBIO[k]||E.note||'Una máscara más para tu colección.')+'</p>');addBtn('Volver al expositor','alt',()=>vitrinaView(back));});
 addBtn('Volver','alt',back);}
// ---------- Vanessa: si no le das tiempo ----------
function vaneTime(){P.vaneN=0;}
function vaneTick(){if(P.love!=='vane'&&P.love!=='pareja')return null;P.vaneN=(P.vaneN||0)+1;const n=P.vaneN;
 if(n===2)return[['vane',pick(['Ya casi no te veo, {n}. Siempre es el gimnasio, la arena, los compas...','¿Sabes cuándo fue la última vez que salimos? Yo sí me acuerdo.','Estoy cansada de ser la última de tu lista.'])],['nar','Vanessa necesita que le dediques tiempo. Búscala en tu tiempo libre.']];
 if(n>=3){const r=pick(['corta','engaña','cansada']);P.love='over';REL('mama',-1);
  if(r==='corta')return[['vane','No te voy a esperar toda la vida, {n}. Se acabó.'],['nar','Vanessa te deja. Su lado de la cama se queda frío.']];
  if(r==='engaña')return[['nar','Tu primo te manda una foto: Vanessa en el cine... con otro.'],['vane','(mensaje) Tú nunca estabas. Él sí. Lo siento.']];
  return[['vane','Me cansé, {n}. De esperarte, de verte llegar golpeado, de que la lucha sea primero. Ya no puedo.'],['nar','Vanessa se va con sus cosas en dos bolsas del súper.']];}
 return null;}
function vaneVisit(cb){vaneTime();runStory(pickUnused(['vane_cita','vane_acapulco'])||'vane_cita',cb);}
// ---------- Retratos con expresiones ----------
const PORTC={};
const PORTDEF={
 mama:{sk:'#c98a5a',hair:'#2a1a12',hs:'bun',ear:'#ffd23f',lip:'#b0303a',shirt:'#3b8f6a'},
 abuelo:{sk:'#a8703f',hair:'#e8e8e8',hs:'bald',must:'#e8e8e8',wr:1,shirt:'#7a4a2a',gl:1},
 papa:{sk:'#b87a48',hair:'#1a1210',hs:'short',must:'#1a1210',cap:'#c0392b',shirt:'#3b5fa0'},
 hermano:{sk:'#c98a5a',hair:'#1a1210',hs:'spiky',capb:'#2ecc71',shirt:'#ffd23f'},
 beto:{sk:'#c08050',hair:'#1a1210',hs:'spiky',band:'#2ecc71',shirt:'#2a2a2a'},
 alacran:{mask:['#111111','#c0392b'],eyes:'#ff2a2a',shirt:'#111',scor:1},
 chuy:{sk:'#a8703f',hair:'#9a9a9a',hs:'bald',beard:'#9a9a9a',wr:1,shirt:'#c0392b',whistle:1},
 lupe:{sk:'#b87a48',hair:'#cfcfcf',hs:'bun',gl:1,wr:1,shirt:'#8e44ad',rebozo:'#5a2a6a'},
 lic:{sk:'#d0a070',hair:'#111',hs:'slick',sun:1,shirt:'#2a2a3a',gold:1},
 vane:{sk:'#c98a5a',hair:'#1a0e0a',hs:'long',ear:'#ffd23f',lip:'#e8287a',lash:1,shirt:'#ff2e88'},
 doc:{sk:'#d0a070',hair:'#3a2416',hs:'bun',gl:1,shirt:'#f0f0f0'},
 reporter:{sk:'#c98a5a',hair:'#6a3a1a',hs:'long',lip:'#c0392b',shirt:'#3b6fb6'},
 fan:{sk:'#b87a48',hair:'#1a1210',hs:'short',shirt:'#e67e22'},
 chucho:{sk:'#c98a5a',hair:'#1a1210',hs:'slick',must:'#1a1210',shirt:'#1a1a2a',mic:1},
};
function portKey(w){if(w==='kid'){const c=castOf('kid');return c&&c[1]==='Beto'?'beto':'alacran';}if(w==='rep')return'rep:'+(P&&P.rep||'x');if(PORTDEF[w])return w;if(CAST[w]&&REPS[w])return'rep:'+w;return null;}
function exprOf(t){t=(t||'').toLowerCase();if(/(traidor|cállate|callate|lárgate|largate|odio|maldit|vas a ver|te voy a|ni se te ocurra|basta|me tienes harto|harta)/.test(t))return'angry';
 if(/(\.\.\.|llor|triste|perd[oó]n|muri|extra[ñn]o|lo siento|cansad|no puedo|duele|adiós|adios)/.test(t))return'sad';
 if(/(jaja|bien hecho|orgullo|felic|gracias|bravo|campe[oó]n|te quiero|¡eso|vamos|ganaste|ganamos|qué bonito|que bonito)/.test(t))return'happy';
 if((t.match(/!/g)||[]).length>=2)return'shout';return'neutral';}
function portrait(w,ex,yoMask){const k=w==='yo'?'yo':portKey(w);if(!k)return null;const id=k+':'+ex+(w==='yo'&&yoMask?yoMask.join(''):'');if(PORTC[id])return PORTC[id];
 let D=PORTDEF[k];if(k.startsWith('rep:')){const n=k.slice(4),h=[...n].reduce((a,c)=>a+c.charCodeAt(0),0);D={sk:['#c98a5a','#a8703f','#d0a070'][h%3],hair:['#111','#5a3a1a','#888'][h%3],hs:['slick','short','bald'][h%3],must:h%2?'#1a1210':null,sun:h%3===1,shirt:['#2a2a3a','#5a1a2a','#1a3a2a'][h%3],gold:h%2};}
 if(k==='yo')D={mask:yoMask||['#3b6fb6','#fff'],eyes:'#fff',shirt:'#c0392b'};if(!D)return null;
 const c=document.createElement('canvas');c.width=32;c.height=32;const g=c.getContext&&c.getContext('2d');if(!g)return null;const r=(x,y,w_,h,col)=>{if(!col)return;g.fillStyle=col;g.fillRect(x,y,w_,h);};
 r(0,0,32,32,'#2a1640');r(0,22,32,10,'#1c0f30');
 // cuerpo/hombros
 r(5,25,22,7,'#000');r(6,26,20,6,D.shirt||'#555');if(D.rebozo){r(5,24,22,3,D.rebozo);}if(D.gold){r(13,26,6,1,'#ffd23f');r(15,27,2,1,'#ffd23f');}if(D.whistle){r(18,26,1,4,'#ddd');r(17,29,3,2,'#bbb');}if(D.mic){r(24,18,2,9,'#222');r(23,16,4,3,'#888');}
 const masked=!!D.mask;const sk=masked?D.mask[0]:D.sk,skd=masked?D.mask[1]:'#00000033';
 // cuello y cabeza
 r(13,21,6,5,masked?'#c08050':D.sk);r(8,6,16,17,'#000');r(9,7,14,15,sk);
 if(!masked){r(9,19,14,3,'#00000018');if(D.wr){r(10,9,3,1,'#00000030');r(19,9,3,1,'#00000030');}}
 // pelo
 const H=D.hair;if(!masked&&H){if(D.hs==='bun'){r(8,4,16,5,H);r(13,1,6,4,H);r(8,6,2,8,H);r(22,6,2,8,H);}
  else if(D.hs==='bald'){r(8,8,2,6,H);r(22,8,2,6,H);}
  else if(D.hs==='short'){r(8,4,16,4,H);r(8,6,2,4,H);r(22,6,2,4,H);}
  else if(D.hs==='spiky'){r(8,4,16,4,H);for(let i=0;i<4;i++)r(9+i*4,2,2,2,H);r(8,6,2,4,H);r(22,6,2,4,H);}
  else if(D.hs==='slick'){r(8,4,16,4,H);r(8,6,1,6,H);r(23,6,1,6,H);r(10,5,10,1,'#ffffff40');}
  else if(D.hs==='long'){r(7,4,18,5,H);r(6,7,4,18,H);r(22,7,4,18,H);}}
 if(D.cap){r(7,3,18,4,D.cap);r(20,6,7,2,D.cap);}if(D.capb){r(7,3,18,4,D.capb);r(4,6,6,2,D.capb);}if(D.band){r(8,7,16,2,D.band);r(4,8,4,1,D.band);r(4,10,3,1,D.band);}
 if(masked){r(9,7,14,15,sk);r(10,10,5,4,skd);r(17,10,5,4,skd);r(14,7,4,5,skd);r(12,17,8,4,skd);if(D.scor){r(15,2,2,5,'#c0392b');r(16,1,3,2,'#c0392b');r(18,2,1,2,'#c0392b');}}
 // ojos y cejas según expresión
 const eye=masked?(D.eyes||'#fff'):'#1a1010';const ey=12;
 if(ex==='happy'&&!masked){r(11,ey,4,1,eye);r(17,ey,4,1,eye);r(11,ey-1,1,1,eye);r(14,ey-1,1,1,eye);r(17,ey-1,1,1,eye);r(20,ey-1,1,1,eye);}
 else{r(12,ey-1,2,2,eye);r(18,ey-1,2,2,eye);if(!masked){r(12,ey-1,1,1,'#fff');r(18,ey-1,1,1,'#fff');}}
 if(D.lash){r(11,ey-2,1,1,'#000');r(20,ey-2,1,1,'#000');}
 const bc=masked?'#000':(D.hair&&D.hs!=='bald'?D.hair:'#5a3a26');
 if(ex==='angry'||ex==='shout'&&masked){r(11,ey-3,2,1,bc);r(13,ey-2,2,1,bc);r(19,ey-3,2,1,bc);r(17,ey-2,2,1,bc);}
 else if(ex==='sad'){r(11,ey-2,2,1,bc);r(13,ey-3,2,1,bc);r(19,ey-2,2,1,bc);r(17,ey-3,2,1,bc);if(!masked){r(12,ey+2,1,2,'#7fd0ff');}}
 else{r(11,ey-3,4,1,bc);r(17,ey-3,4,1,bc);}
 if(D.gl){r(10,ey-2,5,4,'#00000000');g.strokeStyle='#222';g.lineWidth=1;g.strokeRect(10.5,ey-2.5,5,4);g.strokeRect(16.5,ey-2.5,5,4);r(15,ey-1,2,1,'#222');}
 if(D.sun){r(10,ey-2,5,3,'#111');r(17,ey-2,5,3,'#111');r(15,ey-2,2,1,'#111');r(11,ey-2,1,1,'#fff6');}
 if(!masked){r(15,14,2,3,'#00000028');}
 // boca
 const my=18,ml=D.lip||(masked?'#000':'#5a1a1a');
 if(ex==='happy'){r(13,my,6,1,ml);r(12,my-1,1,1,ml);r(19,my-1,1,1,ml);r(14,my+1,4,1,'#fff');}
 else if(ex==='sad'){r(13,my,6,1,ml);r(12,my+1,1,1,ml);r(19,my+1,1,1,ml);}
 else if(ex==='angry'){r(13,my,6,2,ml);r(14,my,1,1,'#fff');r(17,my,1,1,'#fff');}
 else if(ex==='shout'){r(14,my-1,4,4,'#3a0a0a');r(14,my-1,4,1,'#fff');}
 else r(13,my,6,1,ml);
 if(D.must){r(12,my-2,8,2,D.must);}if(D.beard){r(10,my-1,12,5,D.beard);r(14,my,4,1,'#5a1a1a');}
 if(D.ear){r(8,15,1,2,D.ear);r(23,15,1,2,D.ear);}
 const u=c.toDataURL();PORTC[id]=u;return u;}
function portHTML(w,t,big){const yo=w==='yo'?playerMask():null;const u=portrait(w,exprOf(t),yo&&[yo[0],yo[1]]);return u?'<img class="por'+(big?' big':'')+'" src="'+u+'" alt="">':null;}
// ---------- Golpes con peso ----------
const CATCOL={golpe:'#ff5252',air:'#57b8ff',llave:'#c77dff',fin:'#ffd23f',def:'#8ec5ff'};
function juice(who,r){if(!C||r<=0)return;const big=r>=14;C.anim.stop=Math.max(C.anim.stop||0,Math.min(9,Math.round(r/3)));
 const x=who==='e'?164:36,y=44;for(let i=0;i<Math.min(12,4+Math.round(r/3));i++)PARTS.push({x:x+R(-4,4),y:y+R(-6,2),vx:R(-1.3,1.3),vy:R(-1.6,-.3),g:.12,l:R(14,24),c:i%3?'#bfe6ff':'#ffffff'});
 if(big){C.flash=3;const w=$('#ringwrap');if(w&&w.classList){const cl=who==='e'?'zoomE':'zoomP';w.classList.remove('zoomE','zoomP');void w.offsetWidth;w.classList.add(cl);setTimeout(()=>w.classList.remove(cl),420);}}
 if(r>=10){const w=$('#ringwrap');if(w&&w.classList){w.classList.remove('slam');void w.offsetWidth;w.classList.add('slam');}}}
// ---------- Kid Alacrán: provocaciones ----------
const TAUNT=['¿Te acuerdas del patio, {n}? Ahí siempre perdías.','¡Esta arena es mía! Tú solo vienes de visita.','El abuelo estaría avergonzado de verte así.','¡Levántate! Quiero que todos vean cómo te quito la máscara.','Yo sí hice lo que había que hacer para llegar. ¿Y tú?','¡Mírate! Sigues siendo el mismo chamaco de la lona parchada.','Nadie se acuerda de los que luchan limpio, {n}.'];


// ---------- Arco de Beto ----------
let BETO=0;
function betoRelevo(){if(C.betoGone){C.relevoUsed=true;flashMsg('Beto ya no está en tu esquina...');return;}if(C.betoUsed>=(C.beto===1?2:1)){C.relevoUsed=true;flashMsg('Beto necesita recuperar el aire.');return;}C.betoUsed=(C.betoUsed||0)+1;C.relevoUsed=C.betoUsed>=(C.beto===1?2:1);const E=C.e;sfx.slap();shout('¡RELEVO! ¡ENTRA BETO!');voz([{t:'¡Relevo! ¡Entra Beto!',p:1.45,r:1.15}],true);
 C.mv={who:'p',type:'air',t:0,dur:30};hurtE(dmgCalc(14,{st:{}},E),'x');addAff(2);healP(8);setLog('🤝 Beto entra volando: ¡topé suicida! Tú recuperas el aire (+8 de vida).');setTimeout(()=>say('kid',pick(['¡Como en el patio, carnal!','¡Tú y yo, hasta el estadio!','¡Te cubro, carnal!'])),W(400));
 if(E.hp<=0)return win();render();}
function betrayal(){C.betoGone=1;C.busy=true;C.over=true;const k=RR('kid');render();
 const seq=[];
 if(k>=1){seq.push(()=>{say('kid','Perdóname, carnal...');setLog('😶 Estiras la mano para el relevo. Beto te mira... y se baja del ring.');});}
 else if(k<=-1){seq.push(()=>{say('kid','Nada personal, {n}.');setLog('🗡️ Estiras la mano para el relevo... y Beto te golpea por la espalda.');hurtP(12);shake();sfx.big();});}
 else seq.push(()=>{say('kid','...');setLog('😶 Estiras la mano para el relevo. Beto se da la vuelta y camina hacia los vestidores.');});
 seq.push(()=>{shout('¡BETO SE BAJA DEL RING!');sfx.crowd();vib([80,60,80]);com&&com('revive');});
 seq.push(()=>{setLog('Los dos gemelos se te echan encima. Nadie llega a ayudarte.');hurtP(10);shake();});
 seq.push(()=>{hurtP(8);sfx.big();});
 seq.push(()=>{count123(()=>{P.hp=Math.max(1,Math.round(P.max*.35));C=null;musicStop();P.row++;saveRun();
  talk([['chucho','¡No lo puedo creer! ¡Beto abandonó a su compañero!'],['nar','El réferi cuenta tres. La gente le avienta vasos a Beto mientras se va por el pasillo... y él no voltea.']],showMap);});});
 let t=0;seq.forEach((f,i)=>{setTimeout(()=>{try{f();}catch(e){}},W(t));t+=i===seq.length-2?900:1300;});}
// Variante de la traición según la relación
function betoTraicion(){const k=RR('kid');P.rel.kid=Math.min(k,0)-2+(k>=1?1:0);
 const L=[['nar','En el vestidor, Beto se está quitando las vendas. El Licenciado Barrera sale por la puerta de atrás, guardándose un sobre.'],['yo','¿Por qué, Beto?'],
  ['kid','Me ofrecieron el lugar estelar si te dejaba caer.'],['kid','Llevo años detrás de ti, {n}. Siempre el segundo. Ya me cansé.']];
 if(k>=1)L.push(['kid','(con la voz rota) Lo siento, carnal. De verdad. Pero tenía que hacerlo.']);else if(k<=-1)L.push(['kid','Y ni creas que me arrepiento.']);
 L.push(['kid','Y ya no me digas Beto. Desde hoy soy Kid Alacrán.']);
 return{l:L,who:'kid',q:'Tu amigo de toda la vida te dio la espalda.',o:[
  ['🤝 "Algún día vas a regresar, Beto"',()=>{P.flags.kidHeel=1;REL('kid',1);return[['nar','Se detiene en la puerta un segundo... y se va sin voltear.']];}],
  ['😤 "Desde hoy eres mi rival"',()=>{P.flags.kidHeel=1;REL('kid',-1);LH.pf(2);return[['kid','Por fin dices algo inteligente.'],['nar','Conviertes el coraje en furia: +2 en tu próxima lucha.']];}],
  ['👊 Empujarlo frente a todos',()=>{P.flags.kidHeel=1;REL('kid',-2);LH.f(8);return[['kid','Ahí está. Ahora sí somos enemigos.'],['chuy','¡Sepárense! ¡Esto es un gimnasio, no una cantina!']];}]]};}
const BETO_ST={
 lic_contrata:()=>({l:[['nar','Cuando bajan del ring, un señor de traje brilloso los espera junto a la salida, con una sonrisa de oreja a oreja.'],['lic','Licenciado Barrera, promotor. Llevo veinte años en esto y nunca había visto a dos chamacos moverse así.'],['lic','Ese relevo... ¡esa química! Los quiero a los dos en mis carteles. Hoy mismo.'],['kid','¿Los dos? ¿En serio? ¡Carnal, nos van a pagar!'],['lic','Poquito al principio, eh. Pero si llenan, crecemos todos.']],who:'lic',q:'El Licenciado les extiende la mano.',o:[
  ['🤝 Firmar los dos juntos',()=>{REL('kid',1);REL('lic',1);return[['kid','¡Hasta el estadio, carnal!'],['lic','(guardándose las firmas) Así me gusta. Juntitos.']];}],
  ['🧐 Preguntar cuánto les va a pagar',()=>{REL('lic',-1);LH.g(10);return[['lic','Qué preguntón... Está bien: diez pesos más para cada uno.'],['kid','(en voz baja) No le busques, carnal. Ya estamos adentro.']];}]]}),
 beto_segundo:()=>({l:[['nar','El cartel de la kermés ya está pegado en la tienda de la esquina.'],['nar','Tu nombre va en letras grandes, en la lucha estelar. El de Beto, chiquito, en la primera lucha de la tarde.'],['lic','La gente pide al de la máscara del abuelo. Negocios son negocios, Beto.'],['kid','(sonríe) No pasa nada, carnal. A ti te toca brillar.']],who:'kid',q:'Beto sonríe... pero no te mira a los ojos.',o:[
  ['📣 Pedirle al Licenciado que los ponga juntos',()=>{REL('kid',2);REL('lic',-1);return[['lic','(suspira) Está bien... pero si no venden, me lo pagan ustedes.'],['kid','Gracias, carnal. En serio.']];}],
  ['😅 "Ya te tocará, Beto"',()=>{REL('kid',-1);return[['kid','Claro... como a ti todo te sale.'],['nar','Lo dice riéndose. Pero se queda callado el resto de la tarde.']];}],
  ['🍺 Invitarle unas cervezas después',()=>{REL('kid',1);drinkUp(1);LH.hp(-4);return[['kid','Tu abuelo nunca me enseñó esa llave a mí, ¿sabías? Solo a ti.'],['nar','Lo dice como broma. Ninguno de los dos se ríe.']];}]]}),
 beto_casa:()=>({l:[['nar','Son las once de la noche y Beto toca a tu puerta con una mochila.'],['kid','Mi jefe me corrió de la casa, carnal. Y debemos tres meses de renta. Mi mamá no sabe qué hacer.'],['kid','Necesito ganar más... mucho más.']],who:'kid',q:'Beto está en tu puerta.',o:[
  ['💵 Prestarle $30',()=>{LH.g(-30);REL('kid',2);return[['kid','Te lo pago, carnal. Te lo juro por el abuelo.']];},()=>P.gold>=30],
  ['🏠 "Quédate en mi casa"',()=>{REL('kid',2);REL('mama',-1);return[['mama','¿Otra boca más? Ay, mijo... bueno, que se quede.'],['kid','Nunca se me va a olvidar, carnal.']];}],
  ['😓 "Ahorita no puedo, Beto"',()=>{REL('kid',-2);return[['kid','Ah... ok. Ya me las arreglo.'],['nar','Se va caminando bajo la lluvia.']];}]]}),
 lic_coche:()=>({l:[['nar','Saliendo del gimnasio ves un coche negro estacionado en la esquina, con los vidrios polarizados.'],['nar','Se abre la puerta y se baja Beto. Desde adentro, el Licenciado Barrera le da una palmada en la espalda.'],['kid','(al verte) ¡Carnal! Nada... me dio un aventón.']],who:'kid',q:'Beto se ve nervioso.',o:[
  ['🤔 Preguntarle de qué hablaron',()=>{REL('kid',-1);return[['kid','¿Ahora me vas a vigilar? Ni que fueras mi mamá.']];}],
  ['🙂 No darle importancia',()=>{REL('kid',1);return[['kid','Vamos por unos tacos, yo invito. ¡Hoy sí traigo!'],['nar','Paga con un billete de quinientos. Nunca había traído uno.']];}]]}),
 traicion_previa:()=>({l:[['lic','¡Muchachos! Tengo algo grande: lucha de parejas en la Arena del barrio. Ustedes contra los Gemelos Infernales.'],['lic','Si ganan, los dos suben al cartel estelar. Les doy mi palabra.'],['kid','(sin verte) Como en el patio, ¿no, carnal?'],['chuy','(en voz baja) Hay algo en ese Licenciado que no me gusta, {n}.']],who:'kid',q:'Mañana luchan juntos otra vez.',o:[
  ['🤙 "Como en el patio, Beto"',()=>{REL('kid',1);return[['kid','...Sí. Como en el patio.']];}],
  ['🏋️ Entrenar el relevo toda la tarde',()=>{LH.up(1);return[['nar','Practican el relevo hasta que oscurece. Beto casi no habla.']];}]]}),
 kid_traicion:()=>betoTraicion(),
 beto_3am:()=>({l:[['nar','3:12 de la madrugada. Te vibra el celular.'],['nar','"Beto está escribiendo..."'],['nar','"Beto está escribiendo..."'],['nar','El mensaje nunca llega. A la mañana siguiente ves que te escribió algo... y lo borró.']],who:'kid',q:'¿Le escribes?',o:[
  ['📱 "¿Qué me ibas a decir, Beto?"',()=>{REL('kid',1);return[['kid','(horas después) Nada. Se me fue el dedo.'],['nar','Pero te dejó en visto con el emoji del meñique.']];}],
  ['🔕 Dejarlo así',()=>{LH.pb(3);return[['nar','Apagas el celular y te pones a entrenar.']];}]]}),
 beto_patio:()=>({l:[['nar','Pasas por el patio de Doña Lupe camino a casa de tu mamá.'],['nar','Ahí está Beto, sentado solo en la orilla de la lona vieja. Con la máscara en las manos.'],['lupe','(desde la ventana) Viene seguido, ¿sabes? Se sienta ahí y no dice nada.']],who:'kid',q:'Beto no te ha visto.',o:[
  ['🪑 Sentarte junto a él sin decir nada',()=>{REL('kid',2);return[['nar','Se quedan un rato viendo la lona parchada. Ninguno dice nada. Antes de irse, Beto te da una palmada en el hombro.']];}],
  ['🚶 Seguir de largo',()=>{return[['nar','Sigues caminando. Cuando volteas, Beto ya no está.']];}],
  ['📣 "¿Ya te arrepentiste, Alacrán?"',()=>{REL('kid',-2);LH.pf(1);return[['kid','(se pone la máscara) Nunca.']];}]]}),
 lic_revela:()=>({l:[['nar','La noche antes de la gran lucha, Doña Lupe te da un sobre amarillo que alguien dejó olvidado en su patio.'],['nar','Adentro hay un contrato firmado por el Licenciado Barrera: "Bono por abandonar al compañero en la lucha de parejas. Promoción de la rivalidad: 40% para la empresa".'],['chuy','Ese desgraciado lo planeó todo desde el principio, {n}. Los juntó, los separó... y ahora cobra boletos con su pleito.'],['lic','(al teléfono, sin saber que lo escuchas) Mañana se rompen la cara y yo me hago millonario. Así es este negocio.']],who:'lic',q:'Tienes la prueba en tus manos.',o:[
  ['📞 Enseñarle el contrato a Beto',()=>{REL('kid',2);REL('lic',-3);return[['kid','(después de un largo silencio) Me usó... nos usó a los dos.'],['kid','Mañana luchamos como en el patio, carnal. Limpio. Y el Licenciado que se busque otro negocio.']];}],
  ['📰 Mandárselo a la prensa',()=>{REL('lic',-3);LH.f(20);return[['chucho','¡Escándalo! ¡El promotor Barrera arregló la traición del siglo!'],['nar','La Comisión le quita la licencia al Licenciado. Mañana, la arena es solo de ustedes dos.']];}],
  ['🤐 Guardarlo y concentrarte',()=>{LH.pb(5);return[['nar','Lo guardas en tu maleta. Primero la lucha... después las cuentas.']];}]]})};
const BETO_END={hi:[['nar','Beto se queda de rodillas, sin máscara, en el centro del ring.'],['kid','Ganaste, carnal. Como siempre.'],['yo','Ganamos, Beto. Los dos niños del patio, en el estadio.'],['nar','Lo levantas y se abrazan. Sesenta mil personas se ponen de pie.']],
 mid:[['nar','Beto se levanta sin máscara. Se miran un largo rato.'],['nar','No hay abrazo. No hay insultos. Solo un gesto con la cabeza... y se va por el pasillo.']],
 lo:[['kid','(escupe en la lona) Esto no se acaba aquí, {n}.'],['nar','Se baja del ring entre abucheos, sin voltear a ver a nadie.']]};

// ---------- Gradas extra (llenan el espacio de arriba) ----------
function drawStands(vt,V){const E=REXT,T=tk,hype=C?C.aff:2;
 if(vt<=1){cx.fillStyle='#ffffff';for(let i=0;i<70;i++){const x=(i*53)%200,y=(i*37)%Math.max(1,E-10);if(((T>>4)+i)%9)cx.fillRect(x,y,1,1);}
  if(vt===0){// azoteas de la vecindad: tinacos, antenas y tendederos
   const hb=E+20,sc_=Math.max(1,E/50);const roofs=[[0,22,'#2a2244'],[22,30,'#322a52'],[52,18,'#2a2244'],[70,34,'#382e5a'],[104,20,'#2a2244'],[124,28,'#322a52'],[152,16,'#2a2244'],[168,32,'#382e5a']];
   roofs.forEach(([x,h0,c],i)=>{const h=Math.round(h0*sc_);cx.fillStyle=c;cx.fillRect(x,hb-h,x===168?32:30,h+20);cx.fillStyle=((T>>5)+i)%5?'#ffd27a':'#3a2a20';cx.fillRect(x+6,hb-h+6,4,4);if(i%2)cx.fillRect(x+16,hb-h+6,4,4);
    if(i%3===0){cx.fillStyle='#2a2a2a';cx.fillRect(x+12,hb-h-8,8,8);cx.fillStyle='#3a3a3a';cx.fillRect(x+12,hb-h-9,8,2);}if(i%3===1){cx.fillStyle='#888';cx.fillRect(x+20,hb-h-14,1,14);cx.fillRect(x+16,hb-h-12,9,1);cx.fillRect(x+18,hb-h-9,5,1);}});
   const cl=['#e74c3c','#3b6fb6','#ffd23f','#fff','#2ecc71','#ff2e88'];for(let k=0;k<2;k++){const y0=Math.round(E*.25)+k*14;for(let x=0;x<200;x+=10){const y=y0+Math.round(Math.sin(x/200*Math.PI)*6);cx.fillStyle='#555';cx.fillRect(x,y,10,1);cx.fillStyle=((x/10+(T>>4)+k)%3)?cl[(x/10+k)%6]:'#222';cx.fillRect(x+4,y+1,2,2);}}}
  else{// feria: rueda de la fortuna grande y cohetes
   const wx=58,r=Math.min(44,E*.42),wy=Math.max(r+6,E*.5),a0=T/120;cx.fillStyle='#6a6a88';for(let i=0;i<12;i++){const a=a0+i*Math.PI/6;for(let k=0;k<r;k+=2)cx.fillRect(Math.round(wx+Math.cos(a)*k),Math.round(wy+Math.sin(a)*k),1,1);cx.fillStyle=['#e74c3c','#ffd23f','#3b6fb6','#2ecc71'][i%4];cx.fillRect(Math.round(wx+Math.cos(a)*r)-2,Math.round(wy+Math.sin(a)*r),5,4);cx.fillStyle=((T>>3)+i)%2?'#fff6c8':'#6a6a88';}
   cx.fillStyle='#6a6a88';cx.fillRect(wx-1,wy,2,E+40-wy);if(T%140===0)for(let i=0;i<24;i++){const ang=i/24*Math.PI*2;PARTS.push({x:150,y:20-E,vx:Math.cos(ang)*1.2,vy:Math.sin(ang)*1.2,g:.02,l:40,c:pick(['#ffd23f','#ff2e88','#3bf','#fff'])});}}
  cx.fillStyle='#ffffff10';cx.beginPath();cx.moveTo(100,0);cx.lineTo(40,E+40);cx.lineTo(160,E+40);cx.fill();return;}
 // armadura de luces
 cx.fillStyle='#2a2a3a';cx.fillRect(0,4,200,3);for(let x=4;x<200;x+=8){cx.fillRect(x,7,1,3);}
 const lc=vt>=5?['#fff6c8','#ff2e88','#3bf']:['#fff6c8'];for(let i=0;i<8;i++){const x=12+i*25;cx.fillStyle='#111';cx.fillRect(x-2,9,5,4);cx.fillStyle=(T>>3)%8===i&&vt>=4?'#fff':lc[i%lc.length];cx.fillRect(x-1,12,3,2);}
 if(vt>=3){cx.fillStyle='#ffffff0b';for(let i=0;i<3;i++){const sw=Math.round(Math.sin(T/50+i*2)*30);cx.beginPath();cx.moveTo(40+i*60,14);cx.lineTo(25+i*60+sw,E+44);cx.lineTo(55+i*60+sw,E+44);cx.fill();}}
 // filas de gradas con público
 const rows=Math.floor((E-16)/7);const cols=['#ff2e88','#ffd23f','#3b6fb6','#fff','#2ecc71','#e67e22'];
 for(let r=0;r<rows;r++){const y=18+r*7;cx.fillStyle=r%2?'#1a1030':'#160c28';cx.fillRect(0,y+4,200,3);const dens=Math.min(1,V.crowd+.15);
  for(let x=2+(r%2)*3;x<198;x+=5){if(((x*7+r*13)%100)/100>dens)continue;const j=(Math.floor(T/(hype>7?4:8)+x+r)%3===0&&hype>3)?(hype>7?2:1):0;cx.globalAlpha=.35+.06*r;
   cx.fillStyle=cols[(x+r)%6];cx.fillRect(x,y+1-j,2,3);cx.fillStyle='#c8905e';cx.fillRect(x,y-1-j,2,2);if(hype>6&&(x+r)%4===0){cx.fillStyle=cols[(x+r)%6];cx.fillRect(x-1,y-3-j,1,2);cx.fillRect(x+2,y-3-j,1,2);}}}
 cx.globalAlpha=1;
 if(vt>=4){cx.fillStyle='#000';cx.fillRect(60,16,80,Math.min(34,E-20));cx.fillStyle='#0f2a48';cx.fillRect(61,17,78,Math.min(32,E-22));cx.font='bold 7px monospace';cx.textAlign='center';cx.fillStyle='#ffd23f';cx.fillText(C?'¡MÁSCARA CONTRA MÁSCARA!':'LUCHA LIBRE',100,27);cx.fillStyle='#fff';cx.fillText(C?(pnm()+' vs '+C.e.n).slice(0,26):VEN[vt].n,100,38);cx.textAlign='left';}}

// ---------- Ajuste vertical: cartas más grandes con el espacio libre ----------
function fitHand(){const h=$('#hand'),sc=$('#scr'),rw=$('#ringwrap');if(!h||!sc||!rw||!h.style||!h.style.setProperty||!sc.clientHeight)return;
 const W=h.clientWidth||390,others=[...sc.children].filter(e=>e!==h&&e!==rw).reduce((a,e)=>a+(e.offsetHeight||0),0);
 const minRing=W*.55+50,spare=sc.clientHeight-others-minRing-196;const z=Math.max(1,Math.min(1.42,W/(118*2.55),1+Math.max(0,spare)/192));
 if(Math.abs((+h.dataset.z||1)-z)>.01){h.dataset.z=z;h.style.setProperty('--cz',z.toFixed(3));h.style.setProperty('--hh',Math.round(192*z+8)+'px');}}
// ---------- Victoria / derrota ----------
function win(){if(!C||C.over)return;try{P.lastStip=C.stip;wkFightWin(C);}catch(e){}C.over=true;C.busy=true;musicStop();render();LASTDT=C.dmgTaken;(C.surrender?(f=>{shout('¡SE RINDIÓ!');voz([{t:'¡Se rindió! ¡Se rindió!',p:1.55,r:1.2}],true);setTimeout(f,W(1000));}):count123)(()=>{const kind=C.kind,key=C.e.key,m=C.e.m,turns=C.turn;if(C.dmgTaken===0&&kind!=='tut')unlock('intocable');if(C.lastId==='rana')unlock('rana');
 if(kind==='boss'||kind==='temporada'||kind==='nemesis'){C=null;render();UNM={m,t:0};const nm=(key==='veneno'||key==='venenoH')?'Beto, tu amigo de la infancia':pick(UNMASKED);shout('¡SE QUITA LA MÁSCARA!');confetti(40);
  if(!META.unmasked.includes(key)){META.unmasked.push(key);saveMeta();}
  const ex='Bajo la máscara de '+EN[key].n+' estaba... ¡'+nm+'!';setTimeout(()=>{UNM=null;if(kind==='boss'&&isStory())maskTrophy(key,m,turns,ex,()=>{if(key==='veneno'||key==='venenoH'){const k=RR('kid');return talk(k>=2?BETO_END.hi:k>=0?BETO_END.mid:BETO_END.lo,()=>afterWin(kind,key,turns,ex));}afterWin(kind,key,turns,ex);});else afterWin(kind,key,turns,ex);},W(1900));}
 else afterWin(kind,key,turns);});}
function afterWin(kind,key,turns,extra){lastFight(true,key,turns,C&&C.e);addXP(kind==='boss'?30:12);C=null;P.won++;META.fw=(META.fw||0)+1;sfx.win();
 if(P.tut)return tutEnd();
 if(P.daily)return dailyEnd(true,turns);
 if(P.mode==='torneo')return torneoNext();if(P.mode==='reto')return retoEnd(true);if(P.mode==='amistoso')return amiEnd(true);if(P.mode==='rapida')return quickEnd(true);
 unlock('primera');const tB=vTier(),aB=ACTS[Math.min(P.act,2)],payT=kind==='boss'?aB.t0+aB.span:tB;if(kind!=='boss')P.aw=(P.aw||0)+1;let injMsg='';if(P.lastStip==='cabellera'){P.fama+=20;injMsg+='\n\n💇 ¡Le rapaste la cabellera frente a todos! +20⭐';}P.lastStip=null;(P.inj=P.inj||[]).forEach(j=>j.f--);P.inj=P.inj.filter(j=>j.f>0);
 if(LASTDT>=P.max*.35&&chance(.45)&&kind!=='boss'){const n=pick(['la rodilla','el hombro','la espalda','el cuello','el tobillo']);P.inj.push({n,f:3});addScar(pick(['pecho','brazo']));injMsg='\n\n🤕 Te lastimaste '+n+': tendrás una carta de Lesión en el mazo por 3 luchas. Cúrala en el gimnasio.';}
 let betMsg='';if(kind==='nemesis'&&P.flags.bet){P.flags.bet=0;if(!META.trophies.includes(key))META.trophies.push(key);META.fama+=50;META.total+=50;saveMeta();unlock('trofeo');betMsg='\n\n🎭 ¡Ganaste la apuesta! Te quedas con su máscara para siempre: +2 de vida máxima en todas tus historias y +50⭐.';}if(kind==='boss')unlock('mascara1');if(kind==='nemesis')unlock('revancha');
 if(isStory()){const r_=repOf();if(r_&&r_.care)P.flags.pBlk=(P.flags.pBlk||0)+4;if(r_&&r_.fame)P.fama+=5;}if(has('pueblo'))P.flags.pBlk=(P.flags.pBlk||0)+4;if(P.man==='cuca')P.flags.pBlk=(P.flags.pBlk||0)+5;
 let g=kind==='boss'?RI(70,90):kind==='elite'||kind==='kid'||kind==='temporada'||kind==='nemesis'?RI(35,45):RI(14,22);g=Math.round(g*VEN[payT].pay*(1+(isStory()?repPay():0)));if(P.man==='promotor')g=Math.round(g*1.4);if(META.belt==='promo')g=Math.round(g*1.2);if(P.cab>=5)g=Math.round(g*.75);P.gold+=g;if(P.gold>=200)unlock('rico');
 let f=kind==='boss'?30:kind==='elite'?12:kind==='nemesis'?25:kind==='temporada'?15:5;f=Math.round(f*(1+.15*P.cab));P.fama+=f;
 if(kind==='nemesis'){META.nemesis=null;saveMeta();}
 let h='<h1>'+(kind==='boss'?'🎭 ¡GANASTE LA MÁSCARA!':kind==='nemesis'?'😤 ¡VENGANZA CUMPLIDA!':'🏆 ¡1, 2, 3!')+'</h1><p>'+(extra?extra+'\n\n':'')+(isStory()?'❤ '+P.hp+'/'+P.max+'\n':'')+'💰 Bolsa: +$'+g+' · +'+f+' ⭐ fama'+betMsg+injMsg+'</p>';
 const after=()=>{if(isStory()){if(kind==='boss')return chapterEnd();P.row++;P._lt='';return partEnd('win',showMap);}if(kind==='boss'){P.act++;P.row=0;P.from=null;P.visited=[];if(P.act>=ACTS.length)return endRun(true);if(P.act===2&&P.l==='M')unlock('mini');P.hp=P.max;P.map=genMap();P.aw=0;return postLife(()=>promoUp(vTier(),()=>storyScene(P.act,showMap)));}if(kind==='kid')return kidPost(()=>postLife(()=>{showMap();sayReact();}));P.row++;const t1=vTier();postLife(()=>t1>tB?promoUp(t1,(t1===4&&!P.kidF&&!P.mode)?kidFight:showMap):(showMap(),sayReact()));};
 const cardStep=()=>upgCards(1,after);
 if(['elite','boss','temporada'].includes(kind)){let pool;
  if(kind==='temporada')pool=Object.keys(MASKS).filter(k=>MASKS[k].season===SEASON.k&&!has(k));
  else pool=Object.keys(MASKS).filter(k=>!has(k)&&!MASKS[k].season&&(kind==='boss'?MASKS[k].boss||chance(.4):!MASKS[k].boss));
  const opts=shuffle(pool).slice(0,kind==='boss'?2:1);
  if(opts.length){h+='<h2>Elige una máscara</h2>';showPanel(h);opts.forEach(k=>addBtn(MASKS[k].e+' '+MASKS[k].n+' — '+MASKS[k].d,'gold',()=>{gainMask(k);cardStep();}));if(kind==='boss')shareBtn();return;}}
 showPanel(h);addBtn('Continuar','',cardStep);if(['boss','nemesis','kid'].includes(kind))shareBtn();}
function gainMask(k){P.masks.push(k);if(k==='oro'){P.max+=8;P.hp+=8;}if(k==='esfera'){P.max+=12;P.hp+=12;}if(!META.album.includes(k)){META.album.push(k);saveMeta();}if(META.album.length>=6)unlock('coleccion');}
function rollCard(kind){const big=kind&&kind!=='lucha';const r=Math.random();const rare=P.l==='R'?RARE.concat(RARE_D,RARE_D):RARE;const colMode=!P.mode&&META.col;const owned=a=>colMode?a.filter(id=>colN(id)>0):a;
 let tier=r<(big?.08:.03)?'l':r<(big?.4:.2)?'r':'c';let pool=tier==='l'?owned(LEG):tier==='r'?owned(rare):owned(LUCH[P.l].pool.concat(LUCH[P.l].deck));if(!pool.length)pool=owned(LUCH[P.l].pool.concat(LUCH[P.l].deck));if(!pool.length)pool=LUCH[P.l].pool;
 const uniq=[...new Set(pool)].filter(id=>!(P.lastOffer||[]).includes(id)&&CARDS[id].t!=='fin');const own=id=>P.deck.filter(c=>c.id===id).length;
 const w=uniq.map(id=>1/(1+own(id)*2));let t=w.reduce((a,b)=>a+b,0)*Math.random();for(let k=0;k<uniq.length;k++){t-=w[k];if(t<=0)return uniq[k];}return pick(uniq.length?uniq:pool);}
function rewardCards(kind,after){const opts=[];let g=0;while(opts.length<3&&g++<60){const id=rollCard(kind);if(!opts.includes(id))opts.push(id);}P.lastOffer=opts.slice();if(opts.some(id=>CARDS[id].rar==='l'))setTimeout(()=>unlock('legend'),300);
 const upP=(kind!=='lucha'?.35:0)+(P.man==='profe'?.25:0);const cs=opts.map(id=>mkc(id,chance(upP)));
 showPanel('<h1>Nueva llave</h1><p>Elige una carta para tu mazo:</p><div class="cards" id="rc">'+cs.map((c,i)=>cardHTML(c,i)).join('')+'</div>');
 document.querySelectorAll('#rc .card').forEach(el=>{const c=cs[+el.dataset.i];lpBind(el,c,()=>{P.deck.push(c);sfx.card();after();});});addBtn('Saltar','alt',after);}
function lose(){if(!C||C.over)return;if(!C.tut&&!C.kickTry&&P.hp<=0){C.kickTry=1;return kickout();}C.over=true;C.busy=true;musicStop();sfx.lose();vib(200);const key=C.e.key,kind=C.kind;
 if(!P.revived&&!P.daily&&!P.tut&&P.mode!=='reto'){PENDING=C;showPanel('<h1>😵 ¡Contra la lona!</h1><p>El réferi empieza a contar... 1... 2...</p>');
  addBtn('📺 Ver anuncio y revivir con 50% de vida','gold',()=>ad(()=>{P.revived=true;C=PENDING;PENDING=null;C.over=false;P.hp=Math.round(P.max*.5);hidePanel();shout('¡SE LEVANTA! ¡NO SE RINDE!');sfx.crowd();musicStart(!!EN[C.e.key].boss);C.busy=false;startTurn();}));
  addBtn('Aceptar la derrota','alt',()=>{PENDING=null;finishLose(key,kind);});return;}
 finishLose(key,kind);}
function finishLose(key,kind){const t=C?C.turn:0;lastFight(false,key,t,C&&C.e);if(!P.tut)addXP(5);C=null;if(P.tut){P=null;return menu();}if(P.daily)return dailyEnd(false,t);if(P.mode==='torneo')return torneoEnd(false);if(P.mode==='reto')return retoEnd(false);if(P.mode==='amistoso')return amiEnd(false);if(P.mode==='rapida')return quickEnd(false);
 if(kind==='nemesis'&&P.flags.bet){META.fama=Math.max(0,META.fama-50);saveMeta();}
 if(kind!=='boss'&&!EN[key].season){META.nemesis={key,n:EN[key].n,act:Math.min(P.act,2)};saveMeta();}
 if(isStory()&&(P.fSnap||P.chSnap))return retryOffer(key,kind);
 endRun(false);}
function retryOffer(key,kind){const boss=kind==='boss',rn=(EN[key]&&EN[key].n)||'tu rival';showPanel('<h1>'+(boss?'😵 Perdiste la máscara... por ahora':'😵 Perdiste... pero no se acaba')+'</h1><p>'+(boss?'Don Chuy te levanta del piso: <i>"Una caída no es una carrera, mijo. Vuelve a subir."</i>':'La historia no se termina aquí.')+'\n\nPuedes volver a pelear contra <b>'+rn+'</b> desde el mismo punto, con lo que tenías antes de la lucha.'+casiTxt()+'</p>');
 if(P.fSnap)addBtn((boss?'🎭 Revancha: ':'🔁 Volver a pelear contra ')+rn,'gold',()=>fightRestart());
 if(P.chSnap)addBtn('↩️ Reiniciar todo el capítulo '+(P.ch+1),'blu',()=>chRestart());addBtn('🏳️ Terminar la historia','alt',()=>endRun(false));}
function fightRestart(){const snap=P.fSnap,cs=P.chSnap,rt=(P.retries||0)+1;P=JSON.parse(snap);P.fSnap=snap;P.chSnap=cs;P.retries=rt;saveRun();showMap();}
function chRestart(){const snap=P.chSnap,rt=(P.retries||0)+1;P=JSON.parse(snap);P.chSnap=snap;P.retries=rt;P.road=null;saveRun();shout&&0;startChapter();}
function endRun(victory){if(P&&!P.mode&&!P.daily&&!endRun._t){endRun._t=1;return talk(victory?endW():endL(),()=>endRun(victory));}endRun._t=0;clearRun();const f0=Math.round(P.fama+((victory?100:0)+P.act*20)*(1+.15*P.cab)*(DIFS[DIF()]||DIFS[1]).f);P.fama=f0;let cabMsg='';if(!P.mode&&!P.daily){META.hof=(META.hof||[]).concat([{n:pnm(),e:LUCH[P.l].e,f:f0,w:P.won,a:victory?'🏆 Campeón':(P.ch!==undefined?'Capítulo '+(P.ch+1):'Acto '+(P.act+1)),end:victory?ENDS2[endKey()]:'',d:todayStr(),cab:P.cab||0,dif:DIF()}]).sort((a,b)=>b.f-a.f).slice(0,10);}
 META.ghosts=(META.ghosts||[]).concat([{n:pnm()+' · '+LUCH[P.l].n+' (historia #'+META.stats.runs+')',l:P.l,deck:P.deck.map(c=>c.id).filter(id=>!CARDS[id].useless).slice(0,16),m:[META.mask.a,META.mask.b,META.mask.p],ghost:1}]).slice(-5);
 if(victory){META.story[P.l]=1;if(!P.mode){if(!(P.drink>0))unlock('s_sobrio');if(RR('kid')>=4)unlock('s_carnal');if((P.reps||[]).length<=1&&!P.scammed)unlock('s_fiel');if(P.scammed)unlock('s_estafa');}unlock('historia');gainBelt('peso');if(P.cab>=3)gainBelt('hard');if(SEASON.k==='muertos')gainBelt('muertos');if(SEASON.k==='navidad')gainBelt('navidad');unlock('campeon');if(!P.dirtyUsed)unlock('limpio');if(P.cab>=3)unlock('cab3');if(P.cab>=META.maxCab&&P.cab<10){META.maxCab=P.cab+1;cabMsg='\n\n💇 ¡Desbloqueaste Cabellera '+META.maxCab+'!';}saveMeta();}META.stats.bestAct=Math.max(META.stats.bestAct,victory?4:P.act+1);if(victory)META.stats.wins++;
 const c0=20+P.won*8+P.act*30+(victory?100:0);const fin=(mult)=>{const tot=Math.round(f0*mult);META.fama+=tot;META.total+=tot;META.pass.xp+=tot;coins(Math.round(c0*mult));saveMeta();return tot;};
 const title=victory?'🏆 ¡CAMPEÓN MUNDIAL!':'😵 ¡TE QUITARON LA MÁSCARA!';
 const body=(victory?LSTORY[P.l].end+'\n\n🏆 Le ganaste la máscara a Kid Alacrán. Eres leyenda del pancracio.':'Caíste en '+(P.ch!==undefined&&!P.mode?VEN[P.ch].e+' '+VEN[P.ch].n+' (capítulo '+(P.ch+1)+')':ACTS[Math.min(P.act,2)].n)+'.'+(META.nemesis?'\n😡 '+META.nemesis.n+' ahora es tu némesis. Te buscará en tu próxima historia.':''))+(victory?'':casiTxt())+'\n\nLuchas ganadas: '+P.won+'\nMáscaras: '+(P.masks.map(m=>MASKS[m].e).join(' ')||'ninguna')+(P.cab?'\nCabellera '+P.cab:'')+cabMsg;
 showPanel('<h1>'+title+'</h1><p>'+body+'</p><h2>⭐ Fama ganada: '+f0+'</h2>');
 if(!victory&&!P.mode&&!P.daily){META.ptok=META.ptok||{};META.ptok.arena=(META.ptok.arena||0)+1;saveMeta();setTimeout(()=>toastU(null,'🎁 Por tu esfuerzo: <b>+1 sobre de Arena</b> gratis'),900);}
 const done=(m)=>{const tot=fin(m);showPanel('<h1>'+title+'</h1><p>'+body+'</p><h2>⭐ +'+tot+' fama · ⭐ +'+Math.round(c0*m)+' extra</h2>');addBtn('📸 Compartir resultado','blu',()=>share(victory));addBtn('Volver al menú','',menu);};
 addBtn('📺 Ver anuncio y duplicar fama y monedas','gold',()=>ad(()=>done(2)));addBtn('Cobrar '+f0+' de fama','',()=>done(1));}

// ---------- Lucha del día ----------
const DMODS=[{n:'El rival empieza con 3 de furia',o:{efuria:3}},{n:'¡Afición doble! Toda la afición vale x2',o:{mods:{affx2:1}}},{n:'+1 de energía, pero empiezas con 15 menos de vida',o:{energy:1},hp:-15},{n:'El rival tiene +50% de vida, tú empiezas con 2 de furia',o:{sc:1.5,pfuria:2}}];
function daily(){const d=todayStr();const seed=d.split('-').join('')|0;RNG=mulberry(seed);
 const key=pick(['tiburon','calavera','jaguar','nahual','bestia','charro']),mod=pick(DMODS),extra=[];const L=LUCH[META.sel.l];for(let i=0;i<4;i++)extra.push(pick(L.pool));const upi=RI(0,3);RNG=Math.random;
 const done=META.daily.date===d;
 showPanel('<h1>📅 Lucha del día</h1><p>'+d+'\nRival: <b>'+EN[key].n+'</b>\nRegla: '+mod.n+'\nTu luchador: '+L.e+' '+L.n+' + 4 cartas extra del día\n\nPuntos = vida restante x10 + rapidez.\n🏅 Tu mejor de hoy: '+(done?META.daily.best:'—')+(done?'':'\n🎁 Primera victoria del día: +15 fama')+'\n\n<span class="small">En la versión de tienda habría ranking mundial.</span></p>');
 addBtn('¡A la lucha!','gold',()=>{newRun(true);extra.forEach((id,i)=>P.deck.push(mkc(id,i===upi)));if(mod.hp)P.hp+=mod.hp;P.dkey=key;startCombat(key,'daily',{...mod.o,sc:(mod.o.sc||1)*1.1});});
 addBtn('Volver','alt',menu);}
function dailyEnd(won,turns){const d=todayStr();const score=won?Math.max(0,P.hp)*10+Math.max(0,25-turns)*15:0;const first=won&&!(META.daily.date===d&&META.daily.won);
 if(META.daily.date!==d)META.daily={date:d,best:0,won:false};if(score>META.daily.best)META.daily.best=score;if(won){META.daily.won=true;META.cnt.daily++;}if(first){META.fama+=15;META.total+=15;META.pass.xp+=15;coins(40);}saveMeta();if(META.cnt.daily>=3)unlock('diario');
 showPanel('<h1>'+(won?'🏆 ¡Ganaste la del día!':'😵 Perdiste la del día')+'</h1><p>Puntos: '+score+'\n🏅 Mejor de hoy: '+META.daily.best+(first?'\n⭐ +55 fama':'')+casiTxt()+'\n\nMañana hay un nuevo reto.</p>');shareBtn();addBtn('Volver al menú','',menu);}

// ---------- Mapa y nodos ----------
function avail(n,r){if(r!==P.row)return false;if(P.row===0)return true;const prev=P.map.rows[P.row-1].find(x=>x.c===P.from);return!!prev&&prev.next.includes(n.c);}
function showMap(){if(P&&!P.mode&&!P.daily&&META.opt.vmus&&META.opt.music){if(MUSK!=='v'+vTier())musicStart('v'+vTier());}else if(MUSK==='menu')musicStop();if(isStory())return showRoad();C=null;saveRun();render();setTimeout(()=>hint('map','🗺️ Este es el mapa del acto. Toca un círculo amarillo para elegir tu camino: cada ruta tiene luchas, gimnasios, tiendas y eventos distintos. El jefe 🎭 está al final.'),300);const a=ACTS[P.act],rows=P.map.rows,H=rows.length*64+20;const X=c=>[16,50,84][c],Y=r=>32+r*64;
 let svg='<svg width="100%" height="'+H+'" viewBox="0 0 100 '+H+'" preserveAspectRatio="none" style="position:absolute;left:0;top:0">';
 rows.forEach((row,r)=>{if(r>=rows.length-1)return;row.forEach(n=>n.next.forEach(c2=>{if(!rows[r+1].some(x=>x.c===c2))return;const vis=P.visited.includes(r+'-'+n.c)&&P.visited.includes((r+1)+'-'+c2);svg+='<line x1="'+X(n.c)+'" y1="'+Y(r)+'" x2="'+X(c2)+'" y2="'+Y(r+1)+'" stroke="'+(vis?'#ffd23f':'#7a6a9a')+'" stroke-width="'+(vis?4:2)+'" stroke-dasharray="'+(vis?'':'5 4')+'" vector-effect="non-scaling-stroke"/>';}));});
 svg+='</svg>';let nodes='';
 rows.forEach((row,r)=>row.forEach(n=>{const k=r+'-'+n.c,done=P.visited.includes(k),av=avail(n,r);nodes+='<button class="mn '+(av?'av':done?'done':'dis')+'" data-r="'+r+'" data-c="'+n.c+'" style="left:'+X(n.c)+'%;top:'+Y(r)+'px">'+(done?'✔':NODE[n.t][0])+'</button>';}));
 const vt=vTier(),bT=a.t0+a.span,nx=2*(vt-a.t0+1)-(P.aw||0);showPanel('<h1>'+VEN[vt].e+' '+VEN[vt].n+'</h1>'+ladderHTML(vt)+(P.rel?relHTML():'')+'<p class="small">'+(DIFS[DIF()].e+' '+DIFS[DIF()].n+' · ')+(vt<bT?'⬆️ Gana '+nx+' lucha'+(nx>1?'s':'')+' más para subir a '+VEN[vt+1].e+' '+VEN[vt+1].n:'🎭 La Máscara contra Máscara será en '+VEN[bT].e+' '+VEN[bT].n)+'\n'+a.n+' · Acto '+(P.act+1)+'/3 · '+LUCH[P.l].e+' '+LUCH[P.l].n+(P.cab?' · 💇'+P.cab:'')+' · ❤ '+P.hp+'/'+P.max+' · $'+P.gold+' · ⭐'+P.fama+'</p><div id="mapinfo" class="opt" style="cursor:default">👇 Toca un círculo amarillo</div><div class="map" style="height:'+H+'px">'+svg+nodes+'</div><p class="small">🤼 Lucha · 💀 Estelar · 🏋️ Gimnasio · 🛒 Tienda · ❓ Evento · 😡 Revancha · 🎉 Temporada · 🎭 Jefe</p>');
 let sel=null;
 document.querySelectorAll('#pn .mn').forEach(el=>{el.onclick=()=>{const r=+el.dataset.r,c=+el.dataset.c,n=rows[r].find(x=>x.c===c);if(!avail(n,r))return;sfx.card();
  if(sel===el){return go(n,r);}if(sel)sel.classList.remove('sel');sel=el;el.classList.add('sel');const N=NODE[n.t];let sub=N[2];if(n.t==='boss')sub+=' · en '+VEN[a.t0+a.span].n;if(n.t==='nemesis')sub=META.nemesis.n+' te ganó · +25⭐';if(n.t==='temporada')sub=EN[SEASON.en].n+' · máscara exclusiva';
  const mi=$('#mapinfo');mi.innerHTML='<div class="ic">'+N[0]+'</div><div style="flex:1"><b>'+N[1]+'</b><br>'+sub+'</div><button class="b gold sm" id="goB" style="width:auto;margin:0">Ir ▶</button>';$('#goB').onclick=()=>go(n,r);};});
 addBtn('📜 Mi mazo ('+P.deck.length+')','alt',()=>deckView(showMap));addBtn('🏳️ Rendirse','alt',()=>{showPanel('<h1>¿Rendirte?</h1><p>Terminas la historia y cobras la fama que llevas.\n\n<span class="small">💾 La historia se guarda sola en el mapa. Puedes cerrar el juego y seguir después.</span></p>');addBtn('Sí, rendirme','',()=>endRun(false));addBtn('No','alt',showMap);});}
function go(n,r){P.from=n.c;P.visited.push(r+'-'+n.c);enterNode(n.t);}
function enterNode(t){const a=ACTS[P.act];
 if(t==='lucha'){const k=pick(a.pool);return preLife(()=>startCombat(k,'lucha'));}if(t==='elite')return preLife(()=>entrance(()=>startCombat(a.elite,'elite')));
 if(t==='nemesis'){showPanel('<h1>😡 ¡REVANCHA!</h1><p>'+META.nemesis.n+' toma el micrófono: "¿Otra vez tú? Te voy a volver a mandar a la lona."</p>');addBtn('😤 ¡Esta vez no!','',()=>entrance(()=>startCombat(META.nemesis.key,'nemesis')));addBtn('🎭 Apostar máscara contra máscara','gold',()=>{P.flags.bet=1;entrance(()=>startCombat(META.nemesis.key,'nemesis'));},'Si ganas: su máscara para siempre (+2 vida máx. permanente) y +50⭐. Si pierdes: -50⭐.');}
 if(t==='temporada')startCombat(SEASON.en,'temporada');
 if(t==='boss'&&!P.vsSeen){P.vsSeen=P.act+1;return vsIntro(a.boss,()=>{enterNode('boss');});}
 if(t==='boss'){P.vsSeen=0;const B=EN[a.boss];showPanel('<h1>🎭 MÁSCARA CONTRA MÁSCARA</h1><p>'+B.n+' te espera en el centro del ring.\nSi pierdes, te quitan la máscara frente a todos.'+(B.note?'\n\n⚠ '+B.note:'')+(P.flags.trampa&&P.act===2?'\n😱 Tu "hermano" le contó todos tus secretos: empieza con +3 de furia.':'')+'</p>');addBtn('¡A la lucha!','gold',()=>entrance(()=>startCombat(a.boss,'boss')));}
 if(t==='gym')gym();if(t==='tienda')shop();if(t==='evento')event();}
function next(){P.row++;if(isStory())return partEnd(P._lt||'',showMap);showMap();}
function canMod(c){const d=CARDS[c.id];return!c.mods&&d.t!=='fin'&&!d.useless;}
function gym(){const heal=Math.round(P.max*(P.cab>=7?.2:.3));showPanel('<h1>🏋️ Gimnasio</h1><p>❤ '+P.hp+'/'+P.max+'</p>');
 addBtn('😴 Descansar: +'+heal+' de vida','grn',()=>{P._lt='train';healP(heal);next();},P.hp>=P.max?'':'');const mh=P.cab>=7?2:4;addBtn('💪 Entrenar fuerte: +'+mh+' de vida máxima','blu',()=>{P._lt='train';P.max+=mh;P.hp+=mh;next();});
 if(P.deck.some(c=>c.id==='golpe'||c.id==='bloqueo'))addBtn('🔄 Cambiar un Golpe o Bloqueo por una carta nueva','blu',()=>pickCard('¿Cuál cambias?',c=>c.id==='golpe'||c.id==='bloqueo',c=>{const n=mkc(rollCard('elite'));P.deck[P.deck.indexOf(c)]=n;showPanel('<h1>🔄 ¡Carta nueva!</h1><p>Cambiaste '+CARDS[c.id].n+' por:</p><div class="cards">'+cardHTML(n,0)+'</div>');addBtn('Continuar','',next);},gym),'Menos cartas repetidas en tu mazo');
 if(P.inj&&P.inj.length)addBtn('🩹 Fisioterapia: cura tus lesiones (+10 vida)','grn',()=>{P.inj=[];healP(10);next();},P.inj.map(j=>'🤕 '+j.n).join(' · '));
 addBtn('💪 Entrenar una carta','blu',()=>pickCard('¿Qué carta entrenas?',c=>(!c.up&&CARDS[c.id].up)||canMod(c),upgradeMenu,gym),'Más fuerte, más ligera, aérea o con estilo');}
function upgradeMenu(c){const opts=[];
 if(!c.up&&CARDS[c.id].up)opts.push(['💪 Más fuerte',{...c,up:true},()=>{c.up=true;}]);
 if(canMod(c)&&def(c).c>0)opts.push(['🪶 Ligera: cuesta 1 menos',{...c,mods:{c:-1}},()=>{c.mods={c:-1};}]);
 if(canMod(c)&&!def(c).air)opts.push(['🪽 Aérea: +2 afición y cuenta para combos',{...c,mods:{air:1}},()=>{c.mods={air:1};}]);
 if(canMod(c))opts.push(['✨ Con estilo: +2 afición',{...c,mods:{aff:2}},()=>{c.mods={aff:2};}]);
 showPanel('<h1>Elige el entrenamiento</h1><p class="small">Cada carta puede tener una mejora 💪 y un estilo (🪶, 🪽 o ✨).</p><div class="cards" id="uc">'+opts.map((o,i)=>'<div class="upopt" data-i="'+i+'">'+cardHTML(o[1],i)+'<b>'+o[0]+'</b></div>').join('')+'</div>');
 document.querySelectorAll('#uc .upopt').forEach(el=>el.onclick=()=>{opts[+el.dataset.i][2]();sfx.win();next();});addBtn('Volver','alt',gym);}
function pickCard(title,filter,fn,back){const list=P.deck.filter(filter);showPanel('<h1>'+title+'</h1><p class="small">Mantén presionada una carta para verla grande.</p><div class="cards" id="pc">'+list.map((c,i)=>cardHTML(c,i)).join('')+'</div>');
 document.querySelectorAll('#pc .card').forEach(el=>{const c=list[+el.dataset.i];lpBind(el,c,()=>fn(c));});addBtn('Volver','alt',back);}
function deckView(back){const s=P.deck.slice().sort((a,b)=>a.id<b.id?-1:1);showPanel('<h1>Tu mazo</h1><div class="cards" id="dv" style="flex-wrap:wrap;justify-content:center">'+s.map((c,i)=>cardHTML(c,i)).join('')+'</div>'+(P.masks.length?'<h2>Máscaras</h2>'+P.masks.map(m=>'<p>'+MASKS[m].e+' <b>'+MASKS[m].n+'</b>: '+MASKS[m].d+'</p>').join(''):'')+'<h2>Combos</h2><p>🪽x3: Vuelo en cadena · 🔗x2: Llave combinada · 👊x4: Ráfaga\n🔗 Las llaves llenan la barra morada: al 100% el rival se rinde.</p>');
 document.querySelectorAll('#dv .card').forEach(el=>{const c=s[+el.dataset.i];lpBind(el,c,()=>zoomCard(c));});addBtn('Volver','alt',back);}
function shop(){if(!P.shop){P.shop=shuffle([...new Set(LUCH[P.l].pool.concat(RARE))].filter(id=>P.deck.filter(c=>c.id===id).length<2&&(P.mode||!META.col||colN(id)>0||!CARDS[id].rar))).slice(0,4).map(id=>({c:mkc(id,chance(.25)),p:RI(40,70)}));P.shopRm=false;}
 showPanel('<h1>🛒 Don Toño</h1><p>"Pásele, campeón. Todo original... casi." · 💰 $'+P.gold+'</p><div class="cards" id="sc">'+P.shop.map((s,i)=>s.sold?'':'<div>'+cardHTML(s.c,i,P.gold<s.p)+'<p style="text-align:center;margin:4px 0">$'+s.p+'</p></div>').join('')+'</div>');
 document.querySelectorAll('#sc .card').forEach(el=>{const s=P.shop[+el.dataset.i];lpBind(el,s.c,()=>{if(P.gold<s.p)return;P.gold-=s.p;s.sold=1;P.deck.push(s.c);sfx.card();shop();});});
 if(!P.shopRm)addBtn('🗑 Quitar una carta ($50)','',()=>{if(P.gold<50)return;pickCard('¿Cuál quitas?',()=>true,c=>{P.gold-=50;P.deck.splice(P.deck.indexOf(c),1);P.shopRm=true;shop();},shop);});
 addBtn('🩹 Vendaje: +15 vida ($30)','grn',()=>{if(P.gold<30)return;P.gold-=30;healP(15);shop();});
 addBtn('Salir','alt',()=>{P.shop=null;next();});}
const EVENTS=[
 ()=>['📺 Comercial','Quieren que salgas en un comercial: "¡Chispa-Cola, la bebida de los campeones!"',[['Aceptar (+$40)',()=>{P.gold+=40;return'Te pagan $40. Tu abuela te ve en la tele y llora de orgullo.';}],['Pedir el doble (50%)',()=>chance(.5)?(P.gold+=90,'¡Aceptaron! +$90.'):'Se ofendió y contrató a otro.']]],
 ()=>['👴 El viejo maestro','"Ven, chamaco. Te enseño algo."',[['Entrenar (-8 vida, mejora 2 cartas)',()=>{P.hp=Math.max(1,P.hp-8);const l=shuffle(P.deck.filter(c=>!c.up&&CARDS[c.id].up)).slice(0,2);l.forEach(c=>c.up=true);return'Te dejó molido... pero mejoraste: '+(l.map(c=>CARDS[c.id].n).join(' y ')||'nada')+'.';}],['Escuchar historias (+5 vida máx.)',()=>{P.max+=5;P.hp+=5;return'Te cuenta de las luchas del 74. Te sientes más fuerte.';}]]],
 ()=>['🌮 Taquería','Huele a pastor recién salido del trompo.',[['Cenar ($15, +18 vida)',()=>{if(P.gold<15)return'No te alcanza.';P.gold-=15;healP(18);return'¡Qué bárbaro! +18 de vida.';}],['Seguir de largo',()=>'Te vas con hambre.']]],
 ()=>['🎲 Apuesta clandestina','"¿Le entras con $30 a la estelar?"',[['Apostar $30',()=>{if(P.gold<30)return'No traes ni para el camión.';P.gold-=30;return chance(.5)?(P.gold+=80,'¡Ganaste! +$80.'):'Perdiste. El de la gorra se ríe.';}],['No, gracias',()=>'Mejor no.']]],
 ()=>['🧢 Réferi corrupto','"Por $25 no veo nada en tu próxima lucha."',[['Pagarle $25',()=>{if(P.gold<25)return'No traes dinero.';P.gold-=25;P.flags.ref=1;return'Trato hecho: en tu próxima lucha el réferi no te descubre.';}],['Ignorarlo',()=>'Te alejas.']]],
 ()=>['🎭 Niño fan','Trae tu máscara hecha de cartón. Mal dibujada, pero con amor.',[['Regalarle tus guantes (+10 vida, +5⭐)',()=>{healP(10);P.fama+=5;return'Su sonrisa vale oro.';}],['Darle una carta (+$20)',()=>{const c=pick(P.deck);P.deck.splice(P.deck.indexOf(c),1);P.gold+=20;return'Le regalas '+CARDS[c.id].n+'. Su papá insiste en darte $20.';}]]],
 ()=>['🎤 Entrevista','"¿Qué le dices a tu próximo rival?"',[['Retarlo (+10⭐, el rival llega con +2 furia)',()=>{P.fama+=10;P.flags.reto=1;return'¡La arena enloquece con tu reto!';}],['Ser humilde (+6 vida)',()=>{healP(6);return'"Que gane el mejor." Te aplauden.';}]]],
 ()=>P.flags.perro?null:['🐕 Perro callejero','Un perrito te sigue desde la arena.',[['Adoptarlo ($10)',()=>{if(P.gold<10)return'No tienes para croquetas.';P.gold-=10;P.flags.perro=1;return'Se llama Chato II. Te cuida la espalda: +4 de defensa al inicio de cada lucha.';}],['Darle una caricia',()=>'Mueve la cola y se va.']]],
 ()=>P.flags.chato?null:['💸 El Chato','Tu amigo el Chato te pide $30 prestados. "Te los pago doble, carnal."',[['Prestarle $30',()=>{if(P.gold<30)return'No traes.';P.gold-=30;P.flags.chato=1;return'"¡Eres un hermano!" Ya veremos si regresa...';}],['No prestar',()=>'"Ni modo, carnal."']]],
 ()=>['🥫 Bebida misteriosa','Un señor vende una bebida "energética" sin etiqueta.',[['Tomarla',()=>{if(chance(.5)){P.flags.energia=1;return'¡Te sientes eléctrico! +1 de energía en tu próxima lucha.';}P.hp=Math.max(1,P.hp-8);return'Ugh... te cayó de peso. -8 de vida.';}],['No, gracias',()=>'Sabia decisión.']]],
 ()=>['🎥 Documental','Graban un documental sobre la lucha libre.',[['Contar tu historia (+15⭐)',()=>{P.fama+=15;return'La gente llora con tu historia.';}],['Cobrar por la entrevista (+$35)',()=>{P.gold+=35;return'Negocios son negocios.';}]]],
 ()=>['🧹 Limpiar el vestidor','Entre tanto tiradero encuentras tu vieja libreta de llaves.',[['Tirar una carta del mazo',()=>{const c=P.deck.find(c=>c.id==='lesion')||pick(P.deck);P.deck.splice(P.deck.indexOf(c),1);return'Tiraste '+CARDS[c.id].n+'. Mazo más ligero.';}],['Dejar todo igual',()=>'Cerraste la puerta del vestidor.']]],
 ()=>['🃏 Intercambio','Otro luchador te propone cambiar una llave.',[['Cambiar una carta al azar por una mejorada',()=>{const c=pick(P.deck.filter(c=>CARDS[c.id].t!=='fin'));P.deck.splice(P.deck.indexOf(c),1);const n=mkc(pick(LUCH[P.l].pool),true);P.deck.push(n);return'Diste '+CARDS[c.id].n+' y recibiste '+CARDS[n.id].n+'+.';}],['No cambiar',()=>'Prefieres lo tuyo.']]],
 ()=>['🌧️ Lona mojada','Hay gotera en el gimnasio y la lona está resbalosa.',[['Practicar caídas (+1 Salir del ring)',()=>{P.deck.push(mkc('fuera'));return'Aprendiste a rodar fuera del ring.';}],['Descansar (+8 vida)',()=>{healP(8);return'Una siesta reparadora.';}]]],
 ()=>['📰 Periodista chismoso','"Dime algo jugoso de tu próximo rival."',[['Contarle un chisme (rival empieza Débil 2)',()=>{P.flags.chisme=1;return'El chisme sale en primera plana. Tu rival llega desconcentrado.';}],['Negarte (+5⭐)',()=>{P.fama+=5;return'"Sin comentarios." La afición respeta.';}]]],
 ()=>['👑 En vivo','Tienes el micrófono frente a toda la arena.',[['Insultar al jefe (+20⭐, jefe con +3 furia)',()=>{P.fama+=20;P.flags.insulto=1;return'"¡Te voy a quitar la máscara!" La arena explota.';}],['Agradecer a la afición (+$20)',()=>{P.gold+=20;return'Te avientan monedas al ring.';}]]],
 ()=>['🏥 Doctor del ring','"Déjame revisarte esa rodilla."',[['Revisión completa ($25, +10 vida máx.)',()=>{if(P.gold<25)return'No te alcanza.';P.gold-=25;P.max+=10;P.hp+=10;return'Como nuevo.';}],['Remedio casero (+12 vida)',()=>{healP(12);return'Pomada de marihuana... digo, de árnica.';}]]],
 ()=>P.flags.banda?null:['🎸 Banda de rock','Quieren tocar tu canción de entrada.',[['Contratarlos ($40)',()=>{if(P.gold<40)return'No te alcanza.';P.gold-=40;P.flags.banda=1;return'¡Qué entrada! +2 de afición al inicio de cada lucha.';}],['Entrar sin música',()=>'Silencio total... y un grillo.']]],
 ()=>['📞 Tu mamá','"Mijo, ¿ya comiste? ¿Te estás cuidando?"',[['Platicar un rato (+10 vida'+(P.deck.some(c=>c.id==='lesion')?', cura tu Lesión':'')+')',()=>{healP(10);const l=P.deck.find(c=>c.id==='lesion');if(l)P.deck.splice(P.deck.indexOf(l),1);return'Te mandó un caldito de pollo. '+(l?'Hasta se te quitó la lesión.':'');}],['"Ahorita no, ma"',()=>{P.gold+=10;return'Te deposita $10 de todos modos.';}]]],
 ()=>P.act<1||P.flags.formula?null:['🧪 Laboratorio','La puerta del laboratorio de Dr. Siniestro quedó abierta...',[['Robar una fórmula (+1 furia siempre, -10 vida máx.)',()=>{P.flags.formula=1;P.max=Math.max(20,P.max-10);P.hp=Math.min(P.hp,P.max);return'Sabe a batería. Te sientes fuerte... y raro.';}],['Huir',()=>'Mejor no meterte en problemas.']]]
];
function event(){let ev=null;if(P.flags.chato===1&&chance(.6)){P.flags.chato=2;ev=['💸 ¡Regresó el Chato!','"¡Carnal! Te dije que te pagaba."',[['Recibir $70',()=>{P.gold+=70;return'¡Te pagó doble! La amistad sí existe.';}]]];}
 let g=0;while(!ev&&g++<30)ev=pick(EVENTS)();if(!ev)ev=EVENTS[0]();const[t,txt,opts]=ev;showPanel('<h1>'+t+'</h1><p>'+txt+'</p>');opts.forEach(([l,f])=>addBtn(l,'blu',()=>{const r=f();showPanel('<h1>'+t+'</h1><p>'+r+'</p>');addBtn('Continuar','',next);}));}
const STORY={1:['🎬 Capítulo 1: La oferta','Después de ganar la máscara, tu mánager llega con un sobre:\n"El promotor de la Arena Nacional te quiere en la estelar... pero sin tu compañero de relevo. Dice que no vende boletos."',[['💰 Aceptar (+$60, sin relevo este acto)',()=>{P.gold+=60;P.flags.noRelevo=1;return'Firmas el contrato. Tu compañero se entera por la tele... y no te contesta los mensajes.';}],['🤝 Quedarte con tu compañero (relevo +50% y +5 vida máx.)',()=>{P.flags.relevoBoost=1;P.max+=5;P.hp+=5;return'"Somos equipo o no somos nada." Tu compañero te da un abrazo de oso.';}]]],
 2:['🎬 Capítulo 2: El enmascarado misterioso','En la tele aparece un luchador con TU misma máscara. Dice ser tu hermano perdido y que El Inmortal lo tiene amenazado. Te pide entrenar juntos.',[['🫂 Creerle y entrenar juntos',()=>{const l=shuffle(P.deck.filter(c=>!c.up&&CARDS[c.id].up)).slice(0,2);l.forEach(c=>c.up=true);healP(20);if(chance(.35)){P.flags.trampa=1;return'Entrenan duro: +20 vida y 2 cartas mejoradas... Pero esa noche lo ves salir del camerino de El Inmortal. ¡Era un espía! 😱';}return'¡Era verdad! Entrenan como en los viejos tiempos: +20 vida y 2 cartas mejoradas.';}],['🤨 Desconfiar (+3 afición en cada lucha del Campeonato)',()=>{P.flags.aff3=1;return'"Mi familia es la afición." La gente te ovaciona.';}]]]};
function storyScene(act,cb){const s=STORY[act];if(!s)return cb();showPanel('<h1>'+s[0]+'</h1><p>'+s[1]+'</p>');s[2].forEach(([l,f])=>addBtn(l,'blu',()=>{const r=f();showPanel('<h1>'+s[0]+'</h1><p>'+r+'</p>');addBtn('Continuar','',cb);}));}

// ---------- Menú y metajuego ----------
function checkStreak(){const d=todayStr(),s=META.streak;if(s.last===d)return null;const y=new Date();y.setDate(y.getDate()-1);const ys=y.getFullYear()+'-'+String(y.getMonth()+1).padStart(2,'0')+'-'+String(y.getDate()).padStart(2,'0');
 s.n=s.last===ys?s.n+1:1;s.last=d;const r=5*Math.min(s.n,7);coins(10*Math.min(s.n,7));META.ptok=META.ptok||{};if(s.n%7===0)META.ptok.oro=(META.ptok.oro||0)+1;else if(s.n%3===0)META.ptok.arena=(META.ptok.arena||0)+1;META.fama+=r;META.total+=r;META.pass.xp+=r;saveMeta();if(s.n>=7)setTimeout(()=>unlock('racha7'),1500);return r;}
function title0(){}
let TON=false,TRAF=0,TT=0;
function titleDraw(){const c=$('#tbg'),h=$('#thero');if(!TON||!c||!c.getContext){TRAF=0;return;}TT++;const g=c.getContext('2d');if(!g)return;const Wd=180,Hd=320;g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;
 const gr=g.createLinearGradient(0,0,0,Hd);gr.addColorStop(0,'#21103f');gr.addColorStop(.55,'#140a28');gr.addColorStop(1,'#07040d');g.fillStyle=gr;g.fillRect(0,0,Wd,Hd);
 for(let i=0;i<3;i++){const a=Math.sin(TT/90+i*2.1)*.35,x0=30+i*60;g.fillStyle=['#ff2e8812','#ffd23f10','#3b9bff12'][i];g.beginPath();g.moveTo(x0,-4);g.lineTo(x0+Math.sin(a)*260-40,Hd);g.lineTo(x0+Math.sin(a)*260+40,Hd);g.fill();}
 const pc=['#ff2e88','#ffd23f','#2ecc71','#3b9bff','#e67e22'];g.fillStyle='#ffffff55';g.fillRect(0,3,Wd,1);for(let i=0;i<18;i++){const sw=Math.round(Math.sin(TT/30+i));g.fillStyle=pc[i%5];g.fillRect(i*10+1,4+sw,8,7);g.fillStyle='#21103f';g.fillRect(i*10+3,6+sw,1,1);g.fillRect(i*10+6,6+sw,1,1);g.fillRect(i*10+4,8+sw,2,1);}
 for(let r=0;r<9;r++){const y=Hd-120+r*14,off=r%2?5:0;for(let x=-4+off;x<Wd+6;x+=10){const k=(x*7+r*13)%11,b=((TT>>3)+x+r)%9===0?2:0;g.fillStyle=r<3?'#1a1030':'#0e0818';g.fillRect(x,y-b,7,8);g.fillRect(x+1,y-4-b,5,5);if(k===3&&r<5){g.fillStyle=pc[(x+r)%5]+'99';g.fillRect(x+1,y+1-b,5,3);}}}
 if(TT%23===0||TT%37===0){FLS.push({x:Math.random()*Wd,y:Hd-120+Math.random()*60,t:6});}FLS.forEach(f=>{g.fillStyle='rgba(255,255,255,'+(f.t/6)+')';g.fillRect(f.x-1,f.y,3,1);g.fillRect(f.x,f.y-1,1,3);f.t--;});FLS=FLS.filter(f=>f.t>0);
 if(h&&h.getContext){const q=h.getContext('2d');if(q){q.setTransform(1,0,0,1,0,0);q.clearRect(0,0,64,90);q.fillStyle='#ffd23f22';q.beginPath();q.ellipse(32,84,24,5,0,0,7);q.fill();q.fillStyle='#ffffff0c';q.beginPath();q.moveTo(22,0);q.lineTo(42,0);q.lineTo(58,84);q.lineTo(6,84);q.fill();q.imageSmoothingEnabled=false;q.setTransform(2,0,0,2,0,0);const L=LUCH[META.sel.l];const pose=(TT>>6)%3===0?'flex':(TT>>6)%3===1?'brazos':false;const by=Math.round(Math.sin(TT/18));try{luchador(q,8,10+by*.5,playerMask(),false,(META.look&&META.look.skin)||'#d9a066',PT(),pose,LK());}catch(e){}}}
 TRAF=requestAnimationFrame(titleDraw);}
let FLS=[];
function titleOn(on){TON=on;const t=$('#title');if(t&&t.classList)t.classList.toggle('on',on);if(on&&!TRAF)TRAF=requestAnimationFrame(titleDraw);}
function moreView(){const lvl=Math.min(PASS.length,Math.floor(META.pass.xp/PASSXP));const claim=PASS.slice(0,lvl).filter((_,i)=>!META.pass.claimed.includes(i)).length;
 showPanel('<h1>☰ Más</h1>');[['🏅 Logros',Object.keys(META.ach).length+'/'+Object.keys(ACH).length,achView],['📖 Álbum de máscaras',META.album.length+' máscaras',album],['🏛️ Salón de la Fama',(META.hof||[]).length?'Récord '+META.hof[0].f+'⭐':'Sin récords',hofView],['🎭 Expositor de máscaras',(META.unmasked||[]).length+' máscaras ganadas',()=>vitrinaView(moreView)],['🎶 Mi entrada','Canción, pose y efectos',()=>entradaView(moreView)],['❓ Cómo jugar','Reglas y consejos',howTo],['⚙️ Configuración','Sonido, juego y datos',options]].forEach(([l,sub,f])=>addBtn(l,'blu',f,sub));addBtn('Volver','alt',menu);}
function aboutView(){showPanel('<h1>ℹ️ Acerca del juego</h1><p><b>Máscara contra Máscara</b>\nVersión 2.15\n\nUn juego de cartas y lucha libre hecho en México 🇲🇽.\n\nMúsica y efectos generados en vivo con el sintetizador del navegador. Arte pixelado original.\n\n¡Gracias por jugar! 🎭</p><p class="small"><a href="privacidad.html" style="color:#ffd23f">Política de privacidad</a></p>');addBtn('Volver','alt',options);}
const MUNL={quick:['Gana tu primera lucha',M=>(M.fw||0)>=1],torneo:['Gana tu primera lucha',M=>(M.fw||0)>=1],deck:['Gana tu primera lucha',M=>(M.fw||0)>=1],gym:['Gana tu primera lucha',M=>(M.fw||0)>=1],packs:['Gana 2 luchas',M=>(M.fw||0)>=2],daily:['Gana 3 luchas',M=>(M.fw||0)>=3],};
function mOk(k){return META.prog>=9||!MUNL[k]||MUNL[k][1](META);}
function menu(){if(META.prog===undefined){META.prog=((META.stats&&META.stats.runs>0)||(META.total||0)>100)?9:0;META.seenU=Object.keys(MUNL).filter(mOk);saveMeta();}P=null;C=null;UNM=null;if(META.opt.music&&MUSK!=='menu')musicStart('menu');else if(!META.opt.music)musicStop();render();hidePanel();const L=LUCH[META.sel.l];
 const lvl=Math.min(PASS.length,Math.floor(META.pass.xp/PASSXP));const claim=PASS.slice(0,lvl).filter((_,i)=>!META.pass.claimed.includes(i)).length;const sv=loadRun();
 const dot=b=>b?'<i class="dot"></i>':'';const nm=META.pname||L.n;META.seenU=META.seenU||[];const fresh=Object.keys(MUNL).filter(k=>mOk(k)&&!META.seenU.includes(k));
 let h='<div class="tt-top"><span class="cur">⭐ '+META.fama+'</span><span class="sp"></span>'+(META.streak.n>1?'<span class="cur fl">🔥 '+META.streak.n+'</span>':'')+'<button class="ib" data-k="opt" aria-label="Configuración">⚙️</button></div>';
 h+='<div class="logo"><div class="l1">MÁSCARA</div><div class="l2">contra</div><div class="l3">MÁSCARA</div></div>';
 h+='<div class="hero"><canvas id="thero" width="64" height="90"></canvas></div>';
 if(META.tutDone)h+=goalsHTML()+'<button class="goal expob" data-k="expo">🎭 Mis máscaras: <b>'+(META.unmasked||[]).length+'</b> ganadas · ver expositor</button>';
 h+='<div class="main">';
 if(!META.tutDone)h+='<button class="bigb" data-k="tut"><span class="bi">🎓</span><div>TUTORIAL<small>1 minuto · +50⭐</small></div></button>';
 if(sv)h+='<button class="bigb" data-k="cont"><span class="bi">▶</span><div>CONTINUAR<small>'+LUCH[sv.l].e+' '+(sv.name||LUCH[sv.l].n)+' · Capítulo '+((sv.ch||0)+1)+' de 7</small></div></button>';
 h+='<button class="bigb '+(sv||!META.tutDone?'alt':'')+'" data-k="new"><span class="bi">📖</span><div>MODO HISTORIA<small>'+LUCH.T.e+' '+nm+'</small></div></button>';
 if(META.tutDone)h+='<button class="bigb alt qk" data-k="quick"><span class="bi">⚡</span><div>LUCHA RÁPIDA<small>Una pelea · 3 minutos</small></div></button>';
 h+='<div class="modes"><button class="md" data-k="torneo"><span>🏆</span>Amistoso y Torneo</button><button class="md" data-k="daily">'+dot(META.daily.date!==todayStr())+'<span>📅</span>Del día</button></div></div>';
 h+='<div class="nav"><button class="nv" data-k="packs">'+dot(META.freePack!==todayStr())+'<span>🎁</span>Sobres</button><button class="nv" data-k="deck"><span>🃏</span>Mazo</button><button class="nv" data-k="mask"><span>🎨</span>Luchador</button><button class="nv" data-k="gym"><span>🏋️</span>Mejoras</button><button class="nv" data-k="more">'+dot(claim)+'<span>☰</span>Más</button></div>';
 h+='<div class="ver">'+SEASON.n+(META.titulo?' · 🏅 '+META.titulo:'')+' · v2.15</div>';
 const tw=$('#tw');tw.innerHTML=h;titleOn(true);if(!window._chant&&typeof AC!=='undefined'&&AC&&AC.state==='running'&&META.opt.music){window._chant=1;[0,280,560,760,960].forEach((t,i)=>setTimeout(()=>{try{sfx.slap();}catch(e){}},t+400));}
 if(tw.querySelectorAll)tw.querySelectorAll('[data-k]').forEach(el=>{const k=el.dataset.k;if(!MUNL[k])return;if(!mOk(k)){el.classList.add('lk');el.insertAdjacentHTML('beforeend','<em class="lkic">🔒</em>');}else if(fresh.includes(k))el.insertAdjacentHTML('beforeend','<em class="nwb">NUEVO</em>');});
 if(fresh.length)setTimeout(()=>toastU(fresh),500);
 const A={tut:startTutorial,cont:()=>{P=sv;UID=Math.max(UID,...P.deck.map(c=>c.uid||0))+1;showMap();},new:()=>{if(!sv&&!META.qsDone&&!META.stats.runs)return newRun(false);if(sv){showPanel('<h1>¿Nueva historia?</h1><p>Se perderá tu historia guardada (Acto '+(sv.act+1)+').</p>');addBtn('Sí, empezar de nuevo','',()=>{clearRun();setup();});addBtn('No','alt',menu);}else setup();},
  quick:quickGo,idle:idleCollect,bk:()=>{META.bkLast=Date.now();saveMeta();backupView();},expo:()=>vitrinaView(menu),daily,torneo,retos,promo,packs,deck:()=>deckEditor(META.sel.l),gym:meta_gym,mask:maskEditor,more:moreView,opt:options};
 if(tw.querySelectorAll)tw.querySelectorAll('[data-k]').forEach(el=>el.onclick=()=>{const k=el.dataset.k;if(MUNL[k]&&!mOk(k)){sfx.block();return toastU(null,'🔒 '+MUNL[k][0]+' para desbloquearlo.');}if(MUNL[k]&&!META.seenU.includes(k)){META.seenU.push(k);saveMeta();}sfx.card();A[k]();});}
const MUNM={quick:'Lucha rápida',torneo:'Torneo y Amistoso',deck:'Editor de mazo',gym:'Mejoras',packs:'Sobres de cartas',daily:'Desafío del día',retos:'Retadores',promo:'Tu promotora'};
function toastU(list,txt){const d=document.createElement('div');d.className='utoast';d.innerHTML=txt||('🔓 ¡Nuevo desbloqueado!<br><b>'+list.map(k=>MUNM[k]).join(' · ')+'</b>');document.body.appendChild(d);if(list)sfx.win&&sfx.win();setTimeout(()=>{d.classList.add('out');setTimeout(()=>d.remove(),400);},txt?1800:2600);}
function hofView(){const H=META.hof||[];let h='<h1>🏛️ Salón de la Fama</h1><p class="small">Tus 10 mejores historias en este celular.</p>';
 h+=H.length?'<div class="hof">'+H.map((r,i)=>'<div class="hr'+(i<3?' top':'')+'"><b>'+(['🥇','🥈','🥉'][i]||(i+1)+'.')+'</b><span class="pe">'+r.e+'</span><div><b>'+r.n+'</b><br><span class="small">'+r.a+(r.end?' · '+r.end:'')+' · '+r.w+' luchas'+(r.cab?' · 💇'+r.cab:'')+' · '+r.d+'</span></div><b class="ff">'+r.f+'⭐</b></div>').join('')+'</div>':'<p>Todavía no hay récords. ¡Juega el modo historia!</p>';
 const E=META.endings||[];h+='<h2>📜 Finales descubiertos ('+E.length+'/'+Object.keys(ENDS2).length+')</h2><div class="legend">'+Object.keys(ENDS2).map(k=>'<span style="background:'+(E.includes(k)?'#5a2a8a':'#2a2236')+'">'+(E.includes(k)?ENDS2[k]:'❓ ???')+'</span>').join('')+'</div>';
 showPanel(h);addBtn('Volver','alt',menu);}
function b64e(t){return btoa(unescape(encodeURIComponent(t)));}function b64d(t){return decodeURIComponent(escape(atob(t)));}
function backupView(){let run=null;try{run=localStorage.getItem('mcm_run');}catch(e){}const code='MCM1:'+b64e(JSON.stringify({m:META,r:run}));
 showPanel('<h1>💾 Respaldo de partida</h1><p>Copia este código y guárdalo (en tus notas o mándatelo por WhatsApp). Si cambias de celular o se borra el navegador, lo pegas aquí y recuperas todo.</p><textarea id="bkOut" readonly rows="5" class="bk">'+code+'</textarea>');
 addBtn('📋 Copiar código','gold',()=>{const t=$('#bkOut');try{navigator.clipboard.writeText(code);toast('¡Código copiado!');}catch(e){if(t&&t.select){t.select();document.execCommand('copy');}}});
 addBtn('📥 Restaurar desde un código','blu',()=>{showPanel('<h1>📥 Restaurar</h1><p>Pega tu código de respaldo. Esto reemplaza el progreso actual de este celular.</p><textarea id="bkIn" rows="5" class="bk" placeholder="MCM1:..."></textarea>');
  addBtn('✅ Restaurar','gold',()=>{const v=(($('#bkIn')||{}).value||'').trim();try{if(!v.startsWith('MCM1:'))throw 0;const o=JSON.parse(b64d(v.slice(5)));if(!o.m||!o.m.opt)throw 0;localStorage.setItem('mcm_meta',JSON.stringify(o.m));if(o.r)localStorage.setItem('mcm_run',o.r);else localStorage.removeItem('mcm_run');loadMeta();applyOpts();showPanel('<h1>✅ ¡Listo!</h1><p>Recuperaste tu progreso: ⭐ '+META.fama+' de fama</p>');addBtn('Ir al menú','gold',menu);}catch(e){showPanel('<h1>❌ Código inválido</h1><p>Revisa que lo hayas copiado completo, desde "MCM1:" hasta el final.</p>');addBtn('Intentar otra vez','',backupView);}});
  addBtn('Volver','alt',backupView);});
 addBtn('Volver','alt',options);}
function options(){const o=META.opt;if(o.timer===undefined)o.timer=1;
 const sw=(k,ic,l,d)=>'<div class="set"><span class="ic">'+ic+'</span><div class="lb"><b>'+l+'</b>'+(d?'<small>'+d+'</small>':'')+'</div><button class="sw '+(o[k]?'on':'')+'" data-sw="'+k+'"><i></i></button></div>';
 const sl=(k,ic,l)=>{const v=Math.round((o[k]||0)*100);return'<div class="set"><span class="ic">'+ic+'</span><div class="lb"><b>'+l+'</b><input type="range" min="0" max="100" step="5" value="'+v+'" data-sl="'+k+'"></div><span class="pv" id="pv_'+k+'">'+v+'%</span></div>';};
 showPanel('<h1>⚙️ Configuración</h1><h2>🔊 Sonido</h2>'+sl('mv','🎵','Música')+sl('sv','🔔','Efectos')+sl('vv','🎙️','Voz del presentador')+sw('vmus','🏟️','Música de cada arena','Cambia según la categoría en el modo historia')+
  '<h2>🎮 Juego</h2><div class="set"><span class="ic">⏩</span><div class="lb"><b>Velocidad de combate</b></div><div class="seg"><button data-spd="1" class="'+(o.spd!==2?'on':'')+'">x1</button><button data-spd="2" class="'+(o.spd===2?'on':'')+'">x2</button></div></div>'+
  sw('timer','⏱️','Tiempo por turno','45 s en Fácil, 30 en Regular, 20 en Difícil')+sw('vib','📳','Vibración')+sw('tips','💡','Consejos en pantalla','Explicaciones para jugadores nuevos')+sw('big','🔠','Letra grande')+sw('zurdo','👈','Modo zurdo','Botones del combate del otro lado')+'<h2>💾 Datos</h2>');
 const pn=$('#pn');if(pn.querySelectorAll){
  pn.querySelectorAll('[data-sw]').forEach(el=>el.onclick=()=>{const k=el.dataset.sw;o[k]=o[k]?0:1;if(k==='tips'&&o.tips)META.hints={};saveMeta();applyOpts();sfx.card();el.classList.toggle('on',!!o[k]);if(k==='vmus'&&MUSK==='menu'){}});
  pn.querySelectorAll('[data-spd]').forEach(el=>el.onclick=()=>{o.spd=+el.dataset.spd;saveMeta();applyOpts();sfx.card();options();});
  pn.querySelectorAll('[data-sl]').forEach(el=>{el.oninput=()=>{const k=el.dataset.sl,v=+el.value/100;o[k]=v;const pv=$('#pv_'+k);if(pv)pv.textContent=Math.round(v*100)+'%';
   if(k==='mv'){o.music=v>0?1:0;if(!o.music)musicStop();else if(!MUS&&!P)musicStart('menu');}if(k==='sv')o.sfx=v>0?1:0;if(k==='vv')o.voz=v>0?1:0;saveMeta();};
   el.onchange=()=>{if(el.dataset.sl==='sv')sfx.card();if(el.dataset.sl==='vv')voz([{t:'¡Lucha libre!',p:1.4,r:1.1}],true);};});}
 addBtn('💾 Respaldo de partida','blu',backupView,'Copia un código para no perder tu progreso');
 addBtn('ℹ️ Acerca del juego','alt',aboutView);
 addBtn('🗑️ Borrar todo mi progreso','',()=>{showPanel('<h1>⚠️ ¿Borrar todo?</h1><p>Se pierden fama, luchadores, logros y la historia guardada. No se puede deshacer.</p>');addBtn('Sí, borrar todo','',()=>{clearRun();try{localStorage.removeItem('mcm_meta')}catch(e){}META=defMeta();saveMeta();applyOpts();menu();});addBtn('No','alt',options);});
 addBtn('Volver','alt',menu);}
function applyOpts(){const o=META.opt;document.body.classList.toggle('zurdo',!!o.zurdo);if(o.vmus===undefined)o.vmus=1;if(o.tips===undefined)o.tips=1;if(o.mv===undefined)o.mv=.7;if(o.sv===undefined)o.sv=.8;if(o.vv===undefined)o.vv=1;document.body.classList.toggle('big',!!META.opt.big);$('#spdB').innerHTML=ic('play')+(META.opt.spd===2?ic('play')+'<span>x2</span>':'<span>x1</span>');if(!META.opt.music)musicStop();}
function howTo(){const lg='<h2>Colores de las cartas</h2><div class="legend">'+Object.values(CAT).map(k=>'<span style="background:'+k.hd+'">'+k.i+' '+k.n+'</span>').join('')+'</div><h2>Símbolos</h2><p class="small">⚔️ daño · 🛡️ defensa · ❤️ cura · 📣 afición · 🃏 roba cartas · ⚡ energía · 🥴 Débil · 🎯 Abierto · 💫 Mareado · 🔥 Furia · ↩️ Contraataque · 🩸 te lastimas · 🪢 cuerdas · 🗼 tercera · 🏃 fuera del ring · ⏳ se agota · 👁 sospecha\nBorde normal = común · borde azul ◆ = rara · borde dorado brillante ★ = legendaria\n⚔️ en verde = pega más de lo normal · en rojo = menos.</p>';showPanel(lg+'<h1 style="margin-top:14px">❓ Cómo jugar</h1><p>🃏 Toca una carta para usarla. Cuesta ⚡ energía (3 por turno).\n👁 El letrero blanco dice qué hará el rival en su turno.\n🛡 La defensa se acaba cada turno.\n📣 Llena la afición a 10 y te llega tu LLAVE MAESTRA.\n😈 Las cartas sucias son fuertes, pero el réferi puede verte.\n🤝 Relevo: una vez por lucha, entra tu compañero.\n\nCOMBOS (en el mismo turno):\n🪽🪽🪽 3 aéreas: Vuelo en cadena\n🔗🔗 2 llaves: Llave combinada\n👊x4 4 ataques: Ráfaga (+1 energía)\n\n🎭 Cada arena termina en Máscara contra Máscara. Si pierdes, se acaba la historia... pero ganas fama para desbloquear luchadores, mánagers y mejoras.\n😡 Si alguien te gana, se vuelve tu némesis y te busca después.\n💇 Gana un campeonato para desbloquear el siguiente nivel de Cabellera.\n🔗 Las llaves llenan la barra morada del rival: al 100% se rinde.\n📣 A veces la afición pide algo: cúmplelo y te premia.\n🏃 Salir del ring: esquivas un ataque y regresas con un tope doble.\n🧠 El rival decide según cómo vas: el letrero negro dice por qué.\n💥 El botón Listo te dice cuánto daño recibirás.\n⚡ Te guardas 1 de energía si no la usas.\n📌 Toca el alfiler de una carta para guardarla para el siguiente turno.\n📍 Posición: cuerdas 🪢 (aéreas x1.5) o tercera 🗼 (aéreas x2, pero recibes +50% y sin llaves).\n🔄 En el primer turno puedes cambiar tu mano una vez.\n🎁 Sobres: compra con monedas, 5 cartas por sobre según el luchador. Las repetidas suben la carta a Nv2.\n🃏 Mi mazo: en el modo historia usas el mazo que armes (10 a 16 cartas). Las recompensas de la temporada salen de tu colección.\n🏆 Torneo, Retadores y la Lucha del día usan mazos fijos, sin colección.\n🎲 Algunas cartas te dejan elegir su efecto.\n👁 Réferi: al llegar a 3 de sospecha te castiga. Cada turno limpio baja 1.\n👆 Mantén presionada una carta para verla grande.\n🤕 Si recibes mucho daño puedes lastimarte: cura las lesiones en el gimnasio.\n★ Hay cartas raras (azul) y legendarias (dorado).\n💾 La historia se guarda sola en el mapa.</p>');addBtn('🎓 Repetir tutorial','blu',startTutorial);addBtn('Volver','alt',menu);}
function setup(){const s=META.sel;let h='<h1>📖 Modo Historia</h1><p class="small">⭐ '+META.fama+' fama disponible</p><h2>Tu luchador</h2><div class="opt sel"><div class="ic">'+LUCH.T.e+'</div><div><b>'+LUCH.T.n+'</b> · ❤'+LUCH.T.hp+'<br>La historia se vive como técnico: desde abajo, a la buena.</div></div><h2>Estilo para Torneo, Retos y Desafío diario</h2>';
 for(const k in LUCH){const L=LUCH[k],own=META.unl.includes(k);h+='<div class="opt '+(s.l===k?'sel ':'')+(own?'':'lock')+'" data-a="l" data-k="'+k+'"><div class="ic">'+L.e+'</div><div><b>'+L.n+'</b> · ❤'+L.hp+(own?'':' · 🔒 '+L.cost+'⭐')+'<br>'+L.d+'</div></div>';}
 h+='<h2>Mánager</h2>';for(const k in MAN){const M=MAN[k],own=META.man.includes(k);h+='<div class="opt '+(s.man===k?'sel ':'')+(own?'':'lock')+'" data-a="man" data-k="'+k+'"><div class="ic">'+M.e+'</div><div><b>'+M.n+'</b>'+(own?'':' · 🔒 '+M.cost+'⭐')+'<br>'+M.d+'</div></div>';}
 h+='<h2>Compañero de relevo</h2>';for(const k of META.unl){if(k==='T')continue;h+='<div class="opt '+(s.partner===k?'sel':'')+'" data-a="partner" data-k="'+k+'"><div class="ic">'+LUCH[k].e+'</div><div><b>'+LUCH[k].n+'</b><br>Relevo: '+RELEVO[k]+'</div></div>';}
 if(s.cab>META.maxCab)s.cab=META.maxCab;h+='<h2>Dificultad: 💇 Cabellera '+s.cab+(META.maxCab?'':' (gana un campeonato para desbloquear más)')+'</h2>'+(META.maxCab?'<div style="display:flex;gap:8px"><div class="opt" data-a="cab" data-k="-1" style="flex:1;justify-content:center"><b>➖ Bajar</b></div><div class="opt" data-a="cab" data-k="1" style="flex:1;justify-content:center"><b>➕ Subir (máx. '+META.maxCab+')</b></div></div>':'')+'<p class="small">'+(s.cab?CAB.slice(1,s.cab+1).map((t,i)=>(i+1)+'. '+t).join('\n')+'\n⭐ Fama x'+(1+.15*s.cab).toFixed(2):'Sin modificadores.')+'</p>';
 if((META.belts||[]).length){h+='<h2>Cinturón</h2><div class="opt '+(!META.belt?'sel':'')+'" data-a="belt" data-k=""><div class="ic">—</div><div><b>Sin cinturón</b></div></div>';for(const k of META.belts){const B=BELTS[k];h+='<div class="opt '+(META.belt===k?'sel':'')+'" data-a="belt" data-k="'+k+'"><div class="ic">'+B.e+'</div><div><b>'+B.n+'</b><br>'+B.d+'</div></div>';}}
 showPanel(h);
 document.querySelectorAll('#pn .opt').forEach(el=>el.onclick=()=>{const a=el.dataset.a,k=el.dataset.k;sfx.card();if(a==='belt'){META.belt=k;saveMeta();return setup();}
  if(a==='l'){if(!META.unl.includes(k)){if(META.fama<LUCH[k].cost){flashMsg('Te falta fama');return;}META.fama-=LUCH[k].cost;META.unl.push(k);addStarter(k);sfx.win();if(META.unl.length>=Object.keys(LUCH).length)unlock('todos');}s.l=k;}
  if(a==='man'){if(!META.man.includes(k)){if(META.fama<MAN[k].cost){flashMsg('Te falta fama');return;}META.fama-=MAN[k].cost;META.man.push(k);sfx.win();}s.man=k;}
  if(a==='partner')s.partner=k;if(a==='cab')s.cab=Math.max(0,Math.min(META.maxCab,s.cab+(+k)));saveMeta();setup();});
 if(!s.partner||s.partner==='T')s.partner=META.unl.find(x=>x!=='T');
 addBtn('🃏 Editar mazo ('+deckFor('T').length+' cartas)','blu',()=>deckEditor('T'));addBtn('🔔 ¡A LA ARENA!','gold',()=>newRun(false));addBtn('Volver','alt',menu);}
function flashMsg(t){const s=$('#pn h1');if(s){const o=s.textContent;s.textContent='⚠ '+t;setTimeout(()=>{s.textContent=o;},900);}}
function meta_gym(){let h='<h1>🏋️ Gimnasio permanente</h1><p>⭐ '+META.fama+' fama · Estas mejoras duran para siempre.</p>';showPanel(h);
 for(const k in UPG){const U=UPG[k],l=upl(k),max=U.cost.length;addBtn(U.e+' '+U.n+' · Nivel '+l+'/'+max,l>=max?'alt':'blu',()=>{if(l>=max)return;const c=U.cost[l];if(META.fama<c){flashMsg('Te falta fama');return;}META.fama-=c;META.upg[k]=l+1;saveMeta();sfx.win();meta_gym();},l>=max?'Máximo':'Cuesta '+U.cost[l]+'⭐');}
 addBtn('Volver','alt',menu);}
function maskEditor(){const m=META.mask,lk=META.look;let h='<h1>🎨 Mi luchador</h1><canvas id="mprev" width="64" height="80" style="width:128px;height:160px;image-rendering:pixelated;display:block;margin:0 auto 8px;background:#2f1c50;border:3px solid #000"></canvas><h2>Color principal</h2>'+COLORS.map(c=>'<span class="sw '+(m.a===c?'sel':'')+'" data-a="a" data-c="'+c+'" style="background:'+c+'"></span>').join('')+'<h2>Color secundario</h2>'+COLORS.map(c=>'<span class="sw '+(m.b===c?'sel':'')+'" data-a="b" data-c="'+c+'" style="background:'+c+'"></span>').join('')+'<h2>Diseño</h2>';
 for(const p in PATTERNS){const own=META.pats.includes(p),cost=PATTERNS[p];h+='<div class="opt '+(m.p===p?'sel ':'')+(own?'':'lock')+'" data-p="'+p+'"><div><b>'+PATN[p]+'</b>'+(own?'':typeof cost==='number'?' · 🔒 '+cost+'⭐':' · 🎟️ del pase de temporada')+'</div></div>';}
 h+='<h2>Mallas</h2>'+COLORS.map(c=>'<span class="sw '+(lk.trunk===c?'sel':'')+'" data-l="trunk" data-c="'+c+'" style="background:'+c+'"></span>').join('')+'<h2>Botas</h2>'+COLORS.map(c=>'<span class="sw '+(lk.boots===c?'sel':'')+'" data-l="boots" data-c="'+c+'" style="background:'+c+'"></span>').join('');
 h+='<h2>Capa '+(META.capeOwned?'':'(🔒 100⭐)')+'</h2>'+(META.capeOwned?'<span class="sw '+(!lk.cape?'sel':'')+'" data-l="cape" data-c="" style="background:repeating-linear-gradient(45deg,#000 0 4px,#444 4px 8px)"></span>'+COLORS.map(c=>'<span class="sw '+(lk.cape===c?'sel':'')+'" data-l="cape" data-c="'+c+'" style="background:'+c+'"></span>').join(''):'<div class="opt" data-buy="cape"><div class="ic">🦸</div><div><b>Comprar capa</b> · 100⭐</div></div>');
 h+='<h2>🎵 Música de entrada</h2><div class="chips">';for(const k in THEMES){const T_=THEMES[k];if(T_.cost<0)continue;const own=META.themes.includes(k);h+='<span class="chip '+(META.theme===k?'sel':'')+'" data-th="'+k+'">'+(own?'':'🔒')+T_.n+(own?'':' '+T_.cost+'⭐')+'</span>';}h+='</div>';
 h+='<h2>🙌 Pose de victoria</h2><div class="chips">';for(const k in POSES){const own=META.poses.includes(k);h+='<span class="chip '+(META.pose===k?'sel':'')+'" data-po="'+k+'">'+(own?'':'🔒')+POSES[k].n+(own?'':' '+POSES[k].cost+'⭐')+'</span>';}h+='</div>';
 h+='<p class="small">En la versión de tienda, estos cosméticos se podrían comprar también con dinero real.</p>';showPanel(h);
 const pc=$('#mprev').getContext('2d');pc.setTransform(2,0,0,2,0,0);pc.imageSmoothingEnabled=false;luchador(pc,8,6,[m.a,m.b,m.p],false,'#d9a066',PT(),PREVPOSE||false,LK());
 document.querySelectorAll('#pn .sw[data-l]').forEach(el=>el.onclick=()=>{lk[el.dataset.l]=el.dataset.c;saveMeta();maskEditor();});
 const buy=(cost,ok)=>{if(META.fama<cost){flashMsg('Te falta fama');return false;}META.fama-=cost;sfx.win();ok();saveMeta();return true;};
 document.querySelectorAll('#pn [data-buy]').forEach(el=>el.onclick=()=>{buy(100,()=>{META.capeOwned=true;lk.cape='#c0392b';});maskEditor();});
 document.querySelectorAll('#pn .chip[data-th]').forEach(el=>el.onclick=()=>{const k=el.dataset.th;if(!META.themes.includes(k)&&!buy(THEMES[k].cost,()=>META.themes.push(k)))return;META.theme=k;saveMeta();musicStart(k);setTimeout(()=>{if(!C)musicStop();},2600);maskEditor();});
 document.querySelectorAll('#pn .chip[data-po]').forEach(el=>el.onclick=()=>{const k=el.dataset.po;if(!META.poses.includes(k)&&!buy(POSES[k].cost,()=>META.poses.push(k)))return;META.pose=k;saveMeta();PREVPOSE=k;setTimeout(()=>{PREVPOSE=null;},2500);maskEditor();});
 document.querySelectorAll('#pn .sw[data-a]').forEach(el=>el.onclick=()=>{m[el.dataset.a]=el.dataset.c;saveMeta();maskEditor();});
 document.querySelectorAll('#pn .opt[data-p]').forEach(el=>el.onclick=()=>{const p=el.dataset.p;if(!META.pats.includes(p)){const c=PATTERNS[p];if(typeof c!=='number'){flashMsg('Se gana subiendo de nivel (10, 20 y 30)');return;}if(META.fama<c){flashMsg('Te falta fama');return;}META.fama-=c;META.pats.push(p);sfx.win();}m.p=p;saveMeta();maskEditor();});
 addBtn('Listo','',menu);}
function passView(){const lvl=Math.min(PASS.length,Math.floor(META.pass.xp/PASSXP));let h='<h1>🎟️ Pase de temporada</h1><p>'+SEASON.n+'\nXP: '+META.pass.xp+' · Nivel '+lvl+'/'+PASS.length+' (cada '+PASSXP+' de fama ganada = 1 nivel)</p><div class="passrow"><b>Nv</b><b>Gratis</b><b>💎 Premium</b></div>';
 PASS.forEach((r,i)=>{const got=META.pass.claimed.includes(i),av=i<lvl;const f=r.f;const ft=f[0]==='fama'?'⭐ '+f[1]+' fama':f[0]==='pat'?'🎨 Diseño '+PATN[f[1]]:'🏅 Título: '+f[1];
  h+='<div class="passrow"><div>'+(i+1)+'</div><div class="'+(got?'got':'')+'" data-i="'+i+'">'+ft+(got?' ✔':av?' 👉 COBRAR':' 🔒')+'</div><div class="prem">🔒 '+r.p+'</div></div>';});
 h+='<p class="small">El carril premium sería de pago en la versión de tienda (solo cosméticos, sin ventajas).</p>';showPanel(h);
 document.querySelectorAll('.passrow div[data-i]').forEach(el=>el.onclick=()=>{const i=+el.dataset.i;if(i>=lvl||META.pass.claimed.includes(i))return;const f=PASS[i].f;if(f[0]==='fama'){META.fama+=f[1];}if(f[0]==='pat'&&!META.pats.includes(f[1]))META.pats.push(f[1]);if(f[0]==='titulo')META.titulo=f[1];META.pass.claimed.push(i);saveMeta();sfx.win();passView();});
 addBtn('Volver','alt',menu);}
function album(){let h='<h1>📖 Álbum</h1><h2>Máscaras ganadas ('+META.album.length+'/'+Object.keys(MASKS).length+')</h2><div class="grid">';
 for(const k in MASKS){const own=META.album.includes(k);h+='<div class="alb '+(own?'':'no')+'"><div class="ic">'+(own?MASKS[k].e:'❔')+'</div>'+(own?MASKS[k].n.replace('Máscara ',''):(MASKS[k].season?'De temporada':'???'))+'</div>';}
 h+='</div><h2>Rivales desenmascarados</h2><div class="grid">';for(const k of['emperador','siniestro','inmortal','catrina','nieve']){const own=META.unmasked.includes(k);h+='<div class="alb '+(own?'':'no')+'"><div class="ic">'+(own?'😶':'🎭')+'</div>'+(own?EN[k].n:'???')+'</div>';}
 h+='</div><h2>Cinturones ('+(META.belts||[]).length+'/'+Object.keys(BELTS).length+')</h2><div class="grid">';for(const k in BELTS){const own=META.belts.includes(k);h+='<div class="alb '+(own?'':'no')+'"><div class="ic">'+(own?BELTS[k].e:'🔒')+'</div>'+(own?BELTS[k].n.replace('Cinturón ',''):BELTS[k].how)+'</div>';}
 h+='</div><h2>Máscaras de némesis</h2><p>'+((META.trophies||[]).map(k=>'🎭 '+EN[k].n).join('\n')||'Apuesta tu máscara contra tu némesis para ganar la suya.')+'</p><h2>Historias completadas</h2><p>'+Object.keys(LUCH).map(k=>(META.story[k]?'✅ ':'⬜ ')+LUCH[k].e+' '+LUCH[k].n).join('\n')+'</p>';
 h+='<h2>Estadísticas</h2><p>Historias jugadas: '+META.stats.runs+'\nCampeonatos: '+META.stats.wins+'\nMejor llegada: '+(META.stats.bestAct>=4?'¡Campeón!':'Acto '+META.stats.bestAct)+'\nFama total ganada: '+META.total+'</p>';showPanel(h);addBtn('Volver','alt',menu);}

// ---------- Compartir ----------
let LASTF=null;
function lastFight(won,key,turns,ce){const e=EN[key]||{};LASTF={won,key,n:(ce&&ce.n||e.n||'Rival').replace(/ \(.*\)$/,''),m:(ce&&ce.m)||e.m||['#888','#fff','star'],sty:e.sty||ESTY[key]||'T',ehp:ce?Math.max(0,ce.hp):0,emax:ce?ce.max:1,turns:turns||0,php:Math.max(0,P.hp),pmax:P.max,l:P.l,mode:P.mode||(P.daily?'daily':'historia'),ven:VEN[vTier()]?VEN[vTier()].n:'',reto:P.reto,boss:!!e.boss,pn:pnm()};}
function casiTxt(){const f=LASTF;if(!f||f.won||!f.emax||f.ehp<=0)return'';const r=f.ehp/f.emax;if(r>.3)return'';return'<br><br>😤 <b>¡Casi!</b> A '+f.n+' le quedaban solo <b>'+f.ehp+'</b> de vida.';}
function shareBtn(){if(LASTF)addBtn('📸 Compartir resultado','blu',()=>shareCard());}
function shareCard(story){const f=LASTF||{};const c=document.createElement('canvas');c.width=540;c.height=720;const x=c.getContext('2d');x.imageSmoothingEnabled=false;
 const won=story?story.victory:f.won,casi=!won&&f.emax&&f.ehp/f.emax<=.3;
 const g=x.createLinearGradient(0,0,0,720);g.addColorStop(0,won?'#3a1466':'#2a1030');g.addColorStop(1,'#0e0818');x.fillStyle=g;x.fillRect(0,0,540,720);
 const PC=['#ff2e88','#ffd23f','#3b6fb6','#2ecc71','#e67e22','#8e44ad'];for(let i=0;i<18;i++){x.fillStyle=PC[i%6];x.beginPath();x.moveTo(i*30,0);x.lineTo(i*30+30,0);x.lineTo(i*30+30,26);x.lineTo(i*30+15,34);x.lineTo(i*30,26);x.fill();}
 x.textAlign='center';x.fillStyle='#ffd23f';x.font='900 34px monospace';x.fillText('MÁSCARA',270,86);x.fillStyle='#ff2e88';x.font='bold 18px monospace';x.fillText('— CONTRA —',270,110);x.fillStyle='#ffd23f';x.font='900 34px monospace';x.fillText('MÁSCARA',270,144);
 // ring
 x.fillStyle='#3a2a4a';x.fillRect(30,440,480,26);x.fillStyle='#c9c9d9';x.fillRect(30,436,480,6);x.fillStyle='#ff2e88';for(let k=0;k<3;k++)x.fillRect(30,300+k*40,480,3);x.fillStyle='#666';x.fillRect(26,290,10,176);x.fillRect(504,290,10,176);
 const lkP=Object.assign({},(META&&META.look)||{},{style:story?P.l:f.l});
 if(story||!f.n){x.save();x.translate(206,181);x.scale(4,4);big(x,0,0,playerMask(),false,'#d9a066',PT(),won?(META.pose||'brazos'):false,lkP);x.restore();}
 else{  x.save();x.translate(50,181);x.scale(4,4);big(x,0,0,playerMask(),false,'#d9a066',PT(),won?(META.pose||'brazos'):(casi?'guard':false),Object.assign({},lkP,{hurt:won?0:.8}));x.restore();
  x.save();x.translate(362,181);x.scale(4,4);big(x,0,0,f.m,true,'#c98a5a',f.m[1],won?false:'flex',{style:f.sty,hurt:won?.9:Math.max(0,1-f.ehp/f.emax)});x.restore();
  x.fillStyle='#fff';x.font='900 40px monospace';x.fillText('VS',270,360);}
 // banner
 const head=story?(won?'¡CAMPEÓN MUNDIAL!':'¡ME QUITARON LA MÁSCARA!'):won?(f.boss?'¡LE GANÉ LA MÁSCARA!':'¡1, 2, 3! ¡GANÉ!'):casi?'¡CASI LO LOGRO!':'ME GANARON... HOY';
 x.fillStyle=won?'#ffd23f':casi?'#ff9a3c':'#e74c3c';x.fillRect(20,490,500,62);x.fillStyle='#000';x.fillRect(20,546,500,6);x.fillStyle='#1a1020';x.font='900 30px monospace';x.fillText(head,270,532);
 x.fillStyle='#fff';x.font='bold 20px monospace';const L_=[];
 if(story){L_.push(story.pn+' · '+LUCH[P.l].n);L_.push('Luchas ganadas: '+P.won+' · Fama: '+P.fama);if(story.where)L_.push(story.where);}
 else{L_.push(f.pn+'  vs  '+f.n);if(won)L_.push('En '+f.turns+' turnos · me quedó '+f.php+' de vida');else L_.push(casi?'Le dejé solo '+f.ehp+' de vida':'Le dejé '+f.ehp+' de '+f.emax+' de vida');if(f.ven)L_.push(f.ven);}
 L_.forEach((t,i)=>{x.fillStyle=i?'#d8c8ff':'#fff';x.font=(i?'':'bold ')+'19px monospace';x.fillText(t.slice(0,40),270,588+i*30);});
 x.fillStyle='#ff9ccf';x.font='900 22px monospace';x.fillText(won?'¿TÚ PUEDES IGUALARLO?':'¿TÚ LE GANAS?',270,690);
 const txt='🎭 '+(story?(won?'¡Fui CAMPEÓN MUNDIAL en Máscara contra Máscara!':'Llegué lejos en Máscara contra Máscara.'):won?'¡Le gané a '+f.n+' en Máscara contra Máscara!':casi?'¡Le dejé '+f.ehp+' de vida a '+f.n+' en Máscara contra Máscara!':'Me ganó '+f.n+' en Máscara contra Máscara.')+' ¿Tú puedes?'+(location.protocol.startsWith('http')?' '+location.origin+location.pathname:'');
 const url=c.toDataURL('image/png');const back=document.querySelector('#pn')?document.querySelector('#pn').innerHTML:null;
 const fallback=()=>{showPanel('<h1>📸 Tu resultado</h1><img src="'+url+'" style="width:100%;border:3px solid #000"><p class="small">Mantén presionada la imagen para guardarla y compartirla.</p>');
  addBtn('📋 Copiar texto','blu',async()=>{try{await navigator.clipboard.writeText(txt);flashMsg('¡Copiado!');}catch(e){flashMsg('No se pudo copiar');}});addBtn('Volver al menú','',menu);};
 if(navigator.share&&c.toBlob){c.toBlob(b=>{try{const file=new File([b],'mascara-contra-mascara.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[file]}))navigator.share({files:[file],text:txt}).catch(()=>{});else fallback();}catch(e){fallback();}},'image/png');}else fallback();}
function share(victory){shareCard({victory,pn:pnm(),where:P.ch!==undefined&&!P.mode?'Capítulo '+(P.ch+1)+' · '+VEN[P.ch].n:''});}

// ---------- Efectos ----------
let shoutT=0;function shout(t){const s=$('#shout');s.textContent=t;s.classList.add('on');clearTimeout(shoutT);shoutT=setTimeout(()=>s.classList.remove('on'),900);}
function shake(){const w=$('#ringwrap');w.classList.remove('shake');void w.offsetWidth;w.classList.add('shake');}
const PARTS=[];function confetti(n){for(let i=0;i<n;i++)PARTS.push({x:R(20,180),y:R(-10,10),vx:R(-.6,.6),vy:R(.4,1.4),c:pick(['#ff2e88','#ffd23f','#3b6fb6','#2ecc71','#fff']),l:R(60,110)});}
function count123(cb){refDo('count',200);let i=0;const n=['1...','2...','¡¡3!!'];const step=()=>{if(i<3){shout(n[i]);sfx.slap();vib(30);voz([{t:['¡Uno!','¡Dos!','¡Tres!'][i],p:1.15+i*.25,r:1.3}],true);if(i===2){sfx.bell();confetti(20);}i++;setTimeout(step,W(480));}else setTimeout(cb,W(350));};step();}
function ad(cb){const o=$('#adov');o.classList.add('on');let n=3;$('#adc').textContent=n;const t=setInterval(()=>{n--;$('#adc').textContent=n;if(n<=0){clearInterval(t);o.classList.remove('on');cb();}},1000);}

// ---------- UI ----------
function showPanel(h){const pn=$('#pn');pn.innerHTML=h;$('#ov').classList.add('on');pn.scrollTop=0;if(pn.classList){pn.classList.remove('pnin');void pn.offsetWidth;pn.classList.add('pnin');}}
function hidePanel(){$('#ov').classList.remove('on');}
function addBtn(l,c,f,sub){const b=document.createElement('button');b.className='b '+(c||'');b.innerHTML=l+(sub?'<div class="small">'+sub+'</div>':'');b.onclick=()=>{sfx.card();f();};$('#pn').appendChild(b);}
function setLog(t){$('#log').innerHTML=t;}
function float(who,t,col,n){const w=$('#ringwrap');const e=document.createElement('div');e.className='fl'+(n>=20?' huge':n>=12?' big':'');e.textContent=t;e.style.color=col;e.style.left=(who==='p'?16+R(0,12):60+R(0,12))+'%';e.style.bottom='calc(var(--ch,min(55vw,286px)) * .42)';w.appendChild(e);setTimeout(()=>e.remove(),900);}
function stHTML(st,block){let h='';if(block)h+='<b>🛡'+block+'</b>';for(const k in st)if(st[k])h+='<b title="'+STN[k]+'">'+STI[k]+(NONUM.includes(k)?'':st[k])+'</b>';return h;}
function render(){
 const inC=!!C;showTip();if(P&&TON)titleOn(false);
 if(!P){$('#tAct').textContent='🎭 MCM';$('#tHp').textContent='';$('#tGold').textContent=META?'⭐'+META.fama:'';$('#relics').textContent='';}
 else{$('#tAct').textContent=P.daily?'📅 Del día':P.tut?'🎓 Tutorial':P.mode==='torneo'?'🏆 Torneo':P.mode==='amistoso'?'⚔️ Amistoso':P.mode==='rapida'?'⚡ Lucha rápida':P.mode==='reto'?'👻 Reto':(P.ch!==undefined?VEN[P.ch].e+' Cap. '+(P.ch+1)+'/7':'Acto '+(P.act+1)+' · '+(Math.min(P.row,6)+1)+'/7');$('#tHp').textContent='❤ '+Math.max(0,P.hp)+'/'+P.max;$('#tGold').textContent='$'+P.gold;$('#relics').textContent=P.masks.map(m=>MASKS[m].e).join('')+((P.inj&&P.inj.length)?'🤕'+P.inj.length:'');}
 $('#endT').disabled=!inC||C.busy;$('#endT').innerHTML=ic('campana')+'<span>LISTO'+tmTxt()+'</span>';$('#relevo').innerHTML=ic('apreton')+'<span>RELEVO</span>';$('#mullB').innerHTML=ic('cambiar')+'<span>MANO</span>';$('#why').style.display='none';$('#relevo').disabled=!inC||C.busy||C.relevoUsed;if(!inC)$('#relevo').style.display='none';
 if(P){$('#pName').textContent=LUCH[P.l].e+' '+pnm();$('#pHpI').style.width=Math.max(0,P.hp/P.max*100)+'%';$('#pHpT').textContent=Math.max(0,P.hp)+'/'+P.max;}
 const vt=$('#vote');
 if(!inC){$('#hand').innerHTML='';$('#eName').textContent='';$('#eHpI').style.width='0';$('#eHpT').textContent='';$('#intent').style.display='none';$('#pSt').innerHTML='';$('#eSt').innerHTML='';$('#en').textContent='';$('#piles').textContent='';$('#affI').style.width='0';$('#affT').textContent='Afición';$('#sus').textContent='';$('#subb').style.display='none';vt.className='';if(!P){$('#pName').textContent='';$('#pHpI').style.width='0';$('#pHpT').textContent='';}return;}
 const E=C.e;$('#eName').textContent=E.n;$('#eHpI').style.width=Math.max(0,E.hp/E.max*100)+'%';$('#eHpT').textContent=Math.max(0,E.hp)+'/'+E.max;
 $('#subb').style.display=C.sub>0?'block':'none';$('#subI').style.width=C.sub+'%';
 $('#intent').style.display=C.over?'none':'block';$('#intent').textContent=intentText();
 $('#pSt').innerHTML=(C.pos!=='centro'?'<b>'+(C.pos==='tercera'?'🗼 Tercera':'🪢 Cuerdas')+'</b>':'')+stHTML(C.p.st,C.p.block);const mb=$('#mullB');mb.style.display=(!C.tut&&C.turn===1&&!C.mullUsed&&!C.played.length&&!C.busy)?'flex':'none';$('#eSt').innerHTML=stHTML(E.st,E.block);
 $('#affI').style.width=C.aff*10+'%';$('#affT').textContent='Afición '+C.aff+'/10';
 $('#sus').textContent=P.l==='R'||C.sus?'👁 '+C.sus+'/'+refT():'';$('#sus').style.color=C.sus>=refT()?'#ff6b6b':C.sus===refT()-1?'#ffd23f':'';
 if(!C.over&&C.e.cur){const w_=$('#why');w_.textContent=C.e.st.mareado?'💫 No podrá moverse':C.e.why;w_.style.display='none';if(!C.busy){const inc=incoming();$('#endT').innerHTML=ic('campana')+'<span>LISTO'+tmTxt()+'</span>'+(C.e.cur.dmg&&!C.e.st.mareado?'<em>'+(inc>0?ic('golpe')+inc:ic('defensa')+'0')+'</em>':'');}}
 if(C.vote&&!C.over){const ok=C.vote.ck();vt.className='on'+(ok?' ok':'');vt.textContent='📣 La afición pide: '+C.vote.t+(ok?' ✅':'');}else vt.className='';
 $('#en').innerHTML='<span class="enb">'+ic('energia')+'<b>'+C.energy+'</b><small>/'+C.maxE+'</small></span><span class="pips">'+Array.from({length:C.maxE},(_,k)=>'<i class="'+(k<C.energy?'on':'')+'"></i>').join('')+'</span>';{const nx=C.pile.length?C.pile[C.pile.length-1]:null;$('#piles').innerHTML='<span>'+ic('mazo')+C.pile.length+'</span><span>'+ic('cambiar')+C.disc.length+'</span>'+(C.tut?'':'<span class="nxc" id="nxc">'+(nx?'Sigue: <b>'+def(nx).n+'</b>':'Se baraja')+'</span>');const ne=$('#nxc');if(ne)ne.onclick=()=>{if(nx){const d=def(nx);setLog('🔮 Tu siguiente carta: <b>'+d.n+'</b> · '+d.c+'⚡'+(d.dmg?' · ⚔️'+d.dmg+(d.hits?'x'+d.hits:''):'')+(d.block?' · 🛡'+d.block:'')+(d.heal?' · ❤'+d.heal:''));}else setLog('🔀 Tu mazo está vacío: al robar se barajean tus descartes.');};}
 $('#hand').innerHTML=C.hand.map((c,i)=>cardHTML(c,i,cardCost(c)>C.energy||C.busy||def(c).useless)).join('');
 document.querySelectorAll('#hand .card').forEach(el=>{const i=+el.dataset.i;lpBind(el,C.hand[i],()=>play(i));});
 document.querySelectorAll('#hand .pin').forEach(el=>{el.onclick=e=>{e.stopPropagation&&e.stopPropagation();const c=C.hand[+el.dataset.pin];if(!c||C.busy)return;C.keep=C.keep===c.uid?null:c.uid;sfx.card();hint('pin','📌 Guardaste una carta: no se descarta al terminar el turno. Solo puedes guardar 1.');render();};el.onpointerdown=e=>{e.stopPropagation&&e.stopPropagation();};});pulseCards();}

// ---------- Ring ----------
const cv=$('#ring'),cx=cv.getContext('2d');cx.imageSmoothingEnabled=false;
function shade(h,a){if(typeof h!=='string'||h[0]!=='#')return h;h=h.slice(1);if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=[0,2,4].map(i=>Math.max(0,Math.min(255,parseInt(h.slice(i,i+2),16)+a)));return'#'+n.map(v=>v.toString(16).padStart(2,'0')).join('');}
function luchador(ctx,x,y,m,flip,skin,trunk,fr,lk){const u=.5;const P_=(a,b,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(x+(flip?(32-a-w):a)*u,y+b*u,w*u,h*u);};
 let[A,B,pat]=m;const W=lk&&lk.wear!==undefined?lk.wear:9;if(W<=1){A=mixC(A,'#8a8a8a',.45);B=mixC(B,'#8a8a8a',.45);trunk=mixC(trunk,'#777',.5);}let BT=W===0?'#d8d8d8':W===1?'#555':((lk&&lk.boots)||B);let cape=lk&&lk.cape;if(W<4)cape=null;else if(W<9&&!cape)cape=shade(A,-25);const pose=typeof fr==='string'?fr:null;const sk=skin,skD=shade(skin,-30),skL=shade(skin,24),AD=shade(A,-40),AL=shade(A,35),trD=shade(trunk,-40),btD=shade(BT,-45),band=B===trunk?A:B;
 if(cape){const cD=shade(cape,-35);P_(4,19,24,35,cape);P_(2,50,28,5,cape);P_(4,19,3,35,cD);P_(25,19,3,35,cD);}
 P_(9,46,6,11,sk);P_(17,46,6,11,sk);P_(9,46,2,11,skD);P_(21,46,2,11,skD);
 P_(8,50,8,4,'#1c1c1c');P_(16,50,8,4,'#1c1c1c');P_(9,50,6,1,'#4a4a4a');P_(17,50,6,1,'#4a4a4a');
 P_(8,56,8,7,BT);P_(16,56,8,7,BT);P_(8,56,8,1,btD);P_(16,56,8,1,btD);P_(11,58,2,1,'#fff');P_(11,60,2,1,'#fff');P_(19,58,2,1,'#fff');P_(19,60,2,1,'#fff');P_(7,62,10,2,'#111');P_(15,62,10,2,'#111');
 P_(8,39,16,8,trunk);P_(8,39,16,2,band);P_(8,41,2,6,trD);P_(22,41,2,6,trD);P_(15,43,2,4,trD);P_(10,44,2,2,band);P_(20,44,2,2,band);
 P_(7,21,18,18,sk);P_(7,21,2,18,skD);P_(23,21,2,18,skD);P_(10,22,12,2,skL);P_(9,27,6,1,skD);P_(17,27,6,1,skD);P_(15,24,2,4,skD);P_(15,30,2,8,skD);P_(12,32,8,1,skD);P_(12,35,8,1,skD);P_(11,30,1,1,skL);P_(20,30,1,1,skL);
 P_(13,18,6,4,skD);P_(5,21,4,4,sk);P_(23,21,4,4,sk);P_(5,21,4,1,skL);P_(23,21,4,1,skL);
 const armL=dy=>{P_(3,23+dy,4,9,sk);P_(3,23+dy,1,9,skD);P_(3,31+dy,4,5,sk);P_(3,34+dy,4,3,'#f0f0f0');P_(3,35+dy,4,1,'#cfcfcf');P_(3,37+dy,4,3,sk);P_(3,39+dy,4,1,skD);P_(2,38+dy,1,2,sk);};
 const armR=dy=>{P_(25,23+dy,4,9,sk);P_(28,23+dy,1,9,skD);P_(25,31+dy,4,5,sk);P_(25,34+dy,4,3,'#f0f0f0');P_(25,35+dy,4,1,'#cfcfcf');P_(25,37+dy,4,3,sk);P_(25,39+dy,4,1,skD);P_(29,38+dy,1,2,sk);};
 if(pose==='brazos'||pose==='cuerda'){P_(3,4,4,19,sk);P_(3,4,1,19,skD);P_(3,6,4,3,'#f0f0f0');P_(3,2,4,4,sk);P_(3,2,4,1,skL);P_(25,4,4,19,sk);P_(28,4,1,19,skD);P_(25,6,4,3,'#f0f0f0');P_(25,2,4,4,sk);P_(25,2,4,1,skL);}
 else if(pose==='flex'){P_(0,20,8,5,sk);P_(0,10,5,11,sk);P_(1,13,3,3,skL);P_(0,11,5,2,'#f0f0f0');P_(0,8,5,3,sk);P_(0,8,5,1,skL);P_(24,20,8,5,sk);P_(27,10,5,11,sk);P_(28,13,3,3,skL);P_(27,11,5,2,'#f0f0f0');P_(27,8,5,3,sk);P_(27,8,5,1,skL);}
 else if(pose==='senala'){armL(0);P_(25,14,4,10,sk);P_(28,8,4,8,sk);P_(28,9,4,2,'#f0f0f0');P_(29,4,4,5,sk);P_(32,3,1,3,sk);}
 else if(pose==='lariat'){armL(0);P_(25,23,11,4,sk);P_(25,23,11,1,skL);P_(25,26,11,1,skD);P_(32,23,2,4,'#f0f0f0');P_(34,22,4,5,sk);P_(34,26,4,1,skD);}
 else if(pose==='chop'){armL(0);P_(25,6,4,18,sk);P_(28,6,1,18,skD);P_(25,6,4,2,'#f0f0f0');P_(25,1,4,5,sk);P_(25,1,1,5,skD);}
 else if(pose==='kick'){armL(-4);armR(-4);P_(21,44,12,6,sk);P_(21,44,12,1,skL);P_(31,42,5,9,BT);P_(35,43,1,7,btD);}
 else if(pose==='guard'){P_(4,21,4,8,sk);P_(24,21,4,8,sk);}
 else if(pose==='hug'){P_(3,23,4,9,sk);P_(22,22,13,4,sk);P_(22,30,13,4,sk);P_(33,21,4,4,sk);P_(33,29,4,4,sk);P_(31,22,2,3,'#f0f0f0');P_(31,30,2,3,'#f0f0f0');}
 else{armL(fr?-7:0);armR(0);}
 P_(10,3,12,16,A);P_(11,2,10,1,A);P_(9,5,1,12,AD);P_(22,5,1,12,AD);P_(12,3,6,2,AL);P_(10,17,12,2,AD);
 const Q=(a,b,w,h)=>P_(a,b,w,h,B);
 if(pat==='star'){Q(15,3,2,5);Q(13,5,6,1);}if(pat==='bolt'){Q(17,2,3,2);Q(15,4,3,2);Q(17,6,2,2);}
 if(pat==='crown'){Q(10,0,2,3);Q(15,-2,2,4);Q(20,0,2,3);Q(10,2,12,1);}if(pat==='horns'){Q(8,-2,2,7);Q(22,-2,2,7);Q(7,-4,2,2);Q(23,-4,2,2);}
 if(pat==='crest'){Q(13,-4,6,6);Q(15,-6,2,2);}if(pat==='bands'){Q(10,6,12,1);Q(10,13,12,1);}
 if(pat==='skull'){Q(12,13,8,1);Q(12,15,2,2);Q(18,15,2,2);Q(15,3,2,3);}if(pat==='spots'){Q(11,4,2,2);Q(19,5,2,2);Q(12,14,2,2);Q(20,13,1,2);}
 if(pat==='fin'){Q(14,-4,5,7);}if(pat==='x'){Q(12,3,2,1);Q(13,4,2,1);Q(15,5,2,1);Q(17,4,2,1);Q(18,3,2,1);}
 if(pat==='flame'){Q(11,12,2,6);Q(19,12,2,6);Q(13,16,6,1);Q(15,-1,2,3);}
 if(pat==='heart'){Q(13,3,2,2);Q(17,3,2,2);Q(13,5,6,1);Q(14,6,4,1);}
 if(pat==='diamond'){Q(15,2,2,1);Q(14,3,4,1);Q(15,4,2,1);Q(10,13,1,2);Q(21,13,1,2);}
 if(pat==='hair'){P_(10,5,12,14,sk);P_(10,1,12,4,B);P_(9,3,2,7,B);P_(21,3,2,7,B);P_(12,8,3,1,B);P_(17,8,3,1,B);P_(12,9,3,2,'#fff');P_(17,9,3,2,'#fff');P_(13,9,1,2,'#222');P_(18,9,1,2,'#222');P_(15,12,2,2,skD);P_(14,15,4,1,'#8a3a3a');P_(10,17,12,2,skD);}
 else{P_(11,8,5,4,B);P_(16,8,5,4,B);P_(12,9,3,2,'#fff');P_(17,9,3,2,'#fff');P_(13,9,1,2,'#111');P_(18,9,1,2,'#111');P_(15,12,2,2,AD);P_(13,14,6,3,B);P_(14,15,4,2,sk);P_(14,16,4,1,'#7a2a2a');}
 if(lk&&lk.style&&lk.style!=='T')styleOv(P_,lk.style,A,B,AD,trunk,trD,band,sk,skD,skL,pat,pose);if(W<9)wearOv(P_,W,sk,skD,A,B);if(lk&&lk.scars)scarOv(P_,lk.scars);if(lk&&lk.hurt)hurtOv(P_,lk.hurt,sk,skD,A,B);if(pose==='guard'){P_(8,15,5,11,sk);P_(19,15,5,11,sk);P_(8,14,5,2,'#f0f0f0');P_(19,14,5,2,'#f0f0f0');P_(8,10,5,4,sk);P_(19,10,5,4,sk);P_(8,10,5,1,skL);P_(19,10,5,1,skL);}}
// ---- réferi ----
const REF={x:100,tx:100,st:'idle',t:0,wait:0};
function refDo(st,dur){REF.st=st;REF.t=dur||90;}
function refFall(msg){if(!C||C.tut)return;refDo('fall',150);C.refDown=true;shout(msg);sfx.big();com('refFall');setLog('🦓 '+msg+' Este turno el réferi no ve tus trampas.');hint('refFall','🦓 ¡El réferi está en el suelo! Mientras esté así, tus cartas sucias no suben la sospecha. ¡Aprovecha!');}
function drawRef(){const s=1.15;let x=REF.x,y=84-32*s;const st=REF.st;if(REF.t>0)REF.t--;else if(st!=='idle')REF.st='idle';
 if(REF.st==='idle'){if(--REF.wait<=0){REF.tx=82+Math.random()*34;REF.wait=120+Math.random()*120;}REF.x+=Math.sign(REF.tx-REF.x)*Math.min(.3,Math.abs(REF.tx-REF.x));}
 const ctx=cx;const P_=(a,b,w,h,c,ox,oy)=>{ctx.fillStyle=c;ctx.fillRect((ox||x)+a*s,(oy||y)+b*s,w*s,h*s);};
 if(REF.st==='fall'){ctx.save();ctx.translate(x+8,82);ctx.rotate(-Math.PI/2);x=-16*s;y=-8*s;}
 if(REF.st==='count')y+=8;
 const walk=REF.st==='idle'&&Math.abs(REF.tx-REF.x)>.5?(Math.floor(tk/8)%2):0,bob=REF.st==='dance'?(Math.floor(tk/6)%2)*-2:0;y+=bob;
 if(REF.st!=='count'){P_(5,20,3,10-walk,'#222');P_(8,20,3,10-(1-walk),'#222');P_(4,30-walk,4,2,'#000');P_(8,30-(1-walk),4,2,'#000');}else{P_(4,20,8,4,'#222');P_(3,24,5,2,'#000');}
 P_(4,9,8,11,'#fff');for(let i=0;i<4;i++)P_(5+i*2,9,1,11,'#111');P_(7,9,2,1,'#c0392b');
 const sk='#e0ac69';
 if(REF.st==='point'){P_(0,10,4,2,'#fff');P_(-3,10,3,2,sk);P_(12,10,2,7,'#fff');P_(12,17,2,2,sk);}
 else if(REF.st==='count'){const up=Math.floor(tk/12)%2;P_(12,10,2,6,'#fff');P_(12,up?6:16,2,4,sk);P_(2,10,2,7,'#fff');P_(2,17,2,2,sk);}
 else if(REF.st==='dance'){const a=Math.floor(tk/6)%2;P_(2,a?3:10,2,7,'#fff');P_(2,a?1:17,2,2,sk);P_(12,a?10:3,2,7,'#fff');P_(12,a?17:1,2,2,sk);}
 else{P_(2,10,2,7,'#fff');P_(2,17,2,2,sk);P_(12,10,2,7,'#fff');P_(12,17,2,2,sk);}
 P_(5,2,6,7,sk);P_(5,1,6,2,'#222');P_(6,4,1,1,'#111');P_(9,4,1,1,'#111');P_(6,6,4,1,'#3a2a1a');
 if(REF.st==='fall'){ctx.restore();for(let i=0;i<3;i++){const a=tk/10+i*2.1;ctx.fillStyle='#ffd23f';ctx.fillRect(REF.x+8+Math.cos(a)*7,70+Math.sin(a)*3,2,2);}}}
const CROWD=[];for(let i=0;i<220;i++)CROWD.push([Math.floor(Math.random()*200),2+Math.floor(Math.random()*34),['#ff2e88','#ffd23f','#3b6fb6','#fff','#2ecc71','#e67e22'][i%6]]);
let tk=0;const SC=2,FY=94-32*SC;
function big(ctx,x,y,m,flip,skin,trunk,fr,lk){const st=lk&&lk.style,k=st==='G'?1.18:st==='M'?.76:st==='V'?.95:1;ctx.save();ctx.translate(Math.round(x+16*(1-k)),Math.round(y+64*(1-k)));ctx.scale(SC*k,SC*k);luchador(ctx,0,0,m,flip,skin,trunk,fr,lk);ctx.restore();}
function mixC0(){}
function mixC(a,b,t){const h=x=>{x=x.replace('#','');if(x.length===3)x=x.split('').map(c=>c+c).join('');return[0,2,4].map(i=>parseInt(x.substr(i,2),16));};try{const A=h(a),B=h(b);return'#'+A.map((v,i)=>Math.round(v*(1-t)+B[i]*t).toString(16).padStart(2,'0')).join('');}catch(e){return a;}}
function wearOv(P_,W,sk,skD,A,B){
 if(W===0){P_(17,4,3,3,'#8a6a4a');P_(17,4,3,1,'#5a4030');P_(11,13,2,2,'#6a6a6a');P_(16,3,1,1,'#222');P_(20,7,1,1,'#222');P_(16,7,1,1,'#222');
  P_(9,50,6,4,sk);P_(17,50,6,4,sk);P_(9,50,1,4,skD);P_(22,50,1,4,skD);P_(8,55,8,2,'#fff');P_(16,55,8,2,'#fff');
  P_(8,57,8,5,'#d8d8d8');P_(16,57,8,5,'#d8d8d8');P_(8,60,8,1,'#c33');P_(16,60,8,1,'#c33');P_(7,62,10,2,'#888');P_(15,62,10,2,'#888');P_(12,45,2,2,sk);P_(19,42,1,2,sk);}
 if(W===1){P_(17,4,3,3,shade(A,-25));P_(16,3,1,1,'#222');P_(20,7,1,1,'#222');P_(9,50,6,4,'#555');P_(17,50,6,4,'#555');}
 if(W>=3){P_(12,4,1,2,'#fff');P_(13,3,1,1,'#fff');P_(9,50,6,4,B);P_(17,50,6,4,B);P_(9,51,6,1,A);P_(17,51,6,1,A);}
 if(W>=5){if((tk>>3)%2){P_(10,41,1,1,'#fff');P_(21,43,1,1,'#fff');P_(14,6,1,1,'#fff');P_(11,58,1,1,'#fff');}else{P_(13,42,1,1,'#fff');P_(18,40,1,1,'#fff');P_(19,12,1,1,'#fff');P_(20,59,1,1,'#fff');}}
 if(W>=6){P_(10,17,12,1,'#ffd23f');P_(8,39,16,1,'#ffd23f');P_(8,56,8,1,'#ffd23f');P_(16,56,8,1,'#ffd23f');P_(9,4,1,12,'#ffd23f');P_(22,4,1,12,'#ffd23f');P_(14,0,4,2,'#ffd23f');}}
const WEARTXT=['Máscara remendada, tenis de tianguis y un calzón deslavado.','Botas viejas de segunda mano y la máscara cosida por tu mamá.','¡Botas de verdad y colores nuevos! Ya pareces luchador profesional.','Rodilleras de tus colores y una máscara que brilla con los reflectores.','¡Tu primera capa de entrada!','Lentejuelas que brillan con las luces de la tele.','Detalles dorados de campeón. Te ves como leyenda.'];
function PT(){return(META&&META.look.trunk)||(META?META.mask.b:'#ffd23f');}function LK(){const l=Object.assign({},META&&META.look||{},{style:P?P.l:(META&&META.sel?META.sel.l:'T')});if(P&&!P.mode&&!P.daily&&!P.tut)Object.assign(l,{wear:vTier(),scars:P.scars});return l;}
EN.gemelos={n:'Gemelo Infernal I',hp:46,ai:'agresivo',m:['#1a1a1a','#e67e22','flame'],mv:[{n:'Doble patada',dmg:5,hits:2},{n:'Cubrirse',block:7},{n:'Lanzazo',dmg:9}],note:'Dos hermanos que pelean como uno solo.'};
EN.gemelos2={n:'Gemelo Infernal I',hp:64,ai:'agresivo',m:['#1a1a1a','#c0392b','flame'],mv:[{n:'Doble patada',dmg:6,hits:2},{n:'Cubrirse',block:8},{n:'Lanzazo',dmg:11},{n:'Cerrojo',dmg:7,ap:{debil:1}}],note:'Los Gemelos Infernales, ahora en la Arena del barrio.'};
const ESTY={gallo:'R',charro:'R',tramposo:'R',calavera:'R',veneno:'R',charrooro:'R',panzon:'G',carnicero:'G',bestia:'G',nieve:'G',inmortal:'G'};
function playerMask(){return META?[META.mask.a,META.mask.b,META.mask.p]:['#3b6fb6','#ffd23f','star'];}
let REXT=0;
function drawRing(){tk++;const vt=vTier(),V=VEN[vt];const rw=$('#ringwrap');if(rw&&rw.style.setProperty&&tk%15===1){const H=rw.clientHeight,Wd=rw.clientWidth;if(Wd>0&&H>0){const ext=Math.max(0,Math.min(200,Math.floor(200*H/Wd-110)));if(ext!==REXT){REXT=ext;const cv=$('#ring');if(cv&&cv.height!==undefined){cv.height=2*(110+ext);cx.imageSmoothingEnabled=false;}}}const ch=Math.min(H,Wd*.55);fitHand();if(rw._ch!==ch+'/'+H){rw._ch=ch+'/'+H;rw.style.setProperty('--ch',ch+'px');rw.style.setProperty('--hb',Math.max(0,Math.min(ch+2,H-46))+'px');}}if(rw&&rw.dataset.v!==String(vt)){rw.dataset.v=vt;rw.style.backgroundColor=V.bg;}cx.setTransform(2,0,0,2,0,0);cx.imageSmoothingEnabled=false;cx.fillStyle=V.bg;cx.fillRect(0,0,200,110+REXT);if(REXT)drawStands(vt,V);cx.setTransform(2,0,0,2,0,2*REXT);
 drawVenue(vt,V);
 const hype=C?C.aff:2;const nC=Math.round(CROWD.length*V.crowd);for(let i=0;i<nC;i++){let[x,y,c]=CROWD[i];if(vt<=1)y=34+y%9;cx.fillStyle=c;cx.globalAlpha=vt<=1?.8:.55;const j=(Math.floor(tk/(hype>7?4:8)+x)%3===0&&hype>3)?(hype>7?2:1):0;cx.fillRect(x,y-j,2,2);if(vt<=1){cx.fillStyle='#d9a066';cx.fillRect(x,y-2-j,2,2);}else{cx.fillStyle='#c8905e';cx.fillRect(x,y-j-1,2,1);if(hype>6&&i%3===0){cx.fillStyle=c;cx.fillRect(x-1,y-j-3,1,2);cx.fillRect(x+2,y-j-3,1,2);}}}cx.globalAlpha=1;
 if(vt>=2){cx.fillStyle=vt>=5?'#ffffff16':'#ffffff10';for(let i=0;i<4;i++){const sw=vt>=4?Math.round(Math.sin(tk/40+i)*6):0;cx.beginPath();cx.moveTo(30+i*50,0);cx.lineTo(10+i*55+sw,44);cx.lineTo(25+i*55+sw,44);cx.fill();}}
 cx.fillStyle=SEASON.k==='muertos'&&vt===2?'#e8b04a':V.mat;cx.fillRect(8,76,184,20);cx.fillStyle='#00000018';for(let i=0;i<184;i+=8)cx.fillRect(8+i,76,1,20);
 if(vt===0){cx.fillStyle='#8a7a5e';cx.fillRect(40,80,12,6);cx.fillRect(122,85,15,5);cx.fillStyle='#c2b08c';cx.fillRect(88,78,9,4);cx.fillStyle='#5a4a35';for(const[x,y]of[[40,80],[122,85]]){cx.fillRect(x,y,1,1);cx.fillRect(x+11,y,1,1);}}
 cx.fillStyle='#00000030';cx.fillRect(8,94,184,4);cx.fillStyle=V.apr;cx.fillRect(8,98,184,12);
 if(V.logo){cx.font='bold 7px monospace';cx.textAlign='center';cx.fillStyle=vt===6?'#ffd23f':'#ffffffcc';cx.fillText(V.logo,100,107);cx.textAlign='left';}
 cx.fillStyle=V.post;cx.fillRect(8,40,4,58);cx.fillRect(188,40,4,58);cx.fillStyle=V.tb;cx.fillRect(8,40,4,4);cx.fillRect(188,40,4,4);V.rope.forEach((c,i)=>{cx.fillStyle=c;if(vt===0){for(let x=0;x<184;x+=4)cx.fillRect(8+x,50+i*8+Math.round(Math.sin(x/184*Math.PI)*3),4,1);}else cx.fillRect(8,50+i*8,184,1);});
 const pm=playerMask(),sk='#d9a066',esk='#c68a55';
 if(C||UNM)drawRef();
 if(C){const a=C.anim,frozen=a.stop>0;const PO=mvOff('p'),EO=mvOff('e'),PR=mvReact('p'),ER=mvReact('e');const pdx=PO.dx+PR.dx,pdy=PO.dy+PR.dy,pl=PO.pose,edx=EO.dx+ER.dx,edy=EO.dy+ER.dy,el=EO.pose;
  let ej=0;if(C.mv&&C.mv.who==='p'&&C.mv.type==='llave'){const p=C.mv.t/C.mv.dur;if(p>.25&&p<.8)ej=(C.mv.t%4<2?1:-1);}
  const posx=C.pos==='tercera'?-14:C.pos==='cuerdas'?-10:0,posy=C.pos==='tercera'?-20:0;const px=20+posx+pdx-(a.pf>0?(a.pf%2?2:-2):0),py=FY+posy+pdy,ex=148+edx+(a.ef>0?(a.ef%2?2:-2):0)+ej,ey=FY+edy;
  if(C.stip==='relevos')tagDraw();
  if(C.p.st.fuera){cx.globalAlpha=.45;}
  const wonPose=C.over&&C.e.hp<=0?(META.pose||'brazos'):null;if(!(a.pf>0&&a.pf%2)){drawF(px,wonPose==='cuerda'?py-14:py,pm,!!PO.flipT,sk,PT(),wonPose||(C.introT>0&&META.ent?(C.introT--,META.ent.pose):pl),Object.assign({},LK()||{},{hurt:Math.max(0,1-P.hp/P.max)}),wonPose?0:PO.rot+PR.rot);drawProp(PO,px,py,false);}else big(cx,px,py,['#fff','#fff','star'],false,'#fff','#fff',false);cx.globalAlpha=1;
  
  if(C.over&&C.e.hp<=0){cx.save();cx.translate(ex+16,80);cx.rotate(Math.PI/2);cx.scale(SC,SC);luchador(cx,-8,-16,C.e.m,true,esk,C.e.m[1],false,{hurt:1});cx.restore();}
  else{if(C.e.st.evade)cx.globalAlpha=.5;if(!(a.ef>0&&a.ef%2)){drawF(ex,ey,C.e.m,!EO.flipT,esk,C.e.m[1],el,{hurt:Math.max(0,1-C.e.hp/C.e.max),style:(EN[C.e.key]&&EN[C.e.key].sty)||ESTY[C.e.key]||'T'},EO.rot+ER.rot);drawProp(EO,ex,ey,true);}else big(cx,ex,ey,['#fff','#fff','star'],true,'#fff','#fff',false);cx.globalAlpha=1;}
  if(!frozen&&C.mv){C.mv.t++;if(C.mv.t>C.mv.dur)C.mv=null;}
  if(frozen)a.stop--;else for(const k of['pf','ef'])if(a[k]>0)a[k]--;}
 else if(UNM){UNM.t++;const ps=META.pose||'brazos';big(cx,ps==='cuerda'?10:20,ps==='cuerda'?FY-14:FY,pm,false,sk,PT(),ps,LK());const off=Math.min(40,UNM.t*.7);
  big(cx,148,FY,[esk,'#3a2a1a','hair'],true,esk,UNM.m[1],false);
  cx.fillStyle=UNM.m[0];cx.fillRect(158-off*.3,FY+2-off,12,16);cx.fillStyle=UNM.m[1];cx.fillRect(160-off*.3,FY+8-off,4,3);cx.fillRect(166-off*.3,FY+8-off,4,3);}
 else if(P||META){big(cx,84,FY,pm,false,sk,PT(),PREVPOSE||Math.floor(tk/30)%2,LK());}
 if(C&&C.flash>0){cx.fillStyle='rgba(255,255,255,'+(C.flash*.15)+')';cx.fillRect(0,0,200,110);C.flash--;}
 for(let i=PARTS.length-1;i>=0;i--){const p=PARTS[i];p.x+=p.vx;p.y+=p.vy;if(p.g)p.vy+=p.g;p.l--;cx.fillStyle=p.c;cx.fillRect(Math.round(p.x),Math.round(p.y),2,2);if(p.l<=0||p.y>110)PARTS.splice(i,1);}
 requestAnimationFrame(drawRing);}
$('#endT').onclick=endTurn;$('#relevo').onclick=relevo;$('#mullB').onclick=()=>{mulligan();};$('#spdB').onclick=()=>{META.opt.spd=META.opt.spd===2?1:2;saveMeta();applyOpts();sfx.card();};

// ---------- Avisos, narradores, cinturones ----------
let PREVPOSE=null;const HQ=[];let hintOn=false;
function hint(id,text){if(!META||META.hints[id]||(P&&P.tut)||META.opt.tips===0)return;META.hints[id]=1;saveMeta();HQ.push(text);if(!hintOn)nextHint();}
function nextHint(){const el=$('#hintb');const t=HQ.shift();if(!t){hintOn=false;el.classList.remove('on');return;}hintOn=true;el.innerHTML='<button id="hok">OK</button>'+t;el.classList.add('on');$('#hok').onclick=()=>{sfx.card();nextHint();};}
const COMS={start:[['Profe','Lucha pareja, señores. Esto promete.'],['Chucho','¡Ya llegó el que andaba ausente, compadre!'],['Chucho','¡Abróchense los cinturones, que esto se pone bueno!']],
 big:[['Profe','Impacto de alto nivel técnico.'],['Chucho','¡Lo dejó como chicle pegado en la suela!'],['Chucho','¡Hasta acá en la cabina se oyó ese trancazo!']],
 air:[['Profe','Ejecución limpia desde las alturas.'],['Chucho','¡Ese chamaco tiene alas, mi Profe!'],['Chucho','¡Vuela más que mi suegra cuando hay ofertas!']],
 dirty:[['Profe','Eso es completamente antirreglamentario.'],['Chucho','¡No vi nada, no vi nada!'],['Chucho','¡Ay, qué mañas, como mi cuñado en el dominó!']],
 fin:[['Profe','Ahí está. La llave maestra.'],['Chucho','¡SE CAE LA ARENA, SE CAE LA ARENA!'],['Chucho','¡Esto no lo enseñan en la escuela, Profe!']],
 low:[['Profe','Se le ve muy castigado.'],['Chucho','¡Aguanta, campeón, que tu mamá te está viendo!']],
 combo:[['Profe','Una secuencia perfectamente encadenada.'],['Chucho','¡Combo, combo, como en las tortas!']],
 revive:[['Profe','Increíble recuperación.'],['Chucho','¡Se levantó más rápido que yo los lunes!']],
 ref:[['Profe','El réferi por fin hizo su trabajo.'],['Chucho','¡Lo cacharon con las manos en la masa!']],
 refFall:[['Chucho','¡El réferi besó la lona! ¡Esto es lucha libre, señores!'],['Profe','Lamentable. El réferi está fuera de combate.'],['Chucho','¡Ese réferi tiene menos equilibrio que mi tío en boda!']],
 sub:[['Profe','Esa llave está haciendo mucho daño.'],['Chucho','¡Ya va a soltar el pañuelo blanco!']]};
let comT=0;function com(k){let L=COMS[k];if(k==='start'&&P&&!P.mode&&!P.daily&&!P.tut&&chance(.65))L=VEN[vTier()].com;if(!L||!chance(k==='start'||k==='fin'||k==='refFall'?.9:.5))return;const[w,t]=pick(L);const el=$('#com');el.textContent='🎙️ '+(w==='Profe'?'El Profe Ramírez':'Chucho Bocinas')+': "'+t+'"';clearTimeout(comT);comT=setTimeout(()=>{el.textContent='';},4000);}
const BELTS={peso:{n:'Cinturón de Peso Completo',e:'🥇',d:'+6 de vida máxima',how:'Sé campeón mundial'},torneo:{n:'Cinturón del Torneo',e:'🏆',d:'+1 de afición al inicio de cada lucha',how:'Gana un torneo'},hard:{n:'Cinturón Hardcore',e:'⛓️',d:'Tus cartas sucias hacen +2 de daño',how:'Sé campeón en Cabellera 3+'},retos:{n:'Cinturón de Retadores',e:'👻',d:'+3 de defensa al inicio de cada lucha',how:'Gana 5 retos'},promo:{n:'Cinturón del Promotor',e:'🏟️',d:'+20% de dinero en temporada',how:'Llena tu arena 3 veces'},muertos:{n:'Cinturón de Muertos',e:'🌼',d:'+1 de furia al inicio de cada lucha',how:'Sé campeón en Temporada de Muertos'},navidad:{n:'Cinturón Navideño',e:'🎄',d:'+1 de furia al inicio de cada lucha',how:'Sé campeón en Temporada Navideña'}};
function gainBelt(k){if(!META.belts.includes(k)){META.belts.push(k);if(!META.belt)META.belt=k;saveMeta();const el=$('#ach');el.textContent='🏆 ¡Nuevo cinturón: '+BELTS[k].n+'!';el.classList.add('on');clearTimeout(achT);achT=setTimeout(()=>el.classList.remove('on'),2800);}}
const POSES={brazos:{n:'Brazos arriba',cost:0},flex:{n:'Músculo',cost:50},senala:{n:'Señalar al público',cost:50},cuerda:{n:'Subirse a la esquina',cost:80}};
const LSTORY={
 T:{intro:'Creciste viendo luchas en la tele de tu abuelo. Juraste que un día tu máscara saldría en esa misma pantalla.\n\nHoy empiezas desde abajo, con una mochila, tu máscara cosida a mano... y un sueño.',end:'Tu abuelo ve la final en la misma tele de siempre. Cuando levantas el cinturón, se pone de pie y grita tu nombre. El barrio entero sale a la calle a festejar.'},
 R:{intro:'Tu antiguo maestro te corrió del gimnasio por hacer trampa. "Nunca serás nadie", te dijo.\n\nAhora regresas con más mañas que nunca. Vas a llegar a la cima... y él lo va a ver desde primera fila.',end:'Tu viejo maestro está en primera fila. Cuando ganas, no aplaude... pero sonríe. "Sigues siendo un tramposo", dice. "Pero eres MI tramposo."'},
 G:{intro:'Eras el cargador más fuerte del mercado de abastos. Un promotor te vio levantar un camión de sandías y te ofreció una máscara.\n\nNo sabes ni una llave... pero nadie te ha podido mover.',end:'Los compañeros del mercado llegan a la arena con mantas: "¡NUESTRO GIGANTE!". Esa noche hay sandía gratis para todos.'},
 V:{intro:'En tu familia todos son trapecistas de circo. Tú decidiste volar en otro lugar: el ring.\n\nTu mamá dice que estás loca. Tu abuela te cosió la máscara a escondidas.',end:'El circo entero llega a la final. Cuando aterrizas el Huracán Estelar, el público se queda en silencio un segundo... y luego explota. Tu mamá llora más que nadie.'},
 X:{intro:'Te dijeron que un exótico nunca sería campeón. Que el público solo se reiría de ti.\n\nEl público sí se ríe... pero contigo. Y nadie llena una arena como tú.',end:'Desfilas con el cinturón entre lentejuelas y confeti. Los que se burlaron ahora piden tu autógrafo. "Les dije", dices, y les mandas un beso.'},
 M:{intro:'Mides 1.40 y todos te dicen "el mini". En los vestidores ni te pelan.\n\nPero tienes algo que ellos no: nadie te ha podido atrapar jamás.',end:'Cuando el réferi te levanta la mano, tienes que pararte en la silla para que te vean. A nadie le importa: eres el más grande de todos.'}};

// ---------- Entradas ----------
function entrance(cb){if(!META.opt.ent)return cb();entOwn();if(META.ent.song)musicStart(META.ent.song);let beat=0,hits=0,pos=0,iv=0,done=false;const speed=()=>1.6+beat*.45;
 showPanel('<h1>🎶 ¡Tu entrada!</h1><p>Toca <b>¡AHORA!</b> cuando la marca amarilla pase por la zona verde. Cada acierto = +1 de afición al empezar.</p><div style="position:relative;height:34px;background:#2a1640;border:3px solid #000;margin:6px 0"><div style="position:absolute;left:40%;width:20%;top:0;bottom:0;background:#2e9d46"></div><div id="entm" style="position:absolute;top:0;bottom:0;width:6px;background:#ffd23f;left:0"></div></div><p id="ents" class="small">Golpe 1 de 4 · Aciertos: 0</p>');
 const fin=()=>{if(done)return;done=true;clearInterval(iv);P.flags.entAff=hits;if(hits)shout('¡ENTRADA DE '+hits+'/4!');cb();};
 const nb=ok=>{if(ok){hits++;sfx.combo();vib(25);}else beep(150,.08);beat++;pos=0;const s=$('#ents');if(s)s.textContent='Golpe '+Math.min(4,beat+1)+' de 4 · Aciertos: '+hits;if(beat>=4)setTimeout(fin,300);};
 iv=setInterval(()=>{if(beat>=4)return;pos+=speed();if(pos>=100)nb(false);const m=$('#entm');if(m)m.style.left=Math.min(97,pos)+'%';},16);
 addBtn('🥁 ¡AHORA!','gold',()=>{if(beat>=4)return;nb(pos>=40&&pos<=60);});addBtn('Saltar entrada','alt',()=>{hits=Math.max(hits,0);fin();});
 musicStart(META.theme);}

// ---------- Torneo ----------
const TNAMES=['El Pato Salvaje','La Reina Pirata','Doctor Vudú','Mini Ciclón','El Elegante','Rayo de Oro','La Sombra Roja','Toro Bravo','El Místico Azul','Pantera Negra'];
function torneo(){showPanel('<h1>🏆 Modo Torneo</h1><p>Elige cómo quieres luchar.</p>');addBtn('⚔️ Amistoso','gold',amistoso,'Una lucha rápida: escoges a tu luchador, al rival, la arena y el tipo de lucha.');addBtn('🏆 Torneo eliminatorio','blu',torneoElim,'8 luchadores, 3 rondas. Gana el cinturón.');addBtn('Volver','alt',menu);}
function torneoElim(){const L=LUCH[META.sel.l],def_=(META.belts||[]).includes('torneo');
 showPanel('<h1>🏆 Torneo eliminatorio</h1><p>'+(def_?'🛡️ <b>Defensa del título</b>: en la final te espera El Inmortal.\n\n':'')+'8 luchadores, 3 rondas: cuartos, semifinal y final.\nNo hay gimnasio: solo recuperas 25% de vida entre rondas.\nLuchas con '+L.e+' '+L.n+' + 4 cartas extra.\n\n🏆 Premio: '+(def_?'+120⭐ (defensa)':'Cinturón del Torneo + 80⭐')+'</p>');
 addBtn('🔔 ¡Entrar al torneo!','gold',()=>{newRun('torneo');for(let i=0;i<4;i++)P.deck.push(mkc(rollCard('elite'),chance(.3)));
  const names=shuffle(TNAMES.slice()).slice(0,7);P.tr={r:0,names,def:def_,opp:[pick(ACTS[1].pool),pick(['ciclon','bestia']),def_?'inmortal':pick(['emperador','siniestro'])],sc:[1,1.05,def_?.9:1.05]};torneoBracket();});
 addBtn('Volver','alt',menu);}
function torneoBracket(){const t=P.tr,R=['Cuartos de final','Semifinal','FINAL'];let h='<h1>🏆 Torneo</h1><p class="small">❤ '+P.hp+'/'+P.max+' · Mazo: '+P.deck.length+' cartas</p>';
 R.forEach((rn,i)=>{h+='<div class="brk '+(i<t.r?'won':i===t.r?'cur':'')+'"><span><b>'+rn+'</b><br>'+LUCH[P.l].e+' Tú vs '+EN[t.opp[i]].n+'</span><span>'+(i<t.r?'✅':i===t.r?'👉':'🔒')+'</span></div>';});
 h+='<p class="small">Otros luchadores del cuadro: '+t.names.join(', ')+'.</p>';showPanel(h);
 addBtn(t.r===2?'🎭 ¡A la gran final!':'🔔 ¡Siguiente lucha!','gold',()=>{const go=()=>startCombat(t.opp[t.r],'torneo',{sc:t.sc[t.r]});t.r===2?entrance(go):go();});
 addBtn('🏳️ Abandonar','alt',()=>torneoEnd(false));}
function torneoNext(){P.tr.r++;if(P.tr.r>=3)return torneoEnd(true);healP(Math.round(P.max*.25));rewardCards('elite',torneoBracket);}
function torneoEnd(won){const t=P.tr;const f=won?(t.def?120:80):t.r*15;coins(won?100:t.r*20);META.fama+=f;META.total+=f;META.pass.xp+=f;if(won){gainBelt('torneo');unlock('torneo');}saveMeta();sfx[won?'win':'lose']();
 showPanel('<h1>'+(won?'🏆 ¡CAMPEÓN DEL TORNEO!':'😵 Eliminado')+'</h1><p>'+(won?(t.def?'Defendiste tu cinturón con éxito.':'¡El Cinturón del Torneo es tuyo! Póntelo antes del modo historia para tener +1 de afición en cada lucha.'):'Llegaste a '+['cuartos de final','la semifinal','la final'][Math.min(2,t.r)]+'.'+casiTxt())+'\n\n⭐ +'+f+' fama</p>');P=null;shareBtn();addBtn('Volver al menú','',menu);}

// ---------- Retadores ----------
const BOTS=[{n:'El Pato Salvaje',l:'G',deck:['golpe','golpe','lazo','aplastar','muralla','cabezazo','titan'],m:['#2e9d46','#ffd23f','crest']},{n:'La Reina Pirata',l:'V',deck:['hurra','patada','tope','tornillo','bloqueo','plancha'],m:['#111','#ffffff','skull']},{n:'Doctor Vudú',l:'R',deck:['piquete','silla','mordida','bajo','bloqueo','arranca'],m:['#8e44ad','#2ecc71','x']},{n:'Mini Ciclón',l:'M',deck:['golpe2','esquiva','tope','contra','chop','tornillo'],m:['#16a085','#fff','bolt']},{n:'El Elegante',l:'X',deck:['provoca','beso','chop','resistir','golpe','tapatia'],m:['#ff2e88','#ffd23f','heart']}];
function deckMoves(ids){const out=[];const u=[...new Set(ids)];for(const id of u){const d=CARDS[id];if(!d||d.t==='fin'||d.useless)continue;if(d.dmg)out.push({n:d.n,dmg:Math.max(5,Math.round(d.dmg*1.05)+1),hits:d.hits});else if(d.block)out.push({n:d.n,block:d.block});else if(d.sf)out.push({n:d.n,sf:{furia:1}});else if(d.ap)out.push({n:d.n,ap:{debil:1}});if(out.length>=6)break;}if(!out.some(m=>m.dmg))out.push({n:'Golpe',dmg:7});return out;}
function retos(){const g=(META.ghosts||[]).slice(-2),list=shuffle(BOTS.slice()).slice(0,3-Math.min(1,g.length)).concat(g.length?[pick(g)]:[]);
 showPanel('<h1>👻 Retadores</h1><p>Pelea contra copias de otros luchadores controladas por la máquina. Cada victoria: +15⭐. Gana 5 para el Cinturón de Retadores.\n\n<span class="small">Aquí son bots y copias de tus historias pasadas. En la versión de tienda serían copias de jugadores reales.</span></p>');
 list.forEach(o=>addBtn(LUCH[o.l].e+' '+o.n,o.ghost?'gold':'blu',()=>startReto(o),(o.ghost?'Tu historia pasada':'Bot')+' · estilo '+LUCH[o.l].n+' · '+o.deck.length+' cartas'));addBtn('Volver','alt',menu);}
function startReto(o){newRun('reto');for(let i=0;i<4;i++)P.deck.push(mkc(rollCard('elite'),chance(.3)));EN.ghost={n:o.n,hp:95+o.deck.length*5,m:o.m,mv:deckMoves(o.deck),note:'Pelea con el estilo de '+LUCH[o.l].n+'.'};P.reto=o;startCombat('ghost','reto');}
function retoEnd(won){if(won){META.cnt.retos++;coins(25);META.fama+=15;META.total+=15;META.pass.xp+=15;if(META.cnt.retos>=5){gainBelt('retos');unlock('retos5');}}saveMeta();
 showPanel('<h1>'+(won?'👻 ¡Venciste al retador!':'😵 El retador ganó')+'</h1><p>'+(won?'⭐ +40 fama\n':'')+'Retos ganados: '+META.cnt.retos+casiTxt()+'</p>');P=null;if(!won&&LASTF&&LASTF.reto){const o=LASTF.reto;addBtn('🔁 Revancha','gold',()=>startReto(o));}shareBtn();addBtn('Otro reto','blu',retos);addBtn('Volver al menú','',menu);}

// ---------- Promotora ----------
const PROMO_CD=20*60*1000;
function promoReady(){return Date.now()-(META.promo.last||0)>=PROMO_CD;}
function promoStars(){const st=[];META.unl.forEach(k=>st.push({k:'l_'+k,n:LUCH[k].e+' '+LUCH[k].n,pop:3}));(META.unmasked||[]).forEach(k=>{if(EN[k])st.push({k:'e_'+k,n:'🎭 '+EN[k].n,pop:EN[k].boss?6:3});});(META.trophies||[]).forEach(k=>st.push({k:'t_'+k,n:'😡 '+EN[k].n+' (sin máscara)',pop:4}));return st;}
function promo(){const pr=META.promo,cap=pr.lvl*150,left=PROMO_CD-(Date.now()-(pr.last||0));
 showPanel('<h1>🏟️ Tu promotora</h1><p>Arena nivel '+pr.lvl+' · Capacidad: '+cap+'\n👥 Fans: '+pr.fans+' · Funciones: '+pr.shows+' · Llenos: '+pr.full+'\n\nArma el cartel con los luchadores que has desbloqueado y los rivales que has desenmascarado. Entre más estrellas, más gente.</p>');
 if(left<=0)addBtn('🎪 Organizar función','gold',promoSetup);else{const m=Math.ceil(left/60000);addBtn('⏳ Próxima función en '+m+' min','alt',()=>{});addBtn('📺 Ver anuncio y organizar ya','gold',()=>ad(promoSetup));}
 if(pr.lvl<5)addBtn('🔨 Ampliar arena (nivel '+(pr.lvl+1)+') · '+(150*pr.lvl)+'⭐','blu',()=>{const c=150*pr.lvl;if(META.fama<c){flashMsg('Te falta fama');return;}META.fama-=c;pr.lvl++;saveMeta();sfx.win();promo();},'Capacidad: '+((pr.lvl+1)*150));
 addBtn('Volver','alt',menu);}
function promoSetup(){const st=promoStars(),sel=[];let price='normal';const draw_=()=>{let h='<h1>🎪 Arma tu cartel</h1><p class="small">Elige 2 o 3 estrellas y el precio del boleto.</p><div class="chips">'+st.map((x,i)=>'<span class="chip '+(sel.includes(i)?'sel':'')+'" data-s="'+i+'">'+x.n+' ⭐'+x.pop+'</span>').join('')+'</div><h2>Boleto</h2><div class="chips">'+[['barato','🎟️ Barato'],['normal','🎫 Normal'],['caro','💎 Caro']].map(([k,l])=>'<span class="chip '+(price===k?'sel':'')+'" data-p="'+k+'">'+l+'</span>').join('')+'</div><p class="small">Barato: más gente y más fans. Caro: menos gente pero más fama por persona.</p>';
  showPanel(h);document.querySelectorAll('#pn .chip[data-s]').forEach(el=>el.onclick=()=>{const i=+el.dataset.s,j=sel.indexOf(i);if(j>=0)sel.splice(j,1);else if(sel.length<3)sel.push(i);sfx.card();draw_();});
  document.querySelectorAll('#pn .chip[data-p]').forEach(el=>el.onclick=()=>{price=el.dataset.p;sfx.card();draw_();});
  addBtn('🚪 ¡Abrir las puertas!','gold',()=>{if(sel.length<2){flashMsg('Elige al menos 2');return;}promoRun(sel.map(i=>st[i]),price);});addBtn('Volver','alt',promo);};draw_();}
function promoRun(stars,price){const pr=META.promo,cap=pr.lvl*150,pop=stars.reduce((a,x)=>a+x.pop,0);const am={barato:1.35,normal:1,caro:.7}[price],pv={barato:1,normal:2,caro:3.2}[price];
 const att=Math.round(Math.min(cap,(40+pop*14+pr.fans*.6)*am*R(.85,1.15)));const f=Math.max(5,Math.round(att*pv/8));const fans=Math.round(att*.08*(price==='barato'?1.5:1));
 pr.fans+=fans;pr.shows++;coins(Math.round(att/6));pr.last=Date.now();const full=att>=cap;if(full)pr.full++;META.fama+=f;META.total+=f;META.pass.xp+=f;saveMeta();if(pr.full>=3)gainBelt('promo');if(pr.shows>=5)unlock('promotor');sfx.crowd();confetti(30);
 showPanel('<h1>'+(full?'🔥 ¡LLENO TOTAL!':'🎪 Función terminada')+'</h1><p>Cartel: '+stars.map(x=>x.n).join(' vs ')+'\n\n👥 Asistencia: '+att+' / '+cap+(full?' 🎉':'')+'\n⭐ +'+f+' fama\n💰 +'+Math.round(att/6)+' monedas\n💗 +'+fans+' fans nuevos'+(full&&pr.lvl<5?'\n\nTip: ¡amplía la arena para que quepa más gente!':'')+'</p>');addBtn('Volver a la promotora','',promo);}

// ---------- Colección, sobres y mazo ----------
const DECKMIN=10,DECKMAX=16;
function colLv(id){return META.col&&META.col[id]?META.col[id].lv:1;}
function colN(id){return META.col&&META.col[id]?META.col[id].n:0;}
function packPool(l){return[...new Set(LUCH[l].pool.concat(LUCH[l].deck,RARE,l==='R'?RARE_D:[],LEG))].filter(id=>CARDS[id]&&CARDS[id].t!=='fin'&&!CARDS[id].useless);}
function maxCopies(id){return CARDS[id].rar==='l'?1:CARDS[id].rar==='r'?2:3;}
function deckFor(l){const d=META.decks[l];if(d&&d.length>=DECKMIN&&d.every(id=>colN(id)>=d.filter(x=>x===id).length))return d.slice();return LUCH[l].deck.slice();}
const UPC={c:[3,60],r:[2,120],l:[1,250]};function upCost(id){return UPC[CARDS[id].rar||'c'];}
function rollRar(type,i){const r=Math.random();if(type==='oro'&&i===0)return r<.25?'l':'r';if(type==='tut'&&i===0)return'r';const L_=type==='oro'?.06:.03,R_=type==='oro'?.28:.17;return r<L_?'l':r<L_+R_?'r':'c';}
function openPack(l,type){const pool=packPool(l),by={c:pool.filter(id=>!CARDS[id].rar),r:pool.filter(id=>CARDS[id].rar==='r'),l:pool.filter(id=>CARDS[id].rar==='l')};const out=[];
 for(let i=0;i<6;i++){const rr=rollRar(type,i);const lst=by[rr].length?by[rr]:by.c;const id=pick(lst);const isNew=colN(id)===0&&!out.some(o=>o.id===id);colAdd(id);out.push({id,isNew});}
 out.sort((a,b)=>({c:0,r:1,l:2}[CARDS[a.id].rar||'c'])-({c:0,r:1,l:2}[CARDS[b.id].rar||'c']));saveMeta();if(out.some(o=>CARDS[o.id].rar==='l'))setTimeout(()=>unlock('legend'),400);return out;}
function packs(){colInit();const l=META.packL&&META.unl.includes(META.packL)?META.packL:META.sel.l;const L=LUCH[l];const free=META.freePack!==todayStr();
 showPanel('<h1>🎁 Sobres</h1><p><span class="pill">⭐ '+META.fama+' fama</span></p><p class="small">Cada sobre trae 6 cartas del estilo del luchador que elijas. Las repetidas sirven para subir de nivel tus cartas.</p><h2>¿De qué luchador?</h2><div class="chips">'+META.unl.map(k=>'<span class="chip '+(k===l?'sel':'')+'" data-l="'+k+'">'+LUCH[k].e+' '+LUCH[k].n+'</span>').join('')+'</div>');
 document.querySelectorAll('#pn .chip[data-l]').forEach(el=>el.onclick=()=>{META.packL=el.dataset.l;saveMeta();sfx.card();packs();});
 const buy=(type,cost)=>{if(META.fama<cost){flashMsg('Te falta fama');return;}META.fama-=cost;sfx.win();reveal(openPack(l,type),type,packs);};
 META.ptok=META.ptok||{};['oro','arena'].forEach(t=>{if(META.ptok[t]>0)addBtn('🎁 Abrir sobre '+(t==='oro'?'de Oro':'de Arena')+' gratis (tienes '+META.ptok[t]+')','gold',()=>{META.ptok[t]--;saveMeta();reveal(openPack(l,t),t,packs);},'Lo ganaste jugando');});
 if(free)addBtn('📺 Sobre gratis del día (ver anuncio)','gold',()=>ad(()=>{META.freePack=todayStr();reveal(openPack(l,'arena'),'arena',packs);}),'6 cartas de '+L.n);
 addBtn('🎁 Sobre de Arena · 100💰','blu',()=>buy('arena',100),'6 cartas · 17% rara · 3% legendaria');
 addBtn('🌟 Sobre de Oro · 300💰','gold',()=>buy('oro',300),'6 cartas · 1 rara asegurada · 6% legendaria');
 addBtn('🃏 Ver mi colección y mazo','alt',()=>deckEditor(l));addBtn('Volver','alt',menu);}
function reveal(cards,type,back){if(!reveal._go){const oro=type==='oro';showPanel('<h1>'+(oro?'🌟 Sobre de Oro':'🎁 Sobre de Arena')+'</h1><p class="small" style="text-align:center">Toca el sobre para abrirlo</p><div class="sobre'+(oro?' oro':'')+'" id="sob"><div class="sbtop"></div><div class="sbm">'+ic('mascara','big')+'</div><div class="sbt">MÁSCARA<br><small>contra</small><br>MÁSCARA</div><div class="sbn">'+(oro?'SOBRE DE ORO':'SOBRE DE ARENA')+' · 6 CARTAS</div></div>');
  const el=$('#sob');let taps=0;el.onclick=()=>{taps++;sfx.card();vib(20);el.classList.remove('shk');void el.offsetWidth;el.classList.add('shk');if(taps>=2){el.onclick=null;sfx.slap&&sfx.slap();el.classList.add('rip');if(oro){confetti(30);}setTimeout(()=>{reveal._go=1;reveal(cards,type,back);},W(650));}};return;}
 reveal._go=0;let open=0;const n=cards.length;
 showPanel('<h1>'+(type==='oro'?'🌟 Sobre de Oro':'🎁 ¡Abriendo sobre!')+'</h1><p class="small">Toca cada carta para voltearla.</p><div class="packs" id="pk">'+cards.map((o,i)=>'<div class="card back'+(type==='oro'?' gl':'')+'" data-i="'+i+'">🎭</div>').join('')+'</div>');
 const flip=el=>{if(!el.classList.contains('back'))return;const i=+el.dataset.i,o=cards[i],c=mkc(o.id,colLv(o.id)>=2),d=CARDS[o.id];const w=document.createElement('div');w.className='cwrap';w.innerHTML=cardHTML(c,i)+'<div class="lbl">'+(o.isNew?'🆕 ¡NUEVA!':'x'+colN(o.id)+' en tu colección')+'</div>';
  el.replaceWith(w);const ce=w.querySelector('.card');if(ce){ce.classList.add('flip');lpBind(ce,c,()=>zoomCard(c));}
  if(d.rar==='l'){sfx.crowd();confetti(40);shout('¡LEGENDARIA!');voz([{t:'¡Legendaria!',p:1.5,r:1.1}],true);vib(150);}else if(d.rar==='r'){sfx.combo();vib(40);}else sfx.card();
  open++;if(open>=n)done();};
 const done=()=>{addBtn('🎁 Abrir otro','gold',back);addBtn('🃏 Armar mi mazo','blu',()=>deckEditor(META.packL||META.sel.l));addBtn('Menú','alt',menu);};
 document.querySelectorAll('#pk .card.back').forEach(el=>el.onclick=()=>flip(el));
 addBtn('✨ Voltear todas','alt',()=>{document.querySelectorAll('#pk .card.back').forEach(el=>flip(el));});}
function deckEditor(l){colInit();l=l||META.sel.l;const L=LUCH[l];let deck=deckFor(l);const save=()=>{META.decks[l]=deck.slice();saveMeta();};
 const draw_=()=>{const pool=packPool(l).filter(id=>colN(id)>0).sort((a,b)=>({c:0,r:1,l:2}[CARDS[a].rar||'c'])-({c:0,r:1,l:2}[CARDS[b].rar||'c'])||CARDS[a].n.localeCompare(CARDS[b].n));
  const cnt=id=>deck.filter(x=>x===id).length;const okSize=deck.length>=DECKMIN&&deck.length<=DECKMAX;
  let h='<h1>🃏 Mazo de '+L.e+' '+L.n+'</h1><div class="chips">'+META.unl.map(k=>'<span class="chip '+(k===l?'sel':'')+'" data-l="'+k+'">'+LUCH[k].e+'</span>').join('')+'</div><p><span class="pill">⭐ '+META.fama+'</span><span class="pill" style="'+(okSize?'':'color:#ff6b6b;border-color:#ff6b6b')+'">🃏 '+deck.length+' / '+DECKMAX+' (mín. '+DECKMIN+')</span></p><p class="small">Toca una carta de tu mazo para sacarla. Toca una de tu colección para meterla. Mantén presionada para verla grande.</p>';
  const dU=[...new Set(deck)];h+='<h2>Tu mazo para el modo historia</h2><div class="grid3" id="dk">'+dU.map((id,i)=>'<div class="cwrap">'+cardHTML(mkc(id,colLv(id)>=2),i)+'<div class="lbl">x'+cnt(id)+' en el mazo · toca para quitar 1</div></div>').join('')+'</div>';
  h+='<h2>Tu colección</h2><div class="grid3" id="cl">'+pool.map((id,i)=>{const [need,cost]=upCost(id);const lv=colLv(id),n=colN(id),can=lv<2&&CARDS[id].up&&n>=need+1;return'<div class="cwrap">'+cardHTML(mkc(id,lv>=2),i,cnt(id)>=Math.min(n,maxCopies(id)))+'<div class="lbl">Tienes '+n+' · Nv'+lv+' · 🃏'+cnt(id)+'</div>'+(lv<2&&CARDS[id].up?'<button class="b sm '+(can?'gold':'alt')+'" data-up="'+id+'" style="width:114px;margin:0;padding:6px 2px;font-size:10px">⬆️ Nv2 '+Math.min(n-1,need)+'/'+need+' · '+cost+'⭐</button>':'')+'</div>';}).join('')+'</div>';
  showPanel(h);
  document.querySelectorAll('#pn .chip[data-l]').forEach(el=>el.onclick=()=>{if(okSize)save();deckEditor(el.dataset.l);});
  document.querySelectorAll('#dk .card').forEach(el=>{const id=dU[+el.dataset.i];lpBind(el,mkc(id,colLv(id)>=2),()=>{if(deck.length<=DECKMIN){flashMsg('Mínimo '+DECKMIN+' cartas');return;}deck.splice(deck.lastIndexOf(id),1);save();sfx.card();draw_();});});
  document.querySelectorAll('#cl .card').forEach(el=>{const id=pool[+el.dataset.i];lpBind(el,mkc(id,colLv(id)>=2),()=>{if(deck.length>=DECKMAX){flashMsg('Máximo '+DECKMAX+' cartas');return;}if(cnt(id)>=Math.min(colN(id),maxCopies(id))){flashMsg(cnt(id)>=maxCopies(id)?'Máximo '+maxCopies(id)+' copias':'No tienes más copias');return;}deck.push(id);save();sfx.card();draw_();});});
  document.querySelectorAll('#cl [data-up]').forEach(el=>el.onclick=()=>{const id=el.dataset.up,[need,cost]=upCost(id);if(colN(id)<need+1){flashMsg('Te faltan cartas repetidas');return;}if(META.fama<cost){flashMsg('Te falta fama');return;}META.fama-=cost;META.col[id].n-=need;META.col[id].lv=2;saveMeta();sfx.win();confetti(20);shout('¡NIVEL 2!');draw_();});
  addBtn('🎁 Abrir sobres','gold',packs);addBtn('Volver','alt',menu);hint('deck','🃏 Este es tu mazo para el modo historia. Mientras más cartas consigas en los sobres, más opciones tendrás para armarlo. Las repetidas suben tus cartas a nivel 2 (versión mejorada 💪).');};
 draw_();}

// ---------- Intros de jefes ----------
const LFIGHT={T:['El Emperador se burla de los luchadores de barrio. Hoy vas a demostrarle de dónde vienes.','Dr. Siniestro dice que tu estilo limpio es "anticuado". Tu abuelo te enseñó que lo limpio nunca pasa de moda.','El Inmortal nunca ha perdido su máscara. Hoy, frente al mundo entero, eso se acaba.'],
 R:['El Emperador fue el alumno favorito de tu antiguo maestro. Hoy le vas a enseñar quién era el bueno.','Dr. Siniestro también hace trampa, pero con ciencia. Tú lo haces con estilo.','Tu maestro está en primera fila. El Inmortal es lo único entre tú y su respeto.'],
 G:['El Emperador dice que los cargadores no saben luchar. Está por saber cuánto pesa un camión de sandías.','Dr. Siniestro quiere estudiar tu fuerza en su laboratorio. Primero que te mueva.','El mercado entero vino a verte. Nadie ha movido al Inmortal… ni a ti.'],
 V:['El Emperador odia a los voladores: dice que el ring es para pisarlo. Tú naciste para el aire.','Dr. Siniestro calculó tu trayectoria. No contó con la máscara que tu abuela cosió para la buena suerte.','La carpa del circo está vacía: todos vinieron a verte volar contra El Inmortal.'],
 X:['El Emperador se negó a luchar contigo "por respeto a su corona". Hoy no tiene opción.','Dr. Siniestro dijo en la tele que eres "un payaso". Esta noche el chiste es él.','Lentejuelas, confeti y El Inmortal. Es tu noche y lo sabes.'],
 M:['El Emperador ni siquiera te ve: dice que eres "el niño de las botas". Ya te va a ver.','Dr. Siniestro intentó medirte con una regla. Nadie mide al Mini Estrella.','Necesitas una silla para mirar a los ojos al Inmortal. Lo vas a mirar desde arriba… desde la tercera.']};
const BTAUNT={panzon:'"En mi patio mando yo, chamaco. Aquí nadie me ha movido en diez años."',charrooro:'"¡Ay, ay, ay! Esta feria es mía desde que tu abuelo usaba pañales."',carnicero:'"Te voy a dejar como bistec de a kilo, niño bonito."',veneno:'"Hoy te quito la máscara, {n}... y luego me quedo con todo lo que es tuyo."',venenoH:'"Como en el patio de la escuela, carnal. Que gane el mejor."',emperador:'"De rodillas ante tu emperador, plebeyo."',siniestro:'"Interesante espécimen… lástima que hoy termine el experimento."',inmortal:'"Cientos lo han intentado. Todos terminaron en mi colección de máscaras."'};
const PLINE={panzon:'Es tu primera Máscara contra Máscara. La máscara de tu abuelo pesa más que nunca.',charrooro:'Toda la feria vino a verte. Hasta el señor de los elotes cerró el puesto.',emperador:'El Emperador se burla de los luchadores de barrio. Hoy le vas a demostrar de dónde vienes.',carnicero:'La Coliseo entera huele a miedo. Tú no.',siniestro:'Dr. Siniestro dice que eres predecible. Hoy vas a improvisar.',inmortal:'Nadie le ha quitado la máscara a El Inmortal. Hasta hoy.',veneno:'Tu amigo de la infancia. Tu peor enemigo. Hoy se acaba todo.',venenoH:'Dos niños del patio, en el estadio. Como lo juraron.'};
function vsIntro(bk,go){const B=EN[bk],L=LUCH[P.l],act=Math.min(P.act,2);const st_=isStory()&&P.ch!==undefined;const fin=st_?P.ch===6:act===2;
 showPanel('<h1>'+(fin?'🏆 LA GRAN FINAL':st_?'🎭 MÁSCARA CONTRA MÁSCARA':'🎭 FINAL DEL ACTO '+(act+1))+'</h1>'+(st_?'<p class="small" style="text-align:center">'+VEN[P.ch].e+' '+VEN[P.ch].n+' · Capítulo '+(P.ch+1)+'</p>':'')+'<canvas id="vsc" width="400" height="200"></canvas><p><b>'+L.e+' '+pnm()+':</b> '+(st_&&PLINE[bk]?PLINE[bk]:LFIGHT[P.l][act])+'\n\n<b>'+B.n+':</b> '+(bk==='veneno'||bk==='venenoH'?fmtW('kid',BTAUNT[bk]):fmt(BTAUNT[bk]||'"..."'))+'</p>');
 const v=$('#vsc'),g=v.getContext('2d');let t=0,raf=0;const pm=playerMask();
 const frame=()=>{if(!document.getElementById('vsc'))return;t++;g.setTransform(1,0,0,1,0,0);g.imageSmoothingEnabled=false;const gr=g.createLinearGradient(0,0,400,0);gr.addColorStop(0,'#1e3a8a');gr.addColorStop(.5,'#111');gr.addColorStop(1,'#7f1d1d');g.fillStyle=gr;g.fillRect(0,0,400,200);
  g.fillStyle='#ffffff14';for(let i=0;i<12;i++){g.beginPath();g.moveTo(200,100);const a=i/12*Math.PI*2+t/80;g.lineTo(200+Math.cos(a)*400,100+Math.sin(a)*400);g.lineTo(200+Math.cos(a+.15)*400,100+Math.sin(a+.15)*400);g.fill();}
  const sl=Math.min(1,t/25);g.save();g.translate(-120+sl*150,20);g.scale(5,5);luchador(g,0,0,pm,false,'#d9a066',PT(),Math.floor(t/20)%2?'flex':false,LK());g.restore();
  g.save();g.translate(440-sl*150,20);g.scale(5,5);luchador(g,0,0,B.m,true,'#c68a55',B.m[1],Math.floor(t/24)%2===0);g.restore();
  if(t>25){const sc=1+Math.max(0,.6-(t-25)/20);g.save();g.translate(200,105);g.scale(sc,sc);g.font='900 54px ui-monospace,monospace';g.textAlign='center';g.fillStyle='#000';g.fillText('VS',4,22);g.fillStyle='#ffd23f';g.fillText('VS',0,18);g.restore();}
  g.font='900 14px ui-monospace,monospace';g.textAlign='left';g.fillStyle='#fff';g.fillText(pnm().toUpperCase(),8,192);g.textAlign='right';g.fillText(B.n.toUpperCase(),392,192);
  raf=requestAnimationFrame(frame);};frame();
 sfx.bell();voz(fin?[{t:'¡Señoras y señores!',p:1.25,r:1.15},{t:'¡La gran final!',p:1.45,r:1.05},{t:'¡'+pnm()+'!',p:1.55,r:.95},{t:'¡contra '+B.n+'!',p:1.5,r:.95}]:[{t:'¡Final del acto!',p:1.35,r:1.15},{t:'¡'+pnm()+' contra '+B.n+'!',p:1.5,r:1}],true);
 addBtn(fin?'🏆 ¡A la gran final!':'🔥 ¡Vamos!','gold',()=>{cancelAnimationFrame(raf);go();});}

// ---------- Tutorial ----------
function startTutorial(){hidePanel();P={l:'T',man:'ninguno',partner:null,cab:0,daily:false,tut:true,hp:74,max:74,gold:0,deck:[],masks:[],act:0,row:0,from:null,visited:[],won:0,fama:0,flags:{},revived:true,dirtyUsed:false};startCombat('costal','tut');}
function showTip(){const el=$('#tip');if(!C||!C.tut||C.over||C.busy){el.classList.remove('on');return;}const ts=TUT[C.tut.step];if(!ts){el.classList.remove('on');return;}
 el.innerHTML=ts.t+(ts.need==='ok'?'<button id="tipok">Entendido 👍</button>':'');el.classList.add('on');
 if(ts.need==='ok')$('#tipok').onclick=()=>{C.tut.step++;sfx.card();render();};
 $('#endT').style.outline=ts.need==='end'?'4px solid #ffd23f':'';}
function pulseCards(){if(!C||!C.tut)return;const ts=TUT[C.tut.step];if(!ts)return;document.querySelectorAll('#hand .card').forEach(e=>{const c=C.hand[+e.dataset.i];if(c&&c.id===ts.need)e.classList.add('pulse');});}
function nudge(){const el=$('#tip');el.classList.remove('nudge');void el.offsetWidth;el.classList.add('nudge');beep(200,.1,'square',.04);}
function tutEnd(){musicStop();$('#endT').style.outline='';const first=!META.tutDone;META.tutDone=true;if(first){META.fama+=50;META.total+=50;META.fama+=200;}colInit();saveMeta();P=null;
 if(first&&!META.firstPack){META.firstPack=1;saveMeta();showPanel('<h1>🎓 ¡Graduado del gimnasio!</h1><p>⭐ +250 de fama de regalo.\n\nAhora viene lo mejor: los <b>sobres de cartas</b>. Cada sobre trae 6 cartas del estilo de tu luchador. Con ellas armas tu mazo para el modo historia.\n\nEste primero va por nuestra cuenta 👇</p>');addBtn('🎁 Abrir mi primer sobre (gratis)','gold',()=>reveal(openPack(META.sel.l,'tut'),'arena',tutEnd2));return;}
 tutEnd2();}
function tutEnd2(){
 showPanel('<h1>🎓 ¡Listo para la arena!</h1><p>Lo que falta saber:\n\n😈 <b>Cartas sucias</b> (moradas): pegan fuerte, pero el réferi 👁 te puede ver y castigar.\n🔗🪽 <b>Combos</b>: 3 llaves aéreas, 2 llaves o 4 ataques en un turno dan bonus.\n🤝 <b>Relevo</b>: una vez por lucha entra tu compañero.\n🎭 <b>Máscara contra Máscara</b>: el jefe de cada arena. Si pierdes, se acaba la historia.\n⭐ <b>Fama</b>: aunque pierdas, ganas fama para desbloquear luchadores y mejoras.\n🎁 <b>Monedas</b>: ganas al luchar. Úsalas en <b>Sobres</b> para conseguir cartas nuevas y súbelas de nivel con las repetidas.\n🃏 <b>Mi mazo</b>: arma tu mazo con las cartas de tu colección.</p>');
 addBtn('🃏 Ver mi mazo','blu',()=>deckEditor(META.sel.l));addBtn('🔔 📖 ¡Empezar el modo historia!','gold',setup);addBtn('Ir al menú','alt',menu);}
function achView(){let h='<h1>🏅 Logros</h1><p>'+Object.keys(META.ach).length+' de '+Object.keys(ACH).length+'</p>';for(const k of Object.keys(ACH).filter(k=>!ACHS.includes(k)).concat(ACHS)){const A=ACH[k],own=META.ach[k],sec=ACHS.includes(k)&&!own;h+='<div class="achl '+(own?'':'no')+'"><div class="ic">'+(own?A[0]:'🔒')+'</div><div><b>'+(sec?'Logro secreto':A[1])+'</b> · +'+A[3]+'⭐<br>'+(sec?'???':A[2])+'</div></div>';}showPanel(h);addBtn('Volver','alt',menu);}

// ---------- Inicio ----------
loadMeta();colInit();applyOpts();drawRing();pxStart();pauseInit();
const st=checkStreak();menu();
if(!META.tutDone){showPanel('<h1>🎭 ¡Bienvenido!</h1><p>¿Es tu primera vez en la arena? El tutorial dura 1 minuto y te regala ⭐ 50 de fama.</p>');addBtn('🎓 Hacer el tutorial','gold',startTutorial);addBtn('Saltar','alt',menu);}
if(st&&META.tutDone){showPanel('<h1>🔥 ¡Racha de '+META.streak.n+' día'+(META.streak.n>1?'s':'')+'!</h1><p>Gracias por volver a la arena.\n\n+'+(st*3)+'⭐ de fama.</p>');addBtn('¡A luchar!','gold',menu);}
document.addEventListener('pointerdown',()=>{try{if(AC&&AC.state==='suspended')AC.resume();if(!AC&&META.opt.music&&!P){musicStart('menu');}}catch(e){}},{passive:true});
