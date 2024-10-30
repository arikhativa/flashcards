export type ChangeListener = () => void;

export class BaseListenerService<T> {
  protected obj: T;
  private listeners: ChangeListener[] = [];

  onChange(listener: ChangeListener) {
    this.listeners.push(listener);
  }

  offChange(listener: ChangeListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  protected notifyChange() {
    this.listeners.forEach((listener) => listener());
  }

  listen(set: (value: React.SetStateAction<T>) => void) {
    const ret = () => {
      const update = () => set(this.obj);
      this.onChange(update);
      return () => this.offChange(update);
    };
    return ret;
  }
}
