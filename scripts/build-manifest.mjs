// Builds lib/resources.generated.json from the GATE2027_Library folder and
// copies each .docx into public/resources so the site works without S3.
// Run from web/:  node scripts/build-manifest.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.resolve(__dirname, '..');
const LIB = path.resolve(WEB, '..', 'GATE2027_Library');
const PUBLIC_RES = path.resolve(WEB, 'public', 'resources');

const GROUPS = {
  '00_Master': { group: 'Planning & Master', serves: 'Both', order: 1 },
  Shared: { group: 'Shared Foundations', serves: 'Both', order: 2 },
  DA: { group: 'DA - Data Science & AI', serves: 'DA', order: 3 },
  CS: { group: 'CS - Computer Science & IT', serves: 'CS', order: 4 },
  GA: { group: 'General Aptitude', serves: 'Both', order: 5 },
  Practice: { group: 'Practice, PYQs & Mocks', serves: 'Both', order: 6 },
};

// Nice titles + one-line descriptions keyed by filename.
const META = {
  '00_GATE2027_Syllabus_Checklist_and_Coverage_Matrix.docx': ['Syllabus, Checklist & Coverage Matrix', 'The controlling reference: official DA/CS/GA syllabus + coverage map.'],
  'M1_Study_Roadmap.docx': ['Study Roadmap', 'Week-by-week plan from today to the February 2027 exam.'],
  'M2_Formula_Book.docx': ['Formula Book & Math Reference', 'Every key formula from the whole library, consolidated.'],
  'M3_Common_Mistakes_and_Strategy.docx': ['Common Mistakes, Traps & Strategy', 'The errors that cost marks and how to avoid them.'],
  'M4_Last_Minute_Revision_Notes.docx': ['Last-Minute Revision Notes', 'Ultra-condensed essentials for the final days.'],
  'M5_Master_Index_and_Progress_Report.docx': ['Master Index & Progress Report', 'The map of the whole library with study order.'],
  'SH1_Linear_Algebra.docx': ['Linear Algebra', 'Vectors to eigenvalues, projections, quadratic forms & SVD.'],
  'SH2_Probability_and_Statistics.docx': ['Probability & Statistics', 'Counting to distributions, the CLT and hypothesis testing.'],
  'SH3_Calculus_and_Optimization.docx': ['Calculus & Optimization', 'Limits, derivatives, Taylor, optimization & integration.'],
  'SH4_Programming_and_Data_Structures.docx': ['Programming & Data Structures', 'Python & C tracks, recursion and the core data structures.'],
  'SH5_Algorithms.docx': ['Algorithms', 'Complexity, searching, sorting, greedy, DP and graphs.'],
  'SH6_Databases_and_SQL.docx': ['Databases & SQL', 'ER, relational algebra, SQL, normalization, indexing, transactions.'],
  'DA_ML1_Machine_Learning_Supervised.docx': ['Machine Learning - Vol 1 (Supervised)', 'Regression, classification and model evaluation.'],
  'DA_ML2_Neural_Networks_and_Unsupervised.docx': ['Machine Learning - Vol 2 (Neural & Unsupervised)', 'Neural nets, clustering and dimensionality reduction.'],
  'DA_AI_Artificial_Intelligence.docx': ['Artificial Intelligence', 'Search, logic and reasoning under uncertainty.'],
  'DA_DW_Database_Management_and_Warehousing.docx': ['Data Management & Warehousing', 'Preprocessing and multidimensional data warehousing.'],
  'CS_DM_Discrete_Mathematics.docx': ['Discrete Mathematics', 'Logic, sets, lattices, groups, graphs and combinatorics.'],
  'CS_DL_Digital_Logic.docx': ['Digital Logic', 'Number systems, Boolean algebra, minimization & circuits.'],
  'CS_COA_Computer_Organization.docx': ['Computer Organization & Architecture', 'ISA, control, memory hierarchy, I/O and pipelining.'],
  'CS_TOC_Theory_of_Computation.docx': ['Theory of Computation', 'Automata, grammars, pumping lemmas and undecidability.'],
  'CS_CD_Compiler_Design.docx': ['Compiler Design', 'From source text to optimised intermediate code.'],
  'CS_OS_Operating_Systems.docx': ['Operating Systems', 'Processes, scheduling, deadlock, memory and files.'],
  'CS_CN_Computer_Networks.docx': ['Computer Networks', 'Layering, switching, routing, IP, TCP and the web.'],
  'GA_General_Aptitude.docx': ['General Aptitude', 'Verbal, quantitative, analytical and spatial aptitude.'],
  'QBank_DA.docx': ['DA Question Bank', '58 original GATE-style questions across all DA subjects.'],
  'QBank_CS.docx': ['CS Question Bank', '62 original GATE-style questions across all CS subjects.'],
  'PYQ_DA_Guide.docx': ['DA PYQ Guide', 'Pattern analysis, official sources and pattern-matched practice.'],
  'PYQ_CS_Guide.docx': ['CS PYQ Guide', 'Pattern analysis, official sources and pattern-matched practice.'],
  'Mock_DA_Set1.docx': ['DA Full-Length Mock - Set 1', '65 questions · 100 marks · 3 hours, with solutions.'],
  'Mock_DA_Set2.docx': ['DA Full-Length Mock - Set 2', '65 questions · 100 marks · 3 hours, with solutions.'],
  'Mock_CS_Set1.docx': ['CS Full-Length Mock - Set 1', '65 questions · 100 marks · 3 hours, with solutions.'],
  'Mock_CS_Set2.docx': ['CS Full-Length Mock - Set 2', '65 questions · 100 marks · 3 hours, with solutions.'],
  'Mixed_Revision_Test.docx': ['Mixed Revision Test', '30-question cross-subject set over the shared foundations.'],
};

function prettify(name) {
  return name.replace(/\.docx$/, '').replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}
function servesFromName(name) {
  if (/(^|_)DA(_|$)|_DA_|DA_Set|_DA\b/.test(name) || name.includes('_DA')) return 'DA';
  if (name.includes('_CS') || /CS_Set/.test(name)) return 'CS';
  return 'Both';
}

fs.mkdirSync(PUBLIC_RES, { recursive: true });

const items = [];
for (const folder of Object.keys(GROUPS)) {
  const dir = path.join(LIB, folder);
  if (!fs.existsSync(dir)) continue;
  const g = GROUPS[folder];
  for (const f of fs.readdirSync(dir).sort()) {
    if (!f.toLowerCase().endsWith('.docx')) continue;
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    // copy into public/resources (flat; filenames are unique)
    fs.copyFileSync(full, path.join(PUBLIC_RES, f));
    const [title, desc] = META[f] || [prettify(f), ''];
    const serves = folder === 'Practice' ? servesFromName(f) : g.serves;
    items.push({
      id: f.replace(/\.docx$/, ''),
      file: f,
      key: `${folder}/${f}`, // S3 key (mirrors library structure)
      title,
      description: desc,
      group: g.group,
      groupOrder: g.order,
      serves,
      sizeKB: Math.max(1, Math.round(stat.size / 1024)),
      ext: 'docx',
    });
  }
}

const out = {
  generatedAt: new Date().toISOString(),
  count: items.length,
  items,
};
fs.writeFileSync(path.resolve(WEB, 'lib', 'resources.generated.json'), JSON.stringify(out, null, 2));
console.log(`Manifest: ${items.length} resources -> lib/resources.generated.json`);
console.log(`Copied ${items.length} files -> public/resources/`);
