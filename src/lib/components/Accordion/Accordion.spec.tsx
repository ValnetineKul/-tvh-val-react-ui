import React from 'react';
import { render, screen, userEvent } from '../../test-utils';
import Accordion from './Accordion';

const accordions = [
  {
    title: 'First accordion',
    content: 'Accordion 1 content',
    key: 'first',
  },
  {
    title: 'Second accordion',
    content: 'Accordion 2 content',
    key: 'second',
  },
];

describe('Accordion', () => {
  it('Should render correctly', () => {
    const { container } = render(<Accordion items={accordions} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('Should add custom className', () => {
    const { container } = render(<Accordion items={accordions} className="custom-class-name" />);
    expect(container.firstChild).toHaveClass('custom-class-name');
  });

  it('Should keep accordions open', () => {
    render(<Accordion items={accordions} />);
    const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
    const secondAccordion = screen.getByRole('button', { name: 'Second accordion' });

    expect(firstAccordion).toHaveAttribute('aria-expanded', 'false');
    expect(secondAccordion).toHaveAttribute('aria-expanded', 'false');

    firstAccordion.click();
    secondAccordion.click();

    expect(firstAccordion).toBeInTheDocument();
    expect(secondAccordion).toBeInTheDocument();
    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
    expect(secondAccordion).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByLabelText(/First accordion/)).toHaveTextContent('Accordion 1 content');
    expect(screen.getByLabelText(/Second accordion/)).toHaveTextContent('Accordion 2 content');
  });

  it('Should close accordion on 2nd click', () => {
    render(<Accordion items={accordions} />);
    const firstAccordion = screen.getByRole('button', { name: 'First accordion' });

    firstAccordion.click();
    expect(firstAccordion).toHaveClass('Mui-expanded');

    firstAccordion.click();
    expect(firstAccordion).not.toHaveClass('Mui-expanded');
  });

  it('Should close first and open 2nd accordion', () => {
    render(<Accordion items={accordions} multipleOpen={false} />);
    const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
    const secondAccordion = screen.getByRole('button', { name: 'Second accordion' });

    firstAccordion.click();
    secondAccordion.click();

    expect(firstAccordion).not.toHaveClass('Mui-expanded');
    expect(secondAccordion).toHaveClass('Mui-expanded');

    expect(firstAccordion.getAttribute('aria-expanded')).toBe('false');
    expect(secondAccordion.getAttribute('aria-expanded')).toBe('true');
  });

  it('Should expand certain panels by default', () => {
    render(<Accordion items={accordions} defaultExpandedPanels={['first']} />);

    const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
    const secondAccordion = screen.getByRole('button', { name: 'Second accordion' });

    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
    expect(secondAccordion).toHaveAttribute('aria-expanded', 'false');
  });

  it('Should expand all panels by default', () => {
    render(<Accordion items={accordions} defaultExpandedPanels />);

    const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
    const secondAccordion = screen.getByRole('button', { name: 'Second accordion' });

    expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
    expect(secondAccordion).toHaveAttribute('aria-expanded', 'true');
  });

  it('Should call the side effects handler at state changes', () => {
    const handleSideEffects = jest.fn();
    render(<Accordion onExpandSideEffect={handleSideEffects} items={accordions} />);
    const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
    userEvent.click(firstAccordion);

    expect(handleSideEffects).toBeCalledTimes(1);
    expect(handleSideEffects).toBeCalledWith('first', true);
  });

  describe('Controlled component', () => {
    it('Should be controlled', () => {
      render(<Accordion items={accordions} expanded={['first']} />);

      const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
      const secondAccordion = screen.getByRole('button', { name: 'Second accordion' });

      expect(firstAccordion).toHaveAttribute('aria-expanded', 'true');
      expect(secondAccordion).toHaveAttribute('aria-expanded', 'false');
    });

    it('Should call the onChange when controlled', () => {
      const handleChange = jest.fn();
      render(<Accordion expanded={['first']} onChange={handleChange} items={[accordions[0]]} />);
      const firstAccordion = screen.getByRole('button', { name: 'First accordion' });
      userEvent.click(firstAccordion);

      expect(handleChange).toBeCalledTimes(1);
      expect(handleChange).toBeCalledWith('first');
    });
  });
});
