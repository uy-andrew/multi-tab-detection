import { Subject } from 'rxjs';

export class MultiTabDetection {
  /**
   * @description Informs the listener that a new tab has been detected for the same browser session.
   * It also pass in the total number of tabs opened for the same browser session.
   */
  public NewTabDetectedEvent: Subject<number> = new Subject<number>();

  /**
   * @description Informs the listener that an existing tab existed for the same browser session.
   */
  public ExistingTabDetectedEvent: Subject<void> = new Subject<void>();

  private prefix: string = 'mtd-';
  private initiatedNewTabMessage: boolean = false;
  private numberOfTabsOpened: number = 1;
  private newTabValue: string = null;

  constructor() {
    this.addListener();
    this.setNewTab();
    this.initiatedNewTabMessage = true;
  }

  /**
   * @description Gets the total number of tabs opened. It is recommended to wait for 1 second
   * after receiving existingTabDetectedEvent before calling this property to get the accurate
   * total number of tabs opened.
   * @returns {number}
   */
  public get NumberOfTabsOpened(): number {
    return this.numberOfTabsOpened;
  }

  private addListener(): void {
    const thisInstance = this;

    window.addEventListener(
      'storage',
      (ev: StorageEvent) => {
        if (ev.key === thisInstance.newTabKey) {
          thisInstance.incrementNumberOfTabsOpened();
          thisInstance.NewTabDetectedEvent.next(thisInstance.numberOfTabsOpened);
          thisInstance.setKey(thisInstance.existingTabKey);
        } else if (ev.key === thisInstance.existingTabKey) {
          // only process the event if this is the new tab that has been opened
          const newTabValue = thisInstance.getLocalStorageValue(thisInstance.newTabKey);
          if (newTabValue === thisInstance.newTabValue) {
            if (thisInstance.initiatedNewTabMessage) {
              thisInstance.initiatedNewTabMessage = false;
              thisInstance.numberOfTabsOpened = 1;
              thisInstance.ExistingTabDetectedEvent.next();
            }

            thisInstance.incrementNumberOfTabsOpened();
          }
        } else if (ev.key === thisInstance.closingTabKey) {
          thisInstance.decrementNumberOfTabsOpened();
        }
      },
      false,
    );

    window.addEventListener(
      'beforeunload',
      (ev: BeforeUnloadEvent) => {
        thisInstance.setKey(thisInstance.closingTabKey);
      },
      false,
    );
  }

  private setNewTab(): void {
    this.newTabValue = this.createUniqueValue();
    this.setLocalStorageKeyValue(this.newTabKey, this.newTabValue);
  }

  // keys
  private get newTabKey(): string {
    return this.createUniqueKey('new-tab');
  }

  private get existingTabKey(): string {
    return this.createUniqueKey('existing-tab');
  }

  private get closingTabKey(): string {
    return this.createUniqueKey('closing-tab');
  }

  // methods to increment/decrement
  private incrementNumberOfTabsOpened() {
    this.numberOfTabsOpened++;
  }

  private decrementNumberOfTabsOpened() {
    this.numberOfTabsOpened--;
  }

  // local storage methods
  private setKey(key: string) {
    this.setLocalStorageKeyValue(key, this.createUniqueValue());
  }

  private setLocalStorageKeyValue(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  private getLocalStorageValue(key: string): string {
    return window.localStorage.getItem(key);
  }

  // utility methods
  private createUniqueKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  private createUniqueValue(): string {
    return Date.now().toString();
  }
}
