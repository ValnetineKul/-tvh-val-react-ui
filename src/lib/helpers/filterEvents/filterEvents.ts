const filterEvents = (event: React.SyntheticEvent) => {
  const descendentNodes = Array.from(event.currentTarget.querySelectorAll('*'));
  const tabableElements = descendentNodes.filter((element: HTMLElement) => element?.tabIndex === 0);
  const isTabableElement = tabableElements.includes(event.target as HTMLElement);
  const descendentsOfTabableElements = tabableElements.flatMap((element) => Array.from(element.querySelectorAll('*')));
  const isDescendentOfTabableElements = descendentsOfTabableElements.includes(event.target as HTMLElement);
  // detect elements rendered through portals
  const isElementOutsideDomTree = !event.currentTarget.contains(event.target as Node);

  return [isTabableElement, isDescendentOfTabableElements, isElementOutsideDomTree];
};

export default filterEvents;
