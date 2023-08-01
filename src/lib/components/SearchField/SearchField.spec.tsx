import React from 'react';
import { render, userEvent, screen } from '../../test-utils';
import SearchField from './SearchField';

describe('SearchField', () => {
  it('Should render correctly', () => {
    const { container } = render(<SearchField />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should render correctly secondary variant', () => {
    const { container } = render(<SearchField variant="secondary" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should trigger onChange', () => {
    const onChange = jest.fn();
    const { getByRole } = render(<SearchField value="value" onChange={onChange} />);
    const input = getByRole('searchbox') as HTMLInputElement;
    userEvent.type(input, 'new value');
    expect(onChange).toHaveBeenCalledTimes(9);
  });

  it('Should trigger onEnter', () => {
    const onEnter = jest.fn();
    render(<SearchField value="value" onEnter={onEnter} />);

    const input = screen.getByText('', { selector: 'input' }) as HTMLInputElement;
    input.focus();
    userEvent.keyboard('{Enter}');

    expect(onEnter).toHaveBeenCalledTimes(1);
  });

  it('Should trigger onFocus', () => {
    const onFocus = jest.fn();
    const { getByRole } = render(<SearchField onFocus={onFocus} />);
    const input = getByRole('searchbox') as HTMLInputElement;
    userEvent.click(input);
    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('Should trigger onSearch', () => {
    const onSearch = jest.fn();
    const { getByRole } = render(<SearchField onSearch={onSearch} variant="primary" searchButtonLabel="Label" />);
    const searchButton = getByRole('button', { name: 'Label' });
    userEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('Should clear search input value', async () => {
    let value = 'value';
    const onChange = jest.fn().mockImplementation((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      value = e.target.value;
    });
    const { getByRole } = render(<SearchField value="value" onChange={onChange} />);
    const clearButton = getByRole('button', {
      name: 'Clear button',
    });
    await userEvent.click(clearButton);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(value).toEqual('');
  });

  it('Should set custom search button label for variant="primary"', () => {
    const { getByRole } = render(<SearchField variant="primary" searchButtonLabel="Label" />);
    const searchButton = getByRole('button', { name: 'Label' });
    expect(searchButton).toBeInTheDocument();
  });
});
