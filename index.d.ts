/// <reference types="firebase-admin"/>

import {firestore} from 'firebase-admin';

export type Role =
| "any"
// Admin Roles
  | "superAdmin"
  | "registrarLabelAdmin"
  | "staffManagementAdmin"
  | "studentManagementAdmin"
  | "scheduleAdmin"
  | "sectionAdmin"
  | "courseAdmin"
  | "registrarReportingAdmin"
  | "reportCardAdmin"
  | "feedbackManagementAdmin"
  // feedback specific roles
  | "feedbackProcessor"
  | "feedbackManagementAdmin"
  | "feedbackViewer"
  | "feedbackManagementAdmin"
  | "feedbackReminder"
  // report card specific roles
  | "transcriptAdmin"
  | "classroomTeacher"
  | "coach"
  // label specific roles
  | "labelAdmin"
  | "labelUser"
  // student management roles
  | "studentInfoEdit"
  | "studentImport"
  | "studentStatusEdit"
  ;

export type DepartureType =
  | "dismissed"
  | "graduated"
  | "mid-year withdrawl"
  | "not returning"
  | "not invited back";
export interface Course {
  ID: string;
  courseID: string;
  name: string;
  department: string;
  termLength: number;
  credit: number;
  description: string;
  requirement?: Requirement[];
  canRetakeForCredit: boolean;
  active: boolean;
  school: School;
  prerequisites: Prerequisite[];
}

export interface SectionCountType {
  sectionID: string;
  value: -1 | 1;
}


export interface MarkList {
  [period: string]: AttendanceMark | firestore.FieldValue;
}

export interface CalculatedExcusalPeriods {
  periods: MarkList,
  fields: firestore.FieldValue[]
}

export type AttendanceCode = 'ABS-X' | 'ABS-U' | 'ABS-CUT' | 'LT-X' | 'LT-U' | 'Nurse' | 'Counselor' | 'ABS';


export interface AttendanceMark {
  code: AttendanceCode;
  comment: string;
  period: string;
  section?: string;
}


export interface AttendanceRecord {
  ID: string;
  name: string;
  date: string;
  isBoarder?: boolean;
  isAllDay?: boolean;
  periods: MarkList;
}

export interface CoverageRequest {
  approvalType: string;
  coveredBy: string;
  sectionID: string;
  period: string;
  sectionName: string;
  teacherName: string;
  teacherEmail: string;
  dateString: string;
  emailSent: boolean;
}


export interface InspectionRecord {
  reasons: string;
  dorm: string;
  datestring: string;
  ID: string;
  name: string;
  email: string;
  uid: string;
}

export interface PropUpdate {
  propName: string;
  propValue: any;
}

export interface RecordUpdate {
  ID: string;
  updates: PropUpdate[];
}

export interface Name {
  firstName: string;
  middleName?: string;
  lastName: string;
  suffix?: string;
  nickName?: string;
  title?: string;
}

export interface Address {
  city: string;
  country: string;
  district?: string;
  postal: string;
  state: string;
  street1: string;
  street2?: string;
  type: string;
}

export interface Permissions {
  home: PermissionsObj;
  bike: PermissionsObj;
  walk: PermissionsObj;
  car: PermissionsObj;
}

export interface PermissionsObj {
  type: string;
  allowed: boolean;
  restriction?: string;
}

export interface Student {
  address: Address;
  birthDate: string;
  boarder: string;
  classOf: number;
  currentSchool: string;
  currentStudent: boolean;
  email: string;
  gender: string;
  ID: string;
  nameObj: Name;
  name: string;
  cellPhone?: string;
  feedbackEmails: string[];
  permissions: Permissions;
  enrolledYears: string[];
  enrollments: Enrollment[];
}

export interface Enrollment{
  enrollmentDate: string;
  departure?: Departure;
}

export interface Departure {
  departureDate: string;
  departureReason: DepartureType;
}


export interface StaffMember {
  nameObj: Name;
  name: string;
  email: string;
  ID: string;
  cellPhone?:string;
  currentStaff: boolean;
  roles: Role[];
}

export interface ModuleInfo {
  title: string;
  description: string;
  icon: string;
  href: string;
  roles: Role[];
}

export interface Prerequisite {
  courseID: string;
  minGrade?: string;
}

export type Requirement = "international" | "all";

export interface Section {
  ID: string;
  period: string;
  teachers: SimpleList;
  students: SimpleSectionList;
  academicYear: string;
  name: string;
  courseID: string;
  sectionNum: number;
  terms: TermList;
  room: SimpleIndividual;
  school: School;
  feedbackOnly: boolean;
  yearLong: boolean;
}

export interface NewSection {
  ID: string;
  period: string;
  teachers: SimpleIndividual[];
  students: SimpleIndividual[];
  academicYear: string;
  name: string;
  courseID: string;
  sectionNum: number;
  terms: string[];
  room: SimpleIndividual;
  school: School;
  feedbackOnly: boolean;
  yearLong: boolean;
}

// export interface CourseRequest {}

export type School = "OFS-US" | "OFS-MS";

export interface SimpleSectionList {
  [id: string]: SectionIndividual;
}

export interface TermList {
  T1?: boolean;
  T2?: boolean;
  T3?: boolean;
}

export interface SimpleIndividual {
  ID: string;
  name: string;
}
export interface SectionIndividual extends SimpleIndividual {
  enrolled?: string;
  withdrawn?: string;
}

export interface SimpleList {
  [key: string]: SimpleIndividual;
}

export interface FeedbackReminder {
  sections: SimpleSection[];
  ID: string;
  name: string;
}

export interface SimpleSection {
  ID: string;
  courseID: string;
  name: string;
  period: string;
  teachers: SimpleList;
  terms: TermList;
}

export interface AcademicYear {
  year: string;
  T1: Term;
  T2: Term;
  T3: Term;
}

export interface Term {
  name: string;
  start: string;
  end: string;
}

export interface ScheduleDay {
  dayID?: number;
  date?: string;
  periods: PeriodList;
  isClosed?: boolean;
  school: School;
  academicYear: string;
  terms: TermList;
  ID: string;
  dayName?: string;
}

export interface NurseRecord {
  student: SimpleIndividual;
  date: string;
  timeIn: string;
  reason: string;
  timeOut?: string;
  checkedIn: boolean;
}

export interface TimeExcusal {
  ID: string;
  name: string;
  start: string;
  end: string;
  comment: string;
  code: AttendanceCode;
  includedDays: string[];
  edited: string;
  editedBy: string;
  uid: string;
}

export interface TimeExcusalRequirements {
  student: Student;
  sections: Section[];
  schedules: PeriodObj[][];
}

export interface PeriodList {
  [key: string]: PeriodObj;
}

export interface SchoolBoolean {
  "OFS-US"?: boolean;
  "OFS-MS"?: boolean;
}

export interface BooleanList {
  [key: string]: boolean;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface Relation {
  hasCurrentStudent: boolean;
  email: string;
  address: Address;
  nameObj: Name;
  name: string;
  ID: string;
  relations: RelationList | RelationDepartureList;
  relationClasses: BooleanList;
  nonStudentRelations: RelationList;
  hasBoarder: boolean;
  cellPhone?: string;
  homePhone?: string;
  workPhone?: string;
  affiliation?: string;
  // TODO: need to add these properties in database etc
  isInternationalFamily: boolean;
}

export interface Label {
  name: string;
  address: string;
}

export interface RelationList {
  [index: string]: SimpleRelation;
}

export interface SimpleRelation extends SimpleIndividual {
  reciprocalRelationship: string;
  livesWith: boolean;
  receivesReportCards: boolean;
  receivesFeedbackForms: boolean;
}

export interface DepartedRelation extends SimpleRelation {
  // TODO: add this logic into database, queries, etc
  departed: boolean;
  departureType: DepartureType;
}
export interface RelationDepartureList {
  [ID: string]: DepartedRelation;
}
export interface PeriodMetaItem {
  period: string;
  school: SchoolBoolean;
  terms: TermList;
  advisor: boolean;
  academicYear: string;
}

export interface PeriodObj {
  period: string;
  start: string;
  end: string;
  school: SchoolBoolean;
  terms: TermList;
  advisor: boolean;
  academicYear: string;
}

export interface FeedbackForm {
  courseName: string;
  period: string;
  sectionID: string;
  school: School;
  student: SimpleIndividual;
  date: string;
  comment: string;
  processed: boolean;
  rejected?: boolean;
  rejectionReason?: string;
  teacher: SimpleIndividual;
  emails: string[];
  ID: string;
}
type SectionChangeType =
  | "student-withdrawl"
  | "student-enrollment"
  | "student-removal"
  | "teacher-added"
  | "teacher-removed"
  | "name-changed"
  | "school-changed"
  | "period-changed"
  | "terms-changed"
  | "section-created"
  | "section-deleted"
  | "room-changed";

export interface SectionIndividualChange {
  sectionID: string;
  type: SectionChangeType;
  individual?: SimpleIndividual;
  date: string;
}

export interface SectionPropChange {
  type: SectionChangeType;
  sectionID: string;
  date: string;
  property: string;
  previousValue: any;
  newValue: any;
}

export interface SectionUpdate {
  section: Section;
  changes: SectionPropChange[] | SectionIndividualChange[];
}

export interface CourseGroup {
  ID: string;
  name: string;
  sections: Section[];
}

export interface PeriodGroup {
  ID: string;
  name: string;
  sections: Section[];
}

export interface SimpleEmailIndividual extends SimpleIndividual {
  email: string;
}

export interface SimpleStudent extends SimpleIndividual {
  grade: number;
}

export type MarkingColumn = "MT1" | "T1" | "MT2" | "T2" | "MT3" | "T3" | "Year";

export type Grade =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F"
  | "P"
  | "I"
  | "CR";

export interface ClassReport {
  ID: string;
  section: SimpleSection;
  mark: Grade;
  comment?: string;
  student: SimpleStudent;
  academicYear: string;
  markingColumn: MarkingColumn;
  school: School;
}

export interface ClassNote {
  courseID: string;
  markingColumn: MarkingColumn;
  academicYear: string;
  note: string;
  ID: string;
}

export interface StudentReport {
  student: SimpleStudent;
  reports: ClassReport[];
}

export interface LabelSet {
  user: string;
  name: string;
  type: "current" | "archived";
  studentType?: "international" | "domestic";
}

export interface CurrentFamiliesLabelSet extends LabelSet {
  grades: number[];
  enrollmentType?: "new" | "returning";
  boardingStatus?: "Day" | "Boarding";
}

export interface ArchivedLabeledSet extends LabelSet {
  classOf: number[];
}

export interface RepeatedTask {
  ID: string;
  repeatFrequency: 'daily' | 'weekdays' | 'weekly' | 'monthly';
  functionName: string;
  active: boolean;
  startDate: string;
  endDate: string;
  options: any;
}

export interface OneTimeTask {
  ID: string;
  status: 'scheduled' | 'complete' | 'error';
  functionName: string;
  triggerTime: string;
  isRepeat: boolean;
  repeatID?: string;
  options: any;
}

export interface OnCreateTask {
  type: 'Section' | 'Student' | 'Course' | 'StaffMember';
}

export interface onCreateSectionTask extends OnCreateTask {
  type: 'Section',
  teachersIncludedOnFeedbacks: string[]; // Course ID array
  
}

export interface PromiseDict {
  [key: string]: (options?: any) =>  Promise<void>;
}

export interface MailgunOptions {
  to: string,
  from: string,
  cc?: string,
  bcc?: string,
  subject: string,
  text: string,
  html?: string,
}
  
export interface BankTransaction {
  ID: string;
  accountBalance: number;
  accountName: string;
  amount: number;
  bankBalance: number;
  timestamp: string;
}

export interface BankAccount {
  ID: string;
  archived: boolean;
  balance: number;
  created: string;
  deposits: number;
  email: string;
  limit: number;
  name: string;
  type: "Student" | "Other";
  authorizedUsers?: SimpleList;
  withdrawls: number;
}
