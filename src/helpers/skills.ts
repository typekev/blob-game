import type { BlobSkill } from "../types.d";

import {
  BlobDaringSkill,
  BlobFunSkill,
  BlobKindSkill,
  BlobType,
  BlobWiseSkill,
} from "../types.d";

const daringSkills = Object.values(BlobDaringSkill);
const funSkills = Object.values(BlobFunSkill);
const kindSkills = Object.values(BlobKindSkill);
const wiseSkills = Object.values(BlobWiseSkill);

const blobSkills: Record<BlobType, BlobSkill[]> = {
  [BlobType.Daring]: daringSkills,
  [BlobType.Fun]: funSkills,
  [BlobType.Kind]: kindSkills,
  [BlobType.Wise]: wiseSkills,
};

export const getNewSkill = (type: BlobType, skills: readonly BlobSkill[]) => {
  if (skills.length < 4) {
    for (const skill of blobSkills[type]) {
      if (!skills.includes(skill)) {
        return skill;
      }
    }
  }
};

export const MAX_SKILLS = 4;
