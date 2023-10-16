import { Calendar, Event, EventConfig, RecurrenceRule } from 'https://cdn.jsdelivr.net/gh/lindskogen/simple-ics/mod.ts';

type DateTriple = [number, number, number];

const ORIGIN_DATE: DateTriple = [2023, 10, 16];

interface RepeatConfig {
  freq: RecurrenceRule["freq"];
  interval: number;
}

interface Plant extends RepeatConfig {
  title: string;
  description: string[];
}

const createRepeatedEvent = (
  {description, interval, freq, title}: Plant,
  [y, m, d]: DateTriple
): EventConfig => ({
  title: title,
  desc: [renderWaterLevel(interval), ...description].join('\\n'),
  beginDate: [y, m, d],
  endDate: [y, m, d + 1],
  rrule: {freq, interval},
  alarm: {
    desc: `Dags att vattna: ${title}`,
    advance: 0,
  },
});

const renderWaterLevel = (count: number) => "💧".repeat(count);

const plants: Plant[] = [
  /**
   * Strandkastanj
   *   Låt jorden torka mellan vattningarna
   *   En generös klunk vatten var tredje vecka
   *   Spraya med ljummet vatten
   *   Fläta!
   */
  {
    title: 'Strandkastanj',
    description: ['En generös klunk vatten var tredje vecka','Låt jorden torka mellan vattningarna','Spraya med ljummet vatten'],
    freq: 'WEEKLY',
    interval: 3,
  },
  /**
   * Monstera
   *   Spraya bladen oftare
   *   Vattna 2-3 ggr i månaden
   *   Inte direkt solljus
   */
  {
    title: 'Monstera',
    description: ['Spraya bladen oftare'],
    freq: 'WEEKLY',
    interval: 2,
  },
  /**
   * Palettblad
   *   Ej mycket vatten, men lite och ofta (jorden skall vara lätt fuktig)
   *   Gillar ljus
   */
  {
    title: 'Palettblad',
    description: ['Ej mycket vatten','Jorden skall hållas lätt fuktig'],
    freq: 'DAILY',
    interval: 4,
  },
  /**
   * Elefantöra
   *   Halvljust läge
   *   Hålla lagom vattnad (klarar att torka ut mellan vattningar)
   *   Vattna 1-2 gånger i veckan beroende på säsong
   *   Spraya gärna bladen
   */
  {
    title: 'Elefantöra',
    description: ['Hålla lagom vattnad', '(Klarar att torka ut mellan vattningar)','Spraya gärna bladen'],
    freq: 'WEEKLY',
    interval: 1,
  },
];



Deno.serve((req: Request) => {
  const events = plants.map((plant) => new Event(createRepeatedEvent(plant, ORIGIN_DATE)));
  const calendar = new Calendar(events);

  return new Response(calendar.toString())
});
