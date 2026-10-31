import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

// PartialType makes every field optional but keeps the same validation rules
export class UpdateCourseDto extends PartialType(CreateCourseDto) {}
