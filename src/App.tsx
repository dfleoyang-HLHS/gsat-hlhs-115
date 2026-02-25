import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
// import { Table, BarChart3, PieChart, Info, Users } from 'lucide-react';
import { Table, BarChart3, Info, Users } from 'lucide-react';

const RAW_DATA = `報名序號,應試號碼,國文級分,英文級分,數學A級分,數學B級分,社會級分,自然級分
93030101,11327307,13,5,-,3,13,-
93030102,11327309,6,5,-,3,12,-
93030103,11328102,8,3,-,2,8,4
93030104,11326301,8,5,5,5,11,3
93030105,11327311,8,4,-,4,9,-
93030106,11326303,13,4,5,5,13,8
93030107,11328104,8,5,-,5,10,5
93030108,11326305,13,9,7,10,13,7
93030109,11327319,9,6,-,4,10,-
93030110,11327321,10,7,-,3,9,-
93030111,11326313,9,8,4,6,7,5
93030112,11327323,10,5,-,7,8,-
93030113,11326315,8,7,2,3,8,6
93030114,11326317,10,12,6,3,8,3
93030115,11327331,11,3,-,3,13,-
93030116,11328106,12,7,-,4,10,缺考
93030117,11327333,10,6,-,5,9,-
93030118,11327335,12,12,-,2,11,-
93030119,11328114,9,7,-,2,6,5
93030120,11326325,12,12,6,10,14,缺考
93030121,11326327,8,3,4,5,7,3
93030122,11326329,9,6,3,2,9,7
93030123,11327407,11,2,-,5,10,-
93030125,11327901,8,7,5,5,8,-
93030126,11327409,9,9,-,3,13,-
93030127,11327411,9,6,-,3,11,-
93030128,11327419,10,8,-,4,7,-
93030129,11327421,7,2,-,2,7,-
93030130,11327423,12,13,-,5,13,-
93030131,11326401,13,10,9,9,12,6
93030132,11327431,7,3,-,4,6,-
93030133,11326403,8,5,5,3,10,5
93030201,11326405,11,3,4,5,12,6
93030202,11326413,7,2,6,2,8,6
93030203,11327433,9,5,-,3,10,-
93030204,11326415,7,2,3,2,6,3
93030205,11326417,9,4,3,5,7,4
93030206,11326425,7,6,6,5,7,3
93030207,11326427,10,8,3,2,8,4
93030208,11326429,11,8,10,6,9,5
93030209,11326501,11,7,4,6,10,7
93030210,11326503,12,4,3,2,11,4
93030211,11326505,11,4,5,3,9,6
93030212,11326513,9,3,7,3,9,8
93030213,11326515,9,9,5,4,8,3
93030214,11326517,9,5,3,6,10,5
93030215,11327435,11,7,-,3,11,-
93030216,11326525,11,9,5,7,12,8
93030217,11327903,12,9,7,8,13,-
93030218,11327905,10,5,3,6,7,-
93030219,11327913,12,12,7,8,13,-
93030220,11326527,8,4,3,2,10,7
93030221,11326529,12,9,6,8,11,4
93030222,11327915,8,4,5,7,10,-
93030223,11326601,12,13,9,9,14,7
93030224,11327507,10,4,-,2,10,-
93030225,11326603,13,13,10,9,11,6
93030226,11326605,12,3,5,4,9,2
93030227,11326613,11,4,3,2,12,6
93030228,11327917,9,9,2,2,9,-
93030229,11327925,13,12,5,4,12,-
93030230,11327511,10,5,-,2,9,-
93030231,11326615,8,2,4,2,7,3
93030232,11326617,9,5,6,6,10,6
93030233,11326625,8,4,3,5,10,7
93030301,11326627,9,10,8,4,12,9
93030302,11326629,12,11,9,13,12,13
93030303,11327921,10,4,4,5,9,-
93030304,11326701,10,6,7,6,12,6
93030305,11326703,7,2,6,5,8,4
93030306,11326705,10,7,6,5,11,6
93030307,11327923,14,12,7,4,12,-
93030308,11326713,10,3,7,7,9,6
93030309,11327930,13,14,11,10,13,-
93030310,11327521,10,3,-,3,11,-
93030311,11328116,9,6,-,3,12,5
93030312,11326715,9,4,3,4,9,4
93030313,11326717,10,4,4,4,9,6
93030314,11326725,10,8,6,6,11,6
93030315,11326727,10,3,3,4,7,4
93030316,11326729,9,3,3,2,7,4
93030317,11326801,8,13,5,5,11,4
93030318,11326803,12,13,10,9,14,6
93030319,11326805,9,7,3,6,12,6
93030320,11326813,12,7,8,7,15,8
93030321,11326815,10,7,3,2,10,4
93030322,11327532,9,2,-,6,9,-
93030323,11326817,11,3,3,3,13,5
93030324,11327931,11,5,6,8,11,-
93030325,11326825,14,6,6,4,12,4
93030326,11327933,7,3,4,1,11,-
93030327,11326827,8,6,4,3,7,5
93030328,11327935,7,3,6,5,10,-
93030329,11326829,8,4,3,5,10,5
93030330,11326901,7,4,3,2,8,4
93030331,11326903,8,3,3,3,8,6
93030332,11326905,12,10,8,6,15,7
93030333,11328309,8,3,3,3,8,-
93030334,11326913,11,4,3,3,12,6
93030401,11326915,11,4,7,3,11,4
93030402,11327607,7,4,-,5,11,-
93030403,11327922,10,10,9,10,10,-
93030404,11326917,9,4,3,1,10,5
93030405,11328118,10,6,-,3,10,2
93030406,11327924,5,3,1,3,6,-
93030407,11327932,11,10,7,8,11,-
93030408,11328228,6,4,8,-,8,-
93030409,11326925,7,7,7,6,10,5
93030410,11327934,6,4,5,6,8,-
93030411,11327936,9,4,6,4,12,-
93030412,11328308,8,3,2,0,9,-
93030413,11328310,11,13,12,11,14,-
93030414,11328428,13,10,11,9,15,-
93030415,11326927,11,7,5,8,12,7
93030416,11328435,13,9,7,3,13,-
93030417,11327619,12,11,-,5,12,-
93030418,11326929,9,3,6,4,11,6
93030419,11327631,10,4,-,3,11,-
93030420,11327708,11,7,-,3,10,-
93030421,11328126,12,10,-,5,14,5
93030422,11328427,12,5,6,5,11,-
93030423,11327001,11,5,5,4,12,6
93030424,11328128,11,5,-,4,11,缺考
93030425,11327003,8,8,4,5,11,5
93030426,11327005,10,8,7,8,11,6
93030427,11328426,11,4,5,4,10,-
93030428,11328130,7,13,-,2,9,4
93030429,11328425,10,10,5,5,10,-
93030430,11327013,9,4,5,4,10,4
93030431,11327015,9,5,5,2,11,7
93030432,11327017,6,4,7,5,8,4
93030501,11328008,8,4,8,7,-,6
93030502,11327025,11,13,6,2,9,11
93030503,11328010,9,4,5,5,-,5
93030504,11327027,10,11,7,4,6,8
93030505,11327029,11,8,8,8,11,11
93030506,11327101,11,6,5,3,8,10
93030507,11328012,11,10,10,13,-,11
93030508,11328020,9,8,6,3,-,4
93030509,11327103,12,10,7,6,11,7
93030510,11327105,8,5,5,5,9,6
93030511,11327113,12,5,5,6,9,7
93030512,11327115,11,8,10,7,11,10
93030513,11327117,13,13,13,13,12,12
93030514,11327126,9,8,8,5,8,7
93030515,11327128,10,11,7,11,11,12
93030516,11327130,10,8,7,6,10,7
93030517,11326302,14,12,11,12,13,13
93030518,11326304,11,4,9,7,10,10
93030519,11326306,9,6,4,5,10,9
93030520,11327214,11,14,13,12,13,14
93030521,11327216,11,4,6,3,10,7
93030522,11327218,11,7,8,5,12,10
93030523,11327224,7,3,4,3,11,7
93030524,11327225,12,12,12,13,9,14
93030525,11327227,12,10,7,7,9,8
93030526,11327229,9,8,7,10,7,10
93030527,11327232,10,11,6,8,7,10
93030528,11328022,10,11,6,6,-,11
93030529,11327234,4,5,3,4,7,4
93030530,11327236,10,7,7,7,11,9
93030531,11328032,9,12,9,9,-,9
93030532,11328335,12,13,7,10,12,12
93030533,11328333,14,14,12,15,15,14
93030534,11328331,7,5,6,5,11,7
93030601,11327112,10,10,10,6,10,8
93030602,11327120,8,7,4,5,8,7
93030603,11327122,8,10,5,8,10,7
93030604,11327124,11,5,6,8,10,7
93030605,11327132,12,12,10,10,12,12
93030606,11327134,13,12,8,12,10,10
93030607,11327136,7,9,9,8,8,12
93030608,11326307,10,6,6,5,6,8
93030609,11326311,10,8,6,5,7,7
93030610,11327211,10,5,6,7,11,8
93030611,11327219,14,14,10,10,14,10
93030612,11327221,5,4,10,10,10,10
93030613,11327223,10,12,7,7,6,8
93030614,11327231,10,8,7,9,10,10
93030615,11327233,12,13,14,12,13,12
93030616,11327235,13,13,9,13,13,13
93030617,11328329,9,3,7,3,4,5
93030618,11328328,13,11,8,10,14,14
93030619,11328327,9,10,7,7,9,10
93030620,11328326,9,9,6,6,8,8
93030621,11328325,14,6,11,12,13,12
93030622,11328324,13,13,12,13,12,12
93030623,11328323,13,6,10,10,12,11
93030624,11328322,12,5,4,5,11,10
93030625,11328321,11,9,9,11,10,10
93030626,11328320,8,8,12,7,9,10
93030627,19840203,6,3,6,9,7,9
93030628,11328319,12,10,10,11,9,9
93030629,11328318,14,11,11,9,13,11
93030630,11326319,9,6,8,10,9,8
93030631,11326309,缺考,缺考,缺考,缺考,缺考,缺考
93030701,11326308,13,10,8,8,9,13
93030702,11326310,9,6,5,5,8,7
93030703,11327212,10,5,8,6,9,10
93030704,11329301,9,5,10,7,缺考,9
93030705,11329303,10,8,8,5,11,8
93030706,11329305,12,11,7,9,8,11
93030707,11329313,11,14,11,13,10,12
93030708,11329315,12,8,9,8,7,9
93030709,11329317,9,9,6,8,8,8
93030710,11329325,12,12,12,14,13,13
93030711,11329327,9,4,6,3,9,8
93030712,11329329,15,13,14,13,15,14
93030713,11329401,10,9,6,7,10,9
93030714,11329403,9,4,8,4,7,7
93030715,11330127,10,6,5,-,-,10
93030716,11329405,10,13,11,12,11,12
93030717,11329413,12,12,9,11,10,13
93030718,11329415,12,10,8,5,12,10
93030719,11329417,9,4,5,4,8,6
93030720,11329425,9,6,5,6,9,6
93030721,11329427,8,5,10,9,4,6
93030722,11329429,11,9,10,8,12,11
93030723,11329501,11,8,8,12,12,12
93030724,11329503,7,8,9,5,10,7
93030725,11329505,10,4,6,8,8,8
93030726,11329514,11,9,8,7,9,9
93030727,11329516,7,5,2,2,4,2
93030728,11329518,8,5,9,6,7,10
93030729,11329526,13,10,13,11,13,15
93030730,11329528,14,13,13,12,12,13
93030731,11329530,13,14,14,14,13,13
93030732,11329601,12,11,3,6,11,10
93030733,11329603,缺考,缺考,缺考,缺考,缺考,缺考
93030801,11329424,13,12,13,10,10,13
93030802,11329432,9,4,4,3,8,6
93030803,11329434,9,5,8,10,7,7
93030804,11329436,11,6,7,9,9,10
93030805,11329508,9,6,9,7,9,9
93030806,11330124,8,5,6,-,-,7
93030807,11329510,13,7,8,4,7,10
93030808,11329512,10,13,8,10,12,11
93030809,11329520,14,9,8,8,12,11
93030810,11329522,10,7,8,10,8,9
93030811,11329524,11,12,8,12,10,14
93030812,11329531,9,5,6,8,10,11
93030813,11330122,9,4,7,-,-,10
93030814,11329533,10,6,6,5,10,9
93030815,11329535,10,9,7,9,9,8
93030816,11330114,6,3,1,-,-,5
93030817,11329306,10,8,6,10,9,10
93030818,11329318,10,9,8,8,11,8
93030819,11330429,12,10,11,12,-,15
93030820,11329326,8,6,8,8,7,8
93030821,11329615,9,10,5,6,10,8
93030822,11329617,11,3,8,10,10,9
93030823,11329619,9,13,7,6,8,11
93030824,11330329,11,7,6,-,8,10
93030825,11329627,12,8,7,6,11,10
93030826,11329629,11,9,7,9,13,9
93030827,11329631,8,4,8,6,6,7
93030828,11330426,9,7,5,7,-,8
93030829,11329302,9,9,5,6,11,8
93030830,11330425,11,11,10,10,-,10
93030831,11330424,13,10,9,13,-,13
93030832,11329314,8,10,8,5,10,10
93030901,11329521,10,5,8,6,11,12
93030902,11329523,13,7,8,8,11,9
93030903,11329532,8,12,3,7,11,7
93030904,11329534,10,7,7,7,11,10
93030905,11329536,10,10,6,缺考,缺考,9
93030906,11329307,11,9,7,9,12,10
93030907,11329404,7,5,9,8,9,11
93030908,11330427,11,11,8,9,-,7
93030909,11330431,7,2,6,4,-,6
93030910,19840202,7,3,2,-,-,4
93030911,11329616,11,13,9,10,10,10
93030912,11329618,11,8,3,5,10,8
93030913,11330423,8,4,3,3,-,7
93030914,11329620,13,13,10,12,14,13
93030915,11329628,13,8,5,12,10,10
93030916,11329630,12,13,11,12,11,12
93030917,11329632,11,11,8,5,11,11
93030918,11329304,9,3,5,7,7,5
93030919,11329316,9,10,11,14,11,11
93030920,11330422,8,4,4,4,-,6
93030921,11329402,12,13,9,13,11,13
93030922,11330109,8,6,7,-,-,5
93030923,11330112,12,6,8,-,-,11
93030924,11330421,9,9,7,10,-,7
93030925,11330328,11,12,12,-,13,12
93030926,11330420,9,7,6,6,-,9
93030927,11329711,10,9,10,12,9,11
93030928,11328936,9,6,-,6,10,-
93030929,11330412,8,7,3,-,7,6
93030930,11329713,12,13,7,7,10,10
93030931,11330419,9,8,9,7,-,8
93030932,11329714,6,2,4,6,8,5
93031001,11329012,13,8,-,4,9,-
93031002,11329024,11,8,-,3,9,-
93031003,11329036,12,3,-,4,8,-
93031004,11329112,12,11,-,2,8,-
93031005,11329910,11,5,-,-,8,-
93031006,11329124,12,10,-,3,9,-
93031007,11329921,9,5,-,-,5,-
93031008,11329930,11,6,-,-,5,-
93031009,11329136,12,7,-,3,8,-
93031010,11329212,9,3,-,2,8,-
93031011,11329232,11,5,-,1,5,-
93031101,11329407,13,13,11,13,11,14
93031102,11329611,13,12,10,14,15,14
93031103,11329613,13,13,12,14,10,14
93031104,11329621,12,12,11,12,13,14
93031105,11329623,11,9,11,14,11,14
93031106,11329625,13,12,13,14,14,15
93031107,11329633,15,15,13,15,12,15
93031108,11329635,15,13,15,14,13,15
93031109,11329309,13,13,11,14,11,14
93031110,11329406,14,15,15,15,14,15
93031111,11329709,14,15,14,15,13,15
93031112,11329715,11,13,6,13,11,12
93031113,11329716,13,12,13,14,14,14
93031114,11329717,11,5,8,10,11,13
93031115,19840101,12,10,12,14,12,14
93031116,11329718,14,11,14,13,9,15
93031117,11329719,12,13,12,14,14,14
93031118,11329721,12,12,15,14,13,15
93031119,11329723,11,12,11,13,12,13
93031120,11329725,14,13,13,14,13,14
93031121,11329726,13,12,9,14,15,5
93031122,11329727,13,14,11,13,13,13
93031123,11329728,13,14,12,15,10,15
93031124,11329729,12,13,13,14,12,14
93031125,11329730,11,12,13,14,10,14
93031126,11329732,10,9,7,10,10,14
93031127,11329734,15,14,12,13,13,14
93031128,11329735,14,13,11,13,12,14
93031129,11329736,15,13,14,15,14,15
93031130,11330332,10,7,10,7,11,11
93031131,11330331,12,15,14,15,12,14
93031132,11330330,15,15,11,14,13,15
93031201,11329610,5,2,3,3,5,3
93031202,11329612,4,3,3,2,4,3
93031203,11329614,2,2,4,3,4,4
93031204,11329622,5,4,2,5,4,3
93031205,11329624,8,4,4,3,9,4
93031206,11329626,8,3,3,3,6,4
93031207,11329634,4,3,3,2,4,3
93031208,11329636,7,3,3,2,5,3
93031209,11329409,9,2,3,2,9,6
93031210,11329710,11,8,4,5,9,5
93031211,11329712,9,7,5,7,9,6
93031212,11329720,8,6,2,2,8,5
93031213,11329722,7,8,4,3,6,6
93031214,11329724,3,4,2,4,4,3
93031215,11329731,3,2,3,2,3,2
93031216,11329733,8,3,5,7,6,4`;

const SUBJECTS = [
  { key: 'chinese', label: '國文', color: '#ef4444' },
  { key: 'english', label: '英文', color: '#3b82f6' },
  { key: 'mathA', label: '數學A', color: '#10b981' },
  { key: 'mathB', label: '數學B', color: '#f59e0b' },
  { key: 'social', label: '社會', color: '#8b5cf6' },
  { key: 'science', label: '自然', color: '#06b6d4' },
];

const COMBINATIONS = [
  { key: 'chi_eng_ma_sci', label: '國+英+數A+自', subjects: ['chinese', 'english', 'mathA', 'science'] },
  { key: 'chi_eng_ma_soc', label: '國+英+數A+社', subjects: ['chinese', 'english', 'mathA', 'social'] },
  { key: 'chi_eng_mb_sci', label: '國+英+數B+自', subjects: ['chinese', 'english', 'mathB', 'science'] },
  { key: 'chi_eng_mb_soc', label: '國+英+數B+社', subjects: ['chinese', 'english', 'mathB', 'social'] },
];

const SCORE_INTERVALS = [
  { label: '50-60', min: 50, max: 60 },
  { label: '40-49', min: 40, max: 49 },
  { label: '30-39', min: 30, max: 39 },
  { label: '20-29', min: 20, max: 29 },
  { label: '10-19', min: 10, max: 19 },
  { label: '0-9', min: 0, max: 9 },
];

export default function App() {
  const [activeComboKey, setActiveComboKey] = React.useState(COMBINATIONS[0].key);

  const stats = useMemo(() => {
    const lines = RAW_DATA.trim().split('\n');
    const dataRows = lines.slice(1); // Skip header

    const counts: Record<string, number[]> = {
      chinese: Array(16).fill(0),
      english: Array(16).fill(0),
      mathA: Array(16).fill(0),
      mathB: Array(16).fill(0),
      social: Array(16).fill(0),
      science: Array(16).fill(0),
    };

    const comboCounts: Record<string, number[]> = {
      chi_eng_ma_sci: Array(61).fill(0),
      chi_eng_ma_soc: Array(61).fill(0),
      chi_eng_mb_sci: Array(61).fill(0),
      chi_eng_mb_soc: Array(61).fill(0),
    };

    const totals: Record<string, number> = {
      chinese: 0,
      english: 0,
      mathA: 0,
      mathB: 0,
      social: 0,
      science: 0,
      chi_eng_ma_sci: 0,
      chi_eng_ma_soc: 0,
      chi_eng_mb_sci: 0,
      chi_eng_mb_soc: 0,
    };

    const classStats: Record<string, Record<string, { sum: number; count: number; intervals: number[] }>> = {};

    dataRows.forEach((line) => {
      const parts = line.split(',');
      const regNo = parts[0];
      const className = regNo.substring(3, 6); // 4th to 6th digits

      if (!classStats[className]) {
        classStats[className] = {};
        COMBINATIONS.forEach(c => {
          classStats[className][c.key] = { 
            sum: 0, 
            count: 0, 
            intervals: Array(SCORE_INTERVALS.length).fill(0) 
          };
        });
      }

      const rowScores: Record<string, number | null> = {
        chinese: parts[2] && parts[2] !== '-' && parts[2] !== '缺考' ? parseInt(parts[2], 10) : null,
        english: parts[3] && parts[3] !== '-' && parts[3] !== '缺考' ? parseInt(parts[3], 10) : null,
        mathA: parts[4] && parts[4] !== '-' && parts[4] !== '缺考' ? parseInt(parts[4], 10) : null,
        mathB: parts[5] && parts[5] !== '-' && parts[5] !== '缺考' ? parseInt(parts[5], 10) : null,
        social: parts[6] && parts[6] !== '-' && parts[6] !== '缺考' ? parseInt(parts[6], 10) : null,
        science: parts[7] && parts[7] !== '-' && parts[7] !== '缺考' ? parseInt(parts[7], 10) : null,
      };

      // Single subject counts
      Object.entries(rowScores).forEach(([key, val]) => {
        if (val !== null && !isNaN(val)) {
          counts[key][val]++;
          totals[key]++;
        }
      });

      // Combination counts
      COMBINATIONS.forEach(combo => {
        const comboVals = combo.subjects.map(s => rowScores[s]);
        if (comboVals.every(v => v !== null && !isNaN(v))) {
          const sum = comboVals.reduce((a, b) => (a || 0) + (b || 0), 0) || 0;
          comboCounts[combo.key][sum]++;
          totals[combo.key]++;
          
          // Class stats
          const classCombo = classStats[className][combo.key];
          classCombo.sum += sum;
          classCombo.count += 1;
          
          // Find interval
          const intervalIdx = SCORE_INTERVALS.findIndex(int => sum >= int.min && sum <= int.max);
          if (intervalIdx !== -1) {
            classCombo.intervals[intervalIdx]++;
          }
        }
      });
    });

    return { counts, comboCounts, totals, classStats };
  }, []);

  const sortedClasses = useMemo(() => {
    return Object.keys(stats.classStats).sort();
  }, [stats]);

  const chartData = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const entry: any = { grade: `${i}級分` };
      SUBJECTS.forEach((sub) => {
        entry[sub.label] = stats.counts[sub.key][i];
      });
      return entry;
    });
  }, [stats]);

  const classChartData = useMemo(() => {
    return sortedClasses.map(className => {
      const data = stats.classStats[className][activeComboKey];
      const entry: any = { name: `${className}班` };
      SCORE_INTERVALS.forEach((int, idx) => {
        entry[int.label] = data.intervals[idx];
      });
      return entry;
    });
  }, [stats, sortedClasses, activeComboKey]);

  const INTERVAL_COLORS = ['#1e3a8a', '#2563eb', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'];

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-[#1a1a1a] p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/5 pb-6">
          <div>
            <h1 className="text-4xl font-light tracking-tight text-gray-900">
              115 學測成績統計分析
            </h1>
            <p className="text-muted mt-2 flex items-center gap-2">
              <Info size={16} /> 基於提供之原始數據進行即時統計
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <span className="small-caps block">總樣本數</span>
              <span className="big-stat leading-none">
                {RAW_DATA.trim().split('\n').length - 1}
              </span>
            </div>
          </div>
        </header>

        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SUBJECTS.map((sub) => (
            <div key={sub.key} className="card p-4 flex flex-col justify-between">
              <span className="small-caps" style={{ color: sub.color }}>{sub.label}</span>
              <div className="mt-2">
                <span className="text-2xl font-light">{stats.totals[sub.key]}</span>
                <span className="text-xs text-muted ml-1">人應考</span>
              </div>
            </div>
          ))}
        </div>

        {/* Combination Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMBINATIONS.map((combo) => (
            <div key={combo.key} className="card p-4 border-l-4 border-indigo-500">
              <span className="small-caps text-indigo-600">{combo.label}</span>
              <div className="mt-2">
                <span className="text-2xl font-light">{stats.totals[combo.key]}</span>
                <span className="text-xs text-muted ml-1">人符合組合</span>
              </div>
            </div>
          ))}
        </div>

        {/* Class-based Statistics Chart */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-black/5 pb-4">
            <BarChart3 size={20} />
            <h2 className="text-lg font-medium">各班級分數級距分佈圖</h2>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                  contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                {SCORE_INTERVALS.map((int, idx) => (
                  <Bar
                    key={int.label}
                    dataKey={int.label}
                    stackId="a"
                    fill={INTERVAL_COLORS[idx]}
                    radius={idx === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Class-based Statistics Table (Intervals) */}
        <div className="card p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 pb-4">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <h2 className="text-lg font-medium">班級分數級距分佈表 (雙項細目表)</h2>
            </div>
            <div className="flex bg-[#f5f5f5] p-1 rounded-xl gap-1">
              {COMBINATIONS.map(combo => (
                <button
                  key={combo.key}
                  onClick={() => setActiveComboKey(combo.key)}
                  className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                    activeComboKey === combo.key 
                      ? 'bg-white shadow-sm text-indigo-600 font-bold' 
                      : 'text-muted hover:text-gray-900'
                  }`}
                >
                  {combo.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/5">
                  <th className="text-left py-2 font-medium text-muted uppercase tracking-wider text-[10px]">班級</th>
                  {SCORE_INTERVALS.map(int => (
                    <th key={int.label} className="text-right py-2 font-medium text-muted uppercase tracking-wider text-[10px]">{int.label}</th>
                  ))}
                  <th className="text-right py-2 font-medium text-muted uppercase tracking-wider text-[10px] bg-black/[0.02]">小計</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {sortedClasses.map((className) => {
                  const data = stats.classStats[className][activeComboKey];
                  return (
                    <tr key={className} className="hover:bg-black/[0.02] transition-colors">
                      <td className="py-3 font-mono font-bold text-indigo-600">{className} 班</td>
                      {SCORE_INTERVALS.map((int, idx) => (
                        <td key={int.label} className="text-right py-3 font-mono">
                          {data.intervals[idx] || '-'}
                        </td>
                      ))}
                      <td className="text-right py-3 font-mono font-bold bg-black/[0.01]">
                        {data.count}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-black/5 bg-black/[0.01]">
                  <td className="py-3 font-medium">全體人數</td>
                  {SCORE_INTERVALS.map((int, idx) => {
                    const totalInInterval = sortedClasses.reduce((acc, cls) => acc + stats.classStats[cls][activeComboKey].intervals[idx], 0);
                    return (
                      <td key={int.label} className="text-right py-3 font-mono font-bold text-lg">
                        {totalInInterval}
                      </td>
                    );
                  })}
                  <td className="text-right py-3 font-mono font-bold text-lg bg-black/[0.02]">
                    {stats.totals[activeComboKey]}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-muted italic">
            <Info size={12} /> 提示：上方按鈕可切換不同的科目組合。表格內數字為該班級在該分數區間的人數。
          </div>
        </div>

        {/* Combo Statistics Table */}
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-black/5 pb-4">
            <Table size={20} />
            <h2 className="text-lg font-medium">科目組合總分人數統計表 (4科總分)</h2>
          </div>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-white z-10">
                <tr className="border-b border-black/5">
                  <th className="text-left py-2 font-medium text-muted uppercase tracking-wider text-[10px]">總分</th>
                  {COMBINATIONS.map(combo => (
                    <th key={combo.key} className="text-right py-2 font-medium text-muted uppercase tracking-wider text-[10px]">{combo.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {Array.from({ length: 61 }, (_, i) => i).reverse().map((score) => {
                  const hasData = COMBINATIONS.some(combo => stats.comboCounts[combo.key][score] > 0);
                  if (!hasData) return null;
                  return (
                    <tr key={score} className="hover:bg-black/[0.02] transition-colors">
                      <td className="py-2 font-mono font-medium">{score}</td>
                      {COMBINATIONS.map(combo => (
                        <td key={combo.key} className="text-right py-2 font-mono">
                          {stats.comboCounts[combo.key][score] || '-'}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="sticky bottom-0 bg-white z-10">
                <tr className="border-t-2 border-black/5 bg-black/[0.01]">
                  <td className="py-3 font-medium">總計人數</td>
                  {COMBINATIONS.map(combo => (
                    <td key={combo.key} className="text-right py-3 font-mono font-bold">
                      {stats.totals[combo.key]}
                    </td>
                  ))}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-black/5 pb-4">
              <BarChart3 size={20} />
              <h2 className="text-lg font-medium">單科級分分佈趨勢</h2>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                  <XAxis dataKey="grade" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Legend iconType="circle" />
                  {SUBJECTS.map((sub) => (
                    <Line
                      key={sub.key}
                      type="monotone"
                      dataKey={sub.label}
                      stroke={sub.color}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-black/5 pb-4">
              <Table size={20} />
              <h2 className="text-lg font-medium">單科級分人數統計表</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="text-left py-2 font-medium text-muted uppercase tracking-wider text-[10px]">級分</th>
                    {SUBJECTS.map(sub => (
                      <th key={sub.key} className="text-right py-2 font-medium text-muted uppercase tracking-wider text-[10px]">{sub.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {Array.from({ length: 16 }, (_, i) => i).reverse().map((grade) => (
                    <tr key={grade} className="hover:bg-black/[0.02] transition-colors">
                      <td className="py-2 font-mono font-medium">{grade}</td>
                      {SUBJECTS.map(sub => (
                        <td key={sub.key} className="text-right py-2 font-mono">
                          {stats.counts[sub.key][grade] || '-'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-black/5 bg-black/[0.01]">
                    <td className="py-3 font-medium">總計</td>
                    {SUBJECTS.map(sub => (
                      <td key={sub.key} className="text-right py-3 font-mono font-bold">
                        {stats.totals[sub.key]}
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-black/5 text-center text-muted text-xs">
          <p>© 115 學測成績數據分析系統 | 僅供參考</p>
        </footer>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .big-stat {
          font-size: 3rem;
          font-weight: 300;
        }
        .small-caps {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        .text-muted {
          color: #9e9e9e;
        }
      `}} />
    </div>
  );
}
