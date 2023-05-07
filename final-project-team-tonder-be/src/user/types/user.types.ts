import { LoginDto } from './../dto/login-user.dto';
export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum ReasonEnum {
  DATING = 'dating',
  FRIENDS = 'friends',
  NEW_RELATIONSHIP = 'newRelationship',
}

export enum AlcoholEnum {
  NO = 'no',
  YES = 'yes',
  LITTLE = 'little',
  TOO_MUCH = 'tooMuch',
}

export enum EducationEnum {
  NONE = 'none',
  GRADUATED = 'graduated',
  UNIVERSITY = 'university',
  HIGH_SCHOOL = 'highSchool',
}

export interface ILoginResult {
  accessToken: string;
  user: LoginDto;
}
