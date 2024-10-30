export type ChangeListener = () => void;

export class BaseListenerService {
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
}
