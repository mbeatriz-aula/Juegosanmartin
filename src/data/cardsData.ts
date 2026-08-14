import { CardItem } from '../types';
import sanMartinPortrait from '../assets/images/san_martin_portrait_1785763072636.jpg';
import andesCrossing from '../assets/images/andes_crossing_1785763117351.jpg';
import granaderosMendoza from '../assets/images/granaderos_mendoza_1785763190656.jpg';
import chacabucoBattle from '../assets/images/chacabuco_battle_1785763223997.jpg';

export const INITIAL_CARDS: CardItem[] = [
  // --- CATEGORÍA 1: APROXIMACIÓN NUMÉRICA / MATEMÁTICA ---
  {
    id: 'card-1',
    numberId: 1,
    title: 'Edad de Inicio Militar',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Fácil',
    points: 100,
    question: '¿A qué edad inició José de San Martín formalmente su carrera de las armas?',
    answer: 'A los 11 años.',
    numericAnswer: 11,
    unit: 'años',
    toleranceMargin: 1,
    explanation: 'Ingresó formalmente como cadete en el Regimiento de Infantería de Murcia (España) el 21 de julio de 1789, contando con apenas 11 años cumplidos.',
    historicalContext: 'San Martín se formó en los campos de batalla europeos luchando contra las tropas napoleónicas antes de regresar al Río de la Plata a volcar toda su experiencia militar.',
    imageUrl: sanMartinPortrait,
    tags: ['San Martín', 'Juventud', 'España', 'Infantería'],
    characteristics: {
      difficultyLevel: 1,
      points: 100,
      tacticalValue: 'Biográfico',
      yearOrEpoch: '1789',
      unit: 'años'
    }
  },
  {
    id: 'card-2',
    numberId: 2,
    title: 'Arsenal y Fusiles en Mendoza',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Medio',
    points: 200,
    question: 'Para enero de 1817, gracias al trabajo incansable en los talleres de Mendoza, ¿cuántos fusiles había logrado reunir aproximadamente San Martín para el cruce?',
    answer: '5.000 fusiles.',
    numericAnswer: 5000,
    unit: 'fusiles',
    toleranceMargin: 250,
    explanation: 'Bajo la supervisión militar y el ingenio de Fray Luis Beltrán en el campamento de El Plumerillo, la maestranza mendocina forjó cañones, bayonetas, municiones y aproximadamente 5.000 fusiles.',
    historicalContext: 'Toda la provincia de Cuyo se movilizó: se donaron rejas de hierro, campanas de iglesias y ropas para equipar a la totalidad del contingente patriota.',
    imageUrl: granaderosMendoza,
    tags: ['Mendoza', 'Armamento', 'El Plumerillo', 'Fray Luis Beltrán'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Logística',
      yearOrEpoch: '1817',
      unit: 'fusiles'
    }
  },
  {
    id: 'card-3',
    numberId: 3,
    title: 'Admisión Oficial en Buenos Aires',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Medio',
    points: 250,
    question: 'Cuando San Martín llegó al puerto de Buenos Aires en 1812 ofreciendo sus servicios, ¿cuántos días tardó el gobierno revolucionario en admitirlo como oficial de sus ejércitos?',
    answer: 'Apenas 8 días.',
    numericAnswer: 8,
    unit: 'días',
    toleranceMargin: 2,
    explanation: 'Desembarcó de la fragata británica George Canning el 9 de marzo de 1812. El 16 de marzo, el Primer Triunvirato reconoció su grado de Teniente Coronel y le encomendó formar un cuerpo de caballería selecto.',
    historicalContext: 'Ese cuerpo selecto se convertiría en el célebre Regimiento de Granaderos a Caballo, modelo de disciplina y arrojo militar en las Guerras de Independencia.',
    imageUrl: sanMartinPortrait,
    tags: ['Buenos Aires', '1812', 'Granaderos', 'Triunvirato'],
    characteristics: {
      difficultyLevel: 2,
      points: 250,
      tacticalValue: 'Político Militar',
      yearOrEpoch: '1812',
      unit: 'días'
    }
  },
  {
    id: 'card-4',
    numberId: 4,
    title: 'Sueldo del Soldado Libertador',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Desafío',
    points: 300,
    question: '¿Cuál era el sueldo promedio mensual (en pesos de la época) de un soldado del Ejército de los Andes?',
    answer: '10 pesos mensuales (equivalente al ingreso de un jornalero de la época).',
    numericAnswer: 10,
    unit: 'pesos/mes',
    toleranceMargin: 1,
    explanation: 'Un soldado raso cobraba aproximadamente 10 pesos al mes, un haber equivalente al jornal de un peón o artesano modesto de la época.',
    historicalContext: 'Frecuentemente los pagos se demoraban o se abonaban en raciones debido a la falta de liquidez en las arcas cuyanas, requiriendo el enorme compromiso patriótico de la tropa.',
    imageUrl: andesCrossing,
    tags: ['Tropa', 'Sueldo', 'Economía', 'Ejército de los Andes'],
    characteristics: {
      difficultyLevel: 3,
      points: 300,
      tacticalValue: 'Finanzas de Guerra',
      yearOrEpoch: '1816-1817',
      unit: 'pesos'
    }
  },
  {
    id: 'card-5',
    numberId: 5,
    title: 'Columnas Militares del Cruce',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Fácil',
    points: 150,
    question: '¿En cuántas columnas militares principales se dividió finalmente el Ejército Libertador para atravesar la cordillera de los Andes?',
    answer: 'En 6 columnas.',
    numericAnswer: 6,
    unit: 'columnas',
    toleranceMargin: 0,
    explanation: 'El plan ideado por San Martín dividió la fuerza en 6 columnas: 2 principales (Paso de Los Patos y Paso de Uspallata) y 4 secundarias para distraer y dividir las defensas realistas.',
    historicalContext: 'Esta magistral estrategia de despiste (conocida como la "Guerra de Zapa") desorientó completamente al gobernador realista Marcó del Pont en Chile.',
    imageUrl: andesCrossing,
    tags: ['Estrategia', 'Cordillera', 'Columnas', 'Guerra de Zapa'],
    characteristics: {
      difficultyLevel: 1,
      points: 150,
      tacticalValue: 'Estrategia Genial',
      yearOrEpoch: '1817',
      unit: 'columnas'
    }
  },
  {
    id: 'card-11',
    numberId: 6,
    title: 'El Convoy de Mulas de Carga',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Desafío',
    points: 300,
    question: '¿Cuántas mulas (de carga y de silla en total) se requirieron aproximadamente para transportar cañones, alimentos y municiones durante el Cruce?',
    answer: '10.600 mulas (9.200 de carga y 1.400 de silla).',
    numericAnswer: 10600,
    unit: 'mulas',
    toleranceMargin: 500,
    explanation: 'Se movilizaron alrededor de 10.600 mulas y 1.600 caballos. Trágicamente, más de la mitad de las mulas perecieron debido a los despeñaderos y las heladas nocturnas.',
    historicalContext: 'Las mulas eran indispensables para transportar pertrechos por senderos de cornisa donde los carruajes eran imposibles.',
    imageUrl: andesCrossing,
    tags: ['Logística', 'Mulas', 'Transporte', 'Cordillera'],
    characteristics: {
      difficultyLevel: 3,
      points: 300,
      tacticalValue: 'Logística de Montaña',
      yearOrEpoch: '1817',
      unit: 'mulas'
    }
  },
  {
    id: 'card-12',
    numberId: 7,
    title: 'Altitud del Paso del Espinacito',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Erudito',
    points: 400,
    question: '¿A qué altitud máxima aproximada (en metros sobre el nivel del mar) ascendió la columna principal de San Martín al cruzar por el Paso del Espinacito?',
    answer: '4.500 metros sobre el nivel del mar.',
    numericAnswer: 4500,
    unit: 'm.s.n.m.',
    toleranceMargin: 150,
    explanation: 'El Paso del Espinacito alcanza los 4.500 m.s.n.m. En ese punto la presión atmosférica provoca la famosa "apunamiento" o mal de altura y las temperaturas caen hasta -15°C.',
    historicalContext: 'San Martín realizó tramos del cruce en camilla de madera tirada por mulas debido a sus severos ataques de úlcera y gota.',
    imageUrl: andesCrossing,
    tags: ['Espinacito', 'Altitud', 'Geografía', 'Salud'],
    characteristics: {
      difficultyLevel: 4,
      points: 400,
      tacticalValue: 'Desafío Extremo',
      yearOrEpoch: '1817',
      unit: 'm.s.n.m.'
    }
  },
  {
    id: 'card-22',
    numberId: 8,
    title: 'Efectivo Total de Tropas patriotas',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Medio',
    points: 250,
    question: '¿Cuántos hombres en total (incluyendo soldados combatientes, auxiliares de carga y baqueanos) integraron la expedición del Ejército de los Andes para el Cruce en enero de 1817?',
    answer: '5.420 hombres.',
    numericAnswer: 5420,
    unit: 'hombres',
    toleranceMargin: 200,
    explanation: 'El contingente sumaba exactamente 5.420 patriotas: 4.000 soldados de combate (infantería, granaderos y artilleros), 1.200 conductores/auxiliares de carga y 220 guías o baqueanos andinos.',
    historicalContext: 'Superar la cordillera con semejante ejército en masa se considera una obra cumbre de la ingeniería operacional militar.',
    imageUrl: granaderosMendoza,
    tags: ['Ejército', 'Tropa', 'Estadística', 'Cruce'],
    characteristics: {
      difficultyLevel: 2,
      points: 250,
      tacticalValue: 'Efectivo Militar',
      yearOrEpoch: '1817',
      unit: 'hombres'
    }
  },
  {
    id: 'card-23',
    numberId: 9,
    title: 'Artillería Pesada sobre la Cordillera',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Desafío',
    points: 300,
    question: '¿Cuántas piezas de artillería en total (entre cañones de montaña y obuses) logró transportar el Ejército atravesando los desfiladeros andinos?',
    answer: '22 piezas de artillería.',
    numericAnswer: 22,
    unit: 'piezas de artillería',
    toleranceMargin: 2,
    explanation: 'Transportar 22 cañones de bronce y hierro por caminos donde apenas cabía un hombre requirió zurriagos (zorras de cuero) y trineos diseñados por Fray Luis Beltrán.',
    historicalContext: 'La presencia de artillería en Chile tomó por sorpresa a las fuerzas realistas que no creían posible cruzar cañones por los Andes.',
    imageUrl: granaderosMendoza,
    tags: ['Artillería', 'Fray Luis Beltrán', 'Cañones', 'Logística'],
    characteristics: {
      difficultyLevel: 3,
      points: 300,
      tacticalValue: 'Poder de Fuego',
      yearOrEpoch: '1817',
      unit: 'piezas'
    }
  },
  {
    id: 'card-24',
    numberId: 10,
    title: 'Kilómetros Recorridos en Montaña',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Medio',
    points: 200,
    question: '¿Cuántos kilómetros aproximados recorrió la columna principal al mando de San Martín desde El Plumerillo (Mendoza) hasta San Felipe (Chile) cruzando los Andes?',
    answer: '500 kilómetros.',
    numericAnswer: 500,
    unit: 'kilómetros',
    toleranceMargin: 30,
    explanation: 'La columna principal atravesó 500 kilómetros de senderos de cornisa, cruces de ríos torrentosos y pasos a más de 4.000 metros de altura.',
    historicalContext: 'Marcharon un promedio de 20 a 25 kilómetros por día en condiciones geográficas extremas.',
    imageUrl: andesCrossing,
    tags: ['Distancia', 'Marcha', 'Los Patos', 'Geografía'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Marcha de Campaña',
      yearOrEpoch: '1817',
      unit: 'kilómetros'
    }
  },
  {
    id: 'card-25',
    numberId: 11,
    title: 'Producción de Pólvora Patriota',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Erudito',
    points: 400,
    question: '¿Cuántos kilogramos de pólvora fabricó la maestranza mendocina para abastecer a los fusileros y cañones durante el Cruce de los Andes?',
    answer: '13.800 kg de pólvora (equivalentes a 30.000 libras).',
    numericAnswer: 13800,
    unit: 'kg de pólvora',
    toleranceMargin: 1000,
    explanation: 'Fray Luis Beltrán y los químicos patriotas purificaron salitre y azufre local para producir aproximadamente 13.800 kg (30.000 libras) de pólvora de altísima pureza.',
    historicalContext: 'Esto aseguró 50 cartuchos individuales por soldado y munición completa para los 22 cañones de campaña.',
    imageUrl: granaderosMendoza,
    tags: ['Pólvora', 'Química', 'Fray Luis Beltrán', 'Mendoza'],
    characteristics: {
      difficultyLevel: 4,
      points: 400,
      tacticalValue: 'Insumo Crítico',
      yearOrEpoch: '1816-1817',
      unit: 'kg'
    }
  },
  {
    id: 'card-26',
    numberId: 12,
    title: 'Bajas Patriotas en Chacabuco',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Erudito',
    points: 450,
    question: 'Gracias a la maniobra táctica de tenaza de San Martín en la Batalla de Chacabuco (12 de febrero de 1817), ¿cuántos soldados patriotas fallecieron en combate?',
    answer: 'Apenas 12 soldados fallecidos.',
    numericAnswer: 12,
    unit: 'soldados',
    toleranceMargin: 3,
    explanation: 'El plan de batalla fue una obra maestra táctica: los patriotas sufrieron 12 muertos y 120 heridos, en contraste con los 500 muertos y 600 prisioneros realistas.',
    historicalContext: 'La coordinación entre las columnas de Soler y O\'Higgins rodeó completamente a las tropas del realista Elorreaga.',
    imageUrl: chacabucoBattle,
    tags: ['Chacabuco', 'Táctica', 'Estadística', 'Victoria'],
    characteristics: {
      difficultyLevel: 4,
      points: 450,
      tacticalValue: 'Táctica Impecable',
      yearOrEpoch: '1817',
      unit: 'soldados'
    }
  },
  {
    id: 'card-31',
    numberId: 13,
    title: 'Raciones Logísticas de Alimento',
    category: 'aproximacion',
    categoryName: '🎲 Las Vegas / El Erudito',
    difficulty: 'Desafío',
    points: 350,
    question: '¿Cuántas raciones individuales de "valdiviano" (charqui molido con grasa, maíz y ají) preparó el equipo logístico para alimentar al ejército durante la marcha?',
    answer: '120.000 raciones.',
    numericAnswer: 120000,
    unit: 'raciones',
    toleranceMargin: 10000,
    explanation: 'Se elaboraron 120.000 raciones secas concentradas. El soldado solo debía mezclar el polvo con agua hirviendo en su cazuela para obtener una sopa hipercalórica.',
    historicalContext: 'El ají estimulaba la circulación sanguínea combatiente el congelamiento de extremidades.',
    imageUrl: andesCrossing,
    tags: ['Alimentación', 'Charqui', 'Valdiviano', 'Logística'],
    characteristics: {
      difficultyLevel: 3,
      points: 350,
      tacticalValue: 'Nutrición de Guerra',
      yearOrEpoch: '1817',
      unit: 'raciones'
    }
  },

  // --- CATEGORÍA 2: SECUENCIAS CRONOLÓGICAS Y MATEMÁTICAS ---
  {
    id: 'card-6',
    numberId: 14,
    title: 'Hitos en la Vida de San Martín',
    category: 'secuencia',
    categoryName: '⏳ Secuencias (Carrera del Tiempo)',
    difficulty: 'Medio',
    points: 200,
    question: 'Ordenen cronológicamente (del más antiguo al más reciente) los siguientes hitos de la vida de San Martín:',
    answer: 'C (Nacimiento) - D (Llegada a Bs. As.) - A (Chacabuco) - B (Renuncia en Perú)',
    correctSequenceOrder: ['C', 'D', 'A', 'B'],
    sequenceItems: [
      { id: 'seq-6-a', letter: 'A', text: 'Batalla de Chacabuco.', detail: 'Victoria patriota en territorio chileno.' },
      { id: 'seq-6-b', letter: 'B', text: 'Renuncia a su cargo de Protector del Perú.', detail: 'Retiro definitivo de la vida pública.' },
      { id: 'seq-6-c', letter: 'C', text: 'Nacimiento en Yapeyú.', detail: 'Nacimiento en las Misiones Guaraníes.' },
      { id: 'seq-6-d', letter: 'D', text: 'Llegada a Buenos Aires en la fragata británica.', detail: 'Regreso desde Europa para servir a la Patria.' }
    ],
    explanation: 'C: Nacimiento en Yapeyú (1778) ➔ D: Retorno a Buenos Aires (1812) ➔ A: Triunfo de Chacabuco (1817) ➔ B: Renuncia en Perú (1822).',
    historicalContext: 'La vida de San Martín abarcó la gesta de tres naciones (Argentina, Chile y Perú) concluyendo su carrera pública en 1822 tras la entrevista de Guayaquil.',
    imageUrl: chacabucoBattle,
    tags: ['Biografía', 'Cronología', 'Chacabuco', 'Perú'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Biográfico General',
      yearOrEpoch: 'Época Sanmartiniana'
    }
  },
  {
    id: 'card-7',
    numberId: 15,
    title: 'Obstáculos Geográficos del Cruce',
    category: 'secuencia',
    categoryName: '⏳ Secuencias (Carrera del Tiempo)',
    difficulty: 'Erudito',
    points: 400,
    question: 'Ordenen de Este a Oeste las siguientes barreras geográficas, tal como las debió enfrentar el Ejército en su marcha a Chile:',
    answer: 'B - D - C - A (El general debió atravesar cuatro obstáculos sucesivos de Este a Oeste).',
    correctSequenceOrder: ['B', 'D', 'C', 'A'],
    sequenceItems: [
      { id: 'seq-7-a', letter: 'A', text: 'Cordones de los Andes (Paso del Espinacito).', detail: 'Pasos de alta montaña a más de 4.500 m.s.n.m.' },
      { id: 'seq-7-b', letter: 'B', text: 'Precordillera Mendocina.', detail: 'Primer encadenamiento montañoso al oeste de Mendoza.' },
      { id: 'seq-7-c', letter: 'C', text: 'Río Los Patos.', detail: 'Extenso valle fluvial intermontano.' },
      { id: 'seq-7-d', letter: 'D', text: 'Cordillera del Tigre.', detail: 'Segundo cordón intermedio que separa valles.' }
    ],
    explanation: 'De Este a Oeste el ejército superó: 1º Precordillera (B) ➔ 2º Cordillera del Tigre (D) ➔ 3º Valle del Río Los Patos (C) ➔ 4º Altos pasos andinos como El Espinacito (A).',
    historicalContext: 'El Cruce de los Andes es considerado una de las mayores hazañas militares de la historia humana, superando barreras geográficas a temperaturas bajo cero.',
    imageUrl: andesCrossing,
    tags: ['Geografía', 'Los Patos', 'Espinacito', 'Ruta del Cruce'],
    characteristics: {
      difficultyLevel: 4,
      points: 400,
      tacticalValue: 'Geografía Táctica',
      yearOrEpoch: 'Ruta Cordillerana'
    }
  },
  {
    id: 'card-8',
    numberId: 16,
    title: 'Sucesos de la Época Revolucionaria',
    category: 'secuencia',
    categoryName: '⏳ Secuencias (Carrera del Tiempo)',
    difficulty: 'Desafío',
    points: 350,
    question: 'Ordenen cronológicamente (del más antiguo al más reciente) los siguientes sucesos históricos:',
    answer: 'B (Casamiento) - A (San Lorenzo) - D (Independencia) - C (Destrucción de Yapeyú)',
    correctSequenceOrder: ['B', 'A', 'D', 'C'],
    sequenceItems: [
      { id: 'seq-8-a', letter: 'A', text: 'Combate de San Lorenzo.', detail: 'Bautismo de fuego del Regimiento de Granaderos a Caballo.' },
      { id: 'seq-8-b', letter: 'B', text: 'Casamiento con Remedios de Escalada.', detail: 'Matrimonio celebrado en la ciudad de Buenos Aires.' },
      { id: 'seq-8-c', letter: 'C', text: 'Destrucción de su pueblo natal (Yapeyú).', detail: 'Invasión lusobrasileña a los pueblos misioneros.' },
      { id: 'seq-8-d', letter: 'D', text: 'Declaración de la Independencia en Tucumán.', detail: 'Solemne proclama del Congreso Soberano.' }
    ],
    explanation: 'B: Matrimonio con Remedios (1812) ➔ A: Bautismo de fuego en San Lorenzo (1813) ➔ D: Congreso de Tucumán (1816) ➔ C: Invasión portuguesa a Yapeyú (1817).',
    historicalContext: 'Remedios de Escalada tenía solo 14 años al casarse con San Martín. Tuvo un rol clave organizando a las Damas Patricias de Mendoza.',
    imageUrl: sanMartinPortrait,
    tags: ['San Lorenzo', 'Remedios', 'Yapeyú', 'Tucumán'],
    characteristics: {
      difficultyLevel: 3,
      points: 350,
      tacticalValue: 'Historia Nacional',
      yearOrEpoch: 'Época Revolucionaria'
    }
  },
  {
    id: 'card-9',
    numberId: 17,
    title: 'Transformaciones Político-Sociales',
    category: 'secuencia',
    categoryName: '⏳ Secuencias (Carrera del Tiempo)',
    difficulty: 'Erudito',
    points: 450,
    question: 'Ordenen cronológicamente (del más antiguo al más reciente) estos acontecimientos históricos:',
    answer: 'D (Jesuitas) - C (Nacimiento) - A (Llegada) - B (Carta a Rosas)',
    correctSequenceOrder: ['D', 'C', 'A', 'B'],
    sequenceItems: [
      { id: 'seq-9-a', letter: 'A', text: 'Llegada de San Martín a Buenos Aires.', detail: 'Desembarco de la fragata británica George Canning.' },
      { id: 'seq-9-b', letter: 'B', text: 'Última carta de San Martín a Juan Manuel de Rosas.', detail: 'Correspondencia epistolar enviada desde Francia.' },
      { id: 'seq-9-c', letter: 'C', text: 'Nacimiento de San Martín.', detail: 'Nacimiento de José Francisco en Yapeyú.' },
      { id: 'seq-9-d', letter: 'D', text: 'Expulsión de los jesuitas de América.', detail: 'Decreto dictado por la corona española.' }
    ],
    explanation: 'D: Expulsión jesuita (1767) ➔ C: Nacimiento en Yapeyú (1778) ➔ A: Llegada a la patria (1812) ➔ B: Última correspondencia con Rosas desde Francia (1850).',
    historicalContext: 'La expulsión de los jesuitas en 1767 alteró la administración colonial; Juan de San Martín (padre del prócer) fue designado para administrar las estancias jesuíticas de Yapeyú.',
    imageUrl: granaderosMendoza,
    tags: ['Virreinato', 'Jesuitas', 'Rosas', 'San Martín'],
    characteristics: {
      difficultyLevel: 4,
      points: 450,
      tacticalValue: 'Historia Universal / Colonial',
      yearOrEpoch: 'Siglos XVIII - XIX'
    }
  },
  {
    id: 'card-10',
    numberId: 18,
    title: 'Hitos Institucionales de la Patria',
    category: 'secuencia',
    categoryName: '⏳ Secuencias (Carrera del Tiempo)',
    difficulty: 'Medio',
    points: 250,
    question: 'Ordenen cronológicamente (del más antiguo al más reciente) los siguientes hitos patriotas:',
    answer: 'D (Primera Junta) - B (Granaderos) - C (Chacabuco) - A (Independencia del Perú)',
    correctSequenceOrder: ['D', 'B', 'C', 'A'],
    sequenceItems: [
      { id: 'seq-10-a', letter: 'A', text: 'Proclamación de la Independencia del Perú.', detail: 'Ceremonia patriótica en la Plaza Mayor de Lima.' },
      { id: 'seq-10-b', letter: 'B', text: 'Creación del Regimiento de Granaderos a Caballo.', detail: 'Decreto fundacional del Primer Triunvirato.' },
      { id: 'seq-10-c', letter: 'C', text: 'Batalla de Chacabuco.', detail: 'Gran enfrentamiento decisivo en los llanos de Chile.' },
      { id: 'seq-10-d', letter: 'D', text: 'Conformación de la Primera Junta de Gobierno.', detail: 'Revolución de Mayo en Buenos Aires.' }
    ],
    explanation: 'D: Revolución de Mayo (1810) ➔ B: Creación de Granaderos (1812) ➔ C: Batalla de Chacabuco (1817) ➔ A: Independencia de Chile (1818) y Perú (1821).',
    historicalContext: 'La gesta emancipadora consolidó la independencia continental asegurando el fin del dominio realista en el Pacífico sur.',
    imageUrl: chacabucoBattle,
    tags: ['Primera Junta', 'Granaderos', 'Chacabuco', 'Perú'],
    characteristics: {
      difficultyLevel: 2,
      points: 250,
      tacticalValue: 'Hitos Institucionales',
      yearOrEpoch: 'Gesta Emancipadora'
    }
  },

  // --- CATEGORÍA 3: VERDADERO O FALSO (MITOS Y DATOS VERIFICADOS) ---
  {
    id: 'card-13',
    numberId: 19,
    title: 'El Mito del Caballo Blanco',
    category: 'verdaderofalso',
    categoryName: '🛡️ Verdadero o Falso (Mito o Verdad)',
    difficulty: 'Fácil',
    points: 150,
    question: '¿San Martín cruzó los Andes montado permanentemente en un majestuoso caballo blanco pura sangre?',
    answer: 'FALSO',
    isTrue: false,
    explanation: 'Es un mito artístico popularizado en pinturas. San Martín hizo la mayor parte del trayecto a lomo de mula (el animal andino más seguro) y en tramos en camilla tirada por mulas debido a sus intensos dolores de úlcera.',
    historicalContext: 'Los caballos no resistían bien el apunamiento ni los senderos estrechos de cornisa a más de 4.000 metros de altura.',
    imageUrl: andesCrossing,
    tags: ['Mitos', 'Cordillera', 'Mulas', 'Transporte'],
    characteristics: {
      difficultyLevel: 1,
      points: 150,
      tacticalValue: 'Mito Histórico',
      yearOrEpoch: '1817'
    }
  },
  {
    id: 'card-14',
    numberId: 20,
    title: 'La Bandera de los Andes',
    category: 'verdaderofalso',
    categoryName: '🛡️ Verdadero o Falso (Mito o Verdad)',
    difficulty: 'Fácil',
    points: 150,
    question: '¿La icónica Bandera del Ejército de los Andes fue confeccionada por las Damas Patricias mendocinas lideradas por Remedios de Escalada?',
    answer: 'VERDADERO',
    isTrue: true,
    explanation: 'Verdadero. En diciembre de 1816, Remedios de Escalada de San Martín junto a un grupo de damas mendocinas bordaron en seda blanca y celeste la heroica bandera jurada en Mendoza.',
    historicalContext: 'Fue bendecida el 5 de enero de 1817 en la Iglesia Matriz de Mendoza antes de la partida de las tropas.',
    imageUrl: granaderosMendoza,
    tags: ['Bandera', 'Remedios', 'Mendoza', 'Símbolos'],
    characteristics: {
      difficultyLevel: 1,
      points: 150,
      tacticalValue: 'Símbolo Patriótico',
      yearOrEpoch: '1816'
    }
  },
  {
    id: 'card-15',
    numberId: 21,
    title: 'San Martín contra Napoleón',
    category: 'verdaderofalso',
    categoryName: '🛡️ Verdadero o Falso (Mito o Verdad)',
    difficulty: 'Medio',
    points: 200,
    question: '¿José de San Martín se enfrentó cara a cara en un duelo personal contra Napoleón Bonaparte en Europa?',
    answer: 'FALSO',
    isTrue: false,
    explanation: 'Falso. San Martín luchó brillantemente contra el ejército invasor francés en la Península Ibérica (como en la batalla de Bailén en 1808), pero nunca se enfrentó en persona con Napoleón Bonaparte.',
    historicalContext: 'Su brillante actuación en Bailén le valió la medalla de oro y el ascenso a Teniente Coronel en el ejército español.',
    imageUrl: sanMartinPortrait,
    tags: ['España', 'Napoleón', 'Bailén', 'Europa'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Estrategia Europea',
      yearOrEpoch: '1808'
    }
  },
  {
    id: 'card-16',
    numberId: 22,
    title: 'El Vulcanólogo Fray Luis Beltrán',
    category: 'verdaderofalso',
    categoryName: '🛡️ Verdadero o Falso (Mito o Verdad)',
    difficulty: 'Medio',
    points: 200,
    question: '¿El fraile Fray Luis Beltrán instaló en Mendoza una maestranza capaz de fundir cañones, fabricar municiones, arneses y calzado para todo el ejército?',
    answer: 'VERDADERO',
    isTrue: true,
    explanation: 'Verdadero. El fraile dominico Fray Luis Beltrán lideró a más de 300 artesanos y carpinteros en la fábrica militar de El Plumerillo, haciendo milagros de ingeniería logística.',
    historicalContext: 'Incluso diseñó aparejos especiales y puentes colgantes desplegables para trasladar artillería pesada sobre abismos montañosos.',
    imageUrl: granaderosMendoza,
    tags: ['Fray Luis Beltrán', 'El Plumerillo', 'Ingeniería', 'Logística'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Maestranza Patriota',
      yearOrEpoch: '1816-1817'
    }
  },
  {
    id: 'card-17',
    numberId: 23,
    title: 'Rechazo del Gobierno en Chile',
    category: 'verdaderofalso',
    categoryName: '🛡️ Verdadero o Falso (Mito o Verdad)',
    difficulty: 'Desafío',
    points: 300,
    question: '¿San Martín aceptó ser el Director Supremo de Chile inmediatamente después de la victoria en la Batalla de Chacabuco?',
    answer: 'FALSO',
    isTrue: false,
    explanation: 'Falso. El Cabildo de Santiago le ofreció el gobierno de Chile, pero San Martín declinó generosamente para demostrar que venía a liberar y no a conquistar. Propuso en su lugar al general Bernardo O’Higgins.',
    historicalContext: 'Esta actitud desinteresada reafirmó el espíritu libertador de la expedición frente a las naciones hermanas.',
    imageUrl: chacabucoBattle,
    tags: ['Chile', 'Chacabuco', 'O\'Higgins', 'Política'],
    characteristics: {
      difficultyLevel: 3,
      points: 300,
      tacticalValue: 'Desprendimiento Político',
      yearOrEpoch: '1817'
    }
  },
  {
    id: 'card-30',
    numberId: 24,
    title: 'Desgaste Animal en la Cordillera',
    category: 'verdaderofalso',
    categoryName: '🛡️ Verdadero o Falso (Mito o Verdad)',
    difficulty: 'Medio',
    points: 250,
    question: '¿Es VERDADERO o FALSO que durante el Cruce pereció más del 50% de las mulas y más del 65% de los caballos debido al frío andino y despeñaderos?',
    answer: 'VERDADERO',
    isTrue: true,
    explanation: 'Verdadero. De las 10.600 mulas iniciales sobrevivieron menos de 5.500; de los 1.600 caballos partieron y llegaron apenas 500 aptos para montar. El ambiente andino causó un tremendo costo logístico.',
    historicalContext: 'Los caballos debieron marchar desensillados la mayor parte del trayecto para preservar sus fuerzas ante la falta de oxígeno.',
    imageUrl: andesCrossing,
    tags: ['Animales', 'Estadística', 'Mulas', 'Pérdidas'],
    characteristics: {
      difficultyLevel: 2,
      points: 250,
      tacticalValue: 'Costo de Campaña',
      yearOrEpoch: '1817'
    }
  },

  // --- CATEGORÍA 4: OPCIÓN MÚLTIPLE (TRIVIA Y CÁLCULOS HISTÓRICOS) ---
  {
    id: 'card-18',
    numberId: 25,
    title: 'La Fragata del Regreso',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Fácil',
    points: 100,
    question: '¿Cómo se llamaba la fragata británica en la que San Martín desembarcó en Buenos Aires en marzo de 1812?',
    answer: 'A) George Canning',
    options: [
      'A) George Canning',
      'B) Santísima Trinidad',
      'C) Fragata Sarmiento',
      'D) HMS Beagle'
    ],
    correctOptionIndex: 0,
    explanation: 'Llegó a Buenos Aires el 9 de marzo de 1812 a bordo de la fragata británica George Canning, acompañado por otros destacados patriotas como Carlos María de Alvear.',
    historicalContext: 'Apenas ocho días después, el gobierno lo autorizó a crear un escuadrón de caballería que se transformaría en los Granaderos a Caballo.',
    imageUrl: sanMartinPortrait,
    tags: ['Navegación', 'George Canning', '1812', 'Buenos Aires'],
    characteristics: {
      difficultyLevel: 1,
      points: 100,
      tacticalValue: 'Trivia Histórica',
      yearOrEpoch: '1812'
    }
  },
  {
    id: 'card-19',
    numberId: 26,
    title: 'El Bautismo de Fuego',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Medio',
    points: 200,
    question: '¿En qué combate heroico en las costas del río Paraná el sargento Juan Bautista Cabral dio su vida para salvar a San Martín?',
    answer: 'B) Combate de San Lorenzo',
    options: [
      'A) Batalla de Maipú',
      'B) Combate de San Lorenzo',
      'C) Batalla de Suipacha',
      'D) Batalla de Ayacucho'
    ],
    correctOptionIndex: 1,
    explanation: 'El 3 de febrero de 1813 en San Lorenzo (Santa Fe). El caballo de San Martín cayó herido apresándole la pierna; Cabral y Baigorria intervinieron heroicamente para librarlo de las bayonetas enemigas.',
    historicalContext: 'Fue la única batalla librada por San Martín en el actual territorio argentino.',
    imageUrl: granaderosMendoza,
    tags: ['San Lorenzo', 'Cabral', 'Granaderos', 'Paraná'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Héroe Nacional',
      yearOrEpoch: '1813'
    }
  },
  {
    id: 'card-20',
    numberId: 27,
    title: 'El Aliado de la Causa Chilena',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Fácil',
    points: 150,
    question: '¿Quién fue el patriota chileno nombrado Director Supremo de Chile con el respaldo de San Martín tras Chacabuco?',
    answer: 'B) Bernardo O\'Higgins',
    options: [
      'A) Manuel Belgrano',
      'B) Bernardo O\'Higgins',
      'C) José Miguel Carrera',
      'D) Simón Bolívar'
    ],
    correctOptionIndex: 1,
    explanation: 'Bernardo O\'Higgins consolidó la independencia chilena y cooperó incansablemente con San Martín para preparar la Expedición Libertadora al Perú.',
    historicalContext: 'Ambos líderes profesaban una estrecha amistad y una visión panamericana de libertad.',
    imageUrl: chacabucoBattle,
    tags: ['Chile', 'O\'Higgins', 'Chacabuco', 'Alianza'],
    characteristics: {
      difficultyLevel: 1,
      points: 150,
      tacticalValue: 'Fraternidad Americana',
      yearOrEpoch: '1817'
    }
  },
  {
    id: 'card-21',
    numberId: 28,
    title: 'Lugar del Retiro Final',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Medio',
    points: 200,
    question: '¿En qué puerto marítimo francés falleció el General José de San Martín el 17 de agosto de 1850?',
    answer: 'B) Boulogne-sur-Mer',
    options: [
      'A) París',
      'B) Boulogne-sur-Mer',
      'C) Marsella',
      'D) Lyon'
    ],
    correctOptionIndex: 1,
    explanation: 'Falleció a los 72 años en la ciudad costera de Boulogne-sur-Mer (Francia), acompañado por su hija Mercedes, su yerno Mariano Balcarce y sus nietas.',
    historicalContext: 'Sus restos mortales fueron repatriados a la Argentina en 1880 y descansan en el mausoleo de la Catedral de Buenos Aires.',
    imageUrl: sanMartinPortrait,
    tags: ['Francia', 'Exilio', 'Boulogne-sur-Mer', '1850'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Legado Eterno',
      yearOrEpoch: '1850'
    }
  },
  {
    id: 'card-28',
    numberId: 29,
    title: 'Matemática Militar: Logística de Pólvora',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Desafío',
    points: 300,
    question: 'Si la maestranza envió 13.600 kg de pólvora para que carguen las mulas, ¿cuántas mulas se necesitarán aproximadamente?',
    answer: 'B) 300 mulas',
    options: [
      'A) 150 mulas',
      'B) 300 mulas',
      'C) 500 mulas',
      'D) 1.000 mulas'
    ],
    correctOptionIndex: 1,
    explanation: 'Considerando una carga máxima de aproximadamente 45 kg (100 libras) por mula en cajones nivelados: 13.600 kg ÷ 45,3 kg/mula ≈ 300 mulas destinadas al convoy de pólvora.',
    historicalContext: 'Cada mula llevaba dos barriles de pólvora equilibrados a ambos lados del lomo para mantener la estabilidad en los desfiladeros andinos.',
    imageUrl: granaderosMendoza,
    tags: ['Matemática', 'Pólvora', 'Mulas', 'Cálculo'],
    characteristics: {
      difficultyLevel: 3,
      points: 300,
      tacticalValue: 'Matemática Logística',
      yearOrEpoch: '1817'
    }
  },
  {
    id: 'card-29',
    numberId: 30,
    title: 'Cálculo de Desnivel de Altitud',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Medio',
    points: 250,
    question: '¿Cuál fue el desnivel vertical aproximado que debió ascender el Ejército de los Andes desde la partida en Mendoza hasta la cumbre del Paso del Espinacito?',
    answer: 'B) 3.750 metros de desnivel',
    options: [
      'A) 2.500 metros',
      'B) 3.750 metros',
      'C) 4.500 metros',
      'D) 5.250 metros'
    ],
    correctOptionIndex: 1,
    explanation: 'Mendoza se sitúa a 750 m.s.n.m. y el Paso del Espinacito a 4.500 m.s.n.m.: 4.500 m - 750 m = 3.750 metros de ascenso neto vertical.',
    historicalContext: 'Sumando los desniveles de bajadas y subidas a cordones intermedios, el desnivel acumulado superó los 10.000 metros de altitud.',
    imageUrl: andesCrossing,
    tags: ['Matemática', 'Altitud', 'Espinacito', 'Geografía'],
    characteristics: {
      difficultyLevel: 2,
      points: 250,
      tacticalValue: 'Geometría de Montaña',
      yearOrEpoch: '1817'
    }
  },
  {
    id: 'card-32',
    numberId: 31,
    title: 'La Flota de la Expedición al Perú',
    category: 'multiplechoice',
    categoryName: '💡 Opción Múltiple (Trivia Sanmartiniana)',
    difficulty: 'Medio',
    points: 200,
    question: 'En 1820, para transportar al Ejército Libertador desde Valparaíso (Chile) hasta las costas de Perú, ¿cuántos buques integraron la escuadra mandada por Lord Cochrane?',
    answer: 'C) 24 buques',
    options: [
      'A) 8 buques',
      'B) 16 buques',
      'C) 24 buques',
      'D) 50 buques'
    ],
    correctOptionIndex: 2,
    explanation: 'Zarparon 24 buques en total: 8 navíos de guerra armados y 16 transportes mercantes adaptados, transportando 4.800 soldados al territorio peruano.',
    historicalContext: 'La maniobra marítima fue el broche de oro del Plan Continental ideado por San Martín para destruir el poder realista en el Pacífico.',
    imageUrl: sanMartinPortrait,
    tags: ['Perú', 'Navegación', 'Lord Cochrane', '1820'],
    characteristics: {
      difficultyLevel: 2,
      points: 200,
      tacticalValue: 'Navegación Estratégica',
      yearOrEpoch: '1820'
    }
  }
];
