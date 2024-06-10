export enum LocalStorageKeys {
  Palette = "palette",
  Blobs = "blobs",
}

export type Blobs = Map<BlobID, Blob>;
export type BlobEvents = Map<BlobEventID, BlobEvent>;

export interface Blob {
  id: BlobID;
  name: BlobName;
  level: BlobLevel;
  exp: BlobExp;
  type: BlobType;
  skills: BlobSkill[];
}

export interface BlobEvent {
  eventId: BlobEventID;
  blob: Blob;
}

export interface NewBlob {
  name: BlobName;
  type: BlobType;
}

export type BlobEventID = number;
export type BlobID = string;
export type BlobName = string;
export type BlobLevel = number;
export type BlobExp = number;
export enum BlobType {
  Daring = "Daring",
  Fun = "Fun",
  Kind = "Kind",
  Wise = "Wise",
}
export type BlobSkill =
  | BlobDaringSkill
  | BlobFunSkill
  | BlobKindSkill
  | BlobWiseSkill;

export enum BlobDaringSkill {
  GoOutside = "Go Outside",
  TrySomethingNew = "Try Something New",
  VisitANewPlace = "Visit A New Place",
  GreetStranger = "Greet Stranger",
}

export enum BlobFunSkill {
  TellJokes = "Tell Jokes",
  PlayGames = "Play Games",
  BreakDance = "Break Dance",
  DrinkBeer = "Drink Beer",
}

export enum BlobKindSkill {
  NodApprovingly = "Nod Approvingly",
  Cheer = "Cheer",
  Hug = "Hug",
  Help = "Help",
}

export enum BlobWiseSkill {
  NodKnowingly = "Nod Knowingly",
  GrowBeard = "Grow Beard",
  KnowStuff = "Know Stuff",
  Program = "Program",
}

export enum AppElementID {
  Start = "Start",
  Nav = "Nav",
  NavCollapseToggle = "Nav_Collapse_Toggle",
  BlobEditor = "Blob_Editor",
  BlobField = "Blob_Field",
  RestartDialog = "Restart_Dialog",
  HelpDialog = "Help_Dialog",
  DeleteElementDialog = "Delete_Element_Dialog",
}
