import {
  Calendar,
  EventConfig,
  Event,
} from 'https://cdn.jsdelivr.net/gh/lindskogen/simple-ics/mod.ts';

const NEWLINE = "\\n";
const drop = "💧";
const originDate: [number, number, number] = [2023, 10, 16];

const renderWaterLevel = (count: number) => drop.repeat(count);

/*
Strandkastanj
  Låt jorden torka mellan vattningarna
  En generös klunk vatten var tredje vecka
  Spraya med ljummet vatten
  Fläta!
 */
const createStrandkastanjRepeatedEvent = ([y, m, d]: [number, number, number] = originDate): EventConfig => ({
  title: 'Strandkastanj',
  desc: renderWaterLevel(5) + `\nEn generös klunk vatten var tredje vecka\nLåt jorden torka mellan vattningarna\nSpraya med ljummet vatten`.replaceAll('\n', NEWLINE),
  beginDate: [y, m, d],
  endDate: [y, m, d + 1],
  rrule: {
    freq: 'WEEKLY',
    interval: 3
  },
  alarm: {
    desc: 'Dags att vattna: Strandkastanj',
    advance: 0
  },
});

/*
Monstera
  Spraya bladen oftare
  Vattna 2-3 ggr i månaden
  Inte direkt solljus
*/
const createMonsteraRepeatedEvent = ([y, m, d]: [number, number, number] = originDate): EventConfig => ({
  title: 'Monstera',
  desc: renderWaterLevel(2) + '\nSpraya bladen oftare'.replaceAll('\n', NEWLINE),
  beginDate: [y, m, d],
  endDate: [y, m, d + 1],
  rrule: {
    freq: 'WEEKLY',
    interval: 2
  },
  alarm: {
    desc: 'Dags att vattna: Strandkastanj',
    advance: 0
  },
});

/*
Palettblad
  Ej mycket vatten, men lite och ofta (jorden skall vara lätt fuktig)
  Gillar ljus
*/
const createPalettbladRepeatedEvent = ([y, m, d]: [number, number, number] = originDate): EventConfig => ({
  title: 'Palettblad',
  desc: renderWaterLevel(1) + `\nEj mycket vatten\nJorden skall hållas lätt fuktig`.replaceAll('\n', NEWLINE),
  beginDate: [y, m, d],
  endDate: [y, m, d + 1],
  rrule: {
    freq: 'DAILY',
    interval: 4
  },
  alarm: {
    desc: 'Dags att vattna: Palettblad',
    advance: 0
  },
});

/*
Elefantöra
  Halvljust läge
  Hålla lagom vattnad (klarar att torka ut mellan vattningar)
  Vattna 1-2 gånger i veckan beroende på säsong
  Spraya gärna bladen
*/
const createElefantoeraRepeatedEvent = ([y, m, d]: [number, number, number] = originDate): EventConfig => ({
  title: 'Elefantöra',
  desc: renderWaterLevel(2) + `\nHålla lagom vattnad\n(Klarar att torka ut mellan vattningar)\nSpraya gärna bladen`.replaceAll('\n', NEWLINE),
  beginDate: [y, m, d],
  endDate: [y, m, d + 1],
  rrule: {
    freq: 'WEEKLY',
    interval: 1
  },
  alarm: {
    desc: 'Dags att vattna: Elefantöra',
    advance: 0
  },
});


const eventConfigCreators = [createStrandkastanjRepeatedEvent, createMonsteraRepeatedEvent, createPalettbladRepeatedEvent, createElefantoeraRepeatedEvent]


Deno.serve((req: Request) => {
  const calendar = new Calendar(eventConfigCreators.map(fn => new Event(fn(originDate))));
  return new Response(calendar.toString())
});

