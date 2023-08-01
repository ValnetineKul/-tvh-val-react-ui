import React from 'react';
import { render } from '../../../test-utils';
import DefinitionList from './DefinitionList';

const definitions = [
  {
    key: 'prop1',
    value: 'value1',
  },
  {
    key: 'prop2',
    keySubtitle: 'prop2 subtitle',
    value: 'value2',
    valueSubtitle: 'value2 subtitle',
  },
  {
    key: 'prop3',
    value: 'value3',
  },
];

describe('DefinitionList', () => {
  it('Should render correctly', () => {
    const { container } = render(<DefinitionList definitions={definitions} cols={1} columnDistribution="50/50" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should not render <hr> on last item', () => {
    const { queryByRole } = render(
      <DefinitionList
        definitions={[
          {
            key: 'prop1',
            value: 'value1',
          },
        ]}
        cols={1}
        columnDistribution="50/50"
      />
    );
    expect(queryByRole('separator')).not.toBeInTheDocument();
  });

  describe('Should set definitions list width', () => {
    const cases = [
      [undefined, 'DefinitionList-listFullWidth'],
      ['halfWidth', 'DefinitionList-listHalfWidth'],
      ['fullWidth', 'DefinitionList-listFullWidth'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof DefinitionList>['width'], expected: string) => {
        const { container } = render(
          <DefinitionList width={input} definitions={definitions} cols={1} columnDistribution="50/50" />
        );
        const dl = container.querySelector('dl');
        expect((dl as HTMLElement).className).toMatch(expected);
      }
    );
  });

  describe('Should set definitions list columns', () => {
    const cases = [
      [undefined, 'DefinitionList-cols1'],
      [1, 'DefinitionList-cols1'],
      [2, 'DefinitionList-cols2'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof DefinitionList>['cols'], expected: string) => {
        const { container } = render(
          <DefinitionList cols={input} definitions={definitions} columnDistribution="50/50" />
        );
        const dl = container.querySelector('dl');
        expect((dl as HTMLElement).className).toMatch(expected);
      }
    );
  });

  describe('Should set columns width', () => {
    const cases = [
      [undefined, 'DefinitionList-width50_50'],
      ['10/90', 'DefinitionList-width10_90'],
      ['20/80', 'DefinitionList-width20_80'],
      ['30/70', 'DefinitionList-width30_70'],
      ['40/60', 'DefinitionList-width40_60'],
      ['50/50', 'DefinitionList-width50_50'],
    ];
    test.each(cases)(
      'given %p, returns %p',
      (input: React.ComponentProps<typeof DefinitionList>['columnDistribution'], expected: string) => {
        const { container } = render(<DefinitionList columnDistribution={input} definitions={definitions} cols={1} />);
        const dl = container.querySelector('dl') as HTMLElement;
        const dt = dl.querySelector('dt');
        const dd = dl.querySelector('dd');
        expect((dt as HTMLElement).className).toMatch(expected);
        expect((dd as HTMLElement).className).toMatch(expected);
      }
    );
  });
});
