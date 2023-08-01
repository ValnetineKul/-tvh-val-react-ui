import type { FunctionComponent, SVGProps } from 'react';
import React from 'react';
import Typography from '../Typography';
import { createMeta } from '../../story-utils';
import Icon from './Icon';
import * as countryIcons from './icons/country';
import * as functionalIcons from './icons/functional';
import * as productCategory from './icons/productCategory';
import * as machinery from './icons/machinery';
import * as commercial from './icons/commercial';
import * as brand from './icons/brand';

type Size = 'xl' | 'md' | 'sm';

const renderIconsListWithLetter = <
  T extends Record<string, FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined }>>
>(
  icons: T,
  size: Size,
  isMultiColor = false
) => {
  const iconsNames: string[] = Object.keys(icons);

  iconsNames.sort((a: string, b: string) => a.localeCompare(b));

  let letter = '';
  return iconsNames.map((name) => {
    if (name[0] === letter) {
      return null;
    }
    [letter] = name;

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          padding: 10,
          marginBottom: 20,
          border: '1px solid black',
          borderRadius: 12,
        }}
        key={name}
      >
        <div style={{ marginRight: 20 }}>
          <Typography variant="h1" headerType="commercial">
            {name[0]}
          </Typography>
        </div>

        {iconsNames.map((iconName) => {
          if (iconName[0] !== letter) {
            return null;
          }

          return (
            <div style={{ padding: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }} key={iconName}>
              <Icon isMultiColor={isMultiColor} icon={icons[iconName as keyof T]} size={size} />

              <Typography>{iconName}</Typography>
            </div>
          );
        })}
      </div>
    );
  });
};

const FunctionalIconsListTemplate = ({ size }: { size: Size }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>{renderIconsListWithLetter(functionalIcons, size)}</div>
  );
};

export const FunctionalIconsList = FunctionalIconsListTemplate.bind({});
FunctionalIconsList.args = {
  size: 'md',
};
FunctionalIconsList.storyName = 'Functional icons list';

const CountryIconsListTemplate = ({ size }: { size: Size }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {renderIconsListWithLetter(countryIcons, size, true)}
    </div>
  );
};

export const CountryIconsList = CountryIconsListTemplate.bind({});
CountryIconsList.args = {
  size: 'md',
};
CountryIconsList.storyName = 'Country icons list';

const ProductCategoryIconsListTemplate = ({ size }: { size: Size }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>{renderIconsListWithLetter(productCategory, size)}</div>
  );
};

export const ProductCategoryIconsList = ProductCategoryIconsListTemplate.bind({});
ProductCategoryIconsList.args = {
  size: 'md',
};
ProductCategoryIconsList.storyName = 'Product category icons list';

const MachineryIconsListTemplate = ({ size }: { size: Size }) => {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{renderIconsListWithLetter(machinery, size)}</div>;
};

export const MachineryIconsList = MachineryIconsListTemplate.bind({});
MachineryIconsList.args = {
  size: 'md',
};
MachineryIconsList.storyName = 'Machinery icons list';

const CommercialIconsListTemplate = ({ size }: { size: Size }) => {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{renderIconsListWithLetter(commercial, size)}</div>;
};

export const CommercialIconsList = CommercialIconsListTemplate.bind({});
CommercialIconsList.args = {
  size: 'md',
};
CommercialIconsList.storyName = 'Commercial icons list';

const BrandIconsListTemplate = ({ size }: { size: Size }) => {
  return <div style={{ display: 'flex', flexDirection: 'column' }}>{renderIconsListWithLetter(brand, size)}</div>;
};

export const BrandIconsList = BrandIconsListTemplate.bind({});
BrandIconsList.args = {
  size: 'md',
};
BrandIconsList.storyName = 'Brand icons list';

export default createMeta({
  component: Icon,
  title: 'Foundations/Icon',
  argTypes: {
    icon: {
      control: {
        disable: true,
      },
      table: {
        type: { summary: 'FontAwesome icon definition' },
      },
    },
    isMultiColor: {
      control: {
        disable: true,
      },
    },
    title: {
      control: {
        disable: true,
      },
    },
  },
});
