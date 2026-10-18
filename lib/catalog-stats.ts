/**
 * Verified catalogue figures derived from lib/resources.generated.json and
 * build-manifest metadata. Page counts and answer-key accuracy are not verified
 * here without parsing .docx files locally.
 */
import { manifest, resources } from './resources';

const SUBJECT_NOTE_GROUPS = new Set([
  'Shared Foundations',
  'DA - Data Science & AI',
  'CS - Computer Science & IT',
  'General Aptitude',
]);

/** Study notes / subject documents (excludes planning masters and practice packs). */
export function subjectStudyDocuments() {
  return resources.filter((r) => SUBJECT_NOTE_GROUPS.has(r.group));
}

export function resourcesByKind() {
  const mocks = resources.filter((r) => /^Mock_/.test(r.id));
  const qbanks = resources.filter((r) => r.id.startsWith('QBank_'));
  const pyq = resources.filter((r) => r.id.startsWith('PYQ_'));
  const revision = resources.filter((r) => r.id === 'Mixed_Revision_Test');
  const planning = resources.filter((r) => r.group === 'Planning & Master');
  return { mocks, qbanks, pyq, revision, planning };
}

export function computeCatalogStats() {
  const { mocks, qbanks, pyq, revision, planning } = resourcesByKind();
  const subjectNotes = subjectStudyDocuments();

  const distinctSubjectNotes = subjectNotes.length;
  const sharedCount = resources.filter((r) => r.group === 'Shared Foundations').length;
  const daCount = resources.filter((r) => r.group === 'DA - Data Science & AI').length;
  const csCount = resources.filter((r) => r.group === 'CS - Computer Science & IT').length;

  return {
    documentCount: resources.length,
    manifestGeneratedAt: manifest.generatedAt,
    subjectNoteCount: distinctSubjectNotes,
    sharedFoundationNotes: sharedCount,
    daNotes: daCount,
    csNotes: csCount,
    mockTestDocuments: mocks.length + revision.length,
    fullLengthMocks: mocks.length,
    questionBankDocuments: qbanks.length,
    pyqGuides: pyq.length,
    planningDocuments: planning.length,
  };
}

export const catalogStats = computeCatalogStats();

/** Counts derived from the current catalogue, not document-content audits. */
export const homeStats = [
  { label: 'Study documents', value: String(catalogStats.documentCount) },
  { label: 'Subject notes', value: String(catalogStats.subjectNoteCount) },
  { label: 'Mock documents', value: String(catalogStats.fullLengthMocks) },
] as const;
