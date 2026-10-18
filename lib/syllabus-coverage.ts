/**
 * High-level syllabus topic map for DA & CS papers.
 * Status reflects available VektaPrep study/practice assets, not official exam guarantees.
 * Cross-check topics against https://gate2027.iitm.ac.in/syllabus
 */

export type CoverageStatus =
  | 'not-started'
  | 'material'
  | 'practice'
  | 'revision';

export type SyllabusTopic = {
  id: string;
  paper: 'DA' | 'CS' | 'Both';
  section: string;
  title: string;
  /** Resource ids that support this topic (notes or practice). */
  resourceIds: string[];
  status: CoverageStatus;
};

function statusFromResources(ids: string[], hasPractice: boolean): CoverageStatus {
  if (ids.length === 0) return 'not-started';
  if (hasPractice) return 'practice';
  return 'material';
}

export const syllabusTopics: SyllabusTopic[] = [
  // Shared / both papers
  {
    id: 'linear-algebra',
    paper: 'Both',
    section: 'Engineering Mathematics (shared)',
    title: 'Linear Algebra',
    resourceIds: ['SH1_Linear_Algebra', 'QBank_DA', 'QBank_CS'],
    status: statusFromResources(['SH1_Linear_Algebra'], true),
  },
  {
    id: 'probability-stats',
    paper: 'Both',
    section: 'Engineering Mathematics (shared)',
    title: 'Probability & Statistics',
    resourceIds: ['SH2_Probability_and_Statistics'],
    status: statusFromResources(['SH2_Probability_and_Statistics'], false),
  },
  {
    id: 'calculus-opt',
    paper: 'Both',
    section: 'Engineering Mathematics (shared)',
    title: 'Calculus & Optimization',
    resourceIds: ['SH3_Calculus_and_Optimization'],
    status: statusFromResources(['SH3_Calculus_and_Optimization'], false),
  },
  {
    id: 'pds',
    paper: 'Both',
    section: 'Core CS (shared)',
    title: 'Programming & Data Structures',
    resourceIds: ['SH4_Programming_and_Data_Structures', 'Mixed_Revision_Test'],
    status: statusFromResources(['SH4_Programming_and_Data_Structures'], true),
  },
  {
    id: 'algorithms',
    paper: 'Both',
    section: 'Core CS (shared)',
    title: 'Algorithms',
    resourceIds: ['SH5_Algorithms'],
    status: statusFromResources(['SH5_Algorithms'], false),
  },
  {
    id: 'databases',
    paper: 'Both',
    section: 'Core CS (shared)',
    title: 'Databases & SQL',
    resourceIds: ['SH6_Databases_and_SQL'],
    status: statusFromResources(['SH6_Databases_and_SQL'], false),
  },
  {
    id: 'ga',
    paper: 'Both',
    section: 'General Aptitude',
    title: 'General Aptitude',
    resourceIds: ['GA_General_Aptitude'],
    status: statusFromResources(['GA_General_Aptitude'], false),
  },
  // DA-specific
  {
    id: 'ml-supervised',
    paper: 'DA',
    section: 'Data Science & AI',
    title: 'Machine Learning (supervised)',
    resourceIds: ['DA_ML1_Machine_Learning_Supervised', 'QBank_DA', 'Mock_DA_Set1', 'Mock_DA_Set2'],
    status: statusFromResources(['DA_ML1_Machine_Learning_Supervised'], true),
  },
  {
    id: 'ml-unsupervised',
    paper: 'DA',
    section: 'Data Science & AI',
    title: 'Neural networks & unsupervised learning',
    resourceIds: ['DA_ML2_Neural_Networks_and_Unsupervised'],
    status: statusFromResources(['DA_ML2_Neural_Networks_and_Unsupervised'], false),
  },
  {
    id: 'ai',
    paper: 'DA',
    section: 'Data Science & AI',
    title: 'Artificial Intelligence',
    resourceIds: ['DA_AI_Artificial_Intelligence'],
    status: statusFromResources(['DA_AI_Artificial_Intelligence'], false),
  },
  {
    id: 'dw',
    paper: 'DA',
    section: 'Data Science & AI',
    title: 'Data management & warehousing',
    resourceIds: ['DA_DW_Database_Management_and_Warehousing'],
    status: statusFromResources(['DA_DW_Database_Management_and_Warehousing'], false),
  },
  // CS-specific
  {
    id: 'discrete',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Discrete Mathematics',
    resourceIds: ['CS_DM_Discrete_Mathematics', 'QBank_CS'],
    status: statusFromResources(['CS_DM_Discrete_Mathematics'], true),
  },
  {
    id: 'digital-logic',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Digital Logic',
    resourceIds: ['CS_DL_Digital_Logic'],
    status: statusFromResources(['CS_DL_Digital_Logic'], false),
  },
  {
    id: 'coa',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Computer Organization & Architecture',
    resourceIds: ['CS_COA_Computer_Organization'],
    status: statusFromResources(['CS_COA_Computer_Organization'], false),
  },
  {
    id: 'toc',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Theory of Computation',
    resourceIds: ['CS_TOC_Theory_of_Computation'],
    status: statusFromResources(['CS_TOC_Theory_of_Computation'], false),
  },
  {
    id: 'compiler',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Compiler Design',
    resourceIds: ['CS_CD_Compiler_Design'],
    status: statusFromResources(['CS_CD_Compiler_Design'], false),
  },
  {
    id: 'os',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Operating Systems',
    resourceIds: ['CS_OS_Operating_Systems'],
    status: statusFromResources(['CS_OS_Operating_Systems'], false),
  },
  {
    id: 'networks',
    paper: 'CS',
    section: 'Computer Science & IT',
    title: 'Computer Networks',
    resourceIds: ['CS_CN_Computer_Networks', 'Mock_CS_Set1', 'Mock_CS_Set2'],
    status: statusFromResources(['CS_CN_Computer_Networks'], true),
  },
];

export const syllabusLastMapped = '2026-10-18';
