import IMAGES from '@assets/images/images';
import moment, {duration} from 'moment';

const useHome = () => {
  const categoryList = [
    {label: 'Fashion', icon: () => <IMAGES.icM1 />},
    {label: 'LifeStyle', icon: () => <IMAGES.icM2 />},
    {label: 'Gourmet', icon: () => <IMAGES.icM3 />},
    {label: 'Travel', icon: () => <IMAGES.icM4 />},
    {label: 'Gaming', icon: () => <IMAGES.icM5 />},
    {label: 'Hotel', icon: () => <IMAGES.icM6 />},
    {label: 'Fashion', icon: () => <IMAGES.icM1 />},
    {label: 'LifeStyle', icon: () => <IMAGES.icM2 />},
    {label: 'Gourmet', icon: () => <IMAGES.icM3 />},
    {label: 'Travel', icon: () => <IMAGES.icM4 />},
    {label: 'Gaming', icon: () => <IMAGES.icM5 />},
    {label: 'Hotel', icon: () => <IMAGES.icM6 />},
  ];

  const dontMissOutList = [
    'Fashion',
    'LifeStyle',
    'Gourmet',
    'Travel',
    'Gaming',
    'Hotel',
    'Fashion',
    'LifeStyle',
    'Gourmet',
    'Travel',
    'Gaming',
    'Hotel',
  ].map((i: string) => {
    return {title: i, description: Array(10).fill(i).join(' ')};
  });

  const sectionList = [
    'Adidas',
    'Nike',
    'Gucci',
    'Levis',
    'Apple',
    'Microsoft',
  ].map((i: string, index: number) => {
    return {
      title: i,
      date: moment().add(index, 'days').format('MMM DD, YYYY').toString(),
      description: Array(10).fill(i).join(' '),
    };
  });

  return {
    categoryList,
    dontMissOutList,

    sectionList,
  };
};

export default useHome;
