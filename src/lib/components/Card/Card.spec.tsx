import React from 'react';
import { Link } from 'react-router-dom';
import { render, screen, userEvent } from '../../test-utils';
import Button from '../Buttons/Button';
import Card from './Card';
import CardHeader from './CardHeader/CardHeader';
import CardContent from './CardContent/CardContent';

describe('Card', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <Card>
        <CardHeader title="Card Header" subtitle="subtitle" />
        <CardContent>Card content</CardContent>
      </Card>
    );
    expect(container.firstChild).toMatchSnapshot('Card');
  });

  it('Should have hasHover class', () => {
    const { container } = render(
      <Card wrapper={<Link to="/" />}>
        <CardHeader title="Card Header" subtitle="subtitle" />
        <CardContent>Card content</CardContent>
      </Card>
    );
    expect((container.firstChild as HTMLElement).className).toMatch('hasHover');
  });

  it('Should have horizontal root class', () => {
    const { container } = render(
      <Card>
        <CardHeader title="Card Header" subtitle="subtitle" />
        <CardContent>Card content</CardContent>
      </Card>
    );
    expect((container.children[0] as HTMLElement).className).toMatch(/rootHorizontal/);
  });

  describe('with "wrapper" prop', () => {
    it('Should exist hidden button or link component', () => {
      render(
        <Card wrapper={<Link to="/test">Clickable card</Link>}>
          <CardContent>Card content</CardContent>
        </Card>
      );

      const clickableWrapper = screen.getByRole('link');
      expect(clickableWrapper).toBeInTheDocument();
      expect(clickableWrapper?.className).toMatch('-Card-visuallyHidden');
    });

    it('Should set correct tabIndex', () => {
      const { container } = render(
        <Card wrapper={<Link to="test">Clickable card</Link>}>
          <CardContent>Card content</CardContent>
        </Card>
      );
      expect(container.firstChild as HTMLElement).toHaveAttribute('tabindex', '0');
    });

    it('Should get callback on card click', () => {
      const onCardClick = jest.fn();
      const onInnerButtonClick = jest.fn();
      const { container } = render(
        <Card wrapper={<Button label="Test" onClick={onCardClick} />}>
          <CardContent>
            <Button label="Inner button" onClick={onInnerButtonClick} />
          </CardContent>
        </Card>
      );
      userEvent.click(container.firstChild as HTMLElement);
      expect(onCardClick).toHaveBeenCalledTimes(1);
      expect(onInnerButtonClick).toHaveBeenCalledTimes(0);
    });

    it('Should activate the card on enter', () => {
      const onCardClick = jest.fn();
      const onInnerButtonClick = jest.fn();
      const { container } = render(
        <Card wrapper={<Button label="Test" onClick={onCardClick} />}>
          <CardContent>
            <Button label="Inner button" onClick={onInnerButtonClick} />
          </CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      card.focus();
      userEvent.keyboard('{Enter}');

      expect(onCardClick).toHaveBeenCalledTimes(1);
      expect(onInnerButtonClick).toHaveBeenCalledTimes(0);
    });

    it('Should activate the card on spacebar', () => {
      const onCardClick = jest.fn();
      const onInnerButtonClick = jest.fn();
      const { container } = render(
        <Card wrapper={<Button label="Test" onClick={onCardClick} />}>
          <CardContent>
            <Button label="Inner button" onClick={onInnerButtonClick} />
          </CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;
      userEvent.type(card, '{space}');

      expect(onCardClick).toHaveBeenCalledTimes(1);
      expect(onInnerButtonClick).toHaveBeenCalledTimes(0);
    });

    it('Should not activate the card when user select text inside card (long press)', () => {
      jest.useFakeTimers();

      const onCardClick = jest.fn();
      const onInnerButtonClick = jest.fn();
      const { container } = render(
        <Card wrapper={<Button label="Test" onClick={onCardClick} />}>
          <CardContent>
            <Button label="Inner button" onClick={onInnerButtonClick} />
          </CardContent>
        </Card>
      );
      const card = container.firstChild as HTMLElement;

      userEvent.mouseMove(card);

      expect(onCardClick).toHaveBeenCalledTimes(0);
      expect(onInnerButtonClick).toHaveBeenCalledTimes(0);
    });
  });
});
