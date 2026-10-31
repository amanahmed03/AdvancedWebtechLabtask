import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  getAllCourses() {
    return {
      message: 'All courses fetched successfully',
      data: [],
    };
  }

  getCourseById(id: string) {
    return {
      message: 'Course fetched successfully',
      id,
    };
  }

  createCourse(dto: CreateCourseDto) {
    return {
      message: 'Course created successfully',
      data: dto,
    };
  }

  updateCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course updated successfully',
      id,
      data: dto,
    };
  }

  patchCourse(id: string, dto: UpdateCourseDto) {
    return {
      message: 'Course patched successfully',
      id,
      updatedFields: Object.keys(dto), // just the fields that were sent
    };
  }

  deleteCourse(id: string) {
    return {
      message: 'Course deleted successfully',
      id,
    };
  }

  uploadCourseMaterial(id: string, file: Express.Multer.File) {
    // happens when no file is attached to the form-data
    if (!file) {
      throw new BadRequestException('Please attach a file (field name: file)');
    }

    return {
      message: 'Material uploaded successfully',
      courseId: id,
      filename: file.filename,
      path: `uploads/${file.filename}`,
    };
  }
}
