export class UpdateInstructorProfileDto {
  name: string;
  email: string;
  profilePictureUrl?: string;
  expertise: string[];
  teachingInterests: string[];
}
