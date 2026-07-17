import { courseCardMocks } from '@/components/shared/CourseCard/CourseCard.mock';
import { HomeTemplate } from '@/templates/HomeTemplate';

const HomePage = () => {
  const courses = courseCardMocks.slice(0, 3);

  return <HomeTemplate courses={courses} />;
};

export default HomePage;
