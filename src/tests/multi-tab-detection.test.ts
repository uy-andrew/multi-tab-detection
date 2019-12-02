import { MultiTabDetection } from '../multi-tab-detection';

describe('MultiTabDetection during initialization', () => {
  let multiTabDetection = null;

  beforeAll(() => {
    // remove any existing local storage items
    window.localStorage.clear();

    multiTabDetection = new MultiTabDetection();
  });

  test('Number of tabs opened to be one', () => {
    expect(multiTabDetection.NumberOfTabsOpened).toBe(1);
  });

  test('New tab item should exist', () => {
    const newTabItem = window.localStorage.getItem('mtd-new-tab');
    expect(newTabItem).not.toBeNull();
  });

  test('Existing tab item should not exist', () => {
    const existingTabItem = window.localStorage.getItem('mtd-existing-tab');
    expect(existingTabItem).toBeNull();
  });

  test('Closing tab item should not exist', () => {
    const closingTabItem = window.localStorage.getItem('mtd-closing-tab');
    expect(closingTabItem).toBeNull();
  });
});
