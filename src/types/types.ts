export type LessonType = 'video' | 'reading';
export type SectionDisplayType = 'accordion' | 'standalone';
export interface Category {
  id: string;
  school: string;
  branch: string[];
  image: string;
}

export interface ILesson {
  id: string;
  order: string;
  type: LessonType;
  title: string;
  subTitle?: string; // Dấu ? nghĩa là không bắt buộc
  progress: string;
}

export interface ISection {
  sectionId: string;
  title: string;
  description?: string;
  subTitle?: string; 
  displayType: SectionDisplayType;
  type?: LessonType; // Dùng cho standalone
  progress?: string; // Dùng cho standalone
  lessons: ILesson[];
}

export interface ICourse {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  color: string;
  school: string;
  branch: string;
  Introduction: string[];
  sections: ISection[];
}