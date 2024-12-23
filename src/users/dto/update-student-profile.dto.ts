export class UpdateStudentProfileDto {
  name: string;
  email: string;
  profilePictureUrl?: string;
  learningPreferences: string[];
  subjectsOfInterest: string[];
}
