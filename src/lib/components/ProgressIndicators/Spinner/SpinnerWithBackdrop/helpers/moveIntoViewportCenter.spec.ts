import moveIntoViewportCenter from './moveIntoViewportCenter';

const container = document.createElement('div');
container.style.width = '100px';
container.style.height = '100px';

const childComponent = document.createElement('div');
childComponent.style.width = '24px';
childComponent.style.height = '24px';
childComponent.style.display = 'block';

container.appendChild(childComponent);
document.body.appendChild(container);

describe('moveIntoViewportCenter', () => {
  it('Should return null if no container or no child component', () => {
    expect(moveIntoViewportCenter({ container: null, childComponent })).toBe(null);
    expect(moveIntoViewportCenter({ container, childComponent: null })).toBe(null);
  });

  it('Should return null if prevChildSize is not equal to childSize', () => {
    expect(moveIntoViewportCenter({ container, childComponent, prevChildSize: 25 })).toBe(null);
  });

  it('Should call requestAnimationFrame if params passed', () => {
    const mockFn = jest.fn();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
      mockFn();
      return 0;
    });

    moveIntoViewportCenter({ container, childComponent });

    expect(mockFn).toBeCalledTimes(1);
  });
});
