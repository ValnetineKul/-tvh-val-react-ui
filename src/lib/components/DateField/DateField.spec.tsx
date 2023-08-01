import React from 'react';
import { render, userEvent, screen } from '../../test-utils';
import DateField from './DateField';

describe('DateField', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <DateField dateRange label="label" startValue={null} endValue={null} onChange={jest.fn()} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should call onChange', () => {
    const handleChange = jest.fn();
    render(<DateField label="label" value={new Date('01/01/2021')} onChange={handleChange} />);

    const input = screen.getByPlaceholderText('dd/mm/yyyy') as HTMLInputElement;
    userEvent.click(input);
    userEvent.click(screen.getByText('9', { selector: 'button' }));

    const ok = screen.getByText('OK', { selector: 'button' });

    userEvent.click(ok);

    expect(handleChange).toHaveBeenCalledWith(new Date('01/09/2021'));
  });

  it('Should not call onChange', () => {
    const handleChange = jest.fn();
    render(<DateField label="label" onChange={handleChange} />);

    const input = screen.getByPlaceholderText('dd/mm/yyyy') as HTMLInputElement;

    userEvent.paste(input, 'not a date');
    expect(handleChange).not.toHaveBeenCalled();

    userEvent.type(input, 'value');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('Should call onChange mobile date range', () => {
    const handleChange = jest.fn();
    render(
      <DateField
        dateRange
        toLabel="until"
        label="label"
        startValue={new Date('01/01/2021')}
        endValue={new Date('01/02/2021')}
        onChange={handleChange}
      />
    );

    const input = screen.getAllByPlaceholderText('dd/mm/yyyy') as HTMLInputElement[];
    userEvent.click(input[0]);

    userEvent.click(screen.getByText('9', { selector: 'button' }));

    userEvent.click(screen.getByText('8', { selector: 'button' }));

    userEvent.click(screen.getByText('10', { selector: 'button' }));

    const ok = screen.getByText('OK', { selector: 'button' });

    userEvent.click(ok);

    expect(handleChange).toHaveBeenCalledWith(new Date('01/10/2021'), null);
  });

  it('Should call onChange by selecting date range', () => {
    window.matchMedia = jest.fn().mockImplementation((query) => {
      return {
        matches: query !== '(min-width: 640px)',
        media: '',
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    });
    const handleChange = jest.fn();

    render(
      <DateField
        dateRange
        label="label"
        startValue={new Date('01/01/2021')}
        endValue={new Date('01/02/2021')}
        onChange={handleChange}
      />
    );

    const input = screen.getAllByPlaceholderText('dd/mm/yyyy') as HTMLInputElement[];
    userEvent.click(input[0]);

    userEvent.click(screen.getByText('10', { selector: 'button' }));

    userEvent.click(screen.getByText('8', { selector: 'button' }));

    userEvent.click(screen.getByText('12', { selector: 'button' }));

    expect(handleChange).toHaveBeenCalledWith(new Date('01/12/2021'), null);
  });

  it('Should call onChange by typing a date range', () => {
    const handleChange = jest.fn();
    render(
      <DateField dateRange isCalendarDisabled label="label" startValue={null} endValue={null} onChange={handleChange} />
    );

    const input = screen.getAllByPlaceholderText('dd/mm/yyyy') as HTMLInputElement[];
    userEvent.paste(input[0], '03/01/2021');

    expect(handleChange).toHaveBeenCalledWith(new Date('01/03/2021'), null);

    userEvent.click(input[1]);

    userEvent.paste(input[1], '02/01/2021');

    expect(handleChange).toHaveBeenCalledWith(null, new Date('01/02/2021'));
  });
});
